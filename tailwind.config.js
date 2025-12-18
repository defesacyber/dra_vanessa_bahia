/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tempera: {
          olive: '#556B55',   // Primary
          deep: '#2C3E2F',    // Secondary / Text
          gold: '#A67C52',    // Accent
          ivory: '#F5F1E8',   // Background
          cream: '#E8DCC8',   // Highlight
        },
        brand: {
          primary: 'var(--brand-primary, #1c1917)',
          accent: 'var(--brand-accent, #84cc16)',
          bg: 'var(--brand-bg, #fcfbf9)',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Crimson Text"', 'serif'], // Swapping sans for serif-ish body as primary
        body: ['"Crimson Text"', 'serif'],
      },
      animation: {
        'enter': 'enter-smooth 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        'slide-up': 'slide-up-fade 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
      },
      keyframes: {
        'enter-smooth': {
          '0%': { opacity: '0', transform: 'translateY(15px) scale(0.98)', filter: 'blur(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
        },
        'slide-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
