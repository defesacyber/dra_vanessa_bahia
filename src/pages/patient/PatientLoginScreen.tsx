import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Tela de Login EXCLUSIVA para Pacientes
 * - Não mostra nenhuma referência a "nutricionista"
 * - Acesso via código fornecido pela nutricionista
 */
export const PatientLoginScreen: React.FC = () => {
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { loginAsPatient } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await loginAsPatient({ accessCode: accessCode.toUpperCase().trim() });

    setIsLoading(false);

    if (result.success) {
      navigate('/app');
    } else {
      setError(result.error || 'Código de acesso inválido');
    }
  };

  return (
    <div className="min-h-screen bg-tempera-ivory text-tempera-deep flex flex-col items-center justify-center px-4 font-serif">
      {/* LOGO */}
      <div className="mb-10 text-center animate-fade-in text-tempera-deep">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Leaf_icon.svg"
          alt="Têmpera Logo"
          className="mx-auto w-20 mb-3 opacity-90"
        />
        <h1 className="text-4xl font-semibold tracking-tight">Têmpera</h1>
        <p className="text-sm uppercase tracking-[0.25em] text-tempera-stone font-sans">Área do Paciente</p>
      </div>

      {/* CARD DE LOGIN */}
      <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl w-full max-w-md p-10 border border-tempera-stone/20 animate-fade-in">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-tempera-olive flex items-center justify-center text-white font-serif text-2xl shadow-md border-2 border-tempera-stone/20">
            T
          </div>
          <h2 className="text-2xl font-semibold">Bem-vindo(a)</h2>
          <p className="text-tempera-stone text-sm mt-2">Insira seu código de acesso pessoal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="accessCode" className="block text-sm mb-1 font-medium">Código de Acesso</label>
            <input
              id="accessCode"
              type="text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
              placeholder="CODE-123"
              className="w-full border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-tempera-olive focus:border-tempera-olive focus:outline-none transition bg-white/50 text-center text-lg tracking-widest uppercase"
              maxLength={12}
              required
            />
            <p className="text-xs text-stone-400 mt-2 text-center italic">
              O código foi enviado pela sua nutricionista
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm border border-red-100 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || accessCode.length < 4}
            className="w-full bg-tempera-olive hover:bg-tempera-olive/90 text-white py-3 rounded-xl font-medium tracking-wide transition shadow-md disabled:opacity-50"
          >
            {isLoading ? 'Acessando...' : 'Entrar'}
          </button>
        </form>
      </div>

      {/* FOOTER */}
      <p className="mt-10 text-xs text-tempera-stone/60 tracking-wider italic animate-fade-in text-center font-sans">
        Nutrição Integrativa · Filosofia Aplicada
      </p>

      {/* Animation Styles */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 1.2s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PatientLoginScreen;
