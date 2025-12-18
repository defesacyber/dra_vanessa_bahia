import React, { useState, useMemo } from 'react';
import { DollarSign, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { BillingService } from '../BillingService';
import { PatientAccess } from '../types';

export const FinancialPanel: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Mock data - In real app this comes from a hook/context
    const [patients] = useState<PatientAccess[]>([
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

    return (
        <div className="bg-white border-b border-stone-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-16 flex items-center justify-between">

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-tempera-olive">
                            <div className="p-1.5 bg-tempera-olive/10 rounded-lg">
                                <DollarSign className="w-5 h-5" />
                            </div>
                            <span className="font-serif font-bold text-lg hidden md:block tracking-wide">Financeiro</span>
                        </div>

                        <div className="h-8 w-px bg-stone-200 hidden md:block"></div>

                        <div className="flex gap-8 text-sm">
                            <div>
                                <p className="text-stone-500 text-xs uppercase tracking-wider font-semibold">Ativos Agora</p>
                                <p className="font-bold text-stone-900 text-lg">{activeCount}</p>
                            </div>
                            <div
                                className="cursor-pointer group relative"
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                <p className="text-stone-500 text-xs uppercase tracking-wider font-semibold flex items-center gap-1 group-hover:text-tempera-olive transition-colors">
                                    Estimativa Mensal
                                    <AlertCircle className="w-3 h-3 text-stone-400 group-hover:text-tempera-gold" />
                                </p>
                                <p className="font-bold text-tempera-deep text-lg flex items-center gap-1">
                                    {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    {isExpanded ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-right hidden sm:block">
                        <p className="text-xs text-stone-400">Próxima cobrança</p>
                        <p className="text-sm font-medium text-stone-700">
                            {cycle.cycleEnd.toLocaleDateString('pt-BR')}
                        </p>
                    </div>

                </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
                <div className="border-t border-stone-100 bg-stone-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex items-start gap-2 mb-4 p-3 bg-tempera-cream/30 text-tempera-deep rounded-lg text-sm border border-tempera-gold/20">
                            <AlertCircle className="w-5 h-5 flex-shrink-0 text-tempera-gold" />
                            <p>Você paga apenas pelos dias em que cada paciente esteve <strong>ATIVO</strong>. O valor abaixo é uma estimativa caso os pacientes permaneçam ativos até o fim do ciclo.</p>
                        </div>

                        <table className="w-full text-sm text-left text-stone-600">
                            <thead className="text-xs text-stone-500 uppercase bg-tempera-ivory/50">
                                <tr>
                                    <th className="px-4 py-2 rounded-l-lg">Paciente</th>
                                    <th className="px-4 py-2 text-center">Dias Ativos (Proj.)</th>
                                    <th className="px-4 py-2 text-right">Taxa Diária</th>
                                    <th className="px-4 py-2 text-right rounded-r-lg">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {details.map(detail => (
                                    <tr key={detail.patientId} className="bg-white border-b border-stone-50 hover:bg-stone-50/50">
                                        <td className="px-4 py-3 font-medium text-stone-900">{detail.patientName}</td>
                                        <td className="px-4 py-3 text-center">{detail.activeDays}</td>
                                        <td className="px-4 py-3 text-right">
                                            {detail.dailyRate.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 4 })}
                                        </td>
                                        <td className="px-4 py-3 text-right font-bold text-stone-800">
                                            {detail.subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="border-t-2 border-stone-200">
                                    <td colSpan={3} className="px-4 py-3 text-right font-bold uppercase text-stone-500">Total do Ciclo</td>
                                    <td className="px-4 py-3 text-right font-bold text-stone-900 text-lg">
                                        {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};
