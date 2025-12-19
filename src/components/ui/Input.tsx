import React from 'react';
import { cn } from './Layout';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => (
        <div className="space-y-1.5 w-full">
            {label && (
                <label className="block text-sm font-medium text-brand-900 ml-1">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                className={cn(
                    'w-full bg-white/50 border border-neutral-300 rounded-2xl px-4 py-3 text-brand-900 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-600/20 focus:border-brand-600 transition-all font-sans',
                    error && 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
                    className
                )}
                {...props}
            />
            {error && (
                <p className="text-xs text-red-500 ml-1 font-sans">{error}</p>
            )}
        </div>
    )
);

Input.displayName = 'Input';
