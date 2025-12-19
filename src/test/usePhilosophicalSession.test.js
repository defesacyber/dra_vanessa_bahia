import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePhilosophicalSession } from '../hooks/usePhilosophicalSession';
import { AppState } from '../types';
// Mock the geminiService
vi.mock('../services/geminiService', () => ({
    analyzeThought: vi.fn(),
}));
import { analyzeThought } from '../services/geminiService';
describe('usePhilosophicalSession', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });
    it('should initialize with correct default state', () => {
        const { result } = renderHook(() => usePhilosophicalSession());
        expect(result.current.state).toBe(AppState.INPUT);
        expect(result.current.input).toBe('');
        expect(result.current.result).toBeNull();
        expect(result.current.error).toBeNull();
        expect(result.current.history).toEqual([]);
    });
    it('should update input when setInput is called', () => {
        const { result } = renderHook(() => usePhilosophicalSession());
        act(() => {
            result.current.setInput('test thought');
        });
        expect(result.current.input).toBe('test thought');
    });
    it('should not analyze empty input', async () => {
        const { result } = renderHook(() => usePhilosophicalSession());
        await act(async () => {
            await result.current.handleAnalyze();
        });
        expect(result.current.state).toBe(AppState.INPUT);
        expect(analyzeThought).not.toHaveBeenCalled();
    });
    it('should handle successful analysis', async () => {
        const mockResult = {
            servingSize: '1 Worry',
            calories: 350,
            virtues: [],
            vices: [],
            mainIngredients: ['anxiety'],
            vitamins: [],
            analysis: 'Test analysis',
            prescription: 'Test prescription',
        };
        vi.mocked(analyzeThought).mockResolvedValue(mockResult);
        const { result } = renderHook(() => usePhilosophicalSession());
        act(() => {
            result.current.setInput('I am worried about the future');
        });
        await act(async () => {
            await result.current.handleAnalyze();
        });
        expect(result.current.state).toBe(AppState.RESULTS);
        expect(result.current.result).toEqual(mockResult);
        expect(result.current.error).toBeNull();
    });
    it('should handle analysis error', async () => {
        vi.mocked(analyzeThought).mockRejectedValue(new Error('API Error'));
        const { result } = renderHook(() => usePhilosophicalSession());
        act(() => {
            result.current.setInput('test thought');
        });
        await act(async () => {
            await result.current.handleAnalyze();
        });
        expect(result.current.state).toBe(AppState.INPUT);
        expect(result.current.result).toBeNull();
        expect(result.current.error).toBeTruthy();
    });
    it('should reset state correctly', async () => {
        const mockResult = {
            servingSize: '1 Worry',
            calories: 350,
            virtues: [],
            vices: [],
            mainIngredients: [],
            vitamins: [],
            analysis: 'Test',
            prescription: 'Test',
        };
        vi.mocked(analyzeThought).mockResolvedValue(mockResult);
        const { result } = renderHook(() => usePhilosophicalSession());
        act(() => {
            result.current.setInput('test');
        });
        await act(async () => {
            await result.current.handleAnalyze();
        });
        expect(result.current.state).toBe(AppState.RESULTS);
        act(() => {
            result.current.handleReset();
        });
        expect(result.current.state).toBe(AppState.INPUT);
        expect(result.current.input).toBe('');
        expect(result.current.result).toBeNull();
    });
    it('should clear history', () => {
        const { result } = renderHook(() => usePhilosophicalSession());
        act(() => {
            result.current.clearHistory();
        });
        expect(result.current.history).toEqual([]);
    });
});
