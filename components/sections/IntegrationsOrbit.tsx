'use client';

import { useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────────
   INTEGRATION LOGOS — SVG icons with brand colors
   ───────────────────────────────────────────────────────────────────────────── */
const LOGOS: { name: string; color: string; icon: React.ReactNode }[] = [
  {
    name: 'Twilio',
    color: '#F22F46',
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" />
        <circle cx="17" cy="17" r="4.5" fill="currentColor" />
        <circle cx="31" cy="17" r="4.5" fill="currentColor" />
        <circle cx="17" cy="31" r="4.5" fill="currentColor" />
        <circle cx="31" cy="31" r="4.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'OpenAI',
    color: '#10A37F',
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none">
        <path
          d="M24 4l17 10v20L24 44 7 34V14L24 4z"
          stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"
        />
        <path
          d="M24 13l9 5.2v10.6L24 34l-9-5.2V18.2L24 13z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: 'Salesforce',
    color: '#00A1E0',
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="currentColor">
        <ellipse cx="14" cy="30" rx="8" ry="9.5" />
        <ellipse cx="24.5" cy="19" rx="11" ry="12.5" />
        <ellipse cx="35" cy="28" rx="8" ry="9.5" />
        <ellipse cx="24.5" cy="36" rx="6.5" ry="7.5" />
      </svg>
    ),
  },
  {
    name: 'HubSpot',
    color: '#FF7A59',
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none">
        <circle cx="34" cy="13" r="6.5" fill="currentColor" />
        <circle cx="13" cy="27" r="8.5" fill="currentColor" />
        <circle cx="33" cy="33" r="7.5" fill="currentColor" />
        <line x1="20" y1="21" x2="29" y2="16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="20.5" y1="31" x2="26" y2="31" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Slack',
    color: '#E01E5A',
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none">
        <rect x="7"  y="20" width="8"  height="15" rx="4" fill="#E01E5A" />
        <rect x="7"  y="13" width="8"  height="8"  rx="4" fill="#E01E5A" />
        <rect x="21" y="7"  width="15" height="8"  rx="4" fill="#36C5F0" transform="rotate(90 28.5 11)" />
        <rect x="29" y="21" width="8"  height="15" rx="4" fill="#2EB67D" transform="rotate(180 33 28.5)" />
        <rect x="21" y="29" width="15" height="8"  rx="4" fill="#ECB22E" transform="rotate(270 28.5 33)" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    color: '#25D366',
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none">
        <circle cx="24" cy="24" r="20" fill="currentColor" />
        <path
          d="M15 33l2.8-8A10 10 0 1 1 24 34a10 10 0 0 1-5-1.3L15 33z"
          fill="white"
        />
        <path
          d="M19.5 22c.5 1 1.8 2.8 3.3 3.8 1.5 1 2.5 1 3 .4l1.2-1.2c.3-.3.8-.3 1.1 0l2.2 2.2c.3.3.3.8 0 1.1-.6.6-1.8 1.8-3.3 1.8-2.2 0-4.4-1.8-6.7-4.4-2.3-2.6-3.2-5.2-3.2-7.4 0-1.5 1-2.7 1.8-3.3.3-.3.8-.3 1.1 0l2.2 2.2c.3.3.3.8 0 1.1L21 20c-.6.5-.5 1 0 2z"
          fill="#25D366"
        />
      </svg>
    ),
  },
  {
    name: 'Deepgram',
    color: '#13EF93',
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="currentColor">
        <rect x="7"  y="6"  width="14" height="36" rx="4" />
        <rect x="27" y="16" width="14" height="26" rx="4" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: 'ElevenLabs',
    color: '#ffffff',
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="currentColor">
        <rect x="9"  y="8" width="11" height="32" rx="2.5" />
        <rect x="28" y="8" width="11" height="32" rx="2.5" />
      </svg>
    ),
  },
  {
    name: 'Zapier',
    color: '#FF4A00',
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M24 7v10M24 31v10M7 24h10M31 24h10M12.5 12.5l7 7M28.5 28.5l7 7M35.5 12.5l-7 7M21.5 28.5l-7 7" />
      </svg>
    ),
  },
  {
    name: 'Google',
    color: '#4285F4',
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none">
        <path d="M43.6 24.5c0-1.5-.1-3-.4-4.5H24v8.5h11C34.5 32 32 34.5 28.5 36v5h7.5C40.5 37 43.6 31.5 43.6 24.5z" fill="#4285F4" />
        <path d="M24 44c6.5 0 12-2 16-5.5l-7.5-5C30.5 35 27.5 36 24 36c-6 0-11-4-12.8-9.5H3.5v5.2C7.5 40 15 44 24 44z" fill="#34A853" />
        <path d="M11.2 26.5C10.8 25.2 10.5 23.6 10.5 22s.3-3.2.7-4.5V12.3H3.5C1.8 15.6 1 19.2 1 23s.8 7.4 2.5 10.7l7.7-7.2z" fill="#FBBC05" />
        <path d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.5-6.5C35.5 2.8 30 .5 24 .5 15 .5 7.5 5 3.5 12.3l7.7 5.7C13 12.5 18 9.5 24 9.5z" fill="#EA4335" />
      </svg>
    ),
  },
  {
    name: 'Anthropic',
    color: '#D97757',
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none">
        <path d="M12 38l12-28 12 28" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 28h14" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Calendly',
    color: '#006BFF',
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none">
        <rect x="6" y="12" width="36" height="30" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M6 21h36" stroke="currentColor" strokeWidth="2.5" />
        <path d="M15 7v8M33 7v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="32" r="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Stripe',
    color: '#635BFF',
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="currentColor">
        <path d="M22.5 17.5c0-1.8 1.5-2.5 3.8-2.5 3.4 0 7.7 1 10.5 2.8V9.4C34 8 30.5 7 26.2 7 18.8 7 14 10.9 14 18c0 10.8 15 9.1 15 13.7 0 2.1-1.8 2.8-4.3 2.8-3.7 0-8.5-1.5-12.2-3.6v8.6C15.5 41 19.5 42 23.7 42c7.6 0 12.8-3.7 12.8-11 .1-11.6-15-9.8-15-13.5z" />
      </svg>
    ),
  },
  {
    name: 'Zoom',
    color: '#2D8CFF',
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="currentColor">
        <rect x="4" y="14" width="28" height="20" rx="5" />
        <path d="M32 20l12-8v24l-12-8V20z" />
      </svg>
    ),
  },
  {
    name: 'Notion',
    color: '#e2e2e2',
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none">
        <rect x="8" y="5" width="32" height="38" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M15 15h12M15 22h18M15 29h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Shopify',
    color: '#96BF48',
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none">
        <path d="M33 10.5c0 0-.8-.1-2.2-.1-1 0-1.5.4-2 1.5-1 2.5-2.2 7.5-2.2 7.5H12L16 37l14 4 4-30.5z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="20" cy="39" r="2.5" fill="currentColor" />
        <circle cx="30" cy="39" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
];

