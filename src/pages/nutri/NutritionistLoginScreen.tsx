import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Tela de Login GENÉRICA para Nutricionistas
 * - Sem foto ou nome de nenhum nutricionista específico
 * - A personalização ocorre APÓS o login
 * - Link para cadastro de novos nutricionistas
 */
export const NutritionistLoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { loginAsNutritionist } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await loginAsNutritionist({ email: email.trim(), password });

    setIsLoading(false);

    if (result.success) {
      navigate('/nutri');
    } else {
      setError(result.error || 'Credenciais inválidas');
    }
  };

  return (
    <div className="min-h-screen bg-tempera-ivory flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-tempera-olive/20 mix-blend-multiply z-10" />
        <img
          src="/tempera.jpg"
          alt="Alegoria da Temperança"
          className="w-full h-full object-cover grayscale-[20%] sepia-[10%]"
        />
        <div className="absolute bottom-12 left-12 z-20 text-white max-w-md">
          <p className="font-serif italic text-2xl mb-2">"A temperança é a virtude que dispõe a razão a governar as paixões."</p>
          <p className="text-sm opacity-90">— São Tomás de Aquino</p>
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
              Nutrição Integrativa
            </p>
          </div>

          <div className="bg-white p-8 rounded-sm shadow-[0_4px_20px_-4px_rgba(44,62,47,0.1)] border border-tempera-gold/20 space-y-6">
            <div className="text-center">
              <h2 className="font-serif text-2xl text-tempera-deep">Portal do Nutricionista</h2>
              <p className="text-stone-500 text-sm mt-2">swphrosýnē · temperantia</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-tempera-deep mb-1">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-tempera-ivory/50 border border-tempera-gold/30 rounded-sm focus:ring-1 focus:ring-tempera-olive focus:border-tempera-olive outline-none transition-all placeholder:text-stone-400"
                  placeholder="nome@tempera.com.br"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-tempera-deep mb-1">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-tempera-ivory/50 border border-tempera-gold/30 rounded-sm focus:ring-1 focus:ring-tempera-olive focus:border-tempera-olive outline-none transition-all placeholder:text-stone-400"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-sm border border-red-100 rounded-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-tempera-olive text-white font-serif text-lg tracking-wide hover:bg-tempera-deep transition-all shadow-md disabled:opacity-50"
              >
                {isLoading ? 'Entrando...' : 'Acessar Portal'}
              </button>
            </form>

            <div className="pt-6 border-t border-tempera-gold/10 text-center">
              <Link to="/nutri/register" className="text-tempera-gold hover:text-tempera-olive transition-colors underline decoration-1 underline-offset-4">
                Solicitar credenciamento
              </Link>
            </div>
          </div>

          <div className="text-center text-xs text-tempera-deep/40 font-serif italic">
            ἀρετή · virtus · excelência
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionistLoginScreen;
