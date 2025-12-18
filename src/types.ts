// ============================================
// NutriFilosofia - Tipos para Nutricionistas
// Integrando nutrição clínica com filosofia prática
// ============================================

export interface NutrientInfo {
  name: string;
  amount: string; // e.g. "Alto", "Moderado", "Baixo", "15g"
  description: string;
}

export interface PhilosophicalInsight {
  principle: string; // Ex: "Temperança", "Autodisciplina"
  application: string; // Como aplicar ao comportamento alimentar
  source: string; // Tomismo, Mindfulness, etc.
}

export interface IntegrativeAnalysis {
  // Compatibilidade com UI existente
  servingSize: string; // Perfil resumido do paciente
  calories: number; // Complexidade do caso (1-100)
  analysis: string; // Análise integrativa
  prescription: string; // Prescrição integrada
  
  // Aspectos comportamentais
  virtues: NutrientInfo[]; // Pontos fortes do paciente
  vices: NutrientInfo[]; // Desafios comportamentais
  vitamins: NutrientInfo[]; // Princípios filosóficos aplicáveis
  mainIngredients: string[]; // Elementos-chave do caso
  
  // Aspectos Nutricionais expandidos
  nutritionalContext?: string;
  mainChallenges?: string[];
  nutritionalGoals?: string[];
  
  // Aspectos Filosóficos de Apoio
  philosophicalInsights?: PhilosophicalInsight[];
  mindsetShifts?: string[];
  
  // Integração
  integrativeApproach?: string;
  practicalExercises?: string[];
  
  // Métricas
  balanceScore?: number;
  sustainabilityScore?: number;
  
  // Prescrição integrada
  weeklyFocus?: string;
  dailyReflection?: string;
  nutritionalPrescription?: string;
}

export interface HistoryItem {
  id: string;
  date: number;
  input: string; // Input original do usuário
  clientName: string;
  concern: string;
  result: IntegrativeAnalysis;
}

export interface NutritionalPlan {
  lastUpdated: number;
  
  // Campos usados pela UI existente
  focusArea: string; // Foco terapêutico
  morningRoutine: string; // Rotina matinal
  dailyReading: string; // Leitura/reflexão diária
  avoidance: string; // O que evitar
  notes: string; // Observações
  
  // Campos expandidos (opcionais)
  primaryGoal?: string;
  secondaryGoals?: string[];
  dietaryRestrictions?: string[];
  philosophicalFramework?: string;
  dailyReflection?: string;
  weeklyChallenge?: string;
  morningRitual?: string;
  eveningRitual?: string;
  nextSessionFocus?: string;
}

export interface Personality {
  archetype: 'thomist' | 'empathetic' | 'analytical' | 'tough-love';
  basePersona?: string;
  customInstructions: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  status: 'active' | 'inactive' | 'paused';
  
  // Dados clínicos básicos
  age?: number;
  objectives?: string[];
  
  // Plano atual
  currentPlan?: NutritionalPlan;
  
  // Histórico
  sessionsCount?: number;
  lastSession?: number;
}

export interface ProfessionalProfile {
  professionalName: string;
  specialty?: string;
  crn?: string;
  
  // Branding
  logoUrl: string;
  photoUrl: string;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  
  // Personalidade da IA
  personality?: Personality;
  
  // Abordagem filosófica preferida (alternativo)
  philosophicalApproach?: {
    primary: 'thomist' | 'mindful' | 'holistic';
    customInstructions: string;
  };
  
  // Configurações
  clinicName?: string;
  welcomeMessage?: string;
  setupComplete?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum AppState {
  INPUT,
  ANALYZING,
  RESULTS,
}

// Backward compatibility aliases
export type PhilosophicalLabel = IntegrativeAnalysis;
export type PhilosophicalPlan = NutritionalPlan;
export type ProfessionalBrand = ProfessionalProfile;
export type MacroNutrient = NutrientInfo;
