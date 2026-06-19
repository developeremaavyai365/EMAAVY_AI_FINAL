'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineCircleStack,
  HiOutlineChatBubbleLeftRight,
  HiOutlineEnvelope,
  HiOutlineDevicePhoneMobile,
  HiOutlineShoppingBag,
  HiOutlineCreditCard,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
  HiOutlineBuildingOffice,
  HiOutlineChartBar,
  HiOutlineGlobeAlt,
  HiOutlineBolt,
} from 'react-icons/hi2';
import { AnimatedContent, SpotlightCard } from '@/components/reactbits';
import SectionHeader from '@/components/ui/SectionHeader';
import Image from 'next/image';

type Integration = {
  name: string;
  color: string;
  bg: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const INNER: Integration[] = [
  { name: 'Salesforce', color: 'text-blue-600', bg: 'bg-blue-50', Icon: HiOutlineBuildingOffice },
  { name: 'HubSpot', color: 'text-orange-500', bg: 'bg-orange-50', Icon: HiOutlineChartBar },
  { name: 'Slack', color: 'text-purple-600', bg: 'bg-purple-50', Icon: HiOutlineChatBubbleLeftRight },
  { name: 'Gmail', color: 'text-red-500', bg: 'bg-red-50', Icon: HiOutlineEnvelope },
  { name: 'WhatsApp', color: 'text-emerald-600', bg: 'bg-emerald-50', Icon: HiOutlineDevicePhoneMobile },
  { name: 'Shopify', color: 'text-green-700', bg: 'bg-green-50', Icon: HiOutlineShoppingBag },
];

const OUTER: Integration[] = [
  { name: 'Stripe', color: 'text-indigo-600', bg: 'bg-indigo-50', Icon: HiOutlineCreditCard },
  { name: 'Notion', color: 'text-neutral-700', bg: 'bg-neutral-100', Icon: HiOutlineDocumentText },
  { name: 'Zoom', color: 'text-blue-500', bg: 'bg-blue-50', Icon: HiOutlineGlobeAlt },
  { name: 'Pipedrive', color: 'text-amber-600', bg: 'bg-amber-50', Icon: HiOutlineUserGroup },
  { name: 'Zapier', color: 'text-orange-600', bg: 'bg-orange-50', Icon: HiOutlineBolt },
  { name: 'Airtable', color: 'text-teal-600', bg: 'bg-teal-50', Icon: HiOutlineCircleStack },
  { name: 'Intercom', color: 'text-cyan-600', bg: 'bg-cyan-50', Icon: HiOutlineChatBubbleLeftRight },
  { name: 'Twilio', color: 'text-red-600', bg: 'bg-red-50', Icon: HiOutlineDevicePhoneMobile },
];

function OrbitRing({
  items,
  radius,
  duration,
  reverse = false,
}: {
  items: Integration[];
  radius: number;
  duration: number;
  reverse?: boolean;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {items.map((item, i) => {
        const angle = (i / items.length) * 2 * Math.PI - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const Icon = item.Icon;

        return (
          <motion.div
            key={item.name}
            className="absolute left-1/2 top-1/2"
            style={{ x: x - 36, y: y - 36 }}
            animate={{ rotate: reverse ? 360 : -360 }}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
          >
            <motion.div
              className={`group relative flex h-[72px] w-[72px] flex-col items-center justify-center rounded-2xl border border-white/80 ${item.bg} cursor-pointer shadow-sm transition-all duration-300`}
              whileHover={{ scale: 1.15 }}
              onHoverStart={() => setHovered(item.name)}
              onHoverEnd={() => setHovered(null)}
            >
              <Icon className={`h-5 w-5 ${item.color}`} />
              <span className={`mt-1 text-[9px] font-semibold ${item.color}`}>{item.name}</span>
              {hovered === item.name && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.9 }}
                  animate={{ opacity: 1, y: -4, scale: 1 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-emaavy-deep px-2 py-1 text-[10px] font-medium text-white shadow-lg z-20"
                >
                  {item.name}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default function IntegrationsOrbit() {
  const orbitSize = 520;
  const innerRadius = 130;
  const outerRadius = 215;

  return (
    <section id="integrations" className="section-padding bg-emaavy-surface overflow-hidden">
      <div className="section-container">
        <AnimatedContent>
          <SectionHeader
            label="Integrations"
            title="Connect Your Entire Tech Stack"
            subtitle="100+ native integrations with the tools your team already uses. Sync data in real time, no code required."
          />
        </AnimatedContent>

        <AnimatedContent className="mt-16 flex justify-center">
          <div
            className="relative flex items-center justify-center"
            style={{ width: orbitSize, height: orbitSize, maxWidth: '100%' }}
          >
            {/* Orbit ring lines */}
            <div
              className="pointer-events-none absolute rounded-full border border-dashed border-emaavy-bolt/15"
              style={{ width: innerRadius * 2 + 72, height: innerRadius * 2 + 72 }}
            />
            <div
              className="pointer-events-none absolute rounded-full border border-dashed border-emaavy-bolt/10"
              style={{ width: outerRadius * 2 + 72, height: outerRadius * 2 + 72 }}
            />

            {/* Center */}
            <motion.div
              className="relative z-20 flex h-24 w-24 flex-col items-center justify-center rounded-2xl bg-brand-gradient shadow-brand-lg"
              animate={{
                boxShadow: [
                  '0 0 24px rgba(74,101,139,0.2)',
                  '0 0 48px rgba(74,101,139,0.35)',
                  '0 0 24px rgba(74,101,139,0.2)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Image
                src="/brand/emaavy-logo.svg"
                alt="Emaavy"
                width={72}
                height={20}
                className="brightness-0 invert"
              />
            </motion.div>

            {/* Inner orbit */}
            <OrbitRing items={INNER} radius={innerRadius} duration={50} />

            {/* Outer orbit (reverse) */}
            <OrbitRing items={OUTER} radius={outerRadius} duration={80} reverse />
          </div>
        </AnimatedContent>

        {/* Tag cloud below */}
        <AnimatedContent className="mt-12" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3">
            {[...INNER, ...OUTER].map((app) => {
              const Icon = app.Icon;
              return (
                <motion.span
                  key={app.name}
                  whileHover={{ scale: 1.05 }}
                  className={`inline-flex items-center gap-2 rounded-full border border-emaavy-border bg-white px-4 py-2 text-xs font-semibold text-emaavy-secondary shadow-sm transition-shadow hover:shadow-brand cursor-default`}
                >
                  <Icon className={`h-3.5 w-3.5 ${app.color}`} />
                  {app.name}
                </motion.span>
              );
            })}
            <span className="inline-flex items-center rounded-full border border-dashed border-emaavy-bolt/40 bg-emaavy-accent px-4 py-2 text-xs font-semibold text-emaavy-bolt">
              + 86 more
            </span>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
