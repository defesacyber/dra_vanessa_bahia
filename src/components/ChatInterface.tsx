import React, { useState, useRef, useEffect } from 'react';
import type { HTMLDivElement } from 'react';
import { ChatMessage, PhilosophicalLabel } from '../types';
import { chatWithPhilosopher } from '../services/geminiService';

interface ChatInterfaceProps {
  analysisContext: PhilosophicalLabel;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ analysisContext }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
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
      
      const modelMsg: ChatMessage = { 
        role: 'model', 
        text: responseText || "O silêncio também é uma resposta...", 
        timestamp: Date.now() 
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Houve uma falha na conexão com o éter filosófico.', timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] border border-stone-300 rounded-lg bg-white shadow-inner">
      <div className="p-4 border-b border-stone-200 bg-stone-50">
        <h3 className="serif text-lg font-bold text-stone-800">Sintetizador de Ideias</h3>
        <p className="text-xs text-stone-500">Dialogue sobre sua prescrição.</p>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-stone-400 mt-10 italic">
            "O início da sabedoria é a definição dos termos." <br/> Pergunte sobre sua análise.
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
              msg.role === 'user' 
                ? 'bg-stone-800 text-white rounded-br-none' 
                : 'bg-stone-100 text-stone-800 rounded-bl-none border border-stone-200'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-stone-100 p-3 rounded-lg rounded-bl-none border border-stone-200 text-stone-400 text-xs animate-pulse">
              Contemplando...
            </div>
          </div>
        )}
      </div>

      <div className="p-3 bg-white border-t border-stone-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Faça uma pergunta socrática..."
          className="flex-1 px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 bg-stone-50"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-stone-800 text-white px-4 py-2 rounded-md hover:bg-stone-700 disabled:opacity-50 transition-colors"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};
