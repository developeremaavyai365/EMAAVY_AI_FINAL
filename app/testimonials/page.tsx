'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const STORIES = [
  {
    id: 'healthease',
    company: 'HealthEase Clinics',
    industry: 'Healthcare',
    person: 'Rohan Mehta',
    role: 'Operations Manager',
    initials: 'RM',
    color: '#10b981',
    bg: 'from-emerald-900/40 to-emerald-950/60',
    border: 'rgba(16,185,129,0.25)',
    quote: 'Emaavy\'s voice agents handle our entire appointment reminder workflow. We went from 40% no-shows to under 10% in 6 weeks.',
    impact: [
      { metric: '75%', label: 'No-show reduction' },
      { metric: '6 wks', label: 'To full ROI' },
      { metric: '12K', label: 'Calls / month' },
    ],
    tag: 'Healthcare',
    detail: 'No-shows were costing us ₹18L a month in lost revenue. We tried SMS reminders, manual calls — nothing worked. Emaavy calls patients 48h and 2h before their appointment — and they actually pick up.',
    callSim: [
      { speaker: 'Agent', text: 'Hi, this is a reminder from HealthEase Clinics. You have an appointment with Dr. Mehta tomorrow at 2 PM. Can you confirm you\'ll be attending?' },
      { speaker: 'Patient', text: 'Yes, I\'ll be there.' },
      { speaker: 'Agent', text: 'Confirmed. If anything changes, you can reschedule anytime by calling us back. See you tomorrow.' },
    ],
  },
  {
    id: 'ventureaxis',
    company: 'VentureAxis',
    industry: 'B2B Sales',
    person: 'Vikram Nair',
    role: 'Head of Sales',
    initials: 'VN',
    color: '#8b5cf6',
    bg: 'from-violet-900/40 to-violet-950/60',
    border: 'rgba(139,92,246,0.25)',
    quote: 'We deployed an outbound calling agent in one afternoon. It books meetings directly into our reps\' calendars. Complete game changer.',
    impact: [
      { metric: '340', label: 'Dials / hour' },
      { metric: '41%', label: 'Meeting booked rate' },
      { metric: '2×', label: 'Pipeline in 60 days' },
    ],
    tag: 'Sales',
    detail: 'Our team was burning out on cold calling. We put Emaavy on outreach and re-deployed reps to closing. Every lead gets called — no one gets skipped. Pipeline doubled in 60 days.',
    callSim: [
      { speaker: 'Agent', text: 'Hi Vikram, this is Aria from VentureAxis. I\'m reaching out about our B2B automation suite — got 2 minutes?' },
      { speaker: 'Prospect', text: 'Sure, but we already have a sales team handling this.' },
      { speaker: 'Agent', text: 'Totally makes sense — most of our customers did too. They use Emaavy for outreach and freed up their reps to focus on closing. Want to see how?' },
      { speaker: 'Prospect', text: 'Actually yes — book me a slot this week.' },
    ],
  },
  {
    id: 'payzen',
    company: 'PayZen Finance',
    industry: 'Fintech',
    person: 'Ananya Kapoor',
    role: 'CFO',
    initials: 'AK',
    color: '#f59e0b',
    bg: 'from-amber-900/40 to-amber-950/60',
    border: 'rgba(245,158,11,0.25)',
    quote: 'The ROI was clear within the first month. We saved 340 hours of manual work and reinvested that time into actual growth.',
    impact: [
      { metric: '340h', label: 'Saved / month' },
      { metric: '₹42L', label: 'Annual saving' },
      { metric: '1 mo', label: 'Payback period' },
    ],
    tag: 'Finance',
    detail: 'We were spending heavily on manual collections calls and follow-ups. Emaavy automated the entire reminder sequence — politely, compliantly, and at scale across thousands of accounts.',
    callSim: [
      { speaker: 'Agent', text: 'Hi, I\'m calling from PayZen Finance regarding an outstanding balance of ₹14,200 on your account. Can we arrange payment today?' },
      { speaker: 'Customer', text: 'I can do half now, rest on Friday.' },
      { speaker: 'Agent', text: 'Noted — ₹7,100 today and a follow-up for Friday. I\'ll send a payment link right now. Should I set a reminder call for Friday morning?' },
      { speaker: 'Customer', text: 'Please do, yes.' },
    ],
  },
];

