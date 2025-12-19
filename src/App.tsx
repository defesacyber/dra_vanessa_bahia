import React, { Suspense, lazy } from 'react';
import { PremiumNavbar } from './components/PremiumNavbar';
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
const LoadingFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-stone-50">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-emerald-300 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-stone-600">Carregando...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PremiumNavbar />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* ================================
                ROTAS DO PACIENTE (/login, /app/*)
                ================================ */}

            {/* Login do Paciente - SEM menção a nutricionista */}
            <Route path="/acesso-paciente" element={<PatientLoginScreen />} />

            {/* Área do Paciente - Protegida por role PATIENT */}
            <Route
              path="/app"
              element={
                <PatientRoute>
                  <PatientDashboard />
                </PatientRoute>
              }
            />
            <Route
              path="/app/*"
              element={
                <PatientRoute>
                  <PatientDashboard />
                </PatientRoute>
              }
            />

            {/* ================================
                ROTAS DA NUTRICIONISTA (/nutri/*)
                ================================ */}

            {/* Login da Nutricionista - Portal genérico */}
            <Route path="/acesso-nutricionista" element={<NutritionistLoginScreen />} />

            {/* Cadastro de Nutricionista */}
            <Route path="/nutri/register" element={<NutritionistRegisterScreen />} />

            {/* Dashboard da Nutricionista - Protegida */}
            <Route
              path="/nutri"
              element={
                <NutritionistRoute>
                  <NutritionistDashboard />
                </NutritionistRoute>
              }
            />

            {/* Lista de Pacientes */}
            <Route
              path="/nutri/patients"
              element={
                <NutritionistRoute>
                  <PatientListScreen />
                </NutritionistRoute>
              }
            />

            {/* Cadastro de Paciente */}
            <Route
              path="/nutri/patients/new"
              element={
                <NutritionistRoute>
                  <PatientRegisterScreen />
                </NutritionistRoute>
              }
            />

            {/* Outras rotas protegidas do nutricionista */}
            <Route
              path="/nutri/*"
              element={
                <NutritionistRoute>
                  <NutritionistDashboard />
                </NutritionistRoute>
              }
            />

            {/* ================================
                REDIRECIONAMENTOS
                ================================ */}

            {/* Raiz redireciona para login do paciente */}
            <Route path="/" element={<Navigate to="/acesso-paciente" replace />} />

            {/* 404 - Redireciona para login */}
            <Route path="*" element={<Navigate to="/acesso-paciente" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;