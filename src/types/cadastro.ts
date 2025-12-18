// ============================================
// Tipos do Cadastro de Nutricionista
// Têmpera — Nutrição Humana
// ============================================

// ============================================
// Passo 1 - Dados
// ============================================

export type Sexo = 'masculino' | 'feminino' | 'outro' | 'prefiro_nao_informar';

export interface EnderecoViaCEP {
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
  numero?: string;
}

export interface PerfilNutricionista {
  nomeCompleto: string;
  crn: string;
  sexo: Sexo;
  cpf: string;
  endereco: EnderecoViaCEP;
}

export interface DadosClinica {
  nomeClinica: string;
  cnpj: string;
  enderecoClinica: EnderecoViaCEP;
}

// Formulário comportamental
export type PerfilTom = 'serio' | 'neutro' | 'carinhoso';
export type EstiloTom = 'objetivo' | 'motivacional' | 'delicado';
export type IntensidadeTom = 1 | 2 | 3;

export interface EstiloAtendimento {
  perfil: PerfilTom;
  estilo: EstiloTom;
  intensidade?: IntensidadeTom;
  frasesQueGosta?: string[];
  frasesQueEvita?: string[];
}

export interface DadosCadastro {
  perfil: PerfilNutricionista;
  clinica: DadosClinica;
  estiloAtendimento: EstiloAtendimento;
}

// ============================================
// Passo 2 - Marca
// ============================================

export interface PaletaCores {
  primaria: string;    // HEX
  secundaria: string;  // HEX
  acento: string;      // HEX
  fundo?: string;      // HEX
}

export interface MarcaCadastro {
  fotoNutricionista?: File | string; // File para upload, string para URL
  logo?: File | string;
  paletaCores: PaletaCores;
  marcaDagua?: File | string;
}

// ============================================
// Passo 3 - Pagamento
// ============================================

export interface CartaoTokenizado {
  token: string;          // Token do gateway
  ultimos4: string;       // "1234"
  bandeira: string;       // "visa", "mastercard", etc
  validade: string;       // "12/28"
  titular?: string;
}

export interface AutorizacoesPagamento {
  autorizaCobrancaMensal: boolean;
  dataInicioVigencia: string; // ISO date
}

export interface PagamentoCadastro {
  cartao?: CartaoTokenizado;
  autorizacoes: AutorizacoesPagamento;
}

// ============================================
// Cadastro Completo
// ============================================

export interface CadastroNutricionistaCompleto {
  dados: DadosCadastro;
  marca: MarcaCadastro;
  pagamento: PagamentoCadastro;
  
  // Metadata
  criadoEm: string;
  status: 'pendente' | 'ativo' | 'suspenso';
}

// ============================================
// Resumo Financeiro
// ============================================

export interface ResumoFinanceiro {
  pacientesAtivos: number;
  custoMensalEstimado: number;  // R$
  precoPorPaciente: number;     // R$ 10
  proximaCobranca?: string;     // ISO date
}

// ============================================
// Estado do Formulário Multi-step
// ============================================

export type PassoCadastro = 1 | 2 | 3 | 'resumo';

export interface EstadoCadastroNutricionista {
  passoAtual: PassoCadastro;
  dados: Partial<DadosCadastro>;
  marca: Partial<MarcaCadastro>;
  pagamento: Partial<PagamentoCadastro>;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

// ============================================
// Constantes
// ============================================

export const PRECO_POR_PACIENTE = 10; // R$

export const TEXTO_COBRANCA = `R$ ${PRECO_POR_PACIENTE}/mês por paciente com acesso liberado. Você pode bloquear um paciente a qualquer momento para parar a cobrança daquele acesso.`;

export const PERFIS_TOM: { value: PerfilTom; label: string; descricao: string }[] = [
  { value: 'serio', label: 'Sério', descricao: 'Tom formal e profissional' },
  { value: 'neutro', label: 'Neutro', descricao: 'Tom equilibrado e adaptável' },
  { value: 'carinhoso', label: 'Carinhoso', descricao: 'Tom acolhedor e empático' },
];

export const ESTILOS_TOM: { value: EstiloTom; label: string; descricao: string }[] = [
  { value: 'objetivo', label: 'Objetivo', descricao: 'Direto ao ponto' },
  { value: 'motivacional', label: 'Motivacional', descricao: 'Incentivo e celebração' },
  { value: 'delicado', label: 'Delicado', descricao: 'Suave e cuidadoso' },
];

export const CORES_PADRAO: PaletaCores = {
  primaria: '#059669',   // emerald-600
  secundaria: '#0d9488', // teal-600
  acento: '#f59e0b',     // amber-500
  fundo: '#f8fafc',      // slate-50
};
