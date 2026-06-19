'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

/* ─── Layer data ─────────────────────────────────────────────────────────────── */
const LAYERS = [
  {
    id: 'telephony',
    index: '01',
    label: 'Telephony Network',
    sublabel: 'Carrier Infrastructure',
    accent: '#6366f1',
    accentDim: '#6366f115',
    accentBorder: '#6366f130',
    chips: ['Twilio', 'Vonage', 'Telnyx', 'WebRTC', 'BYOC SIP', 'Free DID'],
    stat: { val: '140+', label: 'Countries covered' },
    detail: 'Elastic carrier routing with automatic failover across Twilio, Vonage, and Telnyx. Bring your own SIP trunk or provision a free Emaavy number in 60 seconds. All calls are E.164-normalized and recorded with per-leg SRTP encryption.',
    flow: ['Inbound PSTN', 'SIP Gateway', 'Emaavy Edge', 'Agent Runtime'],
    flowColors: ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe'],
    integrations: [
      { name: 'Twilio', desc: 'Programmable voice & SMS at global scale', href: '/integrations/twilio' },
      { name: 'Vonage', desc: 'Vonage API platform for voice calls', href: '/integrations/vonage' },
      { name: 'Telnyx', desc: 'Elastic SIP trunking with 99.999% uptime', href: '/integrations/telnyx' },
      { name: 'WebRTC', desc: 'Browser-native real-time voice', href: '/integrations/webrtc' },
    ],
  },
  {
    id: 'llm',
    index: '02',
    label: 'LLM Orchestration',
    sublabel: 'Model Routing Matrix',
    accent: '#0891b2',
    accentDim: '#0891b215',
    accentBorder: '#0891b230',
    chips: ['GPT-4o', 'Claude 3.5', 'Gemini 1.5', 'Groq', 'Cerebras', 'Custom'],
    stat: { val: '<320ms', label: 'Median TTFB' },
    detail: 'Route to any OpenAI-compatible endpoint with automatic model fallback, cost caps per-call, and temperature presets per agent persona. Streaming tokens hit the voice pipeline before the model finishes generating — shaving 200–400 ms off every turn.',
    flow: ['Prompt Assembly', 'Model Router', 'Stream Parser', 'TTS Pipeline'],
    flowColors: ['#0891b2', '#06b6d4', '#67e8f9', '#cffafe'],
    integrations: [
      { name: 'OpenAI', desc: 'GPT-4o & o1 with streaming support', href: '/integrations/openai' },
      { name: 'Anthropic', desc: 'Claude 3.5 Sonnet for nuanced reasoning', href: '/integrations/anthropic' },
      { name: 'Groq', desc: 'Ultra-low latency inference at scale', href: '/integrations/groq' },
      { name: 'Custom LLM', desc: 'Any OpenAI-compatible endpoint', href: '/integrations/custom-llm' },
    ],
  },
  {
    id: 'workflow',
    index: '03',
    label: 'Workflow Engine',
    sublabel: 'Graph Execution Core',
    accent: '#7c3aed',
    accentDim: '#7c3aed15',
    accentBorder: '#7c3aed30',
    chips: ['DAG Execution', 'Rollback', 'Versioning', 'A/B Splits', 'Conditions', 'Loops'],
    stat: { val: '99.98%', label: 'Execution success rate' },
    detail: 'Agent logic is compiled to an immutable DAG on deploy. Each node is independently retried, rolled back, or branched — with full version history and zero-downtime hot-swaps. Build branching call flows visually or define them in YAML.',
    flow: ['Trigger Event', 'Node Resolver', 'State Ledger', 'Outcome Log'],
    flowColors: ['#7c3aed', '#8b5cf6', '#a78bfa', '#ddd6fe'],
    integrations: [
      { name: 'Zapier', desc: '6,000+ no-code workflow automations', href: '/integrations/zapier' },
      { name: 'Make', desc: 'Visual scenario builder for complex flows', href: '/integrations/make' },
      { name: 'n8n', desc: 'Self-hosted workflow automation', href: '/integrations/n8n' },
      { name: 'YAML Config', desc: 'Code-first flow definitions with rollback', href: '/integrations/yaml' },
    ],
  },
  {
    id: 'crm',
    index: '04',
    label: 'CRM Integration Bus',
    sublabel: 'Bi-directional Sync Layer',
    accent: '#059669',
    accentDim: '#05966915',
    accentBorder: '#05966930',
    chips: ['HubSpot', 'Salesforce', 'REST', 'GraphQL', 'Webhooks', 'OAuth2'],
    stat: { val: '38ms', label: 'Avg trigger latency' },
    detail: 'Mid-call tool calls update CRM records, fire Slack alerts, and book calendar slots — all before the agent finishes speaking. OAuth2-secured, schema-mapped connectors mean no ETL pipelines. Every write is idempotent with automatic conflict resolution.',
    flow: ['Tool Call', 'Auth Check', 'CRM Write', 'Webhook Fan-out'],
    flowColors: ['#059669', '#10b981', '#34d399', '#a7f3d0'],
    integrations: [
      { name: 'HubSpot', desc: 'Log calls, update contacts & deals live', href: '/integrations/hubspot' },
      { name: 'Salesforce', desc: 'Enterprise CRM sync with SOQL queries', href: '/integrations/salesforce' },
      { name: 'Google Calendar', desc: 'Book meetings mid-call instantly', href: '/integrations/google-calendar' },
      { name: 'Slack', desc: 'Real-time call alerts & summaries', href: '/integrations/slack' },
    ],
  },
  {
    id: 'observability',
    index: '05',
    label: 'Observability Stack',
    sublabel: 'Real-time Intelligence',
    accent: '#d97706',
    accentDim: '#d9770615',
    accentBorder: '#d9770630',
    chips: ['Transcripts', 'Sentiment', 'Traces', 'Metrics', 'Alerts', 'Replay'],
    stat: { val: '100%', label: 'Calls indexed & searchable' },
    detail: 'Every call produces a full word-level transcript, per-turn sentiment score, and distributed trace across every layer. Anomaly alerts fire before your SLA is breached. Replay any call as an interactive timeline — with agent state, LLM tokens, and tool calls in sync.',
    flow: ['Call End', 'Transcript Index', 'Sentiment Score', 'Trace Export'],
    flowColors: ['#d97706', '#f59e0b', '#fbbf24', '#fef08a'],
    integrations: [
      { name: 'Datadog', desc: 'APM traces and custom call metrics', href: '/integrations/datadog' },
      { name: 'Segment', desc: 'Stream call events to your data warehouse', href: '/integrations/segment' },
      { name: 'PostHog', desc: 'Session replay and funnel analytics', href: '/integrations/posthog' },
      { name: 'PagerDuty', desc: 'SLA breach alerts with on-call routing', href: '/integrations/pagerduty' },
    ],
  },
];

