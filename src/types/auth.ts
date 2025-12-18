// ============================================
// Authentication & Authorization Types
// Multi-tenant: N Nutricionistas, cada um com N Pacientes
// ============================================

export type UserRole = 'PATIENT' | 'NUTRITIONIST';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient extends User {
  role: 'PATIENT';
  nutritionistId: string;
  status: 'active' | 'inactive' | 'paused';
  currentPlanId?: string;
  accessCode?: string;
}

export interface NutritionistProfile {
  photoUrl?: string;
  taglineTop?: string;      // Ex: "Seu cuidado diário"
  taglineBottom?: string;   // Ex: "Nutrindo corpo e mente..."
  themeColor?: string;      // Cor primária do tema
  philosophy?: string;      // Abordagem filosófica preferida
  bio?: string;
}

export interface Nutritionist extends User {
  role: 'NUTRITIONIST';
  crn: string;
  specialty?: string;
  patients: string[];       // Patient IDs
  profile: NutritionistProfile;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface PatientAccessCredentials {
  accessCode: string;
}

export interface RegisterNutritionistData {
  name: string;
  email: string;
  password: string;
  crn: string;
  specialty?: string;
}

export interface RegisterPatientData {
  name: string;
  email: string;
  nutritionistId: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

// Route protection
export interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
  redirectTo?: string;
}
