'use client';

import { motion } from 'framer-motion';

/* ─── Testimonial ─────────────────────────────────────────────────────────── */

const TESTIMONIAL = {
  bold1: 'zero to production in two weeks',
  bold2: '100% of our inbound volume',
  bold3: 'resolution rates up 43%',
  full: [
    { text: 'We went from ', bold: false },
    { text: 'zero to production in two weeks', bold: true },
    { text: ', and ', bold: false },
    { text: '100% of our inbound volume', bold: true },
    { text: ' now runs through Emaavy. Our agents handle after-hours calls, multilingual queries, and lead routing — with ', bold: false },
    { text: 'resolution rates up 43%', bold: true },
    { text: ' and zero additional headcount.', bold: false },
  ],
  author: 'Priya Sharma',
  role: 'VP of Customer Operations',
  company: 'UrbanCart',
  initials: 'PS',
  avatarBg: '#0D2137',
};

/* ─── Enterprise clients ──────────────────────────────────────────────────── */

const CLIENTS: {
  name: string;
  tagline: string;
  icon: React.ReactNode;
}[] = [
  {
    name: 'Apex Global',
    tagline: 'Enterprise Solutions',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
        <polygon points="16,3 29,26 3,26" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" fill="none"/>
        <line x1="16" y1="10" x2="16" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="16" cy="23" r="1.2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'Vanguard Tech',
    tagline: 'Deep Tech Infrastructure',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
        <path d="M4 10 L16 4 L28 10 L28 22 L16 28 L4 22 Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" fill="none"/>
        <path d="M4 10 L16 16 L28 10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="16" y1="16" x2="16" y2="28" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: 'Nova Health',
    tagline: 'Healthcare AI',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2.2" fill="none"/>
        <line x1="16" y1="9" x2="16" y2="23" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="9" y1="16" x2="23" y2="16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'FinSphere',
    tagline: 'Financial Intelligence',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2.2" fill="none"/>
        <path d="M16 9 C19.5 9 22 11 22 13.5 C22 18 16 16 16 20.5 C16 23 18.5 24 20 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <line x1="16" y1="7" x2="16" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="16" y1="24" x2="16" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Quantum Logistics',
    tagline: 'Supply Chain AI',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
        <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="2.2" fill="none"/>
        <rect x="18" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="2.2" fill="none"/>
        <rect x="5" y="18" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="2.2" fill="none"/>
        <rect x="18" y="18" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="2.2" fill="none"/>
        <circle cx="16" cy="16" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'Acme Corp',
    tagline: 'Industrial Automation',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
        <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="2.2" fill="none"/>
        {[0,45,90,135,180,225,270,315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 16 + 7 * Math.cos(rad);
          const y1 = 16 + 7 * Math.sin(rad);
          const x2 = 16 + 12 * Math.cos(rad);
          const y2 = 16 + 12 * Math.sin(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>;
        })}
        <circle cx="16" cy="16" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: 'Meridian Bank',
    tagline: 'Banking & Wealth',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
        <line x1="4" y1="12" x2="28" y2="12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="16" y1="5" x2="16" y2="12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="7" y1="12" x2="7" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="13" y1="12" x2="13" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="19" y1="12" x2="19" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="25" y1="12" x2="25" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="4" y1="23" x2="28" y2="23" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="4" y1="26" x2="28" y2="26" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Orion Retail',
    tagline: 'Commerce Intelligence',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
        <circle cx="16" cy="10" r="5" stroke="currentColor" strokeWidth="2.2" fill="none"/>
        <path d="M6 28 C6 22 26 22 26 28" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
        <line x1="10" y1="18" x2="22" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    name: 'Stellar Media',
    tagline: 'Media & Publishing',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
        <polygon points="16,4 19.5,13 29,13 21.5,18.5 24.5,28 16,22.5 7.5,28 10.5,18.5 3,13 12.5,13" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  {
    name: 'ClearPath EDU',
    tagline: 'EdTech Platform',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
        <path d="M4 13 L16 7 L28 13 L16 19 Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" fill="none"/>
        <path d="M8 16 L8 23 C8 23 12 26 16 26 C20 26 24 23 24 23 L24 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="28" y1="13" x2="28" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'IronBridge',
    tagline: 'Infrastructure & SRE',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
        <path d="M4 24 Q16 8 28 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
        <line x1="4" y1="24" x2="28" y2="24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="10" y1="24" x2="12" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="16" y1="24" x2="16" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="22" y1="24" x2="20" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'PeakForce',
    tagline: 'HR & Workforce AI',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden>
        <polyline points="4,24 10,14 16,18 22,8 28,12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <polyline points="22,8 28,8 28,14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
];



/* ─── Fade-up animation variant ──────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0  },
};

/* ─── Component ────────────────────────────────────────────────────────────── */

export default function TrustedBy() {
  return (
    <section className="bg-white py-20 lg:py-28" style={{ borderBottom: '1px solid rgba(99,102,241,0.08)' }}>
      <div className="site-container">

        {/* ── Two-column: quote LEFT + logos RIGHT ── */}
        <div className="flex flex-col gap-14 lg:flex-row lg:gap-20">

          {/* ── LEFT: Highlighted testimonial card ── */}
          <motion.div
            className="flex flex-col justify-between lg:w-[52%]"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Quote mark */}
            <div>
              <svg
                className="mb-6 h-10 w-10 text-gray-200"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden
              >
                <path d="M10 8C5.6 8 2 11.6 2 16v8h8v-8H6c0-2.2 1.8-4 4-4V8zm16 0c-4.4 0-8 3.6-8 8v8h8v-8h-4c0-2.2 1.8-4 4-4V8z" />
              </svg>

              {/* Blockquote with bold highlights */}
              <blockquote className="text-[22px] font-medium leading-[1.55] tracking-tight text-gray-800 sm:text-[26px] lg:text-[28px]">
                &ldquo;
                {TESTIMONIAL.full.map((seg, i) =>
                  seg.bold ? (
                    <strong key={i} className="font-bold text-gray-950">
                      {seg.text}
                    </strong>
                  ) : (
                    <span key={i}>{seg.text}</span>
                  )
                )}
                &rdquo;
              </blockquote>
            </div>

            {/* Author */}
            <div className="mt-8 flex items-center gap-4">
              {/* Avatar */}
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ background: TESTIMONIAL.avatarBg }}
              >
                {TESTIMONIAL.initials}
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {TESTIMONIAL.author}
                </p>
                <p className="text-sm text-gray-500">
                  {TESTIMONIAL.role},{' '}
                  <span className="font-medium text-gray-700">
                    {TESTIMONIAL.company}
                  </span>
                </p>
              </div>

              {/* Divider + company name chip */}
              <div className="ml-4 hidden items-center gap-2 sm:flex">
                <div className="h-6 w-px bg-gray-200" />
                <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                  {TESTIMONIAL.company}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Trusted at enterprise scale ── */}
          <motion.div
            className="lg:w-[48%]"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400">
              Trusted at enterprise scale
            </p>

            {/* Enterprise client grid — 2-col mobile, 3-col desktop, greyscale */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
              {CLIENTS.map((client, i) => (
                <motion.div
                  key={client.name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  className="group flex flex-col items-center justify-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50 px-4 py-5 opacity-50 grayscale transition-all duration-300 hover:border-gray-200 hover:bg-white hover:opacity-100 hover:grayscale-0 hover:shadow-md"
                >
                  {/* SVG icon mark */}
                  <div className="text-gray-700 transition-colors duration-300 group-hover:text-gray-900">
                    {client.icon}
                  </div>
                  {/* Company name */}
                  <p className="text-center text-[12px] font-bold leading-tight tracking-tight text-gray-700 transition-colors duration-300 group-hover:text-gray-950">
                    {client.name}
                  </p>
                  {/* Tagline */}
                  <p className="text-center text-[9.5px] font-medium uppercase tracking-wider text-gray-400 transition-colors duration-300 group-hover:text-gray-500">
                    {client.tagline}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
