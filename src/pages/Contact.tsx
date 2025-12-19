import React from 'react';
import { Container, Section } from '../components/ui/Layout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { MainLayout } from '../components/Layout/MainLayout';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
    return (
        <MainLayout>
            <Section className="bg-neutral-100/50 pt-24 pb-16">
                <Container className="text-center max-w-3xl space-y-6">
                    <h1 className="text-4xl md:text-6xl font-serif">Inicie seu Diálogo</h1>
                    <p className="text-xl text-brand-900/60 font-sans">
                        Estamos prontos para ouvir sua história e planejar sua jornada de saúde.
                    </p>
                </Container>
            </Section>

            <Section className="bg-white">
                <Container className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* CONTACT FORM */}
                    <div className="lg:col-span-7 space-y-8">
                        <h2 className="text-3xl font-serif">Envie uma mensagem</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Nome Completo" placeholder="Como devemos lhe chamar?" />
                                <Input label="E-mail" type="email" placeholder="seu@email.com" />
                            </div>
                            <Input label="Assunto" placeholder="Ex: Informações sobre o Programa Signature" />
                            <div className="space-y-1.5 w-full">
                                <label className="block text-sm font-medium text-brand-900 ml-1">Mensagem</label>
                                <textarea
                                    rows={6}
                                    className="w-full bg-white/50 border border-neutral-300 rounded-2xl px-4 py-3 text-brand-900 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 transition-all font-sans"
                                    placeholder="Conte-nos brevemente sobre seus objetivos..."
                                />
                            </div>
                            <Button size="lg" className="w-full md:w-auto px-12">Enviar Solicitação</Button>
                        </form>
                    </div>

                    {/* CONTACT INFO */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <Card variant="premium" className="space-y-10 border-brand-600/10">
                            <h3 className="text-2xl font-serif">Canais Diretos</h3>

                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-brand-600/10 flex items-center justify-center text-brand-600 shrink-0">
                                        <Phone size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs uppercase tracking-widest font-bold text-brand-900/40">Telefone</p>
                                        <p className="font-sans text-brand-900">+55 (11) 99999-9999</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-brand-600/10 flex items-center justify-center text-brand-600 shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs uppercase tracking-widest font-bold text-brand-900/40">E-mail</p>
                                        <p className="font-sans text-brand-900">contato@tempera.com.br</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-brand-600/10 flex items-center justify-center text-brand-600 shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs uppercase tracking-widest font-bold text-brand-900/40">Localização</p>
                                        <p className="font-sans text-brand-900 leading-relaxed">
                                            Rua da Prosperidade, 123 — Sala 402<br />
                                            Jardins, São Paulo - SP
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-neutral-200">
                                <Button variant="secondary" className="w-full gap-2 bg-[#25D366] hover:bg-[#128C7E] border-none">
                                    <MessageCircle size={20} />
                                    Agendar via WhatsApp
                                </Button>
                            </div>
                        </Card>
                    </div>
                </Container>
            </Section>
        </MainLayout>
    );
};

export default Contact;
