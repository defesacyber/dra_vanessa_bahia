import React, { useState, useEffect } from 'react';
import { ClientProfile, NutritionalPlan } from '../types';
import { getClients, updateClientPlan } from '../services/mockBackend';
import { generatePlanSuggestion } from '../services/geminiService';
import { ProfessionalSettings } from './ProfessionalSettings';

interface ProfessionalDashboardProps {
  onLogout: () => void;
}

export const ProfessionalDashboard: React.FC<ProfessionalDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'clients' | 'settings'>('clients');
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(null);
  const [editingPlan, setEditingPlan] = useState<NutritionalPlan | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  
  // AI Generation State
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setClients(getClients());
  }, []);

  const handleSelectClient = (client: ClientProfile) => {
    setSelectedClient(client);
    setEditingPlan(client.currentPlan || {
      lastUpdated: Date.now(),
      focusArea: '',
      morningRoutine: '',
      dailyReading: '',
      avoidance: '',
      notes: ''
    });
    setAiPrompt(''); // Reset prompt
  };

  const handleGeneratePlan = async () => {
    if (!selectedClient || !aiPrompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const suggestion = await generatePlanSuggestion(selectedClient.name, aiPrompt);
      setEditingPlan({
        ...suggestion,
        lastUpdated: Date.now()
      });
      setNotification("Plano gerado pela IA com sucesso!");
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error(error);
      setNotification("Erro ao gerar plano. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSavePlan = () => {
    if (selectedClient && editingPlan) {
      const updatedPlan = { ...editingPlan, lastUpdated: Date.now() };
      updateClientPlan(selectedClient.id, updatedPlan);
      
      // Update local state
      setClients(prev => prev.map(c => c.id === selectedClient.id ? { ...c, currentPlan: updatedPlan } : c));
      setNotification("Plano enviado com sucesso para o paciente.");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans">
      <header className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👩‍⚕️</span>
            <h1 className="font-serif font-bold text-xl">Portal do Nutricionista</h1>
          </div>
          <div className="flex gap-4 items-center">
            <nav className="flex gap-2 text-sm">
              <button 
                onClick={() => setActiveTab('clients')}
                className={`px-3 py-1 rounded-full transition-colors ${activeTab === 'clients' ? 'bg-white text-emerald-800 font-bold' : 'text-emerald-100 hover:text-white'}`}
              >
                Pacientes
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-1 rounded-full transition-colors ${activeTab === 'settings' ? 'bg-white text-emerald-800 font-bold' : 'text-emerald-100 hover:text-white'}`}
              >
                Configurações
              </button>
            </nav>
            <div className="h-4 w-px bg-emerald-500 mx-2"></div>
            <button onClick={onLogout} className="text-sm text-emerald-100 hover:text-white">Sair</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6 h-[calc(100vh-80px)]">
        {activeTab === 'settings' ? (
          <ProfessionalSettings />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
            {/* Client List */}
            <div className="bg-white rounded-xl shadow-sm p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-serif font-bold text-lg text-stone-700">Carteira de Pacientes</h2>
                <button 
                  onClick={() => {
                    const inviteLink = `${window.location.origin}?invite=${Math.random().toString(36).substring(7)}`;
                    navigator.clipboard.writeText(inviteLink);
                    setNotification("Link de convite copiado!");
                    setTimeout(() => setNotification(null), 3000);
                  }}
                  className="text-xs bg-stone-900 text-white px-3 py-1.5 rounded-full hover:bg-stone-700 transition-colors"
                >
                  + Convidar
                </button>
              </div>
              <div className="space-y-2 overflow-y-auto flex-1">
                {clients.map(client => (
                  <button
                    key={client.id}
                    onClick={() => handleSelectClient(client)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedClient?.id === client.id 
                        ? 'bg-amber-50 border-amber-500 ring-1 ring-amber-500' 
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-stone-800">{client.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                        {client.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    <div className="text-xs text-stone-500 mt-1 truncate">
                      {client.currentPlan ? `Foco: ${client.currentPlan.focusArea}` : 'Sem plano ativo'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Editor Area */}
            <div className="md:col-span-2 h-full">
              {selectedClient && editingPlan ? (
                <div className="bg-white rounded-xl shadow-sm p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6 border-b border-stone-100 pb-4">
                    <div>
                      <h2 className="font-serif font-bold text-2xl text-stone-800">Plano Filosófico</h2>
                      <p className="text-stone-500 text-sm">Paciente: {selectedClient.name}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-stone-400">Última atualização</div>
                      <div className="font-mono text-sm">{new Date(editingPlan.lastUpdated).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                    
                    {/* AI Assistant Section */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-2">
                        <span>✨</span> Assistente de Planejamento (IA)
                      </h3>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={aiPrompt}
                          onChange={e => setAiPrompt(e.target.value)}
                          placeholder="Descreva o estado atual do paciente (ex: 'Muito ansioso com o trabalho, precisa de estoicismo')"
                          className="flex-1 p-2 border border-amber-200 rounded-md text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                        />
                        <button 
                          onClick={handleGeneratePlan}
                          disabled={!aiPrompt.trim() || isGenerating}
                          className="bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-amber-700 disabled:opacity-50 transition-colors whitespace-nowrap"
                        >
                          {isGenerating ? 'Gerando...' : 'Sugerir Plano'}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Foco Terapêutico</label>
                      <input 
                        type="text" 
                        value={editingPlan.focusArea}
                        onChange={e => setEditingPlan({...editingPlan, focusArea: e.target.value})}
                        className="w-full p-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 outline-none font-serif"
                        placeholder="Ex: Redução de Ansiedade Existencial"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Rotina Matinal</label>
                        <textarea 
                          value={editingPlan.morningRoutine}
                          onChange={e => setEditingPlan({...editingPlan, morningRoutine: e.target.value})}
                          className="w-full p-2 border border-stone-300 rounded-md h-24 resize-none focus:ring-2 focus:ring-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Leitura Diária</label>
                        <textarea 
                          value={editingPlan.dailyReading}
                          onChange={e => setEditingPlan({...editingPlan, dailyReading: e.target.value})}
                          className="w-full p-2 border border-stone-300 rounded-md h-24 resize-none focus:ring-2 focus:ring-amber-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-red-400 mb-1">Evitar (Vícios Mentais)</label>
                      <input 
                        type="text" 
                        value={editingPlan.avoidance}
                        onChange={e => setEditingPlan({...editingPlan, avoidance: e.target.value})}
                        className="w-full p-2 border border-red-200 bg-red-50 rounded-md focus:ring-2 focus:ring-red-500 outline-none text-red-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Notas Clínicas (Privado)</label>
                      <textarea 
                        value={editingPlan.notes}
                        onChange={e => setEditingPlan({...editingPlan, notes: e.target.value})}
                        className="w-full p-2 border border-stone-200 bg-stone-50 rounded-md h-20 resize-none focus:ring-2 focus:ring-stone-500 outline-none text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex justify-between items-center">
                    <span className="text-green-600 text-sm font-medium animate-pulse">
                      {notification}
                    </span>
                    <button 
                      onClick={handleSavePlan}
                      className="bg-stone-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-amber-600 transition-colors flex items-center gap-2"
                    >
                      <span>☁️</span> Fazer Upload do Plano
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-stone-400 flex-col gap-4 border-2 border-dashed border-stone-200 rounded-xl">
                  <span className="text-4xl">👈</span>
                  <p>Selecione um paciente para gerenciar o plano</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
