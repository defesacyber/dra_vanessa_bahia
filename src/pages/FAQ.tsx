import React, { useState } from 'react';
import { Container, Section } from '../components/ui/Layout';
import { MainLayout } from '../components/Layout/MainLayout';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../components/ui/Layout';

const faqs = [
    {
        q: 'Como funciona o atendimento integrativo?',
        a: 'Nossa abordagem une a análise bioquímica rigorosa (exames de sangue, genética, bioimpedância) ao acompanhamento comportamental baseado na filosofia. Em vez de focarmos apenas em calorias, cuidamos da sua relação com o corpo e a mente.'
    },
    {
        q: 'É necessário ter conhecimento em filosofia para ser paciente?',
        a: 'Absolutamente não. A parte filosófica do nosso método é aplicada de forma prática e traduzida para o dia a dia. Você aprenderá conceitos de temperança e autodomínio enquanto ajustamos sua nutrição biológica.'
    },
    {
        q: 'Quais exames são realizados nos planos premium?',
        a: 'Dependendo do programa, incluímos desde hemograma completo e marcadores hormonais até testes genéticos de nutrigenômica para entender como seu corpo processa diferentes nutrientes.'
    },
    {
        q: 'Vocês atendem fora de São Paulo?',
        a: 'Sim, oferecemos o formato Digital Concierge para pacientes de todo o Brasil e exterior, mantendo a mesma excelência e proximidade através de telemedicina e suporte 1:1.'
    }
];

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <MainLayout>
            <Section className="bg-neutral-50 pt-24 pb-16">
                <Container className="text-center max-w-3xl space-y-6">
                    <h1 className="text-4xl md:text-6xl font-serif">Dúvidas Frequentes</h1>
                    <p className="text-xl text-brand-900/60 font-sans">
                        Esclarecemos os principais pontos sobre nossa metodologia e atendimento.
                    </p>
                </Container>
            </Section>

            <Section className="bg-white">
                <Container className="max-w-3xl">
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className={cn(
                                    'border border-neutral-200 rounded-[1.5rem] overflow-hidden transition-all',
                                    openIndex === i ? 'bg-neutral-50 border-brand-600/20' : 'bg-white'
                                )}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full flex items-center justify-between p-6 text-left group"
                                >
                                    <span className="text-lg font-serif text-brand-900 group-hover:text-brand-600 transition-colors">
                                        {faq.q}
                                    </span>
                                    {openIndex === i ? <ChevronUp size={20} className="text-brand-600" /> : <ChevronDown size={20} className="text-neutral-300" />}
                                </button>
                                <div
                                    className={cn(
                                        'px-6 transition-all duration-300 ease-in-out overflow-hidden',
                                        openIndex === i ? 'pb-6 max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    )}
                                >
                                    <p className="text-brand-900/70 font-sans leading-relaxed text-base pt-2 border-t border-neutral-200/50">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>
        </MainLayout>
    );
};

export default FAQ;
