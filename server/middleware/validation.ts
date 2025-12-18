import type { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

/**
 * Middleware factory for validating request body with Zod schemas
 */
export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      res.status(400).json({
        error: 'Validation Error',
        details: result.error.flatten(),
      });
      return;
    }
    
    // Attach validated data to request
    req.body = result.data;
    next();
  };
}

/**
 * Sanitize string to prevent prompt injection
 */
export function sanitizePromptInput(input: string): string {
  // Remove potential prompt injection patterns
  return input
    .replace(/```[\s\S]*?```/g, '[code block removed]')
    .replace(/\{[\s\S]*?\}/g, (match) => {
      // Keep JSON-like structures but limit size
      if (match.length > 500) return '[large object removed]';
      return match;
    })
    .slice(0, 5000); // Hard limit on input size
}
