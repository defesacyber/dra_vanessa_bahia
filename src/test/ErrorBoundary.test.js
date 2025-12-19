import { jsx as _jsx } from "react/jsx-runtime";
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../components/ErrorBoundary';
// Component that throws an error
const ThrowError = ({ shouldThrow }) => {
    if (shouldThrow) {
        throw new Error('Test error');
    }
    return _jsx("div", { children: "No error" });
};
describe('ErrorBoundary', () => {
    beforeEach(() => {
        // Suppress console.error for cleaner test output
        vi.spyOn(console, 'error').mockImplementation(() => { });
    });
    it('should render children when no error occurs', () => {
        render(_jsx(ErrorBoundary, { children: _jsx(ThrowError, { shouldThrow: false }) }));
        expect(screen.getByText('No error')).toBeInTheDocument();
    });
    it('should render error UI when error occurs', () => {
        render(_jsx(ErrorBoundary, { children: _jsx(ThrowError, { shouldThrow: true }) }));
        expect(screen.getByText(/caos prevaleceu/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /tentar novamente/i })).toBeInTheDocument();
    });
    it('should have a retry button', () => {
        render(_jsx(ErrorBoundary, { children: _jsx(ThrowError, { shouldThrow: true }) }));
        const retryButton = screen.getByRole('button', { name: /tentar novamente/i });
        expect(retryButton).toBeInTheDocument();
    });
});
