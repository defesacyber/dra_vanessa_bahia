import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

/**
 * Componente de proteção de rotas por role
 * - Verifica se usuário está autenticado
 * - Verifica se possui a role necessária
 * - Redireciona para página apropriada se não autorizado
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center space-y-4">
          <div className="animate-spin w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-stone-500">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  // Não autenticado - redireciona para login apropriado
  if (!isAuthenticated || !user) {
    // Determina para qual login redirecionar baseado na rota
    const isNutriRoute = location.pathname.startsWith('/nutri');
    const loginPath = isNutriRoute ? '/acesso-nutricionista' : '/acesso-paciente';

    return <Navigate to={redirectTo || loginPath} state={{ from: location }} replace />;
  }

  // Autenticado mas role não permitida
  if (!allowedRoles.includes(user.role)) {
    // Redireciona para área correta do usuário
    const correctPath = user.role === 'NUTRITIONIST' ? '/nutri' : '/app';

    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-red-200 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">🚫</span>
          </div>
          <h2 className="text-xl font-bold text-stone-900">Acesso Negado</h2>
          <p className="text-stone-600">
            Você não tem permissão para acessar esta área.
          </p>
          <p className="text-sm text-stone-500">
            Sua conta é do tipo: <strong>{user.role === 'NUTRITIONIST' ? 'Nutricionista' : 'Paciente'}</strong>
          </p>
          <button
            onClick={() => window.location.href = correctPath}
            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all"
          >
            Ir para minha área
          </button>
        </div>
      </div>
    );
  }

  // Autorizado - renderiza children
  return <>{children}</>;
};

/**
 * Guard específico para rotas de Paciente (/app/*)
 */
export const PatientRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute allowedRoles={['PATIENT']} redirectTo="/acesso-paciente">
    {children}
  </ProtectedRoute>
);

/**
 * Guard específico para rotas de Nutricionista (/nutri/*)
 */
export const NutritionistRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute allowedRoles={['NUTRITIONIST']} redirectTo="/acesso-nutricionista">
    {children}
  </ProtectedRoute>
);

/**
 * Componente para redirecionar usuário logado para sua área correta
 */
export const AuthRedirect: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    // Se já logado, redireciona para área correta
    const targetPath = user.role === 'NUTRITIONIST' ? '/nutri' : '/app';
    return <Navigate to={targetPath} replace />;
  }

  // Não autenticado - determina login baseado na URL
  if (location.pathname.startsWith('/nutri')) {
    return <Navigate to="/acesso-nutricionista" replace />;
  }

  return <Navigate to="/acesso-paciente" replace />;
};
