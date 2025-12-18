import React from 'react';
import { Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface StepperProps {
    currentStep: number;
    steps: string[];
}

export function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
    return (
        <div className="w-full py-4">
            <div className="flex items-center justify-between relative">
                {/* Progress Line Background */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-stone-200 -z-10" />

                {/* Steps */}
                {steps.map((label, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber === currentStep;
                    const isCompleted = stepNumber < currentStep;

                    return (
                        <div key={label} className="flex flex-col items-center group">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-tempera-ivory",
                                    isActive && "border-tempera-olive text-tempera-olive scale-110 shadow-lg ring-4 ring-tempera-olive/10",
                                    isCompleted && "bg-tempera-olive border-tempera-olive text-white",
                                    !isActive && !isCompleted && "border-stone-300 text-stone-400"
                                )}
                            >
                                {isCompleted ? (
                                    <Check className="w-6 h-6" />
                                ) : (
                                    <span className={cn("font-bold", isActive ? "text-lg" : "text-base")}>
                                        {stepNumber}
                                    </span>
                                )}
                            </div>

                            <span
                                className={cn(
                                    "absolute -bottom-8 text-xs font-medium uppercase tracking-wider transition-colors duration-300 w-32 text-center",
                                    isActive ? "text-emerald-700" : "text-stone-400"
                                )}
                                // Centering trick for labels
                                style={{
                                    left: `${(index / (steps.length - 1)) * 100}%`,
                                    transform: 'translateX(-50%)',
                                    textAlign: 'center'
                                }}
                            >
                                {/* Only show label for active or completed, or all if desktop? 
                    Let's show active label clearly, others muted */}
                                <span className={cn(isActive ? "opacity-100 font-bold" : "opacity-0 md:opacity-100")}>
                                    {label}
                                </span>
                            </span>
                        </div>
                    );
                })}

                {/* Active Progress Line Overlay */}
                <div
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 h-0.5 bg-tempera-olive transition-all duration-500 -z-10"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />
            </div>
            <div className="h-8 md:h-6" /> {/* Spacer for labels */}
        </div>
    );
};
