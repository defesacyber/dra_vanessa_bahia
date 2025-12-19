import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
/**
 * Lista de Pacientes do Nutricionista
 * - Visualização de todos os pacientes cadastrados
 * - Ações: editar, visualizar, pausar/ativar
 */
export const PatientListScreen = () => {
    const [patients, setPatients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedCode, setCopiedCode] = useState(null);
    const { getAuthHeaders } = useAuth();
    const fetchPatients = React.useCallback(async () => {
        try {
            const response = await fetch('/api/v1/patients', {
                headers: getAuthHeaders(),
            });
            const data = await response.json();
            if (data.success) {
                setPatients(data.patients || []);
            }
            else {
                setError(data.error || 'Erro ao carregar pacientes');
            }
        }
        catch {
            setError('Erro de conexão');
        }
        finally {
            setIsLoading(false);
        }
    }, [getAuthHeaders]);
    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);
    const copyAccessCode = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };
    const filteredPatients = patients.filter(patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email?.toLowerCase().includes(searchTerm.toLowerCase()));
    const getStatusBadge = (status) => {
        const styles = {
            active: 'bg-tempera-olive/10 text-tempera-olive border border-tempera-olive/20',
            inactive: 'bg-stone-100 text-stone-600 border border-stone-200',
            paused: 'bg-tempera-gold/10 text-tempera-gold border border-tempera-gold/20',
        };
        const labels = {
            active: 'Ativo',
            inactive: 'Inativo',
            paused: 'Pausado',
        };
        return (_jsx("span", { className: `px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`, children: labels[status] }));
    };
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-100 to-stone-100 flex items-center justify-center", children: _jsxs("div", { className: "flex items-center gap-3 text-stone-500", children: [_jsxs("svg", { className: "animate-spin h-6 w-6", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", fill: "none" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })] }), _jsx("span", { children: "Carregando pacientes..." })] }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-tempera-ivory p-4 font-body", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6", children: [_jsxs("div", { children: [_jsxs(Link, { to: "/nutri", className: "inline-flex items-center text-stone-500 hover:text-stone-700 mb-2", children: [_jsx("svg", { className: "w-5 h-5 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }), "Dashboard"] }), _jsx("h1", { className: "text-2xl font-bold text-stone-900", children: "Meus Pacientes" }), _jsxs("p", { className: "text-stone-500", children: [patients.length, " paciente(s) cadastrado(s)"] })] }), _jsxs(Link, { to: "/nutri/patients/new", className: "inline-flex items-center justify-center gap-2 px-4 py-3 bg-tempera-olive text-white rounded-sm font-medium font-serif tracking-wide hover:bg-tempera-deep transition-all shadow-md active:transform active:scale-95", children: [_jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) }), "Novo Paciente"] })] }), _jsx("div", { className: "mb-6", children: _jsxs("div", { className: "relative", children: [_jsx("svg", { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }), _jsx("input", { type: "text", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), placeholder: "Buscar por nome ou email...", className: "w-full pl-12 pr-4 py-3 border border-stone-200 rounded-sm focus:ring-1 focus:ring-tempera-olive focus:border-tempera-olive outline-none transition-all bg-white font-serif placeholder:text-stone-400 placeholder:font-sans" })] }) }), error && (_jsx("div", { className: "p-4 bg-red-50 text-red-600 rounded-xl mb-6 border border-red-200", children: error })), filteredPatients.length === 0 ? (_jsxs("div", { className: "bg-white rounded-2xl shadow-lg border border-stone-200 p-12 text-center", children: [_jsx("div", { className: "w-20 h-20 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center", children: _jsx("svg", { className: "w-10 h-10 text-stone-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }) }) }), _jsx("h3", { className: "text-lg font-medium text-stone-700 mb-2", children: searchTerm ? 'Nenhum paciente encontrado' : 'Nenhum paciente cadastrado' }), _jsx("p", { className: "text-stone-500 mb-6", children: searchTerm
                                ? 'Tente buscar com outros termos'
                                : 'Comece cadastrando seu primeiro paciente' }), !searchTerm && (_jsxs(Link, { to: "/nutri/patients/new", className: "inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all", children: [_jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) }), "Cadastrar primeiro paciente"] }))] })) : (_jsx("div", { className: "space-y-3", children: filteredPatients.map((patient) => (_jsx("div", { className: "bg-white rounded-xl shadow-sm border border-stone-200 p-4 hover:shadow-md transition-all", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-tempera-olive text-white flex items-center justify-center font-serif font-bold text-lg shrink-0 shadow-sm", children: patient.name.charAt(0).toUpperCase() }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h3", { className: "font-medium text-stone-900 truncate", children: patient.name }), getStatusBadge(patient.status)] }), patient.email && (_jsx("p", { className: "text-sm text-stone-500 truncate", children: patient.email }))] }), _jsxs("div", { className: "hidden sm:flex items-center gap-2 bg-stone-50 px-3 py-2 rounded-lg", children: [_jsx("code", { className: "font-mono text-sm text-stone-600", children: patient.accessCode }), _jsx("button", { onClick: () => copyAccessCode(patient.accessCode), className: "p-1 text-stone-400 hover:text-emerald-600 transition-colors", title: "Copiar c\u00F3digo", children: copiedCode === patient.accessCode ? (_jsx("svg", { className: "w-4 h-4 text-tempera-olive", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) })) : (_jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" }) })) })] }), _jsx(Link, { to: `/nutri/patients/${patient.id}`, className: "p-2 text-stone-400 hover:text-emerald-600 transition-colors", title: "Ver detalhes", children: _jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }) })] }) }, patient.id))) }))] }) }));
};
export default PatientListScreen;
