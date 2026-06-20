'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

/* ─── Flow node definitions ──────────────────────────────────────────────────── */
const FLOW_NODES = [
  { id: 'trigger',  label: 'Lead Enters CRM',      type: 'trigger',  x: 60,  y: 180, color: '#a78bfa' },
  { id: 'filter',   label: 'Score ≥ 60?',           type: 'condition',x: 220, y: 100, color: '#f59e0b' },
  { id: 'call1',    label: 'AI Calls Prospect',     type: 'action',   x: 390, y: 60,  color: '#34d399' },
  { id: 'wait1',    label: 'Wait 24h',              type: 'wait',     x: 390, y: 180, color: '#94a3b8' },
  { id: 'sms',      label: 'Send Follow-up SMS',    type: 'action',   x: 560, y: 60,  color: '#38bdf8' },
  { id: 'call2',    label: 'Retry Call',            type: 'action',   x: 560, y: 180, color: '#34d399' },
  { id: 'book',     label: 'Book Meeting',          type: 'success',  x: 730, y: 120, color: '#4ade80' },
  { id: 'nurture',  label: 'Nurture Sequence',      type: 'action',   x: 220, y: 260, color: '#818cf8' },
] as const;

const FLOW_EDGES = [
  { from: 'trigger', to: 'filter' },
  { from: 'filter',  to: 'call1' },
  { from: 'filter',  to: 'wait1' },
  { from: 'filter',  to: 'nurture' },
  { from: 'call1',   to: 'sms'   },
  { from: 'wait1',   to: 'call2' },
  { from: 'sms',     to: 'book'  },
  { from: 'call2',   to: 'book'  },
];

/* ─── Built-in template library ─────────────────────────────────────────────── */
const TEMPLATES = [
  { id: 't1', name: 'Inbound Speed-to-Lead',   steps: 5,  color: '#a78bfa', runs: '12.4K' },
  { id: 't2', name: 'Cold Outbound Sequence',  steps: 8,  color: '#38bdf8', runs: '9.1K'  },
  { id: 't3', name: 'Churn Prevention',        steps: 6,  color: '#34d399', runs: '4.7K'  },
  { id: 't4', name: 'Demo No-Show Recovery',   steps: 4,  color: '#f59e0b', runs: '6.2K'  },
  { id: 't5', name: 'Post-Trial Conversion',   steps: 7,  color: '#f43f5e', runs: '3.8K'  },
  { id: 't6', name: 'Enterprise Upsell',       steps: 9,  color: '#4ade80', runs: '2.1K'  },
];

/* ─── Live active campaigns ──────────────────────────────────────────────────── */
const CAMPAIGNS_INIT = [
  { id: 'c1', name: 'Q3 Outbound Blitz',     status: 'live',    calls: 4820, booked: 312, rate: 78 },
  { id: 'c2', name: 'SaaS Trial Converter',  status: 'live',    calls: 2190, booked: 184, rate: 82 },
  { id: 'c3', name: 'Enterprise Nurture',    status: 'paused',  calls: 980,  booked: 67,  rate: 71 },
  { id: 'c4', name: 'Reactivation Wave',     status: 'live',    calls: 1430, booked: 98,  rate: 74 },
];

/* ─── Tiny sparkline pts ─────────────────────────────────────────────────────── */
const SPARK_A = [30, 45, 38, 60, 52, 75, 68, 90, 82, 100, 95, 110];
const SPARK_B = [20, 35, 28, 50, 44, 62, 58, 78, 70, 88, 80, 95];

function MiniSpark({ pts, color }: { pts: number[]; color: string }) {
  const max = Math.max(...pts);
  const h = 32, w = 80;
  const path = pts.map((v, i) => `${(i / (pts.length - 1)) * w},${h - (v / max) * (h - 4)}`).join(' L ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: w, height: h }} preserveAspectRatio="none">
      <motion.path d={`M ${path}`} fill="none" stroke={color} strokeWidth="1.5"
        strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }} />
    </svg>
  );
}

