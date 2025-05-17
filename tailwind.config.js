/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#4361EE', // Primary blue
          600: '#3730A3',
          700: '#312E81',
          800: '#1E1B4B',
          900: '#0F172A',
        },
        secondary: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#7209B7', // Secondary purple
          600: '#6D28D9',
          700: '#5B21B6',
          800: '#4C1D95',
          900: '#2E1065',
        },
        accent: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#F72585', // Accent pink
          600: '#DB2777',
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843',
        },
        dark: {
          100: '#1E1E2A',
          200: '#16161F',
          300: '#101016',
          400: '#0A0A0D',
        },
      },
      fontFamily: {
        sans: ['Rajdhani', 'system-ui', 'sans-serif'],
        heading: ['Orbitron', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        neon: '0 0 5px theme(colors.accent.400), 0 0 20px theme(colors.accent.500)',
        'neon-lg': '0 0 10px theme(colors.primary.400), 0 0 30px theme(colors.primary.500)',
        'neon-purple': '0 0 5px theme(colors.secondary.400), 0 0 20px theme(colors.secondary.500)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'glitch': 'glitch 2s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { 
            textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px theme(colors.primary.400), 0 0 20px theme(colors.primary.400)' 
          },
          '100%': { 
            textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px theme(colors.primary.500), 0 0 40px theme(colors.primary.500)'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glitch: {
          '0%, 100%': { clip: 'rect(0, 9999px, 2px, 0)' },
          '20%': { clip: 'rect(0, 9999px, 4px, 0)' },
          '40%': { clip: 'rect(0, 9999px, 1px, 0)' },
          '60%': { clip: 'rect(0, 9999px, 3px, 0)' },
          '80%': { clip: 'rect(0, 9999px, 5px, 0)' },
        },
      },
    },
  },
  plugins: [],
};