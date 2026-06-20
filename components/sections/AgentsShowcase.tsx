'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const AGENTS = [
  {
    id: 'sales-qualifier',
    vertical: 'Sales',
    name: 'Sales Qualifier',
    headline: 'Qualifies every inbound lead before your team picks up the phone.',
    body: 'Calls every inbound lead the moment they show interest, has a natural conversation, captures their details and intent, logs everything to your CRM, and books a meeting — no lead left behind.',
    capabilities: ['Instant lead response', 'Natural conversation', 'CRM auto-logging', 'Calendar booking'],
    stat: { val: '74%', label: 'average qualification rate' },
  },
  {
    id: 'win-back',
    vertical: 'Sales',
    name: 'Win-Back Agent',
    headline: 'Recovers dormant and churned revenue automatically.',
    body: 'Identifies accounts that have gone quiet or cancelled, reaches out with contextual win-back messaging, and re-qualifies them for your current product — recovering pipeline you\'d written off.',
    capabilities: ['Dormancy detection', 'Personalised win-back', 'Re-qualification', 'Offer sequencing'],
    stat: { val: '23%', label: 'average win-back conversion' },
  },
  {
    id: 'support-triage',
    vertical: 'Customer Support',
    name: 'Support Triage Agent',
    headline: 'Resolves tier-1 issues instantly and routes the rest with full context.',
    body: 'Handles inbound support calls, resolves common issues directly from your knowledge base, and escalates complex cases to the right human with everything pre-loaded — no hold music, no transfers.',
    capabilities: ['Knowledge base resolution', 'Tier-1 deflection', 'Smart escalation', 'Context handoff'],
    stat: { val: '68%', label: 'of tickets auto-resolved' },
  },
  {
    id: 'customer-success',
    vertical: 'Customer Support',
    name: 'Customer Success Agent',
    headline: 'Monitors accounts proactively and intervenes before churn occurs.',
    body: 'Tracks health scores across your entire book of business, calls at-risk accounts before they escalate, and handles periodic account check-ins and customer feedback calls at full scale.',
    capabilities: ['Health score monitoring', 'Proactive outreach', 'Account check-ins', 'Customer feedback calls'],
    stat: { val: '$2.1M', label: 'ARR retained per month' },
  },
  {
    id: 'outbound-sdr',
    vertical: 'Sales',
    name: 'Outbound SDR',
    headline: 'Runs autonomous cold outreach at a scale no human team can match.',
    body: 'Executes outbound sequences — cold calls, voicemail drops, personalised follow-ups — using live CRM data to tailor every touchpoint without SDR headcount.',
    capabilities: ['Cold calling', 'Voicemail drops', 'Follow-up cadences', 'CRM personalisation'],
    stat: { val: '340', label: 'dials per hour, per agent' },
  },
  {
    id: 'appointment-setter',
    vertical: 'Scheduling',
    name: 'Appointment Setter',
    headline: 'Responds to every inbound lead in under 90 seconds and books the meeting.',
    body: 'Picks up form fills the moment they arrive, qualifies the prospect, and books directly into your team\'s calendar — before your competition has replied to the inquiry email.',
    capabilities: ['Instant lead response', 'Qualification screening', 'Direct calendar booking', 'No-show recovery'],
    stat: { val: '82s', label: 'average response time' },
  },
  {
    id: 'event-registration',
    vertical: 'Scheduling',
    name: 'Event Registration Agent',
    headline: 'Fills your events and webinars on autopilot.',
    body: 'Reaches out to target attendee lists, handles all registration questions, confirms attendance, and sends reminders across webinars, conferences, and in-person events.',
    capabilities: ['Attendee outreach', 'Registration Q&A', 'Confirmation & reminders', 'Cancellation recovery'],
    stat: { val: '38%', label: 'average registration rate' },
  },
  {
    id: 'collections',
    vertical: 'Operations',
    name: 'Collections Agent',
    headline: 'Recovers overdue payments without awkward conversations.',
    body: 'Contacts overdue accounts in a professional, structured manner — negotiates payment plans, logs every outcome directly into your billing system, and escalates high-value disputes.',
    capabilities: ['Overdue outreach', 'Payment plan negotiation', 'Billing system sync', 'Dispute escalation'],
    stat: { val: '54%', label: 'average recovery rate' },
  },
  {
    id: 'hr-screening',
    vertical: 'Operations',
    name: 'HR Screening Agent',
    headline: 'Conducts first-round candidate screens at any volume.',
    body: 'Runs structured phone screens against your role criteria, scores candidate fit, and schedules shortlisted applicants directly into your ATS — compressing weeks of screening into hours.',
    capabilities: ['Structured phone screens', 'Fit scoring', 'ATS integration', 'Interview scheduling'],
    stat: { val: '70%', label: 'reduction in time-to-screen' },
  },
] as const;

type AgentId = (typeof AGENTS)[number]['id'];

