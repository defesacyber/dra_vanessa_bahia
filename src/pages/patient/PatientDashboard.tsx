import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DailyMessageCard } from '../../components/concierge';
import { SubstitutionModal } from '../../components/concierge';
import { useSubstitution } from '../../hooks/useSubstitution';
import type { DailyMessage, SubstitutionChoice, Macros } from '../../types/concierge';

interface MealItem {
  id: string;
  food: string;
  grams: number;
  kcal: number;
  macros: Macros;
  substitutable: boolean;
}

interface Meal {
  name: string;
  time: string;
  items: MealItem[];
}

/**
 * Dashboard Premium do Paciente
 * - Mensagem do dia (concierge style)
 * - Plano com substituições inteligentes
 * - Cards com hierarquia visual
 */
export const PatientDashboard: React.FC = () => {
  const { user, logout, token } = useAuth();
  const { loading, response, requestSubstitution, clearResponse } = useSubstitution();

  const [todayMessage, setTodayMessage] = useState<DailyMessage | null>(null);
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
      } catch (err) {
        console.error('Failed to fetch daily message:', err);
      }
    };
    if (token) fetchMessage();
  }, [token]);

  // Mock meal plan (em produção: vem da API)
  const mockMealPlan: { meals: Meal[] } = {
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

  const handleSubstitutionRequest = async (item: MealItem, meal: string) => {
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

  const handleSelectChoice = (_choice: SubstitutionChoice) => {
    // Substituição selecionada: choice
    setShowSubstitutionModal(false);
    clearResponse();
  };

  return (
    <div className="min-h-screen bg-tempera-ivory">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-tempera-olive/10 flex items-center justify-center">
              <span className="text-tempera-olive text-lg">🥗</span>
            </div>
            <div>
              <h1 className="font-serif font-bold text-stone-900">Seu Plano</h1>
              <p className="text-xs text-stone-500">Cuidado personalizado</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="text-sm text-stone-500 hover:text-stone-700 transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Saudação */}
        <div className="text-center py-4">
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Olá, {user?.name?.split(' ')[0] || 'Paciente'}! 👋
          </h2>
          <p className="text-stone-500 mt-1">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>

        {/* Mensagem do Dia (Concierge) */}
        {todayMessage && (
          <DailyMessageCard
            message={todayMessage}
            onAction={() => { /* Message action: todayMessage.action */ }}
          />
        )}

        {/* Plano do Dia */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
            <span>📋</span> Suas Refeições
          </h3>

          {mockMealPlan.meals.map((meal) => (
            <div key={meal.name} className="bg-white rounded-xl border border-stone-200 overflow-hidden">
              {/* Meal Header */}
              <div className="bg-stone-50 px-4 py-3 border-b border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-stone-900">{meal.name}</h4>
                  <p className="text-xs text-stone-500">{meal.time}</p>
                </div>
                <span className="text-sm text-stone-400">
                  {meal.items.reduce((sum, i) => sum + i.kcal, 0)} kcal
                </span>
              </div>

              {/* Meal Items */}
              <div className="divide-y divide-stone-100">
                {meal.items.map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-3 flex items-center justify-between hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-stone-900">{item.food}</p>
                      <p className="text-sm text-stone-500">
                        {item.grams}g • {item.kcal} kcal
                      </p>
                    </div>

                    {item.substitutable && (
                      <button
                        onClick={() => handleSubstitutionRequest(item, meal.name)}
                        disabled={loading}
                        className="flex items-center gap-1 text-sm text-tempera-olive hover:text-tempera-deep hover:bg-tempera-olive/10 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                        Trocar
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-white rounded-xl p-4 border border-stone-200 hover:border-tempera-gold transition-all text-left group">
            <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">💬</span>
            <span className="font-medium text-tempera-deep">Falar com Nutri</span>
          </button>
          <button className="bg-white rounded-xl p-4 border border-stone-200 hover:border-tempera-gold transition-all text-left group">
            <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">📊</span>
            <span className="font-medium text-tempera-deep">Meu Progresso</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-stone-400">
        <p>Nutrindo corpo e mente, com reflexão e tempero</p>
      </footer>

      {/* Substitution Modal */}
      <SubstitutionModal
        isOpen={showSubstitutionModal}
        onClose={() => {
          setShowSubstitutionModal(false);
          clearResponse();
        }}
        response={response}
        userRole="patient"
        onSelectChoice={handleSelectChoice}
        onContact={() => { /* Contact nutritionist */ }}
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-tempera-olive border-t-transparent" />
            <span className="text-tempera-deep">Buscando substituições...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
