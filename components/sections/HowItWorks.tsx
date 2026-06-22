'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    col: 1,
    row: 1,
    label: 'Connect your stack',
    desc: 'Link your CRM, calendar, and business tools — configure context and permissions as if you were building it yourself.',
    bg: '#6dc5b8',
    text: '#0a2e2a',
  },
  {
    col: 2,
    row: 2,
    label: 'Design your agent',
    desc: 'Set voice, personality, objection handling, and call flows. Choose from 200+ built-in models or plug in your own.',
    bg: '#b85c2c',
    text: '#fff',
  },
  {
    col: 3,
    row: 3,
    label: 'Deploy to any channel',
    desc: 'Go live on inbound, outbound, web, or SIP in minutes. One config, every touchpoint.',
    bg: '#9e9228',
    text: '#fff',
  },
  {
    col: 4,
    row: 3,
    label: 'Tune and observe',
    desc: 'Review transcripts, catch hallucinations, and tighten every interaction before they cost a deal.',
    bg: '#111111',
    text: '#fff',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#f9f9f7] border-b border-neutral-200">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-12 pt-12 md:pt-20 lg:pt-24 pb-10 md:pb-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400 mb-5"
        >
          How it works
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.07 }}
          className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] font-bold text-[#111111] leading-[1.06] tracking-tight"
        >
          From zero to revenue<br className="hidden sm:block" /> in minutes.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.14 }}
          className="mt-5 mx-auto max-w-md text-[17px] leading-relaxed text-neutral-500"
        >
          Deploy production-ready voice agents instantly, then customize every interaction as you scale.
        </motion.p>
      </div>

      {/* Mobile steps — simple 2-col grid on mobile, hidden on lg+ */}
      <div className="mx-auto max-w-7xl px-4 pb-10 lg:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STEPS.map((step) => (
            <motion.div
              key={step.col}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (step.col - 1) * 0.1 }}
              className="rounded-2xl p-6 flex flex-col gap-3"
              style={{ border: '1px solid #e5e4e0', background: '#fafaf8' }}
            >
              <p className="text-[10px] font-mono text-neutral-400 mb-1">
                {String(step.col).padStart(2, '0')}
              </p>
              <div>
                <span
                  className="inline-block px-4 py-2 rounded-xl text-[15px] font-semibold leading-snug"
                  style={{ background: step.bg, color: step.text }}
                >
                  {step.label}
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-neutral-400 mt-1">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop Grid — hidden on mobile */}
      <div className="mx-auto max-w-7xl px-0 pb-0 overflow-hidden hidden lg:block">
        {/*
          4 columns × 4 rows of equal cells separated by hairline borders.
          Each step card sits in its column, staggered one row lower.
        */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(4, minmax(180px, auto))',
            borderTop: '1px solid #e5e4e0',
            borderLeft: '1px solid #e5e4e0',
          }}
        >
          {Array.from({ length: 4 * 4 }).map((_, idx) => {
            const col = (idx % 4) + 1;   // 1-4
            const row = Math.floor(idx / 4) + 1; // 1-4

            const step = STEPS.find(s => s.col === col && s.row === row);

            return (
              <div
                key={idx}
                style={{
                  borderRight: '1px solid #e5e4e0',
                  borderBottom: '1px solid #e5e4e0',
                  gridColumn: col,
                  gridRow: row,
                  minHeight: 160,
                }}
                className="relative"
              >
                {step && (
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: (step.col - 1) * 0.1 }}
                    className="p-6 flex flex-col gap-3 h-full"
                  >
                    {/* Step number */}
                    <p className="text-[10px] font-mono text-neutral-400 mb-1">
                      {String(step.col).padStart(2, '0')}
                    </p>
                    {/* Rect label — rounded-xl not pill */}
                    <div>
                      <span
                        className="inline-block px-4 py-2 rounded-xl text-[15px] font-semibold leading-snug"
                        style={{ background: step.bg, color: step.text }}
                      >
                        {step.label}
                      </span>
                    </div>
                    {/* Description */}
                    <p className="text-[13px] leading-relaxed text-neutral-400 max-w-[230px] mt-1">
                      {step.desc}
                    </p>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
