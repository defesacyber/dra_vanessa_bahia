import { Router, Request, Response } from 'express';
import { requireNutritionist } from '../middleware/authMiddleware.js';
import { registerPatientSchema } from '../schemas/auth.js';
import { mockUsers, User } from './auth.js';
import { logger } from '../lib/logger.js';

const router = Router();

// ============================================
// Helper: Gerar código de acesso único
// ============================================

function generateAccessCode(name: string): string {
  const prefix = name.split(' ')[0].toUpperCase().slice(0, 4);
  const suffix = Math.random().toString(36).substring(2, 5).toUpperCase();
  const code = prefix + suffix;
  
  // Verificar se já existe
  const exists = mockUsers.some(u => u.accessCode === code);
  if (exists) {
    return generateAccessCode(name); // Recursivo até encontrar único
  }
  
  return code;
}

// ============================================
// GET /api/v1/patients
// Listar pacientes do nutricionista logado
// ============================================

router.get(
  '/',
  ...requireNutritionist,
  async (req: Request, res: Response) => {
    try {
      const nutritionistId = req.user?.id;
      
      const patients = mockUsers
        .filter(u => u.role === 'PATIENT' && u.nutritionistId === nutritionistId)
        .map(p => ({
          id: p.id,
          name: p.name,
          email: p.email,
          phone: p.phone,
          status: p.status,
          accessCode: p.accessCode,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
        }));
      
      return res.json({
        success: true,
        patients,
        total: patients.length,
      });
    } catch (error) {
      logger.error({ error }, 'Error listing patients');
      return res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }
);

// ============================================
// GET /api/v1/patients/:id
// Obter detalhes de um paciente
// ============================================

router.get(
  '/:id',
  ...requireNutritionist,
  async (req: Request, res: Response) => {
    try {
      const nutritionistId = req.user?.id;
      const { id } = req.params;
      
      const patient = mockUsers.find(
        u => u.id === id && u.role === 'PATIENT' && u.nutritionistId === nutritionistId
      );
      
      if (!patient) {
        return res.status(404).json({
          success: false,
          error: 'Paciente não encontrado',
        });
      }
      
      return res.json({
        success: true,
        patient: {
          id: patient.id,
          name: patient.name,
          email: patient.email,
          phone: patient.phone,
          birthDate: patient.birthDate,
          notes: patient.notes,
          status: patient.status,
          accessCode: patient.accessCode,
          createdAt: patient.createdAt,
          updatedAt: patient.updatedAt,
        },
      });
    } catch (error) {
      logger.error({ error }, 'Error getting patient');
      return res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }
);

// ============================================
// POST /api/v1/patients
// Cadastrar novo paciente
// ============================================

router.post(
  '/',
  ...requireNutritionist,
  async (req: Request, res: Response) => {
    try {
      const nutritionistId = req.user?.id;
      
      const parsed = registerPatientSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          error: 'Dados inválidos',
          details: parsed.error.flatten().fieldErrors,
        });
      }

      const { name, email, phone, birthDate, notes } = parsed.data;

      // Verificar se email já existe (se fornecido)
      if (email) {
        const existingEmail = mockUsers.find(
          u => u.email?.toLowerCase() === email.toLowerCase()
        );
        if (existingEmail) {
          return res.status(409).json({
            success: false,
            error: 'Este e-mail já está cadastrado',
          });
        }
      }

      // Gerar código de acesso único
      const accessCode = generateAccessCode(name);

      const newPatient: User = {
        id: `patient-${Date.now()}`,
        email: email || '',
        name,
        role: 'PATIENT',
        accessCode,
        nutritionistId,
        status: 'active',
        phone,
        birthDate,
        notes,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUsers.push(newPatient);

      logger.info({ 
        patientId: newPatient.id, 
        nutritionistId,
        accessCode,
      }, 'New patient registered');

      return res.status(201).json({
        success: true,
        patient: {
          id: newPatient.id,
          name: newPatient.name,
          status: newPatient.status,
        },
        accessCode: newPatient.accessCode,
      });
    } catch (error) {
      logger.error({ error }, 'Error registering patient');
      return res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }
);

// ============================================
// PATCH /api/v1/patients/:id
// Atualizar dados do paciente
// ============================================

router.patch(
  '/:id',
  ...requireNutritionist,
  async (req: Request, res: Response) => {
    try {
      const nutritionistId = req.user?.id;
      const { id } = req.params;
      
      const patientIndex = mockUsers.findIndex(
        u => u.id === id && u.role === 'PATIENT' && u.nutritionistId === nutritionistId
      );
      
      if (patientIndex === -1) {
        return res.status(404).json({
          success: false,
          error: 'Paciente não encontrado',
        });
      }

      const { name, email, phone, birthDate, notes, status } = req.body;
      
      // Atualizar campos permitidos
      if (name) mockUsers[patientIndex].name = name;
      if (email !== undefined) mockUsers[patientIndex].email = email;
      if (phone !== undefined) mockUsers[patientIndex].phone = phone;
      if (birthDate !== undefined) mockUsers[patientIndex].birthDate = birthDate;
      if (notes !== undefined) mockUsers[patientIndex].notes = notes;
      if (status) mockUsers[patientIndex].status = status;
      mockUsers[patientIndex].updatedAt = new Date();

      logger.info({ patientId: id, nutritionistId }, 'Patient updated');

      return res.json({
        success: true,
        patient: {
          id: mockUsers[patientIndex].id,
          name: mockUsers[patientIndex].name,
          status: mockUsers[patientIndex].status,
        },
      });
    } catch (error) {
      logger.error({ error }, 'Error updating patient');
      return res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }
);

// ============================================
// DELETE /api/v1/patients/:id
// Remover paciente (soft delete = status inactive)
// ============================================

router.delete(
  '/:id',
  ...requireNutritionist,
  async (req: Request, res: Response) => {
    try {
      const nutritionistId = req.user?.id;
      const { id } = req.params;
      
      const patientIndex = mockUsers.findIndex(
        u => u.id === id && u.role === 'PATIENT' && u.nutritionistId === nutritionistId
      );
      
      if (patientIndex === -1) {
        return res.status(404).json({
          success: false,
          error: 'Paciente não encontrado',
        });
      }

      // Soft delete
      mockUsers[patientIndex].status = 'inactive';
      mockUsers[patientIndex].updatedAt = new Date();

      logger.info({ patientId: id, nutritionistId }, 'Patient deactivated');

      return res.json({
        success: true,
        message: 'Paciente desativado com sucesso',
      });
    } catch (error) {
      logger.error({ error }, 'Error deleting patient');
      return res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }
);

// ============================================
// POST /api/v1/patients/:id/regenerate-code
// Gerar novo código de acesso
// ============================================

router.post(
  '/:id/regenerate-code',
  ...requireNutritionist,
  async (req: Request, res: Response) => {
    try {
      const nutritionistId = req.user?.id;
      const { id } = req.params;
      
      const patientIndex = mockUsers.findIndex(
        u => u.id === id && u.role === 'PATIENT' && u.nutritionistId === nutritionistId
      );
      
      if (patientIndex === -1) {
        return res.status(404).json({
          success: false,
          error: 'Paciente não encontrado',
        });
      }

      const newCode = generateAccessCode(mockUsers[patientIndex].name);
      mockUsers[patientIndex].accessCode = newCode;
      mockUsers[patientIndex].updatedAt = new Date();

      logger.info({ patientId: id, nutritionistId }, 'Patient access code regenerated');

      return res.json({
        success: true,
        accessCode: newCode,
      });
    } catch (error) {
      logger.error({ error }, 'Error regenerating access code');
      return res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      });
    }
  }
);

export default router;
