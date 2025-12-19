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
    <div className="min-h-screen bg-tempera-ivory text-tempera-deep flex flex-col items-center justify-center px-4 font-serif">
      {/* LOGO */}
      <div className="mb-10 text-center animate-fade-in text-tempera-deep">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Leaf_icon.svg"
          alt="Têmpera Logo"
          className="mx-auto w-20 mb-3 opacity-90"
        />
        <h1 className="text-4xl font-semibold tracking-tight">Têmpera</h1>
        <p className="text-sm uppercase tracking-[0.25em] text-tempera-stone font-sans">Nutrição Integrativa</p>
      </div>

      {/* CARD DE LOGIN */}
      <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl w-full max-w-md p-10 border border-tempera-stone/20 animate-fade-in">
        <h2 className="text-2xl text-center font-semibold mb-6">Portal do Nutricionista</h2>
        <p className="text-center text-xs text-tempera-stone mb-8 italic">
          <span>swphrosýnē · temperantia</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm mb-1 font-medium">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome@tempera.com.br"
              className="w-full border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-tempera-olive focus:border-tempera-olive focus:outline-none transition bg-white/50"
              required
            />
          </div>
          <div>
            <label htmlFor="senha" className="block text-sm mb-1 font-medium">Senha</label>
            <input
              id="senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-tempera-olive focus:border-tempera-olive focus:outline-none transition bg-white/50"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm border border-red-100 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-tempera-olive hover:bg-tempera-olive/90 text-white py-3 rounded-xl font-medium tracking-wide transition shadow-md disabled:opacity-50"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/nutri/register" className="text-sm text-tempera-olive hover:underline decoration-1 underline-offset-4">
            Solicitar credenciamento
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <p className="mt-10 text-xs text-tempera-stone/60 tracking-wider italic animate-fade-in text-center font-sans">
        ἀρετή · virtus · excelência
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

export default NutritionistLoginScreen;
