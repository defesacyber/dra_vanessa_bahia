import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole, AuthState, LoginCredentials, PatientAccessCredentials, AuthResponse } from '../types/auth';

interface AuthContextType extends AuthState {
  token: string | null;
  loginAsNutritionist: (credentials: LoginCredentials) => Promise<AuthResponse>;
  loginAsPatient: (credentials: PatientAccessCredentials) => Promise<AuthResponse>;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
  getAuthHeaders: () => { Authorization: string } | Record<string, never>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'tempera_auth';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });
  const [token, setToken] = useState<string | null>(null);

  // Load persisted auth on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setState({
          user: parsed.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        setToken(parsed.token || null);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const loginAsNutritionist = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await fetch('/api/auth/nutritionist/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (data.success && data.user) {
        const authData = { user: data.user, token: data.token };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
        setToken(data.token);
        setState({
          user: data.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return { success: true, user: data.user, token: data.token };
      } else {
        setState(prev => ({ ...prev, isLoading: false, error: data.error || 'Erro ao fazer login' }));
        return { success: false, error: data.error || 'Credenciais inválidas' };
      }
    } catch {
      const message = 'Erro de conexão. Tente novamente.';
      setState(prev => ({ ...prev, isLoading: false, error: message }));
      return { success: false, error: message };
    }
  };

  const loginAsPatient = async (credentials: PatientAccessCredentials): Promise<AuthResponse> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await fetch('/api/auth/patient/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (data.success && data.user) {
        const authData = { user: data.user, token: data.token };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));        setToken(data.token);        setState({
          user: data.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return { success: true, user: data.user, token: data.token };
      } else {
        setState(prev => ({ ...prev, isLoading: false, error: data.error || 'Erro ao fazer login' }));
        return { success: false, error: data.error || 'Código de acesso inválido' };
      }
    } catch {
      const message = 'Erro de conexão. Tente novamente.';
      setState(prev => ({ ...prev, isLoading: false, error: message }));
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const hasRole = (role: UserRole): boolean => {
    return state.user?.role === role;
  };

  const getAuthHeaders = (): { Authorization: string } | Record<string, never> => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      token,
      loginAsNutritionist,
      loginAsPatient,
      logout,
      hasRole,
      getAuthHeaders,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
