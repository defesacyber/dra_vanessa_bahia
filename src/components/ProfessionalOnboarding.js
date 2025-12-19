import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { updateProfessionalBrand, getProfessionalBrand } from '../services/mockBackend';
import { analyzeProfessionalProfile } from '../services/geminiService';
export const ProfessionalOnboarding = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [brand, setBrand] = useState(getProfessionalBrand());
    const [answers, setAnswers] = useState({
        philosophy: '',
        reaction: '',
        communication: '',
        influence: ''
    });
    const handleAnalyzeProfile = async () => {
        if (!answers.philosophy || !answers.reaction)
            return;
        setIsAnalyzing(true);
        try {
            const result = await analyzeProfessionalProfile(answers);
            const updatedBrand = {
                ...brand,
                personality: {
                    archetype: result.archetype,
                    customInstructions: result.customInstructions
                },
                setupComplete: true
            };
            updateProfessionalBrand(updatedBrand);
            setBrand(updatedBrand);
            setStep(3); // Success step
        }
        catch (error) {
            console.error(error);
            alert("Erro ao analisar perfil. Tente novamente.");
        }
        finally {
            setIsAnalyzing(false);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-stone-100 z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]", children: [_jsxs("div", { className: "bg-stone-900 p-6 text-white", children: [_jsx("h1", { className: "font-serif text-2xl font-bold", children: "Bem-vindo ao T\u00EAmpera" }), _jsx("p", { className: "text-stone-400 text-sm mt-1", children: "Vamos configurar sua Identidade Digital Filos\u00F3fica." })] }), _jsxs("div", { className: "p-8 overflow-y-auto flex-1", children: [step === 1 && (_jsxs("div", { className: "space-y-6 animate-enter", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl", children: "\uD83D\uDC64" }), _jsx("h2", { className: "text-xl font-bold text-stone-800", children: "Quem \u00E9 voc\u00EA?" }), _jsx("p", { className: "text-stone-500 text-sm", children: "Configure seus dados b\u00E1sicos de exibi\u00E7\u00E3o." })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-bold text-stone-700 mb-1", children: "Nome Profissional" }), _jsx("input", { type: "text", value: brand.professionalName, onChange: e => setBrand({ ...brand, professionalName: e.target.value }), className: "w-full p-3 border border-stone-300 rounded-lg", placeholder: "Ex: Dr. Marco Aur\u00E9lio" })] }), _jsx("button", { onClick: () => setStep(2), className: "w-full bg-stone-900 text-white py-3 rounded-lg font-bold hover:bg-stone-800 transition-all mt-4", children: "Continuar" })] })), step === 2 && (_jsxs("div", { className: "space-y-4 animate-enter", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("div", { className: "w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl", children: "\uD83E\uDDE0" }), _jsx("h2", { className: "text-xl font-bold text-stone-800", children: "Calibragem da IA" }), _jsx("p", { className: "text-stone-500 text-sm", children: "Responda para que a IA aprenda a pensar como voc\u00EA." })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-bold text-stone-500 mb-1", children: "1. Qual \u00E9 a sua filosofia central de atendimento?" }), _jsx("textarea", { value: answers.philosophy, onChange: e => setAnswers({ ...answers, philosophy: e.target.value }), placeholder: "Ex: Acredito que o acolhimento vem antes da t\u00E9cnica...", className: "w-full p-3 border border-stone-300 rounded-md text-sm h-20" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-bold text-stone-500 mb-1", children: "2. Como voc\u00EA reage quando um paciente falha?" }), _jsx("textarea", { value: answers.reaction, onChange: e => setAnswers({ ...answers, reaction: e.target.value }), placeholder: "Ex: Sou firme, mostro que a responsabilidade \u00E9 dele...", className: "w-full p-3 border border-stone-300 rounded-md text-sm h-20" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-bold text-stone-500 mb-1", children: "3. Defina seu estilo de comunica\u00E7\u00E3o" }), _jsx("textarea", { value: answers.communication, onChange: e => setAnswers({ ...answers, communication: e.target.value }), placeholder: "Ex: Uso muitas met\u00E1foras, falo de forma po\u00E9tica...", className: "w-full p-3 border border-stone-300 rounded-md text-sm h-20" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-bold text-stone-500 mb-1", children: "4. Quem s\u00E3o suas maiores influ\u00EAncias?" }), _jsx("input", { type: "text", value: answers.influence, onChange: e => setAnswers({ ...answers, influence: e.target.value }), placeholder: "Ex: Jung, S\u00EAneca, Bren\u00E9 Brown...", className: "w-full p-3 border border-stone-300 rounded-md text-sm" })] })] }), _jsxs("div", { className: "flex gap-3 mt-6", children: [_jsx("button", { onClick: () => setStep(1), className: "flex-1 bg-stone-200 text-stone-700 py-3 rounded-lg font-bold hover:bg-stone-300 transition-all", children: "Voltar" }), _jsx("button", { onClick: handleAnalyzeProfile, disabled: isAnalyzing || !answers.philosophy, className: "flex-[2] bg-stone-900 text-white py-3 rounded-lg font-bold hover:bg-stone-800 disabled:opacity-50 transition-all flex justify-center items-center gap-2", children: isAnalyzing ? 'Analisando...' : 'Finalizar Cadastro' })] })] })), step === 3 && (_jsxs("div", { className: "text-center space-y-6 animate-enter py-10", children: [_jsx("div", { className: "w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-4xl animate-bounce", children: "\u2705" }), _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-stone-800", children: "Tudo Pronto!" }), _jsxs("p", { className: "text-stone-600 mt-2", children: ["Sua IA foi calibrada com o arqu\u00E9tipo ", _jsx("strong", { className: "capitalize", children: brand.personality?.archetype }), "."] }), _jsxs("p", { className: "text-stone-500 text-sm mt-1 max-w-md mx-auto", children: ["\"", brand.personality?.customInstructions, "\""] })] }), _jsx("button", { onClick: onComplete, className: "bg-stone-900 text-white px-8 py-3 rounded-full font-bold hover:bg-stone-800 transition-all shadow-lg transform hover:scale-105", children: "Acessar Painel do Profissional" })] }))] }), _jsx("div", { className: "h-2 bg-stone-100 w-full", children: _jsx("div", { className: "h-full bg-amber-500 transition-all duration-500", style: { width: `${(step / 3) * 100}%` } }) })] }) }));
};
