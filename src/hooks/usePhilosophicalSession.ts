import { useState, useEffect } from 'react';
import { PhilosophicalLabel, AppState, HistoryItem } from '../types';
import { analyzeThought } from '../services/geminiService';

export const usePhilosophicalSession = () => {
    const [state, setState] = useState<AppState>(AppState.INPUT);
    const [input, setInput] = useState('');
    const [result, setResult] = useState<PhilosophicalLabel | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('philo_history');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.every(item => item.id && item.result && item.result.calories)) {
                    setHistory(parsed);
                } else {
                    localStorage.removeItem('philo_history');
                }
            } catch (e) {
                localStorage.removeItem('philo_history');
            }
        }
    }, []);

    const addToHistory = (text: string, analysis: PhilosophicalLabel) => {
        const newItem: HistoryItem = {
            id: Date.now().toString(),
            date: Date.now(),
            input: text,
            clientName: analysis.servingSize || 'Paciente',
            concern: text.substring(0, 100),
            result: analysis
        };
        const newHistory = [newItem, ...history].slice(0, 6);
        setHistory(newHistory);
        localStorage.setItem('philo_history', JSON.stringify(newHistory));
    };

    const loadHistoryItem = (item: HistoryItem) => {
        setInput(item.input || item.concern);
        setResult(item.result);
        setState(AppState.RESULTS);
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('philo_history');
    };

    const handleAnalyze = async () => {
        if (!input.trim()) return;

        setState(AppState.ANALYZING);
        setError(null);

        try {
            const analysis = await analyzeThought(input);
            setResult(analysis);
            addToHistory(input, analysis);
            setState(AppState.RESULTS);
        } catch (err) {
            console.error(err);
            setError("Não foi possível processar este pensamento no laboratório. Verifique sua conexão ou tente simplificar a ideia.");
            setState(AppState.INPUT);
        }
    };

    const handleReset = () => {
        setInput('');
        setResult(null);
        setState(AppState.INPUT);
    };

    return {
        state,
        input,
        setInput,
        result,
        error,
        history,
        handleAnalyze,
        handleReset,
        loadHistoryItem,
        clearHistory
    };
};
