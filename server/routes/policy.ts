// ============================================
// Policy Engine - Lógica de Substituição Premium
// ============================================

import { Request, Response, Router } from 'express';
import type {
  SubstitutionChoice,
  FoodSubstitutionResponse,
  NoAlternativeResponse,
  EvidenceItem,
  Macros,
  PolicyConfig,
  FoodCatalogItem
} from '../../types/concierge.js';

const router = Router();

// ============================================
// Policy Configuration
// ============================================

const POLICY_VERSION = '1.0.0';

const policyConfig: PolicyConfig = {
  version: POLICY_VERSION,
  
  substitution: {
    max_alternatives: 3,
    equivalence_tolerance_percent: 15,
    ranking_weights: {
      plan_compatibility: 0.4,
      equivalence_error: 0.3,
      patient_preference: 0.2,
      variety: 0.1
    }
  },
  
  evidence: {
    patient_max_items: 2,
    nutri_include_doi: true,
    nutri_include_full_reference: true
  },
  
  messages: {
    default_tone: 'NEUTRAL_PRO',
    max_body_chars: 150,
    require_action: true
  },
  
  security: {
    allow_impersonation: true,
    log_all_requests: true,
    require_plan_version: true
  }
};

// ============================================
// Mock Evidence Database
// ============================================

const evidenceDb: EvidenceItem[] = [
  {
    title: 'ABESO 2024',
    note: 'Substituições com equivalência calórica mantêm resultados em programas de emagrecimento.',
    doi: '10.1590/abeso.2024.001',
    evidence_level: 'A',
    full_reference: 'Associação Brasileira para o Estudo da Obesidade. Diretrizes Brasileiras de Obesidade 2024. 5ª ed. São Paulo: ABESO, 2024.'
  },
  {
    title: 'Position Stand ISSN 2023',
    note: 'Timing proteico flexível, desde que meta diária seja atingida.',
    doi: '10.1186/s12970-023-00593-3',
    evidence_level: 'A',
    full_reference: 'Kerksick CM, et al. International Society of Sports Nutrition position stand: protein and exercise. J Int Soc Sports Nutr. 2023;20(1):52.'
  },
  {
    title: 'FAO/WHO 2023',
    note: 'Recomendações de macronutrientes baseadas em biodisponibilidade.',
    doi: '10.4060/cc3150en',
    evidence_level: 'A',
    full_reference: 'FAO/WHO. Human energy requirements: report of a Joint FAO/WHO Expert Consultation. Rome: FAO, 2023.'
  }
];

// ============================================
// Mock Patient Catalog
// ============================================

const mockCatalog: FoodCatalogItem[] = [
  {
    id: 'arroz-integral',
    food: 'Arroz integral',
    category: 'carb',
    per_100g: { kcal: 111, macros: { carb_g: 23, prot_g: 2.6, fat_g: 0.9, fiber_g: 1.8 } },
    equivalences: [{ target_kcal: 100, grams_needed: 90 }],
    tags: ['saciedade', 'fibra'],
    available: true
  },
  {
    id: 'batata-doce',
    food: 'Batata doce',
    category: 'carb',
    per_100g: { kcal: 86, macros: { carb_g: 20, prot_g: 1.6, fat_g: 0.1, fiber_g: 3 } },
    equivalences: [{ target_kcal: 100, grams_needed: 116 }],
    tags: ['pré-treino', 'sustentação'],
    available: true
  },
  {
    id: 'quinoa',
    food: 'Quinoa',
    category: 'carb',
    per_100g: { kcal: 120, macros: { carb_g: 21, prot_g: 4.4, fat_g: 1.9, fiber_g: 2.8 } },
    equivalences: [{ target_kcal: 100, grams_needed: 83 }],
    tags: ['proteína extra', 'saciedade'],
    available: true
  },
  {
    id: 'macarrao-integral',
    food: 'Macarrão integral',
    category: 'carb',
    per_100g: { kcal: 124, macros: { carb_g: 25, prot_g: 5, fat_g: 1.1, fiber_g: 3.9 } },
    equivalences: [{ target_kcal: 100, grams_needed: 81 }],
    tags: ['praticidade'],
    available: true
  },
  {
    id: 'frango-grelhado',
    food: 'Frango grelhado',
    category: 'protein',
    per_100g: { kcal: 165, macros: { carb_g: 0, prot_g: 31, fat_g: 3.6, fiber_g: 0 } },
    equivalences: [{ target_kcal: 150, grams_needed: 91 }],
    tags: ['magro', 'versátil'],
    available: true
  },
  {
    id: 'peixe-grelhado',
    food: 'Peixe grelhado (tilápia)',
    category: 'protein',
    per_100g: { kcal: 128, macros: { carb_g: 0, prot_g: 26, fat_g: 2.6, fiber_g: 0 } },
    equivalences: [{ target_kcal: 150, grams_needed: 117 }],
    tags: ['leve', 'digestão rápida'],
    available: true
  },
  {
    id: 'ovo-cozido',
    food: 'Ovo cozido',
    category: 'protein',
    per_100g: { kcal: 155, macros: { carb_g: 1.1, prot_g: 13, fat_g: 11, fiber_g: 0 } },
    equivalences: [{ target_kcal: 150, grams_needed: 97 }],
    tags: ['praticidade', 'gordura boa'],
    available: true
  }
];

