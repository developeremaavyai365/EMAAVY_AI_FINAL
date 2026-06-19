'use client';

import { motion } from 'framer-motion';

/* ─── Animation helpers ──────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

/* ─── Feature data ───────────────────────────────────────────────────────── */
const FEATURES = [
  {
    title: 'Guaranteed Enterprise SLAs',
    body: 'Mission-critical availability guarantees backed by dedicated infrastructure capacity to scale your automated workflows flawlessly.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
    accent: '#6366f1',
    accentBg: '#f0f0fe',
  },
  {
    title: 'Dedicated Solutions Engineering',
    body: 'Direct, hands-on support from senior AI architecture experts to map, integrate, and launch your complex workflows in record time.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07" />
      </svg>
    ),
    accent: '#0891b2',
    accentBg: '#ecfeff',
  },
  {
    title: 'Advanced Governance & Security',
    body: 'Enterprise-grade single sign-on (SSO), secure OAuth2 integrations, and granular role-based access controls (RBAC) for your agent ecosystem.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    accent: '#7c3aed',
    accentBg: '#f5f3ff',
  },
  {
    title: 'Sub-100ms Execution Engine',
    body: 'Engineered on a high-throughput architecture to orchestrate millions of concurrent data steps and agent actions with near-zero latency.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    accent: '#059669',
    accentBg: '#ecfdf5',
  },
  {
    title: 'Deterministic Execution Guardrails',
    body: 'Real-time semantic filtering and operational boundaries that completely eliminate hallucinations and keep your autonomous agents perfectly aligned.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    accent: '#d97706',
    accentBg: '#fffbeb',
  },
  {
    title: 'Regulatory Compliance Stack',
    body: 'Built from the ground up to satisfy rigorous data privacy standards, fully aligning with SOC 2, HIPAA, and global security benchmarks.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 15l2 2 4-4" strokeWidth="1.8" />
      </svg>
    ),
    accent: '#0f766e',
    accentBg: '#f0fdfa',
  },
];

/* ─── Feature card ───────────────────────────────────────────────────────── */
function FeatureCard({
  title,
  body,
  icon,
  accent,
  accentBg,
  delay,
}: (typeof FEATURES)[number] & { delay: number }) {
  return (
    <motion.div
      variants={fadeUp(delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-48px' }}
      className="group flex flex-col"
    >
      {/* Icon badge */}
      <div
        className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{ background: accentBg, color: accent }}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="mb-2 text-[15px] font-semibold leading-snug text-slate-900">
        {title}
      </h3>

      {/* Body */}
      <p className="text-sm leading-relaxed text-slate-500">{body}</p>
    </motion.div>
  );
}

/* ─── Main section ───────────────────────────────────────────────────────── */
export default function EnterpriseCapabilities() {
  return (
    <section className="py-16 lg:py-20" style={{ background: '#f7f9ff', borderTop: '1px solid rgba(99,102,241,0.08)' }}>
      <div className="site-container">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:items-start md:gap-12">

          {/* ── Left sticky text block ── */}
          <motion.div
            className="md:col-span-4 md:sticky md:top-28"
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-600">
              Built for the Future of Work
            </p>

            <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 md:text-5xl">
              Production&#8209;grade infrastructure for autonomous operations.
            </h2>

            <p className="mt-4 max-w-sm text-lg leading-relaxed text-slate-600">
              Deploy intelligent, multi-step AI agents and complex business workflows with the security, speed, and governance your enterprise requires.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-700 hover:shadow-md"
              >
                Talk to Sales
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-3 text-[13px] font-semibold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
              >
                View Security Docs
                <svg className="h-3.5 w-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Trust micro-badges */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              {['SOC 2', 'HIPAA', 'GDPR', 'ISO 27001'].map(badge => (
                <span
                  key={badge}
                  className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-semibold text-slate-600"
                >
                  <svg className="h-2.5 w-2.5 text-emerald-500" viewBox="0 0 10 10" fill="currentColor">
                    <path d="M5 0L6.12 3.38H9.51L6.7 5.47 7.82 8.85 5 6.76 2.18 8.85 3.3 5.47.49 3.38H3.88z" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Right feature grid ── */}
          <div className="md:col-span-8">
            <div className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2">
              {FEATURES.map((feat, i) => (
                <FeatureCard key={feat.title} {...feat} delay={0.06 + i * 0.07} />
              ))}
            </div>

            {/* Bottom divider + stat row */}
            <motion.div
              className="mt-16 grid grid-cols-3 gap-6 pt-10"
              style={{ borderTop: '1px solid rgba(99,102,241,0.12)' }}
              variants={fadeUp(0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {[
                { val: '99.99%',   label: 'guaranteed uptime SLA' },
                { val: '<100ms',   label: 'p95 orchestration latency' },
                { val: '24 / 7',   label: 'dedicated support coverage' },
              ].map(s => (
                <div key={s.val} className="flex flex-col">
                  <span className="font-display text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                    {s.val}
                  </span>
                  <span className="mt-1 text-[13px] text-slate-500">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
