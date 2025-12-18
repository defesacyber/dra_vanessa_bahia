import { Router, Request, Response } from 'express';
import { GoogleGenAI, Schema, Type } from '@google/genai';
import { config } from '../config/env.js';
import { validateBody } from '../middleware/validation.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { aiLimiter } from '../middleware/rateLimiter.js';
import { requireNutritionist } from '../middleware/authMiddleware.js';
import { profileRequestSchema, ProfileRequest } from '../schemas/api.js';
import { logger } from '../lib/logger.js';

const router = Router();
const ai = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });

const PROFILE_ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    archetype: {
      type: Type.STRING,
      enum: ['thomist', 'empathetic', 'analytical', 'tough-love'],
    },
    customInstructions: { type: Type.STRING },
  },
  required: ['archetype', 'customInstructions'],
};

router.post(
  '/',
  ...requireNutritionist,
  aiLimiter,
  validateBody(profileRequestSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const { answers } = req.body as ProfileRequest;

    logger.info({ answersCount: Object.keys(answers).length }, 'Analyzing professional profile');

    const prompt = `
      Você está analisando o perfil de um NUTRICIONISTA que usa filosofia como apoio ao tratamento.
      
      Respostas do profissional: ${JSON.stringify(answers)}
      
      Com base nas respostas, determine:
      1. ARQUÉTIPO de atendimento:
         - "thomist": Nutricionista focado em virtudes, ordem natural, bem integral do paciente
         - "empathetic": Nutricionista acolhedor, foco em escuta ativa e compreensão
         - "analytical": Nutricionista técnico, baseado em dados e evidências científicas
         - "tough-love": Nutricionista direto, que desafia o paciente com firmeza amorosa
      
      2. INSTRUÇÕES PERSONALIZADAS para a IA:
         - Tom de voz a usar nas análises
         - Abordagens filosóficas preferidas (tomismo, mindfulness, etc.)
         - Estilo de comunicação com pacientes
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: PROFILE_ANALYSIS_SCHEMA as Schema,
        temperature: 0.7,
      },
    });

    if (!response.text) {
      throw createError('No response from AI', 502);
    }

    const result = JSON.parse(response.text);
    logger.info({ archetype: result.archetype }, 'Profile analysis completed');
    
    res.json(result);
  })
);

export default router;
