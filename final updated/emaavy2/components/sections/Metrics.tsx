'use client';

import { AnimatedContent, CountUp } from '@/components/reactbits';
import { METRICS } from '@/lib/constants';

const METRIC_DETAILS = [
  { eyebrow: 'Native', icon: '🔌' },
  { eyebrow: 'Monthly', icon: '⚡' },
  { eyebrow: 'Average', icon: '📈' },
  { eyebrow: 'Coverage', icon: '🤖' },
] as const;

export default function Metrics() {
  return (
    <section className="section-padding relative overflow-hidden bg-emaavy-deep">
      {/* Subtle background texture */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-emaavy-bolt/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(74,101,139,0.15)_0%,transparent_70%)]" />
      </div>

      <div className="section-container relative">
        <AnimatedContent className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Platform performance
          </p>
          <h2 className="font-display mt-2 text-3xl font-semibold text-white sm:text-4xl">
            Built for Scale. Proven by Results.
          </h2>
        </AnimatedContent>

        <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric, i) => {
            const detail = METRIC_DETAILS[i];
            return (
              <AnimatedContent key={metric.label} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                  {/* Subtle hover glow */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]" />
                  </div>

                  <div className="relative">
                    <span className="text-2xl">{detail.icon}</span>
                    <div className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
                      <CountUp
                        to={metric.value}
                        suffix={metric.suffix}
                        duration={2.5}
                        delay={i * 0.15}
                      />
                    </div>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/40">
                      {detail.eyebrow}
                    </p>
                    <p className="mt-2 text-sm font-medium text-white/70">{metric.label}</p>
                  </div>
                </div>
              </AnimatedContent>
            );
          })}
        </div>
      </div>
    </section>
  );
}