// ============================================
// Equivalence Calculator
// ============================================

interface EquivalenceInput {
  original: { kcal: number; macros: Macros };
  candidate: FoodCatalogItem;
  method: 'macros_full' | 'kcal_only' | 'carb_primary';
}

function calculateEquivalence(input: EquivalenceInput): { grams: number; kcal: number; macros: Macros; error_percent: number } {
  const { original, candidate, method } = input;
  
  let targetGrams: number;
  
  if (method === 'kcal_only') {
    // Simples: mesmo kcal
    targetGrams = (original.kcal / candidate.per_100g.kcal) * 100;
  } else if (method === 'carb_primary') {
    // Prioriza carboidratos
    targetGrams = (original.macros.carb_g / candidate.per_100g.macros.carb_g) * 100;
  } else {
    // macros_full: média ponderada
    const carbRatio = original.macros.carb_g / (candidate.per_100g.macros.carb_g || 1);
    const protRatio = original.macros.prot_g / (candidate.per_100g.macros.prot_g || 1);
    const fatRatio = original.macros.fat_g / (candidate.per_100g.macros.fat_g || 1);
    
    // Pesos: carb 50%, prot 30%, fat 20%
    targetGrams = ((carbRatio * 0.5 + protRatio * 0.3 + fatRatio * 0.2) * 100);
  }
  
  // Arredondar para porções práticas (5g)
  targetGrams = Math.round(targetGrams / 5) * 5;
  
  // Calcular valores finais
  const ratio = targetGrams / 100;
  const finalKcal = Math.round(candidate.per_100g.kcal * ratio);
  const finalMacros: Macros = {
    carb_g: Math.round(candidate.per_100g.macros.carb_g * ratio * 10) / 10,
    prot_g: Math.round(candidate.per_100g.macros.prot_g * ratio * 10) / 10,
    fat_g: Math.round(candidate.per_100g.macros.fat_g * ratio * 10) / 10,
    fiber_g: candidate.per_100g.macros.fiber_g 
      ? Math.round(candidate.per_100g.macros.fiber_g * ratio * 10) / 10 
      : undefined
  };
  
  // Calcular erro de equivalência
  const kcalError = Math.abs((finalKcal - original.kcal) / original.kcal) * 100;
  
  return {
    grams: targetGrams,
    kcal: finalKcal,
    macros: finalMacros,
    error_percent: Math.round(kcalError * 10) / 10
  };
}

// ============================================
// Ranking Algorithm
// ============================================

interface RankingInput {
  candidate: FoodCatalogItem;
  equivalence: ReturnType<typeof calculateEquivalence>;
  patientPreferences: string[];
  recentFoods: string[];
  constraints: string[];
}

