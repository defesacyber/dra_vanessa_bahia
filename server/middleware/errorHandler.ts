import { Request, Response, NextFunction } from 'express';
import { logger } from '../lib/logger.js';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

/**
 * Central error handling middleware
 */
export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err.statusCode || 500;
  const isOperational = err.isOperational ?? false;

  // Log error with context
  logger.error({
    err,
    method: req.method,
    path: req.path,
    statusCode,
    isOperational,
    correlationId: req.headers['x-correlation-id'],
  }, 'Request error');

  // Don't leak internal errors to client in production
  const message = process.env.NODE_ENV === 'production' && !isOperational
    ? 'Internal Server Error'
    : err.message;

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

/**
 * Create an operational error (safe to expose to client)
 */
export function createError(message: string, statusCode: number): AppError {
  const error: AppError = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
}

/**
 * Async handler wrapper to catch promise rejections
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
