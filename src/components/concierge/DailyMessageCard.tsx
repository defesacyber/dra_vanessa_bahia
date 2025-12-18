// ============================================
// Daily Message Card (Concierge Style)
// ============================================

import React from 'react';
import type { DailyMessage, ToneProfile } from '../../types/concierge';

// ============================================
// Tone-based Styling
// ============================================

const toneStyles: Record<ToneProfile, { bg: string; border: string; accent: string }> = {
  NEUTRAL_PRO: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    accent: 'text-gray-700'
  },
  WARM_SUPPORTIVE: {
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    accent: 'text-rose-700'
  },
  DIRECT_MINIMAL: {
    bg: 'bg-slate-50',
    border: 'border-slate-300',
    accent: 'text-slate-800'
  },
  PHILOSOPHICAL: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    accent: 'text-amber-800'
  }
};

const categoryIcons: Record<DailyMessage['category'], string> = {
  motivation: '💪',
  nutrition_tip: '🥗',
  mindset: '🧠',
  reflection: '✨'
};

// ============================================
// Daily Message Card
// ============================================

interface DailyMessageCardProps {
  message: DailyMessage;
  onAction?: () => void;
}

export const DailyMessageCard: React.FC<DailyMessageCardProps> = ({ 
  message,
  onAction 
}) => {
  const style = toneStyles[message.tone];
  const icon = categoryIcons[message.category];
  
  return (
    <div className={`rounded-2xl ${style.bg} border ${style.border} p-5 shadow-sm`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            Mensagem do dia
          </span>
        </div>
        <span className="text-xs text-gray-400">
          {new Date(message.date).toLocaleDateString('pt-BR', { 
            weekday: 'short',
            day: 'numeric',
            month: 'short'
          })}
        </span>
      </div>
      
      {/* Title */}
      <h3 className={`text-lg font-semibold ${style.accent} mb-2`}>
        {message.title}
      </h3>
      
      {/* Body */}
      <p className="text-gray-600 leading-relaxed mb-4">
        {message.body}
      </p>
      
      {/* Action */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-gray-200" />
        <button
          onClick={onAction}
          className={`text-sm font-medium ${style.accent} hover:underline`}
        >
          {message.action} →
        </button>
      </div>
    </div>
  );
};

// ============================================
// Compact Message (for lists)
// ============================================

interface CompactMessageProps {
  message: DailyMessage;
  onClick?: () => void;
}

export const CompactMessage: React.FC<CompactMessageProps> = ({ 
  message,
  onClick 
}) => {
  const icon = categoryIcons[message.category];
  
  return (
    <div 
      className="flex items-center gap-3 rounded-xl bg-white border border-gray-100 p-3 hover:border-gray-200 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <span className="text-lg">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {message.title}
        </p>
        <p className="text-xs text-gray-500">
          {new Date(message.date).toLocaleDateString('pt-BR')}
        </p>
      </div>
      <svg className="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
};

// ============================================
// Message Feed
// ============================================

interface MessageFeedProps {
  messages: DailyMessage[];
  onMessageClick?: (message: DailyMessage) => void;
}

export const MessageFeed: React.FC<MessageFeedProps> = ({ 
  messages,
  onMessageClick 
}) => {
  if (messages.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Nenhuma mensagem ainda.</p>
        <p className="text-sm">Sua nutricionista enviará novidades em breve!</p>
      </div>
    );
  }
  
  // Show today's message as hero, rest as compact
  const [today, ...older] = messages;
  
  return (
    <div className="space-y-4">
      {/* Today's message (hero) */}
      {today && (
        <DailyMessageCard 
          message={today}
          onAction={onMessageClick ? () => onMessageClick(today) : undefined}
        />
      )}
      
      {/* Older messages (compact) */}
      {older.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 uppercase tracking-wide px-1">
            Mensagens anteriores
          </p>
          {older.map((msg) => (
            <CompactMessage
              key={msg.id}
              message={msg}
              onClick={onMessageClick ? () => onMessageClick(msg) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyMessageCard;
