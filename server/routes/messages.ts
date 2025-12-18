// ============================================
// Daily Messages Route
// Mensagens concierge-style para pacientes
// ============================================

import { Request, Response, Router } from 'express';
import type { DailyMessage, ToneProfile } from '../../src/types/concierge.js';

const router = Router();

// ============================================
// Mock Messages Database
// ============================================

const mockMessages: DailyMessage[] = [
  {
    id: 'msg_001',
    date: new Date().toISOString().split('T')[0],
    plan_version: '2025-01-15_v1',
    title: 'Hoje: consistência elegante',
    body: 'Manter o plano hoje é um ato de autocuidado. Pequenas escolhas consistentes constroem grandes resultados.',
    action: 'Ver refeições do dia',
    tone: 'NEUTRAL_PRO',
    category: 'motivation',
    deep_link: { type: 'meal', target_id: 'today' }
  },
  {
    id: 'msg_002',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    plan_version: '2025-01-15_v1',
    title: 'Proteína no timing certo',
    body: 'Distribuir proteína ao longo do dia otimiza a síntese muscular. Seu plano já considera isso.',
    action: 'Entender melhor',
    tone: 'NEUTRAL_PRO',
    category: 'nutrition_tip',
    deep_link: { type: 'tip', target_id: 'protein_timing' }
  },
  {
    id: 'msg_003',
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
    plan_version: '2025-01-15_v1',
    title: 'Hábito como segunda natureza',
    body: 'O que repetimos se torna fácil. A moderação praticada hoje será natural amanhã.',
    action: 'Registrar refeição',
    tone: 'PHILOSOPHICAL',
    category: 'reflection'
  },
  {
    id: 'msg_004',
    date: new Date(Date.now() - 259200000).toISOString().split('T')[0],
    plan_version: '2025-01-15_v1',
    title: 'Flexibilidade inteligente',
    body: 'Substituições são permitidas quando necessário. Seu catálogo tem opções equivalentes.',
    action: 'Ver substituições',
    tone: 'WARM_SUPPORTIVE',
    category: 'nutrition_tip',
    deep_link: { type: 'plan', target_id: 'substitutions' }
  }
];

// ============================================
// Message Templates
// ============================================

interface MessageTemplate {
  category: DailyMessage['category'];
  tones: ToneProfile[];
  templates: Array<{
    title: string;
    body: string;
    action: string;
  }>;
}

const messageTemplates: MessageTemplate[] = [
  {
    category: 'motivation',
    tones: ['NEUTRAL_PRO', 'WARM_SUPPORTIVE'],
    templates: [
      {
        title: 'Hoje: consistência elegante',
        body: 'Manter o plano hoje é um ato de autocuidado. Pequenas escolhas consistentes constroem grandes resultados.',
        action: 'Ver refeições do dia'
      },
      {
        title: 'Você está no caminho',
        body: 'Cada dia seguindo o plano é um passo em direção ao seu objetivo. Continue assim.',
        action: 'Ver progresso'
      },
      {
        title: 'Foco no processo',
        body: 'Resultados são consequência de ações diárias. Hoje é mais uma oportunidade.',
        action: 'Ver refeições'
      }
    ]
  },
  {
    category: 'nutrition_tip',
    tones: ['NEUTRAL_PRO', 'DIRECT_MINIMAL'],
    templates: [
      {
        title: 'Proteína no timing certo',
        body: 'Distribuir proteína ao longo do dia otimiza a síntese muscular. Seu plano já considera isso.',
        action: 'Entender melhor'
      },
      {
        title: 'Hidratação importa',
        body: 'Água auxilia metabolismo e saciedade. Mantenha uma garrafa por perto.',
        action: 'Dica completa'
      },
      {
        title: 'Fibras e saciedade',
        body: 'Alimentos com fibra prolongam a sensação de satisfação. Seu plano prioriza isso.',
        action: 'Ver alimentos ricos'
      }
    ]
  },
  {
    category: 'mindset',
    tones: ['NEUTRAL_PRO', 'WARM_SUPPORTIVE'],
    templates: [
      {
        title: 'Progresso, não perfeição',
        body: 'Um dia fora do plano não apaga seu progresso. Retome com tranquilidade.',
        action: 'Planejar próxima refeição'
      },
      {
        title: 'Paciência com resultados',
        body: 'Mudanças sustentáveis levam tempo. Confie no processo.',
        action: 'Ver histórico'
      }
    ]
  },
  {
    category: 'reflection',
    tones: ['PHILOSOPHICAL'],
    templates: [
      {
        title: 'Hábito como segunda natureza',
        body: 'O que repetimos se torna fácil. A moderação praticada hoje será natural amanhã.',
        action: 'Registrar refeição'
      },
      {
        title: 'Temperança no prato',
        body: 'A virtude não está na privação, mas na medida. Seu plano busca esse equilíbrio.',
        action: 'Ver plano'
      },
      {
        title: 'Corpo e mente integrados',
        body: 'Nutrir bem o corpo é cuidar do instrumento através do qual vivemos.',
        action: 'Reflexão do dia'
      }
    ]
  }
];

