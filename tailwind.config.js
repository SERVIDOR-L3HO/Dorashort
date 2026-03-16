/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#07070f',
          800: '#0e0e1a',
          700: '#141425',
          600: '#1c1c2e',
          500: '#252540',
        },
        brand: {
          primary: '#c026d3',
          secondary: '#7c3aed',
          accent: '#f43f5e',
          gold: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #07070f 0%, #1a0a2e 50%, #07070f 100%)',
        'card-gradient': 'linear-gradient(180deg, transparent 40%, rgba(7,7,15,0.95) 100%)',
        'brand-gradient': 'linear-gradient(135deg, #c026d3, #7c3aed)',
        'accent-gradient': 'linear-gradient(135deg, #f43f5e, #c026d3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      }
    },
  },
  plugins: [],
}
