import { Component, ErrorInfo, ReactNode } from "react";

interface Props { children: ReactNode }
interface State { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // TODO: Send to Sentry
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-stone-100 text-stone-800 p-10 text-center font-serif">
          <div>
            <h1 className="text-4xl font-bold mb-4">O Caos Prevaleceu</h1>
            <p className="text-lg mb-6">Algo deu errado filosoficamente. A entropia aumentou.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-stone-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-stone-800 transition-all"
            >
              Tentar Novamente (Eterno Retorno)
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
