import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Dual Access Landing Page
 * Contains both Nutritionist and Patient login forms in a single premium view.
 */
const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { loginAsNutritionist, loginAsPatient } = useAuth();

    // Nutritionist State
    const [nutriEmail, setNutriEmail] = useState('');
    const [nutriPassword, setNutriPassword] = useState('');
    const [isNutriLoading, setIsNutriLoading] = useState(false);
    const [nutriError, setNutriError] = useState<string | null>(null);

    // Patient State
    const [patientCode, setPatientCode] = useState('');
    const [isPatientLoading, setIsPatientLoading] = useState(false);
    const [patientError, setPatientError] = useState<string | null>(null);

    const handleNutriLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setNutriError(null);
        setIsNutriLoading(true);

        const result = await loginAsNutritionist({ email: nutriEmail.trim(), password: nutriPassword });
        setIsNutriLoading(false);

        if (result.success) {
            navigate('/nutri');
        } else {
            setNutriError(result.error || 'Não foi possível autenticar. Verifique os dados.');
        }
    };

    const handlePatientLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setPatientError(null);
        setIsPatientLoading(true);

        const result = await loginAsPatient({ accessCode: patientCode.toUpperCase().trim() });
        setIsPatientLoading(false);

        if (result.success) {
            navigate('/app');
        } else {
            setPatientError(result.error || 'Não foi possível autenticar. Verifique o código.');
        }
    };

    return (
        <div className="min-h-screen bg-tempera-ivory text-tempera-deep flex flex-col items-center py-12 px-4 font-serif">
            {/* HEADER / LOGO */}
            <div className="mb-12 text-center animate-fade-in">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Leaf_icon.svg"
                    alt="Têmpera Logo"
                    className="mx-auto w-16 mb-4 opacity-90 shadow-sm"
                />
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Têmpera</h1>
                <p className="text-sm uppercase tracking-[0.25em] text-tempera-stone font-sans mt-2">Nutrição Integrativa</p>
            </div>

            {/* TITLES */}
            <div className="text-center mb-16 space-y-3 animate-fade-in animation-delay-100">
                <h2 className="text-3xl md:text-4xl font-semibold">Acesse sua conta</h2>
                <p className="text-tempera-stone italic font-sans">Nutricionista ou Paciente — faça login abaixo</p>
            </div>

            {/* MAIN CONTAINER (Cards) */}
            <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-stretch animate-fade-in animation-delay-200">

                {/* CARD 1: NUTRITIONIST */}
                <div className="flex-1 bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-8 md:p-10 border border-tempera-stone/10 flex flex-col hover:border-tempera-olive/30 transition-all">
                    <div className="mb-10">
                        <h3 className="text-2xl font-semibold mb-2">Painel do Profissional</h3>
                        <p className="text-tempera-stone text-sm font-sans">Gerencie seus pacientes e planos terapêuticos</p>
                    </div>

                    <form onSubmit={handleNutriLogin} className="space-y-6 flex-grow">
                        <div className="space-y-1">
                            <label htmlFor="nutriEmail" className="block text-sm font-medium">E-mail Profissional</label>
                            <input
                                id="nutriEmail"
                                type="email"
                                value={nutriEmail}
                                onChange={(e) => setNutriEmail(e.target.value)}
                                placeholder="exemplo@tempera.com.br"
                                className="w-full border border-stone-200 bg-white/50 rounded-xl p-3 focus:ring-2 focus:ring-tempera-olive focus:border-tempera-olive focus:outline-none transition font-sans"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="nutriPass" className="block text-sm font-medium">Senha</label>
                            <input
                                id="nutriPass"
                                type="password"
                                value={nutriPassword}
                                onChange={(e) => setNutriPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full border border-stone-200 bg-white/50 rounded-xl p-3 focus:ring-2 focus:ring-tempera-olive focus:border-tempera-olive focus:outline-none transition font-sans"
                                required
                            />
                        </div>

                        {nutriError && (
                            <div className="p-3 bg-red-50 text-red-700 text-sm border border-red-100 rounded-xl font-sans text-center">
                                {nutriError}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isNutriLoading}
                            className="w-full bg-tempera-olive hover:bg-tempera-deep text-white py-4 rounded-xl font-medium tracking-wide transition shadow-lg disabled:opacity-50 mt-4 active:scale-95"
                        >
                            {isNutriLoading ? 'Autenticando...' : 'Entrar no Portal'}
                        </button>
                    </form>

                    <div className="mt-8 text-center pt-6 border-t border-tempera-stone/10">
                        <Link to="/nutri/register" className="text-sm text-tempera-stone hover:text-tempera-olive transition decoration-1 underline-offset-4 font-sans">
                            Ainda não tem conta? <span className="font-semibold">Solicitar credenciamento</span>
                        </Link>
                    </div>
                </div>

                {/* CARD 2: PATIENT */}
                <div className="flex-1 bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-8 md:p-10 border border-tempera-stone/10 flex flex-col border-t-[6px] border-t-tempera-gold lg:border-t-0 lg:border-l-[6px] lg:border-l-tempera-gold hover:border-tempera-gold/30 transition-all">
                    <div className="mb-10">
                        <h3 className="text-2xl font-semibold mb-2">Área do Paciente</h3>
                        <p className="text-tempera-stone text-sm font-sans">Acompanhe sua jornada de saúde integrativa</p>
                    </div>

                    <form onSubmit={handlePatientLogin} className="space-y-6 flex-grow flex flex-col justify-center">
                        <div className="space-y-2 text-center">
                            <label htmlFor="accessCode" className="block text-sm font-medium">Código de Acesso</label>
                            <input
                                id="accessCode"
                                type="text"
                                value={patientCode}
                                onChange={(e) => setPatientCode(e.target.value.toUpperCase())}
                                placeholder="VAN-X12"
                                className="w-full border border-stone-200 bg-white/50 rounded-xl p-4 focus:ring-2 focus:ring-tempera-gold focus:border-tempera-gold focus:outline-none transition text-center text-2xl font-bold tracking-[0.2em] uppercase placeholder:font-sans placeholder:text-sm placeholder:tracking-normal placeholder:font-normal"
                                maxLength={10}
                                required
                            />
                            <p className="text-xs text-tempera-stone/70 italic font-sans max-w-[200px] mx-auto">
                                Use o código fornecido pela sua nutricionista
                            </p>
                        </div>

                        {patientError && (
                            <div className="p-3 bg-red-50 text-red-700 text-sm border border-red-100 rounded-xl font-sans text-center mt-4">
                                {patientError}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isPatientLoading || patientCode.length < 4}
                            className="w-full bg-tempera-gold hover:bg-[#8e6a45] text-white py-4 rounded-xl font-medium tracking-wide transition shadow-lg disabled:opacity-50 mt-8 active:scale-95"
                        >
                            {isPatientLoading ? 'Acessando...' : 'Acessar Plano'}
                        </button>
                    </form>

                    <div className="mt-8 text-center pt-6 border-t border-tempera-stone/10">
                        <p className="text-xs text-tempera-stone font-sans">
                            Dificuldades com o código? Entre em contato com sua clínica.
                        </p>
                    </div>
                </div>

            </div>

            {/* FOOTER */}
            <div className="mt-20 text-center animate-fade-in animation-delay-300">
                <p className="text-xs text-tempera-stone/60 tracking-[0.2em] uppercase font-sans">
                    ἀρετή · virtus · excelência
                </p>
                <p className="mt-4 text-[10px] text-tempera-stone/40 font-sans italic">
                    © 2025 Têmpera Nutrição Humana · Filosofia e Ciência Aplicada
                </p>
            </div>

            {/* INJECT ANIMATION STYLES */}
            <style>{`
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.4s; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default LandingPage;
