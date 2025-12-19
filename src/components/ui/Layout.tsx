import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge tailwind classes safely
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
    <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full', className)} {...props} />
);

export const Section: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, ...props }) => (
    <section className={cn('py-16 md:py-24', className)} {...props} />
);
