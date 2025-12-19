import React from 'react';
import { Container, Section } from '../components/ui/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { MainLayout } from '../components/Layout/MainLayout';
import { Check, Star, Shield } from 'lucide-react';

const Programs: React.FC = () => {
    return (
        <MainLayout>
            <Section className="bg-neutral-100/50 pt-24 pb-16">
                <Container className="text-center max-w-3xl space-y-6">
                    <h1 className="text-4xl md:text-6xl font-serif">Programas de Transformação</h1>
                    <p className="text-xl text-brand-900/60 font-sans leading-relaxed italic">
                        Investimentos exclusivos em sua bio-individualidade e excelência de vida.
                    </p>
                </Container>
            </Section>

            <Section className="bg-white">
                <Container className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {/* THE ESSENTIAL */}
                    <Card className="flex flex-col h-full border-neutral-200">
                        <div className="space-y-6 flex-grow">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-serif">Essenciality</h3>
                                <p className="text-xs text-brand-900/50 uppercase tracking-widest font-sans font-bold">Foco em Resultados Clínicos</p>
                            </div>
                            <div className="text-4xl font-serif">R$ 1.800 <span className="text-sm opacity-50">/ trimestre</span></div>
                            <ul className="space-y-4 font-sans text-sm py-8 border-y border-neutral-100">
                                {['3 Consultas Presenciais', 'Análise de Bioimpedância', 'Plano Nutricional Digital', 'Suporte por e-mail'].map(i => (
                                    <li key={i} className="flex gap-3"><Check size={16} className="text-brand-600" /> {i}</li>
                                ))}
                            </ul>
                        </div>
                        <Button variant="outline" className="w-full mt-10">Solicitar Vaga</Button>
                    </Card>

                    {/* THE SIGNATURE */}
                    <Card variant="premium" className="flex flex-col h-full ring-2 ring-brand-600 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-brand-600 text-white text-[10px] py-1 px-10 rotate-45 translate-x-10 translate-y-4 uppercase tracking-[0.2em] font-bold">
                            Best Seller
                        </div>
                        <div className="space-y-6 flex-grow">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-serif">Signature</h3>
                                <p className="text-xs text-brand-600 uppercase tracking-widest font-sans font-bold">Nutrição & Filosofia</p>
                            </div>
                            <div className="text-4xl font-serif">R$ 4.500 <span className="text-sm opacity-50">/ semestre</span></div>
                            <ul className="space-y-4 font-sans text-sm py-8 border-y border-neutral-100">
                                {[
                                    '6 Consultas Exclusivas',
                                    'Acesso Premium ao App',
                                    '3 Workshops de Filosofia Aplicada',
                                    'Kit Boas-vindas Têmpera',
                                    'Suporte Direto WhatsApp'
                                ].map(i => (
                                    <li key={i} className="flex gap-3 font-semibold"><Star size={16} className="text-brand-600 fill-brand-600" /> {i}</li>
                                ))}
                            </ul>
                        </div>
                        <Button className="w-full mt-10">Iniciar Jornada</Button>
                    </Card>

                    {/* THE PRIVATE */}
                    <Card className="flex flex-col h-full border-neutral-200 bg-neutral-100">
                        <div className="space-y-6 flex-grow">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-serif">Private Concierge</h3>
                                <p className="text-xs text-brand-900/50 uppercase tracking-widest font-sans font-bold">Experiência High Ticket</p>
                            </div>
                            <div className="text-4xl font-serif">Sob Consulta</div>
                            <ul className="space-y-4 font-sans text-sm py-8 border-y border-neutral-100">
                                {[
                                    'Acompanhamento Personal Concierge',
                                    'Chef em Domicílio (Opcional)',
                                    'Exames de Seq. Genético',
                                    'Prioridade Total de Agenda'
                                ].map(i => (
                                    <li key={i} className="flex gap-3"><Shield size={16} className="text-brand-900" /> {i}</li>
                                ))}
                            </ul>
                        </div>
                        <Button variant="outline" className="w-full mt-10 border-brand-900/20 text-brand-900">Conversar com Diretor</Button>
                    </Card>
                </Container>
            </Section>

            <Section className="bg-neutral-50">
                <Container className="max-w-4xl text-center space-y-12">
                    <h2 className="text-3xl md:text-4xl font-serif">Comparativo de Benefícios</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-sans text-sm">
                            <thead className="border-b-2 border-brand-900">
                                <tr className="[&>th]:py-6 [&>th]:px-4">
                                    <th>Recurso</th>
                                    <th>Essencial</th>
                                    <th>Signature</th>
                                    <th>Private</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200">
                                {[
                                    ['Análise Metabólica', 'Sim', 'Sim', 'Sim'],
                                    ['Workshops Exclusivos', '-', '3/Semestre', 'Ilimitado'],
                                    ['Tempo de Atendimento', '45 min', '90 min', 'Custom'],
                                    ['Suporte 1:1', 'E-mail', 'WhatsApp', 'Prioritário'],
                                ].map((row, i) => (
                                    <tr key={i} className="[&>td]:py-6 [&>td]:px-4 hover:bg-white transition-colors">
                                        <td className="font-semibold">{row[0]}</td>
                                        {row.slice(1).map((cell, j) => <td key={j} className="opacity-70">{cell}</td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Container>
            </Section>
        </MainLayout>
    );
};

export default Programs;
