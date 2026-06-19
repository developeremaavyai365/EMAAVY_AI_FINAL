'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiOutlinePlayCircle, HiOutlineArrowTopRightOnSquare } from 'react-icons/hi2';

const FEATURE_PILLS = [
  'Live Dashboard',
  'AI Agents',
  'Campaigns',
  'Conversation Flows',
  'Integrations',
];

export default function DemoShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-padding relative overflow-hidden bg-emaavy-surface">
      {/* Subtle radial background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-emaavy-bolt/5 blur-3xl" />
      </div>

      <div className="section-container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="section-label">Live Platform Demo</span>
          <h2 className="section-title text-balance">
            See the Full Emaavy Platform{' '}
            <span className="gradient-text">in Action</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Explore the real dashboard — click through AI agents, campaigns, conversation flows, integrations, and analytics. No sign-up required.
          </p>

          {/* Feature pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {FEATURE_PILLS.map((pill, i) => (
              <motion.span
                key={pill}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-emaavy-border bg-white px-3 py-1 text-xs font-medium text-emaavy-secondary shadow-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emaavy-bolt" />
                {pill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Premium showcase frame */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-14"
        >
          {/* Outer glow */}
          <div
            className="absolute -inset-px rounded-3xl opacity-60 blur-xl"
            style={{
              background:
                'linear-gradient(135deg, rgba(74,101,139,0.4) 0%, rgba(24,52,93,0.6) 50%, rgba(74,101,139,0.3) 100%)',
            }}
          />

          {/* Gradient border ring */}
          <div
            className="relative rounded-3xl p-[1.5px]"
            style={{
              background:
                'linear-gradient(135deg, rgba(74,101,139,0.7) 0%, rgba(24,52,93,0.9) 40%, rgba(74,101,139,0.5) 70%, rgba(148,179,218,0.6) 100%)',
            }}
          >
            {/* Inner card */}
            <div className="overflow-hidden rounded-[22px] bg-[#1C2B3A] shadow-[0_32px_80px_rgba(0,0,0,0.4)]">

              {/* Premium top chrome bar */}
              <div className="flex items-center justify-between gap-3 border-b border-white/5 bg-[#0f1f2e] px-5 py-3">
                <div className="flex items-center gap-3">
                  {/* Traffic lights */}
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                    <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                    <div className="h-3 w-3 rounded-full bg-[#28C840]" />
                  </div>
                  {/* URL bar */}
                  <div className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-1.5">
                    <svg className="h-3 w-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="font-mono text-xs text-white/40">app.emaavy.ai</span>
                  </div>
                </div>

                {/* Right: badges */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    <span className="text-[10px] font-medium text-white/40">Interactive Demo</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-white/50">
                    <HiOutlinePlayCircle className="h-3 w-3" />
                    Auto-playing
                  </div>
                </div>
              </div>

              {/* iFrame */}
              <div className="relative w-full" style={{ paddingBottom: '58%' }}>
                <iframe
                  src="/demo/emaavy_dashboard_demo.html"
                  title="Emaavy Platform Interactive Demo"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>

              {/* Bottom interaction hint */}
              <div className="flex items-center justify-between border-t border-white/5 bg-[#0f1f2e] px-5 py-2.5">
                <div className="flex items-center gap-1.5 text-[10px] text-white/30">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                  </svg>
                  Click any sidebar item to explore — cursor auto-navigates
                </div>
                <a
                  href="/demo/emaavy_dashboard_demo.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10px] text-white/30 transition-colors hover:text-white/60"
                >
                  <HiOutlineArrowTopRightOnSquare className="h-3 w-3" />
                  Open full screen
                </a>
              </div>
            </div>
          </div>

          {/* Corner accent dots */}
          <div className="pointer-events-none absolute -left-3 -top-3 h-6 w-6 rounded-full border border-emaavy-bolt/30 bg-emaavy-surface" />
          <div className="pointer-events-none absolute -right-3 -top-3 h-6 w-6 rounded-full border border-emaavy-bolt/30 bg-emaavy-surface" />
          <div className="pointer-events-none absolute -bottom-3 -left-3 h-6 w-6 rounded-full border border-emaavy-bolt/30 bg-emaavy-surface" />
          <div className="pointer-events-none absolute -bottom-3 -right-3 h-6 w-6 rounded-full border border-emaavy-bolt/30 bg-emaavy-surface" />
        </motion.div>

        {/* Below-frame CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="/book-demo"
            className="btn-primary px-6 py-3 text-sm"
          >
            Start Building
          </a>
          <a
            href="#contact"
            className="btn-secondary px-6 py-3 text-sm"
          >
            Get a Guided Demo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
