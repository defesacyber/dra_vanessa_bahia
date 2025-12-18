// ============================================
// Concierge Premium UI Components
// "1 Melhor + 3 Alternativas" Pattern
// ============================================

import React, { useState } from 'react';
import type { 
  FoodSubstitutionResponse, 
  NoAlternativeResponse, 
  SubstitutionChoice,
  EvidenceItem 
} from '../../types/concierge';

// ============================================
// Best Choice Card (Hero)
// ============================================

interface BestChoiceCardProps {
  choice: SubstitutionChoice;
  baseFood: string;
  onSelect?: () => void;
}

export const BestChoiceCard: React.FC<BestChoiceCardProps> = ({ 
  choice, 
  baseFood,
  onSelect 
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 p-6 shadow-lg">
      {/* Badge */}
      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Melhor agora
        </span>
      </div>
      
      {/* Content */}
      <div className="pr-24">
        <p className="text-sm text-emerald-600 font-medium mb-1">
          Substituindo {baseFood}
        </p>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {choice.food}
        </h3>
        <p className="text-lg text-gray-700 mb-4">
          <span className="font-semibold">{choice.grams}g</span>
          <span className="text-gray-400 mx-2">•</span>
          <span>{choice.kcal} kcal</span>
        </p>
      </div>
      
      {/* Why - Premium Copy */}
      <p className="text-gray-600 mb-4 leading-relaxed">
        {choice.why}
      </p>
      
      {/* Macros (Discrete) */}
      <div className="flex gap-4 text-sm text-gray-500 mb-4">
        <span>C: {choice.macros.carb_g}g</span>
        <span>P: {choice.macros.prot_g}g</span>
        <span>G: {choice.macros.fat_g}g</span>
      </div>
      
      {/* CTA */}
      {onSelect && (
        <button
          onClick={onSelect}
          className="w-full rounded-xl bg-emerald-600 py-3 text-white font-semibold hover:bg-emerald-700 transition-colors"
        >
          Confirmar substituição
        </button>
      )}
    </div>
  );
};

// ============================================
// Alternative Card (Secondary)
// ============================================

interface AlternativeCardProps {
  choice: SubstitutionChoice;
  index: number;
  onSelect?: () => void;
}

