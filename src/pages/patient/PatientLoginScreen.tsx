import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Tela de Login EXCLUSIVA para Pacientes
 * - v2.1: Redirecionamento para a Home unificada
 */
export const PatientLoginScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-tempera-ivory flex items-center justify-center p-4 font-serif">
      <div className="text-center animate-fade-in">
        <div className="w-12 h-12 border-4 border-tempera-olive border-t-tempera-gold rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-tempera-deep italic">Redirecionando para o portal unificado...</p>
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PatientLoginScreen;
