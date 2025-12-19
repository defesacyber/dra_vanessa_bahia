import { create } from 'zustand';
// --- Initial State ---
const initialProfile = {
    name: '',
    crn: '',
    sex: '',
    cpf: '',
    addressZip: '',
    clinicName: '',
    cnpj: '',
    clinicZip: '',
};
const initialBehavior = {
    tone: 'neutral',
    style: 'objective',
    intensity: 2,
    phrasesLiked: '',
    phrasesAvoided: '',
};
const initialBranding = {
    primaryColor: '#10b981', // Emerald-500 default
};
const initialPayment = {
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    authorized: false,
};
// --- Store ---
export const useRegistrationStore = create((set) => ({
    currentStep: 1,
    profile: initialProfile,
    behavior: initialBehavior,
    branding: initialBranding,
    payment: initialPayment,
    isLoading: false,
    error: null,
    setStep: (step) => set({ currentStep: step }),
    nextStep: () => set((state) => ({
        currentStep: Math.min(state.currentStep + 1, 4)
    })),
    prevStep: () => set((state) => ({
        currentStep: Math.max(state.currentStep - 1, 1)
    })),
    updateProfile: (data) => set((state) => ({
        profile: { ...state.profile, ...data }
    })),
    updateBehavior: (data) => set((state) => ({
        behavior: { ...state.behavior, ...data }
    })),
    updateBranding: (data) => set((state) => ({
        branding: { ...state.branding, ...data }
    })),
    updatePayment: (data) => set((state) => ({
        payment: { ...state.payment, ...data }
    })),
    reset: () => set({
        currentStep: 1,
        profile: initialProfile,
        behavior: initialBehavior,
        branding: initialBranding,
        payment: initialPayment,
        error: null,
        isLoading: false,
    }),
}));
