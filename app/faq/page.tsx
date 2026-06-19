'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  HiOutlineChevronDown, HiOutlineQuestionMarkCircle, HiOutlineCpuChip,
  HiOutlineShieldCheck, HiOutlineCreditCard, HiOutlineWrenchScrewdriver,
  HiOutlineCheckCircle, HiOutlineBolt, HiOutlineArrowRight,
} from 'react-icons/hi2';

/* ─── Data ─────────────────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: 'general',
    label: 'General',
    Icon: HiOutlineQuestionMarkCircle,
    color: '#6366f1',
    dim: 'rgba(99,102,241,0.12)',
    border: 'rgba(99,102,241,0.25)',
    items: [
      {
        q: 'What is Emaavy?',
        a: 'Emaavy is an enterprise AI voice and automation platform. It lets you deploy intelligent agents that can make and receive phone calls, qualify leads, handle support, book appointments, and sync everything back to your CRM — all without writing infrastructure code.',
      },
      {
        q: 'Who is Emaavy built for?',
        a: 'Emaavy is designed for operations leaders, founders, and enterprise teams who need to automate high-volume, repetitive voice and workflow tasks. Our customers range from 10-person startups to global enterprises running thousands of AI calls per day.',
      },
      {
        q: 'Do I need coding skills?',
        a: 'No. Emaavy is built for both no-code operators and developers. Configure agents through our visual dashboard, or connect everything via our REST API and webhooks if you prefer a code-first approach.',
      },
      {
        q: 'What makes Emaavy different from other AI platforms?',
        a: 'Most platforms are either pure chatbots or disconnected voice tools. Emaavy is the only platform that combines real-time voice calling, LLM reasoning, STT/TTS, and deep CRM integrations in a single orchestration layer — so one agent can call a lead, qualify them, book a meeting, and update your CRM without any human in the loop.',
      },
    ],
  },
  {
    id: 'agents',
    label: 'AI Agents',
    Icon: HiOutlineCpuChip,
    color: '#8B5CF6',
    dim: 'rgba(139,92,246,0.12)',
    border: 'rgba(139,92,246,0.25)',
    items: [
      {
        q: 'How do AI agents work?',
        a: 'Emaavy agents are configurable AI workers. You define their persona, knowledge base, goals, and escalation rules. When triggered — by a webhook, schedule, or inbound call — the agent starts a conversation, reasons through decisions using your chosen LLM, and takes actions (update CRM, book meeting, send message) based on what the caller says.',
      },
      {
        q: 'Can agents make and receive phone calls?',
        a: 'Yes. Emaavy supports both outbound calling campaigns and inbound call handling. Outbound agents can dial leads, run follow-up sequences, and send reminders. Inbound agents answer calls on your numbers 24/7, handle FAQs, and route to humans when needed.',
      },
      {
        q: 'How do I train an agent on my business?',
        a: "During setup, you provide your knowledge base documents, SOPs, product information, FAQs, and tone guidelines. Agents learn from these at configuration time and can be retrained any time through the dashboard. You don't need to fine-tune any models.",
      },
      {
        q: 'Can an agent hand off to a human?',
        a: "Yes — every agent has configurable escalation rules. You define the trigger conditions (confidence below a threshold, specific intent detected, keyword spoken) and the agent hands off instantly with full conversation context transferred to your team via Slack, CRM, or live chat.",
      },
      {
        q: 'How quickly can I deploy an agent?',
        a: 'Most customers go live within the same day. During your onboarding call, our team configures a working agent for your exact use case — including telephony, LLM selection, STT/TTS, and CRM integrations — before the session ends.',
      },
    ],
  },
  {
    id: 'integrations',
    label: 'Integrations',
    Icon: HiOutlineWrenchScrewdriver,
    color: '#10B981',
    dim: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.25)',
    items: [
      {
        q: 'Which telephony providers are supported?',
        a: 'Emaavy integrates natively with Twilio, Plivo, Exotel, Telnyx, Vonage, Bandwidth, Aircall, and RingCentral. You can bring your own numbers and SIP trunk, or use ours. Switching providers requires zero changes to agent logic.',
      },
      {
        q: 'Which LLMs can I use?',
        a: 'All major providers: OpenAI (GPT-4o), Anthropic (Claude), Google (Gemini), Meta (Llama), Mistral, Groq, Together AI, and Cohere. You can route different tasks to different models — for example, Groq for real-time voice latency and Claude for complex reasoning — within the same agent.',
      },
      {
        q: 'Which STT and TTS providers are supported?',
        a: 'For STT: Deepgram (recommended), OpenAI Whisper, Sarvam AI, AssemblyAI, Microsoft Azure, Google, and Amazon. For TTS: ElevenLabs (recommended), Sarvam AI for Indic languages, Microsoft Azure, Amazon Polly, Google, Deepgram Aura, PlayHT, and LMNT.',
      },
      {
        q: 'Can I connect my CRM and business tools?',
        a: 'Yes. Emaavy integrates natively with Salesforce, HubSpot, Pipedrive, Zoho, Slack, WhatsApp, Gmail, Shopify, Stripe, Notion, Zapier, Intercom, Freshdesk, Calendly, and Zoom. Custom API connectors are available on Growth and Enterprise plans.',
      },
      {
        q: 'Is real-time data sync supported?',
        a: 'Yes — all native integrations support real-time bidirectional sync. When an agent finishes a call, CRM records update within seconds. Inbound webhook events can trigger agent actions instantly.',
      },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    Icon: HiOutlineShieldCheck,
    color: '#F59E0B',
    dim: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.25)',
    items: [
      {
        q: 'Is my data secure?',
        a: "Yes. Emaavy uses AES-256 encryption at rest and TLS 1.3 in transit. We are SOC 2 Type II certified and GDPR compliant. Call recordings and transcripts are stored in your chosen region and can be auto-deleted on a schedule you control.",
      },
      {
        q: 'Do you offer SSO?',
        a: 'SSO and SAML 2.0 are available on Enterprise plans. We support Okta, Azure AD, Google Workspace, and any major SAML-compatible identity provider. Role-based access controls are available on all plans.',
      },
      {
        q: 'Can I deploy Emaavy on-premise?',
        a: 'On-premise and private cloud (AWS, GCP, Azure) deployment options are available on Enterprise plans. Contact our team to discuss your infrastructure requirements and data residency needs.',
      },
      {
        q: 'Does Emaavy support PII redaction?',
        a: "Yes. You can enable automatic PII redaction in transcripts — credit card numbers, SSNs, phone numbers, and other sensitive data are masked before storage. This is available on all plans and uses Deepgram's built-in redaction layer.",
      },
    ],
  },
  {
    id: 'billing',
    label: 'Billing & Plans',
    Icon: HiOutlineCreditCard,
    color: '#F43F5E',
    dim: 'rgba(244,63,94,0.12)',
    border: 'rgba(244,63,94,0.25)',
    items: [
      {
        q: 'How do I get started?',
        a: "Book a live demo with our team. We'll configure a working agent for your exact use case, connect your integrations, and get you live — typically within the same session. No self-serve setup required.",
      },
      {
        q: 'What are the pricing plans?',
        a: 'Emaavy has three plans: Starter at ₹2,499/month for small teams, Growth at ₹9,999/month for scaling operations, and Enterprise with custom pricing for large organisations. Annual billing saves 10%. View full details on our Pricing page.',
      },
      {
        q: 'What counts as an automation run?',
        a: 'Each time an agent or workflow completes a task end-to-end counts as one run — one outbound call handled, one inbound call resolved, one workflow triggered. Partial completions and internal retries do not count.',
      },
      {
        q: 'Can I change my plan?',
        a: 'Yes. You can upgrade or downgrade at any time from your account settings. Upgrades take effect immediately and unused time on your current plan is prorated. Downgrades apply at the next billing cycle.',
      },
      {
        q: 'Do you offer annual billing discounts?',
        a: 'Yes — annual billing gives you 10% off compared to monthly pricing. Starter is billed at ₹26,989/year and Growth at ₹1,07,989/year. Enterprise contracts are negotiated annually by default.',
      },
    ],
  },
];

/* ─── FAQ Item ──────────────────────────────────────────────────────────── */
function FaqItem({ q, a, accent, isOpen, onToggle }: {
  q: string; a: string; accent: string; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <div className="border-b last:border-b-0" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:opacity-90"
      >
        <span className="text-base font-semibold text-white leading-snug">{q}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}
          className="mt-0.5 shrink-0 rounded-full p-1" style={{ background: isOpen ? accent + '22' : 'rgba(255,255,255,0.06)' }}>
          <HiOutlineChevronDown className="h-4 w-4" style={{ color: isOpen ? accent : 'rgba(255,255,255,0.4)' }} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-8 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Fade wrapper ──────────────────────────────────────────────────────── */
function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
export default function FAQPage() {
  const [openKey, setOpenKey] = useState<string | null>('general-0');
  const [activeTab, setActiveTab] = useState('general');

  const toggle = (key: string) => setOpenKey(prev => prev === key ? null : key);

  const active = CATEGORIES.find(c => c.id === activeTab)!;

  return (
    <>
      <Navbar />
      <div className="min-h-screen" style={{ background: '#060913' }}>

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-4 pb-24 pt-44 text-center">
          <div className="pointer-events-none absolute inset-0">
            <motion.div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 65%)', filter: 'blur(90px)' }}
              animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
            <div className="absolute -left-20 top-1/2 h-64 w-64 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 65%)', filter: 'blur(60px)' }} />
            <div className="absolute -right-20 top-1/3 h-64 w-64 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #F43F5E 0%, transparent 65%)', filter: 'blur(60px)' }} />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-400">
                <HiOutlineQuestionMarkCircle className="h-3.5 w-3.5" /> FAQ
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Every question,<br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                answered honestly.
              </span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Everything you need to know about Emaavy — from how agents work to how we keep your data safe. Can&apos;t find an answer?{' '}
              <Link href="/book-demo" className="font-semibold text-indigo-400 underline underline-offset-2 hover:text-indigo-300">
                Talk to our team.
              </Link>
            </motion.p>

            {/* Quick stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {[
                { icon: HiOutlineBolt,        val: '24h',     label: 'Avg response time' },
                { icon: HiOutlineShieldCheck, val: 'SOC 2',   label: 'Certified' },
                { icon: HiOutlineCheckCircle, val: '20 min',  label: 'To first live call' },
              ].map(({ icon: Icon, val, label }) => (
                <div key={val} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5">
                  <Icon className="h-4 w-4 text-indigo-400" />
                  <span className="text-sm font-bold text-white">{val}</span>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Category tabs + FAQ content ─────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-4 pb-32">
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

            {/* Sidebar tabs */}
            <Fade>
              <div className="lg:sticky lg:top-28">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Categories
                </p>
                <nav className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1">
                  {CATEGORIES.map(({ id, label, Icon, color, dim, border }) => {
                    const isActive = activeTab === id;
                    return (
                      <button key={id} onClick={() => { setActiveTab(id); setOpenKey(null); }}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all duration-200"
                        style={isActive
                          ? { background: dim, border: `1px solid ${border}`, color }
                          : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)' }}>
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                          style={{ background: isActive ? color + '22' : 'rgba(255,255,255,0.06)' }}>
                          <Icon className="h-3.5 w-3.5" style={{ color: isActive ? color : 'rgba(255,255,255,0.35)' }} />
                        </div>
                        {label}
                        {isActive && <HiOutlineArrowRight className="ml-auto h-3.5 w-3.5 hidden lg:block" />}
                      </button>
                    );
                  })}
                </nav>

                {/* Still have questions */}
                <div className="mt-6 hidden rounded-2xl border border-white/8 bg-white/[0.03] p-5 lg:block">
                  <p className="text-sm font-semibold text-white">Still have questions?</p>
                  <p className="mt-1.5 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Our team is available to walk you through anything.
                  </p>
                  <Link href="/book-demo"
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-100">
                    Book a call
                    <HiOutlineArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </Fade>

            {/* FAQ accordion */}
            <Fade delay={0.05}>
              <AnimatePresence mode="wait">
                <motion.div key={activeTab}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>

                  {/* Category header */}
                  <div className="mb-6 flex items-center gap-4 rounded-2xl p-6"
                    style={{ background: active.dim, border: `1px solid ${active.border}` }}>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                      style={{ background: active.color + '22' }}>
                      <active.Icon className="h-6 w-6" style={{ color: active.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: active.color }}>
                        {active.label}
                      </p>
                      <p className="mt-0.5 text-lg font-bold text-white">
                        {active.label}
                      </p>
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-6">
                    {active.items.map((item, i) => (
                      <FaqItem
                        key={i}
                        q={item.q}
                        a={item.a}
                        accent={active.color}
                        isOpen={openKey === `${activeTab}-${i}`}
                        onToggle={() => toggle(`${activeTab}-${i}`)}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </Fade>
          </div>
        </section>

        {/* ── Bottom CTA ──────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-4 py-28">
          <div className="pointer-events-none absolute inset-0">
            <motion.div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.15]"
              style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 65%)', filter: 'blur(100px)' }}
              animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
          </div>
          <Fade>
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-indigo-400">Ready to get started</p>
              <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                See it working on<br />your actual use case.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Book a 20-minute live demo. We&apos;ll build an agent for your workflow, connect your tools, and show you exactly what it looks like in production.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="/book-demo"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-gray-900 shadow-xl transition-all hover:bg-gray-100">
                  Book a live demo
                  <HiOutlineArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/pricing"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10">
                  View pricing
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
                {['SOC 2 Type II', 'GDPR compliant', 'No hard sell', '20 min to first live call'].map(b => (
                  <span key={b} className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    <span className="text-indigo-400">✓</span> {b}
                  </span>
                ))}
              </div>
            </div>
          </Fade>
        </section>
      </div>
      <Footer />
    </>
  );
}
