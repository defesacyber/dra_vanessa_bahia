import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PatientRoute, NutritionistRoute } from './components/RouteGuards';

// v3.0 - Premium Site Overhaul (2025-12-19)

// Public Pages
const Home = lazy(() => import('./pages/Home'));
const Approach = lazy(() => import('./pages/Approach'));
const Programs = lazy(() => import('./pages/Programs'));
const B2B = lazy(() => import('./pages/B2B'));
const Team = lazy(() => import('./pages/Team'));
const Blog = lazy(() => import('./pages/Blog'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const LoginPortal = lazy(() => import('./pages/LoginPortal'));
const PrivacyPage = lazy(() => import('./pages/Legal').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/Legal').then(m => ({ default: m.TermsPage })));

// Protected Screens - Patient
const PatientDashboard = lazy(() => import('./pages/patient/PatientDashboard'));

// Protected Screens - Nutritionist
const NutritionistRegisterScreen = lazy(() => import('./pages/nutri/NutritionistRegisterScreen'));
const NutritionistDashboard = lazy(() => import('./pages/nutri/NutritionistDashboard'));
const PatientListScreen = lazy(() => import('./pages/nutri/PatientListScreen'));
const PatientRegisterScreen = lazy(() => import('./pages/nutri/PatientRegisterScreen'));

// Loading fallback
const LoadingFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-neutral-50">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-brand-900 border-t-brand-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-brand-900 font-serif italic">Respirando...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<LoginPortal />} />
            <Route path="/inicio" element={<Home />} />
            <Route path="/metodo" element={<Approach />} />
            <Route path="/programas" element={<Programs />} />
            <Route path="/para-empresas" element={<B2B />} />
            <Route path="/equipe" element={<Team />} />
            <Route path="/conteudos" element={<Blog />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contato" element={<Contact />} />

            <Route path="/privacidade" element={<Suspense fallback={<LoadingFallback />}><PrivacyPage /></Suspense>} />
            <Route path="/termos" element={<Suspense fallback={<LoadingFallback />}><TermsPage /></Suspense>} />

            {/* PROTECTED - PATIENT */}
            <Route path="/app" element={<PatientRoute><PatientDashboard /></PatientRoute>} />
            <Route path="/app/*" element={<PatientRoute><PatientDashboard /></PatientRoute>} />

            {/* PROTECTED - NUTRITIONIST */}
            <Route path="/nutri/register" element={<NutritionistRegisterScreen />} />
            <Route path="/nutri" element={<NutritionistRoute><NutritionistDashboard /></NutritionistRoute>} />
            <Route path="/nutri/patients" element={<NutritionistRoute><PatientListScreen /></NutritionistRoute>} />
            <Route path="/nutri/patients/new" element={<NutritionistRoute><PatientRegisterScreen /></NutritionistRoute>} />
            <Route path="/nutri/*" element={<NutritionistRoute><NutritionistDashboard /></NutritionistRoute>} />

            {/* FALLBACKS & REDIRECTS */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/acesso-paciente" element={<Navigate to="/" replace />} />
            <Route path="/acesso-nutricionista" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;