// ============================================
// Generate Daily Message
// ============================================

function generateDailyMessage(
  patientId: string, 
  preferredTone: ToneProfile = 'NEUTRAL_PRO',
  planVersion: string
): DailyMessage {
  // Selecionar categoria (rotacionar por dia)
  const dayOfYear = Math.floor(Date.now() / 86400000);
  const categories: DailyMessage['category'][] = ['motivation', 'nutrition_tip', 'mindset', 'reflection'];
  const category = categories[dayOfYear % categories.length];
  
  // Encontrar template
  const templateGroup = messageTemplates.find(t => t.category === category);
  if (!templateGroup) {
    // Fallback
    return mockMessages[0];
  }
  
  // Selecionar template (rotacionar)
  const templateIndex = dayOfYear % templateGroup.templates.length;
  const template = templateGroup.templates[templateIndex];
  
  // Ajustar tom (usar preferido se disponível, senão primeiro da lista)
  const tone = templateGroup.tones.includes(preferredTone) 
    ? preferredTone 
    : templateGroup.tones[0];
  
  return {
    id: `msg_${patientId}_${dayOfYear}`,
    date: new Date().toISOString().split('T')[0],
    plan_version: planVersion,
    title: template.title,
    body: template.body,
    action: template.action,
    tone,
    category
  };
}

// ============================================
// Routes
// ============================================

// GET /messages - Listar mensagens do paciente
router.get('/', async (req: Request, res: Response) => {
  // TODO: Get patient from auth
  const patientId = 'patient_001';
  const limit = parseInt(req.query.limit as string) || 10;
  
  // Mock: retornar mensagens pré-definidas
  const messages = mockMessages.slice(0, limit);
  
  res.json({
    messages,
    total: mockMessages.length,
    patient_id: patientId
  });
});

// GET /messages/today - Mensagem do dia
router.get('/today', async (req: Request, res: Response) => {
  // TODO: Get from auth + patient preferences
  const patientId = 'patient_001';
  const preferredTone: ToneProfile = (req.query.tone as ToneProfile) || 'NEUTRAL_PRO';
  const planVersion = '2025-01-15_v1';
  
  // Verificar se já existe mensagem hoje
  const today = new Date().toISOString().split('T')[0];
  const existingMessage = mockMessages.find(m => m.date === today);
  
  if (existingMessage) {
    return res.json(existingMessage);
  }
  
  // Gerar nova mensagem
  const message = generateDailyMessage(patientId, preferredTone, planVersion);
  
  res.json(message);
});

// POST /messages - Nutri cria mensagem personalizada
router.post('/', async (req: Request, res: Response) => {
  const userRole = req.headers['x-user-role'];
  
  if (userRole !== 'nutritionist') {
    return res.status(403).json({ error: 'Apenas nutricionistas podem criar mensagens' });
  }
  
  const { title, body, action, tone, category } = req.body;
  
  if (!title || !body || !action) {
    return res.status(400).json({ error: 'title, body e action são obrigatórios' });
  }
  
  const message: DailyMessage = {
    id: `msg_custom_${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    plan_version: req.body.plan_version || '2025-01-15_v1',
    title,
    body: body.substring(0, 150), // Enforce max chars
    action,
    tone: tone || 'NEUTRAL_PRO',
    category: category || 'motivation'
  };
  
  // TODO: Persist to database
  mockMessages.unshift(message);
  
  res.status(201).json(message);
});

// GET /messages/templates - Nutri vê templates disponíveis
router.get('/templates', async (req: Request, res: Response) => {
  const userRole = req.headers['x-user-role'];
  
  if (userRole !== 'nutritionist') {
    return res.status(403).json({ error: 'Acesso restrito' });
  }
  
  res.json(messageTemplates);
});

export default router;
