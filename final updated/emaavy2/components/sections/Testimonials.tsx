'use client';

import { HiStar } from 'react-icons/hi2';
import { AnimatedContent, SpotlightCard } from '@/components/reactbits';
import SectionHeader from '@/components/ui/SectionHeader';
import { TESTIMONIALS } from '@/lib/constants';

const PALETTE = [
  { bg: 'from-blue-500 to-blue-700', ring: 'ring-blue-200' },
  { bg: 'from-violet-500 to-violet-700', ring: 'ring-violet-200' },
  { bg: 'from-emaavy-bolt to-emaavy-deep', ring: 'ring-emaavy-bolt/20' },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-emaavy-surface">
      <div className="section-container">
        <AnimatedContent>
          <SectionHeader
            label="Testimonials"
            title="Trusted by Industry Leaders"
            subtitle="See why operations teams and founders choose Emaavy to power their automation and AI initiatives."
          />
        </AnimatedContent>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => {
            const palette = PALETTE[i % PALETTE.length];
            return (
              <AnimatedContent key={t.name} delay={i * 0.1}>
                <SpotlightCard className="glass-card flex h-full flex-col rounded-2xl p-8 transition-all duration-300 hover:shadow-brand-lg">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <HiStar key={j} className="h-4 w-4 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="mt-5 flex-1 text-base leading-relaxed text-emaavy-body">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="mt-8 flex items-center gap-4 border-t border-emaavy-border pt-6">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${palette.bg} ring-4 ${palette.ring} text-sm font-bold text-white`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-emaavy-deep">{t.name}</p>
                      <p className="text-sm text-emaavy-muted">
                        {t.role} · {t.company}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </AnimatedContent>
            );
          })}
        </div>

        {/* Social proof strip */}
        <AnimatedContent delay={0.3} className="mt-12">
          <div className="flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-emaavy-border bg-white p-6">
            {[
              { label: 'Average rating', value: '4.9/5' },
              { label: 'Enterprise clients', value: '200+' },
              { label: 'Customer retention', value: '97%' },
              { label: 'NPS score', value: '72' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-2xl font-bold text-emaavy-deep">{stat.value}</p>
                <p className="mt-0.5 text-xs font-medium text-emaavy-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
