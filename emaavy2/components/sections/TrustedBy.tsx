'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { TRUSTED_LOGOS } from '@/lib/constants';

const DOUBLED = [...TRUSTED_LOGOS, ...TRUSTED_LOGOS, ...TRUSTED_LOGOS];

export default function TrustedBy() {
  return (
    <section className="border-y border-emaavy-border bg-emaavy-surface py-14 overflow-hidden">
      <div className="section-container mb-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-emaavy-muted">
          Trusted by forward-thinking teams worldwide
        </p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-emaavy-surface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-emaavy-surface to-transparent" />

        <motion.div
          className="flex gap-12"
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {DOUBLED.map((logo, i) => (
            <div
              key={`${logo}-${i}`}
              className="flex shrink-0 items-center gap-2 px-4"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emaavy-bolt/10">
                <span className="text-xs font-bold text-emaavy-bolt">
                  {logo.slice(0, 1)}
                </span>
              </div>
              <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-emaavy-muted/70 transition-all duration-300 hover:text-emaavy-bolt/90">
                {logo}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
