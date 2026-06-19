'use client';

/* Case studies — full-width dark sections — exact Vapi style (Kavak/GoHealth/Instawork) */

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight } from 'react-icons/hi2';

const CASES = [
  {
    company: 'UrbanCart',
    industry: 'E-commerce',
    useCases: ['Inbound Support', 'Order Tracking'],
    metric: '$4.2M+ saved annually',
    sub: 'over 800K support calls per year',
    quote: 'We reached our customer satisfaction goals faster than any prior initiative. We&apos;re now handling twice the volume with the same team, and customers can&apos;t tell the difference.',
    author: 'Priya Sharma',
    role: 'VP of Customer Operations',
    bg: 'linear-gradient(135deg, #0a0f1e 0%, #111827 100%)',
    accent: '#60a5fa',
  },
  {
    company: 'FinEdge',
    industry: 'Fintech',
    useCases: ['Lead Qualification', 'Outbound Sales'],
    metric: '$10M+ in qualified pipeline',
    sub: 'generated over 1.2M outbound calls',
    quote: 'Our sales team only talks to warm, qualified prospects now. Emaavy handles the first conversation — scoring intent and booking the demo — automatically.',
    author: 'Arjun Mehta',
    role: 'Head of Growth',
    bg: 'linear-gradient(135deg, #0f1a0f 0%, #1a2a1a 100%)',
    accent: '#4ade80',
  },
  {
    company: 'MediBook',
    industry: 'Healthcare',
    useCases: ['Appointment Scheduling', 'Patient Intake'],
    metric: '1M+ appointments booked',
    sub: 'across 12 hospital networks',
    quote: 'Patients call, the agent checks availability, confirms insurance, and books the slot — all in under 90 seconds. 24/7. No hold music, no dropped calls.',
    author: 'Dr. Sanjay Rao',
    role: 'Chief Digital Officer',
    bg: 'linear-gradient(135deg, #1a0f1a 0%, #2a1a2a 100%)',
    accent: '#c084fc',
  },
];

export default function Testimonials() {
  return (
    <div>
      {CASES.map((cs, i) => (
        <section key={cs.company} className="section-py" style={{ background: cs.bg }}>
          <div className="site-container">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Company + use case tags */}
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span className="text-sm font-bold" style={{ color: cs.accent }}>{cs.company}</span>
                <span className="text-white/30">·</span>
                <span className="text-sm text-white/40">{cs.industry}</span>
                {cs.useCases.map((uc) => (
                  <span key={uc} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/40">
                    {uc}
                  </span>
                ))}
              </div>

              {/* Big metric */}
              <div className="mb-8">
                <p className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                  {cs.metric}
                </p>
                <p className="mt-2 text-lg text-white/40">{cs.sub}</p>
              </div>

              {/* Quote */}
              <blockquote className="max-w-3xl text-xl leading-relaxed text-white/70 sm:text-2xl">
                &ldquo;{cs.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="mt-8 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full" style={{ background: `${cs.accent}33` }} />
                <div>
                  <p className="text-sm font-semibold text-white">{cs.author}</p>
                  <p className="text-sm text-white/40">{cs.role}</p>
                </div>
                <Link href="/testimonials"
                  className="ml-auto hidden items-center gap-2 text-sm font-semibold sm:flex" style={{ color: cs.accent }}>
                  Read case study <HiOutlineArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  );
}