const VERTICALS = ['All', 'Sales', 'Customer Support', 'Scheduling', 'Operations'] as const;
type Vertical = (typeof VERTICALS)[number];

export default function AgentsShowcase() {
  const [filter, setFilter]   = useState<Vertical>('All');
  const [activeId, setActiveId] = useState<AgentId>('sales-qualifier');

  const visible = filter === 'All' ? AGENTS : AGENTS.filter(a => a.vertical === filter);
  const agent   = AGENTS.find(a => a.id === activeId) ?? visible[0];

  return (
    <section id="ai-agents" className="border-b border-white/5" style={{ background: '#08090c' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-24 pb-28">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 border-b pb-16" style={{ borderColor: '#ffffff0a' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-600 mb-5">AI Agent Fleet</p>
            <h2 className="text-[42px] md:text-[56px] font-bold text-white leading-[1.06]" style={{ letterSpacing: '-0.03em' }}>
              Purpose-built agents<br />for every business function.
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-neutral-500">
              Emaavy agents are deployed across sales, support, scheduling, and operations — each trained for a specific role and ready to work at enterprise scale.
            </p>
          </motion.div>

        </div>

        {/* ── Filter row ── */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {VERTICALS.map(v => {
            const isActive = v === filter;
            return (
              <button key={v} onClick={() => setFilter(v)}
                className="px-4 py-1.5 rounded-md text-[12px] font-medium transition-all duration-200"
                style={{
                  background: isActive ? '#ffffff12' : 'transparent',
                  border: `1px solid ${isActive ? '#ffffff20' : 'transparent'}`,
                  color: isActive ? '#e4e4e7' : '#52525b',
                }}>
                {v}
              </button>
            );
          })}
        </div>

        {/* ── Body: table + detail ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Agent list — table style */}
          <div className="lg:col-span-5 flex flex-col" style={{ borderTop: '1px solid #ffffff08' }}>
            <AnimatePresence mode="popLayout">
              {visible.map((a, i) => {
                const isActive = a.id === activeId;
                return (
                  <motion.button
                    key={a.id}
                    onClick={() => setActiveId(a.id)}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                    className="w-full text-left flex items-center justify-between gap-4 py-4 px-3 transition-all duration-150 group"
                    style={{ borderBottom: '1px solid #ffffff06', background: isActive ? '#ffffff06' : 'transparent' }}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="text-[11px] font-mono text-neutral-700 w-5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold truncate" style={{ color: isActive ? '#fff' : '#a1a1aa' }}>{a.name}</p>
                        <p className="text-[11px] text-neutral-600 truncate">{a.vertical}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {isActive && (
                        <motion.span layoutId="active-dot" className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                      <svg className="w-3.5 h-3.5 text-neutral-700 group-hover:text-neutral-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl overflow-hidden h-full"
                style={{ background: '#0d0e12', border: '1px solid #ffffff0c' }}
              >
                {/* Top section */}
                <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-6 border-b" style={{ borderColor: '#ffffff08' }}>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div className="min-w-0">
                      <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-neutral-600 mb-3">{agent.vertical}</span>
                      <h3 className="text-[20px] sm:text-[24px] font-bold text-white mb-2" style={{ letterSpacing: '-0.02em' }}>{agent.name}</h3>
                      <p className="text-[13px] sm:text-[14px] leading-relaxed text-neutral-400 max-w-md">{agent.headline}</p>
                    </div>
                    <Link href="/signup"
                      className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-semibold text-white border transition-all hover:bg-white/5"
                      style={{ borderColor: '#ffffff18' }}>
                      Deploy
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>

                  {/* Stat */}
                  <div className="inline-flex items-baseline gap-2">
                    <span className="text-[32px] sm:text-[38px] font-bold text-white font-mono" style={{ letterSpacing: '-0.04em' }}>{agent.stat.val}</span>
                    <span className="text-[13px] text-neutral-500">{agent.stat.label}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="px-5 sm:px-8 py-6 border-b" style={{ borderColor: '#ffffff08' }}>
                  <p className="text-[13px] leading-[1.9] text-neutral-500">{agent.body}</p>
                </div>

                {/* Capabilities */}
                <div className="px-5 sm:px-8 py-6">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-700 mb-4">What this agent does</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {agent.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <svg className="w-3.5 h-3.5 shrink-0 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[12px] text-neutral-400">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Footer CTA ── */}
        <div className="mt-10 pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5" style={{ borderColor: '#ffffff08' }}>
          <p className="text-[13px] text-neutral-600">
            10 agents across 4 verticals &mdash; or request a custom agent built for your workflow.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/agents"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-white border px-5 py-2.5 rounded-lg transition-all hover:bg-white/5"
              style={{ borderColor: '#ffffff14' }}>
              Explore all agents
            </Link>
            <Link href="/book-demo"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-neutral-500 hover:text-neutral-300 transition-colors">
              Request custom agent
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
