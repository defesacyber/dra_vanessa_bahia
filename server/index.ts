import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import dotenv from 'dotenv';

// Load env vars before importing config (try .env.local first, then .env)
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Import after env is loaded
import { config } from './config/env.js';
import { logger } from './lib/logger.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';

// Routes
import healthRouter from './routes/health.js';
import analyzeRouter from './routes/analyze.js';
import profileRouter from './routes/profile.js';
import planRouter from './routes/plan.js';
import chatRouter from './routes/chat.js';
import authRouter from './routes/auth.js';
import patientsRouter from './routes/patients.js';
import policyRouter from './routes/policy.js';
import messagesRouter from './routes/messages.js';
import auditRouter from './routes/audit.js';

const app = express();

// ====================
// Security Middleware
// ====================
app.use(helmet({
  contentSecurityPolicy: config.NODE_ENV === 'production' ? {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
    },
  } : false,
}));

app.use(cors({
  origin: config.CORS_ORIGIN === '*' ? true : config.CORS_ORIGIN.split(','),
  credentials: true,
}));

// ====================
// Body Parsing
// ====================
app.use(express.json({ limit: '100kb' })); // Limit request body size

// ====================
// Request Logging
// ====================
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    if (req.path !== '/health') {
      logger.info({
        method: req.method,
        path: req.path,
        status: res.statusCode,
        duration: Date.now() - start,
      }, 'Request completed');
    }
  });
  next();
});

// ====================
// Rate Limiting
// ====================
app.use('/api/', apiLimiter);

// ====================
// API Routes (v1)
// ====================
app.use('/', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/v1/analyze', analyzeRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/plan', planRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/patients', patientsRouter);
app.use('/api/v1/policy', policyRouter);
app.use('/api/v1/messages', messagesRouter);
app.use('/api/v1/audit', auditRouter);

// Legacy routes (to be deprecated)
app.use('/api/analyze', analyzeRouter);
app.use('/api/profile', profileRouter);
app.use('/api/plan', planRouter);
app.use('/api/chat', chatRouter);

// ====================
// Static Files (Production)
// ====================
if (config.NODE_ENV === 'production') {
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath, {
    maxAge: '1d',
    etag: true,
  }));
  
  // SPA fallback
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// ====================
// Error Handling
// ====================
app.use(errorHandler);

// ====================
// Server Start
// ====================
const server = app.listen(config.PORT, () => {
  logger.info({
    port: config.PORT,
    env: config.NODE_ENV,
  }, '🚀 Têmpera API server started');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

export default app;
