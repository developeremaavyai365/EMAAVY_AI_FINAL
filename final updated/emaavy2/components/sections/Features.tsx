'use client';

import {
  HiOutlineCpuChip,
  HiOutlineArrowPath,
  HiOutlineLink,
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { AnimatedContent, SpotlightCard } from '@/components/reactbits';
import SectionHeader from '@/components/ui/SectionHeader';
import { FEATURES } from '@/lib/constants';

const ICONS: Record<string, React.ReactNode> = {
  agent: <HiOutlineCpuChip className="h-6 w-6" />,
  workflow: <HiOutlineArrowPath className="h-6 w-6" />,
  integration: <HiOutlineLink className="h-6 w-6" />,
  support: <HiOutlineChatBubbleLeftRight className="h-6 w-6" />,
  lead: <HiOutlineUserGroup className="h-6 w-6" />,
  analytics: <HiOutlineChartBar className="h-6 w-6" />,
};

export default function Features() {
  return (
    <section id="features" className="section-padding">
      <div className="section-container">
        <AnimatedContent>
          <SectionHeader
            label="Platform"
            title="What Emaavy Does"
            subtitle="Everything you need to automate operations, deploy AI, and connect your business — in one platform."
          />
        </AnimatedContent>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <AnimatedContent key={feature.title} delay={i * 0.08}>
              <SpotlightCard className="glass-card group h-full rounded-2xl p-6 transition-all duration-300 hover:border-emaavy-bolt/30 hover:shadow-brand">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emaavy-accent text-emaavy-bolt transition-colors group-hover:bg-brand-gradient group-hover:text-white">
                  {ICONS[feature.icon]}
                </div>
                <h3 className="text-lg font-semibold text-emaavy-deep">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-emaavy-secondary">
                  {feature.description}
                </p>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
