import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#1a56db',
        emaavy: {
          deep:      '#18345d',
          bolt:      '#4a658b',
          steel:     '#5a7d9e',
          muted:     '#64748b',
          body:      '#334155',
          secondary: '#475569',
          surface:   '#f8fafc',
          accent:    '#f0f4f8',
          border:    '#e2e8f0',
        },
      },
      fontFamily: {
        display: ['var(--font-jakarta)', 'var(--font-clash)', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-general)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee':        'marquee 30s linear infinite',
        'marquee-rev':    'marquee-rev 34s linear infinite',
        'ping-slow':      'ping 2s cubic-bezier(0,0,0.2,1) infinite',
        'orb-drift-1':    'orbDrift1 18s ease-in-out infinite',
        'orb-drift-2':    'orbDrift2 22s ease-in-out infinite',
        'orb-drift-3':    'orbDrift3 26s ease-in-out infinite',
        'orb-drift-4':    'orbDrift4 20s ease-in-out infinite',
        'laser-trace':    'laserTrace 3s ease-in-out infinite',
        'laser-shimmer':  'laserShimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        marquee:       { '0%': { transform: 'translateX(0%)' },    '100%': { transform: 'translateX(-50%)' } },
        'marquee-rev': { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0%)' } },
        orbDrift1: {
          '0%,100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%':     { transform: 'translate(60px, -40px) scale(1.08)' },
          '66%':     { transform: 'translate(-30px, 50px) scale(0.95)' },
        },
        orbDrift2: {
          '0%,100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%':     { transform: 'translate(-70px, 30px) scale(1.05)' },
          '66%':     { transform: 'translate(40px, -60px) scale(1.1)' },
        },
        orbDrift3: {
          '0%,100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%':     { transform: 'translate(50px, 40px) scale(1.06)' },
        },
        orbDrift4: {
          '0%,100%': { transform: 'translate(0px, 0px) scale(1)' },
          '40%':     { transform: 'translate(-40px, -50px) scale(1.12)' },
          '70%':     { transform: 'translate(60px, 20px) scale(0.92)' },
        },
        laserTrace: {
          '0%,100%': { opacity: '0.85', transform: 'scaleX(1)' },
          '50%':     { opacity: '1',    transform: 'scaleX(1.01)' },
        },
        laserShimmer: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.10)',
      },
    },
  },
  plugins: [],
};

export default config;
