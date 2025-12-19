import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3001),
  GEMINI_API_KEY: z.string().min(1, 'GEMINI_API_KEY is required'),
  
  // JWT Secret - required for token signing
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters').default(
    process.env.NODE_ENV === 'production' 
      ? '' // Force error in production if not set
      : 'dev-insecure-secret-change-in-production-' + Math.random().toString(36)
  ),
  
  // Rate limiting
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(50),
  
  // CORS
  CORS_ORIGIN: z.string().default('*'),
});

export type EnvConfig = z.infer<typeof envSchema>;

function validateEnv(): EnvConfig {
  const result = envSchema.safeParse(process.env);
  
  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    console.error(result.error.flatten().fieldErrors);
    process.exit(1);
  }
  
  return result.data;
}

export const config = validateEnv();
