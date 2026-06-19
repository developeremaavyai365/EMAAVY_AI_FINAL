'use client';

/* "One platform" — white bg, two feature cards — exact Vapi style */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineChartBarSquare,
  HiOutlineCheckCircle,
  HiOutlineCpuChip,
} from 'react-icons/hi2';

const BUILD_STEPS = [
  { label: 'Choose your LLM model',           done: true },
  { label: 'Connect telephony (Twilio/Plivo)', done: true },
  { label: 'Configure voice & language',       done: true },
  { label: 'Deploy agent to production',       done: false, active: true },
];

function BuildMiniUI() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % BUILD_STEPS.length), 1500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="mt-6 space-y-2 rounded-xl border border-gray-100 bg-gray-50 p-4">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Agent builder</p>
      {BUILD_STEPS.map((s, i) => {
        const done    = i < step;
        const active  = i === step;
        return (
          <div key={s.label} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${active ? 'bg-white shadow-sm' : ''}`}>
            <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${done ? 'border-green-500 bg-green-500' : active ? 'border-black bg-black' : 'border-gray-200'}`}>
              {done  && <HiOutlineCheckCircle className="h-3 w-3 text-white" />}
              {active && <motion.div className="h-1.5 w-1.5 rounded-full bg-white" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.6, repeat: Infinity }} />}
            </div>
            <span className={done ? 'text-gray-400 line-through' : active ? 'font-medium text-gray-900' : 'text-gray-400'}>
              {s.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

const METRICS = [
  { label: 'Calls today',     val: '2,847', delta: '+18%',  good: true },
  { label: 'Resolution rate', val: '94.6%', delta: '+4%',   good: true },
  { label: 'Handle time',     val: '1m 52s', delta: '-12%', good: true },
  { label: 'Escalations',     val: '5.4%',  delta: '-2%',   good: true },
];

function MonitorMiniUI() {
  return (
    <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Live dashboard</p>
        <span className="flex items-center gap-1.5 text-[10px] font-medium text-green-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" /> Live
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {METRICS.map((m) => (
          <div key={m.label} className="rounded-lg bg-white p-3 shadow-sm">
            <p className="text-[10px] text-gray-500">{m.label}</p>
            <p className="mt-1 text-base font-bold text-gray-900">{m.val}</p>
            <p className="text-[10px] font-medium text-green-600">{m.delta}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex h-8 items-end gap-1">
        {[45, 60, 52, 78, 70, 88, 82, 92, 75, 85, 90, 95].map((h, i) => (
          <motion.div key={i} className="flex-1 rounded-sm bg-black/10"
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04 }} />
        ))}
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section className="border-b border-gray-100 bg-white section-py">
      <div className="site-container">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <span className="section-tag">Platform</span>
          <h2 className="section-h2">One platform for all<br />your voice agents</h2>
          <p className="section-body">
            Emaavy orchestrates LLM, speech, telephony, and integrations in one workspace — so you can build, test, and ship in hours, not months.
          </p>
        </div>

        {/* Two feature cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Card 1 */}
          <div className="light-card">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
              <HiOutlineCpuChip className="h-5 w-5 text-gray-700" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">Build, test, and deploy in minutes</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Configure voice, flow, telephony, and integrations from a single dashboard. We handle the infra — you own the experience.
            </p>
            <BuildMiniUI />
          </div>

          {/* Card 2 */}
          <div className="light-card">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
              <HiOutlineChartBarSquare className="h-5 w-5 text-gray-700" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">Ship better agents. Faster. Every time.</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Track performance across every call, surface issues before they compound, and iterate with full conversation history.
            </p>
            <MonitorMiniUI />
          </div>
        </div>
      </div>
    </section>
  );
}
