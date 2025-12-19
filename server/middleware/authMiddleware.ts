import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../lib/logger.js';
import { config } from '../config/env.js';

type UserRole = 'PATIENT' | 'NUTRITIONIST';

interface TokenPayload {
  id: string;
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

/**
 * Middleware para verificar autenticação via Bearer token
 */
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Autenticação necessária',
        code: 'UNAUTHORIZED',
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify JWT token
      const payload = jwt.verify(token, config.JWT_SECRET) as TokenPayload;

      // Anexar usuário à request
      req.user = payload;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          success: false,
          error: 'Sessão expirada. Faça login novamente.',
          code: 'TOKEN_EXPIRED',
        });
      }

      return res.status(401).json({
        success: false,
        error: 'Token inválido',
        code: 'INVALID_TOKEN',
      });
    }
  } catch (error) {
    logger.error({ error }, 'Error in auth middleware');
    return res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
    });
  }
};

/**
 * Middleware para verificar role específica
 * Usar APÓS requireAuth
 */
export const requireRole = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Autenticação necessária',
        code: 'UNAUTHORIZED',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      logger.warn({
        userId: req.user.id,
        userRole: req.user.role,
        requiredRoles: allowedRoles,
        path: req.path,
      }, 'Access denied - insufficient role');

      return res.status(403).json({
        success: false,
        error: 'Você não tem permissão para acessar este recurso',
        code: 'FORBIDDEN',
        yourRole: req.user.role,
        requiredRoles: allowedRoles,
      });
    }

    next();
  };
};

/**
 * Middleware apenas para Nutricionistas
 */
export const requireNutritionist = [requireAuth, requireRole('NUTRITIONIST')];

/**
 * Middleware apenas para Pacientes
 */
export const requirePatient = [requireAuth, requireRole('PATIENT')];

/**
 * Middleware para qualquer usuário autenticado
 */
export const requireAnyUser = [requireAuth, requireRole('PATIENT', 'NUTRITIONIST')];
