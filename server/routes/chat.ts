import { Router, Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { config } from '../config/env.js';
import { validateBody, sanitizePromptInput } from '../middleware/validation.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { aiLimiter } from '../middleware/rateLimiter.js';
import { requireAnyUser } from '../middleware/authMiddleware.js';
import { chatRequestSchema, ChatRequest } from '../schemas/api.js';
import { logger } from '../lib/logger.js';

const router = Router();
const ai = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });

router.post(
  '/',
  ...requireAnyUser,
  aiLimiter,
  validateBody(chatRequestSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const { history, message, context, personality } = req.body as ChatRequest;

    const sanitizedMessage = sanitizePromptInput(message);
    const basePersona = personality?.basePersona || 'Você é um terapeuta profundamente empático.';
    const customInstructions = personality?.customInstructions || 'Seja gentil.';

    logger.info({ historyLength: history?.length || 0 }, 'Processing chat message');

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `
          Você é um CONSULTOR para nutricionistas que integram filosofia ao tratamento nutricional.
          
          Seu papel é ajudar o nutricionista a:
          1. Aprofundar a análise do caso do paciente
          2. Sugerir abordagens filosóficas aplicáveis
          3. Criar estratégias práticas de intervenção
          
          SUA PERSONALIDADE:
          ${basePersona}
          INSTRUÇÕES:
          ${customInstructions}
          
          Contexto da Análise do Paciente:
          Complexidade do Caso: ${context?.calories || 'N/A'}
          Análise Integrativa: ${context?.analysis || 'N/A'}
          Recomendações Iniciais: ${context?.prescription || 'N/A'}
          
          Use diálogo socrático para ajudar o nutricionista a refletir.
          Cite filósofos relevantes (Sêneca, Epicuro, Marco Aurélio, Aristóteles).
          Mantenha foco prático: como aplicar filosofia no consultório.
        `,
      },
      history: history || [],
    });

    const result = await chat.sendMessage({ message: sanitizedMessage });
    
    if (!result.text) {
      throw createError('No response from AI', 502);
    }

    logger.info('Chat response generated');
    res.json({ text: result.text });
  })
);

export default router;
