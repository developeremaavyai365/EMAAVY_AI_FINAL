'use client';

import Link from 'next/link';
import { HiCheck } from 'react-icons/hi2';
import { AnimatedContent, GlareHover } from '@/components/reactbits';
import SectionHeader from '@/components/ui/SectionHeader';
import { PRICING_PLANS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Pricing() {
  return (
    <section id="pricing" className="section-padding bg-emaavy-surface">
      <div className="section-container">
        <AnimatedContent>
          <SectionHeader
            label="Pricing"
            title="Simple, Transparent Pricing"
            subtitle="Start free and scale as you grow. No hidden fees, no surprises."
          />
        </AnimatedContent>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {PRICING_PLANS.map((plan, i) => (
            <AnimatedContent key={plan.name} delay={i * 0.1}>
              <GlareHover
                className={cn(
                  'flex h-full flex-col rounded-2xl border p-8 transition-all duration-300',
                  plan.highlighted
                    ? 'border-emaavy-bolt bg-emaavy-deep text-white shadow-brand-lg scale-[1.02]'
                    : 'border-emaavy-border bg-white',
                )}
                glareColor={plan.highlighted ? '#ffffff' : '#4a658b'}
                glareOpacity={plan.highlighted ? 0.08 : 0.12}
              >
                {plan.highlighted && (
                  <span className="mb-4 inline-block w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                <h3
                  className={cn(
                    'text-xl font-semibold',
                    plan.highlighted ? 'text-white' : 'text-emaavy-deep',
                  )}
                >
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span
                    className={cn(
                      'font-display text-4xl font-bold',
                      plan.highlighted ? 'text-white' : 'text-emaavy-deep',
                    )}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={plan.highlighted ? 'text-white/60' : 'text-emaavy-muted'}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    'mt-3 text-sm',
                    plan.highlighted ? 'text-white/70' : 'text-emaavy-secondary',
                  )}
                >
                  {plan.description}
                </p>
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <HiCheck
                        className={cn(
                          'mt-0.5 h-4 w-4 shrink-0',
                          plan.highlighted ? 'text-emerald-400' : 'text-emaavy-bolt',
                        )}
                      />
                      <span className={plan.highlighted ? 'text-white/90' : 'text-emaavy-body'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#contact"
                  className={cn(
                    'mt-8 block rounded-lg py-3 text-center text-sm font-semibold transition-all',
                    plan.highlighted
                      ? 'bg-white text-emaavy-deep hover:bg-white/90'
                      : 'bg-brand-gradient text-white hover:shadow-brand',
                  )}
                >
                  {plan.cta}
                </Link>
              </GlareHover>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
