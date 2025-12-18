import React from 'react';
import { PhilosophicalPlan } from '../types';

interface ClientPlanViewProps {
  plan: PhilosophicalPlan;
  onClose: () => void;
}

export const ClientPlanView: React.FC<ClientPlanViewProps> = ({ plan, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-enter">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-stone-900 text-white p-6 flex justify-between items-start">
          <div>
            <h2 className="font-serif text-2xl font-bold">Seu Plano Filosófico</h2>
            <p className="text-stone-400 text-sm mt-1">Prescrito pelo Especialista</p>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-white text-2xl">&times;</button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-800 mb-1">Foco Atual</h3>
            <p className="font-serif text-xl text-amber-900 font-bold">{plan.focusArea}</p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="bg-stone-100 p-2 rounded-lg text-2xl">🌅</div>
              <div>
                <h3 className="font-bold text-stone-800">Ritual Matinal</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{plan.morningRoutine}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-stone-100 p-2 rounded-lg text-2xl">📖</div>
              <div>
                <h3 className="font-bold text-stone-800">Leitura Diária</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{plan.dailyReading}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-red-50 p-2 rounded-lg text-2xl">🚫</div>
              <div>
                <h3 className="font-bold text-red-800">Jejum Mental (Evitar)</h3>
                <p className="text-red-700 text-sm leading-relaxed">{plan.avoidance}</p>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-4 border-t border-stone-100">
             <p className="text-xs text-stone-400">Atualizado em {new Date(plan.lastUpdated).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
