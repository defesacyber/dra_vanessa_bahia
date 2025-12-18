import { useState, useEffect } from 'react';
import { getClientById, getProfessionalBrand } from '../services/mockBackend';
import { ProfessionalBrand, PhilosophicalPlan } from '../types';

export const useClientSession = (userRole: 'client' | 'professional' | null) => {
    const [showPlan, setShowPlan] = useState(false);
    const [clientPlan, setClientPlan] = useState<PhilosophicalPlan | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [brand, setBrand] = useState<ProfessionalBrand | null>(null);

    // Load branding
    useEffect(() => {
        const loadBrand = () => {
            setBrand(getProfessionalBrand());
        }
        loadBrand();
        // Expose a refresher if needed, or just poll/event listener (simplified for now)
    }, []);

    // Apply branding styles
    useEffect(() => {
        if (brand) {
            document.documentElement.style.setProperty('--brand-primary', brand.primaryColor);
            document.documentElement.style.setProperty('--brand-accent', brand.accentColor);
            document.documentElement.style.setProperty('--brand-bg', brand.backgroundColor);
        }
    }, [brand]);

    // Simulate fetching plan and notifications for client
    useEffect(() => {
        if (userRole === 'client') {
            const client = getClientById('1');
            if (client && client.currentPlan) {
                setClientPlan(client.currentPlan);

                const timer = setTimeout(() => {
                    setNotification(`Hora da sua leitura diária: "${client.currentPlan?.dailyReading}"`);
                }, 5000);

                return () => clearTimeout(timer);
            }
        }
    }, [userRole]);

    return {
        brand,
        setBrand,
        showPlan,
        setShowPlan,
        clientPlan,
        notification,
        setNotification
    };
};