const CYCLE_MS = 4500;

/* ─── Flow pipeline row ──────────────────────────────────────────────────────── */
function FlowRow({ steps, colors }: { steps: string[]; colors: string[] }) {
  return (
    <div className="flex items-start gap-0">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center flex-1 min-w-0">
          <div className="flex flex-col items-center gap-1.5 min-w-0">
            <motion.div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: colors[i] }}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: i * 0.12, type: 'spring', stiffness: 400 }}
            />
            <span className="text-[9px] text-center leading-tight" style={{ color: colors[i] + 'bb' }}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <motion.div
              className="flex-1 h-px mx-1.5 mb-4"
              style={{ background: `linear-gradient(90deg,${colors[i]},${colors[i + 1]})`, opacity: 0.45 }}
              initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: i * 0.12 + 0.08 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}


/* ─── Main component ─────────────────────────────────────────────────────────── */
export default function SystemArchitecture() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused]       = useState(false);
  const [showModal, setShowModal] = useState(false);
  const layer = LAYERS[activeIdx];

  const advance = useCallback(() => {
    setActiveIdx(i => (i + 1) % LAYERS.length);
  }, []);

  /* Auto-cycle: restart timer whenever activeIdx changes or paused toggles */
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(advance, CYCLE_MS);
    return () => clearTimeout(t);
  }, [activeIdx, paused, advance]);

  /* Keyboard accessibility */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') advance();
      if (e.key === 'ArrowLeft') setActiveIdx(i => (i - 1 + LAYERS.length) % LAYERS.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [advance]);

  return (
    <section
      style={{ background: '#09090b' }}
      className="border-b border-white/5"
    >
      {/* ── Header ── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-24 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-4">
              System Architecture
            </span>
            <h2
              className="text-[38px] md:text-[52px] font-bold text-white leading-[1.06]"
              style={{ letterSpacing: '-0.025em' }}
            >
              Five integrated layers.
              <br className="hidden sm:block" />
              <motion.span
                key={layer.accent}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{ color: layer.accent }}
              > One platform.</motion.span>
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-neutral-500">
              Purpose-built primitives stacked into a single control plane — from carrier signal to CRM record in under a second.
            </p>
          </div>

          {/* Explore button */}
          <div className="shrink-0">
            <a
              href="/integrations"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-[13px] font-semibold transition-all duration-500"
              style={{
                background: layer.accentDim,
                border: `1px solid ${layer.accentBorder}`,
                color: layer.accent,
              }}
            >
              Explore all integrations
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Body ── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pb-28">

        {/* ── Detail panel full width ── */}
        <div
          className="w-full"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
            <AnimatePresence mode="wait">
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col rounded-2xl overflow-hidden"
                style={{ background: '#111113', border: `1px solid ${layer.accentBorder}` }}
              >
                {/* Panel header */}
                <div
                  className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-7 py-4 border-b"
                  style={{ borderColor: layer.accentBorder, background: layer.accentDim }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md font-semibold tracking-wider"
                      style={{ background: layer.accent + '20', color: layer.accent, border: `1px solid ${layer.accent}30` }}
                    >
                      LAYER {layer.index}
                    </span>
                    <span className="text-[13px] sm:text-[14px] font-semibold text-white">{layer.label}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[20px] sm:text-[22px] font-bold tabular-nums font-mono" style={{ color: layer.accent }}>{layer.stat.val}</p>
                    <p className="text-[10px] text-neutral-600 mt-0.5">{layer.stat.label}</p>
                  </div>
                </div>

                {/* Signal flow */}
                <div className="px-4 sm:px-7 py-5 border-b" style={{ borderColor: '#ffffff08' }}>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-4">Signal flow</p>
                  <FlowRow steps={layer.flow} colors={layer.flowColors} />
                </div>

                {/* Description */}
                <div className="px-4 sm:px-7 py-6">
                  <p className="text-[13px] sm:text-[14px] leading-[1.9] text-neutral-400">{layer.detail}</p>
                </div>

                {/* Integration spotlight grid */}
                <div className="px-4 sm:px-7 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {layer.integrations.map(intg => (
                    <Link
                      key={intg.name}
                      href={intg.href}
                      className="group rounded-xl px-4 py-3.5 flex flex-col gap-1 transition-all duration-200"
                      style={{ background: '#18181b', border: `1px solid #ffffff08` }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-semibold text-neutral-200 group-hover:text-white transition-colors">{intg.name}</span>
                        <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 duration-200" style={{ color: layer.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <span className="text-[11px] text-neutral-600 leading-snug">{intg.desc}</span>
                    </Link>
                  ))}
                </div>

                {/* Chip strip */}
                <div className="px-4 sm:px-7 py-4 border-t flex flex-wrap gap-2" style={{ borderColor: '#ffffff08' }}>
                  {layer.chips.map(chip => (
                    <span
                      key={chip}
                      className="text-[11px] font-medium px-3 py-1 rounded-lg"
                      style={{ background: layer.accent + '10', border: `1px solid ${layer.accent}25`, color: layer.accent + 'cc' }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

      </div>

      {/* ── Integration explorer modal ── */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 top-[8vh] bottom-[8vh] z-50 mx-auto max-w-4xl flex flex-col rounded-2xl overflow-hidden"
              style={{ background: '#111113', border: '1px solid #1f1f23' }}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-8 py-5 border-b" style={{ borderColor: '#1f1f23' }}>
                <div>
                  <h3 className="text-[18px] font-bold text-white">All Integrations</h3>
                  <p className="text-[12px] text-neutral-500 mt-0.5">Browse every connection available across all 5 architecture layers</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
                {LAYERS.map(l => (
                  <div key={l.id}>
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded font-semibold"
                        style={{ background: l.accent + '18', color: l.accent, border: `1px solid ${l.accent}28` }}
                      >
                        {l.index}
                      </span>
                      <h4 className="text-[14px] font-semibold text-white">{l.label}</h4>
                      <div className="flex-1 h-px" style={{ background: l.accent + '20' }} />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {l.integrations.map(intg => (
                        <Link
                          key={intg.name}
                          href={intg.href}
                          onClick={() => setShowModal(false)}
                          className="group rounded-xl px-4 py-4 flex flex-col gap-1.5 transition-all duration-200 hover:-translate-y-0.5"
                          style={{ background: '#18181b', border: `1px solid #ffffff08` }}
                        >
                          <span className="text-[13px] font-semibold text-neutral-200 group-hover:text-white transition-colors">{intg.name}</span>
                          <span className="text-[11px] text-neutral-600 leading-snug">{intg.desc}</span>
                          <span
                            className="text-[10px] font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ color: l.accent }}
                          >
                            View docs →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal footer */}
              <div className="px-8 py-4 border-t flex items-center justify-between" style={{ borderColor: '#1f1f23' }}>
                <span className="text-[12px] text-neutral-600">{LAYERS.reduce((a, l) => a + l.integrations.length, 0)} integrations shown · more coming soon</span>
                <Link
                  href="/integrations"
                  onClick={() => setShowModal(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all duration-200 hover:brightness-110"
                  style={{ background: LAYERS[activeIdx].accent }}
                >
                  Full integrations catalog
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
