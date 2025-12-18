import React, { useState, useEffect } from 'react';
import { ProfessionalBrand } from '../types';
import { getProfessionalBrand, updateProfessionalBrand } from '../services/mockBackend';
import { analyzeProfessionalProfile } from '../services/geminiService';

export const ProfessionalSettings: React.FC = () => {
  const [brand, setBrand] = useState<ProfessionalBrand | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  
  // Calibration State
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [answers, setAnswers] = useState({
    philosophy: '',
    reaction: '',
    communication: '',
    influence: ''
  });

  useEffect(() => {
    setBrand(getProfessionalBrand());
  }, []);

  const handleSave = () => {
    if (brand) {
      updateProfessionalBrand(brand);
      setNotification("Identidade visual atualizada com sucesso!");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleAnalyzeProfile = async () => {
    if (!answers.philosophy || !answers.reaction) return;
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeProfessionalProfile(answers);
      if (brand) {
        setBrand({
          ...brand,
          personality: {
            archetype: result.archetype,
            customInstructions: result.customInstructions
          }
        });
      }
      setIsCalibrating(false);
      setNotification("Perfil traçado com sucesso! A IA agora conhece sua voz.");
    } catch (error) {
      console.error(error);
      setNotification("Erro ao analisar perfil.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!brand) return <div>Carregando configurações...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-full overflow-y-auto">
      <h2 className="font-serif font-bold text-2xl text-stone-800 mb-6">Configuração do Consultório</h2>
      
      <div className="space-y-6 max-w-2xl">
        
        {/* Profile Section */}
        <div className="space-y-4 border-b border-stone-100 pb-6">
          <h3 className="font-bold text-stone-600 uppercase text-xs tracking-wider">Perfil Profissional</h3>
          
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Nome de Exibição</label>
            <input 
              type="text" 
              value={brand.professionalName}
              onChange={e => setBrand({...brand, professionalName: e.target.value})}
              className="w-full p-2 border border-stone-300 rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">URL da Foto de Perfil</label>
              <input 
                type="text" 
                value={brand.photoUrl}
                onChange={e => setBrand({...brand, photoUrl: e.target.value})}
                className="w-full p-2 border border-stone-300 rounded-md text-xs"
              />
              <div className="mt-2 w-16 h-16 rounded-full overflow-hidden border border-stone-200">
                <img src={brand.photoUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">URL do Logo</label>
              <input 
                type="text" 
                value={brand.logoUrl}
                onChange={e => setBrand({...brand, logoUrl: e.target.value})}
                className="w-full p-2 border border-stone-300 rounded-md text-xs"
              />
              <div className="mt-2 w-16 h-16 flex items-center justify-center border border-stone-200 rounded-lg p-2">
                <img src={brand.logoUrl} alt="Logo Preview" className="max-w-full max-h-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Personality Calibration Section */}
        <div className="space-y-4 border-b border-stone-100 pb-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-stone-600 uppercase text-xs tracking-wider">Personalidade da IA (Sua Voz)</h3>
            <button 
              onClick={() => setIsCalibrating(!isCalibrating)}
              className="text-xs text-amber-600 font-bold hover:underline"
            >
              {isCalibrating ? 'Cancelar Calibragem' : '🔄 Recalibrar Perfil'}
            </button>
          </div>
          
          <p className="text-xs text-stone-500">
            A IA utiliza essas configurações para imitar seu estilo de atendimento.
          </p>

          {isCalibrating ? (
            <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-4 animate-enter">
              <h4 className="font-serif font-bold text-lg text-stone-800">Mapeamento de Personalidade</h4>
              <p className="text-sm text-stone-600">Responda com sinceridade para que a IA capture sua essência.</p>
              
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

              <button 
                onClick={handleAnalyzeProfile}
                disabled={isAnalyzing || !answers.philosophy}
                className="w-full bg-stone-900 text-white py-3 rounded-lg font-bold hover:bg-stone-800 disabled:opacity-50 transition-all flex justify-center items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analisando Perfil...
                  </>
                ) : (
                  'Gerar Minha Identidade Digital'
                )}
              </button>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">
                  {brand.personality?.archetype === 'thomist' ? '✝️' : 
                   brand.personality?.archetype === 'tough-love' ? '🔥' : 
                   brand.personality?.archetype === 'analytical' ? '🔬' : '🌱'}
                </span>
                <span className="font-bold capitalize text-stone-800">
                  Arquétipo: {brand.personality?.archetype || 'Não definido'}
                </span>
              </div>
              <div className="text-sm text-stone-600 italic bg-stone-50 p-3 rounded border border-stone-100">
                "{brand.personality?.customInstructions || 'Nenhuma instrução definida.'}"
              </div>
            </div>
          )}
        </div>

        {/* Branding Section */}
        <div className="space-y-4">
          <h3 className="font-bold text-stone-600 uppercase text-xs tracking-wider">Identidade Visual (White Label)</h3>
          <p className="text-xs text-stone-500">Essas cores serão aplicadas no aplicativo dos seus pacientes.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Cor Primária</label>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  value={brand.primaryColor}
                  onChange={e => setBrand({...brand, primaryColor: e.target.value})}
                  className="h-10 w-10 rounded cursor-pointer border-0"
                />
                <span className="text-xs font-mono text-stone-500">{brand.primaryColor}</span>
              </div>
              <p className="text-[10px] text-stone-400 mt-1">Cabeçalhos, Botões Principais</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Cor de Destaque</label>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  value={brand.accentColor}
                  onChange={e => setBrand({...brand, accentColor: e.target.value})}
                  className="h-10 w-10 rounded cursor-pointer border-0"
                />
                <span className="text-xs font-mono text-stone-500">{brand.accentColor}</span>
              </div>
              <p className="text-[10px] text-stone-400 mt-1">Detalhes, Links, Ícones</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Cor de Fundo</label>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  value={brand.backgroundColor}
                  onChange={e => setBrand({...brand, backgroundColor: e.target.value})}
                  className="h-10 w-10 rounded cursor-pointer border-0"
                />
                <span className="text-xs font-mono text-stone-500">{brand.backgroundColor}</span>
              </div>
              <p className="text-[10px] text-stone-400 mt-1">Fundo da tela do App</p>
            </div>
          </div>

          {/* Preview */}
          <div className="mt-6 p-4 rounded-xl border border-stone-200" style={{ backgroundColor: brand.backgroundColor }}>
            <h4 className="text-xs font-bold mb-2" style={{ color: brand.primaryColor }}>Preview do App do Paciente</h4>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: brand.primaryColor }}>
                  Φ
                </div>
                <span className="font-bold" style={{ color: brand.primaryColor }}>{brand.professionalName}</span>
              </div>
              <button className="w-full py-2 rounded-lg text-white font-medium text-sm" style={{ backgroundColor: brand.primaryColor }}>
                Botão Principal
              </button>
              <p className="mt-2 text-sm" style={{ color: brand.accentColor }}>Texto de destaque ou link</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button 
            onClick={handleSave}
            className="bg-stone-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-stone-800 transition-colors w-full md:w-auto"
          >
            Salvar Alterações
          </button>
          {notification && (
            <p className="mt-2 text-green-600 text-sm text-center md:text-left animate-pulse">{notification}</p>
          )}
        </div>

      </div>
    </div>
  );
};
