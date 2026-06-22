'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/* ─── Shared fade-in variant ──────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 44 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] } },
});

/* ═══════════════════════════════════════════════════════════════════════════
   VISUAL 1 — Orchestration app-window workflow canvas
   ═══════════════════════════════════════════════════════════════════════════ */

// Node definitions — positioned in a 740×230 viewBox
const FLOW_NODES = [
  {
    id: 'trigger', label: 'Trigger Event',    sub: 'Twilio Inbound · +91-98765',
    x: 18,  y: 88,  w: 136, h: 54,
    bg: '#0f172a', border: '#334155', dot: '#4ade80', labelColor: '#f1f5f9',
  },
  {
    id: 'qualify', label: 'Qualify Lead',     sub: 'GPT-4o · prompt v3',
    x: 214, y: 34,  w: 136, h: 54,
    bg: '#1e40af', border: '#3b82f6', dot: '#93c5fd', labelColor: '#eff6ff',
  },
  {
    id: 'support', label: 'Route to Support', sub: 'intent: help_ticket',
    x: 214, y: 142, w: 136, h: 54,
    bg: '#5b21b6', border: '#8b5cf6', dot: '#c4b5fd', labelColor: '#f5f3ff',
  },
  {
    id: 'crm',     label: 'Fire Webhook',     sub: 'Webhooks · POST /lead-update',
    x: 412, y: 34,  w: 136, h: 54,
    bg: '#0e7490', border: '#22d3ee', dot: '#67e8f9', labelColor: '#ecfeff',
  },
  {
    id: 'sched',   label: 'Schedule Call',    sub: 'Calendly · webhook fired',
    x: 412, y: 142, w: 136, h: 54,
    bg: '#166534', border: '#4ade80', dot: '#86efac', labelColor: '#f0fdf4',
  },
  {
    id: 'end',     label: 'End & Log',        sub: 'duration: 2m 14s · score: 94',
    x: 606, y: 88,  w: 122, h: 54,
    bg: '#991b1b', border: '#f87171', dot: '#fca5a5', labelColor: '#fff1f2',
  },
];

type FlowEdge = [string, string];
const FLOW_EDGES: FlowEdge[] = [
  ['trigger', 'qualify'], ['trigger', 'support'],
  ['qualify', 'crm'],     ['support', 'sched'],
  ['crm', 'end'],         ['sched', 'end'],
];

function nodeMidRight(id: string) {
  const n = FLOW_NODES.find(n => n.id === id)!;
  return { x: n.x + n.w, y: n.y + n.h / 2 };
}
function nodeMidLeft(id: string) {
  const n = FLOW_NODES.find(n => n.id === id)!;
  return { x: n.x, y: n.y + n.h / 2 };
}

