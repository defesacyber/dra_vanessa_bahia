export interface PatientAccess {
    id: string;
    patientId: string;
    nutritionistId: string;
    patientName: string; // Helper for display
    status: 'ACTIVE' | 'INACTIVE';
    activatedAt: Date;
    deactivatedAt?: Date | null;
}

export interface BillingCycle {
    month: number;
    year: number;
    cycleStart: Date;
    cycleEnd: Date;
    daysInCycle: number;
    pricePerMonth: number;
}

export interface PatientCostDetail {
    patientId: string;
    patientName: string;
    activeDays: number;
    dailyRate: number;
    subtotal: number;
}
