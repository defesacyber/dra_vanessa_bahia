// Constants
const BASE_PRICE = 10.00;
export const BillingService = {
    getCurrentCycle() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth(); // 0-11
        // First and last day of current month
        const cycleStart = new Date(year, month, 1);
        const cycleEnd = new Date(year, month + 1, 0); // Last day of month
        // Days in current month
        const daysInCycle = cycleEnd.getDate();
        return {
            month,
            year,
            cycleStart,
            cycleEnd,
            daysInCycle,
            pricePerMonth: BASE_PRICE
        };
    },
    calculateDailyRate(pricePerMonth, daysInCycle) {
        return pricePerMonth / daysInCycle;
    },
    /**
     * Calculates active days for a patient within a specific cycle.
     * Rule: Activation/Block on same day = 1 active day.
     * Rule: Activation day counts. Block day counts.
     */
    calculateActiveDays(access, cycle) {
        // If inactive before cycle starts, 0 days
        if (access.status === 'INACTIVE' && access.deactivatedAt && access.deactivatedAt < cycle.cycleStart) {
            return 0;
        }
        // If activated after cycle ends, 0 days
        if (access.activatedAt > cycle.cycleEnd) {
            return 0;
        }
        // Determine start of active period within cycle
        const effectiveStart = access.activatedAt < cycle.cycleStart
            ? cycle.cycleStart
            : access.activatedAt;
        // Determine end of active period within cycle
        // If ACTIVE, it's effectively until 'now' for estimate, or cycle end for projection.
        // For "Estimativa Mensal" (projection for full month assuming current status), we usually assume:
        // If currently ACTIVE, assume active until end of cycle.
        // If currently INACTIVE, use deactivatedAt.
        let effectiveEnd;
        if (access.status === 'ACTIVE') {
            effectiveEnd = cycle.cycleEnd;
        }
        else {
            // If inactive, check if it was deactivated within this cycle
            effectiveEnd = (access.deactivatedAt && access.deactivatedAt < cycle.cycleEnd)
                ? access.deactivatedAt
                : cycle.cycleEnd;
        }
        // Ensure effectiveEnd is not before effectiveStart (defensive)
        if (effectiveEnd < effectiveStart)
            return 0;
        // Calculate days difference
        // Add 1 because both start and end dates are inclusive/counted
        const diffTime = Math.abs(effectiveEnd.getTime() - effectiveStart.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        // "Same day" rule is naturally covered if diffTime is small but we count +1 inclusive.
        // E.g. Start 10th, End 10th. Diff = 0. Days = 1. Correct.
        return diffDays;
    },
    calculateEstimate(activePatients) {
        const cycle = this.getCurrentCycle();
        const dailyRate = this.calculateDailyRate(cycle.pricePerMonth, cycle.daysInCycle);
        const details = activePatients.map(patient => {
            const activeDays = this.calculateActiveDays(patient, cycle);
            const subtotal = activeDays * dailyRate;
            return {
                patientId: patient.patientId,
                patientName: patient.patientName,
                activeDays,
                dailyRate,
                subtotal
            };
        });
        const total = details.reduce((acc, curr) => acc + curr.subtotal, 0);
        return { total, details };
    }
};
