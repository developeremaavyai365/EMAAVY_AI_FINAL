'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedContent } from '@/components/reactbits';
import { HiArrowRight } from 'react-icons/hi2';

export default function FinalCTA() {
  return (
    <section id="contact" className="section-padding bg-emaavy-surface">
      <div className="section-container">
        <AnimatedContent>
          <div className="relative overflow-hidden rounded-3xl bg-emaavy-deep px-8 py-20 text-center md:px-16 md:py-28">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emaavy-bolt/20 blur-3xl" />
              <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(74,101,139,0.2)_0%,transparent_70%)]" />
              {/* Subtle grid */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
                  Start in minutes, not months
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl"
              >
                Ready To Scale With AI?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70"
              >
                Deploy AI agents, automate workflows, and connect your business in minutes.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-10 flex flex-wrap justify-center gap-4"
              >
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-emaavy-deep transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:shadow-white/10"
                >
                  Start Free
                  <HiArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                >
                  Book a Demo
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex flex-wrap justify-center gap-6 text-xs font-medium text-white/40"
              >
                {['No credit card required', 'Free 14-day trial', 'Cancel anytime'].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <svg className="h-3 w-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
