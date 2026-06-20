'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  HiOutlineDevicePhoneMobile, HiOutlineCpuChip, HiOutlineMicrophone,
  HiOutlineSpeakerWave, HiOutlineWrenchScrewdriver, HiOutlineCheckCircle,
  HiOutlineBolt, HiOutlineGlobeAlt, HiOutlineShieldCheck,
  HiOutlineArrowTrendingUp, HiOutlineSignal, HiOutlineCommandLine,
} from 'react-icons/hi2';
import {
  SiTwilio, SiVonage, SiOpenai, SiAnthropic, SiGoogle, SiMistralai, SiMeta,
  SiElevenlabs, SiDeepgram,
  SiSalesforce, SiHubspot, SiSlack, SiWhatsapp, SiShopify, SiStripe,
  SiNotion, SiZapier, SiAirtable, SiIntercom, SiZoom, SiZoho,
  SiAircall, SiCalendly,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

/* ─── Brand registry ──────────────────────────────────────────────────────── */
type BrandEntry = { color: string; Icon?: IconType; initials?: string };

const BRANDS: Record<string, BrandEntry> = {
  /* Telephony */
  Twilio:      { color: '#F22F46', Icon: SiTwilio },
  Plivo:       { color: '#5856D6', initials: 'PL' },
  Exotel:      { color: '#1A56DB', initials: 'EX' },
  Telnyx:      { color: '#00C5C1', initials: 'TX' },
  Vonage:      { color: '#7C3AED', Icon: SiVonage },
  Bandwidth:   { color: '#E63946', initials: 'BW' },
  Aircall:     { color: '#00D4B1', Icon: SiAircall },
  RingCentral: { color: '#F6821F', initials: 'RC' },
  /* LLM */
  OpenAI:        { color: '#10A37F', Icon: SiOpenai },
  Anthropic:     { color: '#D97757', Icon: SiAnthropic },
  Google:        { color: '#4285F4', Icon: SiGoogle },
  Mistral:       { color: '#FF7000', Icon: SiMistralai },
  Meta:          { color: '#0866FF', Icon: SiMeta },
  Groq:          { color: '#F55036', initials: 'GQ' },
  'Together AI': { color: '#6C47FF', initials: 'TA' },
  Cohere:        { color: '#39B2AC', initials: 'CO' },
  /* STT */
  Deepgram:    { color: '#13EF95', Icon: SiDeepgram },
  'Sarvam AI': { color: '#FF6B35', initials: 'SA' },
  AssemblyAI:  { color: '#6B7FFF', initials: 'AS' },
  Rev:         { color: '#0070C9', initials: 'RV' },
  Microsoft:   { color: '#00A4EF', initials: 'MS' },
  Amazon:      { color: '#FF9900', initials: 'AW' },
  /* TTS */
  ElevenLabs:  { color: '#c8f96a', Icon: SiElevenlabs },
  PlayHT:      { color: '#7B2FBE', initials: 'PH' },
  LMNT:        { color: '#2563EB', initials: 'LM' },
  /* Tools */
  Salesforce:  { color: '#00A1E0', Icon: SiSalesforce },
  HubSpot:     { color: '#FF7A59', Icon: SiHubspot },
  Slack:       { color: '#E01E5A', Icon: SiSlack },
  WhatsApp:    { color: '#25D366', Icon: SiWhatsapp },
  Shopify:     { color: '#96BF48', Icon: SiShopify },
  Stripe:      { color: '#635BFF', Icon: SiStripe },
  Notion:      { color: '#e2e2e2', Icon: SiNotion },
  Zapier:      { color: '#FF4A00', Icon: SiZapier },
  Airtable:    { color: '#FCB400', Icon: SiAirtable },
  Pipedrive:   { color: '#4B7BF5', initials: 'PD' },
  Zoho:        { color: '#E42527', Icon: SiZoho },
  Intercom:    { color: '#286EFA', Icon: SiIntercom },
  Freshdesk:   { color: '#25C16F', initials: 'FD' },
  Calendly:    { color: '#006BFF', Icon: SiCalendly },
  Zoom:        { color: '#2D8CFF', Icon: SiZoom },
};

function Chip({ name, badge }: { name: string; badge?: string }) {
  const brand = BRANDS[name] ?? { color: '#6366f1', initials: name.slice(0, 2).toUpperCase() };
  const { Icon, color, initials } = brand;

  return (
    <div className="group relative flex flex-col items-center gap-3 rounded-2xl border border-white/8 p-5 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-2xl"
      style={{ background: 'rgba(255,255,255,0.03)' }}>
      {badge && (
        <span className="absolute right-2.5 top-2.5 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
          style={{ background: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.6)' }}>
          {badge}
        </span>
      )}
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300"
        style={{ background: 'rgba(255,255,255,0.06)' }}>
        {/* Default: dim white */}
        {Icon ? (
          <Icon className="h-7 w-7 transition-all duration-300 group-hover:opacity-0"
            style={{ color: 'rgba(255,255,255,0.30)' }} />
        ) : (
          <span className="text-base font-black tracking-tight transition-all duration-300 group-hover:opacity-0"
            style={{ color: 'rgba(255,255,255,0.30)' }}>
            {initials ?? name.slice(0, 2).toUpperCase()}
          </span>
        )}
        {/* Hover: real brand colour fades in */}
        <span className="absolute inset-0 flex items-center justify-center rounded-2xl opacity-0 transition-all duration-300 group-hover:opacity-100"
          style={{ background: color + '1a' }}>
          {Icon ? (
            <Icon className="h-7 w-7" style={{ color }} />
          ) : (
            <span className="text-base font-black tracking-tight" style={{ color }}>
              {initials ?? name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </span>
      </div>
      <p className="text-xs font-semibold text-white/60 transition-colors duration-300 group-hover:text-white leading-tight">{name}</p>
    </div>
  );
}

/* ─── Animated section wrapper ────────────────────────────────────────────── */
function FadeSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Category nav pill ───────────────────────────────────────────────────── */
const CATS = [
  { id: 'telephony', label: 'Telephony', Icon: HiOutlineDevicePhoneMobile, color: '#3B82F6' },
  { id: 'llm',       label: 'LLM',       Icon: HiOutlineCpuChip,           color: '#8B5CF6' },
  { id: 'stt',       label: 'Speech to Text', Icon: HiOutlineMicrophone,   color: '#10B981' },
  { id: 'tts',       label: 'Text to Speech', Icon: HiOutlineSpeakerWave,  color: '#F43F5E' },
  { id: 'tools',     label: 'Tools',     Icon: HiOutlineWrenchScrewdriver, color: '#F59E0B' },
];

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function IntegrationsPage() {
  const [active, setActive] = useState('telephony');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) setActive(e.target.id);
      }
    }, { threshold: 0.35 });
    CATS.forEach(c => { const el = document.getElementById(c.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen" style={{ background: '#060913' }}>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pb-20 pt-40 text-center">
        {/* background orbs */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 65%)', filter: 'blur(80px)' }}
            animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
          <div className="absolute -left-32 top-1/3 h-64 w-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 65%)', filter: 'blur(60px)' }} />
          <div className="absolute -right-32 top-1/3 h-64 w-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #F43F5E 0%, transparent 65%)', filter: 'blur(60px)' }} />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400">
              <HiOutlineBolt className="h-3 w-3" /> 100+ Native Integrations
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Everything connects.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">Nothing breaks.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Emaavy plugs into every layer of your AI voice stack — telephony, language models, transcription, synthesis, and your entire business toolkit — all from a single platform.
          </motion.p>

          {/* stat strip */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: HiOutlineGlobeAlt,       val: '100+',   label: 'Integrations' },
              { icon: HiOutlineSignal,          val: '<500ms', label: 'Avg latency' },
              { icon: HiOutlineShieldCheck,     val: 'SOC 2',  label: 'Certified' },
              { icon: HiOutlineArrowTrendingUp, val: '99.9%',  label: 'Uptime SLA' },
            ].map(({ icon: Icon, val, label }) => (
              <div key={val} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
                <Icon className="h-4 w-4 text-indigo-400" />
                <span className="text-sm font-bold text-white">{val}</span>
                <span className="text-xs text-white/40">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Sticky category nav ──────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 border-b px-4 py-3"
        style={{ background: 'rgba(6,9,19,0.92)', backdropFilter: 'blur(16px)', borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-2 overflow-x-auto pb-0.5">
          {CATS.map(({ id, label, Icon, color }) => (
            <button key={id} onClick={() => scrollTo(id)}
              className="flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200"
              style={active === id
                ? { background: color + '22', borderColor: color + '66', color }
                : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 1 — TELEPHONY
          ════════════════════════════════════════════════════════════════════ */}
      <section id="telephony" className="relative overflow-hidden px-4 py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 top-20 h-96 w-96 rounded-full opacity-[0.12]"
            style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 65%)', filter: 'blur(80px)' }} />
          <div className="absolute -left-20 bottom-20 h-64 w-64 rounded-full opacity-[0.08]"
            style={{ background: 'radial-gradient(circle, #60A5FA 0%, transparent 65%)', filter: 'blur(60px)' }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <FadeSection>
            <div className="mb-16 flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-400">
                  <HiOutlineDevicePhoneMobile className="h-4 w-4" /> Telephony
                </div>
                <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  Voice infrastructure<br />
                  <span className="text-blue-400">built for scale.</span>
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-white/60">
                  Deploy AI calling agents on India&apos;s most reliable telephony networks. Emaavy connects natively with Vobiz, Exotel, Plivo, and Twilio — with automatic failover so your calls never drop.
                </p>
              </div>
              <div className="shrink-0 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 text-center">
                <p className="text-4xl font-black text-blue-400">&lt;500ms</p>
                <p className="mt-1 text-sm text-white/50">Avg connect time</p>
              </div>
            </div>
          </FadeSection>

          {/* Feature highlights */}
          <FadeSection>
            <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: HiOutlineBolt,          label: 'Sub-500ms connect time',   desc: 'Agent picks up before the second ring' },
                { icon: HiOutlineGlobeAlt,      label: 'India & global coverage',  desc: 'Vobiz, Exotel, Plivo, and Twilio supported' },
                { icon: HiOutlineShieldCheck,   label: 'Automatic failover',       desc: 'If one carrier drops, another takes over instantly' },
                { icon: HiOutlineCommandLine,   label: 'Bring your own number',    desc: 'Connect your existing numbers in seconds' },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15">
                    <Icon className="h-4.5 w-4.5 text-blue-400" />
                  </div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/50">{desc}</p>
                </div>
              ))}
            </div>
          </FadeSection>

          {/* Provider grid */}
          <FadeSection>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-white/30">Supported Providers</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
              {[
                { name: 'Vobiz',       badge: 'Native' },
                { name: 'Exotel',      badge: 'India' },
                { name: 'Plivo',       badge: 'Live' },
                { name: 'Twilio',      badge: 'Live' },
                { name: 'Telnyx',      badge: 'Soon' },
                { name: 'Vonage',      badge: 'Soon' },
                { name: 'Aircall',     badge: 'Soon' },
                { name: 'RingCentral', badge: 'Soon' },
              ].map(p => <Chip key={p.name} name={p.name} badge={p.badge} />)}
            </div>
          </FadeSection>

          {/* Provider detail cards */}
          <FadeSection className="mt-10">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { name: 'Vobiz',  desc: "Emaavy's native telephony partner for India — the default carrier powering every Emaavy call out of the box." },
                { name: 'Exotel', desc: "India's leading cloud telephony platform, built for high-volume enterprise calling with strong local reliability." },
                { name: 'Plivo',  desc: 'High-volume voice API with strong India and global coverage — ideal for large outbound campaign volumes.' },
                { name: 'Twilio', desc: 'Global programmable voice with wide number availability and automatic failover across regions.' },
              ].map(({ name, desc }) => {
                const brand = BRANDS[name] ?? { color: '#6366f1' };
                const BIcon = brand.Icon;
                return (
                  <div key={name} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: brand.color + '22' }}>
                      {BIcon
                        ? <BIcon className="h-5 w-5" style={{ color: brand.color }} />
                        : <span className="text-xs font-black" style={{ color: brand.color }}>{brand.initials ?? name.slice(0,2).toUpperCase()}</span>
                      }
                    </div>
                    <h4 className="font-semibold text-white">{name}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-white/50">{desc}</p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-blue-400">
                      <HiOutlineCheckCircle className="h-3.5 w-3.5" /> Native integration
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeSection>

          {/* Use cases */}
          <FadeSection className="mt-10">
            <div className="flex flex-wrap gap-2">
              {['AI outbound sales calls', 'Appointment reminders', 'Inbound support routing', 'IVR replacement', 'Lead follow-up campaigns', 'Payment collection calls', 'Survey automation'].map(uc => (
                <span key={uc} className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 px-3 py-1.5 text-xs font-medium text-blue-300">
                  <HiOutlineCheckCircle className="h-3 w-3" /> {uc}
                </span>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── Section divider ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)' }} />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 2 — LLM
          ════════════════════════════════════════════════════════════════════ */}
      <section id="llm" className="relative overflow-hidden px-4 py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-20 h-96 w-96 rounded-full opacity-[0.14]"
            style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 65%)', filter: 'blur(90px)' }} />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full opacity-[0.08]"
            style={{ background: 'radial-gradient(circle, #A78BFA 0%, transparent 65%)', filter: 'blur(70px)' }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <FadeSection>
            <div className="mb-16 flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-semibold text-violet-400">
                  <HiOutlineCpuChip className="h-4 w-4" /> LLM Providers
                </div>
                <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  Best model for<br />
                  <span className="text-violet-400">every task.</span>
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-white/60">
                  Emaavy agents aren&apos;t locked to a single model. Plug in OpenAI, Google Gemini, Anthropic, Groq, or bring your own — and switch at any time without changing your agent logic.
                </p>
              </div>
              <div className="shrink-0 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6 text-center">
                <p className="text-4xl font-black text-violet-400">5</p>
                <p className="mt-1 text-sm text-white/50">Live model providers</p>
              </div>
            </div>
          </FadeSection>

          {/* Feature highlights */}
          <FadeSection>
            <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: HiOutlineBolt,        label: 'Model routing',         desc: 'Swap models per task with zero config changes' },
                { icon: HiOutlineCommandLine, label: 'Function calling',      desc: 'Tool-use & structured outputs across all providers' },
                { icon: HiOutlineShieldCheck, label: 'Fallback chains',       desc: 'Auto-failover to backup model on timeout or error' },
                { icon: HiOutlineSignal,      label: 'Streaming responses',   desc: 'Token-by-token streaming for sub-500ms TTFB' },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15">
                    <Icon className="h-4.5 w-4.5 text-violet-400" />
                  </div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/50">{desc}</p>
                </div>
              ))}
            </div>
          </FadeSection>

          {/* Provider grid */}
          <FadeSection>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-white/30">Supported Models</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
              {[
                { name: 'OpenAI',      badge: 'Live' },
                { name: 'Anthropic',   badge: 'Live' },
                { name: 'Google',      badge: 'Live' },
                { name: 'Groq',        badge: 'Live' },
                { name: 'Custom LLM',  badge: 'Live' },
                { name: 'Mistral',     badge: 'Soon' },
                { name: 'Meta',        badge: 'Soon' },
                { name: 'Together AI', badge: 'Soon' },
              ].map(p => <Chip key={p.name} name={p.name} badge={p.badge} />)}
            </div>
          </FadeSection>

          {/* Model comparison table */}
          <FadeSection className="mt-10">
            <div className="overflow-hidden rounded-2xl border border-white/8">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-white/40">Provider</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-white/40">Best for</th>
                    <th className="hidden px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-white/40 sm:table-cell">Context window</th>
                    <th className="hidden px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-white/40 md:table-cell">Strength</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {[
                    { name: 'OpenAI',          best: 'Complex reasoning & conversations', ctx: '128K', str: 'Strong function calling & reliability', live: true },
                    { name: 'Anthropic Claude', best: 'Thoughtful, nuanced responses',    ctx: '200K', str: 'Excellent instruction following',       live: true },
                    { name: 'Google Gemini',   best: 'Multilingual conversations',        ctx: '1M',   str: 'Large context, multimodal support',     live: true },
                    { name: 'Groq',            best: 'Real-time voice agents',            ctx: '32K',  str: 'Fastest inference for voice use cases', live: true },
                    { name: 'Custom LLM',      best: 'Your own fine-tuned model',         ctx: 'Any',  str: 'Any OpenAI-compatible endpoint',        live: true },
                    { name: 'Mistral',         best: 'Coming soon',                       ctx: '32K',  str: 'Open-weight model option',              live: false },
                  ].map(({ name, best, ctx, str, live }) => (
                    <tr key={name} className="transition-colors hover:bg-white/[0.02]" style={{ opacity: live ? 1 : 0.45 }}>
                      <td className="px-5 py-4 font-semibold text-white">
                        <span>{name}</span>
                        {!live && <span className="ml-2 text-[10px] font-medium text-white/30">Soon</span>}
                      </td>
                      <td className="px-5 py-4 text-white/60">{best}</td>
                      <td className="hidden px-5 py-4 font-mono text-violet-400 sm:table-cell">{ctx}</td>
                      <td className="hidden px-5 py-4 text-white/50 md:table-cell">{str}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeSection>

          {/* Use cases */}
          <FadeSection className="mt-10">
            <div className="flex flex-wrap gap-2">
              {['Natural voice conversations', 'Multilingual agent calls', 'Knowledge base Q&A', 'Personalised outreach', 'Real-time voice dialogue', 'Custom model deployment', 'Low-latency responses'].map(uc => (
                <span key={uc} className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/8 px-3 py-1.5 text-xs font-medium text-violet-300">
                  <HiOutlineCheckCircle className="h-3 w-3" /> {uc}
                </span>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4">
        <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)' }} />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 3 — SPEECH TO TEXT
          ════════════════════════════════════════════════════════════════════ */}
      <section id="stt" className="relative overflow-hidden px-4 py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full opacity-[0.13]"
            style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 65%)', filter: 'blur(90px)' }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <FadeSection>
            <div className="mb-16 grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-400">
                  <HiOutlineMicrophone className="h-4 w-4" /> Speech to Text
                </div>
                <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  Every word, heard<br />
                  <span className="text-emerald-400">perfectly.</span>
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-white/60">
                  Emaavy uses ElevenLabs for real-time speech-to-text — the caller&apos;s words are transcribed as they speak so the agent can respond naturally without any awkward pause.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    { label: 'Real-time streaming',  desc: 'Word-by-word transcription as the caller speaks' },
                    { label: 'No wait time',         desc: 'Agent starts understanding before the caller finishes' },
                    { label: 'Accent robustness',    desc: 'Works across Indian accents and English dialects' },
                    { label: 'More providers soon',  desc: 'Deepgram, Sarvam AI, and others coming soon' },
                  ].map(({ label, desc }) => (
                    <div key={label} className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                      <div className="flex items-center gap-2">
                        <HiOutlineCheckCircle className="h-4 w-4 text-emerald-400" />
                        <p className="text-sm font-semibold text-white">{label}</p>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-white/50">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live waveform visual */}
              <div className="flex items-center justify-center">
                <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
                      <HiOutlineMicrophone className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Live transcription</p>
                      <p className="text-xs text-white/40">Streaming · &lt;500ms latency</p>
                    </div>
                    <span className="ml-auto flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]">
                    </span>
                  </div>
                  {/* waveform bars */}
                  <div className="mb-6 flex h-16 items-center justify-center gap-1">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <motion.div key={i} className="w-1 rounded-full bg-emerald-400/60"
                        animate={{ height: [`${8 + Math.random() * 48}px`, `${8 + Math.random() * 48}px`] }}
                        transition={{ duration: 0.4 + Math.random() * 0.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: i * 0.03 }} />
                    ))}
                  </div>
                  <div className="rounded-xl bg-white/[0.04] p-4 text-sm leading-relaxed text-white/70">
                    <span className="text-white">&ldquo;Yes, I&apos;d like to reschedule my appointment to </span>
                    <motion.span className="text-emerald-400"
                      animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}>
                      Thursday at 3 PM...&rdquo;
                    </motion.span>
                  </div>
                </div>
              </div>
            </div>
          </FadeSection>

          {/* Provider grid */}
          <FadeSection>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-white/30">STT Providers</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {[
                { name: 'ElevenLabs', badge: 'Live' },
                { name: 'Deepgram',   badge: 'Soon' },
                { name: 'Sarvam AI',  badge: 'Soon' },
                { name: 'AssemblyAI', badge: 'Soon' },
                { name: 'Microsoft',  badge: 'Soon' },
                { name: 'Google',     badge: 'Soon' },
                { name: 'Amazon',     badge: 'Soon' },
                { name: 'OpenAI',     badge: 'Soon' },
              ].map(p => <Chip key={p.name} name={p.name} badge={p.badge} />)}
            </div>
          </FadeSection>

          {/* ElevenLabs spotlight */}
          <FadeSection className="mt-8">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-400">Emaavy&apos;s STT Provider</p>
                  <h3 className="text-2xl font-bold text-white">ElevenLabs Speech-to-Text</h3>
                  <p className="mt-3 leading-relaxed text-white/60">
                    Emaavy uses ElevenLabs for real-time speech transcription. Every word the caller speaks is transcribed instantly and fed to the AI agent — enabling natural, flowing conversations without any noticeable delay.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {['Real-time streaming', 'High accuracy', 'Works across accents', 'Low latency', 'Instant response'].map(f => (
                      <span key={f} className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    { val: '<500ms', label: 'End-to-end latency' },
                    { val: 'Live',   label: 'Available now' },
                    { val: '24/7',   label: 'Always on' },
                  ].map(({ val, label }) => (
                    <div key={label} className="rounded-xl border border-emerald-500/20 bg-emerald-500/8 p-4 text-center">
                      <p className="text-2xl font-black text-emerald-400">{val}</p>
                      <p className="mt-1 text-xs text-white/50">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeSection>

          <FadeSection className="mt-8">
            <div className="flex flex-wrap gap-2">
              {['Real-time call transcription', 'Natural voice conversations', 'Instant agent responses', 'Inbound call handling', 'Outbound campaign calls', 'Call recording & replay'].map(uc => (
                <span key={uc} className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-3 py-1.5 text-xs font-medium text-emerald-300">
                  <HiOutlineCheckCircle className="h-3 w-3" /> {uc}
                </span>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4">
        <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)' }} />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 4 — TEXT TO SPEECH
          ════════════════════════════════════════════════════════════════════ */}
      <section id="tts" className="relative overflow-hidden px-4 py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full opacity-[0.12]"
            style={{ background: 'radial-gradient(circle, #F43F5E 0%, transparent 65%)', filter: 'blur(90px)' }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <FadeSection>
            <div className="mb-16 grid gap-10 lg:grid-cols-2 lg:items-center">
              {/* Voice selector visual */}
              <div className="order-2 flex justify-center lg:order-1">
                <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                  <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/30">Voice selector</p>
                  <div className="space-y-2.5">
                    {[
                      { name: 'Rachel',   provider: 'ElevenLabs', lang: 'EN-US', active: true },
                      { name: 'Aria',     provider: 'Sarvam AI',  lang: 'HI-IN', active: false },
                      { name: 'Neural EN', provider: 'Azure TTS', lang: 'EN-GB', active: false },
                      { name: 'Aura',     provider: 'Deepgram',   lang: 'EN-US', active: false },
                    ].map(({ name, provider, lang, active }) => (
                      <div key={name} className="flex items-center justify-between rounded-xl p-3 transition-colors"
                        style={{ background: active ? 'rgba(244,63,94,0.12)' : 'rgba(255,255,255,0.03)', border: `1px solid ${active ? 'rgba(244,63,94,0.3)' : 'rgba(255,255,255,0.07)'}` }}>
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg"
                            style={{ background: active ? 'rgba(244,63,94,0.2)' : 'rgba(255,255,255,0.06)' }}>
                            <HiOutlineSpeakerWave className={`h-4 w-4 ${active ? 'text-rose-400' : 'text-white/30'}`} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{name}</p>
                            <p className="text-xs text-white/40">{provider}</p>
                          </div>
                        </div>
                        <span className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>{lang}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl border border-rose-500/20 bg-rose-500/8 p-4">
                    <p className="text-xs text-white/50">Playing <span className="font-semibold text-rose-400">Rachel</span> · ElevenLabs Turbo v2</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/20">
                        <HiOutlineSpeakerWave className="h-3 w-3 text-rose-400" />
                      </div>
                      <div className="flex-1">
                        <div className="relative h-1.5 overflow-hidden rounded-full bg-white/10">
                          <motion.div className="absolute h-full rounded-full bg-rose-400"
                            animate={{ width: ['0%', '72%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
                        </div>
                      </div>
                      <span className="text-xs text-white/30">0.9s</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-sm font-semibold text-rose-400">
                  <HiOutlineSpeakerWave className="h-4 w-4" /> Text to Speech
                </div>
                <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  A voice that sounds<br />
                  <span className="text-rose-400">unmistakably human.</span>
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-white/60">
                  First impressions happen in the first syllable. Emaavy&apos;s TTS integrations deliver voices so natural, callers don&apos;t know they&apos;re talking to AI — with sub-100ms first-audio latency for seamless conversations.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    { label: 'Streaming audio',       desc: 'First audio chunk in under 100ms' },
                    { label: 'Voice cloning',          desc: 'Deploy your brand&apos;s custom voice' },
                    { label: 'Emotion & prosody',      desc: 'Tone, pace, and emphasis control via SSML' },
                    { label: 'Indic language TTS',     desc: 'Sarvam AI for natural Hindi, Tamil & more' },
                  ].map(({ label, desc }) => (
                    <div key={label} className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                      <div className="flex items-center gap-2">
                        <HiOutlineCheckCircle className="h-4 w-4 text-rose-400" />
                        <p className="text-sm font-semibold text-white">{label}</p>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-white/50" dangerouslySetInnerHTML={{ __html: desc }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeSection>

          <FadeSection>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-white/30">TTS Providers</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {[
                { name: 'ElevenLabs', badge: 'Popular' },
                { name: 'Sarvam AI',  badge: 'Indic' },
                { name: 'Microsoft',  badge: 'Azure' },
                { name: 'Amazon',     badge: 'Polly' },
                { name: 'Google',     badge: undefined },
                { name: 'Deepgram',   badge: 'Aura' },
                { name: 'PlayHT',     badge: undefined },
                { name: 'LMNT',       badge: 'Fast' },
              ].map(p => <Chip key={p.name} name={p.name} badge={p.badge} />)}
            </div>
          </FadeSection>

          {/* ElevenLabs spotlight */}
          <FadeSection className="mt-8">
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-8">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-rose-400">Recommended for Voice Agents</p>
                  <h3 className="text-2xl font-bold text-white">ElevenLabs Turbo v2.5</h3>
                  <p className="mt-3 leading-relaxed text-white/60">
                    The most natural-sounding TTS on the market. ElevenLabs Turbo delivers hyper-realistic voices with voice cloning, streaming-optimised latency under 75ms first chunk, and support for 32 languages — the default choice for Emaavy voice agents.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {['<75ms first audio', 'Voice cloning', '32 languages', 'SSML support', 'Emotional range'].map(f => (
                      <span key={f} className="rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-300">{f}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    { val: '<75ms',  label: 'First audio chunk' },
                    { val: '32',     label: 'Languages supported' },
                    { val: '1000+',  label: 'Voice models' },
                  ].map(({ val, label }) => (
                    <div key={label} className="rounded-xl border border-rose-500/20 bg-rose-500/8 p-4 text-center">
                      <p className="text-2xl font-black text-rose-400">{val}</p>
                      <p className="mt-1 text-xs text-white/50">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeSection>

          <FadeSection className="mt-8">
            <div className="flex flex-wrap gap-2">
              {['AI voice agents', 'IVR responses', 'Custom brand voice', 'Multilingual TTS', 'Audio content', 'Real-time dialogue', 'Accessibility tooling'].map(uc => (
                <span key={uc} className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/8 px-3 py-1.5 text-xs font-medium text-rose-300">
                  <HiOutlineCheckCircle className="h-3 w-3" /> {uc}
                </span>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4">
        <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)' }} />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 5 — TOOLS
          ════════════════════════════════════════════════════════════════════ */}
      <section id="tools" className="relative overflow-hidden px-4 py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 bottom-0 h-96 w-96 rounded-full opacity-[0.12]"
            style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 65%)', filter: 'blur(90px)' }} />
          <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full opacity-[0.08]"
            style={{ background: 'radial-gradient(circle, #FBBF24 0%, transparent 65%)', filter: 'blur(70px)' }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <FadeSection>
            <div className="mb-16">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-semibold text-amber-400">
                <HiOutlineWrenchScrewdriver className="h-4 w-4" /> Business Tools
              </div>
              <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    Works inside every<br />
                    <span className="text-amber-400">tool your team uses.</span>
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-white/60">
                    Emaavy agents don&apos;t replace your stack — they plug into it. When an agent qualifies a lead, the CRM updates. When a call ends, the ticket is created. When a meeting is booked, the calendar invite is sent. Automatically.
                  </p>
                </div>
                <div className="shrink-0 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-center">
                  <p className="text-4xl font-black text-amber-400">16+</p>
                  <p className="mt-1 text-sm text-white/50">Business tools</p>
                </div>
              </div>
            </div>
          </FadeSection>

          {/* Category breakdown */}
          <FadeSection>
            <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  cat: 'CRM',
                  color: '#00A1E0',
                  tools: ['HubSpot (Soon)', 'Salesforce (Soon)', 'Pipedrive (Soon)', 'Zoho (Soon)'],
                  desc: 'CRM integrations are coming soon. Connect Emaavy to your CRM to auto-log calls, update contacts, and trigger follow-up sequences.',
                },
                {
                  cat: 'Communication',
                  color: '#25D366',
                  tools: ['WhatsApp', 'Webhooks', 'Google Calendar', 'Cal.com'],
                  desc: 'Send WhatsApp follow-ups via MSG91, fire webhooks to your backend, and book meetings directly into Google Calendar or Cal.com.',
                },
                {
                  cat: 'Support & Success',
                  color: '#286EFA',
                  tools: ['Intercom', 'Freshdesk', 'Calendly', 'Notion'],
                  desc: 'Auto-create tickets, escalate conversations with full context, book meetings, and update knowledge bases.',
                },
                {
                  cat: 'E-commerce',
                  color: '#96BF48',
                  tools: ['Shopify', 'Stripe', 'Airtable', 'Zapier'],
                  desc: 'Handle order events, subscription changes, and payment notifications inside automated workflows.',
                },
              ].map(({ cat, color, tools, desc }) => (
                <div key={cat} className="rounded-2xl border border-white/8 bg-white/[0.03] p-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color }}>{cat}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {tools.map(t => {
                      const b = BRANDS[t] ?? { color: '#6366f1' };
                      const TIcon = b.Icon;
                      return (
                        <div key={t} className="flex h-9 w-9 items-center justify-center rounded-lg"
                          style={{ background: b.color + '22' }}>
                          {TIcon
                            ? <TIcon className="h-4 w-4" style={{ color: b.color }} />
                            : <span className="text-[10px] font-black" style={{ color: b.color }}>{b.initials ?? t.slice(0,2).toUpperCase()}</span>
                          }
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-sm leading-relaxed text-white/60">{desc}</p>
                </div>
              ))}
            </div>
          </FadeSection>

          {/* All tools grid */}
          <FadeSection>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-white/30">All Tool Integrations</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
              {[
                { name: 'Webhooks',        badge: 'Live' },
                { name: 'WhatsApp',        badge: 'Live' },
                { name: 'Google Calendar', badge: 'Live' },
                { name: 'Cal.com',         badge: 'Live' },
                { name: 'HubSpot',         badge: 'Soon' },
                { name: 'Salesforce',      badge: 'Soon' },
                { name: 'Pipedrive',       badge: 'Soon' },
                { name: 'Zoho',            badge: 'Soon' },
                { name: 'Slack',           badge: 'Soon' },
                { name: 'Zapier',          badge: 'Soon' },
                { name: 'Intercom',        badge: 'Soon' },
                { name: 'Freshdesk',       badge: 'Soon' },
                { name: 'Shopify',         badge: 'Soon' },
                { name: 'Stripe',          badge: 'Soon' },
                { name: 'Zoom',            badge: 'Soon' },
                { name: 'Google',     badge: 'Gmail' },
              ].map(p => <Chip key={p.name + (p.badge ?? '')} name={p.name} badge={p.badge} />)}
            </div>
          </FadeSection>

          {/* Workflow example */}
          <FadeSection className="mt-10">
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-amber-400">Example: Sales call workflow</p>
              <h3 className="text-xl font-bold text-white">How it works end-to-end</h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  { step: '1', action: 'Agent calls lead', detail: 'Via Twilio outbound' },
                  { step: '2', action: 'Qualifies interest', detail: 'GPT-4o reasoning' },
                  { step: '3', action: 'Books meeting',    detail: 'Calendly real-time' },
                  { step: '4', action: 'Updates CRM',      detail: 'HubSpot deal stage' },
                  { step: '5', action: 'Notifies rep',     detail: 'Slack message sent' },
                ].map(({ step, action, detail }, i) => (
                  <div key={step} className="relative flex flex-col rounded-xl border border-amber-500/15 bg-amber-500/5 p-4">
                    {i < 4 && (
                      <div className="absolute -right-1.5 top-1/2 hidden -translate-y-1/2 text-amber-500/30 lg:block">→</div>
                    )}
                    <span className="mb-2 text-2xl font-black text-amber-400/40">{step}</span>
                    <p className="text-sm font-semibold text-white">{action}</p>
                    <p className="mt-1 text-xs text-white/40">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeSection>

          <FadeSection className="mt-8">
            <div className="flex flex-wrap gap-2">
              {['CRM auto-update', 'Support ticket creation', 'Lead routing', 'Meeting booking', 'E-commerce automation', 'Notification workflows', 'Custom API calls'].map(uc => (
                <span key={uc} className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/8 px-3 py-1.5 text-xs font-medium text-amber-300">
                  <HiOutlineCheckCircle className="h-3 w-3" /> {uc}
                </span>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 py-28">
        <div className="pointer-events-none absolute inset-0">
          <motion.div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 65%)', filter: 'blur(100px)' }}
            animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
        <FadeSection className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-indigo-400">Ready to connect</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Your stack, fully connected.<br />Your agents, fully operational.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60">
            Every integration is configured during your onboarding session. Our team sets up your full voice stack — telephony, LLM, STT, TTS, and tools — in a single session.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/book-demo"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-gray-900 shadow-xl transition-all hover:bg-gray-100 hover:shadow-2xl">
              Book a live demo
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/agents"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10">
              Explore agents
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            {['SOC 2 Type II', 'GDPR compliant', '20 min to first live call', 'No infrastructure overhead'].map(b => (
              <span key={b} className="flex items-center gap-1.5 text-xs text-white/40">
                <span className="text-indigo-400">✓</span> {b}
              </span>
            ))}
          </div>
        </FadeSection>
      </section>
    </div>
    <Footer />
    </>
  );
}
