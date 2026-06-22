'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

/* ─── Agent data ─────────────────────────────────────────────────────────── */
const AGENTS = [
  {
    id: 'sales-qualifier',
    vertical: 'Sales',
    name: 'Inbound Response Agent',
    tagline: 'Calls every inbound lead instantly — no one waits, no one is missed.',
    description: 'The moment a lead submits a form or shows interest, this agent calls them back within 90 seconds. It has a natural conversation, captures their details, books a meeting directly into your calendar, and fires a webhook with everything — every time. No lead waits. No lead goes cold.',
    stat: { val: '<90s', label: 'avg. lead response time' },
    efficiency: '6x faster response than any human team',
    metrics: [
      { label: 'Leads reached / hr', val: '340+' },
      { label: 'Meeting book rate', val: '41%' },
      { label: 'Avg. handle time', val: '3.4 min' },
    ],
    useCases: ['Inbound lead callback', 'Trade show follow-up', 'Demo request follow-up', 'Partner referral intake'],
    capabilities: ['Instant lead callback', 'Natural conversation', 'Webhook data push', 'Calendar booking', 'Objection handling', 'Consistent follow-up'],
    callSim: [
      { speaker: 'Agent', text: 'Hi, this is Aria from Emaavy. Is this a good time to connect about your inquiry?' },
      { speaker: 'Prospect', text: 'Sure, I have a few minutes.' },
      { speaker: 'Agent', text: 'Great. Could you tell me a bit about your current outbound setup and what prompted you to reach out?' },
      { speaker: 'Prospect', text: 'We have a five-person team but we\'re struggling to follow up with leads fast enough.' },
      { speaker: 'Agent', text: 'Understood — speed-to-lead is everything. I\'ve found a slot with our team tomorrow at 10 AM — does that work?' },
      { speaker: 'Prospect', text: 'Yes, book me in.' },
      { speaker: 'Agent', text: 'Done. Calendar invite sent. Looking forward to speaking with you tomorrow.' },
    ],
    color: '#3b82f6',
    accent: '#1d4ed8',
  },
  {
    id: 'outbound-sdr',
    vertical: 'Sales',
    name: 'Outbound SDR',
    tagline: 'Runs autonomous cold outreach at a scale no human team can match.',
    description: 'Executes complete outbound sequences — cold calls, voicemail drops, and personalised follow-ups — reaching every contact on your list with a consistent, professional pitch. Scales to thousands of dials per day without adding headcount. Every outcome is pushed via webhook.',
    stat: { val: '340', label: 'dials per hour, per agent' },
    efficiency: '12x the output of a human SDR',
    metrics: [
      { label: 'Connect rate', val: '18.4%' },
      { label: 'Meetings booked / 100', val: '6.2' },
      { label: 'Cost per meeting', val: '₹980' },
    ],
    useCases: ['Cold prospecting campaigns', 'Event follow-up sequences', 'Re-engagement outreach', 'Market expansion'],
    capabilities: ['Cold calling at scale', 'Voicemail drops', 'Follow-up cadences', 'Personalised scripts', 'Webhook outcome push', 'Real-time objection handling'],
    callSim: [
      { speaker: 'Agent', text: 'Hi Rahul, this is Aria — I\'m reaching out from Emaavy about your outbound sales process. Got 2 minutes?' },
      { speaker: 'Prospect', text: 'Sure, go ahead.' },
      { speaker: 'Agent', text: 'We help B2B sales teams run outbound at scale using AI agents — every lead gets called, no one is skipped. Worth a quick look?' },
      { speaker: 'Prospect', text: 'Yeah, actually. Send me something first.' },
      { speaker: 'Agent', text: 'Sending a case study to your email right now. I\'ll follow up Thursday at 10 AM — does that work?' },
    ],
    color: '#8b5cf6',
    accent: '#6d28d9',
  },
  {
    id: 'win-back',
    vertical: 'Sales',
    name: 'Win-Back Agent',
    tagline: 'Recovers dormant and churned revenue automatically.',
    description: 'Identifies accounts that have gone quiet or cancelled, reaches out with contextual win-back messaging tailored to why they left, and re-qualifies them for your current product offering. Recovers pipeline you\'ve written off without any manual effort from your team.',
    stat: { val: '23%', label: 'avg. win-back conversion' },
    efficiency: 'Recovers $840K avg. ARR per month',
    metrics: [
      { label: 'Accounts contacted / day', val: '1,200' },
      { label: 'Reactivation rate', val: '23%' },
      { label: 'Avg. deal recovered', val: '$18K' },
    ],
    useCases: ['Churned customer re-engagement', 'Expired trial recovery', 'Lapsed subscription win-back', 'Competitive loss recovery'],
    capabilities: ['Dormant account outreach', 'Personalised win-back scripts', 'Re-engagement flows', 'Offer sequencing', 'Outcome webhook push', 'Follow-up sequencing'],
    callSim: [
      { speaker: 'Agent', text: 'Hi Daniel, this is Aria from Pinnacle Labs. It\'s been a while — I wanted to personally reach out.' },
      { speaker: 'Prospect', text: 'Oh hey. Yeah, we paused things a few months ago.' },
      { speaker: 'Agent', text: 'Completely understand. A lot has changed since then — we\'ve launched the feature that was on your wishlist. Would it be worth a quick look?' },
      { speaker: 'Prospect', text: 'Which feature are you talking about?' },
      { speaker: 'Agent', text: 'The multi-queue routing you requested in Q2. It\'s live and three of your competitors are already using it.' },
    ],
    color: '#10b981',
    accent: '#059669',
  },
  {
    id: 'support-triage',
    vertical: 'Customer Support',
    name: 'Support Triage Agent',
    tagline: 'Resolves tier-1 issues instantly. Routes the rest with full context.',
    description: 'Handles inbound support calls, resolves common issues directly from your knowledge base, and escalates complex cases to the right human with everything pre-loaded — full transcript, issue summary, customer history, and suggested resolution. No hold music, no blind transfers.',
    stat: { val: '68%', label: 'of tickets auto-resolved' },
    efficiency: 'Handles 800+ tickets per day, per agent',
    metrics: [
      { label: 'Avg. resolution time', val: '2.1 min' },
      { label: 'CSAT score', val: '4.7/5' },
      { label: 'Escalation rate', val: '32%' },
    ],
    useCases: ['Inbound support queues', 'After-hours coverage', 'Overflow handling', 'Multi-language support'],
    capabilities: ['Knowledge base resolution', 'Tier-1 deflection', 'Smart escalation routing', 'Full context handoff', 'Customer satisfaction tracking', 'Webhook outcome logging'],
    callSim: [
      { speaker: 'Agent', text: 'Thanks for calling support. I\'m Aria. Can I get your registered mobile number?' },
      { speaker: 'Customer', text: 'Sure — it\'s 98765 43210.' },
      { speaker: 'Agent', text: 'Got it, Priya. I can see your last order — there was a payment processing error on Monday. I\'m issuing a full refund now.' },
      { speaker: 'Customer', text: 'Oh wow, that\'s it?' },
      { speaker: 'Agent', text: 'Yes. Refund confirmed. You\'ll see it in 3–5 business days. Is there anything else?' },
    ],
    color: '#f59e0b',
    accent: '#d97706',
  },
  {
    id: 'customer-success',
    vertical: 'Customer Support',
    name: 'Customer Success Agent',
    tagline: 'Monitors accounts proactively. Intervenes before churn occurs.',
    description: 'Tracks health scores across your entire book of business, identifies at-risk signals like reduced logins, declining usage, or missed milestones, and proactively calls those accounts before they escalate. Also handles periodic account check-ins, customer feedback calls, and upsell conversations at full scale.',
    stat: { val: '₹1.8Cr', label: 'avg. revenue retained / month' },
    efficiency: 'Monitors 10,000+ accounts simultaneously',
    metrics: [
      { label: 'Churn rate reduction', val: '41%' },
      { label: 'Customer satisfaction improvement', val: '+22pts' },
      { label: 'Upsell conversion', val: '14%' },
    ],
    useCases: ['Proactive account check-ins', 'Customer feedback calls', 'Renewal reminder calls', 'Expansion revenue calls'],
    capabilities: ['Proactive account outreach', 'Scheduled check-in calls', 'Customer feedback calls', 'Webhook outcome push', 'Follow-up sequencing', 'Escalation routing'],
    callSim: [
      { speaker: 'Agent', text: 'Hi Ananya, this is Aria from your account team. Just calling to check in — how\'s everything going with the platform?' },
      { speaker: 'Customer', text: 'Honestly, we\'ve had a bit of trouble getting the team onboarded.' },
      { speaker: 'Agent', text: 'I\'ve scheduled a 20-minute onboarding session with our CS team for Thursday. I\'m also sending a setup guide for your workflow.' },
      { speaker: 'Customer', text: 'That would actually be really helpful, thank you.' },
    ],
    color: '#ec4899',
    accent: '#db2777',
  },
  {
    id: 'appointment-setter',
    vertical: 'Scheduling',
    name: 'Appointment Setter',
    tagline: 'Responds to every inbound lead in under 90 seconds.',
    description: 'Picks up form fills and inbound inquiries the moment they arrive, has a brief conversation, and books directly into your team\'s calendar — before your competition has even replied to the inquiry email. Speed-to-lead is the single biggest predictor of conversion, and this agent never sleeps.',
    stat: { val: '82s', label: 'avg. response time' },
    efficiency: '9x faster response than human follow-up',
    metrics: [
      { label: 'Show rate', val: '78%' },
      { label: 'Leads booked / day', val: '200+' },
      { label: 'No-show recovery', val: '64%' },
    ],
    useCases: ['Web form follow-up', 'Ad campaign lead intake', 'Event registration', 'Referral partner intake'],
    capabilities: ['Instant lead response (<90s)', 'Qualification screening', 'Direct calendar booking', 'No-show follow-up', 'Timezone-aware scheduling', 'Multi-calendar sync'],
    callSim: [
      { speaker: 'Agent', text: 'Hi Rohan, you just submitted a demo request on our site — I\'m Aria. Great timing, calling you right away!' },
      { speaker: 'Prospect', text: 'Oh wow, that was fast.' },
      { speaker: 'Agent', text: 'We always call within 90 seconds. Quick question — are you looking at this for your sales team or ops?' },
      { speaker: 'Prospect', text: 'Sales team, about 12 reps.' },
      { speaker: 'Agent', text: 'Great. I have Thursday 2 PM or Friday 10 AM available — which works better?' },
    ],
    color: '#06b6d4',
    accent: '#0891b2',
  },
  {
    id: 'event-registration',
    vertical: 'Scheduling',
    name: 'Event Registration Agent',
    tagline: 'Fills your events and webinars on autopilot.',
    description: 'Reaches out to target attendee lists, handles all registration questions, confirms attendance across channels, and sends smart reminders that reduce no-shows by up to 40%. Works across webinars, in-person conferences, product launches, and partner events at any volume.',
    stat: { val: '38%', label: 'avg. registration rate' },
    efficiency: '3x industry avg. webinar fill rate',
    metrics: [
      { label: 'Outreach capacity / day', val: '5,000+' },
      { label: 'No-show reduction', val: '40%' },
      { label: 'Registration rate', val: '38%' },
    ],
    useCases: ['Webinar registration', 'Conference attendance drive', 'Product launch events', 'Partner & channel events'],
    capabilities: ['Attendee outreach', 'Registration Q&A', 'Confirmation flows', 'Smart reminder sequences', 'Cancellation recovery', 'Wait-list management'],
    callSim: [
      { speaker: 'Agent', text: 'Hi Vikram, this is Aria. You attended our last webinar — we have an exclusive in-person summit next month in Bengaluru.' },
      { speaker: 'Prospect', text: 'Interesting. What\'s it about?' },
      { speaker: 'Agent', text: 'It\'s a half-day on AI-powered revenue operations. Intimate format, limited seats. Want me to hold a spot for you?' },
      { speaker: 'Prospect', text: 'Yeah, I\'d be interested.' },
      { speaker: 'Agent', text: 'Done. Confirmation and logistics going to your email now.' },
    ],
    color: '#f97316',
    accent: '#ea580c',
  },
  {
    id: 'collections',
    vertical: 'Operations',
    name: 'Collections Agent',
    tagline: 'Recovers overdue payments without awkward conversations.',
    description: 'Contacts overdue accounts in a structured, professional manner — negotiates flexible payment plans, logs every outcome directly into your billing system, and escalates high-value disputes to the appropriate team. Maintains a firm but respectful tone that protects your customer relationships while recovering revenue.',
    stat: { val: '54%', label: 'avg. recovery rate' },
    efficiency: 'Processes 3,000+ overdue accounts per day',
    metrics: [
      { label: 'Recovery rate', val: '54%' },
      { label: 'Accounts worked / day', val: '3,000+' },
      { label: 'Avg. days to collect', val: '4.2' },
    ],
    useCases: ['Overdue invoice recovery', 'Subscription churn prevention', 'Payment plan negotiation', 'High-value dispute escalation'],
    capabilities: ['Overdue account outreach', 'Payment plan negotiation', 'Webhook outcome push', 'Dispute escalation routing', 'Compliance-safe scripts', 'Multi-attempt sequencing'],
    callSim: [
      { speaker: 'Agent', text: 'Hi, this is Aria from billing. I\'m reaching out about invoice #4821 — it\'s 14 days past due. Is everything okay on your end?' },
      { speaker: 'Customer', text: 'Yeah, we\'ve had a cash flow issue this month.' },
      { speaker: 'Agent', text: 'Understood. I can set up a two-part payment — 50% today and the balance in 30 days. Would that work?' },
      { speaker: 'Customer', text: 'Yes, that\'d really help.' },
      { speaker: 'Agent', text: 'Done. I\'ve logged the arrangement and sent a confirmation to your billing email.' },
    ],
    color: '#84cc16',
    accent: '#65a30d',
  },
  {
    id: 'hr-screening',
    vertical: 'Operations',
    name: 'HR Screening Agent',
    tagline: 'Runs first-round candidate screens at any volume.',
    description: 'Conducts structured phone screens against your role-specific criteria, scores candidate fit across hard and soft skills, and schedules shortlisted applicants directly into your ATS — compressing weeks of recruiter time into hours. Handles hundreds of candidates per day without fatigue or bias drift.',
    stat: { val: '70%', label: 'reduction in time-to-screen' },
    efficiency: 'Screens 500+ candidates per day',
    metrics: [
      { label: 'Screens per day', val: '500+' },
      { label: 'Hiring manager satisfaction', val: '4.8/5' },
      { label: 'Time-to-screen reduction', val: '70%' },
    ],
    useCases: ['High-volume recruiting', 'Seasonal hiring ramps', 'Campus recruiting', 'Role-specific technical screens'],
    capabilities: ['Structured phone screens', 'Role-fit conversation', 'Webhook candidate data push', 'Interview scheduling', 'Candidate feedback loops', 'Consistent screening scripts'],
    callSim: [
      { speaker: 'Agent', text: 'Hi Deepak, I\'m Aria from the recruiting team. Thanks for applying for the Account Executive role. This will take about 10 minutes.' },
      { speaker: 'Candidate', text: 'Of course, ready when you are.' },
      { speaker: 'Agent', text: 'Walk me through your most successful deal — size, cycle length, and your specific role in closing it.' },
      { speaker: 'Candidate', text: 'Sure — it was a ₹45L deal with a 4-month cycle. I ran the entire commercial process end to end.' },
      { speaker: 'Agent', text: 'Great. I\'m scheduling you with the hiring manager for Tuesday — you\'ll get a calendar invite shortly.' },
    ],
    color: '#a855f7',
    accent: '#9333ea',
  },
] as const;

