'use client';

import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineCurrencyDollar,
  HiOutlineMegaphone,
  HiOutlineCog6Tooth,
  HiOutlineUsers,
} from 'react-icons/hi2';
import { motion } from 'framer-motion';
import { AnimatedContent, GlareHover } from '@/components/reactbits';
import SectionHeader from '@/components/ui/SectionHeader';
import { AI_AGENTS } from '@/lib/constants';

const AGENT_CONFIG = {
  support: {
    Icon: HiOutlineChatBubbleLeftRight,
    color: 'from-blue-500/20 to-blue-600/5',
    iconColor: 'text-blue-600',
    badge: 'Customer-facing',
  },
  sales: {
    Icon: HiOutlineCurrencyDollar,
    color: 'from-emerald-500/20 to-emerald-600/5',
    iconColor: 'text-emerald-600',
    badge: 'Revenue',
  },
  marketing: {
    Icon: HiOutlineMegaphone,
    color: 'from-violet-500/20 to-violet-600/5',
    iconColor: 'text-violet-600',
    badge: 'Growth',
  },
  operations: {
    Icon: HiOutlineCog6Tooth,
    color: 'from-amber-500/20 to-amber-600/5',
    iconColor: 'text-amber-600',
    badge: 'Internal',
  },
  hr: {
    Icon: HiOutlineUsers,
    color: 'from-rose-500/20 to-rose-600/5',
    iconColor: 'text-rose-600',
    badge: 'People',
  },
} as const;

export default function AIAgents() {
  return (
    <section id="ai-agents" className="section-padding bg-emaavy-surface">
      <div className="section-container">
        <AnimatedContent>
          <SectionHeader
            label="AI Agents"
            title="Specialized Agents for Every Team"
            subtitle="Deploy intelligent agents tailored to support, sales, marketing, operations, and HR — each one trained for its specific role."
          />
        </AnimatedContent>

        {/* First row: 4 cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AI_AGENTS.slice(0, 4).map((agent, i) => {
            const config = AGENT_CONFIG[agent.icon as keyof typeof AGENT_CONFIG];
            const { Icon } = config;
            return (
              <AnimatedContent key={agent.title} delay={i * 0.08}>
                <GlareHover
                  className="h-full rounded-2xl border border-emaavy-border bg-white p-6 transition-all duration-300 hover:border-emaavy-bolt/30 hover:shadow-brand"
                  glareColor="#4a658b"
                  glareOpacity={0.12}
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${config.color}`}>
                    <Icon className={`h-6 w-6 ${config.iconColor}`} />
                  </div>
                  <div className="mb-3 flex items-center gap-2">
                    <h3 className="text-base font-semibold text-emaavy-deep">{agent.title}</h3>
                  </div>
                  <span className={`mb-3 inline-block rounded-full bg-gradient-to-br ${config.color} px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${config.iconColor}`}>
                    {config.badge}
                  </span>
                  <p className="text-sm leading-relaxed text-emaavy-secondary">{agent.description}</p>

                  <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-emaavy-bolt">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emaavy-bolt" />
                    Always on
                  </div>
                </GlareHover>
              </AnimatedContent>
            );
          })}
        </div>

        {/* Fifth card: centered */}
        {AI_AGENTS[4] && (() => {
          const agent = AI_AGENTS[4];
          const config = AGENT_CONFIG[agent.icon as keyof typeof AGENT_CONFIG];
          const { Icon } = config;
          return (
            <AnimatedContent delay={0.4} className="mt-6 flex justify-center">
              <GlareHover
                className="w-full max-w-sm rounded-2xl border border-emaavy-border bg-white p-6 transition-all duration-300 hover:border-emaavy-bolt/30 hover:shadow-brand sm:max-w-md"
                glareColor="#4a658b"
                glareOpacity={0.12}
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${config.color}`}>
                  <Icon className={`h-6 w-6 ${config.iconColor}`} />
                </div>
                <span className={`mb-3 inline-block rounded-full bg-gradient-to-br ${config.color} px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${config.iconColor}`}>
                  {config.badge}
                </span>
                <h3 className="text-base font-semibold text-emaavy-deep">{agent.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-emaavy-secondary">{agent.description}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-emaavy-bolt">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emaavy-bolt" />
                  Always on
                </div>
              </GlareHover>
            </AnimatedContent>
          );
        })()}
      </div>
    </section>
  );
}
