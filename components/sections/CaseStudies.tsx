'use client';

import { motion } from 'framer-motion';

/* ─── Shared fade-up variant ─────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

/* ─── Filter pill ────────────────────────────────────────────────────────── */
function Pill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/70 backdrop-blur-sm">
      {label}
    </span>
  );
}

/* ─── Play button ────────────────────────────────────────────────────────── */
function PlayButton({ label = 'Watch the case study' }: { label?: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 340, damping: 24 }}
      className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/8 px-5 py-2.5 backdrop-blur-sm transition-colors duration-200 hover:border-white/40 hover:bg-white/12"
    >
      {/* Circle play icon */}
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 transition-colors duration-200 group-hover:border-white/60 group-hover:bg-white/20">
        <svg className="h-3 w-3 translate-x-[1px] text-white" viewBox="0 0 12 12" fill="currentColor">
          <path d="M2.5 1.5l8 4.5-8 4.5V1.5z" />
        </svg>
      </span>
      <span className="text-[12px] font-semibold text-white/80 group-hover:text-white">{label}</span>
    </motion.button>
  );
}

/* ─── Read link ──────────────────────────────────────────────────────────── */
function ReadLink({ label = 'Read the case study' }: { label?: string }) {
  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 340, damping: 24 }}
      className="group inline-flex items-center gap-2 text-[12px] font-semibold text-white/60 transition-colors duration-200 hover:text-white"
    >
      {label}
      <svg
        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
        fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TIER 1 — Full-width hero case study card
   ═══════════════════════════════════════════════════════════════════════════ */
