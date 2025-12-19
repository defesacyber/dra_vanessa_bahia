import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRegistrationStore } from './store/registrationStore';
import { ProfileStep } from './steps/ProfileStep';
import { BrandingStep } from './steps/BrandingStep';
import { PaymentStep } from './steps/PaymentStep';
import { FinancialSummaryStep } from './steps/FinancialSummaryStep';
import { Stepper } from '../../components/ui/Stepper';
export const RegistrationWizard = () => {
    const { currentStep } = useRegistrationStore();
    const steps = [
        'Dados & Perfil',
        'Marca & Cores',
        'Plano & Pagamento',
        'Conclusão'
    ];
    const renderStep = () => {
        switch (currentStep) {
            case 1: return _jsx(ProfileStep, {});
            case 2: return _jsx(BrandingStep, {});
            case 3: return _jsx(PaymentStep, {});
            case 4: return _jsx(FinancialSummaryStep, {});
            default: return _jsx(ProfileStep, {});
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-tempera-ivory flex flex-col items-center py-10 px-4 font-body", children: [_jsxs("div", { className: "w-full max-w-3xl mb-8 text-center space-y-2", children: [_jsx("h1", { className: "font-serif text-3xl font-bold text-tempera-deep", children: "Cadastro do Nutricionista" }), _jsx("p", { className: "text-tempera-gold/80 italic", children: "Configure seu ambiente profissional em poucos passos." })] }), _jsx("div", { className: "w-full max-w-3xl mb-8", children: currentStep < 4 && _jsx(Stepper, { currentStep: currentStep, steps: steps.slice(0, 3) }) }), _jsxs("div", { className: "w-full max-w-3xl bg-white rounded-sm shadow-xl border border-tempera-gold/20 p-6 md:p-10 relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 right-0 w-full h-2 bg-tempera-olive/10" }), _jsx("div", { className: "relative z-10", children: renderStep() })] }), _jsx("div", { className: "mt-8 text-center text-xs text-stone-400", children: "\u00A9 2025 T\u00EAmpera Nutri\u00E7\u00E3o Humana. Todos os direitos reservados." })] }));
};
