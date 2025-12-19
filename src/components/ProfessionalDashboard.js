import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { getClients, updateClientPlan } from '../services/mockBackend';
import { generatePlanSuggestion } from '../services/geminiService';
import { ProfessionalSettings } from './ProfessionalSettings';
export const ProfessionalDashboard = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('clients');
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [editingPlan, setEditingPlan] = useState(null);
    const [notification, setNotification] = useState(null);
    // AI Generation State
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    useEffect(() => {
        setClients(getClients());
    }, []);
    const handleSelectClient = (client) => {
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
        if (!selectedClient || !aiPrompt.trim())
            return;
        setIsGenerating(true);
        try {
            const suggestion = await generatePlanSuggestion(selectedClient.name, aiPrompt);
            setEditingPlan({
                ...suggestion,
                lastUpdated: Date.now()
            });
            setNotification("Plano gerado pela IA com sucesso!");
            setTimeout(() => setNotification(null), 3000);
        }
        catch (error) {
            console.error(error);
            setNotification("Erro ao gerar plano. Tente novamente.");
        }
        finally {
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
    return (_jsxs("div", { className: "min-h-screen bg-stone-100 text-stone-900 font-sans", children: [_jsx("header", { className: "bg-gradient-to-r from-emerald-700 to-teal-700 text-white p-4 shadow-md", children: _jsxs("div", { className: "container mx-auto flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-2xl", children: "\uD83D\uDC69\u200D\u2695\uFE0F" }), _jsx("h1", { className: "font-serif font-bold text-xl", children: "Portal do Nutricionista" })] }), _jsxs("div", { className: "flex gap-4 items-center", children: [_jsxs("nav", { className: "flex gap-2 text-sm", children: [_jsx("button", { onClick: () => setActiveTab('clients'), className: `px-3 py-1 rounded-full transition-colors ${activeTab === 'clients' ? 'bg-white text-emerald-800 font-bold' : 'text-emerald-100 hover:text-white'}`, children: "Pacientes" }), _jsx("button", { onClick: () => setActiveTab('settings'), className: `px-3 py-1 rounded-full transition-colors ${activeTab === 'settings' ? 'bg-white text-emerald-800 font-bold' : 'text-emerald-100 hover:text-white'}`, children: "Configura\u00E7\u00F5es" })] }), _jsx("div", { className: "h-4 w-px bg-emerald-500 mx-2" }), _jsx("button", { onClick: onLogout, className: "text-sm text-emerald-100 hover:text-white", children: "Sair" })] })] }) }), _jsx("main", { className: "container mx-auto p-6 h-[calc(100vh-80px)]", children: activeTab === 'settings' ? (_jsx(ProfessionalSettings, {})) : (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 h-full", children: [_jsxs("div", { className: "bg-white rounded-xl shadow-sm p-4 h-full flex flex-col", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "font-serif font-bold text-lg text-stone-700", children: "Carteira de Pacientes" }), _jsx("button", { onClick: () => {
                                                const inviteLink = `${window.location.origin}?invite=${Math.random().toString(36).substring(7)}`;
                                                navigator.clipboard.writeText(inviteLink);
                                                setNotification("Link de convite copiado!");
                                                setTimeout(() => setNotification(null), 3000);
                                            }, className: "text-xs bg-stone-900 text-white px-3 py-1.5 rounded-full hover:bg-stone-700 transition-colors", children: "+ Convidar" })] }), _jsx("div", { className: "space-y-2 overflow-y-auto flex-1", children: clients.map(client => (_jsxs("button", { onClick: () => handleSelectClient(client), className: `w-full text-left p-3 rounded-lg border transition-all ${selectedClient?.id === client.id
                                            ? 'bg-amber-50 border-amber-500 ring-1 ring-amber-500'
                                            : 'border-stone-200 hover:bg-stone-50'}`, children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "font-bold text-stone-800", children: client.name }), _jsx("span", { className: `text-xs px-2 py-0.5 rounded-full ${client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`, children: client.status === 'active' ? 'Ativo' : 'Inativo' })] }), _jsx("div", { className: "text-xs text-stone-500 mt-1 truncate", children: client.currentPlan ? `Foco: ${client.currentPlan.focusArea}` : 'Sem plano ativo' })] }, client.id))) })] }), _jsx("div", { className: "md:col-span-2 h-full", children: selectedClient && editingPlan ? (_jsxs("div", { className: "bg-white rounded-xl shadow-sm p-6 h-full flex flex-col", children: [_jsxs("div", { className: "flex justify-between items-start mb-6 border-b border-stone-100 pb-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "font-serif font-bold text-2xl text-stone-800", children: "Plano Filos\u00F3fico" }), _jsxs("p", { className: "text-stone-500 text-sm", children: ["Paciente: ", selectedClient.name] })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-xs text-stone-400", children: "\u00DAltima atualiza\u00E7\u00E3o" }), _jsx("div", { className: "font-mono text-sm", children: new Date(editingPlan.lastUpdated).toLocaleDateString() })] })] }), _jsxs("div", { className: "space-y-4 flex-1 overflow-y-auto pr-2", children: [_jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4", children: [_jsxs("h3", { className: "text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-2", children: [_jsx("span", { children: "\u2728" }), " Assistente de Planejamento (IA)"] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", value: aiPrompt, onChange: e => setAiPrompt(e.target.value), placeholder: "Descreva o estado atual do paciente (ex: 'Muito ansioso com o trabalho, precisa de estoicismo')", className: "flex-1 p-2 border border-amber-200 rounded-md text-sm focus:ring-2 focus:ring-amber-500 outline-none" }), _jsx("button", { onClick: handleGeneratePlan, disabled: !aiPrompt.trim() || isGenerating, className: "bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-amber-700 disabled:opacity-50 transition-colors whitespace-nowrap", children: isGenerating ? 'Gerando...' : 'Sugerir Plano' })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1", children: "Foco Terap\u00EAutico" }), _jsx("input", { type: "text", value: editingPlan.focusArea, onChange: e => setEditingPlan({ ...editingPlan, focusArea: e.target.value }), className: "w-full p-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-amber-500 outline-none font-serif", placeholder: "Ex: Redu\u00E7\u00E3o de Ansiedade Existencial" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1", children: "Rotina Matinal" }), _jsx("textarea", { value: editingPlan.morningRoutine, onChange: e => setEditingPlan({ ...editingPlan, morningRoutine: e.target.value }), className: "w-full p-2 border border-stone-300 rounded-md h-24 resize-none focus:ring-2 focus:ring-amber-500 outline-none" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1", children: "Leitura Di\u00E1ria" }), _jsx("textarea", { value: editingPlan.dailyReading, onChange: e => setEditingPlan({ ...editingPlan, dailyReading: e.target.value }), className: "w-full p-2 border border-stone-300 rounded-md h-24 resize-none focus:ring-2 focus:ring-amber-500 outline-none" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-red-400 mb-1", children: "Evitar (V\u00EDcios Mentais)" }), _jsx("input", { type: "text", value: editingPlan.avoidance, onChange: e => setEditingPlan({ ...editingPlan, avoidance: e.target.value }), className: "w-full p-2 border border-red-200 bg-red-50 rounded-md focus:ring-2 focus:ring-red-500 outline-none text-red-900" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1", children: "Notas Cl\u00EDnicas (Privado)" }), _jsx("textarea", { value: editingPlan.notes, onChange: e => setEditingPlan({ ...editingPlan, notes: e.target.value }), className: "w-full p-2 border border-stone-200 bg-stone-50 rounded-md h-20 resize-none focus:ring-2 focus:ring-stone-500 outline-none text-sm font-mono" })] })] }), _jsxs("div", { className: "mt-6 pt-4 border-t border-stone-100 flex justify-between items-center", children: [_jsx("span", { className: "text-green-600 text-sm font-medium animate-pulse", children: notification }), _jsxs("button", { onClick: handleSavePlan, className: "bg-stone-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-amber-600 transition-colors flex items-center gap-2", children: [_jsx("span", { children: "\u2601\uFE0F" }), " Fazer Upload do Plano"] })] })] })) : (_jsxs("div", { className: "h-full flex items-center justify-center text-stone-400 flex-col gap-4 border-2 border-dashed border-stone-200 rounded-xl", children: [_jsx("span", { className: "text-4xl", children: "\uD83D\uDC48" }), _jsx("p", { children: "Selecione um paciente para gerenciar o plano" })] })) })] })) })] }));
};
