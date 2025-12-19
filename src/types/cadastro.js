// ============================================
// Tipos do Cadastro de Nutricionista
// Têmpera — Nutrição Humana
// ============================================
// ============================================
// Constantes
// ============================================
export const PRECO_POR_PACIENTE = 10; // R$
export const TEXTO_COBRANCA = `R$ ${PRECO_POR_PACIENTE}/mês por paciente com acesso liberado. Você pode bloquear um paciente a qualquer momento para parar a cobrança daquele acesso.`;
export const PERFIS_TOM = [
    { value: 'serio', label: 'Sério', descricao: 'Tom formal e profissional' },
    { value: 'neutro', label: 'Neutro', descricao: 'Tom equilibrado e adaptável' },
    { value: 'carinhoso', label: 'Carinhoso', descricao: 'Tom acolhedor e empático' },
];
export const ESTILOS_TOM = [
    { value: 'objetivo', label: 'Objetivo', descricao: 'Direto ao ponto' },
    { value: 'motivacional', label: 'Motivacional', descricao: 'Incentivo e celebração' },
    { value: 'delicado', label: 'Delicado', descricao: 'Suave e cuidadoso' },
];
export const CORES_PADRAO = {
    primaria: '#059669', // emerald-600
    secundaria: '#0d9488', // teal-600
    acento: '#f59e0b', // amber-500
    fundo: '#f8fafc', // slate-50
};
