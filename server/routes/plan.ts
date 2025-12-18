import { Router, Request, Response } from 'express';
import { GoogleGenAI, Schema, Type } from '@google/genai';
import { config } from '../config/env.js';
import { validateBody, sanitizePromptInput } from '../middleware/validation.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { aiLimiter } from '../middleware/rateLimiter.js';
import { requireNutritionist } from '../middleware/authMiddleware.js';
import { planRequestSchema, PlanRequest } from '../schemas/api.js';
import { logger } from '../lib/logger.js';

const router = Router();
const ai = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });

const PLAN_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    focusArea: { type: Type.STRING },
    morningRoutine: { type: Type.STRING },
    dailyReading: { type: Type.STRING },
    avoidance: { type: Type.STRING },
    notes: { type: Type.STRING },
  },
  required: ['focusArea', 'morningRoutine', 'dailyReading', 'avoidance', 'notes'],
};

router.post(
  '/',
  ...requireNutritionist,
  aiLimiter,
  validateBody(planRequestSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const { clientName, observation, personality } = req.body as PlanRequest;

    const sanitizedObservation = sanitizePromptInput(observation);
    
    logger.info({ clientName }, 'Generating philosophical plan');

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Você é um assistente para NUTRICIONISTAS que usam filosofia como apoio ao tratamento.
        
        Gere um PLANO NUTRICIONAL INTEGRATIVO para o paciente ${clientName}.
        
        Contexto clínico e comportamental: "${sanitizedObservation}"
        Estilo do nutricionista: ${JSON.stringify(personality || {})}
        
        O plano deve integrar:
        1. NUTRIÇÃO: Estratégias alimentares práticas
        2. FILOSOFIA: Princípios para mudança de comportamento (tomismo, mindfulness, etc.)
        3. RITUAIS: Práticas diárias que conectam alimentação e reflexão
        
        Foque em:
        - focusArea: Meta principal do tratamento
        - morningRoutine: Ritual matinal (alimentação + reflexão)
        - dailyReading: Texto ou princípio para meditar
        - avoidance: O que evitar (comportamentos, não apenas alimentos)
        - notes: Observações para o nutricionista`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: PLAN_SCHEMA as Schema,
        temperature: 0.7,
      },
    });

    if (!response.text) {
      throw createError('No response from AI', 502);
    }

    const result = JSON.parse(response.text);
    logger.info({ focusArea: result.focusArea }, 'Plan generated');
    
    res.json(result);
  })
);

export default router;
