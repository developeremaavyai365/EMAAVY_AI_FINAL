'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TRUST_BADGES } from '@/lib/constants';
import { SpotlightCard } from '@/components/reactbits';

const SCENES = [
  { id: 'apps', label: 'Integrations' },
  { id: 'workflow', label: 'Workflows' },
  { id: 'agent', label: 'AI Agent' },
  { id: 'analytics', label: 'Analytics' },
] as const;

const APPS = ['Salesforce', 'HubSpot', 'Slack', 'Gmail'];

function AppsScene() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-emaavy-bolt">
        Connected Apps
      </p>
      <div className="grid grid-cols-2 gap-4">
        {APPS.map((app, i) => (
          <motion.div
            key={app}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            className="relative flex items-center justify-center rounded-xl border border-emaavy-border bg-white px-4 py-3 text-sm font-semibold text-emaavy-deep shadow-sm"
          >
            {app}
            {i < APPS.length - 1 && (
              <svg
                className="absolute -right-6 top-1/2 hidden h-8 w-8 -translate-y-1/2 text-emaavy-bolt sm:block"
                viewBox="0 0 40 20"
              >
                <motion.path
                  d="M0 10 H30 M25 5 L32 10 L25 15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, -16] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
              </svg>
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center gap-2 rounded-full bg-emaavy-accent px-4 py-2 text-xs font-medium text-emaavy-bolt"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
        All systems synced
      </motion.div>
    </div>
  );
}

function WorkflowScene() {
  const steps = ['Trigger', 'Action', 'AI Decision', 'Result'];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-emaavy-bolt">
        Workflow Builder
      </p>
      <div className="flex flex-col items-center gap-2">
        {steps.map((step, i) => (
          <div key={step} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="rounded-lg border border-emaavy-border bg-white px-5 py-2.5 text-sm font-medium text-emaavy-deep shadow-sm"
            >
              {step}
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.2 + 0.1 }}
                className="h-4 w-px bg-emaavy-bolt/40"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentScene() {
  const steps = [
    { label: 'Customer Query', icon: '?' },
    { label: 'AI Agent Thinking', icon: '◉' },
    { label: 'Response Generated', icon: '✓' },
  ];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-emaavy-bolt">
        AI Agent
      </p>
      {steps.map((step, i) => (
        <motion.div
          key={step.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.35 }}
          className="flex w-full max-w-[240px] items-center gap-3 rounded-xl border border-emaavy-border bg-white px-4 py-3 shadow-sm"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient text-xs font-bold text-white">
            {step.icon}
          </span>
          <span className="text-sm font-medium text-emaavy-deep">{step.label}</span>
          {i === 1 && (
            <motion.span
              className="ml-auto flex gap-1"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              {[0, 1, 2].map((d) => (
                <span key={d} className="h-1.5 w-1.5 rounded-full bg-emaavy-bolt" />
              ))}
            </motion.span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function AnalyticsScene() {
  const stats = [
    { label: 'Automation savings', value: '$42K' },
    { label: 'Tasks completed', value: '12,847' },
    { label: 'Response speed', value: '0.3s' },
    { label: 'Integrations active', value: '28' },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-4 p-6">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-emaavy-bolt">
        Analytics Dashboard
      </p>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.12 }}
            className="rounded-xl border border-emaavy-border bg-white p-3 shadow-sm"
          >
            <p className="text-[10px] font-medium uppercase tracking-wide text-emaavy-muted">
              {stat.label}
            </p>
            <motion.p
              className="mt-1 text-lg font-bold text-emaavy-deep"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.12 + 0.3 }}
            >
              {stat.value}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function HeroShowcase() {
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScene((prev) => (prev + 1) % SCENES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const sceneComponents = [AppsScene, WorkflowScene, AgentScene, AnalyticsScene];
  const ActiveComponent = sceneComponents[activeScene];

  return (
    <SpotlightCard className="glass-card h-full min-h-[420px] w-full overflow-hidden rounded-2xl lg:min-h-[480px]">
      <div className="absolute inset-x-0 top-0 z-10 flex gap-1 border-b border-emaavy-border bg-emaavy-surface/80 p-2 backdrop-blur-sm">
        {SCENES.map((scene, i) => (
          <button
            key={scene.id}
            type="button"
            onClick={() => setActiveScene(i)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              activeScene === i
                ? 'bg-white text-emaavy-deep shadow-sm'
                : 'text-emaavy-muted hover:text-emaavy-deep'
            }`}
          >
            {scene.label}
          </button>
        ))}
      </div>

      <div className="relative h-full pt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0 pt-12"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
        {SCENES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Scene ${i + 1}`}
            onClick={() => setActiveScene(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeScene === i ? 'w-6 bg-emaavy-bolt' : 'w-1.5 bg-emaavy-border'
            }`}
          />
        ))}
      </div>
    </SpotlightCard>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-emaavy-bolt/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-emaavy-deep/5 blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-emaavy-bolt/20 bg-emaavy-accent px-4 py-1.5"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emaavy-bolt" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-emaavy-bolt">
                AI-Powered Business Automation
              </span>
            </motion.div>
            <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-emaavy-deep sm:text-5xl lg:text-[3.25rem]">
              AI Agents, Integrations &amp;{' '}
              <span className="gradient-text">Workflow Automation</span>{' '}
              For Modern Businesses
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-emaavy-secondary">
              Connect your tools, automate repetitive work, deploy intelligent AI agents,
              and scale operations from a single platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="#pricing" className="btn-primary px-6 py-3 text-base">
                Start Free
              </Link>
              <Link href="#contact" className="btn-secondary px-6 py-3 text-base">
                Book Demo
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {TRUST_BADGES.map((badge, i) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="inline-flex items-center gap-2 rounded-full border border-emaavy-border bg-emaavy-surface px-4 py-1.5 text-xs font-semibold text-emaavy-bolt"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emaavy-bolt" />
                  {badge}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <HeroShowcase />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
