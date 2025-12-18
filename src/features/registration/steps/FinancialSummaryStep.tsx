import React, { useEffect } from 'react';
import { useRegistrationStore } from '../store/registrationStore';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Users, DollarSign, ArrowRight } from 'lucide-react';

export const FinancialSummaryStep: React.FC = () => {
    const { branding, reset } = useRegistrationStore();
    const navigate = useNavigate();

    // Reset store on unmount or after leaving, but here we want to clear it when going to dashboard
    const handleGoToDashboard = () => {
        reset();
        navigate('/acesso-nutricionista'); // Or direct to dashboard if we had real auth token flow set up
    };

    return (
        <div className="animate-in fade-in zoom-in-95 duration-700 text-center space-y-8">

            <div className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">Tudo pronto!</h2>
                <p className="text-stone-500 max-w-md mx-auto">
                    Sua conta foi criada e seu ambiente já está configurado com sua identidade visual.
                </p>
            </div>

            {/* Summary Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden max-w-lg mx-auto">
                <div className="bg-stone-50 px-6 py-4 border-b border-stone-100 flex justify-between items-center">
                    <span className="text-sm font-semibold text-stone-600 uppercase tracking-wider">Resumo Financeiro</span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded uppercase">Premium Ativo</span>
                </div>

                <div className="p-8 grid grid-cols-2 gap-8 divide-x divide-stone-100">
                    <div className="text-center space-y-2">
                        <div className="flex justify-center text-stone-400 mb-2">
                            <Users className="w-6 h-6" />
                        </div>
                        <div className="text-3xl font-bold text-stone-900">0</div>
                        <div className="text-sm text-stone-500">Pacientes Ativos</div>
                    </div>

                    <div className="text-center space-y-2">
                        <div className="flex justify-center text-stone-400 mb-2">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div className="text-3xl font-bold text-stone-900">R$ 0,00</div>
                        <div className="text-sm text-stone-500">Custo Estimado/mês</div>
                    </div>
                </div>

                <div className="bg-emerald-50/50 p-4 text-sm text-emerald-800 border-t border-emerald-100">
                    “Você só paga por pacientes com acesso liberado.”
                </div>
            </div>

            <div className="pt-4 space-y-3">
                <button
                    onClick={handleGoToDashboard}
                    className="w-full max-w-sm mx-auto py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
                >
                    Ir para o Painel
                    <ArrowRight className="w-5 h-5" />
                </button>

                <button
                    onClick={handleGoToDashboard}
                    className="block w-full max-w-sm mx-auto py-3 text-stone-500 hover:text-stone-700 text-sm font-medium transition-colors"
                >
                    Cadastrar primeiro paciente
                </button>
            </div>

        </div>
    );
};
