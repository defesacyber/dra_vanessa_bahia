import React from 'react';
import { IntegrativeAnalysis } from '../../types';
import { ChatInterface } from '../../components/ChatInterface';

interface ResultsSectionProps {
    result: IntegrativeAnalysis;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ result }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left Column: Scores & Key Insights */}
            <div className="lg:col-span-5 flex flex-col items-center animate-slide-up">
                <div className="sticky top-28 w-full space-y-6">
                    
                    {/* Scores Card */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-200">
                        <h3 className="serif text-lg font-bold text-stone-800 mb-4">📊 Métricas do Caso</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                                <div className="text-3xl font-bold text-green-700">{result.balanceScore}</div>
                                <div className="text-xs text-green-600 mt-1">Equilíbrio Mente-Corpo</div>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="text-3xl font-bold text-blue-700">{result.sustainabilityScore}</div>
                                <div className="text-xs text-blue-600 mt-1">Sustentabilidade</div>
                            </div>
                        </div>
                    </div>

                    {/* Main Challenges */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                        <h3 className="serif text-lg font-bold text-stone-800 mb-3">⚠️ Desafios Principais</h3>
                        <ul className="space-y-2">
                            {(result.mainChallenges || []).map((challenge, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-stone-600">
                                    <span className="text-amber-500 mt-0.5">•</span>
                                    {challenge}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Nutritional Goals */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                        <h3 className="serif text-lg font-bold text-stone-800 mb-3">🎯 Metas Nutricionais</h3>
                        <ul className="space-y-2">
                            {(result.nutritionalGoals || []).map((goal, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-stone-600">
                                    <span className="text-green-500 mt-0.5">✓</span>
                                    {goal}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 text-center">
                        <div className="inline-block border border-stone-300 px-3 py-1 rounded-full text-xs font-mono text-stone-500">
                            Análise por Gemini 2.5 Flash
                        </div>
                        <div className="mt-4 flex justify-center gap-4">
                            <button onClick={() => window.print()} className="text-xs font-bold text-stone-500 hover:text-stone-800 border-b border-stone-300 hover:border-stone-800 transition-all pb-0.5">
                                🖨️ Imprimir
                            </button>
                            <button onClick={() => {
                                const text = `Dra. Vanessa Bahia - Análise Integrativa\n\n${result.nutritionalContext}\n\nFoco Semanal: ${result.weeklyFocus}\n\nPrescrição: ${result.nutritionalPrescription}`;
                                if (navigator.share) {
                                    navigator.share({
                                        title: 'Análise Integrativa',
                                        text: text,
                                    }).catch(console.error);
                                } else {
                                    navigator.clipboard.writeText(text);
                                    alert('Análise copiada para a área de transferência!');
                                }
                            }} className="text-xs font-bold text-stone-500 hover:text-stone-800 border-b border-stone-300 hover:border-stone-800 transition-all pb-0.5">
                                📤 Compartilhar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Full Analysis */}
            <div className="lg:col-span-7 space-y-8">

                {/* Context */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 animate-slide-up delay-100">
                    <h2 className="serif text-2xl font-bold text-stone-800 mb-4">📋 Contexto Nutricional</h2>
                    <div className="prose prose-stone leading-relaxed text-stone-600">
                        <p className="whitespace-pre-line">{result.nutritionalContext}</p>
                    </div>
                </div>

                {/* Philosophical Insights */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200/60 animate-slide-up delay-150">
                    <h3 className="serif text-lg font-bold text-indigo-900 mb-4">💡 Insights Reflexivos</h3>
                    <div className="space-y-4">
                        {(result.philosophicalInsights || []).map((insight, idx) => (
                            <div key={idx} className="bg-white/60 p-4 rounded-lg">
                                <div className="font-semibold text-indigo-800">{insight.principle}</div>
                                <p className="text-sm text-indigo-700 mt-1">{insight.application}</p>
                                <div className="text-xs text-indigo-500 mt-2 italic">— {insight.source}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mindset Shifts */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 animate-slide-up delay-200">
                    <h3 className="serif text-lg font-bold text-stone-800 mb-3">🧠 Mudanças de Mentalidade</h3>
                    <div className="flex flex-wrap gap-2">
                        {(result.mindsetShifts || []).map((shift, idx) => (
                            <span key={idx} className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-sm border border-amber-200">
                                {shift}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Integrative Approach */}
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200/60 animate-slide-up delay-250">
                    <h3 className="serif text-lg font-bold text-emerald-900 mb-2">🔗 Abordagem Integrativa</h3>
                    <p className="text-emerald-800 text-sm leading-relaxed">
                        {result.integrativeApproach}
                    </p>
                </div>

                {/* Practical Exercises */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 animate-slide-up delay-300">
                    <h3 className="serif text-lg font-bold text-stone-800 mb-3">💪 Exercícios Práticos</h3>
                    <ol className="space-y-3">
                        {(result.practicalExercises || []).map((exercise, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-stone-600">
                                <span className="flex-shrink-0 w-6 h-6 bg-stone-100 rounded-full flex items-center justify-center text-xs font-bold text-stone-500">
                                    {idx + 1}
                                </span>
                                {exercise}
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Prescription Card */}
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-200/60 relative overflow-hidden animate-slide-up delay-350">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-amber-900 text-6xl font-serif">℞</div>
                    <h3 className="serif text-lg font-bold text-amber-900 mb-2">📝 Prescrição Nutricional</h3>
                    <p className="text-amber-800/80 text-sm leading-relaxed mb-4">
                        {result.nutritionalPrescription}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-amber-200">
                        <div>
                            <div className="text-xs text-amber-600 uppercase tracking-wider mb-1">Foco Semanal</div>
                            <p className="text-sm text-amber-800">{result.weeklyFocus}</p>
                        </div>
                        <div>
                            <div className="text-xs text-amber-600 uppercase tracking-wider mb-1">Reflexão Diária</div>
                            <p className="text-sm text-amber-800 italic">"{result.dailyReflection}"</p>
                        </div>
                    </div>
                </div>

                {/* Chat */}
                <div className="animate-slide-up delay-400">
                    <ChatInterface analysisContext={{
                        calories: String(result.balanceScore),
                        analysis: result.nutritionalContext,
                        prescription: result.nutritionalPrescription,
                    }} />
                </div>

            </div>
        </div>
    );
};
