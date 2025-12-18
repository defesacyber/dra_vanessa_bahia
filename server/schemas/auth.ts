import { z } from 'zod';

// ============================================
// Authentication Schemas
// Multi-tenant: N nutricionistas, cada um com N pacientes
// ============================================

export const nutritionistLoginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export const patientLoginSchema = z.object({
  accessCode: z.string().min(4, 'Código de acesso inválido').max(12),
});

export const registerNutritionistSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  crn: z.string().regex(/^\d{4,6}$/, 'CRN deve conter 4 a 6 dígitos'),
  specialty: z.string().optional(),
});

export const registerPatientSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  phone: z.string().optional(),
  birthDate: z.string().optional(),
  notes: z.string().optional(),
});

export type NutritionistLoginInput = z.infer<typeof nutritionistLoginSchema>;
export type PatientLoginInput = z.infer<typeof patientLoginSchema>;
export type RegisterNutritionistInput = z.infer<typeof registerNutritionistSchema>;
export type RegisterPatientInput = z.infer<typeof registerPatientSchema>;
