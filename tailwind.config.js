/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#70012B',      // Deep Red
        secondary: '#5D0124',    // Dark Red
        accent: '#4B011D',       // Wine
        highlight: '#380116',    // Plum
        surface: '#25000E',      // Deep Plum
        muted: '#130007',        // Near Black
        black: '#000000',
        white: '#FFFFFF',
        glass: 'rgba(112, 1, 43, 0.08)', // Subtle glass with primary
        glassHover: 'rgba(112, 1, 43, 0.15)',
        glassDark: 'rgba(61, 1, 36, 0.92)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
};