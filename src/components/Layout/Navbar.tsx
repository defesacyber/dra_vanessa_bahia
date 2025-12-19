import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Container } from '../ui/Layout';
import { Button } from '../ui/Button';
import { cn } from '../ui/Layout';

const navLinks = [
    { label: 'Método', href: '/metodo' },
    { label: 'Programas', href: '/programas' },
    { label: 'Empresas', href: '/para-empresas' },
    { label: 'Equipe', href: '/equipe' },
    { label: 'Conteúdos', href: '/conteudos' },
];

export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => setIsOpen(false), [location]);

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                scrolled ? 'bg-white/80 backdrop-blur-lg border-b border-neutral-200 py-3' : 'bg-transparent py-5'
            )}
        >
            <Container className="flex items-center justify-between">
                {/* LOGO */}
                <Link to="/inicio" className="flex items-center gap-3">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Leaf_icon.svg"
                        alt="Têmpera Logo"
                        className="w-10 h-10 opacity-90"
                    />
                    <span className="font-serif text-2xl font-bold tracking-tight text-brand-900">Têmpera</span>
                </Link>

                {/* DESKTOP NAV */}
                <nav className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={cn(
                                'text-sm font-medium tracking-wide hover:text-brand-600 transition-colors',
                                location.pathname === link.href ? 'text-brand-600' : 'text-brand-900/80'
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="h-6 w-px bg-neutral-200 mx-2" />
                    <Link to="/" className="text-sm font-medium text-brand-900/80 hover:text-brand-900">Login</Link>
                    <Button size="sm" onClick={() => window.open('https://wa.me/5500000000000', '_blank')}>
                        Agendar Avaliação
                    </Button>
                </nav>

                {/* MOBILE TOGGLE */}
                <button
                    className="lg:hidden p-2 text-brand-900"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </Container>

            {/* MOBILE MENU */}
            <div
                className={cn(
                    'fixed inset-0 top-[72px] bg-neutral-50 z-40 lg:hidden flex flex-col p-6 space-y-8 transition-all duration-300',
                    isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                )}
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        to={link.href}
                        className="text-2xl font-serif text-brand-900 border-b border-neutral-200 pb-4"
                    >
                        {link.label}
                    </Link>
                ))}
                <Link to="/" className="text-xl font-serif text-brand-900">Login Área Restrita</Link>
                <Button size="lg" className="w-full">
                    Agendar Avaliação
                </Button>
            </div>
        </header>
    );
};
