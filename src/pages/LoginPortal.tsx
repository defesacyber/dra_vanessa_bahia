import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Container, Section } from '../components/ui/Layout';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { MainLayout } from '../components/Layout/MainLayout';
import { User, ShieldCheck } from 'lucide-react';

const LoginPortal: React.FC = () => {
    const navigate = useNavigate();
    const { loginAsNutritionist, loginAsPatient } = useAuth();

    // Nutritionist State
    const [nutriEmail, setNutriEmail] = useState('');
    const [nutriPassword, setNutriPassword] = useState('');
    const [isNutriLoading, setIsNutriLoading] = useState(false);
    const [nutriError, setNutriError] = useState<string | null>(null);

    // Patient State
    const [patientCode, setPatientCode] = useState('');
    const [isPatientLoading, setIsPatientLoading] = useState(false);
    const [patientError, setPatientError] = useState<string | null>(null);

    const handleNutriLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setNutriError(null);
        setIsNutriLoading(true);
        const result = await loginAsNutritionist({ email: nutriEmail.trim(), password: nutriPassword });
        setIsNutriLoading(false);
        if (result.success) navigate('/nutri');
        else setNutriError(result.error || 'Credenciais inválidas.');
    };

    const handlePatientLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setPatientError(null);
        setIsPatientLoading(true);
        const result = await loginAsPatient({ accessCode: patientCode.toUpperCase().trim() });
        setIsPatientLoading(false);
        if (result.success) navigate('/app');
        else setPatientError(result.error || 'Código inválido.');
    };

    return (
        <MainLayout>
            <Section className="bg-neutral-100/50 min-h-[80vh] flex items-center">
                <Container>
                    <div className="text-center mb-16 space-y-4 animate-fade-in">
                        <h1 className="text-4xl md:text-5xl font-serif">Área Restrita</h1>
                        <p className="text-brand-900/60 font-sans italic">Selecione seu perfil para acessar o portal Têmpera</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* CARD 1: NUTRITIONIST */}
                        <Card variant="premium" className="flex flex-col h-full animate-slide-up">
                            <div className="mb-10 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-brand-900 text-white flex items-center justify-center">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif">Sou Nutricionista</h3>
                                    <p className="text-xs text-brand-900/50 uppercase tracking-widest font-sans font-bold">Portal do Profissional</p>
                                </div>
                            </div>

                            <form onSubmit={handleNutriLogin} className="space-y-5 flex-grow font-sans">
                                <Input
                                    label="E-mail"
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={nutriEmail}
                                    onChange={(e) => setNutriEmail(e.target.value)}
                                    required
                                />
                                <Input
                                    label="Senha"
                                    type="password"
                                    placeholder="••••••••"
                                    value={nutriPassword}
                                    onChange={(e) => setNutriPassword(e.target.value)}
                                    required
                                />

                                {nutriError && <p className="text-xs text-red-500 font-medium">{nutriError}</p>}

                                <div className="pt-4 flex flex-col gap-4">
                                    <Button type="submit" className="w-full" disabled={isNutriLoading}>
                                        {isNutriLoading ? 'Autenticando...' : 'Entrar no Sistema'}
                                    </Button>
                                    <div className="flex justify-between items-center text-xs text-brand-900/60">
                                        <Link to="/nutri/register" className="hover:text-brand-600 underline underline-offset-4">Criar conta</Link>
                                        <button type="button" className="hover:text-brand-600 underline underline-offset-4">Esqueci minha senha</button>
                                    </div>
                                </div>
                            </form>
                        </Card>

                        {/* CARD 2: PATIENT */}
                        <Card variant="premium" className="flex flex-col h-full border-brand-600/20 animate-slide-up animation-delay-100">
                            <div className="mb-10 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center">
                                    <User size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif">Sou Paciente</h3>
                                    <p className="text-xs text-brand-600 uppercase tracking-widest font-sans font-bold">Minha Jornada</p>
                                </div>
                            </div>

                            <form onSubmit={handlePatientLogin} className="space-y-5 flex-grow font-sans flex flex-col">
                                <Input
                                    label="Código de Acesso"
                                    placeholder="VAN-X12"
                                    className="text-center text-xl tracking-[0.2em] font-bold"
                                    value={patientCode}
                                    onChange={(e) => setPatientCode(e.target.value.toUpperCase())}
                                    required
                                />
                                <p className="text-xs text-brand-900/40 italic text-center">
                                    O código pessoal foi enviado pela sua nutricionista no início do programa.
                                </p>

                                <div className="mt-auto pt-8">
                                    {patientError && <p className="text-xs text-red-500 font-medium text-center mb-4">{patientError}</p>}
                                    <Button type="submit" variant="secondary" className="w-full" disabled={isPatientLoading || patientCode.length < 4}>
                                        {isPatientLoading ? 'Acessando...' : 'Ver meu Plano'}
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </Container>
            </Section>
        </MainLayout>
    );
};

export default LoginPortal;
