import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DailyMessageCard } from '../../components/concierge';
import { SubstitutionModal } from '../../components/concierge';
import { useSubstitution } from '../../hooks/useSubstitution';
/**
 * Dashboard Premium do Paciente
 * - Mensagem do dia (concierge style)
 * - Plano com substituições inteligentes
 * - Cards com hierarquia visual
 */
export const PatientDashboard = () => {
    const { user, logout, token } = useAuth();
    const { loading, response, requestSubstitution, clearResponse } = useSubstitution();
    const [todayMessage, setTodayMessage] = useState(null);
    const [showSubstitutionModal, setShowSubstitutionModal] = useState(false);
    // Fetch today's message
    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const res = await fetch('/api/v1/messages/today', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'x-user-role': 'patient'
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setTodayMessage(data);
                }
            }
            catch (err) {
                console.error('Failed to fetch daily message:', err);
            }
        };
        if (token)
            fetchMessage();
    }, [token]);
    // Mock meal plan (em produção: vem da API)
    const mockMealPlan = {
        meals: [
            {
                name: 'Café da Manhã',
                time: '07:00',
                items: [
                    { id: '1', food: 'Pão integral', grams: 50, kcal: 120, macros: { carb_g: 22, prot_g: 4, fat_g: 2 }, substitutable: true },
                    { id: '2', food: 'Ovos mexidos', grams: 100, kcal: 155, macros: { carb_g: 1, prot_g: 13, fat_g: 11 }, substitutable: true },
                ]
            },
            {
                name: 'Almoço',
                time: '12:00',
                items: [
                    { id: '3', food: 'Arroz integral', grams: 150, kcal: 166, macros: { carb_g: 35, prot_g: 4, fat_g: 1.4 }, substitutable: true },
                    { id: '4', food: 'Frango grelhado', grams: 120, kcal: 198, macros: { carb_g: 0, prot_g: 37, fat_g: 4.3 }, substitutable: true },
                    { id: '5', food: 'Brócolis', grams: 100, kcal: 35, macros: { carb_g: 7, prot_g: 3, fat_g: 0.4 }, substitutable: false },
                ]
            },
            {
                name: 'Jantar',
                time: '19:00',
                items: [
                    { id: '6', food: 'Peixe grelhado', grams: 150, kcal: 192, macros: { carb_g: 0, prot_g: 39, fat_g: 3.9 }, substitutable: true },
                    { id: '7', food: 'Batata doce', grams: 200, kcal: 172, macros: { carb_g: 40, prot_g: 3.2, fat_g: 0.2 }, substitutable: true },
                ]
            }
        ]
    };
    const handleSubstitutionRequest = async (item, meal) => {
        setShowSubstitutionModal(true);
        await requestSubstitution({
            baseFood: item.food,
            baseGrams: item.grams,
            baseKcal: item.kcal,
            baseMacros: item.macros,
            meal: meal.toLowerCase(),
            planVersion: '2025-01-15_v1',
            patientPreferences: ['saciedade', 'praticidade']
        });
    };
    const handleSelectChoice = (_choice) => {
        // Substituição selecionada: choice
        setShowSubstitutionModal(false);
        clearResponse();
    };
    return (_jsxs("div", { className: "min-h-screen bg-tempera-ivory", children: [_jsx("header", { className: "bg-white border-b border-stone-200 sticky top-0 z-10", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 py-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-tempera-olive/10 flex items-center justify-center", children: _jsx("span", { className: "text-tempera-olive text-lg", children: "\uD83E\uDD57" }) }), _jsxs("div", { children: [_jsx("h1", { className: "font-serif font-bold text-stone-900", children: "Seu Plano" }), _jsx("p", { className: "text-xs text-stone-500", children: "Cuidado personalizado" })] })] }), _jsx("button", { onClick: logout, className: "text-sm text-stone-500 hover:text-stone-700 transition-colors", children: "Sair" })] }) }), _jsxs("main", { className: "max-w-4xl mx-auto px-4 py-6 space-y-6", children: [_jsxs("div", { className: "text-center py-4", children: [_jsxs("h2", { className: "text-2xl font-serif font-bold text-stone-900", children: ["Ol\u00E1, ", user?.name?.split(' ')[0] || 'Paciente', "! \uD83D\uDC4B"] }), _jsx("p", { className: "text-stone-500 mt-1", children: new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }) })] }), todayMessage && (_jsx(DailyMessageCard, { message: todayMessage, onAction: () => { } })), _jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-lg font-semibold text-stone-900 flex items-center gap-2", children: [_jsx("span", { children: "\uD83D\uDCCB" }), " Suas Refei\u00E7\u00F5es"] }), mockMealPlan.meals.map((meal) => (_jsxs("div", { className: "bg-white rounded-xl border border-stone-200 overflow-hidden", children: [_jsxs("div", { className: "bg-stone-50 px-4 py-3 border-b border-stone-100 flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-stone-900", children: meal.name }), _jsx("p", { className: "text-xs text-stone-500", children: meal.time })] }), _jsxs("span", { className: "text-sm text-stone-400", children: [meal.items.reduce((sum, i) => sum + i.kcal, 0), " kcal"] })] }), _jsx("div", { className: "divide-y divide-stone-100", children: meal.items.map((item) => (_jsxs("div", { className: "px-4 py-3 flex items-center justify-between hover:bg-stone-50 transition-colors", children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-medium text-stone-900", children: item.food }), _jsxs("p", { className: "text-sm text-stone-500", children: [item.grams, "g \u2022 ", item.kcal, " kcal"] })] }), item.substitutable && (_jsxs("button", { onClick: () => handleSubstitutionRequest(item, meal.name), disabled: loading, className: "flex items-center gap-1 text-sm text-tempera-olive hover:text-tempera-deep hover:bg-tempera-olive/10 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50", children: [_jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" }) }), "Trocar"] }))] }, item.id))) })] }, meal.name)))] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("button", { className: "bg-white rounded-xl p-4 border border-stone-200 hover:border-tempera-gold transition-all text-left group", children: [_jsx("span", { className: "text-2xl mb-2 block group-hover:scale-110 transition-transform", children: "\uD83D\uDCAC" }), _jsx("span", { className: "font-medium text-tempera-deep", children: "Falar com Nutri" })] }), _jsxs("button", { className: "bg-white rounded-xl p-4 border border-stone-200 hover:border-tempera-gold transition-all text-left group", children: [_jsx("span", { className: "text-2xl mb-2 block group-hover:scale-110 transition-transform", children: "\uD83D\uDCCA" }), _jsx("span", { className: "font-medium text-tempera-deep", children: "Meu Progresso" })] })] })] }), _jsx("footer", { className: "py-6 text-center text-xs text-stone-400", children: _jsx("p", { children: "Nutrindo corpo e mente, com reflex\u00E3o e tempero" }) }), _jsx(SubstitutionModal, { isOpen: showSubstitutionModal, onClose: () => {
                    setShowSubstitutionModal(false);
                    clearResponse();
                }, response: response, userRole: "patient", onSelectChoice: handleSelectChoice, onContact: () => { } }), loading && (_jsx("div", { className: "fixed inset-0 bg-black/20 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-xl p-6 shadow-xl flex items-center gap-3", children: [_jsx("div", { className: "animate-spin rounded-full h-6 w-6 border-2 border-tempera-olive border-t-transparent" }), _jsx("span", { className: "text-tempera-deep", children: "Buscando substitui\u00E7\u00F5es..." })] }) }))] }));
};
export default PatientDashboard;
