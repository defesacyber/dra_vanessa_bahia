import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const premiumMenu = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Pacientes', href: '/pacientes' },
  { label: 'Planos', href: '/planos' },
  { label: 'Auditoria', href: '/auditoria' },
  { label: 'Configurações', href: '/configuracoes' },
  { label: 'Concierge', href: '/concierge' },
  { label: 'Financeiro', href: '/financeiro' },
  { label: 'Blog', href: '/blog' },
  { label: 'Equipe', href: '/equipe' },
  { label: 'Programas', href: '/programas' },
  { label: 'Empresas', href: '/para-empresas' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contato', href: '/contato' },
];

export const PremiumNavbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-neutral-200 py-3 shadow-xl">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Leaf_icon.svg"
            alt="Têmpera Logo"
            className="w-10 h-10 opacity-90"
          />
          <span className="font-serif text-2xl font-bold tracking-tight text-brand-900">Têmpera</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {premiumMenu.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-base font-medium tracking-wide hover:text-brand-600 transition-colors text-brand-900/80 px-2 py-1 rounded-lg hover:bg-brand-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {/* Mobile menu toggle */}
        <button
          className="lg:hidden p-2 text-brand-900"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Abrir menu</span>
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <rect width="24" height="3" y="4" rx="1.5" fill="currentColor" />
            <rect width="24" height="3" y="10.5" rx="1.5" fill="currentColor" />
            <rect width="24" height="3" y="17" rx="1.5" fill="currentColor" />
          </svg>
        </button>
      </div>
      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 top-[64px] bg-white z-40 lg:hidden flex flex-col p-6 space-y-6 transition-all duration-300 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
      >
        {premiumMenu.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="text-2xl font-serif text-brand-900 border-b border-neutral-200 pb-4"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
};