/* ─── Animated SVG flow canvas ───────────────────────────────────────────────── */
function FlowCanvas({ activeNode }: { activeNode: string }) {
  const nodeMap = Object.fromEntries(FLOW_NODES.map(n => [n.id, n]));

  return (
    <svg viewBox="0 0 820 340" className="w-full" style={{ height: 240 }} preserveAspectRatio="xMidYMid meet">
      {/* Edges */}
      {FLOW_EDGES.map((e, i) => {
        const from = nodeMap[e.from]; const to = nodeMap[e.to];
        const isActive = activeNode === e.from || activeNode === e.to;
        return (
          <motion.line key={i}
            x1={from.x + 48} y1={from.y + 16} x2={to.x} y2={to.y + 16}
            stroke={isActive ? from.color : '#1e2235'} strokeWidth={isActive ? 1.5 : 1}
            strokeDasharray={isActive ? '0' : '4 4'}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          />
        );
      })}

      {/* Animated pulse along active edges */}
      {FLOW_EDGES.filter(e => e.from === activeNode).map((e, i) => {
        const from = nodeMap[e.from]; const to = nodeMap[e.to];
        return (
          <motion.circle key={`pulse-${e.from}-${e.to}`} r="3" fill={from.color}
            initial={{ cx: from.x + 48, cy: from.y + 16 }}
            animate={{ cx: to.x, cy: to.y + 16 }}
            transition={{ duration: 0.7, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.8 }}
          />
        );
      })}

      {/* Nodes */}
      {FLOW_NODES.map((n, i) => {
        const isActive = n.id === activeNode;
        return (
          <motion.g key={n.id} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06, type: 'spring', stiffness: 300 }}>
            {/* Glow */}
            {isActive && <ellipse cx={n.x + 48} cy={n.y + 16} rx={52} ry={22} fill={n.color} fillOpacity="0.08" />}
            {/* Box */}
            <rect x={n.x} y={n.y} width={96} height={32} rx={6}
              fill={isActive ? n.color + '18' : '#111827'}
              stroke={isActive ? n.color : '#1e2235'}
              strokeWidth={isActive ? 1.5 : 1}
            />
            {/* Label */}
            <text x={n.x + 48} y={n.y + 21} textAnchor="middle"
              fontSize="9" fill={isActive ? n.color : '#6b7280'} fontFamily="ui-monospace,monospace">
              {n.label}
            </text>
            {/* Type dot */}
            <circle cx={n.x + 8} cy={n.y + 16} r={3} fill={n.color} fillOpacity={isActive ? 1 : 0.4} />
          </motion.g>
        );
      })}
    </svg>
  );
}

const NODE_ORDER = FLOW_NODES.map(n => n.id);

