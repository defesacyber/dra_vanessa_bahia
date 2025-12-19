import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
/**
 * Tela de Login GENÉRICA para Nutricionistas
 * - Sem foto ou nome de nenhum nutricionista específico
 * - A personalização ocorre APÓS o login
 * - Link para cadastro de novos nutricionistas
 */
export const NutritionistLoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { loginAsNutritionist } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        const result = await loginAsNutritionist({ email: email.trim(), password });
        setIsLoading(false);
        if (result.success) {
            navigate('/nutri');
        }
        else {
            setError(result.error || 'Credenciais inválidas');
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-tempera-ivory flex", children: [_jsxs("div", { className: "hidden lg:block w-1/2 relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-tempera-olive/20 mix-blend-multiply z-10" }), _jsx("img", { src: "/tempera.jpg", alt: "Alegoria da Temperan\u00E7a", className: "w-full h-full object-cover grayscale-[20%] sepia-[10%]" }), _jsxs("div", { className: "absolute bottom-12 left-12 z-20 text-white max-w-md", children: [_jsx("p", { className: "font-serif italic text-2xl mb-2", children: "\"A temperan\u00E7a \u00E9 a virtude que disp\u00F5e a raz\u00E3o a governar as paix\u00F5es.\"" }), _jsx("p", { className: "text-sm opacity-90", children: "\u2014 S\u00E3o Tom\u00E1s de Aquino" })] })] }), _jsx("div", { className: "w-full lg:w-1/2 flex items-center justify-center p-8 bg-tempera-ivory", children: _jsxs("div", { className: "max-w-md w-full space-y-8", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx("h1", { className: "font-serif text-4xl font-bold text-tempera-deep tracking-tight", children: "T\u00CAMPERA" }), _jsx("p", { className: "text-tempera-gold uppercase tracking-[0.2em] text-sm", children: "Nutri\u00E7\u00E3o Integrativa" })] }), _jsxs("div", { className: "bg-white p-8 rounded-sm shadow-[0_4px_20px_-4px_rgba(44,62,47,0.1)] border border-tempera-gold/20 space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "font-serif text-2xl text-tempera-deep", children: "Portal do Nutricionista" }), _jsx("p", { className: "text-stone-500 text-sm mt-2", children: "swphros\u00FDn\u0113 \u00B7 temperantia" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-tempera-deep mb-1", children: "E-mail" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full px-4 py-3 bg-tempera-ivory/50 border border-tempera-gold/30 rounded-sm focus:ring-1 focus:ring-tempera-olive focus:border-tempera-olive outline-none transition-all placeholder:text-stone-400", placeholder: "nome@tempera.com.br", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-tempera-deep mb-1", children: "Senha" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full px-4 py-3 bg-tempera-ivory/50 border border-tempera-gold/30 rounded-sm focus:ring-1 focus:ring-tempera-olive focus:border-tempera-olive outline-none transition-all placeholder:text-stone-400", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", required: true })] }), error && (_jsx("div", { className: "p-3 bg-red-50 text-red-700 text-sm border border-red-100 rounded-sm", children: error })), _jsx("button", { type: "submit", disabled: isLoading, className: "w-full py-3 bg-tempera-olive text-white font-serif text-lg tracking-wide hover:bg-tempera-deep transition-all shadow-md disabled:opacity-50", children: isLoading ? 'Entrando...' : 'Acessar Portal' })] }), _jsx("div", { className: "pt-6 border-t border-tempera-gold/10 text-center", children: _jsx(Link, { to: "/nutri/register", className: "text-tempera-gold hover:text-tempera-olive transition-colors underline decoration-1 underline-offset-4", children: "Solicitar credenciamento" }) })] }), _jsx("div", { className: "text-center text-xs text-tempera-deep/40 font-serif italic", children: "\u1F00\u03C1\u03B5\u03C4\u03AE \u00B7 virtus \u00B7 excel\u00EAncia" })] }) })] }));
};
export default NutritionistLoginScreen;
