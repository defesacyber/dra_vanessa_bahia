// ============================================
// Concierge Premium Types
// Tipos para experiência de alto padrão
// ============================================

// ============================================
// Macros & Nutrition
// ============================================

export interface Macros {
  carb_g: number;
  prot_g: number;
  fat_g: number;
  fiber_g?: number;
}

export interface FoodItem {
  id: string;
  food: string;
  grams: number;
  kcal: number;
  macros: Macros;
}

// ============================================
// Substitution Response (JSON Contract)
// ============================================

export interface SubstitutionChoice {
  food: string;
  grams: number;
  kcal: number;
  macros: Macros;
  why: string;  // Copy premium - 1 frase
  equivalence_error?: number; // % de erro vs original
}

export interface EvidenceItem {
  title: string;        // "Diretriz X (ano)"
  note: string;         // Resumo em linguagem humana
  doi?: string;         // Apenas para portal nutri
  evidence_level?: 'A' | 'B' | 'C' | 'D' | 'expert_opinion';
  full_reference?: string; // Citação completa para nutri
}

export interface FoodSubstitutionResponse {
  type: 'food_substitution';
  plan_version: string;           // "2025-12-14_v3"
  policy_version: string;         // "1.2.0"
  request_id: string;             // UUID para auditoria
  timestamp: string;              // ISO 8601
  
  base_item: {
    food: string;
    grams: number;
    kcal: number;
    macros: Macros;
    meal: string;                 // "almoço", "jantar", etc.
  };
  
  best_choice: SubstitutionChoice;
  alternatives: SubstitutionChoice[]; // Exatamente 3
  
  constraints_applied: string[];  // ["sem lactose", "low_sodium"]
  patient_preferences: string[];  // ["saciedade", "pré-treino"]
  
  evidence_preview: EvidenceItem[]; // 1-2 items para paciente
  evidence_full?: EvidenceItem[];   // Completo para nutri
  
  disclaimer: string;
  
  // Auditoria
  audit: {
    patient_id: string;
    nutritionist_id: string;
    catalog_version: string;
    calculation_method: 'macros_full' | 'kcal_only' | 'carb_primary';
  };
}

// ============================================
// No Safe Alternative Response
// ============================================

export interface NoAlternativeResponse {
  type: 'no_safe_alternative';
  plan_version: string;
  request_id: string;
  timestamp: string;
  
  base_item: {
    food: string;
    grams: number;
    meal: string;
  };
  
  reason: string;                 // "Nenhuma alternativa segura no seu catálogo"
  action: string;                 // "Peça ajuste à sua nutricionista"
  contact_cta: boolean;           // Mostrar botão de contato
  
  audit: {
    patient_id: string;
    nutritionist_id: string;
    constraints_blocking: string[];
  };
}

// ============================================
// Daily Message (Concierge Style)
// ============================================

export type ToneProfile = 
  | 'NEUTRAL_PRO'      // Coach discreto
  | 'WARM_SUPPORTIVE'  // Acolhedor
  | 'DIRECT_MINIMAL'   // Ultra-direto
  | 'PHILOSOPHICAL';   // Com reflexão (Tomismo)

export interface DailyMessage {
  id: string;
  date: string;                   // "2025-12-14"
  plan_version: string;
  
  title: string;                  // Curto: "Hoje: consistência elegante"
  body: string;                   // 2-3 linhas máximo
  action: string;                 // 1 ação clara
  
  tone: ToneProfile;
  category: 'motivation' | 'nutrition_tip' | 'mindset' | 'reflection';
  
  // Opcional: link para conteúdo
  deep_link?: {
    type: 'meal' | 'tip' | 'plan';
    target_id: string;
  };
}

// ============================================
// Patient Catalog (Premium = por paciente)
// ============================================

export interface FoodCatalogItem {
  id: string;
  food: string;
  category: 'carb' | 'protein' | 'fat' | 'vegetable' | 'fruit' | 'dairy' | 'other';
  per_100g: {
    kcal: number;
    macros: Macros;
  };
  
  // Equivalências pré-calculadas
  equivalences: {
    target_kcal: number;
    grams_needed: number;
  }[];
  
  tags: string[];                 // ["saciedade", "pré-treino", "digestão leve"]
  available: boolean;             // Disponível para este paciente
  patient_notes?: string;         // Notas específicas do paciente
}

export interface PatientCatalog {
  patient_id: string;
  nutritionist_id: string;
  version: string;
  created_at: string;
  updated_at: string;
  
  // Herdado do catálogo base do nutricionista
  base_catalog_version: string;
  
  // Customizações do paciente
  restrictions: string[];         // ["lactose", "gluten"]
  aversions: string[];            // ["berinjela", "quiabo"]
  preferences: string[];          // ["saciedade", "praticidade"]
  
  // Itens disponíveis (já filtrados)
  items: FoodCatalogItem[];
}

// ============================================
// Meal Plan (Versioned)
// ============================================

export interface MealItem {
  id: string;
  food: string;
  grams: number;
  kcal: number;
  macros: Macros;
  substitutable: boolean;         // Permite substituição?
  substitution_rules?: {
    method: 'macros_full' | 'kcal_only' | 'carb_primary';
    tolerance_percent: number;    // Ex: 10% de erro aceitável
  };
}

export interface Meal {
  id: string;
  name: string;                   // "Almoço"
  time_suggestion?: string;       // "12:00"
  items: MealItem[];
  total_kcal: number;
  total_macros: Macros;
}

export interface MealPlan {
  id: string;
  patient_id: string;
  nutritionist_id: string;
  version: string;                // "2025-12-14_v3"
  status: 'draft' | 'active' | 'archived';
  
  created_at: string;
  updated_at: string;
  valid_from: string;
  valid_until?: string;
  
  // Configurações globais
  calculation_method: 'macros_full' | 'kcal_only' | 'carb_primary';
  daily_targets: {
    kcal: number;
    macros: Macros;
  };
  
  meals: Meal[];
  
  // Evidências do plano
  evidence: EvidenceItem[];
  
  // Notas da nutricionista
  notes?: string;
}

// ============================================
// Audit Log
// ============================================

export interface AuditEntry {
  id: string;
  timestamp: string;
  
  action: 'substitution_request' | 'plan_view' | 'message_sent' | 'catalog_update';
  
  actor: {
    type: 'patient' | 'nutritionist' | 'system';
    id: string;
  };
  
  context: {
    plan_version: string;
    policy_version: string;
    catalog_version: string;
  };
  
  request?: Record<string, unknown>;
  response?: Record<string, unknown>;
  
  // Para "visualizar como paciente"
  impersonation?: {
    nutritionist_id: string;
    read_only: true;
  };
}

// ============================================
// Policy Engine Config
// ============================================

export interface PolicyConfig {
  version: string;
  
  substitution: {
    max_alternatives: 3;
    equivalence_tolerance_percent: number;  // Ex: 15
    ranking_weights: {
      plan_compatibility: number;   // 0.4
      equivalence_error: number;    // 0.3
      patient_preference: number;   // 0.2
      variety: number;              // 0.1
    };
  };
  
  evidence: {
    patient_max_items: 2;
    nutri_include_doi: boolean;
    nutri_include_full_reference: boolean;
  };
  
  messages: {
    default_tone: ToneProfile;
    max_body_chars: 150;
    require_action: boolean;
  };
  
  security: {
    allow_impersonation: boolean;
    log_all_requests: boolean;
    require_plan_version: boolean;
  };
}
