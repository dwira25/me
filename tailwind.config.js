/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#05070f',
          900: '#0a0e1a',
          800: '#0f1424',
          700: '#161d33',
          600: '#1f283f',
        },
        slate: {
          750: '#293548',
        },
        accent: {
          cyan: '#22d3ee',
          blue: '#3b82f6',
          violet: '#8b5cf6',
        },
      },
      fontFamily: {
        display: ['"Sora"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(60% 50% at 50% 0%, rgba(34, 211, 238, 0.18) 0%, rgba(139, 92, 246, 0.10) 45%, rgba(5, 7, 15, 0) 100%)',
        'grid-pattern':
          'linear-gradient(to right, rgba(148, 163, 184, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(34, 211, 238, 0.35)',
        card: '0 20px 60px -20px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
        blob: 'blob 14s ease-in-out infinite',
        'spin-reverse': 'spin-reverse 22s linear infinite',
        'spin-slow-center': 'spin-slow-center 28s linear infinite',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', borderRadius: '9999px' },
          '33%': { transform: 'translate(24px, -32px) scale(1.08)', borderRadius: '40% 60% 60% 40% / 50% 40% 60% 50%' },
          '66%': { transform: 'translate(-18px, 18px) scale(0.94)', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
        },
        'spin-reverse': {
          from: { transform: 'translate(-50%, -50%) rotate(360deg)' },
          to: { transform: 'translate(-50%, -50%) rotate(0deg)' },
        },
        'spin-slow-center': {
          from: { transform: 'translate(-50%, -50%) rotate(0deg)' },
          to: { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
