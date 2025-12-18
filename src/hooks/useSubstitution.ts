// ============================================
// Hook: useSubstitution
// Consume Policy Engine API
// ============================================

import { useState, useCallback } from 'react';
import type { 
  FoodSubstitutionResponse, 
  NoAlternativeResponse,
  Macros 
} from '../types/concierge';
import { useAuth } from '../contexts/AuthContext';

interface SubstitutionRequest {
  baseFood: string;
  baseGrams: number;
  baseKcal: number;
  baseMacros: Macros;
  meal: string;
  planVersion: string;
  patientPreferences?: string[];
  recentFoods?: string[];
}

interface UseSubstitutionResult {
  loading: boolean;
  error: string | null;
  response: FoodSubstitutionResponse | NoAlternativeResponse | null;
  requestSubstitution: (request: SubstitutionRequest) => Promise<void>;
  clearResponse: () => void;
}

export function useSubstitution(): UseSubstitutionResult {
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<FoodSubstitutionResponse | NoAlternativeResponse | null>(null);

  const requestSubstitution = useCallback(async (request: SubstitutionRequest) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/v1/policy/substitution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'x-user-role': user?.role || 'patient'
        },
        body: JSON.stringify({
          base_food: request.baseFood,
          base_grams: request.baseGrams,
          base_kcal: request.baseKcal,
          base_macros: request.baseMacros,
          meal: request.meal,
          plan_version: request.planVersion,
          patient_preferences: request.patientPreferences,
          recent_foods: request.recentFoods
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Erro ao buscar substituições');
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [token, user?.role]);

  const clearResponse = useCallback(() => {
    setResponse(null);
    setError(null);
  }, []);

  return {
    loading,
    error,
    response,
    requestSubstitution,
    clearResponse
  };
}

export default useSubstitution;
