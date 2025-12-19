/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#162C1C', // Verde profundo (Primário)
          600: '#67743F', // Verde oliva (Destaque)
        },
        neutral: {
          50: '#FEF7E2',  // Creme claro (Fundo)
          100: '#FDFBE8', // Creme vibrante
          200: '#E6E0CE', // Bege/Stone
          300: '#C1BFAC', // Areia
        },
        // Mapeamento semântico legado/facilitação
        tempera: {
          deep: '#162C1C',
          olive: '#67743F',
          ivory: '#FEF7E2',
          light: '#FDFBE8',
          stone: '#E6E0CE',
          sand: '#C1BFAC',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
      boxShadow: {
        'premium': '0 20px 50px -12px rgba(22, 44, 28, 0.08)',
        'soft': '0 8px 30px rgba(0, 0, 0, 0.03)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
