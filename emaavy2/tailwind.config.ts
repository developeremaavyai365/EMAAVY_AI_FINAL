import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        emaavy: {
          deep: '#18345d',
          bolt: '#4a658b',
          steel: '#5a7d9e',
          muted: '#64748b',
          body: '#334155',
          secondary: '#475569',
          surface: '#f8fafc',
          accent: '#f0f4f8',
          border: '#e2e8f0',
        },
      },
      fontFamily: {
        display: ['var(--font-clash)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-general)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #4a658b 0%, #18345d 100%)',
      },
      boxShadow: {
        brand: '0 8px 32px rgba(24, 52, 93, 0.12)',
        'brand-lg': '0 20px 50px rgba(24, 52, 93, 0.15)',
        glass: '0 8px 32px rgba(31, 38, 135, 0.08)',
      },
      animation: {
        'orbit-spin': 'orbit-spin 60s linear infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'flow-dash': 'flow-dash 2s linear infinite',
      },
      keyframes: {
        'orbit-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'flow-dash': {
          to: { strokeDashoffset: '-20' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
