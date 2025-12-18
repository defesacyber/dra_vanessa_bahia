import React, { useState } from 'react';
import type { HTMLInputElement } from 'react';
import { useRegistrationStore } from '../store/registrationStore';
import { CreditCard, Lock, ShieldCheck } from 'lucide-react';


export const PaymentStep: React.FC = () => {
    const { payment, updatePayment, nextStep, prevStep } = useRegistrationStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock submission
    const handleFinish = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        nextStep(); // Go to summary
    };

    const isValid =
        payment.cardNumber &&
        payment.cardName &&
        payment.expiry &&
        payment.cvv &&
        payment.authorized;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        updatePayment({ [name]: type === 'checkbox' ? checked : value });
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">

            {/* Price Banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h3 className="text-xl font-bold mb-1">Acesso Premium</h3>
                        <p className="text-emerald-50 text-sm">Cobrança justa e transparente.</p>
                    </div>
                    <div className="text-center md:text-right">
                        <span className="text-3xl font-bold">R$ 10,00</span>
                        <span className="text-emerald-100 text-sm block">/mês por paciente ativo</span>
                    </div>
                </div>
            </div>

            <section className="space-y-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-stone-800 border-b border-stone-100 pb-2">
                    <CreditCard className="w-5 h-5 text-emerald-500" />
                    Dados de Pagamento
                </h3>

                <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1 md:col-span-2 space-y-1">
                            <label className="text-xs font-bold text-stone-500 uppercase">Número do Cartão</label>
                            <div className="relative">
                                <input
                                    name="cardNumber"
                                    value={payment.cardNumber}
                                    onChange={handleInputChange}
                                    placeholder="0000 0000 0000 0000"
                                    className="w-full pl-10 p-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-mono"
                                />
                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 space-y-1">
                            <label className="text-xs font-bold text-stone-500 uppercase">Nome no Cartão</label>
                            <input
                                name="cardName"
                                value={payment.cardName}
                                onChange={handleInputChange}
                                placeholder="COMO ESTA NO CARTAO"
                                className="w-full p-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all uppercase"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-stone-500 uppercase">Validade</label>
                            <input
                                name="expiry"
                                value={payment.expiry}
                                onChange={handleInputChange}
                                placeholder="MM/AA"
                                className="w-full p-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-center"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-stone-500 uppercase">CVV</label>
                            <div className="relative">
                                <input
                                    name="cvv"
                                    value={payment.cvv}
                                    onChange={handleInputChange}
                                    placeholder="123"
                                    type="password"
                                    maxLength={4}
                                    className="w-full pl-10 p-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-center"
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-xs text-stone-500">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <p>Seus dados são criptografados. Ambiente 100% seguro.</p>
                    </div>
                </div>

                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex gap-3 items-start">
                    <input
                        type="checkbox"
                        id="auth"
                        name="authorized"
                        checked={payment.authorized}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded cursor-pointer"
                    />
                    <label htmlFor="auth" className="text-sm text-emerald-900 cursor-pointer">
                        <strong>Autorizo a cobrança mensal</strong> baseada no número de pacientes ativos.
                        Entendo que posso bloquear pacientes a qualquer momento para interromper a cobrança daquele acesso.
                    </label>
                </div>

            </section>

            <div className="flex justify-between pt-6">
                <button
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="px-6 py-3 text-stone-600 font-medium hover:bg-stone-100 rounded-xl transition-all disabled:opacity-50"
                >
                    Voltar
                </button>
                <button
                    onClick={handleFinish}
                    disabled={!isValid || isSubmitting}
                    className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            Processando...
                        </>
                    ) : (
                        'Finalizar Cadastro'
                    )}
                </button>
            </div>
        </div>
    );
};
