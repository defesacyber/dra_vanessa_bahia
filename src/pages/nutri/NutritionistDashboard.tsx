import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { AuditEntry } from '../../types/concierge';
import { FinancialPanel } from '../../features/financial/components/FinancialPanel';

interface NutritionistProfile {
  photoUrl?: string;
  taglineTop?: string;
  taglineBottom?: string;
  themeColor?: string;
}

interface NutritionistUser {
  id: string;
  name: string;
  email: string;
  profile?: NutritionistProfile;
}

/**
 * Dashboard principal do Nutricionista
 * - Personalização dinâmica baseada no perfil logado
 * - Cada nutricionista vê seu próprio tema/foto
 */
export const NutritionistDashboard: React.FC = () => {
  const { user, logout, getAuthHeaders } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'patients' | 'audit' | 'settings'>('overview');
  const [patientCount, setPatientCount] = useState(0);
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([]);
  const [auditStats, setAuditStats] = useState<{ total_entries: number; last_24h: number } | null>(null);

  // Cast user para tipo com profile
  const nutritionist = user as NutritionistUser | null;
  const profile = nutritionist?.profile;

  useEffect(() => {
    // Carregar contagem de pacientes
    const fetchPatientCount = async () => {
      try {
        const response = await fetch('/api/v1/patients', {
          headers: getAuthHeaders(),
        });
        const data = await response.json();
        if (data.success) {
          setPatientCount(data.total || 0);
        }
      } catch {
        // Silently fail
      }
    };
    fetchPatientCount();
  }, [getAuthHeaders]);

  // Fetch audit stats
  useEffect(() => {
    const fetchAuditStats = async () => {
      try {
        const response = await fetch('/api/v1/audit/stats', {
          headers: { ...getAuthHeaders(), 'x-user-role': 'nutritionist' },
        });
        if (response.ok) {
          const data = await response.json();
          setAuditStats(data);
        }
      } catch {
        // Silently fail
      }
    };
    fetchAuditStats();
  }, [getAuthHeaders]);

  // Fetch audit entries when tab changes
  useEffect(() => {
    if (activeTab === 'audit') {
      const fetchAudit = async () => {
        try {
          const response = await fetch('/api/v1/audit?limit=20', {
            headers: { ...getAuthHeaders(), 'x-user-role': 'nutritionist' },
          });
          if (response.ok) {
            const data = await response.json();
            setAuditEntries(data.entries || []);
          }
        } catch {
          // Silently fail
        }
      };
      fetchAudit();
    }
  }, [activeTab, getAuthHeaders]);

  const handleLogout = () => {
    logout();
    navigate('/acesso-nutricionista');
  };

  return (
    <div className="min-h-screen bg-tempera-ivory">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-tempera-deep border-r border-tempera-gold/20 p-6 hidden lg:block z-50">
        <div className="space-y-8">
          {/* Profile - Personalizado por nutricionista */}
          <div className="text-center">
            {profile?.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt={nutritionist?.name}
                className="w-20 h-20 mx-auto rounded-full object-cover shadow-lg mb-3 border-2 border-tempera-gold"
              />
            ) : (
              <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-lg mb-3 text-white text-2xl font-bold bg-tempera-olive border-2 border-tempera-gold">
                {nutritionist?.name?.charAt(0) || '?'}
              </div>
            )}
            <h2 className="font-serif font-bold text-tempera-cream text-lg">{nutritionist?.name || 'Nutricionista'}</h2>
            {profile?.taglineTop && (
              <p className="text-xs text-tempera-gold mt-1 italic">{profile.taglineTop}</p>
            )}
          </div>

          {/* Menu */}
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${activeTab === 'overview'
                ? 'bg-tempera-olive text-tempera-ivory shadow-lg'
                : 'text-tempera-cream/70 hover:bg-tempera-olive/20 hover:text-tempera-cream'
                }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Início
            </button>
            <button
              onClick={() => setActiveTab('patients')}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${activeTab === 'patients'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-300 hover:bg-slate-800/50'
                }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Pacientes
              {patientCount > 0 && (
                <span className="ml-auto bg-slate-700 text-xs px-2 py-0.5 rounded-full">{patientCount}</span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${activeTab === 'settings'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-300 hover:bg-slate-800/50'
                }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Configurações
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${activeTab === 'audit'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-300 hover:bg-slate-800/50'
                }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Auditoria
              {auditStats && auditStats.last_24h > 0 && (
                <span className="ml-auto bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full">{auditStats.last_24h}</span>
              )}
            </button>
          </nav>

          {/* Tagline */}
          {profile?.taglineBottom && (
            <div className="pt-4 border-t border-slate-700/30">
              <p className="text-xs text-slate-400 italic text-center">{profile.taglineBottom}</p>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 rounded-xl text-slate-400 hover:bg-red-900/30 hover:text-red-300 transition-all flex items-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen relative">
        {/* Financial Panel - Always visible */}
        <FinancialPanel />
        {/* Header Mobile */}
        <header className="lg:hidden bg-slate-950/80 backdrop-blur-sm border-b border-slate-700/30 p-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {profile?.photoUrl ? (
                <img src={profile.photoUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                  {nutritionist?.name?.charAt(0) || '?'}
                </div>
              )}
              <h1 className="font-serif font-bold text-white">{nutritionist?.name || 'Portal'}</h1>
            </div>
            <button onClick={handleLogout} className="text-slate-400 text-sm">Sair</button>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 lg:p-8">
          {/* Tab Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-serif font-bold text-white">
                  Olá, {nutritionist?.name?.split(' ')[0] || 'Nutricionista'}! 👋
                </h1>
                <p className="text-slate-400 mt-1">Bem-vindo(a) ao seu painel de controle</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white">{patientCount}</p>
                      <p className="text-sm text-slate-400">Pacientes ativos</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white">0</p>
                      <p className="text-sm text-slate-400">Planos criados</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white">0</p>
                      <p className="text-sm text-slate-400">Mensagens hoje</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  to="/nutri/patients/new"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 hover:from-emerald-500 hover:to-teal-500 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">Novo Paciente</h3>
                      <p className="text-emerald-100 text-sm">Cadastre e gere código de acesso</p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/nutri/patients"
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30 hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">Ver Pacientes</h3>
                      <p className="text-slate-400 text-sm">Gerenciar lista de pacientes</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          )}

          {/* Tab Patients - Redirect */}
          {activeTab === 'patients' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-serif font-bold text-white">Meus Pacientes</h1>
                <Link
                  to="/nutri/patients/new"
                  className="px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2"
                >
                  <span>+</span> Novo Paciente
                </Link>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-slate-700/30 text-center">
                <svg className="w-16 h-16 mx-auto text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-slate-400 mb-4">Acesse a lista completa de pacientes</p>
                <Link
                  to="/nutri/patients"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all"
                >
                  Ver todos os pacientes
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          )}

          {/* Tab Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-serif font-bold text-white">Configurações</h1>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
                <h3 className="font-medium text-white mb-4">Seu Perfil</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    {profile?.photoUrl ? (
                      <img src={profile.photoUrl} alt="" className="w-16 h-16 rounded-full object-cover" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xl">
                        {nutritionist?.name?.charAt(0) || '?'}
                      </div>
                    )}
                    <div>
                      <p className="text-white font-medium">{nutritionist?.name}</p>
                      <p className="text-slate-400 text-sm">{nutritionist?.email}</p>
                    </div>
                  </div>

                  <p className="text-slate-500 text-sm">
                    A edição de perfil (foto, taglines, tema) estará disponível em breve.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab Audit */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-serif font-bold text-white">Auditoria</h1>
                {auditStats && (
                  <div className="flex gap-4 text-sm">
                    <span className="text-slate-400">
                      Total: <span className="text-white font-medium">{auditStats.total_entries}</span>
                    </span>
                    <span className="text-slate-400">
                      Últimas 24h: <span className="text-amber-400 font-medium">{auditStats.last_24h}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Audit Log */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-700/30 overflow-hidden">
                {auditEntries.length === 0 ? (
                  <div className="p-8 text-center">
                    <svg className="w-12 h-12 mx-auto text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-slate-400">Nenhum registro de auditoria ainda.</p>
                    <p className="text-slate-500 text-sm mt-1">Os registros aparecerão quando pacientes usarem o sistema.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-700/30">
                    {auditEntries.map((entry) => (
                      <div key={entry.id} className="p-4 hover:bg-white/5 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${entry.actor.type === 'patient'
                              ? 'bg-blue-500/20 text-blue-400'
                              : entry.actor.type === 'nutritionist'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-slate-500/20 text-slate-400'
                              }`}>
                              {entry.actor.type === 'patient' ? '👤' : entry.actor.type === 'nutritionist' ? '👩‍⚕️' : '🤖'}
                            </div>
                            <div>
                              <p className="text-white text-sm font-medium">
                                {entry.action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </p>
                              <p className="text-slate-500 text-xs">
                                {entry.actor.type} • {entry.actor.id}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-slate-400 text-xs">
                              {new Date(entry.timestamp).toLocaleString('pt-BR')}
                            </p>
                            <p className="text-slate-500 text-xs">
                              v{entry.context.policy_version}
                            </p>
                          </div>
                        </div>
                        {entry.impersonation && (
                          <div className="mt-2 text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded inline-block">
                            👁️ Visualização como paciente
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default NutritionistDashboard;
