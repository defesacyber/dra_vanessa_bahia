import React, { Suspense, lazy } from 'react';
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

// Lazy load pages - Misc
const LandingPage = lazy(() => import('./pages/LandingPage'));

// Loading fallback
const LoadingFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-tempera-ivory">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-tempera-olive border-t-tempera-gold rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-tempera-deep font-serif italic">Carregando...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Landing Page (Dual Login) */}
            <Route path="/" element={<LandingPage />} />

            {/* Direct Access Routes (keep for backwards compatibility) */}
            <Route path="/acesso-paciente" element={<PatientLoginScreen />} />
            <Route path="/acesso-nutricionista" element={<NutritionistLoginScreen />} />

            {/* ================================
                ROTAS DO PACIENTE (/app/*)
                ================================ */}

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

            {/* 404 - Redireciona para a landing dual */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;