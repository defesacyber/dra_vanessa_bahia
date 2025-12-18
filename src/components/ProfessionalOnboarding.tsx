import React, { useState } from 'react';
import { ProfessionalBrand } from '../types';
import { updateProfessionalBrand, getProfessionalBrand } from '../services/mockBackend';
import { analyzeProfessionalProfile } from '../services/geminiService';

interface ProfessionalOnboardingProps {
  onComplete: () => void;
}

export const ProfessionalOnboarding: React.FC<ProfessionalOnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [brand, setBrand] = useState<ProfessionalBrand>(getProfessionalBrand());
  
  const [answers, setAnswers] = useState({
    philosophy: '',
    reaction: '',
    communication: '',
    influence: ''
  });

  const handleAnalyzeProfile = async () => {
    if (!answers.philosophy || !answers.reaction) return;
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeProfessionalProfile(answers);
      
      const updatedBrand: ProfessionalBrand = {
        ...brand,
        personality: {
          archetype: result.archetype,
          customInstructions: result.customInstructions
        },
        setupComplete: true
      };
      
      updateProfessionalBrand(updatedBrand);
      setBrand(updatedBrand);
      setStep(3); // Success step
    } catch (error) {
      console.error(error);
      alert("Erro ao analisar perfil. Tente novamente.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-100 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-stone-900 p-6 text-white">
          <h1 className="font-serif text-2xl font-bold">Bem-vindo ao Têmpera</h1>
          <p className="text-stone-400 text-sm mt-1">Vamos configurar sua Identidade Digital Filosófica.</p>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto flex-1">
          
          {step === 1 && (
            <div className="space-y-6 animate-enter">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">👤</div>
                <h2 className="text-xl font-bold text-stone-800">Quem é você?</h2>
                <p className="text-stone-500 text-sm">Configure seus dados básicos de exibição.</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">Nome Profissional</label>
                <input 
                  type="text" 
                  value={brand.professionalName}
                  onChange={e => setBrand({...brand, professionalName: e.target.value})}
                  className="w-full p-3 border border-stone-300 rounded-lg"
                  placeholder="Ex: Dr. Marco Aurélio"
                />
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full bg-stone-900 text-white py-3 rounded-lg font-bold hover:bg-stone-800 transition-all mt-4"
              >
                Continuar
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-enter">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🧠</div>
                <h2 className="text-xl font-bold text-stone-800">Calibragem da IA</h2>
                <p className="text-stone-500 text-sm">Responda para que a IA aprenda a pensar como você.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-500 mb-1">1. Qual é a sua filosofia central de atendimento?</label>
                  <textarea 
                    value={answers.philosophy}
                    onChange={e => setAnswers({...answers, philosophy: e.target.value})}
                    placeholder="Ex: Acredito que o acolhimento vem antes da técnica..."
                    className="w-full p-3 border border-stone-300 rounded-md text-sm h-20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-500 mb-1">2. Como você reage quando um paciente falha?</label>
                  <textarea 
                    value={answers.reaction}
                    onChange={e => setAnswers({...answers, reaction: e.target.value})}
                    placeholder="Ex: Sou firme, mostro que a responsabilidade é dele..."
                    className="w-full p-3 border border-stone-300 rounded-md text-sm h-20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-500 mb-1">3. Defina seu estilo de comunicação</label>
                  <textarea 
                    value={answers.communication}
                    onChange={e => setAnswers({...answers, communication: e.target.value})}
                    placeholder="Ex: Uso muitas metáforas, falo de forma poética..."
                    className="w-full p-3 border border-stone-300 rounded-md text-sm h-20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-500 mb-1">4. Quem são suas maiores influências?</label>
                  <input 
                    type="text"
                    value={answers.influence}
                    onChange={e => setAnswers({...answers, influence: e.target.value})}
                    placeholder="Ex: Jung, Sêneca, Brené Brown..."
                    className="w-full p-3 border border-stone-300 rounded-md text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 bg-stone-200 text-stone-700 py-3 rounded-lg font-bold hover:bg-stone-300 transition-all"
                >
                  Voltar
                </button>
                <button 
                  onClick={handleAnalyzeProfile}
                  disabled={isAnalyzing || !answers.philosophy}
                  className="flex-[2] bg-stone-900 text-white py-3 rounded-lg font-bold hover:bg-stone-800 disabled:opacity-50 transition-all flex justify-center items-center gap-2"
                >
                  {isAnalyzing ? 'Analisando...' : 'Finalizar Cadastro'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-6 animate-enter py-10">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-4xl animate-bounce">
                ✅
              </div>
              <div>
                <h2 className="text-2xl font-bold text-stone-800">Tudo Pronto!</h2>
                <p className="text-stone-600 mt-2">
                  Sua IA foi calibrada com o arquétipo <strong className="capitalize">{brand.personality?.archetype}</strong>.
                </p>
                <p className="text-stone-500 text-sm mt-1 max-w-md mx-auto">
                  "{brand.personality?.customInstructions}"
                </p>
              </div>
              
              <button 
                onClick={onComplete}
                className="bg-stone-900 text-white px-8 py-3 rounded-full font-bold hover:bg-stone-800 transition-all shadow-lg transform hover:scale-105"
              >
                Acessar Painel do Profissional
              </button>
            </div>
          )}

        </div>
        
        {/* Progress Bar */}
        <div className="h-2 bg-stone-100 w-full">
          <div 
            className="h-full bg-amber-500 transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
