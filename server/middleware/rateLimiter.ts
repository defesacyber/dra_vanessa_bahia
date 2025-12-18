import rateLimit from 'express-rate-limit';
import { config } from '../config/env.js';

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests',
    message: 'You have exceeded the rate limit. Please try again later.',
    retryAfter: Math.ceil(config.RATE_LIMIT_WINDOW_MS / 1000),
  },
  validate: { xForwardedForHeader: false },
});

// Stricter limiter for expensive AI endpoints
export const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute for AI endpoints
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'AI rate limit exceeded',
    message: 'AI analysis is rate limited. Please wait before trying again.',
    retryAfter: 60,
  },
});
