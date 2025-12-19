import React from 'react';
import { cn } from './Layout';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'premium' | 'flat';
}

export const Card: React.FC<CardProps> = ({ className, variant = 'default', ...props }) => {
    const variants = {
        default: 'bg-white border border-neutral-200 shadow-soft',
        premium: 'bg-white/80 backdrop-blur-md border border-neutral-200/50 shadow-premium',
        flat: 'bg-neutral-100 border border-neutral-200',
    };

    return (
        <div
            className={cn(
                'rounded-[2rem] p-8 transition-all',
                variants[variant],
                className
            )}
            {...props}
        />
    );
};
