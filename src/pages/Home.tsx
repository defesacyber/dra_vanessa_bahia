import React from 'react';
import { Container, Section } from '../components/ui/Layout';
import { Button } from '../components/ui/Button';
import { MainLayout } from '../components/Layout/MainLayout';
import { ArrowRight, Star, Heart, Brain, Leaf } from 'lucide-react';

const Home: React.FC = () => {
    return (
        <MainLayout>
            {/* HERO SECTION */}
            <Section className="relative overflow-hidden pt-12 md:pt-20 lg:pt-32 pb-20 md:pb-32 bg-neutral-100/50">
                {/* Background Accent */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-brand-600/5 blur-[120px] pointer-events-none" />

                <Container className="relative z-10 text-center space-y-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-600/10 text-brand-600 text-xs font-semibold tracking-widest uppercase animate-fade-in font-sans">
                        <Star size={14} fill="currentColor" />
                        Nutrição de Elite & Filosofia
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-brand-900 leading-[1.1] max-w-5xl mx-auto animate-slide-up">
                        Equilíbrio que nutre a <span className="italic">mente</span> e o corpo.
                    </h1>

                    <p className="text-lg md:text-xl text-brand-900/70 max-w-2xl mx-auto font-sans leading-relaxed animate-fade-in animation-delay-200">
                        A Têmpera combina ciência nutricional avançada com a profundidade da filosofia para criar uma jornada de saúde integrativa e verdadeiramente humana.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in animation-delay-300">
                        <Button size="lg" className="w-full sm:w-auto px-10 group bg-brand-900 hover:bg-brand-600">
                            Agendar Avaliação
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                        </Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto px-10 border-brand-900/20 hover:border-brand-900">
                            Conhecer o Método
                        </Button>
                    </div>
                </Container>
            </Section>

            {/* VALUE PROPOSITION GRID */}
            <Section className="bg-white">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-6 p-4">
                            <div className="w-14 h-14 rounded-2xl bg-brand-600/10 flex items-center justify-center text-brand-600">
                                <Brain size={28} />
                            </div>
                            <h3 className="text-2xl font-serif">Mente Clara</h3>
                            <p className="text-brand-900/60 leading-relaxed font-sans">
                                Exploramos como sua relação com a comida reflete sua percepção do mundo, promovendo clareza mental e foco.
                            </p>
                        </div>
                        <div className="space-y-6 p-4 border-y md:border-y-0 md:border-x border-neutral-200">
                            <div className="w-14 h-14 rounded-2xl bg-brand-600/10 flex items-center justify-center text-brand-600">
                                <Heart size={28} />
                            </div>
                            <h3 className="text-2xl font-serif">Saúde Vibrante</h3>
                            <p className="text-brand-900/60 leading-relaxed font-sans">
                                Protocolos baseados em evidências para otimizar sua biologia e restaurar sua vitalidade natural.
                            </p>
                        </div>
                        <div className="space-y-6 p-4">
                            <div className="w-14 h-14 rounded-2xl bg-brand-600/10 flex items-center justify-center text-brand-600">
                                <Leaf size={28} />
                            </div>
                            <h3 className="text-2xl font-serif">Estética Orgânica</h3>
                            <p className="text-brand-900/60 leading-relaxed font-sans">
                                O resultado de um corpo nutrido é a beleza que emana de dentro, de forma sustentável e autêntica.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* METHOD TEASER */}
            <Section className="bg-neutral-50 overflow-hidden relative">
                <Container className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <div className="aspect-[4/5] rounded-[2.5rem] bg-brand-900 overflow-hidden relative group">
                            <img
                                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
                                alt="Meditação e Bem-estar"
                                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent" />
                            <div className="absolute bottom-10 left-10 text-white space-y-2">
                                <p className="text-xs tracking-widest uppercase opacity-70">A Essência</p>
                                <h4 className="text-3xl font-serif">Sophrosýnē</h4>
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-600/10 rounded-full blur-[60px]" />
                    </div>

                    <div className="space-y-8">
                        <Badge variant="outline">A Abordagem</Badge>
                        <h2 className="text-4xl md:text-5xl font-serif leading-tight">Ciência inspirada na temperança clássica.</h2>
                        <p className="text-brand-900/70 text-lg leading-relaxed font-sans">
                            O nome <strong>Têmpera</strong> não é por acaso. Ele remete à virtude da temperança — o equilíbrio perfeito entre os excessos. No nosso método, não impomos dietas restritivas, mas sim uma reeducação do olhar e do paladar.
                        </p>
                        <ul className="space-y-4 font-sans text-brand-900/80">
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-600" />
                                <span>Integração entre nutricionismo e ética.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-600" />
                                <span>Protocolos de alta performance biológica.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-600" />
                                <span>Acompanhamento clínico de proximidade.</span>
                            </li>
                        </ul>
                        <Button variant="outline" className="mt-4">Descobrir nosso Método</Button>
                    </div>
                </Container>
            </Section>

            {/* CTA FINAL */}
            <Section className="bg-brand-900 py-32 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] text-white/[0.03] rotate-45 pointer-events-none">
                    <Leaf size="100%" fill="currentColor" />
                </div>
                <Container className="relative z-10 text-center space-y-8">
                    <h2 className="text-4xl md:text-6xl text-white font-serif max-w-3xl mx-auto">Pronto para sua melhor versão?</h2>
                    <p className="text-neutral-300 text-lg max-w-xl mx-auto font-sans">
                        As vagas são limitadas para garantir a profundidade do atendimento. Inicie sua transformação hoje.
                    </p>
                    <div className="pt-8">
                        <Button size="lg" className="bg-white text-brand-900 hover:bg-neutral-100 px-12">
                            Falar com Especialista
                        </Button>
                    </div>
                </Container>
            </Section>

            {/* HELPER COMPONENTS FOR PAGES */}
            <style>{`
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
      `}</style>
        </MainLayout>
    );
};

// Internal Badge variant
const Badge: React.FC<{ children: React.ReactNode; variant?: 'outline' | 'solid' }> = ({ children, variant = 'solid' }) => (
    <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold ${variant === 'outline' ? 'border border-brand-600 text-brand-600' : 'bg-brand-600 text-white'
        }`}>
        {children}
    </span>
);

export default Home;
