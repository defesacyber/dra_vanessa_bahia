import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ============================================
// Tone-based Styling
// ============================================
const toneStyles = {
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
const categoryIcons = {
    motivation: '💪',
    nutrition_tip: '🥗',
    mindset: '🧠',
    reflection: '✨'
};
export const DailyMessageCard = ({ message, onAction }) => {
    const style = toneStyles[message.tone];
    const icon = categoryIcons[message.category];
    return (_jsxs("div", { className: `rounded-2xl ${style.bg} border ${style.border} p-5 shadow-sm`, children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-xl", children: icon }), _jsx("span", { className: "text-xs text-gray-500 uppercase tracking-wide", children: "Mensagem do dia" })] }), _jsx("span", { className: "text-xs text-gray-400", children: new Date(message.date).toLocaleDateString('pt-BR', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short'
                        }) })] }), _jsx("h3", { className: `text-lg font-semibold ${style.accent} mb-2`, children: message.title }), _jsx("p", { className: "text-gray-600 leading-relaxed mb-4", children: message.body }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex-1 h-px bg-gray-200" }), _jsxs("button", { onClick: onAction, className: `text-sm font-medium ${style.accent} hover:underline`, children: [message.action, " \u2192"] })] })] }));
};
export const CompactMessage = ({ message, onClick }) => {
    const icon = categoryIcons[message.category];
    return (_jsxs("div", { className: "flex items-center gap-3 rounded-xl bg-white border border-gray-100 p-3 hover:border-gray-200 transition-colors cursor-pointer", onClick: onClick, children: [_jsx("span", { className: "text-lg", children: icon }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-gray-900 truncate", children: message.title }), _jsx("p", { className: "text-xs text-gray-500", children: new Date(message.date).toLocaleDateString('pt-BR') })] }), _jsx("svg", { className: "h-4 w-4 text-gray-400 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })] }));
};
export const MessageFeed = ({ messages, onMessageClick }) => {
    if (messages.length === 0) {
        return (_jsxs("div", { className: "text-center py-8 text-gray-500", children: [_jsx("p", { children: "Nenhuma mensagem ainda." }), _jsx("p", { className: "text-sm", children: "Sua nutricionista enviar\u00E1 novidades em breve!" })] }));
    }
    // Show today's message as hero, rest as compact
    const [today, ...older] = messages;
    return (_jsxs("div", { className: "space-y-4", children: [today && (_jsx(DailyMessageCard, { message: today, onAction: onMessageClick ? () => onMessageClick(today) : undefined })), older.length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-xs text-gray-500 uppercase tracking-wide px-1", children: "Mensagens anteriores" }), older.map((msg) => (_jsx(CompactMessage, { message: msg, onClick: onMessageClick ? () => onMessageClick(msg) : undefined }, msg.id)))] }))] }));
};
export default DailyMessageCard;
