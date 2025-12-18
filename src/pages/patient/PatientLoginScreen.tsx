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
    <div className="min-h-screen bg-tempera-ivory flex">
      {/* Left Side - Image (Reused or distinct for patient? Using same for brand consistency) */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-tempera-deep/30 mix-blend-multiply z-10" />
        <img
          src="/tempera.jpg"
          alt="Alegoria da Temperança"
          className="w-full h-full object-cover grayscale-[10%] sepia-[15%]"
        />
        <div className="absolute bottom-12 left-12 z-20 text-white max-w-md">
          <p className="font-serif italic text-2xl mb-2">"O equilíbrio não é algo que você encontra, é algo que você cria."</p>
          <p className="text-sm opacity-90">— Têmpera Nutrição</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-tempera-ivory">
        <div className="max-w-md w-full space-y-8">

          <div className="text-center space-y-2">
            <h1 className="font-serif text-4xl font-bold text-tempera-deep tracking-tight">
              TÊMPERA
            </h1>
            <p className="text-tempera-gold uppercase tracking-[0.2em] text-sm">
              Área do Paciente
            </p>
          </div>

          <div className="bg-white p-8 rounded-sm shadow-[0_4px_20px_-4px_rgba(44,62,47,0.1)] border border-tempera-gold/20 space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-tempera-olive flex items-center justify-center text-white font-serif text-2xl shadow-md border-2 border-tempera-gold">
                T
              </div>
              <h2 className="font-serif text-2xl text-tempera-deep">Bem-vindo(a)</h2>
              <p className="text-stone-500 text-sm mt-2">Insira seu código de acesso pessoal</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-tempera-deep mb-1">Código de Acesso</label>
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 bg-tempera-ivory/50 border border-tempera-gold/30 rounded-sm focus:ring-1 focus:ring-tempera-olive focus:border-tempera-olive outline-none transition-all placeholder:text-stone-400 text-center text-lg font-serif tracking-widest uppercase"
                  placeholder="CODE-123"
                  maxLength={8}
                  required
                />
                <p className="text-xs text-stone-400 mt-2 text-center italic">
                  O código foi enviado pela sua nutricionista
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-sm border border-red-100 rounded-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || accessCode.length < 4}
                className="w-full py-3 bg-tempera-olive text-white font-serif text-lg tracking-wide hover:bg-tempera-deep transition-all shadow-md disabled:opacity-50"
              >
                {isLoading ? 'Acessando...' : 'Entrar'}
              </button>
            </form>
          </div>

          <div className="text-center text-xs text-tempera-deep/40 font-serif italic">
            Nutrição Integrativa · Filosofia Aplicada
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientLoginScreen;
