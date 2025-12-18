import { PhilosophicalLabel, PhilosophicalPlan } from "../types";
import { getProfessionalBrand } from "./mockBackend";

// Helper for Fetch
async function postToApi<T, B = Record<string, unknown>>(endpoint: string, body: B): Promise<T> {
  const response = await fetch(`/api${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText}`);
  }

  return response.json();
}

export const analyzeProfessionalProfile = async (answers: Record<string, string>): Promise<{ archetype: 'thomist' | 'empathetic' | 'analytical' | 'tough-love', customInstructions: string }> => {
  return postToApi('/profile', { answers });
};

export const generatePlanSuggestion = async (clientName: string, observation: string): Promise<Omit<PhilosophicalPlan, 'lastUpdated'>> => {
  const brand = getProfessionalBrand();
  // Pass personality to backend so it knows how to behave
  return postToApi('/plan', {
    clientName,
    observation,
    personality: brand.personality
  });
};

export const analyzeThought = async (thought: string): Promise<PhilosophicalLabel> => {
  const brand = getProfessionalBrand();
  return postToApi('/analyze', {
    thought,
    personality: brand.personality
  });
};

export const chatWithPhilosopher = async (history: { role: string, parts: { text: string }[] }[], newMessage: string, context: PhilosophicalLabel) => {
  const brand = getProfessionalBrand();
  const response = await postToApi<{ text: string }>('/chat', {
    history,
    message: newMessage,
    context,
    personality: brand.personality
  });
  return response.text;
};
