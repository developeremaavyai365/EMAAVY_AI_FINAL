'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  HiOutlineUserPlus,
  HiOutlineCpuChip,
  HiOutlineCircleStack,
  HiOutlineBell,
  HiOutlineCalendar,
  HiOutlineEnvelope,
} from 'react-icons/hi2';
import { AnimatedContent } from '@/components/reactbits';
import SectionHeader from '@/components/ui/SectionHeader';

const STEPS = [
  {
    icon: HiOutlineUserPlus,
    label: 'Lead Captured',
    desc: 'Form submitted via website or ad campaign',
    color: 'from-blue-500/20 to-blue-600/10',
    dot: 'bg-blue-500',
    border: 'border-blue-200',
  },
  {
    icon: HiOutlineCpuChip,
    label: 'AI Qualification',
    desc: 'Agent scores and qualifies the lead instantly',
    color: 'from-violet-500/20 to-violet-600/10',
    dot: 'bg-violet-500',
    border: 'border-violet-200',
  },
  {
    icon: HiOutlineCircleStack,
    label: 'CRM Update',
    desc: 'Lead synced to Salesforce or HubSpot automatically',
    color: 'from-emaavy-bolt/20 to-emaavy-bolt/10',
    dot: 'bg-emaavy-bolt',
    border: 'border-emaavy-bolt/30',
  },
  {
    icon: HiOutlineBell,
    label: 'Sales Notification',
    desc: 'Rep alerted via Slack with full lead context',
    color: 'from-amber-500/20 to-amber-600/10',
    dot: 'bg-amber-500',
    border: 'border-amber-200',
  },
  {
    icon: HiOutlineCalendar,
    label: 'Meeting Scheduled',
    desc: 'AI books the call in the rep\'s calendar',
    color: 'from-emerald-500/20 to-emerald-600/10',
    dot: 'bg-emerald-500',
    border: 'border-emerald-200',
  },
  {
    icon: HiOutlineEnvelope,
    label: 'Automated Follow-Up',
    desc: 'Personalized emails sent until meeting confirmed',
    color: 'from-rose-500/20 to-rose-600/10',
    dot: 'bg-rose-400',
    border: 'border-rose-200',
  },
] as const;

function FlowStep({ step, index }: { step: typeof STEPS[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = step.icon;
  const isLast = index === STEPS.length - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -32 : 32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
      className="flex items-start gap-4"
    >
      {/* Left: connector line + dot */}
      <div className="flex flex-col items-center">
        <div
          className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} border ${step.border}`}
        >
          <Icon className="h-5 w-5 text-emaavy-deep" />
        </div>
        {!isLast && (
          <motion.div
            className="mt-1 w-px flex-1 min-h-[2.5rem]"
            style={{
              background: `linear-gradient(to bottom, var(--border-color), transparent)`,
              ['--border-color' as string]: 'rgba(74,101,139,0.25)',
            }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.12 + 0.3 }}
          />
        )}
      </div>

      {/* Right: content */}
      <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${step.dot}`} />
          <h3 className="font-semibold text-emaavy-deep">{step.label}</h3>
          <span className="rounded-full bg-emaavy-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emaavy-bolt">
            Auto
          </span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-emaavy-secondary">{step.desc}</p>
      </div>
    </motion.div>
  );
}

export default function WorkflowShowcase() {
  return (
    <section id="workflows" className="section-padding overflow-hidden">
      <div className="section-container">
        <AnimatedContent>
          <SectionHeader
            label="Workflows"
            title="From Lead to Closed Deal — Fully Automated"
            subtitle="Build end-to-end journeys that qualify leads, update your CRM, and schedule follow-ups without manual work."
          />
        </AnimatedContent>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: flow steps */}
          <div className="space-y-0">
            {STEPS.map((step, i) => (
              <FlowStep key={step.label} step={step} index={i} />
            ))}
          </div>

          {/* Right: explainer card */}
          <AnimatedContent direction="horizontal" reverse delay={0.2}>
            <div className="sticky top-28 rounded-2xl border border-emaavy-border bg-emaavy-surface p-8 shadow-brand">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emaavy-bolt/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emaavy-bolt" />
                <span className="text-xs font-semibold uppercase tracking-wider text-emaavy-bolt">
                  Live automation
                </span>
              </div>
              <h3 className="text-xl font-semibold text-emaavy-deep">
                Every step runs without you
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-emaavy-secondary">
                Emaavy orchestrates your entire revenue pipeline — from first touch to booked call — while your team focuses on closing deals.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  { label: 'Response time', value: '< 30s', bar: 95 },
                  { label: 'Lead qualification', value: '100%', bar: 100 },
                  { label: 'Meetings booked', value: '+68%', bar: 68 },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="mb-1 flex justify-between text-xs font-medium text-emaavy-secondary">
                      <span>{stat.label}</span>
                      <span className="text-emaavy-deep font-semibold">{stat.value}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-emaavy-border">
                      <motion.div
                        className="h-full rounded-full bg-brand-gradient"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.bar}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
