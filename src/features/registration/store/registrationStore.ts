import { create } from 'zustand';

// --- Types ---

export interface ProfileData {
    name: string;
    crn: string;
    sex: 'male' | 'female' | 'other' | '';
    cpf: string;
    addressZip: string;
    clinicName: string;
    cnpj: string;
    clinicZip: string;
}

export interface BrandingData {
    photo?: string; // URL da imagem (blob ou mock)
    logo?: string;
    primaryColor: string;
    watermark?: string;
}

export interface BehavioralData {
    tone: 'serious' | 'neutral' | 'loving';
    style: 'objective' | 'motivational' | 'delicate';
    intensity: 1 | 2 | 3;
    phrasesLiked: string;
    phrasesAvoided: string;
}

export interface PaymentData {
    cardName: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
    authorized: boolean;
}

export interface RegistrationState {
    currentStep: number;
    profile: ProfileData;
    behavior: BehavioralData;
    branding: BrandingData;
    payment: PaymentData;
    isLoading: boolean;
    error: string | null;

    // Actions
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    updateProfile: (data: Partial<ProfileData>) => void;
    updateBehavior: (data: Partial<BehavioralData>) => void;
    updateBranding: (data: Partial<BrandingData>) => void;
    updatePayment: (data: Partial<PaymentData>) => void;
    reset: () => void;
}

// --- Initial State ---

const initialProfile: ProfileData = {
    name: '',
    crn: '',
    sex: '',
    cpf: '',
    addressZip: '',
    clinicName: '',
    cnpj: '',
    clinicZip: '',
};

const initialBehavior: BehavioralData = {
    tone: 'neutral',
    style: 'objective',
    intensity: 2,
    phrasesLiked: '',
    phrasesAvoided: '',
};

const initialBranding: BrandingData = {
    primaryColor: '#10b981', // Emerald-500 default
};

const initialPayment: PaymentData = {
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    authorized: false,
};

// --- Store ---

export const useRegistrationStore = create<RegistrationState>((set) => ({
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
