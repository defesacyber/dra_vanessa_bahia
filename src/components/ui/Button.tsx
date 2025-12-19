import React from 'react';
import { cn } from './Layout';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
    className,
    variant = 'primary',
    size = 'md',
    ...props
}) => {
    const variants = {
        primary: 'bg-brand-900 text-neutral-50 hover:bg-brand-600 shadow-premium',
        secondary: 'bg-brand-600 text-neutral-50 hover:bg-brand-900',
        outline: 'border-2 border-brand-900 text-brand-900 hover:bg-neutral-50',
        ghost: 'text-brand-900 hover:bg-neutral-200',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg font-medium',
    };

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center rounded-full transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none font-sans tracking-wide',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
};
