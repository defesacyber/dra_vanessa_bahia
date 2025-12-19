import React from 'react';
import { Container, Section } from '../components/ui/Layout';
import { MainLayout } from '../components/Layout/MainLayout';
import { BookOpen, Target } from 'lucide-react';

const Approach: React.FC = () => {
    return (
        <MainLayout>
            <Section className="bg-neutral-100/50 pt-24 pb-16">
                <Container className="text-center max-w-4xl space-y-6">
                    <h1 className="text-4xl md:text-6xl font-serif">A Abordagem Integrativa</h1>
                    <p className="text-xl text-brand-900/60 font-sans leading-relaxed">
                        Na Têmpera, não olhamos apenas para o que você come, mas para quem você é. Nosso método une a precisão técnica da nutrição moderna à sabedoria atemporal da filosofia.
                    </p>
                </Container>
            </Section>

            <Section className="bg-white">
                <Container className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-4xl font-serif">O Pilar da Temperança</h2>
                        <p className="text-brand-900/70 font-sans text-lg">
                            Sophrosýnē, o termo grego para temperança, é o coração do nosso trabalho. É a virtude que permite o prazer sem excesso e a disciplina sem sofrimento.
                        </p>
                        <div className="space-y-10 pt-4">
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-600/10 flex items-center justify-center text-brand-600">
                                    <Target size={24} />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xl font-serif text-brand-900">Estratégia Bioquímica</h4>
                                    <p className="text-brand-900/60 font-sans text-sm">Exames detalhados e análise metabólica para um plano 100% individualizado.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-600/10 flex items-center justify-center text-brand-600">
                                    <BookOpen size={24} />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xl font-serif text-brand-900">Educação Filosófica</h4>
                                    <p className="text-brand-900/60 font-sans text-sm">Ferramentas de reflexão para mudar permanentemente sua relação com a saciedade e o desejo.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <img src="https://images.unsplash.com/photo-1547517023-7ca0c162f816?auto=format&fit=crop&q=80&w=400" className="rounded-3xl aspect-square object-cover" alt="Nutrição Natural" />
                            <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400" className="rounded-3xl aspect-[3/4] object-cover" alt="Bem-estar" />
                        </div>
                        <div className="space-y-4 pt-12">
                            <img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc206e?auto=format&fit=crop&q=80&w=400" className="rounded-3xl aspect-[3/4] object-cover" alt="Estilo de vida" />
                            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400" className="rounded-3xl aspect-square object-cover" alt="Conexão" />
                        </div>
                    </div>
                </Container>
            </Section>

            <Section className="bg-neutral-100">
                <Container className="text-center space-y-12">
                    <h2 className="text-3xl md:text-5xl font-serif max-w-3xl mx-auto">Um processo de refinamento contínuo.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: '01', title: 'Mapeamento', desc: 'Análise profunda da história e biologia.' },
                            { step: '02', title: 'Fundamentação', desc: 'Protocolo nutricional e ferramentas de base.' },
                            { step: '03', title: 'Refinamento', desc: 'Ajustes finos baseados em respostas reais.' },
                            { step: '04', title: 'Excelência', desc: 'Manutenção da autonomia e virtude alimentar.' },
                        ].map((item) => (
                            <div key={item.step} className="space-y-4 p-8 bg-white rounded-[2rem] shadow-soft">
                                <span className="text-6xl font-serif text-brand-600/10 block leading-none">{item.step}</span>
                                <h4 className="text-xl font-serif">{item.title}</h4>
                                <p className="text-sm text-brand-900/60 font-sans">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>
        </MainLayout>
    );
};

export default Approach;
