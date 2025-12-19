import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/// <reference lib="dom" />
import { useState, useRef, useEffect } from 'react';
import { chatWithPhilosopher } from '../services/geminiService';
export const ChatInterface = ({ analysisContext }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);
    const handleSend = async () => {
        if (!input.trim() || isLoading)
            return;
        const userMsg = { role: 'user', text: input, timestamp: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);
        try {
            // Format history for Gemini SDK
            const history = messages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));
            const responseText = await chatWithPhilosopher(history, userMsg.text, analysisContext);
            const modelMsg = {
                role: 'model',
                text: responseText || "O silêncio também é uma resposta...",
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, modelMsg]);
        }
        catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'model', text: 'Houve uma falha na conexão com o éter filosófico.', timestamp: Date.now() }]);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { className: "flex flex-col h-[500px] border border-stone-300 rounded-lg bg-white shadow-inner", children: [_jsxs("div", { className: "p-4 border-b border-stone-200 bg-stone-50", children: [_jsx("h3", { className: "serif text-lg font-bold text-stone-800", children: "Sintetizador de Ideias" }), _jsx("p", { className: "text-xs text-stone-500", children: "Dialogue sobre sua prescri\u00E7\u00E3o." })] }), _jsxs("div", { ref: scrollRef, className: "flex-1 overflow-y-auto p-4 space-y-4", children: [messages.length === 0 && (_jsxs("div", { className: "text-center text-stone-400 mt-10 italic", children: ["\"O in\u00EDcio da sabedoria \u00E9 a defini\u00E7\u00E3o dos termos.\" ", _jsx("br", {}), " Pergunte sobre sua an\u00E1lise."] })), messages.map((msg, idx) => (_jsx("div", { className: `flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`, children: _jsx("div", { className: `max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user'
                                ? 'bg-stone-800 text-white rounded-br-none'
                                : 'bg-stone-100 text-stone-800 rounded-bl-none border border-stone-200'}`, children: msg.text }) }, idx))), isLoading && (_jsx("div", { className: "flex justify-start", children: _jsx("div", { className: "bg-stone-100 p-3 rounded-lg rounded-bl-none border border-stone-200 text-stone-400 text-xs animate-pulse", children: "Contemplando..." }) }))] }), _jsxs("div", { className: "p-3 bg-white border-t border-stone-200 flex gap-2", children: [_jsx("input", { type: "text", value: input, onChange: (e) => setInput(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleSend(), placeholder: "Fa\u00E7a uma pergunta socr\u00E1tica...", className: "flex-1 px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 bg-stone-50" }), _jsx("button", { onClick: handleSend, disabled: isLoading, className: "bg-stone-800 text-white px-4 py-2 rounded-md hover:bg-stone-700 disabled:opacity-50 transition-colors", children: "Enviar" })] })] }));
};
