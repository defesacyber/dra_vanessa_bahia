import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
/**
 * Tela de Login EXCLUSIVA para Pacientes
 * - Não mostra nenhuma referência a "nutricionista"
 * - Acesso via código fornecido pela nutricionista
 */
export const PatientLoginScreen = () => {
    const [accessCode, setAccessCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { loginAsPatient } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        const result = await loginAsPatient({ accessCode: accessCode.toUpperCase().trim() });
        setIsLoading(false);
        if (result.success) {
            navigate('/app');
        }
        else {
            setError(result.error || 'Código de acesso inválido');
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-tempera-ivory flex", children: [_jsxs("div", { className: "hidden lg:block w-1/2 relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-tempera-deep/30 mix-blend-multiply z-10" }), _jsx("img", { src: "/tempera.jpg", alt: "Alegoria da Temperan\u00E7a", className: "w-full h-full object-cover grayscale-[10%] sepia-[15%]" }), _jsxs("div", { className: "absolute bottom-12 left-12 z-20 text-white max-w-md", children: [_jsx("p", { className: "font-serif italic text-2xl mb-2", children: "\"O equil\u00EDbrio n\u00E3o \u00E9 algo que voc\u00EA encontra, \u00E9 algo que voc\u00EA cria.\"" }), _jsx("p", { className: "text-sm opacity-90", children: "\u2014 T\u00EAmpera Nutri\u00E7\u00E3o" })] })] }), _jsx("div", { className: "w-full lg:w-1/2 flex items-center justify-center p-8 bg-tempera-ivory", children: _jsxs("div", { className: "max-w-md w-full space-y-8", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx("h1", { className: "font-serif text-4xl font-bold text-tempera-deep tracking-tight", children: "T\u00CAMPERA" }), _jsx("p", { className: "text-tempera-gold uppercase tracking-[0.2em] text-sm", children: "\u00C1rea do Paciente" })] }), _jsxs("div", { className: "bg-white p-8 rounded-sm shadow-[0_4px_20px_-4px_rgba(44,62,47,0.1)] border border-tempera-gold/20 space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 rounded-full bg-tempera-olive flex items-center justify-center text-white font-serif text-2xl shadow-md border-2 border-tempera-gold", children: "T" }), _jsx("h2", { className: "font-serif text-2xl text-tempera-deep", children: "Bem-vindo(a)" }), _jsx("p", { className: "text-stone-500 text-sm mt-2", children: "Insira seu c\u00F3digo de acesso pessoal" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-tempera-deep mb-1", children: "C\u00F3digo de Acesso" }), _jsx("input", { type: "text", value: accessCode, onChange: (e) => setAccessCode(e.target.value.toUpperCase()), className: "w-full px-4 py-3 bg-tempera-ivory/50 border border-tempera-gold/30 rounded-sm focus:ring-1 focus:ring-tempera-olive focus:border-tempera-olive outline-none transition-all placeholder:text-stone-400 text-center text-lg font-serif tracking-widest uppercase", placeholder: "CODE-123", maxLength: 8, required: true }), _jsx("p", { className: "text-xs text-stone-400 mt-2 text-center italic", children: "O c\u00F3digo foi enviado pela sua nutricionista" })] }), error && (_jsx("div", { className: "p-3 bg-red-50 text-red-700 text-sm border border-red-100 rounded-sm", children: error })), _jsx("button", { type: "submit", disabled: isLoading || accessCode.length < 4, className: "w-full py-3 bg-tempera-olive text-white font-serif text-lg tracking-wide hover:bg-tempera-deep transition-all shadow-md disabled:opacity-50", children: isLoading ? 'Acessando...' : 'Entrar' })] })] }), _jsx("div", { className: "text-center text-xs text-tempera-deep/40 font-serif italic", children: "Nutri\u00E7\u00E3o Integrativa \u00B7 Filosofia Aplicada" })] }) })] }));
};
export default PatientLoginScreen;
