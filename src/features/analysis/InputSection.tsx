import React from 'react';
import { HistoryItem } from '../../types';

interface InputSectionProps {
    input: string;
    setInput: (value: string) => void;
    onAnalyze: () => void;
    error: string | null;
    history: HistoryItem[];
    onClearHistory: () => void;
    onLoadHistory: (item: HistoryItem) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
    input,
    setInput,
    onAnalyze,
    error,
    history,
    onClearHistory,
    onLoadHistory
}) => {
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4 animate-enter">
                <h2 className="serif text-5xl md:text-7xl text-stone-900 leading-tight tracking-tighter">
                    <span className="font-light italic text-stone-600">Descreva o</span> <br />
                    <span className="font-black decoration-4 underline underline-offset-8" style={{ color: 'var(--brand-primary)', textDecorationColor: 'var(--brand-accent)' }}>caso clínico</span>
                    <span className="font-light italic text-stone-600"> do paciente</span>
                </h2>
                <p className="text-stone-600 text-lg font-light max-w-lg mx-auto pt-4">
                    Descreva os desafios alimentares, comportamentos e objetivos do paciente.
                    Nossa IA irá sugerir abordagens para o cuidado integral.
                </p>
            </div>

            <div className="bg-white p-2 rounded-xl shadow-lg border border-stone-200 focus-within:ring-2 transition-all duration-300 animate-enter delay-100" style={{ '--tw-ring-color': 'var(--brand-accent)' } as React.CSSProperties}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ex: Paciente, 35 anos, com compulsão alimentar noturna. Relata ansiedade no trabalho, dificuldade em manter rotina alimentar e culpa após episódios de exagero. Meta: perda de peso sustentável e equilíbrio emocional com alimentação..."
                    className="w-full h-40 p-4 resize-none outline-none text-lg text-stone-700 placeholder:text-stone-300 bg-transparent rounded-lg"
                />
                <div className="flex justify-between items-center px-4 pb-2 pt-2 border-t border-stone-100">
                    <span className="text-xs text-stone-400 font-mono">
                        {input.length} caracteres
                    </span>
                    <button
                        onClick={onAnalyze}
                        disabled={!input.trim()}
                        className="text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 transition-all"
                        style={{ backgroundColor: 'var(--brand-primary)' }}
                    >
                        Gerar Análise Integrativa
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm text-center animate-enter">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 opacity-60 animate-enter delay-200">
                <div className="text-center space-y-2">
                    <div className="text-2xl">🥗</div>
                    <h3 className="font-bold text-sm">Nutrição Clínica</h3>
                    <p className="text-xs text-stone-500">Estratégias baseadas em evidências</p>
                </div>
                <div className="text-center space-y-2">
                    <div className="text-2xl">🧘</div>
                    <h3 className="font-bold text-sm">Atenção Plena</h3>
                    <p className="text-xs text-stone-500">Consciência e presença nas refeições</p>
                </div>
                <div className="text-center space-y-2">
                    <div className="text-2xl">💚</div>
                    <h3 className="font-bold text-sm">Cuidado Integral</h3>
                    <p className="text-xs text-stone-500">Corpo e mente em harmonia</p>
                </div>
            </div>

            {history.length > 0 && (
                <div className="pt-12 animate-enter delay-300 border-t border-stone-100 mt-12">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-stone-400 text-xs uppercase tracking-widest">Histórico de Consultas</h3>
                        <button onClick={onClearHistory} className="text-xs text-stone-400 hover:text-red-500 transition-colors">
                            Limpar Histórico
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {history.map(item => (
                            <button
                                key={item.id}
                                onClick={() => onLoadHistory(item)}
                                className="text-left p-4 bg-white border border-stone-200 rounded-lg hover:border-amber-400 hover:shadow-md transition-all group"
                            >
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="font-serif font-bold text-stone-800 truncate pr-2">{item.result.servingSize}</span>
                                    <span className="text-[10px] text-stone-400 font-mono">{new Date(item.date).toLocaleDateString()}</span>
                                </div>
                                <div className="text-xs text-stone-500 truncate mt-1 group-hover:text-stone-700 italic">"{item.input}"</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
