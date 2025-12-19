// ============================================
// Audit Service
// Rastreabilidade de todas as ações
// ============================================

import { Request, Response, NextFunction, Router } from 'express';
import type { AuditEntry } from '../../types/concierge.js';
import { logger } from '../lib/logger.js';

const router = Router();

// ============================================
// In-Memory Audit Log (Mock)
// Em produção: usar banco de dados
// ============================================

const auditLog: AuditEntry[] = [];

// ============================================
// Audit Functions
// ============================================

export function createAuditEntry(
  action: AuditEntry['action'],
  actor: AuditEntry['actor'],
  context: AuditEntry['context'],
  request?: Record<string, unknown>,
  response?: Record<string, unknown>,
  impersonation?: AuditEntry['impersonation']
): AuditEntry {
  const entry: AuditEntry = {
    id: `audit_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    timestamp: new Date().toISOString(),
    action,
    actor,
    context,
    request,
    response,
    impersonation
  };
  
  auditLog.push(entry);
  
  // Log to console/file
  logger.info({
    audit_id: entry.id,
    action: entry.action,
    actor_type: entry.actor.type,
    actor_id: entry.actor.id,
    plan_version: entry.context.plan_version
  }, 'Audit entry created');
  
  return entry;
}

export function getAuditLog(filters?: {
  actorId?: string;
  actorType?: 'patient' | 'nutritionist' | 'system';
  action?: AuditEntry['action'];
  startDate?: string;
  endDate?: string;
  limit?: number;
}): AuditEntry[] {
  let entries = [...auditLog];
  
  if (filters?.actorId) {
    entries = entries.filter(e => e.actor.id === filters.actorId);
  }
  
  if (filters?.actorType) {
    entries = entries.filter(e => e.actor.type === filters.actorType);
  }
  
  if (filters?.action) {
    entries = entries.filter(e => e.action === filters.action);
  }
  
  if (filters?.startDate) {
    const start = new Date(filters.startDate);
    entries = entries.filter(e => new Date(e.timestamp) >= start);
  }
  
  if (filters?.endDate) {
    const end = new Date(filters.endDate);
    entries = entries.filter(e => new Date(e.timestamp) <= end);
  }
  
  // Sort by timestamp descending
  entries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  if (filters?.limit) {
    entries = entries.slice(0, filters.limit);
  }
  
  return entries;
}

// ============================================
// Audit Middleware
// ============================================

export function auditMiddleware(action: AuditEntry['action']) {
  return (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    
    // Capture original json method
    const originalJson = res.json.bind(res);
    
    res.json = function(body: unknown) {
      // Create audit entry after response
      const userId = (req as unknown as { userId?: string }).userId || 'anonymous';
      const userRole = req.headers['x-user-role'] as 'patient' | 'nutritionist' || 'patient';
      
      createAuditEntry(
        action,
        { type: userRole, id: userId },
        {
          plan_version: (req.body?.plan_version as string) || 'unknown',
          policy_version: '1.0.0',
          catalog_version: 'v1'
        },
        {
          method: req.method,
          path: req.path,
          query: req.query,
          body_keys: Object.keys(req.body || {}),
          duration_ms: Date.now() - startTime
        },
        {
          status: res.statusCode,
          success: res.statusCode < 400
        }
      );
      
      return originalJson(body);
    };
    
    next();
  };
}

// ============================================
// Impersonation Audit
// ============================================

export function createImpersonationEntry(
  nutritionistId: string,
  patientId: string,
  action: string
): AuditEntry {
  return createAuditEntry(
    'plan_view',
    { type: 'nutritionist', id: nutritionistId },
    {
      plan_version: 'impersonation',
      policy_version: '1.0.0',
      catalog_version: 'v1'
    },
    { target_patient: patientId, action },
    undefined,
    { nutritionist_id: nutritionistId, read_only: true }
  );
}

// ============================================
// Routes (Admin/Nutri only)
// ============================================

// GET /audit - Listar audit log
router.get('/', (req: Request, res: Response) => {
  const userRole = req.headers['x-user-role'];
  
  if (userRole !== 'nutritionist') {
    return res.status(403).json({ error: 'Acesso restrito a nutricionistas' });
  }
  
  const filters = {
    actorId: req.query.actor_id as string,
    actorType: req.query.actor_type as 'patient' | 'nutritionist' | 'system',
    action: req.query.action as AuditEntry['action'],
    startDate: req.query.start_date as string,
    endDate: req.query.end_date as string,
    limit: req.query.limit ? parseInt(req.query.limit as string) : 100
  };
  
  const entries = getAuditLog(filters);
  
  res.json({
    entries,
    total: entries.length,
    filters_applied: Object.keys(filters).filter(k => filters[k as keyof typeof filters])
  });
});

// GET /audit/patient/:id - Audit de paciente específico
router.get('/patient/:id', (req: Request, res: Response) => {
  const userRole = req.headers['x-user-role'];
  
  if (userRole !== 'nutritionist') {
    return res.status(403).json({ error: 'Acesso restrito a nutricionistas' });
  }
  
  const patientId = req.params.id;
  const entries = getAuditLog({ actorId: patientId, limit: 50 });
  
  res.json({
    patient_id: patientId,
    entries,
    total: entries.length
  });
});

// GET /audit/stats - Estatísticas de uso
router.get('/stats', (req: Request, res: Response) => {
  const userRole = req.headers['x-user-role'];
  
  if (userRole !== 'nutritionist') {
    return res.status(403).json({ error: 'Acesso restrito a nutricionistas' });
  }
  
  // Calcular estatísticas
  const allEntries = getAuditLog({});
  
  const stats = {
    total_entries: allEntries.length,
    by_action: {} as Record<string, number>,
    by_actor_type: {} as Record<string, number>,
    last_24h: 0,
    last_7d: 0
  };
  
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  
  allEntries.forEach(entry => {
    // By action
    stats.by_action[entry.action] = (stats.by_action[entry.action] || 0) + 1;
    
    // By actor type
    stats.by_actor_type[entry.actor.type] = (stats.by_actor_type[entry.actor.type] || 0) + 1;
    
    // Time-based
    const entryTime = new Date(entry.timestamp).getTime();
    if (now - entryTime < day) stats.last_24h++;
    if (now - entryTime < 7 * day) stats.last_7d++;
  });
  
  res.json(stats);
});

export default router;