function OrchestrationVisual() {
  const [activeEdge, setActiveEdge] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveEdge(i => (i + 1) % FLOW_EDGES.length), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100/80 bg-white shadow-xl">

      {/* ── Window title bar ── */}
      <div className="flex items-center gap-0 border-b border-slate-100 bg-[#f7f8fa] px-4 py-[10px]">
        <div className="flex items-center gap-[6px]">
          <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
          <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
          <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
        </div>
        <span className="flex-1 text-center text-[11px] font-medium tracking-tight text-slate-400">
          emaavy-conversation-flow-builder
        </span>
        <div className="flex items-center gap-1.5 opacity-0 select-none">
          <span className="h-[11px] w-[11px]" />
        </div>
      </div>

      {/* ── Canvas ── */}
      <div className="overflow-x-auto">
      <div
        className="relative overflow-hidden"
        style={{
          height: 252,
          minWidth: 760,
          backgroundColor: '#fafbfc',
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.18) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 760 252"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Arrow marker — default grey */}
            <marker id="arrow-grey" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <polyline points="0,0 7,3.5 0,7" fill="none" stroke="#cbd5e1" strokeWidth="1.2" />
            </marker>
            {/* Arrow marker — active indigo */}
            <marker id="arrow-indigo" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <polyline points="0,0 7,3.5 0,7" fill="none" stroke="#6366f1" strokeWidth="1.4" />
            </marker>
          </defs>

          {FLOW_EDGES.map(([a, b], i) => {
            const s = nodeMidRight(a);
            const e = nodeMidLeft(b);
            const cx1 = s.x + (e.x - s.x) * 0.5;
            const cx2 = e.x - (e.x - s.x) * 0.5;
            const isActive = i === activeEdge;
            const d = `M${s.x},${s.y} C${cx1},${s.y} ${cx2},${e.y} ${e.x},${e.y}`;

            return (
              <g key={i}>
                {/* Base grey track */}
                <path d={d} fill="none" stroke="#e2e8f0" strokeWidth="1.5" markerEnd="url(#arrow-grey)" />
                {/* Animated active highlight */}
                {isActive && (
                  <motion.path
                    d={d}
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    markerEnd="url(#arrow-indigo)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {FLOW_NODES.map((node) => {
          const isActive = FLOW_EDGES[activeEdge]?.includes(node.id);
          return (
            <motion.div
              key={node.id}
              className="absolute flex flex-col rounded-xl px-3 py-2.5"
              style={{
                left: node.x,
                top: node.y,
                width: node.w,
                height: node.h,
                background: node.bg,
                border: `1px solid ${node.border}`,
              }}
              animate={{
                scale: isActive ? 1.05 : 1,
                boxShadow: isActive
                  ? `0 0 0 2px ${node.border}55, 0 8px 28px ${node.bg}99`
                  : '0 2px 10px rgba(0,0,0,0.25)',
              }}
              transition={{ type: 'spring', stiffness: 340, damping: 24 }}
            >
              <div className="flex items-center gap-1.5">
                <motion.span
                  className="h-[7px] w-[7px] rounded-full"
                  style={{ background: node.dot }}
                  animate={{ opacity: isActive ? [1, 0.4, 1] : 1 }}
                  transition={{ duration: 0.6, repeat: isActive ? Infinity : 0 }}
                />
                <span className="text-[11px] font-semibold leading-tight" style={{ color: node.labelColor }}>
                  {node.label}
                </span>
              </div>
              <span className="mt-1 text-[9px] leading-tight" style={{ color: `${node.labelColor}70` }}>
                {node.sub}
              </span>
            </motion.div>
          );
        })}
      </div>

      </div>{/* close overflow-x-auto */}
      {/* ── Status footer ── */}
      <div className="flex items-center gap-5 border-t border-slate-100 bg-[#f7f8fa] px-4 py-2 overflow-x-auto">
        {[
          { l: 'Nodes', v: '6' },
          { l: 'Edges', v: '5' },
          { l: 'Avg Duration', v: '2m 14s' },
          { l: 'Status', v: 'Deployed' },
        ].map(m => (
          <div key={m.l} className="flex items-center gap-1">
            <span className="text-[10px] text-slate-400">{m.l}:</span>
            <span className="text-[10px] font-semibold text-slate-600">{m.v}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1.5">
          <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-emerald-400" />
          <span className="text-[10px] font-medium text-emerald-600">All systems operational</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   VISUAL 2 — Real-time monitoring — dual-panel app window
   ═══════════════════════════════════════════════════════════════════════════ */
const LOG_LINES = [
  { t: '14:32:01', who: 'AI Agent', msg: 'Namaste! Main Emaavy se Priya bol rahi hoon. Kya aap baat kar sakte hain?' },
  { t: '14:32:05', who: 'User',     msg: 'Haan, bilkul. Boliye.' },
  { t: '14:32:09', who: 'AI Agent', msg: 'Main aapko hamare premium plan ke baare mein batana chahti thi...' },
  { t: '14:32:15', who: 'User',     msg: 'Okay, pricing kya hai?' },
  { t: '14:32:19', who: 'AI Agent', msg: 'Humare plans ₹2,999/mo se shuru hote hain. Demo chahiye?' },
  { t: '14:32:25', who: 'User',     msg: 'Haan zaroor! Schedule kar sakte hain?' },
  { t: '14:32:28', who: 'System',   msg: '✦ CRM updated · Calendly invite sent · Lead score: 94' },
];

function MonitoringVisual() {
  const [bars, setBars]     = useState<number[]>(Array.from({ length: 32 }, () => 40));
  const [metrics, setMetrics] = useState({ latency: 469, cost: 0.0039, concurrency: 102 });
  const [logIdx, setLogIdx] = useState(2);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setBars(Array.from({ length: 32 }, () => 12 + Math.random() * 78));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const t1 = setInterval(() => {
      setBars(p => [...p.slice(1), 12 + Math.random() * 78]);
      setMetrics(m => ({
        latency:     Math.max(340, Math.min(499, m.latency + (Math.random() - 0.5) * 20)),
        cost:        Math.max(0.002, Math.min(0.007, m.cost + (Math.random() - 0.5) * 0.0003)),
        concurrency: Math.max(88, Math.min(160, m.concurrency + Math.floor((Math.random() - 0.5) * 6))),
      }));
    }, 500);
    const t2 = setInterval(() => setLogIdx(i => Math.min(i + 1, LOG_LINES.length - 1)), 1600);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, [mounted]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100/80 bg-white shadow-xl">

      {/* ── Window title bar ── */}
      <div className="flex items-center border-b border-slate-100 bg-[#f7f8fa] px-4 py-[10px]">
        <div className="flex items-center gap-[6px]">
          <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
          <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
          <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
        </div>
        <span className="flex-1 text-center text-[11px] font-medium tracking-tight text-slate-400">
          emaavy-call-monitor-live
        </span>
        <div className="flex items-center gap-1.5">
          <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-emerald-400" />
          <span className="text-[10px] font-semibold text-emerald-600">{metrics.concurrency} active</span>
        </div>
      </div>

      {/* ── Dual-panel body ── */}
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">

        {/* LEFT — dark transcript console */}
        <div
          className="w-full md:w-[52%] overflow-hidden p-4 font-mono text-xs"
          style={{ background: '#080f1e' }}
        >
          {/* Console header */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="h-[6px] w-[6px] animate-pulse rounded-full bg-emerald-400" />
              <span className="text-[10px] font-semibold text-slate-400">Live Transcript</span>
            </div>
            <span
              className="rounded px-1.5 py-0.5 text-[9px] text-slate-500"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              HI-IN · GPT-4o
            </span>
          </div>

          {/* Log lines */}
          <div className="space-y-[1px]">
            {LOG_LINES.slice(0, logIdx + 1).map((line, i) => (
              <motion.div
                key={i}
                className="flex gap-2 py-[5px]"
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                <span className="shrink-0 text-[9px] text-slate-600">{line.t}</span>
                <span
                  className="shrink-0 w-[52px] text-[9px] font-bold"
                  style={{
                    color: line.who === 'AI Agent' ? '#60a5fa'
                         : line.who === 'User'     ? '#4ade80'
                         : '#fbbf24',
                  }}
                >
                  [{line.who}]
                </span>
                <span className="text-[9.5px] leading-relaxed text-slate-300">{line.msg}</span>
              </motion.div>
            ))}
            {logIdx < LOG_LINES.length - 1 && (
              <motion.span
                className="ml-[72px] inline-block h-[11px] w-[5px] rounded-[1px] bg-emerald-400/70"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </div>
        </div>

        {/* RIGHT — white analytics panel */}
        <div className="flex flex-1 flex-col gap-0">

          {/* Waveform strip */}
          <div className="border-b border-slate-100 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-slate-400">Audio Activity</span>
              <span className="text-[10px] font-mono text-slate-300">rolling 16s</span>
            </div>
            <div className="flex h-[46px] items-end gap-[2.5px]">
              {bars.map((h, i) => {
                const recent = i >= 26;
                return (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-[1.5px]"
                    style={{
                      background: recent
                        ? '#34d399'
                        : `rgba(99,102,241,${0.15 + (i / 32) * 0.55})`,
                    }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                );
              })}
            </div>
          </div>

          {/* Three metric boxes */}
          <div className="flex flex-col divide-y divide-slate-100">
            {[
              { label: 'Latency',     val: `${Math.round(metrics.latency)}ms`,  sub: 'p95: <500ms',    color: '#6366f1' },
              { label: 'Cost / call', val: `$${metrics.cost.toFixed(4)}`,        sub: 'budget: $0.008', color: '#8b5cf6' },
              { label: 'Concurrency', val: `${metrics.concurrency} active`,      sub: 'peak: 184',      color: '#059669' },
            ].map(m => (
              <div key={m.label} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-[10px] font-medium text-slate-400">{m.label}</p>
                  <p className="text-[10px] text-slate-300">{m.sub}</p>
                </div>
                <p
                  className="text-[20px] font-bold tabular-nums leading-none"
                  style={{ color: m.color }}
                >
                  {m.val}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   VISUAL 3 — IDE + enterprise settings panel
   ═══════════════════════════════════════════════════════════════════════════ */
const CODE = [
  [{ t: 'import',     c: '#c792ea' }, { t: ' { EmaavyAgent }', c: '#89ddff' }, { t: ' from',    c: '#c792ea' }, { t: " 'emaavy-sdk'", c: '#c3e88d' }],
  [],
  [{ t: 'const',      c: '#c792ea' }, { t: ' agent ',   c: '#eeffff' }, { t: '=',      c: '#89ddff' }, { t: ' new ',       c: '#c792ea' }, { t: 'EmaavyAgent',  c: '#ffcb6b' }, { t: '({',          c: '#eeffff' }],
  [{ t: '  model',    c: '#f78c6c' }, { t: ':',         c: '#89ddff' }, { t: " 'gpt-4o'",       c: '#c3e88d' }, { t: ',',           c: '#eeffff' }],
  [{ t: '  voice',    c: '#f78c6c' }, { t: ':',         c: '#89ddff' }, { t: " 'nova-multilingual'", c: '#c3e88d' }, { t: ',', c: '#eeffff' }],
  [{ t: '  language', c: '#f78c6c' }, { t: ':',         c: '#89ddff' }, { t: " 'hi-IN'",         c: '#c3e88d' }, { t: ',',           c: '#eeffff' }],
  [{ t: '  temperature', c: '#f78c6c' }, { t: ':',      c: '#89ddff' }, { t: ' 0.4',             c: '#f78c6c' }, { t: ',',           c: '#eeffff' }],
  [{ t: '  maxTokens',   c: '#f78c6c' }, { t: ':',      c: '#89ddff' }, { t: ' 512',             c: '#f78c6c' }, { t: ',',           c: '#eeffff' }],
  [{ t: '  workflow', c: '#f78c6c' }, { t: ':',         c: '#89ddff' }, { t: ' leadQualFlow',    c: '#ffcb6b' }, { t: ',',           c: '#eeffff' }],
  [{ t: '  webhooks', c: '#f78c6c' }, { t: ': [',       c: '#eeffff' }, { t: "crm",              c: '#ffcb6b' }, { t: ',',           c: '#eeffff' }, { t: ' sched',      c: '#ffcb6b' }, { t: '],', c: '#eeffff' }],
  [{ t: '});',        c: '#eeffff' }],
];

function Slider({ label, val, unit }: { label: string; val: number; unit: string }) {
  const [v, setV] = useState(val);
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[10.5px] font-medium text-slate-600">{label}</span>
        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-700">{v}{unit}</span>
      </div>
      <input type="range" min={0} max={100} value={v} onChange={e => setV(+e.target.value)}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-indigo-600" />
    </div>
  );
}

function ConfigVisual() {
  const [model, setModel] = useState('GPT-4o');
  const [toggles, setToggles] = useState({ sentiment: true, recording: true, crm: true, hipaa: false, fallback: true });

  const toggle = (k: keyof typeof toggles) => setToggles(p => ({ ...p, [k]: !p[k] }));

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
      {/* Chrome */}
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-900 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
        <span className="h-3 w-3 rounded-full bg-green-400/70" />
        <span className="ml-3 text-xs font-medium text-white/30">emaavy · agent.config.ts</span>
        <div className="ml-auto flex gap-2">
          {['Run', 'Deploy'].map(b => (
            <span key={b} className="rounded px-2.5 py-1 text-[10px] font-medium"
              style={{ background: b === 'Deploy' ? '#6366f1' : 'rgba(255,255,255,0.08)', color: '#fff' }}>{b}</span>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">
        {/* IDE Code pane — hidden on mobile */}
        <div className="hidden md:block w-full md:w-[55%] overflow-hidden bg-[#1a1b26] p-4">
          {/* Line numbers + code */}
          <div className="space-y-[1px]">
            {CODE.map((line, li) => (
              <motion.div key={li} className="flex font-mono text-[10.5px] leading-[1.8]"
                initial={{ opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: li * 0.04, duration: 0.25 }}>
                <span className="mr-3 w-4 shrink-0 select-none text-right text-white/15">{li + 1}</span>
                {line.length === 0
                  ? <span>&nbsp;</span>
                  : line.map((tok, ti) => <span key={ti} style={{ color: tok.c }}>{tok.t}</span>)
                }
              </motion.div>
            ))}
          </div>
          {/* Blinking cursor */}
          <motion.span className="mt-1 inline-block h-[13px] w-[2px] rounded-sm bg-white/60"
            animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }} />
        </div>

        {/* Settings pane */}
        <div className="flex-1 overflow-y-auto bg-white p-4">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-slate-400">Agent Configuration</p>

          {/* LLM Model selector */}
          <div className="mb-4">
            <p className="mb-1.5 text-[10.5px] font-semibold text-slate-600">LLM Model</p>
            <div className="flex flex-wrap gap-1.5">
              {['GPT-4o', 'GPT-3.5', 'Claude 3', 'Gemini Pro'].map(m => (
                <button key={m} onClick={() => setModel(m)}
                  className={`rounded-lg px-2.5 py-1.5 text-[10px] font-semibold transition-all ${model === m ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="mb-4 space-y-3">
            <Slider label="Temperature" val={40} unit="%" />
            <Slider label="Max Tokens"  val={65} unit="%" />
            <Slider label="Confidence Threshold" val={78} unit="%" />
          </div>

          {/* Webhook input */}
          <div className="mb-4">
            <p className="mb-1.5 text-[10.5px] font-semibold text-slate-600">Webhook URL</p>
            <div className="flex items-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 text-[10px]">
              <span className="border-r border-slate-200 bg-white px-2 py-2 text-slate-400">POST</span>
              <span className="px-2 font-mono text-slate-500 truncate">https://hooks.emaavy.io/crm-sync</span>
            </div>
          </div>

          {/* Feature toggles */}
          <div className="space-y-2.5">
            {(Object.entries(toggles) as [keyof typeof toggles, boolean][]).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between">
                <span className="text-[10.5px] font-medium text-slate-600 capitalize">
                  {k.replace(/([A-Z])/g, ' $1')}
                </span>
                <button onClick={() => toggle(k)}
                  className={`relative h-4 w-7 rounded-full transition-colors duration-200 ${v ? 'bg-indigo-500' : 'bg-slate-200'}`}>
                  <motion.div className="absolute top-0.5 h-3 w-3 rounded-full bg-white shadow-sm"
                    animate={{ left: v ? '14px' : '2px' }}
                    transition={{ type: 'spring', stiffness: 600, damping: 32 }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOVER TILT WRAPPER
   ═══════════════════════════════════════════════════════════════════════════ */
function TiltWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(useTransform(rx, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(ry, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 30 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    rx.set((e.clientY - r.top) / r.height - 0.5);
    ry.set((e.clientX - r.left) / r.width - 0.5);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1200 }}
      whileHover={{ y: -4, scale: 1.005 }}
      transition={{ type: 'spring', stiffness: 180, damping: 22 }}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION DATA
   bg: explicit per-section background class
   ═══════════════════════════════════════════════════════════════════════════ */
const SECTIONS = [
  {
    tag:     'Orchestration',
    tagColor:'#6366f1',
    headline:'Build production voice\nworkflows visually.',
    p1:      'Emaavy\'s flow builder lets your team chain LLM calls, telephony events, CRM writes, and webhook triggers into a single, version-controlled graph — no backend code needed. Every node is testable in isolation, and rollbacks are one click.',
    p2:      'When a call arrives, Emaavy evaluates conditions in real time — routing inbound queries to the right agent persona, escalating edge cases to a human, and triggering downstream automations the moment intent is confirmed.',
    visual:  <OrchestrationVisual />,
    flip:    false,
    bg:      '',
    bgStyle: { background: '#ffffff' },
  },
  {
    tag:     'Real-time Monitoring',
    tagColor:'#0891b2',
    headline:'Full visibility into\nevery live call.',
    p1:      'Stream latency, cost, and sentiment metrics across all concurrent calls from a single dark-mode operations console. Anomalies surface before they compound — not hours later in a CSV export.',
    p2:      'Every utterance is transcribed, timestamped, and scored for intent and sentiment the moment it\'s spoken. Your operations team sees the live transcript, hears the audio, and can flag or intervene — all without leaving the dashboard.',
    visual:  <MonitoringVisual />,
    flip:    true,
    bg:      '',
    bgStyle: { background: '#f5f7ff' },
  },
  {
    tag:     'Configurability',
    tagColor:'#15803d',
    headline:'Infinite control.\nZero redeploys.',
    p1:      'Swap LLM providers, adjust temperature, change voice personas, or toggle compliance modes from the IDE or the settings panel — changes propagate instantly to all running agents without a deployment cycle.',
    p2:      'Enterprise teams can manage environment-level configs via Git-backed JSON, while operators get the full GUI. Role-based access means your security team controls which flags are mutable in production — and full audit logs prove it.',
    visual:  <ConfigVisual />,
    flip:    false,
    bg:      '',
    bgStyle: { background: '#eef1ff' },
  },
];

const PILLARS = ['Orchestration', 'Real-time monitoring', 'Multi-language support', 'CRM integrations'];

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function UnifiedPlatform() {
  return (
    <div>

      {/* ── Intro header ── */}
      <section className="py-10 md:py-12 lg:py-14" style={{ background: '#fafbff' }}>
        <div className="site-container">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.28em] text-indigo-500">
              Unified Platform
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 lg:text-[52px]">
              Everything you need to build enterprise voice AI.
            </h2>

            {/* Pillar tagline row */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
              {PILLARS.map((p, i) => (
                <span key={p} className="flex items-center gap-3">
                  <span className="text-[15px] font-medium text-slate-500">{p}</span>
                  {i < PILLARS.length - 1 && (
                    <span className="text-slate-300 select-none">•</span>
                  )}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Feature sections — alternating backgrounds ── */}
      <div style={{ borderTop: '1px solid rgba(99,102,241,0.10)' }}>
        {SECTIONS.map((sec) => (
          <section
            key={sec.tag}
            className="py-10 md:py-14 lg:py-16"
            style={{ ...sec.bgStyle, borderBottom: '1px solid rgba(99,102,241,0.07)' }}
          >
            <div className="site-container">
              <div className={`flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16 ${sec.flip ? 'lg:flex-row-reverse' : ''}`}>

                {/* ── Text side ── */}
                <motion.div
                  className="lg:w-[42%]"
                  variants={fadeUp(0)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-80px' }}
                >
                  <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: sec.tagColor }}>
                    {sec.tag}
                  </p>
                  <h2 className="mb-6 font-display text-3xl sm:text-4xl font-bold leading-[1.15] tracking-tight text-slate-900 lg:text-[44px]">
                    {sec.headline.replace(/\n/g, ' ')}
                  </h2>
                  <p className="mb-4 text-[15px] leading-[1.75] text-slate-500">{sec.p1}</p>
                  <p className="text-[15px] leading-[1.75] text-slate-500">{sec.p2}</p>

                </motion.div>

                {/* ── Visual side ── */}
                <motion.div
                  className="lg:flex-1"
                  variants={fadeUp(0.12)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-80px' }}
                >
                  <TiltWrapper>
                    {sec.visual}
                  </TiltWrapper>
                </motion.div>

              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
