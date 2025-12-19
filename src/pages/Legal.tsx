import React from 'react';
import { Container, Section } from '../components/ui/Layout';
import { MainLayout } from '../components/Layout/MainLayout';

const Legal: React.FC<{ title: string }> = ({ title }) => {
    return (
        <MainLayout>
            <Section className="bg-neutral-100/50 pt-24 pb-16 border-b border-neutral-200">
                <Container className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-serif mb-4">{title}</h1>
                    <p className="text-brand-900/40 text-sm font-sans uppercase tracking-[0.2em]">Última atualização: 19 de Dezembro de 2025</p>
                </Container>
            </Section>

            <Section className="bg-white">
                <Container className="max-w-3xl">
                    <div className="font-sans text-brand-900/70 leading-relaxed space-y-8">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-serif text-brand-900">1. Compromisso com a Transparência</h2>
                            <p>
                                Este documento estabelece as diretrizes de uso e privacidade da Têmpera Nutrição Integrativa. Nosso compromisso é com a proteção total dos seus dados biológicos e pessoais, seguindo os mais altos padrões de ética profissional e legal (LGPD).
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-serif text-brand-900">2. Coleta de Dados Bio-clínicos</h2>
                            <p>
                                Ao iniciar um protocolo na Têmpera, coletamos informações sensíveis sobre sua saúde, histórico familiar e marcadores bioquímicos. Esses dados são utilizados exclusivamente para o planejamento da sua jornada nutricional e nunca serão compartilhados com terceiros sem consentimento explícito.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-serif text-brand-900">3. Direitos do Paciente</h2>
                            <p>
                                Você possui o direito inalienável de acessar, retificar ou solicitar a exclusão de seus dados do nosso sistema a qualquer momento, salvo obrigações legais de manutenção de prontuário clínico.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-serif text-brand-900">4. Segurança da Informação</h2>
                            <p>
                                Utilizamos criptografia de ponta a ponta e servidores seguros para armazenar suas informações. O acesso aos dados é restrito aos profissionais de saúde envolvidos diretamente no seu atendimento.
                            </p>
                        </section>
                    </div>
                </Container>
            </Section>
        </MainLayout>
    );
};

const PrivacyPage = () => <Legal title="Política de Privacidade" />;
const TermsPage = () => <Legal title="Termos de Uso" />;

export default { PrivacyPage, TermsPage };
export { PrivacyPage, TermsPage };
