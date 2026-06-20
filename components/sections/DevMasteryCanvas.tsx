'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION MANIFEST
───────────────────────────────────────────────────────────────────────────── */
const SECTIONS = [
  { id: 'voice-calling',          label: 'Real-time voice AI calling',      bg: '#0a1a0d', dark: true },
  { id: 'conversation-control',   label: 'Intelligent conversation control', bg: '#1f1200', dark: true },
  { id: 'workflow-automation',    label: 'CRM & workflow automation',        bg: '#030c20', dark: true },
  { id: 'own-llm',                label: 'Plug in your own LLM',            bg: '#120a24', dark: true },
  { id: 'omnichannel',            label: 'Omnichannel reach',               bg: '#1a0832', dark: true },
  { id: 'enterprise-reliability', label: 'Enterprise reliability',           bg: '#011a0e', dark: true },
  { id: 'sdk-api',                label: 'Developer SDK & API access',      bg: '#0d1117', dark: true },
] as const;

type SectionId = (typeof SECTIONS)[number]['id'];

/* ─────────────────────────────────────────────────────────────────────────────
   HYDRATION-SAFE STATIC SEEDS
───────────────────────────────────────────────────────────────────────────── */
const STATIC_BARS   = [18, 28, 12, 36, 22, 30, 10, 32, 18, 26, 34, 14, 28, 20, 30, 16, 36, 12, 24, 30];
const STATIC_HEALTH = Array.from({ length: 90 }, (_, i) => i % 29 !== 0 && i % 61 !== 0);

