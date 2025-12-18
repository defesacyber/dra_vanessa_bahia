/// <reference lib="dom" />
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Tela para Nutricionista cadastrar novo paciente
 * - Gera código de acesso único para o paciente
 * - Vincula paciente ao nutricionista logado
 */
export const PatientRegisterScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdPatient, setCreatedPatient] = useState<{
    name: string;
    accessCode: string;
  } | null>(null);
  
  const { getAuthHeaders } = useAuth();

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/patients', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone || undefined,
          birthDate: formData.birthDate || undefined,
          notes: formData.notes || undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCreatedPatient({
          name: formData.name,
          accessCode: data.accessCode,
        });
      } else {
        setError(data.error || 'Erro ao cadastrar paciente');
      }
    } catch {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyAccessCode = () => {
    if (createdPatient?.accessCode) {
      navigator.clipboard.writeText(createdPatient.accessCode);
    }
  };

  // Tela de sucesso com código de acesso
  if (createdPatient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-stone-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-stone-900">Paciente cadastrado!</h2>
            <p className="text-stone-600 mt-2">
              <strong>{createdPatient.name}</strong> foi cadastrado(a) com sucesso.
            </p>
          </div>

          {/* Código de Acesso */}
          <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
            <p className="text-sm text-stone-500 mb-2">Código de acesso do paciente:</p>
            <div className="flex items-center justify-center gap-2">
              <code className="text-2xl font-mono font-bold text-emerald-600 tracking-wider">
                {createdPatient.accessCode}
              </code>
              <button
                onClick={copyAccessCode}
                className="p-2 text-stone-400 hover:text-emerald-600 transition-colors"
                title="Copiar código"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-stone-400 mt-3">
              Envie este código para seu paciente acessar o aplicativo
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setCreatedPatient(null);
                setFormData({ name: '', email: '', phone: '', birthDate: '', notes: '' });
              }}
              className="flex-1 py-3 border-2 border-emerald-600 text-emerald-600 rounded-xl font-medium hover:bg-emerald-50 transition-all"
            >
              Cadastrar outro
            </button>
            <Link
              to="/nutri/patients"
              className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all text-center"
            >
              Ver pacientes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-stone-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/nutri/patients"
            className="inline-flex items-center text-stone-500 hover:text-stone-700 mb-4"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </Link>
          <h1 className="text-2xl font-bold text-stone-900">Novo Paciente</h1>
          <p className="text-stone-500">Cadastre um novo paciente e gere o código de acesso</p>
        </div>

        {/* Formulário */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-stone-200">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nome */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
                Nome completo *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Maria Santos"
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all"
                required
                autoFocus
              />
            </div>

            {/* Email e Telefone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="paciente@email.com"
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">
                  Telefone / WhatsApp
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all"
                />
              </div>
            </div>

            {/* Data de Nascimento */}
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-stone-700 mb-1">
                Data de nascimento
              </label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all"
              />
            </div>

            {/* Observações */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-stone-700 mb-1">
                Observações iniciais
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Informações relevantes sobre o paciente, histórico, objetivos..."
                rows={3}
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all resize-none"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Link
                to="/nutri/patients"
                className="flex-1 py-3 border border-stone-300 text-stone-600 rounded-xl font-medium hover:bg-stone-50 transition-all text-center"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={isLoading || !formData.name}
                className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Cadastrando...
                  </span>
                ) : (
                  'Cadastrar paciente'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientRegisterScreen;
