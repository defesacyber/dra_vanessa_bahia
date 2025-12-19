import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from "react";
export class ErrorBoundary extends Component {
    constructor() {
        super(...arguments);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(_) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        // TODO: Send to Sentry
    }
    render() {
        if (this.state.hasError) {
            return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-stone-100 text-stone-800 p-10 text-center font-serif", children: _jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold mb-4", children: "O Caos Prevaleceu" }), _jsx("p", { className: "text-lg mb-6", children: "Algo deu errado filosoficamente. A entropia aumentou." }), _jsx("button", { onClick: () => window.location.reload(), className: "bg-stone-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-stone-800 transition-all", children: "Tentar Novamente (Eterno Retorno)" })] }) }));
        }
        return this.props.children;
    }
}