/* ── Split into two rows ─────────────────────────────────────────────────── */
const ROW1 = LOGOS.slice(0, 8);
const ROW2 = LOGOS.slice(8);

/* ─────────────────────────────────────────────────────────────────────────────
   LOGO CARD
   ───────────────────────────────────────────────────────────────────────────── */
function LogoCard({ name, color, icon }: { name: string; color: string; icon: React.ReactNode }) {
  return (
    <motion.div
      className="group relative mx-2.5 flex h-[88px] w-[88px] shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
      whileHover={{ scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
    >
      {/* Icon — greyscale default, brand color on hover */}
      <div
        className="text-white/40 transition-all duration-300 group-hover:text-[var(--brand)]"
        style={{ '--brand': color } as React.CSSProperties}
      >
        {icon}
      </div>
      {/* Name — hidden until hover */}
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white/10 px-2 py-0.5 text-[9px] font-semibold text-white/60 opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
        {name}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MARQUEE ROW — Framer Motion rAF loop, pause on hover, zero hitch
   ───────────────────────────────────────────────────────────────────────────── */
function MarqueeRow({
  logos,
  reverse = false,
  speed = 55,            // px per second
}: {
  logos: typeof LOGOS;
  reverse?: boolean;
  speed?: number;
}) {
  /* Duplicate so the seam is always off-screen */
  const doubled = [...logos, ...logos];

  /* Track raw offset in a motion value — never triggers re-render.
     Reversed row starts at a negative offset so cards come in from the left. */
  const x = useMotionValue(reverse ? -1 : 0);
  const paused = useRef(false);

  /* Measure the width of ONE set of cards once mounted */
  const trackRef = useRef<HTMLDivElement>(null);
  const halfWidth = useRef(0);

  useAnimationFrame((_, delta) => {
    if (!trackRef.current) return;

    /* Lazily capture half-width (width of one full non-duplicated set) */
    if (halfWidth.current === 0) {
      halfWidth.current = trackRef.current.scrollWidth / 2;
    }

    const hw = halfWidth.current;
    if (hw === 0 || paused.current) return;

    const step = (speed * delta) / 1000;           // px to move this frame
    const current = x.get();

    if (!reverse) {
      /* Left-moving: 0 → -hw, then snap back to 0 */
      const next = current - step;
      x.set(next <= -hw ? next + hw : next);
    } else {
      /* Right-moving: 0 → +hw via negative start, snap */
      const next = current + step;
      x.set(next >= 0 ? next - hw : next);
    }
  });

  return (
    <div
      className="flex overflow-hidden py-3"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      <motion.div
        ref={trackRef}
        className="flex"
        style={{ x, willChange: 'transform' }}
      >
        {doubled.map((logo, i) => (
          <LogoCard key={`${logo.name}-${i}`} {...logo} />
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN SECTION
   ───────────────────────────────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } },
});

export default function IntegrationsOrbit() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: '#080f1e' }}>

      {/* Subtle radial glow behind content */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-20"
        style={{ background: 'radial-gradient(ellipse at center, #6366f155 0%, transparent 70%)' }}
      />

      <div className="site-container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8 md:items-center">

          {/* ── LEFT: sticky text block ── */}
          <motion.div
            className="md:col-span-4"
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.28em] text-indigo-400">
              Integrations
            </p>
            <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white lg:text-[46px]">
              API-first<br />by design.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-white/45">
              Connect to every telephony provider, LLM, speech engine, and business tool your team already uses — with a single unified API.
            </p>

            {/* Integration count badge */}
            <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-[13px] font-medium text-white/60">
                <span className="font-bold text-white">50+</span> integrations available
              </span>
            </div>
          </motion.div>

          {/* ── RIGHT: dual-row marquee ── */}
          <motion.div
            className="md:col-span-8"
            variants={fadeUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {/* Marquee tracks + hard-colour edge fades */}
            <div className="relative overflow-hidden">
              {/* Row 1 — moves left, speed 52 px/s */}
              <MarqueeRow logos={ROW1} reverse={false} speed={52} />

              <div className="h-2" />

              {/* Row 2 — moves right, slightly slower for visual depth */}
              <MarqueeRow logos={ROW2} reverse={true} speed={44} />

              {/* Left fade overlay */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-28 z-10"
                style={{
                  background: 'linear-gradient(to right, #080f1e 0%, transparent 100%)',
                }}
              />
              {/* Right fade overlay */}
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-28 z-10"
                style={{
                  background: 'linear-gradient(to left, #080f1e 0%, transparent 100%)',
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
