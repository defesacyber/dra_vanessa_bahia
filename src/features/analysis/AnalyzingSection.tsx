import React from 'react';

export const AnalyzingSection: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 animate-enter">
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-stone-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 rounded-full border-t-transparent animate-spin" style={{ borderColor: 'var(--brand-accent) transparent transparent transparent' }}></div>
                <div className="absolute inset-0 flex items-center justify-center font-serif text-2xl font-bold text-stone-800">
                    Φ
                </div>
            </div>
            <div className="text-center space-y-2">
                <h3 className="text-xl font-medium text-stone-800">Processando Amostra Mental...</h3>
                <p className="text-sm text-stone-500 animate-pulse">Separando falácias lógicas de virtudes essenciais.</p>
            </div>
        </div>
    );
};
