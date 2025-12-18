import { z } from 'zod';

// ============================================
// Shared Schemas for API Validation
// ============================================

export const personalitySchema = z.object({
  archetype: z.enum(['thomist', 'empathetic', 'analytical', 'tough-love']).optional(),
  basePersona: z.string().max(1000).optional(),
  customInstructions: z.string().max(1000).optional(),
}).optional();

// Profile Analysis
export const profileRequestSchema = z.object({
  answers: z.record(z.string(), z.string()).refine(
    (obj) => Object.keys(obj).length > 0 && Object.keys(obj).length <= 20,
    { message: 'Answers must have 1-20 entries' }
  ),
});

// Plan Generation
export const planRequestSchema = z.object({
  clientName: z.string().min(1).max(100),
  observation: z.string().min(1).max(2000),
  personality: personalitySchema,
});

// Thought Analysis
export const analyzeRequestSchema = z.object({
  thought: z.string()
    .min(1, 'Thought is required')
    .max(5000, 'Thought must be under 5000 characters'),
  personality: personalitySchema,
});

// Chat
export const chatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  parts: z.array(z.object({ text: z.string() })),
});

export const chatRequestSchema = z.object({
  history: z.array(chatMessageSchema).max(50).optional(),
  message: z.string().min(1).max(2000),
  context: z.object({
    calories: z.number().optional(),
    analysis: z.string().optional(),
    prescription: z.string().optional(),
  }).optional(),
  personality: personalitySchema,
});

// Export types
export type ProfileRequest = z.infer<typeof profileRequestSchema>;
export type PlanRequest = z.infer<typeof planRequestSchema>;
export type AnalyzeRequest = z.infer<typeof analyzeRequestSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
