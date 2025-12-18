import { Router, Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { config } from '../config/env.js';

const router = Router();

interface HealthStatus {
  status: 'ok' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
  checks?: {
    gemini?: { status: string; latencyMs?: number };
  };
}

// Simple health check (for load balancers)
router.get('/health', (_req: Request, res: Response) => {
  const health: HealthStatus = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
  };
  res.json(health);
});

// Deep health check (for monitoring)
router.get('/ready', async (_req: Request, res: Response) => {
  const health: HealthStatus = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
    checks: {},
  };

  try {
    const start = Date.now();
    const ai = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });
    
    // Quick ping to Gemini
    await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'ping',
      config: { maxOutputTokens: 5 },
    });
    
    health.checks!.gemini = {
      status: 'ok',
      latencyMs: Date.now() - start,
    };
  } catch (error) {
    health.status = 'degraded';
    health.checks!.gemini = {
      status: 'error',
    };
  }

  const statusCode = health.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(health);
});

export default router;
