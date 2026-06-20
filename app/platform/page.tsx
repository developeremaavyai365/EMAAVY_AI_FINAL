'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DevMasteryCanvas from '@/components/sections/DevMasteryCanvas';
import HowItWorks from '@/components/sections/HowItWorks';
import SystemArchitecture from '@/components/sections/SystemArchitecture';
import AgentsShowcase from '@/components/sections/AgentsShowcase';
import CampaignStudio from '@/components/sections/CampaignStudio';
import CallLifecycle from '@/components/sections/CallLifecycle';

/* ─── Shared animation variant ───────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  },
});


/* ═══════════════════════════════════════════════════════════════════════════════
   ROOT PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════════ */

export default function PlatformPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 1 — Unified Canvas Hero
            ══════════════════════════════════════════════════════════════════════ */}
        <section className="relative w-full min-h-[85vh] bg-[#060913] flex flex-col justify-center items-center overflow-hidden px-4 pt-32 pb-24 border-b border-slate-900">

          {/* Dynamic Liquid Horizon Gradient System */}
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">

            {/* Top shadow blend */}
            <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-[#060913] to-transparent z-10" />

            {/* Compressed Neon Copper Matrix Layer */}
            <motion.div
              initial={{ opacity: 0.6, scale: 0.95 }}
              animate={{ opacity: [0.6, 0.75, 0.6], scale: [0.95, 1.02, 0.95] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              <div className="w-[140%] h-[350px] md:h-[450px] bg-gradient-to-r from-amber-700/40 via-rose-900/60 to-red-800/40 opacity-70 blur-[120px] transform rotate-[-1deg]" />
            </motion.div>

            {/* Deep Ambient Indigo Base Underlay */}
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-indigo-950/30 blur-[140px] rounded-full" />

            {/* Bottom shadow out-blend */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#060913] to-transparent z-10" />
          </div>

          {/* Content canvas */}
          <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center">

            {/* Overline tracking badge */}
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-xs font-bold tracking-[0.3em] text-indigo-400/90 uppercase mb-5"
            >
              The Emaavy Operational Engine
            </motion.span>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05] max-w-4xl"
              style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
            >
              Build AI agents <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                that execute operations.
              </span>
            </motion.h1>

            {/* Engineering subtext */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="text-slate-400 font-normal text-base sm:text-lg md:text-xl max-w-2xl mt-6 tracking-normal leading-relaxed"
            >
              All the flexibility of a custom-coded architecture.{' '}
              <br className="hidden sm:inline" />
              None of the infrastructure deployment overhead.
            </motion.p>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full sm:w-auto"
            >
              <Link
                href="/book-demo"
                className="group relative w-full sm:w-auto px-8 py-3.5 bg-white text-black font-semibold text-sm rounded-lg transition-all duration-200 hover:bg-slate-100 active:scale-[0.98] shadow-lg shadow-white/5 overflow-hidden"
              >
                <span className="relative z-10">Start Building</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-slate-100 to-white transition-transform duration-300 z-0" />
              </Link>
              <Link
                href="#"
                className="w-full sm:w-auto px-8 py-3.5 bg-white/[0.03] text-slate-300 hover:text-white font-medium text-sm rounded-lg border border-white/10 hover:border-white/20 transition-all duration-200 backdrop-blur-md active:scale-[0.98]"
              >
                Explore Docs
              </Link>
            </motion.div>

            {/* Hero analytics footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease: 'easeOut' }}
              className="mt-20 grid grid-cols-2 gap-5 sm:grid-cols-4 w-full max-w-3xl"
            >
              {[
                { val: '<500ms', label: 'Median Round-trip Latency' },
                { val: '99.99%', label: 'Guaranteed Platform Uptime' },
                { val: '50+',    label: 'Native API Integrations' },
                { val: '48M+',   label: 'Orchestrated Executions' },
              ].map((s) => (
                <div
                  key={s.val}
                  className="rounded-2xl px-5 py-4 text-center"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <p className="text-2xl font-extrabold text-white">{s.val}</p>
                  <p className="mt-1.5 text-[11px] font-medium text-slate-500 leading-tight">{s.label}</p>
                </div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 2 — How It Works
            ══════════════════════════════════════════════════════════════════════ */}
        <HowItWorks />

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 3 — Developer-First Mastery Canvas
            ══════════════════════════════════════════════════════════════════════ */}
        <DevMasteryCanvas />

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 4 — Agent Fleet Showcase
            ══════════════════════════════════════════════════════════════════════ */}
        <AgentsShowcase />

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 5 — Campaign Studio
            ══════════════════════════════════════════════════════════════════════ */}
        <CampaignStudio />

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 6 — Call Lifecycle
            ══════════════════════════════════════════════════════════════════════ */}
        <CallLifecycle />

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 7 — System Architecture
            ══════════════════════════════════════════════════════════════════════ */}
        <SystemArchitecture />

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 6 — Final Handshake CTA Banner
            ══════════════════════════════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden py-28 lg:py-36"
          style={{ background: 'linear-gradient(150deg, #080d1a 0%, #0d1533 45%, #0a1128 100%)' }}
        >
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.18]"
              style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 65%)', filter: 'blur(110px)' }}
            />
            <div
              className="absolute -left-20 top-0 h-72 w-72 rounded-full opacity-[0.12]"
              style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 65%)', filter: 'blur(80px)' }}
            />
            <div
              className="absolute -bottom-10 right-0 h-64 w-64 rounded-full opacity-[0.10]"
              style={{ background: 'radial-gradient(circle, #0891b2 0%, transparent 65%)', filter: 'blur(70px)' }}
            />
          </div>

          <div className="site-container relative z-10 text-center">
            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-400">
                Ready to Deploy
              </p>
              <h2 className="mx-auto max-w-3xl font-display text-5xl font-bold leading-tight tracking-tight text-white lg:text-6xl">
                Launch your first agent today.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-slate-400">
                Join thousands of teams running production AI agents on Emaavy — no infrastructure overhead, no cold starts.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/book-demo"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/8"
                  style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.16)' }}
                >
                  Talk to Engineering Sales
                </Link>
                <Link
                  href="/book-demo"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-gray-900 shadow-xl transition-all hover:bg-gray-100 hover:shadow-2xl"
                >
                  Start Building
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Trust strip */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
                {['SOC 2 Type II', 'HIPAA BAA', 'GDPR', 'ISO 27001', '99.97% uptime SLA'].map((b) => (
                  <span key={b} className="flex items-center gap-1.5 text-[12px] text-slate-500">
                    <span className="text-indigo-400">✓</span>
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
