'use client';

/* Stats — "Everyday Calls. Extraordinary Outcomes." — light bg — exact Vapi style */

import { motion } from 'framer-motion';

const STATS = [
  { val: '2.5M+',     label: 'calls supported' },
  { val: '99.9%',     label: 'uptime for enterprise clients' },
  { val: '2.5M+',     label: 'agents launched' },
  { val: '750K+',     label: 'developers' },
  { val: '<500ms',    label: 'average latency' },
];

export default function Metrics() {
  return (
    <section className="section-py" style={{ background: 'linear-gradient(180deg, #f4f6ff 0%, #eef1ff 100%)' }}>
      <div className="site-container">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
            Everyday Calls. Extraordinary Outcomes.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:flex lg:flex-wrap lg:items-start lg:justify-center lg:gap-20">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="font-display text-3xl font-bold text-gray-900 lg:text-4xl">{s.val}</p>
              <p className="mt-2 text-sm text-gray-500">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