function calculateScore(input: RankingInput): number {
  const { candidate, equivalence, patientPreferences, recentFoods } = input;
  const weights = policyConfig.substitution.ranking_weights;
  
  // 1. Compatibilidade com plano (erro de equivalência)
  const maxError = policyConfig.substitution.equivalence_tolerance_percent;
  const errorScore = Math.max(0, 1 - (equivalence.error_percent / maxError));
  
  // 2. Preferências do paciente
  const prefMatches = candidate.tags.filter(t => patientPreferences.includes(t)).length;
  const prefScore = Math.min(1, prefMatches / 2); // Máximo 2 matches = score 1
  
  // 3. Variedade (penalizar alimentos recentes)
  const varietyScore = recentFoods.includes(candidate.id) ? 0.3 : 1;
  
  // Score final
  return (
    errorScore * weights.equivalence_error +
    prefScore * weights.patient_preference +
    varietyScore * weights.variety +
    1 * weights.plan_compatibility // Todos os candidatos são compatíveis
  );
}

// ============================================
// Premium Copy Generator
// ============================================

function generateWhyCopy(candidate: FoodCatalogItem, equivalence: ReturnType<typeof calculateEquivalence>): string {
  const tags = candidate.tags;
  
  if (tags.includes('saciedade')) {
    return `Mantém saciedade por mais tempo. ${equivalence.grams}g equivalem ao seu plano.`;
  }
  if (tags.includes('pré-treino')) {
    return `Energia sustentada para seu treino. Carboidrato de liberação gradual.`;
  }
  if (tags.includes('praticidade')) {
    return `Opção prática sem perder valor nutricional. Preparo rápido.`;
  }
  if (tags.includes('leve')) {
    return `Digestão leve, ideal para dias mais tranquilos.`;
  }
  if (tags.includes('proteína extra')) {
    return `Bônus de proteína além do esperado. Escolha inteligente.`;
  }
  
  return `Equivalência nutricional validada. ${equivalence.grams}g mantêm seu objetivo.`;
}

// ============================================
// Substitution Endpoint
// ============================================

interface SubstitutionRequest {
  base_food: string;
  base_grams: number;
  base_kcal: number;
  base_macros: Macros;
  meal: string;
  plan_version: string;
  patient_preferences?: string[];
  recent_foods?: string[];
}

