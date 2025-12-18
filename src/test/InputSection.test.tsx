import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputSection } from '../features/analysis/InputSection';

describe('InputSection', () => {
  const defaultProps = {
    input: '',
    setInput: vi.fn(),
    onAnalyze: vi.fn(),
    error: null,
    history: [],
    onClearHistory: vi.fn(),
    onLoadHistory: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the main heading', () => {
    render(<InputSection {...defaultProps} />);
    
    expect(screen.getByText(/caso clínico/i)).toBeInTheDocument();
  });

  it('should render textarea with placeholder', () => {
    render(<InputSection {...defaultProps} />);
    
    const textarea = screen.getByPlaceholderText(/compulsão alimentar/i);
    expect(textarea).toBeInTheDocument();
  });

  it('should call setInput when typing', () => {
    render(<InputSection {...defaultProps} />);
    
    const textarea = screen.getByPlaceholderText(/compulsão alimentar/i);
    fireEvent.change(textarea, { target: { value: 'test input' } });
    
    expect(defaultProps.setInput).toHaveBeenCalledWith('test input');
  });

  it('should disable analyze button when input is empty', () => {
    render(<InputSection {...defaultProps} />);
    
    const button = screen.getByRole('button', { name: /gerar análise/i });
    expect(button).toBeDisabled();
  });

  it('should enable analyze button when input has content', () => {
    render(<InputSection {...defaultProps} input="some text" />);
    
    const button = screen.getByRole('button', { name: /gerar análise/i });
    expect(button).not.toBeDisabled();
  });

  it('should call onAnalyze when button is clicked', () => {
    render(<InputSection {...defaultProps} input="some text" />);
    
    const button = screen.getByRole('button', { name: /gerar análise/i });
    fireEvent.click(button);
    
    expect(defaultProps.onAnalyze).toHaveBeenCalled();
  });

  it('should display character count', () => {
    render(<InputSection {...defaultProps} input="hello" />);
    
    expect(screen.getByText('5 caracteres')).toBeInTheDocument();
  });

  it('should display error message when error prop is set', () => {
    render(<InputSection {...defaultProps} error="Something went wrong" />);
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should render philosophy cards', () => {
    render(<InputSection {...defaultProps} />);
    
    expect(screen.getByText('Nutrição Clínica')).toBeInTheDocument();
    expect(screen.getByText('Atenção Plena')).toBeInTheDocument();
    expect(screen.getByText('Cuidado Integral')).toBeInTheDocument();
  });

  it('should not show history section when history is empty', () => {
    render(<InputSection {...defaultProps} />);
    
    expect(screen.queryByText(/histórico de consultas/i)).not.toBeInTheDocument();
  });

  it('should show history section when history has items', () => {
    const historyItem = {
      id: '1',
      date: Date.now(),
      input: 'test',
      result: {
        servingSize: '1 Test',
        calories: 100,
        virtues: [],
        vices: [],
        mainIngredients: [],
        vitamins: [],
        analysis: 'test',
        prescription: 'test',
      },
      clientName: 'Test Patient',
      concern: 'Test concern',
    };

    render(<InputSection {...defaultProps} history={[historyItem]} />);
    
    expect(screen.getByText(/histórico de consultas/i)).toBeInTheDocument();
  });
});