type AgentId = (typeof AGENTS)[number]['id'];

const VERTICALS = ['All', 'Sales', 'Customer Support', 'Scheduling', 'Operations'] as const;
type Vertical = (typeof VERTICALS)[number];

const VERTICAL_DESCS: Record<string, string> = {
  Sales:             'Close more revenue with agents that prospect, qualify, and book — at machine scale.',
  'Customer Support':'Resolve issues instantly and protect every customer relationship automatically.',
  Scheduling:        'Fill every calendar slot, event seat, and meeting slot without lifting a finger.',
  Operations:        'Automate the back-office work that slows your team down every single day.',
};

/* ─── Live call simulation ───────────────────────────────────────────────── */
function CallSimulator({ agent }: { agent: (typeof AGENTS)[number] }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [typing, setTyping]   = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLineIdx(0);
    setTyping(false);
  }, [agent.id]);

  useEffect(() => {
    if (lineIdx >= agent.callSim.length) return;
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      const t2 = setTimeout(() => setLineIdx(i => i + 1), 280);
      return () => clearTimeout(t2);
    }, 900 + agent.callSim[lineIdx].text.length * 12);
    return () => clearTimeout(t);
  }, [lineIdx, agent]);

  /* Scroll to bottom inside the fixed-height container only */
  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lineIdx, typing]);

  const shown = agent.callSim.slice(0, lineIdx);

  return (
    <div>
      {/* Call header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b" style={{ borderColor: '#ffffff08' }}>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-semibold text-emerald-400">LIVE CALL</span>
        </div>
        <div className="flex-1 h-px" style={{ background: '#ffffff08' }} />
        <span className="text-[10px] font-mono truncate max-w-[120px]" style={{ color: '#52525b' }}>
          {agent.name}
        </span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: '#ef4444' }} />
          <div className="w-2 h-2 rounded-full" style={{ background: '#f59e0b' }} />
          <div className="w-2 h-2 rounded-full" style={{ background: '#22c55e' }} />
        </div>
      </div>

      {/* Fixed-height message area — does NOT trap page scroll */}
      <div ref={containerRef} className="px-5 py-4 space-y-3 overflow-y-auto" style={{ height: 340, overscrollBehavior: 'contain' }}>
        <AnimatePresence initial={false}>
          {shown.map((line, i) => {
            const isAgent = line.speaker === 'Agent';
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}
                className={`flex ${isAgent ? 'justify-start' : 'justify-end'}`}>
                <div style={{ maxWidth: '84%' }}>
                  <p className="text-[10px] font-semibold mb-1 px-1" style={{ color: isAgent ? agent.color : '#71717a' }}>
                    {isAgent ? 'Aria (AI)' : 'Prospect'}
                  </p>
                  <div className="px-3.5 py-2.5 rounded-2xl text-[12px] leading-relaxed"
                    style={{
                      background: isAgent ? `${agent.color}18` : '#ffffff08',
                      border: `1px solid ${isAgent ? agent.color + '28' : '#ffffff0d'}`,
                      color: '#d4d4d8',
                    }}>
                    {line.text}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {typing && lineIdx < agent.callSim.length && (
            <motion.div key="typing"
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className={`flex ${agent.callSim[lineIdx].speaker === 'Agent' ? 'justify-start' : 'justify-end'}`}>
              <div className="px-4 py-3 rounded-2xl" style={{ background: '#ffffff08', border: '1px solid #ffffff10' }}>
                <div className="flex gap-1.5 items-center" style={{ height: 14 }}>
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: '#52525b' }}
                      animate={{ y: [0, -4, 0] }} transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.15 }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {lineIdx >= agent.callSim.length && (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-2">
              <span className="text-[11px] px-3 py-1.5 rounded-full font-medium"
                style={{ background: '#22c55e18', color: '#22c55e', border: '1px solid #22c55e30' }}>
                Call completed &mdash; outcome logged via webhook
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Replay */}
      <div className="px-5 pb-4 pt-1">
        <button onClick={() => setLineIdx(0)}
          className="w-full py-2 rounded-lg text-[12px] font-medium transition-all"
          style={{ background: '#ffffff06', border: '1px solid #ffffff0d', color: lineIdx >= agent.callSim.length ? '#a1a1aa' : '#3f3f46' }}>
          {lineIdx >= agent.callSim.length ? '↺ Replay call' : '⏸ Running...'}
        </button>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function AgentsPage() {
  const [filter,   setFilter]   = useState<Vertical>('All');
  const [activeId, setActiveId] = useState<AgentId>('sales-qualifier');
  const [paused,   setPaused]   = useState(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visible = (filter === 'All' ? AGENTS : AGENTS.filter(a => a.vertical === filter)) as typeof AGENTS[number][];
  const agent   = AGENTS.find(a => a.id === activeId) ?? visible[0];

  /* Sync activeId when filter changes */
  useEffect(() => {
    const ids = visible.map(a => a.id);
    if (!ids.includes(activeId)) setActiveId(ids[0] as AgentId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  /* Auto-rotation every 4 s — pauses for 10 s after any manual pick */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveId(cur => {
        const pool = (filter === 'All' ? AGENTS : AGENTS.filter(a => a.vertical === filter));
        const ids  = pool.map(a => a.id) as AgentId[];
        const idx  = ids.indexOf(cur);
        return ids[(idx + 1) % ids.length] ?? ids[0];
      });
    }, 4000);
    return () => clearInterval(id);
  }, [paused, filter]);

  const pickAgent = (id: AgentId) => {
    setActiveId(id);
    setPaused(true);
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setPaused(false), 10000);
  };

  return (
    <>
      <Navbar />
      <main style={{ background: '#06070a' }}>

        {/* ══════════════════════════════════════════
            HERO
            ══════════════════════════════════════════ */}
        <section className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24 lg:pb-28 px-4 md:px-6">
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div className="absolute rounded-full"
              style={{ width: 700, height: 700, top: '-200px', left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }}
              animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div className="absolute rounded-full"
              style={{ width: 500, height: 500, top: '0', right: '-100px', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(70px)' }}
              animate={{ y: [0, 40, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] mb-7"
                style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                AI Agent Fleet
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
              className="text-[30px] sm:text-[44px] md:text-[60px] lg:text-[72px] font-extrabold text-white leading-[1.02] mb-6"
              style={{ letterSpacing: '-0.04em' }}>
              Every agent your<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #60a5fa 0%, #a78bfa 50%, #818cf8 100%)' }}>
                business will ever need.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }}
              className="text-[17px] leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: '#71717a' }}>
              Emaavy agents are purpose-built for specific business functions — not generic chatbots. Each one is trained, tested, and deployed to handle the work at a scale no human team can match.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 flex-wrap">
              <Link href="/book-demo"
                className="px-7 py-3.5 rounded-xl text-[14px] font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)', boxShadow: '0 4px 24px rgba(99,102,241,0.35)' }}>
                See agents live &rarr;
              </Link>
              <a href="#fleet"
                className="px-7 py-3.5 rounded-xl text-[14px] font-medium transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#a1a1aa' }}>
                Browse all agents
              </a>
            </motion.div>
          </div>

          {/* Stat bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28 }}
            className="relative z-10 max-w-4xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
            style={{ border: '1px solid #ffffff0a', background: '#ffffff06' }}>
            {[
              { val: '9',     label: 'Purpose-built agents' },
              { val: '4',     label: 'Business verticals' },
              { val: '1M+', label: 'Calls handled monthly' },
              { val: '<500ms', label: 'Avg. response latency' },
            ].map((s, i) => (
              <div key={i} className="px-8 py-7 text-center" style={{ background: '#06070a' }}>
                <p className="text-[30px] font-extrabold text-white mb-1 font-mono" style={{ letterSpacing: '-0.04em' }}>{s.val}</p>
                <p className="text-[11px] font-medium" style={{ color: '#52525b' }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            WHAT MAKES EMAAVY AGENTS DIFFERENT
            ══════════════════════════════════════════ */}
        <section className="py-14 md:py-20 lg:py-24 px-4 md:px-6 border-y" style={{ borderColor: '#ffffff06', background: '#08090d' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: '#52525b' }}>Why Emaavy</p>
              <h2 className="text-[26px] sm:text-[34px] md:text-[44px] lg:text-[48px] font-bold text-white" style={{ letterSpacing: '-0.03em' }}>
                Not chatbots. Not voicebots.<br />Purpose-built agents.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Role-specific training',
                  body: 'Every Emaavy agent is trained on thousands of real calls within its specific vertical — sales, support, scheduling, or operations. They handle edge cases a generic AI never will.',
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 01-2.16 2.246M5 14.5a2.25 2.25 0 002.16 2.246m10.48 0a18.75 18.75 0 01-10.3 0" />
                    </svg>
                  ),
                  color: '#3b82f6',
                },
                {
                  title: 'Live system integrations',
                  body: 'Agents don\'t just talk — they act. Every call outcome fires a webhook to your backend, books into your calendar, or sends a WhatsApp follow-up in real time. No manual logging, ever.',
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                  ),
                  color: '#8b5cf6',
                },
                {
                  title: 'Instant deployment',
                  body: 'From setup to first live call in under 20 minutes. Connect your CRM, upload your script, set your call rules — and the agent starts working. No engineering, no training cycles.',
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  ),
                  color: '#10b981',
                },
                {
                  title: 'Human-quality voice',
                  body: 'Powered by ElevenLabs, Emaavy agents speak with natural cadence, handle interruptions, and manage cross-talk seamlessly — clear, warm voices that callers actually want to listen to.',
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                    </svg>
                  ),
                  color: '#f59e0b',
                },
                {
                  title: 'Full compliance controls',
                  body: 'TCPA and GDPR compliant out of the box. Every call is recorded, transcribed, and stored with full audit trails. DNC list enforcement, consent verification, and data residency controls built in.',
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                  color: '#ec4899',
                },
                {
                  title: 'Real-time analytics',
                  body: 'Every conversation generates structured data — full transcripts, talk ratios, call outcomes, and conversion rates. Your managers see more insight from AI calls than they ever had from manual processes.',
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                  ),
                  color: '#06b6d4',
                },
              ].map((f, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="rounded-2xl p-7"
                  style={{ background: '#0d0e13', border: '1px solid #ffffff08' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${f.color}18`, border: `1px solid ${f.color}28`, color: f.color }}>
                    {f.icon}
                  </div>
                  <h3 className="text-[15px] font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#52525b' }}>{f.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            AGENT FLEET — INTERACTIVE
            ══════════════════════════════════════════ */}
        <section id="fleet" className="py-14 md:py-20 lg:py-24 px-4 md:px-6" style={{ background: '#06070a' }}>
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="mb-12">
              <p className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: '#52525b' }}>The Fleet</p>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <h2 className="text-[26px] sm:text-[34px] md:text-[44px] lg:text-[48px] font-bold text-white leading-[1.06]" style={{ letterSpacing: '-0.03em' }}>
                  Meet your agents.
                </h2>
                <p className="max-w-md text-[14px] leading-relaxed" style={{ color: '#52525b' }}>
                  Click any agent to see a live call simulation, full capability breakdown, and real-world metrics.
                </p>
              </div>
            </div>

            {/* Vertical filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {VERTICALS.map(v => {
                const isActive = v === filter;
                return (
                  <button key={v} onClick={() => setFilter(v)}
                    className="px-4 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-200"
                    style={{
                      background: isActive ? '#ffffff10' : 'transparent',
                      border:     `1px solid ${isActive ? '#ffffff1a' : 'transparent'}`,
                      color:      isActive ? '#e4e4e7' : '#52525b',
                    }}>
                    {v}
                  </button>
                );
              })}
            </div>

            {/* Vertical description */}
            <AnimatePresence mode="wait">
              {filter !== 'All' && (
                <motion.p key={filter}
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[13px] mb-6 -mt-2" style={{ color: '#52525b' }}>
                  {VERTICAL_DESCS[filter]}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Main layout: list + detail + simulator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

              {/* Agent list */}
              <div className="lg:col-span-3" style={{ borderTop: '1px solid #ffffff06' }}>
                <AnimatePresence mode="popLayout">
                  {visible.map((a, i) => {
                    const isActive = a.id === activeId;
                    return (
                      <motion.button key={a.id}
                        onClick={() => pickAgent(a.id as AgentId)}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.18, delay: i * 0.03 }}
                        className="w-full text-left flex items-center gap-3 py-4 px-3 transition-all duration-150"
                        style={{ borderBottom: '1px solid #ffffff05', background: isActive ? '#ffffff06' : 'transparent' }}>
                        <div className="w-1 h-7 rounded-full flex-shrink-0 transition-all duration-300"
                          style={{ background: isActive ? a.color : '#ffffff08' }} />
                        <div className="min-w-0 flex-1">
                          <p className="text-[12.5px] font-semibold truncate"
                            style={{ color: isActive ? '#fff' : '#71717a' }}>{a.name}</p>
                          <p className="text-[10px] truncate mt-0.5" style={{ color: '#3f3f46' }}>{a.vertical}</p>
                        </div>
                        {isActive && (
                          <motion.div layoutId="active-dot" className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: a.color }} />
                        )}
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Detail panel */}
              <div className="lg:col-span-5">
                <AnimatePresence mode="wait">
                  <motion.div key={agent.id}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl overflow-hidden"
                    style={{ background: '#0d0e13', border: '1px solid #ffffff08' }}>

                    {/* Top */}
                    <div className="px-5 sm:px-7 pt-6 sm:pt-7 pb-6" style={{ borderBottom: '1px solid #ffffff06' }}>
                      <span className="text-[10px] font-semibold uppercase tracking-widest mb-3 block" style={{ color: '#3f3f46' }}>
                        {agent.vertical}
                      </span>
                      <h3 className="text-[22px] font-bold text-white mb-2" style={{ letterSpacing: '-0.02em' }}>{agent.name}</h3>
                      <p className="text-[13px] leading-relaxed mb-5" style={{ color: '#71717a' }}>{agent.tagline}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-[38px] font-extrabold text-white font-mono" style={{ letterSpacing: '-0.04em', color: agent.color }}>
                          {agent.stat.val}
                        </span>
                        <span className="text-[12px]" style={{ color: '#52525b' }}>{agent.stat.label}</span>
                      </div>
                      <p className="text-[11px] mt-1 font-medium" style={{ color: agent.color + 'cc' }}>{agent.efficiency}</p>
                    </div>

                    {/* Description */}
                    <div className="px-7 py-5" style={{ borderBottom: '1px solid #ffffff06' }}>
                      <p className="text-[13px] leading-[1.9]" style={{ color: '#52525b' }}>{agent.description}</p>
                    </div>

                    {/* Metrics */}
                    <div className="px-7 py-5" style={{ borderBottom: '1px solid #ffffff06' }}>
                      <p className="text-[10px] uppercase tracking-widest mb-4" style={{ color: '#3f3f46' }}>Live metrics</p>
                      <div className="grid grid-cols-3 gap-3">
                        {agent.metrics.map((m, i) => (
                          <div key={i} className="rounded-xl p-3.5" style={{ background: '#06070a', border: '1px solid #ffffff06' }}>
                            <p className="text-[17px] font-bold text-white font-mono mb-0.5">{m.val}</p>
                            <p className="text-[10px] leading-tight" style={{ color: '#3f3f46' }}>{m.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Use cases */}
                    <div className="px-7 py-5" style={{ borderBottom: '1px solid #ffffff06' }}>
                      <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: '#3f3f46' }}>Common use cases</p>
                      <div className="flex flex-wrap gap-2">
                        {agent.useCases.map((uc, i) => (
                          <span key={i} className="px-3 py-1 rounded-full text-[11px] font-medium"
                            style={{ background: `${agent.color}12`, border: `1px solid ${agent.color}25`, color: agent.color }}>
                            {uc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Capabilities */}
                    <div className="px-7 py-5">
                      <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: '#3f3f46' }}>What this agent does</p>
                      <div className="grid grid-cols-2 gap-2.5">
                        {agent.capabilities.map((cap, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={agent.color} strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-[12px]" style={{ color: '#71717a' }}>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Live call simulator */}
              <div className="lg:col-span-4">
                <AnimatePresence mode="wait">
                  <motion.div key={agent.id}
                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl overflow-hidden"
                    style={{ background: '#0d0e13', border: `1px solid ${agent.color}25` }}>
                    <CallSimulator agent={agent} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            BY VERTICAL — IN DEPTH
            ══════════════════════════════════════════ */}
        <section className="py-24 px-6 border-t" style={{ borderColor: '#ffffff06', background: '#08090d' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: '#52525b' }}>By vertical</p>
              <h2 className="text-[38px] md:text-[46px] font-bold text-white" style={{ letterSpacing: '-0.03em' }}>
                Built for every part of your business.
              </h2>
            </div>

            <div className="space-y-6">
              {([
                {
                  name: 'Sales',
                  color: '#3b82f6',
                  headline: 'Pipeline that never sleeps.',
                  body: 'Emaavy sales agents run outbound sequences, respond to every inbound lead instantly, re-engage dormant accounts, and book meetings — simultaneously, around the clock. They handle objections, personalise every conversation, and push outcomes via webhook automatically. Your human reps inherit booked meetings — not cold lead lists.',
                  numbers: [
                    { val: '340+', label: 'dials per hour' },
                    { val: '41%',  label: 'meeting booked rate' },
                    { val: '12x',  label: 'output vs. human SDR' },
                  ],
                  agents: ['Inbound Response Agent', 'Outbound SDR', 'Win-Back Agent'],
                },
                {
                  name: 'Customer Support',
                  color: '#f59e0b',
                  headline: 'Support that resolves, not just responds.',
                  body: 'Most AI support tools can only deflect simple queries. Emaavy support agents actually resolve issues — they access your knowledge base, take action in your systems, issue refunds, reset accounts, and escalate complex cases to humans with full context already loaded. Your customers wait less. Your agents do more.',
                  numbers: [
                    { val: '68%',  label: 'auto-resolution rate' },
                    { val: '2.1m', label: 'avg. handle time' },
                    { val: '4.7',  label: 'CSAT score' },
                  ],
                  agents: ['Support Triage Agent', 'Customer Success Agent'],
                },
                {
                  name: 'Scheduling',
                  color: '#06b6d4',
                  headline: 'Every slot filled. Every lead followed up.',
                  body: 'Speed-to-lead wins deals. Emaavy scheduling agents respond to every inbound enquiry in under 90 seconds, qualify the prospect, and book directly into your team\'s calendar. For events and webinars, they run full attendee outreach campaigns, handle all registration questions, and reduce no-shows by up to 40% with smart reminder sequences.',
                  numbers: [
                    { val: '82s',  label: 'avg. response time' },
                    { val: '78%',  label: 'meeting show rate' },
                    { val: '38%',  label: 'event registration rate' },
                  ],
                  agents: ['Appointment Setter', 'Event Registration Agent'],
                },
                {
                  name: 'Operations',
                  color: '#10b981',
                  headline: 'Automate the work that holds your team back.',
                  body: 'Back-office operations are full of high-volume, repetitive phone work that eats headcount without generating revenue. Emaavy operations agents handle collections calls with compliant, professional scripts, run structured HR phone screens at scale, and feed every outcome directly into your billing or ATS system. Compress weeks of work into hours.',
                  numbers: [
                    { val: '54%',  label: 'collections recovery rate' },
                    { val: '500+', label: 'HR screens per day' },
                    { val: '70%',  label: 'time-to-screen reduction' },
                  ],
                  agents: ['Collections Agent', 'HR Screening Agent'],
                },
              ] as const).map((vert, vi) => (
                <motion.div key={vert.name}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.45, delay: vi * 0.05 }}
                  className="rounded-2xl p-8 md:p-10 grid md:grid-cols-2 gap-10"
                  style={{ background: '#0d0e13', border: '1px solid #ffffff08' }}>
                  {/* Left */}
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-5"
                      style={{ background: `${vert.color}15`, color: vert.color, border: `1px solid ${vert.color}25` }}>
                      {vert.name}
                    </span>
                    <h3 className="text-[24px] font-bold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>{vert.headline}</h3>
                    <p className="text-[13.5px] leading-[1.85]" style={{ color: '#52525b' }}>{vert.body}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {vert.agents.map(a => (
                        <button key={a} onClick={() => { setFilter(vert.name as Vertical); pickAgent(AGENTS.find(ag => ag.name === a)!.id as AgentId); document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' }); }}
                          className="px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all hover:opacity-80"
                          style={{ background: `${vert.color}12`, border: `1px solid ${vert.color}25`, color: vert.color }}>
                          {a} &rarr;
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Right — numbers */}
                  <div className="flex flex-col justify-center gap-5">
                    {vert.numbers.map((n, i) => (
                      <div key={i} className="flex items-center gap-5">
                        <span className="text-[36px] font-extrabold font-mono shrink-0" style={{ color: vert.color, letterSpacing: '-0.04em' }}>
                          {n.val}
                        </span>
                        <div className="flex-1 h-px" style={{ background: `${vert.color}15` }} />
                        <span className="text-[12px] shrink-0" style={{ color: '#52525b' }}>{n.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            HOW AGENTS WORK
            ══════════════════════════════════════════ */}
        <section className="py-24 px-6 border-t" style={{ borderColor: '#ffffff06', background: '#06070a' }}>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: '#52525b' }}>Under the hood</p>
            <h2 className="text-[38px] md:text-[46px] font-bold text-white mb-16" style={{ letterSpacing: '-0.03em' }}>
              From zero to first call in 20 minutes.
            </h2>
            <div className="relative">
              {/* Connector line */}
              <div className="absolute left-1/2 top-8 bottom-8 w-px -translate-x-1/2 hidden md:block"
                style={{ background: 'linear-gradient(to bottom, transparent, #ffffff10 20%, #ffffff10 80%, transparent)' }} />
              <div className="space-y-6">
                {[
                  { step: '01', title: 'Connect your stack', body: 'Link your telephony, calendar, and webhook endpoint. Emaavy fires call outcomes to your backend in real time — no manual uploads.' },
                  { step: '02', title: 'Define the agent', body: 'Choose a role, upload your call script or let Emaavy generate one, set your call rules, and configure escalation flows.' },
                  { step: '03', title: 'Run a test call', body: 'Place a live test call to yourself. Hear exactly how the agent sounds, edit the script in real time, and replay edge cases.' },
                  { step: '04', title: 'Go live', body: 'Flip the switch. Your agent starts handling real calls immediately — responding to leads, booking meetings, or collecting payments.' },
                  { step: '05', title: 'Analyse & improve', body: 'Every call generates a full transcript and outcome log. Continuously tune your agent from the analytics dashboard.' },
                ].map((s, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="relative flex flex-col md:flex-row items-start md:items-center gap-5 text-left rounded-2xl p-7"
                    style={{ background: '#0d0e13', border: '1px solid #ffffff08' }}>
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0 font-mono text-[13px] font-bold"
                      style={{ background: '#06070a', border: '1px solid #ffffff0a', color: '#3f3f46' }}>
                      {s.step}
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-white mb-1">{s.title}</p>
                      <p className="text-[13px] leading-relaxed" style={{ color: '#52525b' }}>{s.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CTA
            ══════════════════════════════════════════ */}
        <section className="py-28 px-6 border-t relative overflow-hidden" style={{ borderColor: '#ffffff06', background: '#08090d' }}>
          <div className="absolute inset-0 pointer-events-none">
            <motion.div className="absolute rounded-full"
              style={{ width: 600, height: 600, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }}
              animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-[40px] md:text-[52px] font-extrabold text-white mb-5" style={{ letterSpacing: '-0.035em' }}>
              Ready to deploy<br />your first agent?
            </h2>
            <p className="text-[15px] leading-relaxed mb-10" style={{ color: '#52525b' }}>
              Book a 30-minute live demo. We&apos;ll configure an agent for your exact workflow and show it working — before the call ends.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/book-demo"
                className="px-8 py-4 rounded-xl text-[15px] font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)', boxShadow: '0 4px 24px rgba(99,102,241,0.4)' }}>
                Book a live demo &rarr;
              </Link>
              <Link href="/platform"
                className="px-8 py-4 rounded-xl text-[14px] font-medium transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#71717a' }}>
                Explore the platform
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
              {['SOC 2 Type II', 'GDPR compliant', '20 min to first live call'].map(b => (
                <span key={b} className="flex items-center gap-1.5 text-[12px]" style={{ color: '#3f3f46' }}>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
