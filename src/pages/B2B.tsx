import React from 'react';
import { Container, Section } from '../components/ui/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { MainLayout } from '../components/Layout/MainLayout';
import { Briefcase, TrendingUp, Users, Award } from 'lucide-react';

const B2B: React.FC = () => {
    return (
        <MainLayout>
            <Section className="bg-brand-900 text-white pt-24 pb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/10 blur-[100px] rounded-full" />
                <Container className="relative z-10 text-center max-w-4xl space-y-8">
                    <Badge variant="outline" className="border-white/20 text-neutral-100">Soluções Corporate</Badge>
                    <h1 className="text-4xl md:text-7xl font-serif leading-[1.1]">Alta performance através da nutrição consciente.</h1>
                    <p className="text-xl text-neutral-300 font-sans leading-relaxed max-w-2xl mx-auto">
                        Transformamos a cultura de saúde da sua empresa com protocolos baseados em bio-hacking, nutrição integrativa e mindset equilibrado.
                    </p>
                    <div className="flex justify-center gap-4 pt-4">
                        <Button size="lg" className="bg-white text-brand-900 hover:bg-neutral-100">Consultar Benefícios</Button>
                    </div>
                </Container>
            </Section>

            <Section className="bg-white">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <TrendingUp />, title: 'Produtividade', desc: 'Melhora no foco e clareza mental da equipe através de otimização metabólica.' },
                            { icon: <Users />, title: 'Retenção', desc: 'Aumento na satisfação e engajamento com benefícios de saúde high ticket.' },
                            { icon: <Award />, title: 'Prevenção', desc: 'Redução de absenteísmo e custos de saúde com medicina preventiva.' },
                            { icon: <Briefcase />, title: 'Employer Branding', desc: 'Destaque-se no mercado como uma empresa que valoriza o bem-estar real.' },
                        ].map((item, i) => (
                            <div key={i} className="space-y-6 text-center">
                                <div className="w-16 h-16 mx-auto rounded-full bg-brand-600/10 flex items-center justify-center text-brand-600">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-serif">{item.title}</h3>
                                <p className="text-sm text-brand-900/60 font-sans leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            <Section className="bg-neutral-100">
                <Container className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-5xl font-serif">Workshop: A Filosofia da Performance</h2>
                        <p className="text-brand-900/70 text-lg font-sans">
                            Nossa solução mais procurada por empresas high-tech e escritórios boutique. Unimos dicas práticas de alimentação para o dia a dia à conceitos de temperança para gestão de estresse.
                        </p>
                        <Card className="bg-white border-none shadow-soft">
                            <ul className="space-y-4 font-sans text-brand-900/80">
                                <li className="flex items-start gap-4">
                                    <span className="w-6 h-6 rounded-full bg-brand-600/20 text-brand-600 flex items-center justify-center text-xs font-bold">✓</span>
                                    <span>Paleo-Biohacking para escritórios.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="w-6 h-6 rounded-full bg-brand-600/20 text-brand-600 flex items-center justify-center text-xs font-bold">✓</span>
                                    <span>Estoicismo aplicado à gestão de energia.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <span className="w-6 h-6 rounded-full bg-brand-600/20 text-brand-600 flex items-center justify-center text-xs font-bold">✓</span>
                                    <span>Plano de 'Catering Saudável' para eventos.</span>
                                </li>
                            </ul>
                        </Card>
                        <Button size="lg">Solicitar Proposta B2B</Button>
                    </div>
                    <div className="aspect-[4/3] rounded-[2.5rem] bg-neutral-300 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                            className="w-full h-full object-cover grayscale mix-blend-multiply opacity-80"
                            alt="Corporate Wellness"
                        />
                    </div>
                </Container>
            </Section>
        </MainLayout>
    );
};

const Badge: React.FC<{ children: React.ReactNode; variant?: 'outline' | 'solid'; className?: string }> = ({ children, variant = 'solid', className }) => (
    <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold inline-block ${variant === 'outline' ? 'border border-brand-600 text-brand-600' : 'bg-brand-600 text-white'
        } ${className}`}>
        {children}
    </span>
);

export default B2B;
