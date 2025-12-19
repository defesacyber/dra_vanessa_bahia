import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
export const Stepper = ({ currentStep, steps }) => {
    return (_jsxs("div", { className: "w-full py-4", children: [_jsxs("div", { className: "flex items-center justify-between relative", children: [_jsx("div", { className: "absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-stone-200 -z-10" }), steps.map((label, index) => {
                        const stepNumber = index + 1;
                        const isActive = stepNumber === currentStep;
                        const isCompleted = stepNumber < currentStep;
                        return (_jsxs("div", { className: "flex flex-col items-center group", children: [_jsx("div", { className: cn("w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-tempera-ivory", isActive && "border-tempera-olive text-tempera-olive scale-110 shadow-lg ring-4 ring-tempera-olive/10", isCompleted && "bg-tempera-olive border-tempera-olive text-white", !isActive && !isCompleted && "border-stone-300 text-stone-400"), children: isCompleted ? (_jsx(Check, { className: "w-6 h-6" })) : (_jsx("span", { className: cn("font-bold", isActive ? "text-lg" : "text-base"), children: stepNumber })) }), _jsx("span", { className: cn("absolute -bottom-8 text-xs font-medium uppercase tracking-wider transition-colors duration-300 w-32 text-center", isActive ? "text-emerald-700" : "text-stone-400"), 
                                    // Centering trick for labels
                                    style: {
                                        left: `${(index / (steps.length - 1)) * 100}%`,
                                        transform: 'translateX(-50%)',
                                        textAlign: 'center'
                                    }, children: _jsx("span", { className: cn(isActive ? "opacity-100 font-bold" : "opacity-0 md:opacity-100"), children: label }) })] }, label));
                    }), _jsx("div", { className: "absolute left-0 top-1/2 transform -translate-y-1/2 h-0.5 bg-tempera-olive transition-all duration-500 -z-10", style: { width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` } })] }), _jsx("div", { className: "h-8 md:h-6" }), " "] }));
};