const WALL_QUOTES = [
  { quote: 'First live AI call in under 20 minutes. We were not expecting that.', name: 'Arjun S.', role: 'VP Sales · ScalrIndia', color: '#6366f1' },
  { quote: 'Appointment no-shows dropped from 38% to 8%. Patients actually pick up.', name: 'Dr. Priya R.', role: 'Director · CareFirst Clinics', color: '#10b981' },
  { quote: 'Support calls resolve faster and our team is finally doing real work.', name: 'Rahul T.', role: 'CX Head · Orbyt', color: '#f59e0b' },
  { quote: 'Collections reminders running 24/7 without a single human call. ROI in week 3.', name: 'Sneha M.', role: 'CFO · CreditPro India', color: '#f43f5e' },
  { quote: 'Emaavy calls every lead the moment they sign up. Our reps just close now.', name: 'Karan N.', role: 'Sales Head · Relay.in', color: '#8b5cf6' },
  { quote: 'Set up in an afternoon. First campaign live the same evening. Incredible.', name: 'Deepa V.', role: 'Founder · Clarix AI', color: '#06b6d4' },
];

const STATS = [
  { val: '4.9', unit: '/5', label: 'Average rating', sub: 'across 100+ customer reviews' },
  { val: '97%', unit: '', label: 'Retention rate', sub: 'industry avg: 74%' },
  { val: '<500', unit: 'ms', label: 'End-to-end latency', sub: 'from caller speaks to agent replies' },
  { val: '<20', unit: 'min', label: 'Time to first call', sub: 'from sign-up to live agent' },
];