function HeroCard() {
  return (
    <motion.div
      variants={fadeUp(0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ scale: 1.005 }}
      transition={{ type: 'spring', stiffness: 200, damping: 28 }}
      className="group relative w-full overflow-hidden rounded-2xl border border-white/15"
      style={{ minHeight: 420 }}
    >
      {/* ── Background video layer ── */}
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity duration-700 group-hover:opacity-75"
        src="/automotive.mp4"
      />

      {/* ── Dark gradient mask ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(11,15,25,0.55) 0%, rgba(11,15,25,0.35) 50%, rgba(11,15,25,0.50) 100%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12 lg:p-16">

        {/* Top: logo + vertical tag */}
        <div className="flex items-start justify-between">
          <div>
            {/* Mock enterprise logo */}
            <div className="mb-2 inline-flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <p className="text-[15px] font-black uppercase tracking-[0.18em] text-white">
                  Apex Automotive
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
                  Enterprise · Automotive
                </p>
              </div>
            </div>
          </div>

          {/* Industry chip */}
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
            Featured
          </span>
        </div>

        {/* Centre: quote */}
        <div className="my-10 max-w-3xl">
          <svg className="mb-5 h-8 w-8 text-indigo-400/60" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="font-display text-2xl font-bold italic leading-snug tracking-tight text-white md:text-3xl lg:text-[34px]">
            &ldquo;We reached profitability due to this transformation. We&apos;re serving twice the customers we were before&hellip; while focusing on the most important part: the level of service.&rdquo;
          </p>
          <p className="mt-5 text-[13px] font-medium text-white/50">
            — Alejandro Maza, Chief Product Officer
          </p>
        </div>

        {/* Bottom: CTA + pills */}
        <div className="flex flex-wrap items-center gap-4">
          <PlayButton />
          <div className="h-4 w-px bg-white/15" />
          <div className="flex flex-wrap gap-2">
            <Pill label="Outbound Selling" />
            <Pill label="Inbound Support" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TIER 2 — Left sub-card: savings metric
   ═══════════════════════════════════════════════════════════════════════════ */
function MetricCard() {
  return (
    <motion.div
      variants={fadeUp(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-48px' }}
      whileHover={{ scale: 1.012, boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}
      transition={{ type: 'spring', stiffness: 200, damping: 28 }}
      className="group relative overflow-hidden rounded-2xl border border-white/15"
      style={{ minHeight: 340 }}
    >
      {/* Background video */}
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity duration-700 group-hover:opacity-75"
        src="/finance.mp4"
      />
      {/* Dark overlay mask */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(145deg, rgba(15,24,41,0.52) 0%, rgba(11,18,32,0.40) 40%, rgba(6,13,24,0.55) 100%)',
        }}
      />
      {/* Accent glow */}
      <div
        className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-35"
        style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between p-8">

        {/* Top: logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
            <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-black uppercase tracking-widest text-white">FinSphere</p>
            <p className="text-[9px] font-semibold uppercase tracking-widest text-white/35">Insurance · Finance</p>
          </div>
        </div>

        {/* Centre: metric callout */}
        <div className="my-6">
          <p
            className="font-display text-5xl font-black leading-none tracking-tight text-white lg:text-6xl"
            style={{ textShadow: '0 0 40px rgba(99,102,241,0.4)' }}
          >
            $10M+
          </p>
          <p className="mt-2 text-[13px] font-bold uppercase tracking-widest text-indigo-400">
            Saved Annually
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-white/45">
            Saved annually over one million automation runs — eliminating manual review queues across 14 regional offices.
          </p>
        </div>

        {/* Bottom: CTA + pills */}
        <div className="flex flex-col gap-3">
          <ReadLink />
          <div className="flex flex-wrap gap-2">
            <Pill label="Insurance" />
            <Pill label="Lead Qualification" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TIER 2 — Right sub-card: scale metric
   ═══════════════════════════════════════════════════════════════════════════ */
function ScaleCard() {
  return (
    <motion.div
      variants={fadeUp(0.18)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-48px' }}
      whileHover={{ scale: 1.012, boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}
      transition={{ type: 'spring', stiffness: 200, damping: 28 }}
      className="group relative overflow-hidden rounded-2xl border border-white/15"
      style={{ minHeight: 340 }}
    >
      {/* Background video */}
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity duration-700 group-hover:opacity-75"
        src="/ecommerce.mp4"
      />
      {/* Dark overlay mask */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(145deg, rgba(10,21,32,0.52) 0%, rgba(12,26,42,0.40) 40%, rgba(6,15,26,0.55) 100%)',
        }}
      />
      {/* Accent glow — cyan tint */}
      <div
        className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-35"
        style={{ background: 'radial-gradient(circle, #0891b2 0%, transparent 70%)' }}
      />

      {/* Animated waveform decoration */}
      <div className="pointer-events-none absolute right-6 top-6 flex items-end gap-[3px] opacity-20">
        {[14, 22, 10, 30, 18, 26, 12, 20, 28, 16].map((h, i) => (
          <div
            key={i}
            className="w-[3px] rounded-full bg-cyan-400"
            style={{ height: h, animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between p-8">

        {/* Top: logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
            <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-black uppercase tracking-widest text-white">Orion Retail</p>
            <p className="text-[9px] font-semibold uppercase tracking-widest text-white/35">Marketplace · E-commerce</p>
          </div>
        </div>

        {/* Centre: metric callout */}
        <div className="my-6">
          <p
            className="font-display text-5xl font-black leading-none tracking-tight text-white lg:text-6xl"
            style={{ textShadow: '0 0 40px rgba(8,145,178,0.4)' }}
          >
            1M+
          </p>
          <p className="mt-2 text-[13px] font-bold uppercase tracking-widest text-cyan-400">
            Actions / Month
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-white/45">
            1M+ automated workflow steps executed monthly across dozens of active Emaavy deployment instances at peak season.
          </p>
        </div>

        {/* Bottom: CTA + pills */}
        <div className="flex flex-col gap-3">
          <ReadLink />
          <div className="flex flex-wrap gap-2">
            <Pill label="Marketplace" />
            <Pill label="Staffing Automation" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
export default function CaseStudies() {
  return (
    <section
      className="py-24"
      style={{ background: '#080f1e', borderTop: '1px solid rgba(99,102,241,0.10)' }}
    >
      <div className="site-container">

        {/* ── Section header ── */}
        <motion.div
          className="mb-10"
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-indigo-400">
            Customer Success
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
              Real outcomes.<br />Real enterprises.
            </h2>
            <a
              href="#"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-[12px] font-semibold text-white/60 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:text-white"
            >
              View all case studies
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* ── Tier 1: hero card ── */}
        <HeroCard />

        {/* ── Tier 2: 2-col sub-grid ── */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <MetricCard />
          <ScaleCard />
        </div>

      </div>
    </section>
  );
}
