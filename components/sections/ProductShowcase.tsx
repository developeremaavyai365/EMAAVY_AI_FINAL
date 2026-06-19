'use client';

import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

/* ─── Inline feature list ────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <circle cx="10" cy="10" r="8" />
        <path d="M10 6v4l2.5 2.5" />
      </svg>
    ),
    title: 'Real-time observability',
    body: 'Trace every agent action, data hop, and decision edge across your live workflows — millisecond by millisecond.',
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <polygon points="10 2 12.9 7.9 19.5 8.9 14.8 13.5 15.9 20 10 17 4.1 20 5.2 13.5 0.5 8.9 7.1 7.9 10 2" />
      </svg>
    ),
    title: 'Continuous quality scoring',
    body: 'Automatically score every agent run for accuracy, latency, and safety — then surface regressions before they reach production.',
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <rect x="2" y="3" width="16" height="10" rx="1.5" />
        <path d="M7 17h6M10 13v4" />
      </svg>
    ),
    title: 'One-click deployment pipeline',
    body: 'Promote agents from sandbox to production in a single action — full version control, rollback, and audit trail included.',
  },
];

/* ─── HUD metrics ────────────────────────────────────────────────────────── */
const HUD = [
  { label: 'Active Agents', val: '1,284', delta: '+12%',  up: true },
  { label: 'Avg Latency',   val: '87ms',  delta: '−6ms',  up: true },
  { label: 'Success Rate',  val: '99.7%', delta: '+0.2%', up: true },
  { label: 'Alerts',        val: '0',     delta: 'clear', up: true },
];

/* ─── System status pills ────────────────────────────────────────────────── */
const STATUS = ['Workflow Engine', 'Memory Layer', 'Telephony'];

export default function ProductShowcase() {
  return (
    <section
      className="bg-slate-50/50 py-20 md:py-28"
      style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}
    >
      <div className="site-container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* ══════════════════════════════════════════════════════════════
              LEFT — App-frame video block  (7 cols)
          ══════════════════════════════════════════════════════════════ */}
          <motion.div
            className="lg:col-span-7"
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {/* Ambient glow halo behind frame */}
            <div className="relative">
              <div
                className="absolute -inset-px rounded-[22px] opacity-30 blur-2xl"
                style={{
                  background:
                    'linear-gradient(135deg,#6366f155 0%,#0891b233 50%,#6366f133 100%)',
                }}
              />

              {/* App window */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-slate-900 shadow-2xl">

                {/* ── Title bar ── */}
                <div
                  className="flex items-center gap-2 border-b px-4 py-[11px]"
                  style={{
                    background: '#0f1117',
                    borderColor: 'rgba(255,255,255,0.07)',
                  }}
                >
                  {/* Traffic-light dots */}
                  <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
                  <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
                  <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />

                  {/* Fake URL bar */}
                  <div className="mx-3 flex flex-1 items-center gap-2 rounded-md bg-white/5 px-3 py-1.5">
                    <svg
                      className="h-3 w-3 shrink-0 text-white/25"
                      fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span className="select-none text-[11px] font-medium tracking-tight text-white/25">
                      app.emaavy.io / dashboard / live-monitor
                    </span>
                  </div>

                  {/* Live badge */}
                  <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-[5px]">
                    <span className="h-[6px] w-[6px] animate-pulse rounded-full bg-emerald-400" />
                    <span className="text-[10px] font-bold text-emerald-400">LIVE</span>
                  </div>
                </div>

                {/* ── Video layer ── */}
                <div className="relative aspect-[16/9] w-full bg-slate-950">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover opacity-90"
                    src="https://assets.mixkit.co/videos/preview/mixkit-dashboard-analytics-screen-with-charts-and-bars-41764-large.mp4"
                  />

                  {/* Depth vignette */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg,rgba(15,17,23,0.38) 0%,transparent 28%,transparent 68%,rgba(15,17,23,0.55) 100%)',
                    }}
                  />

                  {/* ── HUD metrics overlay ── */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
                    {HUD.map(m => (
                      <div
                        key={m.label}
                        className="flex flex-col gap-0.5 rounded-xl border border-white/10 bg-black/55 px-3 py-2.5 backdrop-blur-md"
                      >
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-white/40">
                          {m.label}
                        </span>
                        <span className="text-[18px] font-bold tabular-nums leading-none text-white">
                          {m.val}
                        </span>
                        <span className={`text-[9px] font-semibold ${m.up ? 'text-emerald-400' : 'text-red-400'}`}>
                          {m.delta}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Status bar ── */}
                <div
                  className="flex items-center justify-between px-4 py-2.5"
                  style={{
                    background: '#0f1117',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div className="flex items-center gap-5">
                    {STATUS.map(s => (
                      <div key={s} className="flex items-center gap-1.5">
                        <span className="h-[6px] w-[6px] rounded-full bg-emerald-400" />
                        <span className="text-[10px] text-white/30">{s}</span>
                      </div>
                    ))}
                  </div>
                  <span className="font-mono text-[10px] text-white/20">v3.1.4 · prod</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT — Copy + feature list  (5 cols)
          ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5">

            {/* Header badge */}
            <motion.div
              variants={fadeUp(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2"
            >
              <svg
                className="h-4 w-4 text-indigo-500"
                viewBox="0 0 20 20" fill="none" stroke="currentColor"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              >
                <polygon points="10 2 12.6 7.3 18.5 8.2 14.2 12.3 15.2 18.2 10 15.5 4.8 18.2 5.8 12.3 1.5 8.2 7.4 7.3 10 2" />
              </svg>
              <span className="text-[12px] font-bold uppercase tracking-widest text-indigo-600">
                Agent Intelligence
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={fadeUp(0.12)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="mb-6 font-display text-4xl font-bold leading-none tracking-tight text-slate-900 md:text-5xl"
            >
              Ship better<br />agents. Faster.<br />
              <span className="text-indigo-500">Every time.</span>
            </motion.h2>

            {/* Value prop */}
            <motion.p
              variants={fadeUp(0.16)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="mb-10 text-base leading-relaxed text-slate-500 md:text-lg"
            >
              Track exactly what happens across every data channel, surface operational anomalies instantly, and continuously optimize the autonomous experiences driving your business forward.
            </motion.p>

            {/* Feature list */}
            <div className="space-y-7">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  variants={fadeUp(0.2 + i * 0.08)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-48px' }}
                  className="flex gap-4"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors duration-200 group-hover:bg-indigo-50 group-hover:text-indigo-600">
                    {f.icon}
                  </div>
                  <div>
                    <p className="mb-1 text-[15px] font-semibold text-slate-900">{f.title}</p>
                    <p className="text-sm leading-relaxed text-slate-500">{f.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA row */}
            <motion.div
              variants={fadeUp(0.44)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-700 hover:shadow-md"
              >
                See it live
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.3} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-[13px] font-semibold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
              >
                Read the docs
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
