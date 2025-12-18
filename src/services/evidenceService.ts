// ============================================
// Evidence Service
// Gerencia evidências científicas por role
// ============================================

import type { EvidenceItem } from '../types/concierge';

// ============================================
// Evidence Database (Mock - futuro: API)
// ============================================

const evidenceDatabase: EvidenceItem[] = [
  {
    title: 'Diretrizes ABESO 2024',
    note: 'Substituições calóricas equivalentes mantêm resultados em programas de emagrecimento, desde que respeitem restrições individuais.',
    doi: '10.1590/abeso.2024.001',
    evidence_level: 'A',
    full_reference: 'Associação Brasileira para o Estudo da Obesidade e da Síndrome Metabólica. Diretrizes Brasileiras de Obesidade 2024. 5ª ed. São Paulo: ABESO, 2024.'
  },
  {
    title: 'ISSN Position Stand 2023',
    note: 'Flexibilidade no timing proteico não compromete resultados, desde que a meta diária seja atingida.',
    doi: '10.1186/s12970-023-00593-3',
    evidence_level: 'A',
    full_reference: 'Kerksick CM, Arent S, Schoenfeld BJ, et al. International Society of Sports Nutrition position stand: protein and exercise. J Int Soc Sports Nutr. 2023;20(1):52.'
  },
  {
    title: 'FAO/WHO Energy Requirements 2023',
    note: 'Equivalências baseadas em macronutrientes oferecem maior precisão que apenas calorias para manutenção de composição corporal.',
    doi: '10.4060/cc3150en',
    evidence_level: 'A',
    full_reference: 'FAO/WHO. Human energy requirements: report of a Joint FAO/WHO Expert Consultation. Rome: FAO, 2023.'
  },
  {
    title: 'Diretriz SBD 2024',
    note: 'Índice glicêmico deve ser considerado em substituições para pacientes diabéticos ou pré-diabéticos.',
    doi: '10.1590/sbd.2024.002',
    evidence_level: 'A',
    full_reference: 'Sociedade Brasileira de Diabetes. Diretrizes da Sociedade Brasileira de Diabetes 2024. São Paulo: Clannad, 2024.'
  },
  {
    title: 'AHA Dietary Recommendations 2023',
    note: 'Substituições devem priorizar alimentos integrais e minimamente processados.',
    doi: '10.1161/CIR.0000000000001123',
    evidence_level: 'B',
    full_reference: 'Lichtenstein AH, Appel LJ, Vadiveloo M, et al. 2023 AHA Dietary Guidance to Improve Cardiovascular Health. Circulation. 2023;147(4):e53-e78.'
  },
  {
    title: 'Consenso BRASPEN 2024',
    note: 'Aporte proteico deve ser ajustado individualmente, especialmente em idosos e atletas.',
    doi: '10.37111/braspenj.2024.001',
    evidence_level: 'B',
    full_reference: 'BRASPEN. Consenso Brasileiro de Nutrição em Pacientes Hospitalizados. BRASPEN J. 2024;39(1):1-25.'
  }
];

// ============================================
// Service Functions
// ============================================

/**
 * Filtra evidências para o paciente (resumidas, sem DOI)
 */
export function getPatientEvidence(maxItems: number = 2): EvidenceItem[] {
  return evidenceDatabase.slice(0, maxItems).map(e => ({
    title: e.title,
    note: e.note
    // Omit: doi, evidence_level, full_reference
  }));
}

/**
 * Retorna evidências completas para nutricionista
 */
export function getNutritionistEvidence(): EvidenceItem[] {
  return evidenceDatabase;
}

/**
 * Busca evidências por contexto/keywords
 */
export function searchEvidence(keywords: string[]): EvidenceItem[] {
  const lowerKeywords = keywords.map(k => k.toLowerCase());
  
  return evidenceDatabase.filter(e => {
    const searchText = `${e.title} ${e.note} ${e.full_reference || ''}`.toLowerCase();
    return lowerKeywords.some(k => searchText.includes(k));
  });
}

/**
 * Agrupa evidências por nível
 */
export function groupByEvidenceLevel(): Record<string, EvidenceItem[]> {
  const groups: Record<string, EvidenceItem[]> = {
    'A': [],
    'B': [],
    'C': [],
    'D': [],
    'expert_opinion': []
  };
  
  evidenceDatabase.forEach(e => {
    const level = e.evidence_level || 'expert_opinion';
    if (groups[level]) {
      groups[level].push(e);
    }
  });
  
  return groups;
}

/**
 * Formata citação para exibição
 */
export function formatCitation(evidence: EvidenceItem, style: 'abnt' | 'apa' = 'abnt'): string {
  if (!evidence.full_reference) {
    return evidence.title;
  }
  
  if (style === 'apa') {
    // Simplificado - em produção usar biblioteca de citações
    return evidence.full_reference;
  }
  
  // ABNT - padrão
  return evidence.full_reference;
}

/**
 * Gera link para DOI
 */
export function getDoiLink(doi: string): string {
  return `https://doi.org/${doi}`;
}

// ============================================
// Evidence Hook
// ============================================

export function useEvidence(userRole: 'patient' | 'nutritionist') {
  const getEvidence = () => {
    return userRole === 'nutritionist' 
      ? getNutritionistEvidence() 
      : getPatientEvidence();
  };
  
  const getPreview = (count: number = 2) => {
    return getPatientEvidence(count);
  };
  
  return {
    getEvidence,
    getPreview,
    searchEvidence,
    formatCitation,
    getDoiLink
  };
}

export default evidenceDatabase;
