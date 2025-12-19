import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PatientRoute, NutritionistRoute } from './components/RouteGuards';
// Lazy load pages - Paciente
const PatientLoginScreen = lazy(() => import('./pages/patient/PatientLoginScreen'));
const PatientDashboard = lazy(() => import('./pages/patient/PatientDashboard'));
// Lazy load pages - Nutricionista
const NutritionistLoginScreen = lazy(() => import('./pages/nutri/NutritionistLoginScreen'));
const NutritionistRegisterScreen = lazy(() => import('./pages/nutri/NutritionistRegisterScreen'));
const NutritionistDashboard = lazy(() => import('./pages/nutri/NutritionistDashboard'));
const PatientListScreen = lazy(() => import('./pages/nutri/PatientListScreen'));
const PatientRegisterScreen = lazy(() => import('./pages/nutri/PatientRegisterScreen'));
// Loading fallback
const LoadingFallback = () => (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-stone-50", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-12 h-12 border-4 border-emerald-300 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" }), _jsx("p", { className: "text-stone-600", children: "Carregando..." })] }) }));
const App = () => {
    return (_jsx(AuthProvider, { children: _jsx(BrowserRouter, { children: _jsx(Suspense, { fallback: _jsx(LoadingFallback, {}), children: _jsxs(Routes, { children: [_jsx(Route, { path: "/acesso-paciente", element: _jsx(PatientLoginScreen, {}) }), _jsx(Route, { path: "/app", element: _jsx(PatientRoute, { children: _jsx(PatientDashboard, {}) }) }), _jsx(Route, { path: "/app/*", element: _jsx(PatientRoute, { children: _jsx(PatientDashboard, {}) }) }), _jsx(Route, { path: "/acesso-nutricionista", element: _jsx(NutritionistLoginScreen, {}) }), _jsx(Route, { path: "/nutri/register", element: _jsx(NutritionistRegisterScreen, {}) }), _jsx(Route, { path: "/nutri", element: _jsx(NutritionistRoute, { children: _jsx(NutritionistDashboard, {}) }) }), _jsx(Route, { path: "/nutri/patients", element: _jsx(NutritionistRoute, { children: _jsx(PatientListScreen, {}) }) }), _jsx(Route, { path: "/nutri/patients/new", element: _jsx(NutritionistRoute, { children: _jsx(PatientRegisterScreen, {}) }) }), _jsx(Route, { path: "/nutri/*", element: _jsx(NutritionistRoute, { children: _jsx(NutritionistDashboard, {}) }) }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/acesso-paciente", replace: true }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/acesso-paciente", replace: true }) })] }) }) }) }));
};
export default App;
