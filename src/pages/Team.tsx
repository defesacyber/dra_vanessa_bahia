import React from 'react';
import { Container, Section } from '../components/ui/Layout';
import { MainLayout } from '../components/Layout/MainLayout';
import { Linkedin, Instagram } from 'lucide-react';

const team = [
    {
        name: 'Dra. Vanessa Bahia',
        role: 'Nutricionista Clínica & Fundadora',
        image: 'https://images.unsplash.com/photo-1594824813573-c80fed144377?auto=format&fit=crop&q=80&w=400',
        bio: 'Especialista em Nutrição Integrativa com mais de 12 anos de experiência. Vanessa fundou a Têmpera com o intuito de trazer a dignidade e a profundidade humana de volta ao cuidado clínico.',
        cref: 'CRN-3 123456'
    },
    {
        name: 'Dr. Marcus Salles',
        role: 'Médico Nutrólogo & Filósofo',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
        bio: 'Unindo a medicina à investigação filosófica, Marcus lidera nossa abordagem sobre o comportamento humano e as virtudes aplicadas à saúde.',
        cref: 'CRM 789012'
    }
];

const Team: React.FC = () => {
    return (
        <MainLayout>
            <Section className="bg-neutral-50 pt-24">
                <Container className="text-center max-w-4xl space-y-8">
                    <h1 className="text-4xl md:text-6xl font-serif">Corpo Clínico & Ethos</h1>
                    <p className="text-xl text-brand-900/60 font-sans leading-relaxed">
                        Nossa equipe é formada por profissionais que compartilham o compromisso com a verdade científica e a excelência moral.
                    </p>
                </Container>
            </Section>

            <Section className="bg-white">
                <Container className="space-y-24">
                    {team.map((member, i) => (
                        <div key={i} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                            <div className={`aspect-[4/5] rounded-[2.5rem] bg-neutral-100 overflow-hidden relative ${i % 2 !== 0 ? 'lg:order-last' : ''}`}>
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <h2 className="text-3xl md:text-5xl font-serif">{member.name}</h2>
                                    <p className="text-brand-600 font-sans tracking-widest uppercase text-xs font-bold">{member.role}</p>
                                </div>
                                <p className="text-brand-900/70 text-lg font-sans leading-relaxed">
                                    {member.bio}
                                </p>
                                <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                                    <span className="text-xs text-brand-900/40 uppercase tracking-widest font-sans">{member.cref}</span>
                                    <div className="flex gap-4">
                                        <a href="#" aria-label="LinkedIn" className="p-2 rounded-full border border-neutral-200 text-brand-900 hover:bg-neutral-50 transition-colors"><Linkedin size={18} /></a>
                                        <a href="#" aria-label="Instagram" className="p-2 rounded-full border border-neutral-200 text-brand-900 hover:bg-neutral-50 transition-colors"><Instagram size={18} /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Container>
            </Section>

            <Section className="bg-brand-900 text-neutral-100 text-center">
                <Container className="max-w-3xl space-y-8">
                    <h2 className="text-3xl md:text-4xl font-serif">Nossos Valores</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
                        <div className="space-y-4">
                            <h4 className="text-xl font-serif text-white">Verdade</h4>
                            <p className="text-sm opacity-60">Aderência absoluta às melhores evidências científicas disponíveis.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xl font-serif text-white">Dignidade</h4>
                            <p className="text-sm opacity-60">Tratar cada biologia como uma história humana singular e sagrada.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xl font-serif text-white">Virtude</h4>
                            <p className="text-sm opacity-60">Nutrição como caminho para a temperança e o florescimento pessoal.</p>
                        </div>
                    </div>
                </Container>
            </Section>
        </MainLayout>
    );
};

export default Team;
