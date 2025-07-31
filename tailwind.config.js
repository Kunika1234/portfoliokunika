/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#bd4289',      // Pink/Magenta
        secondary: '#7051ae',    // Purple
        accent: '#d15a9e',       // Light Pink
        highlight: '#8a6bb8',    // Light Purple
        surface: '#bd4289',      // Pink/Magenta
        muted: '#a03a7a',        // Darker Pink
        purple: '#7051ae',       // Purple
        pink: '#bd4289',         // Pink/Magenta
        black: '#000000',
        white: '#FFFFFF',
        glass: 'rgba(255, 255, 255, 0.1)', // White glass
        glassHover: 'rgba(255, 255, 255, 0.15)',
        glassDark: 'rgba(255, 255, 255, 0.05)',
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
        'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      }
    },
  },
  plugins: [],
};