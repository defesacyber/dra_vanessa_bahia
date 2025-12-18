/// <reference lib="dom" />
import React from 'react';

interface LoginScreenProps {
  onLogin: (role: 'client' | 'professional') => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-stone-200 text-center space-y-8">
        <div className="space-y-3">
          <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-emerald-200 shadow-lg bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
            <img 
              src="/images/dra-vanessa.jpg?v=1" 
              alt="Dra. Vanessa Bahia" 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as any;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = '<span class="text-4xl">👩‍⚕️</span>';
                }
              }}
            />
          </div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Dra. Vanessa Bahia</h1>
          <p className="text-emerald-600 text-sm font-medium">Seu cuidado diário</p>
          <p className="text-stone-400 text-xs italic">Nutrindo corpo e mente, com reflexão e tempero</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => onLogin('client')}
            className="w-full p-4 border-2 border-stone-100 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all group text-left flex items-center gap-4"
          >
            <div className="text-3xl bg-white p-2 rounded-full shadow-sm group-hover:scale-110 transition-transform">👤</div>
            <div>
              <div className="font-bold text-stone-800">Sou Paciente</div>
              <div className="text-xs text-stone-500">Acessar meu plano nutricional integrativo</div>
            </div>
          </button>

          <button 
            onClick={() => onLogin('professional')}
            className="w-full p-4 border-2 border-stone-100 rounded-xl hover:border-teal-700 hover:bg-teal-50 transition-all group text-left flex items-center gap-4"
          >
            <div className="text-3xl bg-white p-2 rounded-full shadow-sm group-hover:scale-110 transition-transform">👩‍⚕️</div>
            <div>
              <div className="font-bold text-stone-800">Sou Nutricionista</div>
              <div className="text-xs text-stone-500">Gerenciar pacientes com abordagem integrativa</div>
            </div>
          </button>
        </div>

        <div className="pt-4 border-t border-stone-100">
          <p className="text-xs text-stone-400">
            Cuidando de você por inteiro
          </p>
          <p className="text-[10px] text-stone-300 mt-2">
            v2.0 - Nutrição Integrativa
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