export const AlternativeCard: React.FC<AlternativeCardProps> = ({ 
  choice, 
  index,
  onSelect 
}) => {
  return (
    <div 
      className="flex items-center justify-between rounded-xl bg-white border border-gray-200 p-4 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex items-center gap-4">
        {/* Index Badge */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
          {index + 1}
        </div>
        
        {/* Info */}
        <div>
          <h4 className="font-semibold text-gray-900">{choice.food}</h4>
          <p className="text-sm text-gray-500">
            {choice.grams}g • {choice.kcal} kcal
          </p>
        </div>
      </div>
      
      {/* Equivalence indicator */}
      {choice.equivalence_error !== undefined && choice.equivalence_error <= 5 && (
        <span className="text-xs text-emerald-600 font-medium">
          ≈ equivalente
        </span>
      )}
      
      {/* Arrow */}
      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
};

// ============================================
// Evidence Section (Collapsible)
// ============================================

interface EvidenceSectionProps {
  preview: EvidenceItem[];
  full?: EvidenceItem[];
  userRole: 'patient' | 'nutritionist';
}

export const EvidenceSection: React.FC<EvidenceSectionProps> = ({ 
  preview, 
  full,
  userRole 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const items = isExpanded && full ? full : preview;
  
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-medium text-gray-700">
          📚 Baseado em evidências
        </span>
        <svg 
          className={`h-4 w-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isExpanded && (
        <div className="mt-4 space-y-3">
          {items.map((evidence, idx) => (
            <div key={idx} className="rounded-lg bg-white p-3 border border-gray-100">
              <p className="font-medium text-gray-800 text-sm">
                {evidence.title}
                {evidence.evidence_level && (
                  <span className="ml-2 text-xs text-gray-500">
                    (Nível {evidence.evidence_level})
                  </span>
                )}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {evidence.note}
              </p>
              {userRole === 'nutritionist' && evidence.doi && (
                <a 
                  href={`https://doi.org/${evidence.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-600 hover:underline mt-2 inline-block"
                >
                  DOI: {evidence.doi}
                </a>
              )}
              {userRole === 'nutritionist' && evidence.full_reference && (
                <p className="text-xs text-gray-400 mt-1 italic">
                  {evidence.full_reference}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================
// No Alternative View
// ============================================

interface NoAlternativeViewProps {
  response: NoAlternativeResponse;
  onContact?: () => void;
}

export const NoAlternativeView: React.FC<NoAlternativeViewProps> = ({ 
  response, 
  onContact 
}) => {
  return (
    <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
        <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {response.reason}
      </h3>
      
      <p className="text-gray-600 mb-4">
        {response.action}
      </p>
      
      {response.contact_cta && onContact && (
        <button
          onClick={onContact}
          className="rounded-xl bg-amber-600 px-6 py-3 text-white font-semibold hover:bg-amber-700 transition-colors"
        >
          Falar com nutricionista
        </button>
      )}
    </div>
  );
};

// ============================================
// Complete Substitution View
// ============================================

interface SubstitutionViewProps {
  response: FoodSubstitutionResponse | NoAlternativeResponse;
  userRole: 'patient' | 'nutritionist';
  onSelectChoice?: (choice: SubstitutionChoice) => void;
  onContact?: () => void;
}

export const SubstitutionView: React.FC<SubstitutionViewProps> = ({
  response,
  userRole,
  onSelectChoice,
  onContact
}) => {
  if (response.type === 'no_safe_alternative') {
    return <NoAlternativeView response={response} onContact={onContact} />;
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900">
          Substituições para {response.base_item.food}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {response.base_item.meal} • {response.base_item.grams}g original
        </p>
      </div>
      
      {/* Best Choice (Hero) */}
      <BestChoiceCard 
        choice={response.best_choice}
        baseFood={response.base_item.food}
        onSelect={onSelectChoice ? () => onSelectChoice(response.best_choice) : undefined}
      />
      
      {/* Alternatives */}
      {response.alternatives.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-500 mb-3">
            Outras opções
          </p>
          <div className="space-y-2">
            {response.alternatives.map((alt, idx) => (
              <AlternativeCard
                key={idx}
                choice={alt}
                index={idx}
                onSelect={onSelectChoice ? () => onSelectChoice(alt) : undefined}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Evidence */}
      <EvidenceSection
        preview={response.evidence_preview}
        full={response.evidence_full}
        userRole={userRole}
      />
      
      {/* Disclaimer */}
      <p className="text-xs text-gray-400 text-center">
        {response.disclaimer}
      </p>
      
      {/* Audit info (nutri only) */}
      {userRole === 'nutritionist' && (
        <div className="rounded-lg bg-gray-100 p-3 text-xs text-gray-500">
          <p><strong>Auditoria:</strong></p>
          <p>Plano: {response.plan_version} | Policy: {response.policy_version}</p>
          <p>Request: {response.request_id}</p>
          <p>Método: {response.audit.calculation_method}</p>
        </div>
      )}
    </div>
  );
};

// ============================================
// Substitution Modal (Full Screen Mobile)
// ============================================

interface SubstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  response: FoodSubstitutionResponse | NoAlternativeResponse | null;
  userRole: 'patient' | 'nutritionist';
  onSelectChoice?: (choice: SubstitutionChoice) => void;
  onContact?: () => void;
}

export const SubstitutionModal: React.FC<SubstitutionModalProps> = ({
  isOpen,
  onClose,
  response,
  userRole,
  onSelectChoice,
  onContact
}) => {
  if (!isOpen || !response) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center">
      <div className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Substituição</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <SubstitutionView
            response={response}
            userRole={userRole}
            onSelectChoice={onSelectChoice}
            onContact={onContact}
          />
        </div>
      </div>
    </div>
  );
};

export default SubstitutionView;
