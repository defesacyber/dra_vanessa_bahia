import { getProfessionalBrand } from "./mockBackend";
// Helper for Fetch
async function postToApi(endpoint, body) {
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
export const analyzeProfessionalProfile = async (answers) => {
    return postToApi('/profile', { answers });
};
export const generatePlanSuggestion = async (clientName, observation) => {
    const brand = getProfessionalBrand();
    // Pass personality to backend so it knows how to behave
    return postToApi('/plan', {
        clientName,
        observation,
        personality: brand.personality
    });
};
export const analyzeThought = async (thought) => {
    const brand = getProfessionalBrand();
    return postToApi('/analyze', {
        thought,
        personality: brand.personality
    });
};
export const chatWithPhilosopher = async (history, newMessage, context) => {
    const brand = getProfessionalBrand();
    const response = await postToApi('/chat', {
        history,
        message: newMessage,
        context,
        personality: brand.personality
    });
    return response.text;
};
