import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { DollarSign, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { BillingService } from '../BillingService';
export const FinancialPanel = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    // Mock data - In real app this comes from a hook/context
    const [patients] = useState([
        {
            id: '1',
            patientId: 'p1',
            nutritionistId: 'n1',
            patientName: 'João Silva',
            status: 'ACTIVE',
            activatedAt: new Date(new Date().getFullYear(), new Date().getMonth(), 5) // Started 5th of this month
        },
        {
            id: '12',
            patientId: 'p2',
            nutritionistId: 'n1',
            patientName: 'Maria Antônia',
            status: 'ACTIVE',
            activatedAt: new Date(new Date().getFullYear(), new Date().getMonth(), 10) // Started 10th of this month
        }
    ]);
    const cycle = BillingService.getCurrentCycle();
    const { total, details } = useMemo(() => BillingService.calculateEstimate(patients), [patients]);
    const activeCount = patients.filter(p => p.status === 'ACTIVE').length;
    return (_jsxs("div", { className: "bg-white border-b border-stone-200 shadow-sm sticky top-0 z-50", children: [_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "h-16 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-6", children: [_jsxs("div", { className: "flex items-center gap-2 text-tempera-olive", children: [_jsx("div", { className: "p-1.5 bg-tempera-olive/10 rounded-lg", children: _jsx(DollarSign, { className: "w-5 h-5" }) }), _jsx("span", { className: "font-serif font-bold text-lg hidden md:block tracking-wide", children: "Financeiro" })] }), _jsx("div", { className: "h-8 w-px bg-stone-200 hidden md:block" }), _jsxs("div", { className: "flex gap-8 text-sm", children: [_jsxs("div", { children: [_jsx("p", { className: "text-stone-500 text-xs uppercase tracking-wider font-semibold", children: "Ativos Agora" }), _jsx("p", { className: "font-bold text-stone-900 text-lg", children: activeCount })] }), _jsxs("div", { className: "cursor-pointer group relative", onClick: () => setIsExpanded(!isExpanded), children: [_jsxs("p", { className: "text-stone-500 text-xs uppercase tracking-wider font-semibold flex items-center gap-1 group-hover:text-tempera-olive transition-colors", children: ["Estimativa Mensal", _jsx(AlertCircle, { className: "w-3 h-3 text-stone-400 group-hover:text-tempera-gold" })] }), _jsxs("p", { className: "font-bold text-tempera-deep text-lg flex items-center gap-1", children: [total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), isExpanded ? _jsx(ChevronUp, { className: "w-4 h-4 text-stone-400" }) : _jsx(ChevronDown, { className: "w-4 h-4 text-stone-400" })] })] })] })] }), _jsxs("div", { className: "text-right hidden sm:block", children: [_jsx("p", { className: "text-xs text-stone-400", children: "Pr\u00F3xima cobran\u00E7a" }), _jsx("p", { className: "text-sm font-medium text-stone-700", children: cycle.cycleEnd.toLocaleDateString('pt-BR') })] })] }) }), isExpanded && (_jsx("div", { className: "border-t border-stone-100 bg-stone-50 animate-in slide-in-from-top-2 duration-200", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "flex items-start gap-2 mb-4 p-3 bg-tempera-cream/30 text-tempera-deep rounded-lg text-sm border border-tempera-gold/20", children: [_jsx(AlertCircle, { className: "w-5 h-5 flex-shrink-0 text-tempera-gold" }), _jsxs("p", { children: ["Voc\u00EA paga apenas pelos dias em que cada paciente esteve ", _jsx("strong", { children: "ATIVO" }), ". O valor abaixo \u00E9 uma estimativa caso os pacientes permane\u00E7am ativos at\u00E9 o fim do ciclo."] })] }), _jsxs("table", { className: "w-full text-sm text-left text-stone-600", children: [_jsx("thead", { className: "text-xs text-stone-500 uppercase bg-tempera-ivory/50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-2 rounded-l-lg", children: "Paciente" }), _jsx("th", { className: "px-4 py-2 text-center", children: "Dias Ativos (Proj.)" }), _jsx("th", { className: "px-4 py-2 text-right", children: "Taxa Di\u00E1ria" }), _jsx("th", { className: "px-4 py-2 text-right rounded-r-lg", children: "Subtotal" })] }) }), _jsx("tbody", { className: "divide-y divide-stone-100", children: details.map(detail => (_jsxs("tr", { className: "bg-white border-b border-stone-50 hover:bg-stone-50/50", children: [_jsx("td", { className: "px-4 py-3 font-medium text-stone-900", children: detail.patientName }), _jsx("td", { className: "px-4 py-3 text-center", children: detail.activeDays }), _jsx("td", { className: "px-4 py-3 text-right", children: detail.dailyRate.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 4 }) }), _jsx("td", { className: "px-4 py-3 text-right font-bold text-stone-800", children: detail.subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) })] }, detail.patientId))) }), _jsx("tfoot", { children: _jsxs("tr", { className: "border-t-2 border-stone-200", children: [_jsx("td", { colSpan: 3, className: "px-4 py-3 text-right font-bold uppercase text-stone-500", children: "Total do Ciclo" }), _jsx("td", { className: "px-4 py-3 text-right font-bold text-stone-900 text-lg", children: total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) })] }) })] })] }) }))] }));
};