/* ─── Main component ─────────────────────────────────────────────────────────── */
export default function CampaignStudio() {
  const [activeNode, setActiveNode]   = useState<(typeof FLOW_NODES)[number]['id']>('trigger');
  const [campaigns, setCampaigns]     = useState(CAMPAIGNS_INIT);
  const [activeTab, setActiveTab]     = useState<'flows' | 'templates'>('flows');
  const [launching, setLaunching]     = useState<string | null>(null);
  const [hoveredTpl, setHoveredTpl]  = useState<string | null>(null);
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const launchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Auto-walk nodes */
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setActiveNode(n => {
        const idx = NODE_ORDER.indexOf(n);
        return NODE_ORDER[(idx + 1) % NODE_ORDER.length];
      });
    }, 1400);
    return () => clearTimeout(timerRef.current ?? undefined);
  }, [activeNode]);

  /* Live campaign metric ticks */
  useEffect(() => {
    const id = setInterval(() => {
      setCampaigns(prev => prev.map(c =>
        c.status === 'live'
          ? { ...c, calls: c.calls + Math.floor(Math.random() * 4), booked: c.booked + (Math.random() > 0.7 ? 1 : 0) }
          : c
      ));
    }, 1600);
    return () => clearInterval(id);
  }, []);

  const handleLaunch = (id: string) => {
    if (launchTimer.current) clearTimeout(launchTimer.current);
    setLaunching(id);
    launchTimer.current = setTimeout(() => {
      setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: 'live' } : c));
      setLaunching(null);
    }, 1800);
  };

  useEffect(() => () => { if (launchTimer.current) clearTimeout(launchTimer.current); }, []);

  return (
    <section
      className="border-b border-white/5 overflow-hidden relative"
      style={{ background: 'linear-gradient(160deg, #0b0e1a 0%, #0d1020 50%, #0a0c18 100%)' }}
    >
      {/* Grid overlay texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 pt-24 pb-28">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-400 mb-5">
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              Campaign Studio
            </span>
            <h2
              className="text-[40px] md:text-[56px] font-bold text-white leading-[1.05]"
              style={{ letterSpacing: '-0.03em' }}
            >
              Build it once.
              <br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,#a78bfa,#38bdf8)' }}>
                Launch to thousands.
              </span>
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-neutral-500">
              Design voice AI campaigns with our no-code flow builder, pick from battle-tested templates, and launch across your entire pipeline — all from one studio.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex gap-3 shrink-0"
          >
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-semibold text-white transition-all duration-200 hover:brightness-110"
              style={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', boxShadow: '0 0 28px rgba(124,58,237,0.3)' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New campaign
            </Link>
            <Link
              href="/campaigns"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-semibold transition-all duration-200"
              style={{ background: '#ffffff08', border: '1px solid #ffffff12', color: '#94a3b8' }}
            >
              View all campaigns
            </Link>
          </motion.div>
        </div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-12 gap-4">

          {/* [1] Flow canvas — large */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-12 lg:col-span-8 rounded-2xl overflow-hidden"
            style={{ background: '#0d111f', border: '1px solid #1e2235' }}
          >
            {/* Card header */}
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#1e2235' }}>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#1e2235' }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#1e2235' }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#1e2235' }} />
                </div>
                <span className="text-[12px] font-semibold text-neutral-300">Flow Builder</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-mono" style={{ background: '#a78bfa18', color: '#a78bfa', border: '1px solid #a78bfa30' }}>
                  Auto-saved
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-neutral-600">{FLOW_NODES.length} nodes · {FLOW_EDGES.length} connections</span>
                <button className="text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors"
                  style={{ background: '#a78bfa20', color: '#a78bfa', border: '1px solid #a78bfa30' }}>
                  + Add node
                </button>
              </div>
            </div>

            {/* Canvas */}
            <div className="px-4 pt-4 pb-2">
              <FlowCanvas activeNode={activeNode} />
            </div>

            {/* Node type legend */}
            <div className="flex items-center gap-5 px-6 py-3 border-t" style={{ borderColor: '#1e2235' }}>
              {[
                { label: 'Trigger', color: '#a78bfa' },
                { label: 'Condition', color: '#f59e0b' },
                { label: 'Action', color: '#34d399' },
                { label: 'Wait', color: '#94a3b8' },
                { label: 'Success', color: '#4ade80' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                  <span className="text-[10px] text-neutral-600">{l.label}</span>
                </div>
              ))}
              <div className="ml-auto flex items-center gap-2">
                <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-neutral-600">Live preview</span>
              </div>
            </div>
          </motion.div>

          {/* [2] Live campaigns panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="col-span-12 lg:col-span-4 rounded-2xl overflow-hidden flex flex-col"
            style={{ background: '#0d111f', border: '1px solid #1e2235' }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#1e2235' }}>
              <span className="text-[12px] font-semibold text-neutral-300">Active Campaigns</span>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Live
              </motion.span>
            </div>
            <div className="flex-1 divide-y" style={{ borderColor: '#1e2235' }}>
              {campaigns.map(c => (
                <div key={c.id} className="px-5 py-3.5" style={{ borderBottom: '1px solid #1e2235' }}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="text-[12px] font-semibold text-neutral-200">{c.name}</p>
                    </div>
                    {c.status === 'live' ? (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0"
                        style={{ background: '#4ade8018', color: '#4ade80', border: '1px solid #4ade8030' }}>
                        LIVE
                      </span>
                    ) : (
                      <button
                        onClick={() => handleLaunch(c.id)}
                        disabled={launching === c.id}
                        className="text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 transition-all"
                        style={{ background: '#f59e0b18', color: '#f59e0b', border: '1px solid #f59e0b30' }}
                      >
                        {launching === c.id ? (
                          <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 0.6, repeat: Infinity }}>
                            LAUNCHING…
                          </motion.span>
                        ) : 'PAUSED · Launch'}
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-[11px]">
                    <div>
                      <span className="text-neutral-600">Calls </span>
                      <motion.span key={c.calls} initial={{ color: '#a78bfa' }} animate={{ color: '#e2e8f0' }}
                        transition={{ duration: 0.5 }} className="font-mono font-semibold">
                        {c.calls.toLocaleString()}
                      </motion.span>
                    </div>
                    <div>
                      <span className="text-neutral-600">Booked </span>
                      <motion.span key={c.booked} initial={{ color: '#34d399' }} animate={{ color: '#e2e8f0' }}
                        transition={{ duration: 0.5 }} className="font-mono font-semibold">
                        {c.booked}
                      </motion.span>
                    </div>
                    <div className="ml-auto">
                      <span className="text-[10px] font-semibold" style={{ color: c.rate >= 80 ? '#4ade80' : '#f59e0b' }}>
                        {c.rate}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* [3] Tab: Built-in flows / templates */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="col-span-12 lg:col-span-5 rounded-2xl overflow-hidden flex flex-col"
            style={{ background: '#0d111f', border: '1px solid #1e2235' }}
          >
            {/* Tabs */}
            <div className="flex border-b" style={{ borderColor: '#1e2235' }}>
              {(['flows', 'templates'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 py-3.5 text-[12px] font-semibold capitalize transition-colors"
                  style={{
                    color: activeTab === tab ? '#a78bfa' : '#52525b',
                    borderBottom: activeTab === tab ? '2px solid #a78bfa' : '2px solid transparent',
                    background: activeTab === tab ? '#a78bfa08' : 'transparent',
                  }}
                >
                  {tab === 'flows' ? 'Custom Flows' : 'Built-in Templates'}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'templates' ? (
                <motion.div key="tpl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex-1 divide-y" style={{ borderColor: '#1e2235' }}>
                  {TEMPLATES.map(t => (
                    <div
                      key={t.id}
                      onMouseEnter={() => setHoveredTpl(t.id)}
                      onMouseLeave={() => setHoveredTpl(null)}
                      className="flex items-center justify-between px-5 py-3.5 cursor-pointer transition-colors"
                      style={{ borderBottom: '1px solid #1e2235', background: hoveredTpl === t.id ? '#ffffff04' : 'transparent' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: t.color + '18', border: `1px solid ${t.color}28` }}>
                          <span className="text-[10px] font-bold" style={{ color: t.color }}>▶</span>
                        </div>
                        <div>
                          <p className="text-[12px] font-medium text-neutral-200">{t.name}</p>
                          <p className="text-[10px] text-neutral-600">{t.steps} steps · {t.runs} runs</p>
                        </div>
                      </div>
                      <AnimatePresence>
                        {hoveredTpl === t.id && (
                          <motion.button
                            initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                            className="text-[10px] font-semibold px-3 py-1.5 rounded-lg transition-colors shrink-0"
                            style={{ background: t.color + '18', color: t.color, border: `1px solid ${t.color}28` }}
                          >
                            Use template
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div key="flows" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex-1 p-5 space-y-3">
                  {[
                    { name: 'My Outbound Flow v3', updated: '2h ago',   nodes: 6,  color: '#38bdf8' },
                    { name: 'SMB Qualification',   updated: '1d ago',   nodes: 4,  color: '#34d399' },
                    { name: 'Enterprise nurture',  updated: '3d ago',   nodes: 11, color: '#a78bfa' },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl"
                      style={{ background: '#111827', border: '1px solid #1e2235' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: f.color + '15', border: `1px solid ${f.color}25` }}>
                          <svg className="w-3.5 h-3.5" style={{ color: f.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-[12px] font-medium text-neutral-200">{f.name}</p>
                          <p className="text-[10px] text-neutral-600">{f.nodes} nodes · edited {f.updated}</p>
                        </div>
                      </div>
                      <button className="text-[10px] font-semibold px-3 py-1 rounded-lg transition-colors"
                        style={{ background: '#ffffff08', color: '#94a3b8', border: '1px solid #ffffff10' }}>
                        Edit
                      </button>
                    </div>
                  ))}
                  <Link href="/flows/new"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[12px] font-semibold transition-colors"
                    style={{ border: '1px dashed #2e3348', color: '#4b5563' }}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Create new flow
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* [4] Performance chart */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-12 lg:col-span-4 rounded-2xl overflow-hidden flex flex-col"
            style={{ background: '#0d111f', border: '1px solid #1e2235' }}
          >
            <div className="px-5 py-4 border-b" style={{ borderColor: '#1e2235' }}>
              <p className="text-[12px] font-semibold text-neutral-300">Campaign Performance</p>
              <p className="text-[10px] text-neutral-600 mt-0.5">Last 12 weeks</p>
            </div>
            <div className="flex-1 p-5 flex flex-col gap-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-neutral-600 uppercase tracking-wider">Calls Placed</span>
                  <span className="text-[12px] font-semibold text-violet-400 font-mono">+38%</span>
                </div>
                <MiniSpark pts={SPARK_A} color="#a78bfa" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-neutral-600 uppercase tracking-wider">Meetings Booked</span>
                  <span className="text-[12px] font-semibold text-cyan-400 font-mono">+52%</span>
                </div>
                <MiniSpark pts={SPARK_B} color="#38bdf8" />
              </div>
              <div className="mt-auto grid grid-cols-2 gap-3">
                {[
                  { label: 'Total campaigns', val: '24',    color: '#a78bfa' },
                  { label: 'Avg book rate',   val: '76%',  color: '#34d399' },
                ].map(s => (
                  <div key={s.label} className="rounded-xl px-3 py-3"
                    style={{ background: '#111827', border: '1px solid #1e2235' }}>
                    <p className="text-[9px] uppercase tracking-wider text-neutral-600 mb-1">{s.label}</p>
                    <p className="text-[18px] font-bold font-mono" style={{ color: s.color }}>{s.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* [5] Quick launch CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="col-span-12 lg:col-span-3 rounded-2xl overflow-hidden flex flex-col justify-between"
            style={{ background: 'linear-gradient(135deg, #1e1040, #0f0d24)', border: '1px solid #a78bfa28' }}
          >
            <div className="p-6 flex-1 flex flex-col">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: '#a78bfa18', border: '1px solid #a78bfa30' }}>
                <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              </div>
              <h4 className="text-[15px] font-bold text-white mb-2">Launch in 60 seconds</h4>
              <p className="text-[12px] leading-relaxed text-neutral-500 flex-1">
                Pick a template, connect your CRM, and your first campaign is live before the meeting ends.
              </p>
            </div>
            <div className="p-5 pt-0 space-y-2">
              <Link href="/signup"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[13px] font-semibold text-white transition-all hover:brightness-110"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', boxShadow: '0 0 20px rgba(124,58,237,0.25)' }}>
                Start building
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/campaigns/templates"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[12px] font-semibold transition-all"
                style={{ background: '#ffffff06', color: '#6b7280', border: '1px solid #ffffff0a' }}>
                Browse templates
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
