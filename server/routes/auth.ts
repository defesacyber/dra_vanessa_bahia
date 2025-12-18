import { Router, Request, Response } from 'express';
import { nutritionistLoginSchema, patientLoginSchema, registerNutritionistSchema } from '../schemas/auth.js';
import { logger } from '../lib/logger.js';

const router = Router();

// ============================================
// Mock Database (substituir por banco real)
// Multi-tenant: N nutricionistas, cada um com N pacientes
// ============================================

interface NutritionistProfile {
  photoUrl?: string;
  taglineTop?: string;
  taglineBottom?: string;
  themeColor?: string;
  philosophy?: string;
  bio?: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: 'PATIENT' | 'NUTRITIONIST';
  password?: string;
  accessCode?: string;
  nutritionistId?: string;
  status?: 'active' | 'inactive' | 'paused';
  crn?: string;
  specialty?: string;
  profile?: NutritionistProfile;
  phone?: string;
  birthDate?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mock users for development
const mockUsers: User[] = [
  {
    id: 'nutri-001',
    email: 'vanessa@nutrifilosofia.com',
    name: 'Dra. Vanessa Bahia',
    role: 'NUTRITIONIST',
    password: 'nutri123', // Em produção: hash bcrypt
    crn: '12345',
    specialty: 'comportamental',
    profile: {
      photoUrl: '/images/dra-vanessa.jpg',
      taglineTop: 'Seu cuidado diário',
      taglineBottom: 'Nutrindo corpo e mente, com reflexão e tempero',
      themeColor: '#059669', // emerald-600
      philosophy: 'tomismo',
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'patient-001',
    email: 'maria@email.com',
    name: 'Maria Silva',
    role: 'PATIENT',
    accessCode: 'MARIA123',
    nutritionistId: 'nutri-001',
    status: 'active',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: 'patient-002',
    email: 'joao@email.com',
    name: 'João Santos',
    role: 'PATIENT',
    accessCode: 'JOAO456',
    nutritionistId: 'nutri-001',
    status: 'active',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
];

// Export para uso em outros módulos
export { mockUsers };
export type { User };

// ============================================
// Helper: Generate simple token (usar JWT em produção)
// ============================================

function generateToken(user: User): string {
  // Em produção: usar jsonwebtoken com secret
  const payload = {
    id: user.id,
    role: user.role,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24h
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

// ============================================
// POST /api/auth/nutritionist/login
// Login da Nutricionista (email + senha)
// ============================================

router.post('/nutritionist/login', async (req: Request, res: Response) => {
  try {
    const parsed = nutritionistLoginSchema.safeParse(req.body);
    
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: 'Dados inválidos',
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { email, password } = parsed.data;

    // Buscar usuário
    const user = mockUsers.find(
      u => u.role === 'NUTRITIONIST' && u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user || user.password !== password) {
      logger.warn({ email }, 'Failed nutritionist login attempt');
      return res.status(401).json({
        success: false,
        error: 'E-mail ou senha incorretos',
      });
    }

    // Gerar token
    const token = generateToken(user);

    logger.info({ userId: user.id }, 'Nutritionist logged in');

    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        profile: user.profile, // Incluir perfil para personalização
      },
      token,
    });
  } catch (error) {
    logger.error({ error }, 'Error in nutritionist login');
    return res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
    });
  }
});

// ============================================
// POST /api/auth/nutritionist/register
// Cadastro de novo nutricionista
// ============================================

router.post('/nutritionist/register', async (req: Request, res: Response) => {
  try {
    const parsed = registerNutritionistSchema.safeParse(req.body);
    
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: 'Dados inválidos',
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { name, email, password, crn, specialty } = parsed.data;

    // Verificar se email já existe
    const existingUser = mockUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'Este e-mail já está cadastrado',
      });
    }

    // Verificar se CRN já existe
    const existingCrn = mockUsers.find(
      u => u.role === 'NUTRITIONIST' && u.crn === crn
    );

    if (existingCrn) {
      return res.status(409).json({
        success: false,
        error: 'Este CRN já está cadastrado',
      });
    }

    const newNutritionist: User = {
      id: `nutri-${Date.now()}`,
      email: email.toLowerCase(),
      name,
      role: 'NUTRITIONIST',
      password, // Em produção: hash bcrypt
      crn,
      specialty,
      profile: {
        themeColor: '#059669', // Default emerald
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockUsers.push(newNutritionist);

    logger.info({ nutritionistId: newNutritionist.id, email }, 'New nutritionist registered');

    return res.status(201).json({
      success: true,
      message: 'Conta criada com sucesso',
    });
  } catch (error) {
    logger.error({ error }, 'Error registering nutritionist');
    return res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
    });
  }
});

// ============================================
// POST /api/auth/patient/login
// Login do Paciente (código de acesso)
// ============================================

router.post('/patient/login', async (req: Request, res: Response) => {
  try {
    const parsed = patientLoginSchema.safeParse(req.body);
    
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: 'Código de acesso inválido',
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const { accessCode } = parsed.data;

    // Buscar usuário pelo código
    const user = mockUsers.find(
      u => u.role === 'PATIENT' && u.accessCode?.toUpperCase() === accessCode.toUpperCase()
    );

    if (!user) {
      logger.warn({ accessCode }, 'Failed patient login attempt - code not found');
      return res.status(401).json({
        success: false,
        error: 'Código de acesso não encontrado',
      });
    }

    if (user.status !== 'active') {
      logger.warn({ userId: user.id, status: user.status }, 'Patient account not active');
      return res.status(403).json({
        success: false,
        error: 'Sua conta está inativa. Entre em contato com sua nutricionista.',
      });
    }

    // Gerar token
    const token = generateToken(user);

    logger.info({ userId: user.id }, 'Patient logged in');

    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        nutritionistId: user.nutritionistId,
      },
      token,
    });
  } catch (error) {
    logger.error({ error }, 'Error in patient login');
    return res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
    });
  }
});

// ============================================
// POST /api/auth/logout
// Logout (invalidar token)
// ============================================

router.post('/logout', async (_req: Request, res: Response) => {
  // Em produção: adicionar token à blacklist
  return res.json({ success: true });
});

// ============================================
// GET /api/auth/me
// Obter usuário atual pelo token
// ============================================

router.get('/me', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Token não fornecido',
      });
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const payload = JSON.parse(Buffer.from(token, 'base64').toString());
      
      if (payload.exp < Date.now()) {
        return res.status(401).json({
          success: false,
          error: 'Token expirado',
        });
      }

      const user = mockUsers.find(u => u.id === payload.id);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Usuário não encontrado',
        });
      }

      return res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch {
      return res.status(401).json({
        success: false,
        error: 'Token inválido',
      });
    }
  } catch (error) {
    logger.error({ error }, 'Error getting current user');
    return res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
    });
  }
});

export default router;
