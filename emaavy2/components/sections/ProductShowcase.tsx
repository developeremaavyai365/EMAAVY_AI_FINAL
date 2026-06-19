'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineCpuChip,
  HiOutlineLink,
  HiOutlineArrowPath,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { AnimatedContent, SpotlightCard } from '@/components/reactbits';
import SectionHeader from '@/components/ui/SectionHeader';
import { PRODUCT_TABS } from '@/lib/constants';

const TAB_ICONS = [HiOutlineCpuChip, HiOutlineLink, HiOutlineArrowPath, HiOutlineChartBar];

function AgentsMockup() {
  const agents = [
    { name: 'Support Agent', status: 'active', tasks: 142, color: 'bg-emerald-500' },
    { name: 'Sales Agent', status: 'active', tasks: 87, color: 'bg-blue-500' },
    { name: 'Marketing Agent', status: 'idle', tasks: 34, color: 'bg-amber-500' },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-emaavy-muted">Active Agents</span>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">3 Running</span>
      </div>
      {agents.map((a, i) => (
        <motion.div
          key={a.name}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3 rounded-xl border border-emaavy-border bg-white p-3"
        >
          <div className={`h-8 w-8 rounded-lg ${a.color} flex items-center justify-center`}>
            <HiOutlineCpuChip className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-emaavy-deep">{a.name}</p>
            <p className="text-[10px] text-emaavy-muted">{a.tasks} tasks completed</p>
          </div>
          <div className="flex items-center gap-1">
            <span className={`h-1.5 w-1.5 rounded-full ${a.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-emaavy-border'}`} />
            <span className="text-[10px] font-medium capitalize text-emaavy-muted">{a.status}</span>
          </div>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-2 rounded-xl border border-emaavy-bolt/20 bg-emaavy-accent p-3"
      >
        <div className="h-2 w-2 animate-pulse rounded-full bg-emaavy-bolt" />
        <span className="text-xs text-emaavy-bolt font-medium">Processing 12 incoming requests…</span>
      </motion.div>
    </div>
  );
}

function IntegrationsMockup() {
  const apps = [
    { name: 'Salesforce', synced: '2m ago', color: 'bg-blue-500' },
    { name: 'Slack', synced: 'live', color: 'bg-purple-500' },
    { name: 'HubSpot', synced: '5m ago', color: 'bg-orange-500' },
    { name: 'Gmail', synced: 'live', color: 'bg-red-500' },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-emaavy-muted">Connected Apps</span>
        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">28 Active</span>
      </div>
      {apps.map((a, i) => (
        <motion.div
          key={a.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3 rounded-xl border border-emaavy-border bg-white p-3"
        >
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${a.color}`}>
            <span className="text-xs font-bold text-white">{a.name[0]}</span>
          </div>
          <span className="flex-1 text-xs font-semibold text-emaavy-deep">{a.name}</span>
          <div className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${a.synced === 'live' ? 'bg-emerald-500 animate-pulse' : 'bg-emaavy-border'}`} />
            <span className="text-[10px] text-emaavy-muted">{a.synced}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function WorkflowsMockup() {
  const steps = [
    { label: 'Trigger: Form Submit', done: true },
    { label: 'Condition: Lead Score > 80', done: true },
    { label: 'Action: Create CRM Contact', done: true },
    { label: 'Action: Send Slack Alert', done: false },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-emaavy-muted">Workflow Builder</span>
        <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700">Running</span>
      </div>
      {steps.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12 }}
          className="flex items-center gap-3"
        >
          <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${s.done ? 'bg-emaavy-bolt text-white' : 'border-2 border-emaavy-border bg-white text-emaavy-muted'}`}>
            {s.done ? '✓' : i + 1}
          </div>
          {i < steps.length - 1 && (
            <div className="absolute ml-3 mt-6 h-3 w-px bg-emaavy-border" />
          )}
          <span className={`text-xs font-medium ${s.done ? 'text-emaavy-deep' : 'text-emaavy-muted'}`}>{s.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

function AnalyticsMockup() {
  const bars = [65, 80, 55, 90, 70, 85, 75];
  const stats = [
    { label: 'Automations', value: '12,847' },
    { label: 'Time saved', value: '340h' },
    { label: 'ROI', value: '8.4×' },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-emaavy-muted">Performance</span>
        <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">+24% this week</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-emaavy-border bg-white p-3 text-center"
          >
            <p className="text-[10px] font-medium text-emaavy-muted">{s.label}</p>
            <p className="mt-0.5 text-base font-bold text-emaavy-deep">{s.value}</p>
          </motion.div>
        ))}
      </div>
      <div className="rounded-xl border border-emaavy-border bg-white p-3">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-emaavy-muted">Daily automations</p>
        <div className="flex h-20 items-end gap-1.5">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-emaavy-bolt to-emaavy-bolt/40"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.5 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const MOCKUPS = [AgentsMockup, IntegrationsMockup, WorkflowsMockup, AnalyticsMockup];

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = PRODUCT_TABS[activeTab];
  const Mockup = MOCKUPS[activeTab];
  const Icon = TAB_ICONS[activeTab];

  return (
    <section className="section-padding bg-emaavy-surface">
      <div className="section-container">
        <AnimatedContent>
          <SectionHeader
            label="Product"
            title="See Emaavy in Action"
            subtitle="Explore the platform capabilities that power modern business automation."
          />
        </AnimatedContent>

        <div className="mt-12">
          {/* Tab bar */}
          <div className="flex flex-wrap justify-center gap-2">
            {PRODUCT_TABS.map((t, i) => {
              const TabIcon = TAB_ICONS[i];
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(i)}
                  className={`relative flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    activeTab === i
                      ? 'text-white'
                      : 'text-emaavy-secondary hover:bg-white hover:text-emaavy-deep'
                  }`}
                >
                  {activeTab === i && (
                    <motion.span
                      layoutId="product-tab"
                      className="absolute inset-0 rounded-xl bg-brand-gradient"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <TabIcon className="relative z-10 h-4 w-4" />
                  <span className="relative z-10">{t.label}</span>
                </button>
              );
            })}
          </div>

          <AnimatedContent className="mt-10">
            <SpotlightCard className="glass-card overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="grid gap-0 lg:grid-cols-2"
                >
                  {/* Left: explanation */}
                  <div className="flex flex-col justify-center p-8 md:p-10">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-semibold text-emaavy-deep">{tab.title}</h3>
                    <p className="mt-3 leading-relaxed text-emaavy-secondary">{tab.description}</p>
                    <ul className="mt-6 space-y-2.5">
                      {tab.metrics.map((metric) => (
                        <li key={metric} className="flex items-center gap-2.5 text-sm font-medium text-emaavy-deep">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emaavy-bolt/10 text-emaavy-bolt">
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 12 12">
                              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: interactive mockup */}
                  <div className="border-t border-emaavy-border bg-emaavy-surface p-6 lg:border-l lg:border-t-0">
                    <div className="mb-3 flex items-center gap-2 rounded-lg border border-emaavy-border bg-white px-3 py-2">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 rounded-full bg-red-400/80" />
                        <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                        <span className="h-2 w-2 rounded-full bg-green-400/80" />
                      </div>
                      <span className="text-[10px] text-emaavy-muted">app.emaavy.com/{tab.id}</span>
                    </div>
                    <Mockup />
                  </div>
                </motion.div>
              </AnimatePresence>
            </SpotlightCard>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
