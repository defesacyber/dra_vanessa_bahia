import { Router, Request, Response } from 'express';
import { GoogleGenAI, Schema, Type } from '@google/genai';
import { config } from '../config/env.js';
import { validateBody, sanitizePromptInput } from '../middleware/validation.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { aiLimiter } from '../middleware/rateLimiter.js';
import { requireNutritionist } from '../middleware/authMiddleware.js';
import { analyzeRequestSchema, AnalyzeRequest } from '../schemas/api.js';
import { logger } from '../lib/logger.js';

const router = Router();
const ai = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });

// Schema para Análise Integrativa (Nutrição + Filosofia)
const INTEGRATIVE_ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    // Contexto Nutricional
    nutritionalContext: { type: Type.STRING },
    mainChallenges: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING } 
    },
    nutritionalGoals: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING } 
    },
    
    // Apoio Filosófico
    philosophicalInsights: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          principle: { type: Type.STRING },
          application: { type: Type.STRING },
          source: { type: Type.STRING },
        },
      },
    },
    mindsetShifts: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING } 
    },
    
    // Integração
    integrativeApproach: { type: Type.STRING },
    practicalExercises: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING } 
    },
    
    // Métricas
    balanceScore: { type: Type.INTEGER },
    sustainabilityScore: { type: Type.INTEGER },
    
    // Prescrição
    weeklyFocus: { type: Type.STRING },
    dailyReflection: { type: Type.STRING },
    nutritionalPrescription: { type: Type.STRING },
  },
  required: [
    'nutritionalContext',
    'mainChallenges', 
    'nutritionalGoals',
    'philosophicalInsights',
    'mindsetShifts',
    'integrativeApproach',
    'practicalExercises',
    'balanceScore',
    'sustainabilityScore',
    'weeklyFocus',
    'dailyReflection',
    'nutritionalPrescription'
  ],
};

router.post(
  '/',
  ...requireNutritionist,
  aiLimiter,
  validateBody(analyzeRequestSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const { thought, personality } = req.body as AnalyzeRequest;
    
    const sanitizedInput = sanitizePromptInput(thought);
    const approach = personality?.basePersona || 'holístico e acolhedor';
    const customInstructions = personality?.customInstructions || 'Use linguagem profissional mas acessível.';

    logger.info({ inputLength: sanitizedInput.length }, 'Processing integrative nutrition analysis');

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: sanitizedInput,
      config: {
        systemInstruction: `
Você é um especialista em NUTRIÇÃO INTEGRATIVA que combina conhecimento clínico nutricional com princípios filosóficos para apoiar o tratamento integral de pacientes.

SEU PAPEL:
Você ajuda NUTRICIONISTAS a desenvolver abordagens que integram:
1. Nutrição clínica baseada em evidências
2. Filosofia prática (Tomismo, Mindfulness, etc.)
3. Psicologia comportamental aplicada à alimentação

ABORDAGEM PREFERIDA DO PROFISSIONAL:
${approach}

INSTRUÇÕES ESPECÍFICAS:
${customInstructions}

CONTEXTO DE USO:
O nutricionista descreve o caso de um paciente (desafios alimentares, comportamentos, objetivos) e você deve:

1. ANALISAR o contexto nutricional e identificar os principais desafios
2. SUGERIR metas nutricionais realistas e sustentáveis
3. INTEGRAR princípios filosóficos que apoiem a mudança de comportamento:
   - Tomismo: Virtudes cardeais (prudência, justiça, fortitude, temperança), ordem natural, bem integral
   - Mindful Eating: Atenção plena e consciência alimentar
   - Virtudes aristotélicas: Temperança, disciplina, propósito

4. PROPOR exercícios práticos que combinem reflexão filosófica + ação nutricional
5. CRIAR prescrições integradas com foco semanal e reflexão diária

SCORES (0-100):
- balanceScore: Quão equilibrada está a abordagem mente-corpo
- sustainabilityScore: Quão sustentável é o plano a longo prazo

Seja PRÁTICO, EMPÁTICO e CIENTIFICAMENTE EMBASADO.
Responda estritamente em JSON seguindo o schema.
        `,
        responseMimeType: 'application/json',
        responseSchema: INTEGRATIVE_ANALYSIS_SCHEMA as Schema,
        temperature: 0.7,
      },
    });

    if (!response.text) {
      throw createError('No response from AI', 502);
    }

    const result = JSON.parse(response.text);
    logger.info({ 
      challengesCount: result.mainChallenges?.length,
      balanceScore: result.balanceScore 
    }, 'Integrative analysis completed');
    
    res.json(result);
  })
);

export default router;
