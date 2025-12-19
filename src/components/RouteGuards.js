import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
/**
 * Componente de proteção de rotas por role
 * - Verifica se usuário está autenticado
 * - Verifica se possui a role necessária
 * - Redireciona para página apropriada se não autorizado
 */
export const ProtectedRoute = ({ children, allowedRoles, redirectTo, }) => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const location = useLocation();
    // Mostra loading enquanto verifica autenticação
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-stone-50", children: _jsxs("div", { className: "text-center space-y-4", children: [_jsx("div", { className: "animate-spin w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto" }), _jsx("p", { className: "text-stone-500", children: "Verificando acesso..." })] }) }));
    }
    // Não autenticado - redireciona para login apropriado
    if (!isAuthenticated || !user) {
        // Determina para qual login redirecionar baseado na rota
        const isNutriRoute = location.pathname.startsWith('/nutri');
        const loginPath = isNutriRoute ? '/acesso-nutricionista' : '/acesso-paciente';
        return _jsx(Navigate, { to: redirectTo || loginPath, state: { from: location }, replace: true });
    }
    // Autenticado mas role não permitida
    if (!allowedRoles.includes(user.role)) {
        // Redireciona para área correta do usuário
        const correctPath = user.role === 'NUTRITIONIST' ? '/nutri' : '/app';
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-stone-50 p-4", children: _jsxs("div", { className: "max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-red-200 text-center space-y-4", children: [_jsx("div", { className: "w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-3xl", children: "\uD83D\uDEAB" }) }), _jsx("h2", { className: "text-xl font-bold text-stone-900", children: "Acesso Negado" }), _jsx("p", { className: "text-stone-600", children: "Voc\u00EA n\u00E3o tem permiss\u00E3o para acessar esta \u00E1rea." }), _jsxs("p", { className: "text-sm text-stone-500", children: ["Sua conta \u00E9 do tipo: ", _jsx("strong", { children: user.role === 'NUTRITIONIST' ? 'Nutricionista' : 'Paciente' })] }), _jsx("button", { onClick: () => window.location.href = correctPath, className: "w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all", children: "Ir para minha \u00E1rea" })] }) }));
    }
    // Autorizado - renderiza children
    return _jsx(_Fragment, { children: children });
};
/**
 * Guard específico para rotas de Paciente (/app/*)
 */
export const PatientRoute = ({ children }) => (_jsx(ProtectedRoute, { allowedRoles: ['PATIENT'], redirectTo: "/acesso-paciente", children: children }));
/**
 * Guard específico para rotas de Nutricionista (/nutri/*)
 */
export const NutritionistRoute = ({ children }) => (_jsx(ProtectedRoute, { allowedRoles: ['NUTRITIONIST'], redirectTo: "/acesso-nutricionista", children: children }));
/**
 * Componente para redirecionar usuário logado para sua área correta
 */
export const AuthRedirect = () => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const location = useLocation();
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx("div", { className: "animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full" }) }));
    }
    if (isAuthenticated && user) {
        // Se já logado, redireciona para área correta
        const targetPath = user.role === 'NUTRITIONIST' ? '/nutri' : '/app';
        return _jsx(Navigate, { to: targetPath, replace: true });
    }
    // Não autenticado - determina login baseado na URL
    if (location.pathname.startsWith('/nutri')) {
        return _jsx(Navigate, { to: "/acesso-nutricionista", replace: true });
    }
    return _jsx(Navigate, { to: "/acesso-paciente", replace: true });
};