/* ─── Call simulator ──────────────────────────────────────────────────────── */
function CallSim({ lines, color }: { lines: { speaker: string; text: string }[]; color: string }) {
  const [idx, setIdx] = useState(0);
  const [typing, setTyping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setIdx(0); setTyping(false); }, [color]);

  useEffect(() => {
    if (idx >= lines.length) return;
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      const t2 = setTimeout(() => setIdx(i => i + 1), 300);
      return () => clearTimeout(t2);
    }, 700 + lines[idx].text.length * 14);
    return () => clearTimeout(t);
  }, [idx, lines]);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' });
  }, [idx, typing]);

  const isAgent = (s: string) => s === 'Agent';

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: color + '20' }}>
        <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: color }} />
        <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: color + 'cc' }}>
          Live call simulation
        </span>
      </div>

      {/* Messages */}
      <div ref={ref} className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: 220 }}>
        <AnimatePresence>
          {lines.slice(0, idx).map((l, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${isAgent(l.speaker) ? 'justify-start' : 'justify-end'}`}>
              <div className="max-w-[80%]">
                <p className="text-[9px] font-semibold mb-1 px-1" style={{ color: isAgent(l.speaker) ? color : '#71717a' }}>
                  {isAgent(l.speaker) ? 'Aria (AI)' : l.speaker}
                </p>
                <div className="px-3 py-2 rounded-2xl text-[11.5px] leading-relaxed"
                  style={{
                    background: isAgent(l.speaker) ? color + '18' : '#ffffff08',
                    border: `1px solid ${isAgent(l.speaker) ? color + '30' : '#ffffff10'}`,
                    color: '#d4d4d8',
                  }}>
                  {l.text}
                </div>
              </div>
            </motion.div>
          ))}
          {typing && idx < lines.length && (
            <motion.div key="typing"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className={`flex ${isAgent(lines[idx].speaker) ? 'justify-start' : 'justify-end'}`}>
              <div className="px-3.5 py-2.5 rounded-2xl" style={{ background: '#ffffff08', border: '1px solid #ffffff10' }}>
                <div className="flex gap-1 items-center" style={{ height: 12 }}>
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: '#52525b' }}
                      animate={{ y: [0, -3, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.13 }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          {idx >= lines.length && (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-2">
              <span className="text-[10px] px-3 py-1.5 rounded-full font-semibold"
                style={{ background: '#22c55e15', color: '#22c55e', border: '1px solid #22c55e25' }}>
                ✓ Call complete — outcome logged via webhook
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Replay */}
      {idx >= lines.length && (
        <div className="px-4 pb-3">
          <button onClick={() => setIdx(0)}
            className="w-full py-1.5 rounded-lg text-[11px] font-medium transition-all"
            style={{ background: '#ffffff06', border: '1px solid #ffffff0d', color: '#71717a' }}>
            ↺ Replay
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── Floating quote card ─────────────────────────────────────────────────── */
function FloatCard({ quote, name, role, color, delay }: { quote: string; name: string; role: string; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-2xl p-5 cursor-default"
      style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}22`, backdropFilter: 'blur(12px)' }}
    >
      <div className="w-6 h-[3px] rounded-full mb-3" style={{ background: color }} />
      <p className="text-[13px] leading-relaxed text-white/70 mb-4">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
          style={{ background: color + '22', color, border: `1px solid ${color}33` }}>
          {name[0]}
        </div>
        <div>
          <p className="text-[11px] font-semibold text-white/80">{name}</p>
          <p className="text-[10px] text-white/35">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Marquee row ─────────────────────────────────────────────────────────── */
function MarqueeRow({ items, reverse = false }: { items: typeof WALL_QUOTES; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div className={`flex gap-4 ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}
        style={{ width: 'max-content' }}>
        {doubled.map((q, i) => (
          <div key={i} className="shrink-0 w-72 rounded-2xl px-5 py-4"
            style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${q.color}20` }}>
            <div className="w-4 h-[2px] rounded-full mb-2.5" style={{ background: q.color }} />
            <p className="text-[12px] leading-relaxed text-white/60 mb-3">&ldquo;{q.quote}&rdquo;</p>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold"
                style={{ background: q.color + '22', color: q.color }}>
                {q.name[0]}
              </div>
              <p className="text-[10px] text-white/40">{q.name} · {q.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Stat counter ────────────────────────────────────────────────────────── */
function StatCard({ val, unit, label, sub, i }: { val: string; unit: string; label: string; sub: string; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl p-6 text-center"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <p className="text-[42px] font-black text-white leading-none tracking-tight">
        {val}<span className="text-[24px] text-white/40 font-bold">{unit}</span>
      </p>
      <p className="mt-2 text-[13px] font-semibold text-white/70">{label}</p>
      <p className="mt-1 text-[11px] text-white/30">{sub}</p>
    </motion.div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function TestimonialsPage() {
  const [activeStory, setActiveStory] = useState(0);
  const story = STORIES[activeStory];

  return (
    <>
      <Navbar />
      <div className="min-h-screen" style={{ background: '#05060f' }}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-4 pb-24 pt-44 text-center">
          {/* Background orbs */}
          <div className="pointer-events-none absolute inset-0">
            <motion.div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)', filter: 'blur(80px)' }}
              animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.div className="absolute -left-40 top-1/3 h-80 w-80 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 65%)', filter: 'blur(70px)' }}
              animate={{ y: [0, 40, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.div className="absolute -right-40 top-1/4 h-80 w-80 rounded-full opacity-15"
              style={{ background: 'radial-gradient(circle, #f43f5e 0%, transparent 65%)', filter: 'blur(70px)' }}
              animate={{ y: [0, -30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-400">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                100+ Companies. Real Results.
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-8 text-[40px] sm:text-[60px] lg:text-[76px] font-black text-white leading-[1.02] tracking-tight">
              They said it.<br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                We proved it.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/50">
              Real stories from operations leaders, founders, and enterprise teams who replaced headcount, manual workflows, and legacy tools with Emaavy AI agents.
            </motion.p>

            {/* Live ticker */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="mt-10 inline-flex items-center gap-3 rounded-full px-5 py-2.5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span className="text-[12px] font-medium text-white/50">
                1M+ calls handled this month across all customers
              </span>
            </motion.div>
          </div>
        </section>

        {/* ── STATS ROW ────────────────────────────────────────────────────── */}
        <section className="px-4 pb-20">
          <div className="mx-auto max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((s, i) => <StatCard key={i} {...s} i={i} />)}
          </div>
        </section>

        {/* ── FEATURED STORIES ─────────────────────────────────────────────── */}
        <section className="px-4 pb-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/25 mb-3">Deep Dives</p>
              <h2 className="text-[32px] sm:text-[44px] font-black text-white tracking-tight">
                Stories that moved the needle.
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">

              {/* Story selector */}
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                {STORIES.map((s, i) => (
                  <button key={s.id} onClick={() => setActiveStory(i)}
                    className="flex-1 lg:flex-none text-left rounded-2xl px-4 py-4 transition-all duration-300 shrink-0"
                    style={{
                      background: i === activeStory ? s.color + '15' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${i === activeStory ? s.border : 'rgba(255,255,255,0.06)'}`,
                      minWidth: 160,
                    }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0"
                        style={{ background: s.color + '22', color: s.color }}>
                        {s.initials}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-widest"
                        style={{ color: i === activeStory ? s.color : '#52525b' }}>
                        {s.tag}
                      </span>
                    </div>
                    <p className="text-[12px] font-semibold leading-snug"
                      style={{ color: i === activeStory ? '#ffffff' : '#71717a' }}>
                      {s.company}
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ color: i === activeStory ? s.color + 'aa' : '#3f3f46' }}>
                      {s.industry}
                    </p>
                  </button>
                ))}
              </div>

              {/* Story panel */}
              <AnimatePresence mode="wait">
                <motion.div key={story.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-3xl overflow-hidden"
                  style={{ background: '#0c0c14', border: `1px solid ${story.border}` }}>

                  {/* Top bar */}
                  <div className="px-6 sm:px-8 py-5 border-b flex flex-wrap items-center justify-between gap-4"
                    style={{ borderColor: story.color + '15', background: story.color + '08' }}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-[15px] font-black"
                        style={{ background: story.color + '20', color: story.color, border: `1px solid ${story.color}30` }}>
                        {story.initials}
                      </div>
                      <div>
                        <p className="text-[16px] font-bold text-white">{story.person}</p>
                        <p className="text-[12px]" style={{ color: story.color + 'cc' }}>{story.role} · {story.company}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                      style={{ background: story.color + '15', color: story.color, border: `1px solid ${story.color}25` }}>
                      {story.industry}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

                    {/* Left: quote + detail + metrics */}
                    <div className="px-6 sm:px-8 py-8 border-b md:border-b-0 md:border-r" style={{ borderColor: story.color + '12' }}>
                      <div className="w-8 h-1 rounded-full mb-6" style={{ background: story.color }} />
                      <blockquote className="text-[17px] sm:text-[19px] font-semibold text-white leading-[1.55] mb-6"
                        style={{ letterSpacing: '-0.01em' }}>
                        &ldquo;{story.quote}&rdquo;
                      </blockquote>
                      <p className="text-[13px] leading-relaxed text-white/40 mb-8">{story.detail}</p>

                      {/* Impact metrics */}
                      <div className="grid grid-cols-3 gap-3">
                        {story.impact.map((m, i) => (
                          <div key={i} className="rounded-xl px-3 py-4 text-center"
                            style={{ background: story.color + '08', border: `1px solid ${story.color}18` }}>
                            <p className="text-[22px] font-black leading-none" style={{ color: story.color }}>{m.metric}</p>
                            <p className="text-[10px] text-white/35 mt-1.5 leading-tight">{m.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: call simulator */}
                    <div className="flex flex-col" style={{ minHeight: 340 }}>
                      <CallSim lines={story.callSim} color={story.color} />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ── MARQUEE WALL ────────────────────────────────────────────────── */}
        <section className="pb-28 overflow-hidden">
          <div className="mb-12 text-center px-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/25 mb-3">From the community</p>
            <h2 className="text-[28px] sm:text-[40px] font-black text-white tracking-tight">
              Everyone&apos;s saying it.
            </h2>
          </div>

          <div className="space-y-4">
            <MarqueeRow items={WALL_QUOTES.slice(0, 3)} />
            <MarqueeRow items={WALL_QUOTES.slice(3)} reverse />
          </div>
        </section>

        {/* ── FLOATING QUOTE GRID ─────────────────────────────────────────── */}
        <section className="px-4 pb-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/25 mb-3">More voices</p>
              <h2 className="text-[28px] sm:text-[40px] font-black text-white tracking-tight">
                Straight from the source.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WALL_QUOTES.map((q, i) => (
                <FloatCard key={i} quote={q.quote} name={q.name} role={q.role} color={q.color} delay={i * 0.04} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <section className="px-4 pb-32">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl px-8 py-16 text-center"
              style={{ background: 'linear-gradient(135deg, #0f0f1f 0%, #13103a 50%, #0f0f1f 100%)', border: '1px solid rgba(99,102,241,0.2)' }}>

              {/* Orbs inside CTA */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full opacity-20"
                  style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 65%)', filter: 'blur(50px)' }} />
                <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full opacity-15"
                  style={{ background: 'radial-gradient(circle, #f43f5e 0%, transparent 65%)', filter: 'blur(50px)' }} />
              </div>

              <div className="relative z-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-indigo-400/70 mb-4">Ready to join them?</p>
                <h2 className="text-[32px] sm:text-[48px] font-black text-white leading-tight tracking-tight mb-4">
                  Your team&apos;s story<br />starts here.
                </h2>
                <p className="mx-auto max-w-lg text-[15px] leading-relaxed text-white/45 mb-10">
                  Join 100+ companies that replaced manual work with Emaavy AI agents. First live call in under 20 minutes.
                </p>

                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-8">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.svg key={i} className="w-5 h-5" viewBox="0 0 20 20" fill="#fbbf24"
                      initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 400 }}>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                  <span className="ml-2 text-[13px] font-semibold text-white/50">4.9 / 5 from 100+ reviews</span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link href="/book-demo"
                    className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-[15px] font-bold text-white transition-all hover:brightness-110"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 8px 32px rgba(99,102,241,0.4)' }}>
                    Book a live demo
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link href="/agents"
                    className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-[15px] font-semibold text-white/60 transition-all hover:text-white"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    Explore agents
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
