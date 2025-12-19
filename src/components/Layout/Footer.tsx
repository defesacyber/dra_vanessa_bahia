import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Layout';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-900 text-neutral-100 py-20">
            <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* BRAND */}
                <div className="space-y-6">
                    <Link to="/inicio" className="flex items-center gap-3">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Leaf_icon.svg"
                            alt="Têmpera Logo"
                            className="w-10 h-10 brightness-0 invert opacity-90"
                        />
                        <span className="font-serif text-2xl font-bold tracking-tight text-white">Têmpera</span>
                    </Link>
                    <p className="text-neutral-300 text-sm font-sans leading-relaxed max-w-xs">
                        Unindo a sabedoria da nutrição clínica à profundidade da filosofia para um cuidado integrativo e humano.
                    </p>
                </div>

                {/* NAVIGATION */}
                <div className="space-y-6">
                    <h4 className="text-white font-serif text-lg">Explorar</h4>
                    <nav className="flex flex-col space-y-3">
                        <Link to="/metodo" className="text-neutral-300 hover:text-white transition-colors text-sm">A Abordagem</Link>
                        <Link to="/programas" className="text-neutral-300 hover:text-white transition-colors text-sm">Programas</Link>
                        <Link to="/equipe" className="text-neutral-300 hover:text-white transition-colors text-sm">Nossa Equipe</Link>
                        <Link to="/para-empresas" className="text-neutral-300 hover:text-white transition-colors text-sm">Soluções Corporate</Link>
                    </nav>
                </div>

                {/* CONTACT */}
                <div className="space-y-6">
                    <h4 className="text-white font-serif text-lg">Contato</h4>
                    <div className="flex flex-col space-y-3 text-sm text-neutral-300">
                        <p>Rua da Prosperidade, 123<br />Sala 402 — São Paulo, SP</p>
                        <a href="mailto:contato@tempera.com.br" className="hover:text-white transition-colors">contato@tempera.com.br</a>
                        <a href="tel:+5511999999999" className="hover:text-white transition-colors">+55 (11) 99999-9999</a>
                    </div>
                </div>

                {/* JURIDICAL */}
                <div className="space-y-6">
                    <h4 className="text-white font-serif text-lg">Legal</h4>
                    <nav className="flex flex-col space-y-3">
                        <Link to="/privacidade" className="text-neutral-300 hover:text-white transition-colors text-sm">Privacidade</Link>
                        <Link to="/termos" className="text-neutral-300 hover:text-white transition-colors text-sm">Termos de Uso</Link>
                        <Link to="/faq" className="text-neutral-300 hover:text-white transition-colors text-sm">FAQ</Link>
                    </nav>
                </div>
            </Container>

            <Container className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-400 font-sans tracking-widest uppercase">
                <p>© 2025 TÊMPERA NUTRIÇÃO INTEGRATIVA. TODOS OS DIREITOS RESERVADOS.</p>
                <p>ἀρετή · virtus · excelência</p>
            </Container>
        </footer>
    );
};
