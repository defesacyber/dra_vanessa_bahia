import React from 'react';

export const NotificationToast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <div className="fixed top-4 right-4 bg-stone-900 text-white p-4 rounded-lg shadow-xl z-50 max-w-sm animate-slide-left flex gap-3 items-start border-l-4 border-amber-500">
    <span className="text-xl">🔔</span>
    <div>
      <h4 className="font-bold text-sm text-amber-500">Lembrete do Plano</h4>
      <p className="text-sm text-stone-300 mt-1 leading-tight">{message}</p>
    </div>
    <button onClick={onClose} className="text-stone-500 hover:text-white ml-2">&times;</button>
  </div>
);
