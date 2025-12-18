import React from 'react';
import { useRegistrationStore } from './store/registrationStore';
import { ProfileStep } from './steps/ProfileStep';
import { BrandingStep } from './steps/BrandingStep';
import { PaymentStep } from './steps/PaymentStep';
import { FinancialSummaryStep } from './steps/FinancialSummaryStep';
import { Stepper } from '../../components/ui/Stepper';

export const RegistrationWizard: React.FC = () => {
    const { currentStep } = useRegistrationStore();

    const steps = [
        'Dados & Perfil',
        'Marca & Cores',
        'Plano & Pagamento',
        'Conclusão'
    ];

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <ProfileStep />;
            case 2: return <BrandingStep />;
            case 3: return <PaymentStep />;
            case 4: return <FinancialSummaryStep />;
            default: return <ProfileStep />;
        }
    };

    return (
        <div className="min-h-screen bg-tempera-ivory flex flex-col items-center py-10 px-4 font-body">

            <div className="w-full max-w-3xl mb-8 text-center space-y-2">
                <h1 className="font-serif text-3xl font-bold text-tempera-deep">Cadastro do Nutricionista</h1>
                <p className="text-tempera-gold/80 italic">Configure seu ambiente profissional em poucos passos.</p>
            </div>

            <div className="w-full max-w-3xl mb-8">
                {currentStep < 4 && <Stepper currentStep={currentStep} steps={steps.slice(0, 3)} />}
            </div>

            <div className="w-full max-w-3xl bg-white rounded-sm shadow-xl border border-tempera-gold/20 p-6 md:p-10 relative overflow-hidden">
                {/* Decorative background blob - removed for Têmpera style, replaced with subtle texture if needed */}
                <div className="absolute top-0 right-0 w-full h-2 bg-tempera-olive/10"></div>

                <div className="relative z-10">
                    {renderStep()}
                </div>
            </div>

            <div className="mt-8 text-center text-xs text-stone-400">
                &copy; 2025 Têmpera Nutrição Humana. Todos os direitos reservados.
            </div>

        </div>
    );
};