router.post('/substitution', async (req: Request, res: Response) => {
  const startTime = Date.now();
  const requestId = `sub_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  
  // TODO: Get from auth
  const patientId = 'patient_001';
  const nutritionistId = 'nutri_001';
  const userRole = req.headers['x-user-role'] as 'patient' | 'nutritionist' || 'patient';
  
  const body = req.body as SubstitutionRequest;
  
  // Validate plan_version
  if (policyConfig.security.require_plan_version && !body.plan_version) {
    return res.status(400).json({
      error: 'plan_version é obrigatório',
      code: 'MISSING_PLAN_VERSION'
    });
  }
  
  const original = {
    kcal: body.base_kcal,
    macros: body.base_macros
  };
  
  const patientPreferences = body.patient_preferences || ['saciedade'];
  const recentFoods = body.recent_foods || [];
  const constraints: string[] = []; // TODO: Load from patient profile
  
  // Find candidates in same category
  const baseFood = body.base_food.toLowerCase();
  const baseCategory = mockCatalog.find(f => 
    f.food.toLowerCase().includes(baseFood) || baseFood.includes(f.food.toLowerCase())
  )?.category || 'carb';
  
  const candidates = mockCatalog.filter(f => 
    f.category === baseCategory && 
    f.available && 
    !f.food.toLowerCase().includes(baseFood)
  );
  
  if (candidates.length === 0) {
    const noAltResponse: NoAlternativeResponse = {
      type: 'no_safe_alternative',
      plan_version: body.plan_version,
      request_id: requestId,
      timestamp: new Date().toISOString(),
      base_item: {
        food: body.base_food,
        grams: body.base_grams,
        meal: body.meal
      },
      reason: 'Nenhuma alternativa segura encontrada no seu catálogo.',
      action: 'Fale com sua nutricionista para ajustar as opções.',
      contact_cta: true,
      audit: {
        patient_id: patientId,
        nutritionist_id: nutritionistId,
        constraints_blocking: constraints
      }
    };
    
    return res.json(noAltResponse);
  }
  
  // Calculate equivalences and scores
  const ranked = candidates.map(candidate => {
    const equivalence = calculateEquivalence({
      original,
      candidate,
      method: 'macros_full'
    });
    
    const score = calculateScore({
      candidate,
      equivalence,
      patientPreferences,
      recentFoods,
      constraints
    });
    
    return { candidate, equivalence, score };
  })
  .filter(r => r.equivalence.error_percent <= policyConfig.substitution.equivalence_tolerance_percent)
  .sort((a, b) => b.score - a.score);
  
  if (ranked.length === 0) {
    const noAltResponse: NoAlternativeResponse = {
      type: 'no_safe_alternative',
      plan_version: body.plan_version,
      request_id: requestId,
      timestamp: new Date().toISOString(),
      base_item: {
        food: body.base_food,
        grams: body.base_grams,
        meal: body.meal
      },
      reason: 'Alternativas disponíveis excedem tolerância de equivalência.',
      action: 'Mantenha o alimento original ou consulte sua nutricionista.',
      contact_cta: true,
      audit: {
        patient_id: patientId,
        nutritionist_id: nutritionistId,
        constraints_blocking: ['equivalence_tolerance_exceeded']
      }
    };
    
    return res.json(noAltResponse);
  }
  
  // Build response
  const best = ranked[0];
  const alternatives = ranked.slice(1, 4);
  
  const buildChoice = (item: typeof ranked[0]): SubstitutionChoice => ({
    food: item.candidate.food,
    grams: item.equivalence.grams,
    kcal: item.equivalence.kcal,
    macros: item.equivalence.macros,
    why: generateWhyCopy(item.candidate, item.equivalence),
    equivalence_error: item.equivalence.error_percent
  });
  
  // Evidence: 2 items for patient, full for nutri
  const evidencePreview = evidenceDb.slice(0, policyConfig.evidence.patient_max_items).map(e => ({
    title: e.title,
    note: e.note
  }));
  
  const evidenceFull = userRole === 'nutritionist' ? evidenceDb : undefined;
  
  const response: FoodSubstitutionResponse = {
    type: 'food_substitution',
    plan_version: body.plan_version,
    policy_version: POLICY_VERSION,
    request_id: requestId,
    timestamp: new Date().toISOString(),
    
    base_item: {
      food: body.base_food,
      grams: body.base_grams,
      kcal: body.base_kcal,
      macros: body.base_macros,
      meal: body.meal
    },
    
    best_choice: buildChoice(best),
    alternatives: alternatives.map(buildChoice),
    
    constraints_applied: constraints,
    patient_preferences: patientPreferences,
    
    evidence_preview: evidencePreview,
    evidence_full: evidenceFull,
    
    disclaimer: 'Substituições validadas pelo seu plano. Em caso de dúvida, consulte sua nutricionista.',
    
    audit: {
      patient_id: patientId,
      nutritionist_id: nutritionistId,
      catalog_version: '2025-01-01_v1',
      calculation_method: 'macros_full'
    }
  };
  
  // Log request (audit)
  if (policyConfig.security.log_all_requests) {
    console.log(`[AUDIT] ${requestId} | ${Date.now() - startTime}ms | ${userRole} | ${body.base_food} -> ${best.candidate.food}`);
  }
  
  res.json(response);
});

// ============================================
// Policy Config Endpoint (Nutri only)
// ============================================

router.get('/config', (req: Request, res: Response) => {
  const userRole = req.headers['x-user-role'] as 'patient' | 'nutritionist' || 'patient';
  
  if (userRole !== 'nutritionist') {
    return res.status(403).json({ error: 'Acesso restrito a nutricionistas' });
  }
  
  res.json(policyConfig);
});

export default router;