/* ─────────────────────────────────────────────────────────────────────────────
   CARD 1 — REAL-TIME VOICE AI CALLING
   bg: deep charcoal #0d0d0d — neon-green waveform, live latency dial
───────────────────────────────────────────────────────────────────────────── */
function VoiceCallingCard() {
  const [bars, setBars]     = useState<number[]>(STATIC_BARS);
  const [latency, setLatency] = useState(450);
  const [tick, setTick]     = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setBars(Array.from({ length: 20 }, () => 6 + Math.floor(Math.random() * 36)));
      setLatency(420 + Math.floor(Math.random() * 80));
      setTick(t => t + 1);
    }, 320);
    return () => clearInterval(id);
  }, []);

  const R = 38, C = 50, circ = 2 * Math.PI * R;
  const pct = 1 - latency / 800;

  const transcript = [
    { role: 'Caller',  text: 'Hi — I saw your ad about automating sales calls.' },
    { role: 'Emaavy',  text: 'Great timing. Are you using HubSpot or Salesforce?' },
    { role: 'Caller',  text: 'HubSpot. Around 50 reps.' },
    { role: 'Emaavy',  text: "Perfect. I'll book you with our team right now." },
  ];

  return (
    <div className="rounded-xl overflow-hidden min-h-[500px] w-full flex flex-col" style={{ background: '#0d0d0d', border: '1px solid #1f1f1f' }}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: '#1a1a1a' }}>
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-emerald-400"
          />
          <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest">Live Voice Engine</span>
        </div>
        <span className="font-mono text-[11px] text-neutral-600">emaavy-voice-v3</span>
      </div>

      <div className="flex flex-1"
        style={{ borderTop: '1px solid transparent' }}
      >
        {/* Left — dial + bars */}
        <div className="flex-1 p-8 flex flex-col gap-8" style={{ borderRight: '1px solid #1a1a1a' }}>
          <div className="flex items-center gap-6">
            {/* Donut */}
            <div className="relative w-28 h-28 shrink-0">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx={C} cy={C} r={R} fill="none" stroke="#1f1f1f" strokeWidth="9" />
                <motion.circle
                  cx={C} cy={C} r={R} fill="none"
                  stroke="#4ade80" strokeWidth="9" strokeLinecap="butt"
                  strokeDasharray={circ}
                  animate={{ strokeDashoffset: circ * (1 - pct) }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  key={latency}
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  className="text-[20px] font-semibold leading-none tabular-nums"
                  style={{ color: '#4ade80' }}
                >
                  {latency} ms
                </motion.span>
                <span className="text-[9px] text-neutral-600 mt-1 uppercase tracking-widest">Latency</span>
              </div>
            </div>

            <div className="space-y-2 text-[12px]">
              <div className="flex justify-between gap-8 text-neutral-500"><span>TTFB</span><span className="font-semibold text-neutral-200 tabular-nums">14 ms</span></div>
              <div className="flex justify-between gap-8 text-neutral-500"><span>P95</span><span className="font-semibold text-neutral-200 tabular-nums">420 ms</span></div>
              <div className="flex justify-between gap-8 text-neutral-500"><span>P99</span><span className="font-semibold text-neutral-200 tabular-nums">610 ms</span></div>
            </div>
          </div>

          {/* Waveform */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-3 flex items-center gap-2">
              <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Live Voice Stream
            </p>
            <div className="flex items-end gap-[3px]" style={{ height: 48 }}>
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-[1px]"
                  style={{ background: `rgba(74,222,128,${0.4 + (h / 42) * 0.6})` }}
                  animate={{ height: `${h}px` }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                />
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Calls Today', val: '2,847' },
              { label: 'Avg Duration', val: '4m 12s' },
              { label: 'Connect Rate', val: '94.2%' },
            ].map(s => (
              <div key={s.label} className="rounded-lg px-3 py-2.5" style={{ background: '#141414', border: '1px solid #222' }}>
                <p className="text-[9px] text-neutral-600 uppercase tracking-wider mb-1">{s.label}</p>
                <p className="text-[15px] font-semibold text-neutral-100 tabular-nums">{s.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — transcript */}
        <div className="flex-1 p-8 flex flex-col">
          <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-5">Live Transcript</p>
          <div className="flex-1 space-y-5 border-l pl-4" style={{ borderColor: '#222' }}>
            {transcript.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: m.role === 'Emaavy' ? '#4ade80' : '#6b7280' }}>{m.role}</p>
                <p className="text-[13px] leading-relaxed text-neutral-300">{m.text}</p>
              </motion.div>
            ))}
            {/* Typing cursor */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] uppercase tracking-wider" style={{ color: '#4ade80' }}>Emaavy</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
                className="w-1.5 h-3.5 rounded-[1px]"
                style={{ background: '#4ade80' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CARD 2 — INTELLIGENT CONVERSATION CONTROL
   bg: warm deep amber-brown #100e08 — gold sliders, live oscillation
───────────────────────────────────────────────────────────────────────────── */
function ConversationControlCard() {
  const [creativity,  setCreativity]  = useState(0.72);
  const [eagerness,   setEagerness]   = useState(0.55);
  const [responseSpd, setResponseSpd] = useState(0.80);
  const [empathy,     setEmpathy]     = useState(0.60);
  const [drift, setDrift]             = useState(0);

  useEffect(() => {
    const id = setInterval(() => setDrift(d => d + 0.04), 80);
    return () => clearInterval(id);
  }, []);

  const oscillate = (base: number, amp: number) => Math.min(Math.max(base + Math.sin(drift) * amp, 0), 1);

  const pct = (v: number) => `${Math.round(v * 100)}%`;

  const sliders = [
    { label: 'Creativity',        val: oscillate(creativity,  0.03), raw: creativity,  set: setCreativity,  max: 1, fmt: pct, color: '#f59e0b' },
    { label: 'Eagerness to Speak',val: oscillate(eagerness,   0.04), raw: eagerness,   set: setEagerness,   max: 1, fmt: pct, color: '#fb923c' },
    { label: 'Response Speed',    val: oscillate(responseSpd, 0.02), raw: responseSpd, set: setResponseSpd, max: 1, fmt: pct, color: '#fbbf24' },
    { label: 'Empathy Level',     val: oscillate(empathy,     0.03), raw: empathy,     set: setEmpathy,     max: 1, fmt: pct, color: '#f97316' },
  ];

  return (
    <div className="rounded-xl overflow-hidden min-h-[500px] w-full flex flex-col" style={{ background: '#100e08', border: '1px solid #211d12' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: '#211d12' }}>
        <div className="flex items-center gap-2">
          <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 rounded-full" style={{ background: '#f59e0b' }} />
          <span className="text-[11px] font-mono uppercase tracking-widest" style={{ color: '#6b5c3a' }}>Agent Configuration</span>
        </div>
        <span className="text-[11px] font-mono" style={{ color: '#6b5c3a' }}>elliot-v2</span>
      </div>

      <div className="p-8 flex flex-col gap-7 flex-1">
        {/* Agent identity */}
        <div className="flex items-center gap-4 pb-6 border-b" style={{ borderColor: '#211d12' }}>
          <div className="w-10 h-10 rounded-full shrink-0" style={{ background: 'linear-gradient(135deg, #f59e0b, #fb923c, #ef4444)' }} />
          <div>
            <p className="text-[16px] font-semibold text-neutral-100">Elliot</p>
            <p className="text-[11px]" style={{ color: '#6b5c3a' }}>Sales Qualifier — v2</p>
          </div>
          <div className="ml-auto flex gap-2">
            {['MALE', 'SOOTHING', 'FRIENDLY'].map(tag => (
              <span key={tag} className="text-[10px] font-medium tracking-wide px-2 py-0.5 rounded" style={{ border: '1px solid #332a1a', color: '#a08050' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-7 flex-1">
          {sliders.map(s => {
            const pct = (s.val / s.max) * 100;
            return (
              <div key={s.label}>
                <div className="flex justify-between mb-3">
                  <span className="text-[12px]" style={{ color: '#8a7455' }}>{s.label}</span>
                  <motion.span
                    key={pct.toFixed(1)}
                    className="text-[12px] font-semibold tabular-nums"
                    style={{ color: s.color }}
                  >
                    {s.fmt(s.val)}
                  </motion.span>
                </div>
                <div className="relative h-[2px] rounded-full" style={{ background: '#221d12' }}>
                  <motion.div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ background: s.color }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.08 }}
                  />
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-lg"
                    style={{ background: s.color, boxShadow: `0 0 8px ${s.color}80` }}
                    animate={{ left: `calc(${pct}% - 6px)` }}
                    transition={{ duration: 0.08 }}
                  />
                </div>
                <input type="range" min={0} max={s.max} step={0.01} value={s.raw}
                  onChange={e => (s.set as (v: number) => void)(parseFloat(e.target.value))}
                  className="w-full opacity-0 h-4 -mt-3 cursor-pointer relative z-10"
                />
              </div>
            );
          })}
        </div>

        {/* Status bar */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t" style={{ borderColor: '#211d12' }}>
          {[
            { label: 'Sentiment Score', val: '8.4 / 10' },
            { label: 'Caller / Agent Talk', val: '62% / 38%' },
          ].map(s => (
            <div key={s.label} className="rounded-lg px-4 py-3" style={{ background: '#181208', border: '1px solid #2a2010' }}>
              <p className="text-[9px] uppercase tracking-wider mb-1" style={{ color: '#6b5c3a' }}>{s.label}</p>
              <p className="text-[14px] font-semibold" style={{ color: '#f59e0b' }}>{s.val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CARD 3 — CRM & WORKFLOW AUTOMATION
   bg: deep navy #080f1e — blue-accent rows, live trigger pulse
───────────────────────────────────────────────────────────────────────────── */
const TOOL_ROWS = [
  { name: 'MCP',             triggered: false, status: 'READY',     color: '#3b82f6' },
  { name: 'Slack',           triggered: true,  status: 'TRIGGERED', color: '#22d3ee' },
  { name: 'Google Sheets',   triggered: false, status: 'IDLE',      color: '#3b82f6' },
  { name: 'Google Calendar', triggered: false, status: 'QUEUED',    color: '#818cf8' },
  { name: 'HubSpot CRM',     triggered: false, status: 'SYNCING',   color: '#f97316' },
];

function WorkflowAutomationCard() {
  const [open, setOpen]       = useState(true);
  const [pulse, setPulse]     = useState(false);
  const [counter, setCounter] = useState(1482);

  useEffect(() => {
    const id = setInterval(() => {
      setPulse(true);
      setCounter(c => c + Math.floor(Math.random() * 3));
      setTimeout(() => setPulse(false), 600);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-xl overflow-hidden min-h-[500px] w-full flex flex-col" style={{ background: '#080f1e', border: '1px solid #0f1f3d' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: '#0f1f3d' }}>
        <div className="flex items-center gap-2">
          <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-blue-900" style={{ color: '#3a5a8a' }}>Workflow Engine</span>
        </div>
        <motion.span
          animate={{ color: pulse ? '#22d3ee' : '#3a5a8a' }}
          className="text-[11px] font-mono tabular-nums"
        >
          {counter.toLocaleString()} events
        </motion.span>
      </div>

      <div className="flex-1 flex flex-col p-8 gap-5">
        {/* API Request drawer */}
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #0f1f3d' }}>
          <button
            onClick={() => setOpen(o => !o)}
            className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
            style={{ background: '#0c1830' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded" style={{ background: '#0f2347', color: '#60a5fa' }}>POST</span>
              <span className="text-[13px] font-medium text-neutral-200">API Request</span>
            </div>
            <motion.svg animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.18 }} className="w-4 h-4" style={{ color: '#3a5a8a' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </motion.svg>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                <div className="px-5 pt-3 pb-1">
                  <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: '#3a5a8a' }}>Active Integrations</p>
                </div>
                {TOOL_ROWS.map((t, idx) => (
                  <motion.div
                    key={t.name}
                    className="flex items-center justify-between px-5 py-3.5 border-t"
                    style={{ borderColor: '#0f1f3d', background: t.triggered ? '#0c1e38' : 'transparent' }}
                    animate={t.triggered && pulse ? { backgroundColor: ['#0c1e38', '#0f2a4a', '#0c1e38'] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.color }} />
                      <span className="text-[13px] text-neutral-300">{t.name}</span>
                    </div>
                    <span
                      className="text-[10px] font-semibold tracking-wider px-2.5 py-0.5 rounded"
                      style={{
                        border: `1px solid ${t.color}40`,
                        color: t.color,
                        background: `${t.color}12`,
                      }}
                    >
                      {t.status}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-auto">
          {[
            { label: 'Triggers Today', val: '3,291' },
            { label: 'Avg Latency',    val: '38ms'  },
            { label: 'Success Rate',   val: '99.8%' },
          ].map(s => (
            <div key={s.label} className="rounded-lg px-3 py-3" style={{ background: '#0c1830', border: '1px solid #0f1f3d' }}>
              <p className="text-[9px] uppercase tracking-wider mb-1.5" style={{ color: '#3a5a8a' }}>{s.label}</p>
              <p className="text-[16px] font-semibold text-neutral-100 tabular-nums">{s.val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CARD 4 — PLUG IN YOUR OWN LLM
   bg: cool slate #0d1117 GitHub-dark — purple radio, live token counter
───────────────────────────────────────────────────────────────────────────── */
const PROVIDERS = [
  { id: 'openai',    label: 'OpenAI',       badge: 'GPT-4o',   color: '#10b981' },
  { id: 'custom',    label: 'CustomLLM',    badge: 'BYOM',     color: '#a78bfa' },
  { id: 'google',    label: 'Google',       badge: 'Gemini',     color: '#60a5fa' },
  { id: 'anthropic', label: 'Anthropic',    badge: 'Claude',   color: '#f97316' },
  { id: 'groq',      label: 'Groq',         badge: 'Fast',     color: '#facc15' },
  { id: 'cerebras',  label: 'Cerebras',     badge: 'Soon',     color: '#6b7280' },
];

function OwnLLMCard() {
  const [sel, setSel]           = useState('custom');
  const [endpoint, setEndpoint] = useState('');
  const [tokens, setTokens]     = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTokens(t => t + Math.floor(Math.random() * 12) + 3), 180);
    return () => clearInterval(id);
  }, []);

  const active = PROVIDERS.find(p => p.id === sel)!;

  return (
    <div className="rounded-xl overflow-hidden min-h-[500px] w-full flex flex-col" style={{ background: '#0d1117', border: '1px solid #161b22' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: '#161b22' }}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: active.color }} />
          <span className="text-[11px] font-mono uppercase tracking-widest" style={{ color: '#484f58' }}>LLM Router</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono" style={{ color: '#484f58' }}>tokens/s</span>
          <motion.span
            key={Math.floor(tokens / 30)}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="text-[11px] font-semibold font-mono tabular-nums"
            style={{ color: active.color }}
          >
            {(tokens % 9999).toLocaleString()}
          </motion.span>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-8 gap-5">
        <p className="text-[10px] uppercase tracking-widest" style={{ color: '#484f58' }}>Choose Provider</p>

        <div className="rounded-lg overflow-hidden flex-1" style={{ border: '1px solid #161b22' }}>
          <div className="divide-y" style={{ borderColor: '#161b22' }}>
            {PROVIDERS.map(p => {
              const isActive = sel === p.id;
              return (
                <div key={p.id} style={{ borderBottom: '1px solid #161b22' }}>
                  <button
                    onClick={() => p.badge !== 'Soon' && setSel(p.id)}
                    className="w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors"
                    style={{ background: isActive ? '#161b22' : 'transparent', opacity: p.badge === 'Soon' ? 0.45 : 1, cursor: p.badge === 'Soon' ? 'not-allowed' : 'pointer' }}
                  >
                    <div
                      className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                      style={{ borderColor: isActive ? p.color : '#30363d' }}
                    >
                      {isActive && <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />}
                    </div>
                    <span className="flex-1 text-[13px]" style={{ color: isActive ? '#e6edf3' : '#848d97' }}>{p.label}</span>
                    <span
                      className="text-[9px] font-semibold tracking-wider px-2 py-0.5 rounded-full"
                      style={{ background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}30` }}
                    >
                      {p.badge}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isActive && p.id === 'custom' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 pt-2" style={{ background: '#0d1117', borderTop: '1px solid #161b22' }}>
                          <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: '#484f58' }}>Endpoint URL</p>
                          <input
                            value={endpoint}
                            onChange={e => setEndpoint(e.target.value)}
                            placeholder="https://your-model.internal/v1/chat/completions"
                            className="w-full rounded px-3 py-2.5 text-[12px] outline-none font-mono placeholder:text-neutral-700"
                            style={{ background: '#010409', border: '1px solid #30363d', color: '#a78bfa' }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CARD 5 — OMNICHANNEL REACH
   bg: deep purple #12082e — lavender tones, live call routing animation
───────────────────────────────────────────────────────────────────────────── */
const PHONE_OPTS = [
  { id: 'free',   label: 'Free Emaavy Number',  desc: 'Instant setup, no carrier needed' },
  { id: 'twilio', label: 'Import Twilio',        desc: 'Bring existing Twilio numbers'     },
  { id: 'vonage', label: 'Import Vonage',        desc: 'Vonage API integration'            },
  { id: 'telnyx', label: 'Import Telnyx',        desc: 'Telnyx SIP + PSTN'                 },
  { id: 'sip',    label: 'Custom SIP Trunk',     desc: 'Self-managed SIP infrastructure'  },
  { id: 'byop',   label: 'BYOP SIP Trunk',       desc: 'Bring your own provider'           },
];

function OmnichannelCard() {
  const [sel, setSel]   = useState('twilio');
  const [calls, setCalls] = useState(24);

  useEffect(() => {
    const id = setInterval(() => setCalls(c => c + (Math.random() > 0.6 ? 1 : 0)), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-xl overflow-hidden min-h-[500px] w-full flex flex-col" style={{ background: '#12082e', border: '1px solid #1e0f45' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: '#1e0f45' }}>
        <div className="flex items-center gap-2">
          <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }} className="w-2 h-2 rounded-full" style={{ background: '#a78bfa' }} />
          <span className="text-[11px] font-mono uppercase tracking-widest" style={{ color: '#4c3580' }}>Phone Provisioning</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px]" style={{ color: '#4c3580' }}>Active calls</span>
          <motion.span
            key={calls}
            initial={{ scale: 1.3, color: '#c4b5fd' }}
            animate={{ scale: 1, color: '#a78bfa' }}
            className="text-[12px] font-semibold tabular-nums font-mono"
          >
            {calls}
          </motion.span>
        </div>
      </div>

      <div className="flex-1 p-8 flex flex-col gap-5">
        <p className="text-[10px] uppercase tracking-widest" style={{ color: '#4c3580' }}>Phone Number Options</p>

        <div className="rounded-lg overflow-hidden flex-1" style={{ border: '1px solid #1e0f45' }}>
          {PHONE_OPTS.map(opt => {
            const isActive = sel === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSel(opt.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left transition-all border-b"
                style={{ borderColor: '#1e0f45', background: isActive ? '#1a0f3d' : 'transparent' }}
              >
                <div>
                  <p className="text-[13px] font-medium" style={{ color: isActive ? '#c4b5fd' : '#6b5a94' }}>{opt.label}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: '#4c3580' }}>{opt.desc}</p>
                </div>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: '#a78bfa22', border: '1px solid #a78bfa50' }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: '#a78bfa' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CARD 6 — ENTERPRISE RELIABILITY
   bg: deep forest #061412 — emerald bars, animated live charts
───────────────────────────────────────────────────────────────────────────── */
const CALL_PTS  = Array.from({ length: 30 }, (_, i) => ({ x: (i / 29) * 100, y: 100 - (20 + i * 2.1 + Math.sin(i * 0.45) * 7) }));
const SPEND_PTS = Array.from({ length: 30 }, (_, i) => ({ x: (i / 29) * 100, y: 100 - (12 + Math.sin(i * 0.55) * 13 + i * 1.3) }));

function toSvgPath(pts: { x: number; y: number }[]) { return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' '); }
function toSvgArea(pts: { x: number; y: number }[]) { return `${toSvgPath(pts)} L 100,100 L 0,100 Z`; }

function EnterpriseReliabilityCard() {
  const [uptime] = useState('99.99%');

  return (
    <div className="rounded-xl overflow-hidden min-h-[500px] w-full flex flex-col" style={{ background: '#061412', border: '1px solid #0a2420' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: '#0a2420' }}>
        <div className="flex items-center gap-2">
          <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[11px] font-mono uppercase tracking-widest" style={{ color: '#1a4a40' }}>System Status</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono" style={{ color: '#1a4a40' }}>SLA</span>
          <span className="text-[13px] font-semibold text-emerald-400 font-mono">{uptime}</span>
        </div>
      </div>

      <div className="p-8 flex flex-col gap-5 flex-1">
        {/* Health grid */}
        <div className="rounded-lg px-5 py-4" style={{ background: '#0a1f1c', border: '1px solid #0a2420' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[12px] text-emerald-300/70">Emaavy API — 90-day history</span>
            <span className="ml-auto text-[11px] font-semibold text-emerald-400 font-mono">{uptime}</span>
          </div>
          <div className="flex gap-[2px]">
            {STATIC_HEALTH.map((up, i) => (
              <motion.div
                key={i}
                className={`flex-1 rounded-[1px] ${up ? 'bg-emerald-500' : 'bg-rose-500/60'}`}
                style={{ height: 22 }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.008, duration: 0.3 }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[9px]" style={{ color: '#1a4a40' }}>
            <span>90 days ago</span><span>Today</span>
          </div>
        </div>

        {/* Two charts side by side */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          {/* Call Minutes */}
          <div className="rounded-lg px-5 py-4" style={{ background: '#0a1f1c', border: '1px solid #0a2420' }}>
            <p className="text-[11px] mb-3" style={{ color: '#2a6a60' }}>Total Call Minutes</p>
            <svg viewBox="0 0 100 40" className="w-full" preserveAspectRatio="none" style={{ height: 80 }}>
              <defs>
                <linearGradient id="cgrad3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4ade80" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={toSvgArea(CALL_PTS)} fill="url(#cgrad3)" />
              <motion.path d={toSvgPath(CALL_PTS)} fill="none" stroke="#4ade80" strokeWidth="1.2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </svg>
            <p className="text-[15px] font-semibold text-emerald-400 font-mono mt-2">48,291</p>
          </div>

          {/* Total Spent */}
          <div className="rounded-lg px-5 py-4" style={{ background: '#0a1f1c', border: '1px solid #0a2420' }}>
            <p className="text-[11px] mb-3" style={{ color: '#2a6a60' }}>Total Spent</p>
            <svg viewBox="0 0 100 40" className="w-full" preserveAspectRatio="none" style={{ height: 80 }}>
              <defs>
                <linearGradient id="sgrad3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={toSvgArea(SPEND_PTS)} fill="url(#sgrad3)" />
              <motion.path d={toSvgPath(SPEND_PTS)} fill="none" stroke="#34d399" strokeWidth="1.2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: 'easeInOut', delay: 0.2 }}
              />
            </svg>
            <p className="text-[15px] font-semibold font-mono mt-2" style={{ color: '#34d399' }}>$12,847</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CARD 7 — DEVELOPER SDK & API ACCESS
   bg: #0d1117 — VS Code dark terminal with type-on animation
───────────────────────────────────────────────────────────────────────────── */
const SDK_SOURCE = `import { EmaavyClient } from '@emaavy/sdk';

const client = new EmaavyClient({
  apiKey: process.env.EMAAVY_API_KEY,
  region: 'us-east-1',
});

const call = await client.calls.create({
  agentId: 'agt_sales_qualifier_v2',
  to:      '+14155550192',
  from:    '+18005550100',
  model: {
    provider:    'openai',
    id:          'gpt-4o',
    temperature: 0.25,
  },
  voice: {
    provider: 'elevenlabs',
    voiceId:  'sarah',
  },
  tools: [
    'hubspot.logCall',
    'calendar.bookMeeting',
    'sms.sendFollowUp',
  ],
});

call.onTranscript((turn) => {
  console.log(turn.role, turn.text);
});`;

function syntaxColor(raw: string): string {
  return raw
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/(\/\/.*)/g,                           '<span style="color:#6b7280">$1</span>')
    .replace(/('(?:[^'\\]|\\.)*')/g,                '<span style="color:#86efac">$1</span>')
    .replace(/\b(import|from|const|let|await|new|return|process)\b/g, '<span style="color:#c4b5fd">$1</span>')
    .replace(/\b(true|false|null|undefined)\b/g,    '<span style="color:#f9a8d4">$1</span>');
}

function SdkApiCard() {
  const [copied, setCopied]       = useState(false);
  const [visible, setVisible]     = useState(0);

  useEffect(() => {
    if (visible >= SDK_SOURCE.length) return;
    const id = setTimeout(() => setVisible(v => Math.min(v + 4, SDK_SOURCE.length)), 18);
    return () => clearTimeout(id);
  }, [visible]);

  return (
    <div className="rounded-xl overflow-hidden min-h-[500px] w-full flex flex-col" style={{ background: '#0d1117', border: '1px solid #161b22' }}>
      {/* Title bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: '#161b22' }}>
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ background: '#3a3a3a' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#3a3a3a' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#3a3a3a' }} />
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px]" style={{ color: '#484f58' }}>emaavy-client.ts</span>
          <span className="text-[10px] px-2 py-0.5 rounded font-mono" style={{ background: '#161b22', color: '#c4b5fd', border: '1px solid #30363d' }}>TypeScript</span>
        </div>
        <button
          onClick={async () => { await navigator.clipboard.writeText(SDK_SOURCE); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="text-[10px] transition-colors px-2 py-1 rounded font-mono"
          style={{ color: copied ? '#4ade80' : '#484f58' }}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>

      {/* Code with type-on effect */}
      <pre
        className="flex-1 overflow-auto p-6 font-mono text-[12px] leading-[1.85]"
        style={{ color: '#e6edf3', maxHeight: 420 }}
        dangerouslySetInnerHTML={{ __html: syntaxColor(SDK_SOURCE.slice(0, visible)) + (visible < SDK_SOURCE.length ? '<span style="color:#c4b5fd;animation:blink 0.8s step-end infinite">▋</span>' : '') }}
      />

      {/* Install strip */}
      <div className="border-t px-5 py-3 flex items-center gap-6 flex-wrap" style={{ borderColor: '#161b22', background: '#0d1117' }}>
        {['npm', 'yarn', 'pnpm'].map(pm => (
          <span key={pm} className="font-mono text-[11px]" style={{ color: '#484f58' }}>
            {pm} add <span style={{ color: '#c4b5fd' }}>@emaavy/sdk</span>
          </span>
        ))}
        <span className="ml-auto text-[11px] font-mono" style={{ color: '#484f58' }}>v2.4.1</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ROOT — scroll-linked split layout
───────────────────────────────────────────────────────────────────────────── */
export default function DevMasteryCanvas() {
  const [activeSection, setActiveSection] = useState<SectionId>(SECTIONS[0].id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1) as SectionId;
    if (SECTIONS.some(s => s.id === hash)) setActiveSection(hash);
  }, []);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (!visible.length) return;
        const topmost = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        const id = topmost.target.id as SectionId;
        setActiveSection(id);
        window.history.replaceState(null, '', `#${id}`);
      },
      { rootMargin: '-10% 0px -10% 0px', threshold: 0.2 },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const navClick = useCallback((id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const activeIndex  = SECTIONS.findIndex(s => s.id === activeSection);
  const activeConfig = SECTIONS[activeIndex] ?? SECTIONS[0];
  const isDark       = activeConfig.dark;

  return (
    <section
      style={{ backgroundColor: activeConfig.bg, transition: 'background-color 700ms ease-in-out' }}
      className="border-b border-white/5"
    >
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-24 pb-16">
        <span className={`block text-[11px] font-semibold uppercase tracking-[0.2em] mb-4 transition-colors duration-700 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
          THE EMAAVY PLATFORM
        </span>
        <h2
          className={`text-[42px] md:text-[54px] font-bold leading-[1.06] transition-colors duration-700 ${isDark ? 'text-white' : 'text-[#111111]'}`}
          style={{ letterSpacing: '-0.025em' }}
        >
          Every capability your AI agents<br className="hidden sm:inline" /> need to close deals.
        </h2>
        <p className={`mt-5 max-w-lg text-[16px] leading-relaxed transition-colors duration-700 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
          Full-stack voice AI, CRM automation, and developer-grade control — built for revenue teams that move fast.
        </p>
      </div>

      {/* Split layout */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pb-40">
        <div className="flex gap-16 xl:gap-24 items-start">

          {/* LEFT STICKY NAV */}
          <div className="hidden lg:block w-56 xl:w-64 shrink-0" style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
            <nav className="relative">
              <div className={`absolute left-0 top-0 bottom-0 w-px transition-colors duration-700 ${isDark ? 'bg-white/10' : 'bg-neutral-200'}`} />
              <motion.div
                className={`absolute left-0 w-px transition-colors duration-700 ${isDark ? 'bg-white' : 'bg-[#111111]'}`}
                animate={{ top: `${(activeIndex / SECTIONS.length) * 100}%`, height: `${(1 / SECTIONS.length) * 100}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />

              {SECTIONS.map(s => {
                const isActive = s.id === activeSection;
                return (
                  <button
                    key={s.id}
                    onClick={() => navClick(s.id)}
                    className="relative w-full pl-6 py-5 text-left outline-none"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className={`absolute left-[-3px] top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full transition-colors duration-700 ${isDark ? 'bg-white' : 'bg-[#111111]'}`}
                        style={{ boxShadow: `0 0 0 2px ${activeConfig.bg}`, backgroundColor: isDark ? '#ffffff' : '#111111' }}
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <motion.span
                      animate={{ opacity: isActive ? 1 : 0.3 }}
                      transition={{ duration: 0.18 }}
                      className={`block text-[13px] leading-snug transition-colors duration-700 ${isActive ? 'font-semibold' : 'font-normal'} ${isDark ? 'text-white' : 'text-[#111111]'}`}
                    >
                      {s.label}
                    </motion.span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* RIGHT SCROLLING CARDS */}
          <div className="flex-1 min-w-0">
            {SECTIONS.map(s => (
              <div
                key={s.id}
                id={s.id}
                className="min-h-screen flex flex-col justify-center py-20 scroll-mt-32"
              >
                <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] mb-4 transition-colors duration-700 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                  {s.label}
                </p>
                {s.id === 'voice-calling'          && <VoiceCallingCard />}
                {s.id === 'conversation-control'   && <ConversationControlCard />}
                {s.id === 'workflow-automation'    && <WorkflowAutomationCard />}
                {s.id === 'own-llm'                && <OwnLLMCard />}
                {s.id === 'omnichannel'            && <OmnichannelCard />}
                {s.id === 'enterprise-reliability' && <EnterpriseReliabilityCard />}
                {s.id === 'sdk-api'                && <SdkApiCard />}
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </section>
  );
}
