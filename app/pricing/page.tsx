'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

/* ─── Plans ──────────────────────────────────────────────────────────────── */
const PLANS = [
  {
    name: 'Free',
    price: { monthly: 0, annual: 0, annualTotal: 0 },
    tagline: 'Try Emaavy with no commitment. No credit card needed.',
    highlight: false,
    badge: 'No card needed',
    features: [
      '1 active AI agent',
      '1 phone number included',
      'ElevenLabs voice included',
      'Multi-language support',
    ],
    cta: 'Start for free',
    href: '/signup',
    color: '#10b981',
  },
  {
    name: 'Starter',
    price: { monthly: 2499, annual: 2249, annualTotal: 26989 },
    tagline: 'For teams launching their first AI agent.',
    highlight: false,
    badge: null,
    features: [
      'Everything in Free',
      '3 active AI agents',
      '3 campaigns',
      '60 minutes included',
      'Webhooks + Google Calendar',
      'ElevenLabs voice',
      'Multi-language support',
      'Basic call analytics dashboard',
      'Email & chat support',
    ],
    cta: 'Get started',
    href: '/book-demo',
    color: '#3b82f6',
  },
  {
    name: 'Growth',
    price: { monthly: 9999, annual: 8999, annualTotal: 107989 },
    tagline: 'For scaling teams running agents at volume.',
    highlight: true,
    badge: 'Most popular',
    features: [
      'Everything in Starter',
      'Unlimited active agents',
      'Webhooks, WhatsApp & Calendar',
      'ElevenLabs premium voice',
      'Advanced analytics & reporting',
      'Priority support',
      'Dedicated onboarding session',
      'Custom call scripts',
      'Custom flows & logic',
    ],
    cta: 'Get started',
    href: '/book-demo',
    color: '#6366f1',
  },
  {
    name: 'Enterprise',
    price: { monthly: null, annual: null, annualTotal: null },
    tagline: 'For organisations running mission-critical AI operations.',
    highlight: false,
    badge: null,
    features: [
      'Everything in Growth',
      'Unlimited calls',
      'Custom agent development',
      'Dedicated infrastructure',
      'Custom data residency',
      'SLA up to 99.99% uptime',
      '24/7 dedicated support',
      'Dedicated account manager',
      'Quarterly executive reviews',
      'Custom SLA & contract terms',
    ],
    cta: 'Talk to sales',
    href: '/book-demo',
    color: '#10b981',
  },
] as const;


/* ─── FAQs ───────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What counts as a call?',
    a: 'A call is any outbound or inbound conversation handled end-to-end by an Emaavy AI agent — from answer to outcome logging. Calls that fail to connect (no answer, busy signal) are not counted against your monthly limit.',
  },
  {
    q: 'Can I upgrade or downgrade at any time?',
    a: 'Yes. You can upgrade immediately and the new plan takes effect right away. Downgrades take effect at the start of your next billing cycle. No penalties, no lock-in.',
  },
  {
    q: 'How do I get started?',
    a: 'Book a live demo with our team. We\'ll walk you through the platform, configure an agent for your use case, and get you set up — typically within the same day.',
  },
  {
    q: 'How does annual billing work?',
    a: 'Annual plans are billed upfront and save you 10% compared to monthly billing. You can switch from monthly to annual at any time from your account settings or by contacting support.',
  },
  {
    q: 'What CRMs and tools does Emaavy integrate with?',
    a: 'Growth and Enterprise plans include native integrations with HubSpot, Salesforce, Pipedrive, Google Calendar, Calendly, Twilio, Slack, Zendesk, and more. Starter includes one integration of your choice. Custom integrations are available on Enterprise.',
  },
  {
    q: 'What voice technology do you use?',
    a: 'Starter plans use Deepgram for speech-to-text and a standard TTS provider. Growth and Enterprise plans unlock ElevenLabs premium voices — indistinguishable from a trained human rep, with natural cadence and interruption handling.',
  },
  {
    q: 'How is billing handled if I go over my call limit?',
    a: 'If you exceed your monthly call limit, additional calls are billed at $0.08 per call on Starter and Growth. You can also pre-purchase call packs at a discounted rate. We\'ll alert you at 80% and 100% of your limit so there are no surprises.',
  },
  {
    q: 'Is Emaavy HIPAA and SOC 2 compliant?',
    a: 'SOC 2 Type II compliance applies to all plans. HIPAA BAA agreements are available on Enterprise plans. GDPR controls, DNC list enforcement, and call recording consent flows are built into every plan.',
  },
  {
    q: 'What kind of support is included?',
    a: 'Starter includes email and community support. Growth adds priority support with a 4-hour response SLA and a dedicated onboarding session. Enterprise includes 24/7 dedicated support, a named account manager, and quarterly executive reviews.',
  },
  {
    q: 'Can I get a custom agent built for my workflow?',
    a: 'Yes. Enterprise includes custom agent development by the Emaavy engineering team. On Starter and Growth, you can build and deploy agents yourself using our no-code builder and script editor — most teams are live within 20 minutes.',
  },
];

/* ─── FAQ item ───────────────────────────────────────────────────────────── */
function FaqItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.35, delay: idx * 0.04 }}
      className="border-b" style={{ borderColor: '#ffffff08' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between gap-6 py-5 text-left transition-colors"
      >
        <span className="text-[14px] font-medium leading-snug" style={{ color: open ? '#ffffff' : '#a1a1aa' }}>{q}</span>
        <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center transition-all"
          style={{ background: open ? '#ffffff10' : '#ffffff08', color: open ? '#fff' : '#52525b' }}>
          <svg className="w-3 h-3 transition-transform" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden">
            <p className="pb-5 text-[13.5px] leading-relaxed" style={{ color: '#71717a' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Check icon ─────────────────────────────────────────────────────────── */
function Check({ color }: { color: string }) {
  return (
    <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <Navbar />
      <main style={{ background: '#06070a' }}>

        {/* ── Hero ── */}
        <section className="relative overflow-hidden pt-28 md:pt-36 pb-14 md:pb-20 px-4 md:px-6">
          <div className="absolute inset-0 pointer-events-none">
            <motion.div className="absolute rounded-full"
              style={{ width: 700, height: 700, top: '-250px', left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)', filter: 'blur(70px)' }}
              animate={{ scale: [1, 1.07, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] mb-7"
                style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8' }}>
                Pricing
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.05 }}
              className="text-[34px] sm:text-[48px] md:text-[64px] font-extrabold text-white leading-[1.05] mb-5"
              style={{ letterSpacing: '-0.04em' }}>
              Straightforward pricing.<br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)' }}>
                No surprises.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
              className="text-[16px] leading-relaxed mb-10" style={{ color: '#71717a' }}>
              Transparent pricing. No hidden fees, no lock-ins, no surprises.
            </motion.p>

            {/* Billing toggle */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }}
              className="inline-flex items-center gap-3 p-1 rounded-xl"
              style={{ background: '#0d0e13', border: '1px solid #ffffff0a' }}>
              <button onClick={() => setAnnual(false)}
                className="px-5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200"
                style={{ background: !annual ? '#ffffff12' : 'transparent', color: !annual ? '#fff' : '#52525b' }}>
                Monthly
              </button>
              <button onClick={() => setAnnual(true)}
                className="px-5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 flex items-center gap-2"
                style={{ background: annual ? '#ffffff12' : 'transparent', color: annual ? '#fff' : '#52525b' }}>
                Annual
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.25)' }}>
                  Save 10%
                </span>
              </button>
            </motion.div>
          </div>
        </section>

        {/* ── Pricing cards ── */}
        <section className="pb-16 md:pb-20 lg:pb-28 px-4 md:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
            {PLANS.map((plan, i) => (
              <motion.div key={plan.name}
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                className="relative rounded-2xl overflow-hidden flex flex-col group cursor-default"
                style={{
                  background: plan.highlight ? 'linear-gradient(160deg, #13143a 0%, #0f1030 100%)' : '#0d0e13',
                  border: `1px solid ${plan.highlight ? '#6366f130' : '#ffffff08'}`,
                  boxShadow: plan.highlight ? '0 0 60px rgba(99,102,241,0.15)' : 'none',
                }}>

                {/* Animated rotating border glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: `conic-gradient(from 0deg, transparent 60%, ${plan.color}40 75%, transparent 90%)`,
                    opacity: 0,
                  }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: plan.highlight ? 4 : 7, repeat: Infinity, ease: 'linear' }}
                  whileHover={{ opacity: 1 }}
                />

                {/* Inner ambient glow that pulses */}
                <motion.div
                  className="absolute pointer-events-none rounded-full"
                  style={{
                    width: 280, height: 280,
                    top: -80, left: '50%', transform: 'translateX(-50%)',
                    background: `radial-gradient(circle, ${plan.color}22 0%, transparent 70%)`,
                    filter: 'blur(40px)',
                  }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Top shimmer line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${plan.color}, transparent)` }}
                  animate={{ opacity: plan.highlight ? [0.6, 1, 0.6] : [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Badge */}
                {plan.badge && (
                  <motion.div
                    className="absolute top-5 right-5"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ background: `${plan.color}22`, color: plan.color, border: `1px solid ${plan.color}40` }}>
                      {plan.badge}
                    </span>
                  </motion.div>
                )}

                <div className="relative z-10 p-5 md:p-8 flex flex-col flex-1">
                  {/* Plan name + tagline */}
                  <div className="mb-7">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: plan.color }}>
                      {plan.name}
                    </p>
                    <p className="text-[13px] leading-snug" style={{ color: '#52525b' }}>{plan.tagline}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 pb-8" style={{ borderBottom: '1px solid #ffffff06' }}>
                    {plan.price.monthly === 0 ? (
                      <>
                        <span className="text-[42px] sm:text-[48px] font-extrabold text-white font-mono leading-none"
                          style={{ letterSpacing: '-0.04em' }}>
                          Free
                        </span>
                        <p className="text-[11px] mt-2" style={{ color: '#52525b' }}>Forever free. No credit card required.</p>
                      </>
                    ) : plan.price.monthly !== null ? (
                      <div className="flex items-end gap-2">
                        <AnimatePresence mode="wait">
                          <motion.span key={annual ? 'a' : 'm'}
                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="text-[38px] sm:text-[48px] font-extrabold text-white font-mono leading-none"
                            style={{ letterSpacing: '-0.04em' }}>
                            ₹{(annual ? plan.price.annualTotal! : plan.price.monthly!).toLocaleString('en-IN')}
                          </motion.span>
                        </AnimatePresence>
                        <span className="text-[13px] mb-2" style={{ color: '#52525b' }}>
                          {annual ? '/ year' : '/ month'}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[42px] font-extrabold text-white font-mono leading-none"
                        style={{ letterSpacing: '-0.04em' }}>
                        Custom
                      </span>
                    )}
                    {annual && plan.price.monthly && plan.price.monthly > 0 && (
                      <p className="text-[11px] mt-2" style={{ color: '#52525b' }}>
                        ₹{plan.price.monthly.toLocaleString('en-IN')}/mo billed annually &mdash;{' '}
                        <span style={{ color: '#34d399' }}>save ₹{(plan.price.monthly * 12 - plan.price.annualTotal!).toLocaleString('en-IN')}</span>
                      </p>
                    )}
                    {!annual && plan.price.monthly && plan.price.monthly > 0 && (
                      <p className="text-[11px] mt-2" style={{ color: '#52525b' }}>
                        Billed monthly &mdash; switch to annual to save 10%
                      </p>
                    )}
                    {plan.price.monthly === null && (
                      <p className="text-[12px] mt-2" style={{ color: '#52525b' }}>Scoped to your exact requirements.</p>
                    )}
                  </div>

                  {/* CTA button — animated shimmer on hover */}
                  <Link href={plan.href}
                    className="relative w-full py-3.5 rounded-xl text-[14px] font-semibold text-center mb-8 block overflow-hidden transition-all"
                    style={{
                      background: plan.highlight ? `linear-gradient(135deg, ${plan.color}, #4f46e5)` : '#ffffff0d',
                      color: plan.highlight ? '#fff' : '#d4d4d8',
                      border: plan.highlight ? 'none' : `1px solid #ffffff14`,
                      boxShadow: plan.highlight ? `0 4px 20px ${plan.color}50` : 'none',
                    }}>
                    <motion.span
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.12) 50%, transparent 65%)' }}
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
                    />
                    <span className="relative z-10">{plan.cta} &rarr;</span>
                  </Link>

                  {/* Features */}
                  <div className="space-y-3 flex-1">
                    {plan.features.map((f, fi) => (
                      <motion.div key={fi} className="flex items-start gap-2.5"
                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.08 + fi * 0.04 }}>
                        <Check color={plan.color} />
                        <span className="text-[13px] leading-snug" style={{ color: '#71717a' }}>{f}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Comparison note ── */}
        <section className="py-4 px-4 md:px-6 border-t" style={{ borderColor: '#ffffff06', background: '#08090d' }}>
          <div className="max-w-4xl mx-auto py-10 md:py-14">
            <div className="rounded-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
              style={{ background: '#0d0e13', border: '1px solid #ffffff08' }}>
              {[
                { val: '20 min', label: 'Time to first live call', sub: 'Fastest in the industry' },
                { val: '99.97%', label: 'Platform uptime SLA', sub: 'Across all paid plans' },
                { val: '<500ms', label: 'End-to-end latency', sub: 'From caller speaks to agent replies' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-[38px] font-extrabold text-white font-mono mb-1" style={{ letterSpacing: '-0.04em' }}>{s.val}</p>
                  <p className="text-[13px] font-medium text-white mb-1">{s.label}</p>
                  <p className="text-[11px]" style={{ color: '#3f3f46' }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-14 md:py-20 px-4 md:px-6 border-t" style={{ borderColor: '#ffffff06', background: '#08090d' }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3" style={{ color: '#52525b' }}>FAQ</p>
              <h2 className="text-[32px] md:text-[40px] font-bold text-white" style={{ letterSpacing: '-0.03em' }}>
                Questions, answered.
              </h2>
            </div>
            <div>
              {FAQS.map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} idx={i} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-[13px] mb-5" style={{ color: '#52525b' }}>
                Still have questions? Our team replies within a few hours.
              </p>
              <Link href="/book-demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 4px 20px rgba(99,102,241,0.25)' }}>
                Talk to our team &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 md:py-20 lg:py-24 px-4 md:px-6 border-t relative overflow-hidden" style={{ borderColor: '#ffffff06', background: '#06070a' }}>
          <div className="absolute inset-0 pointer-events-none">
            <motion.div className="absolute rounded-full"
              style={{ width: 500, height: 500, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }}
              animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <div className="relative z-10 max-w-xl mx-auto text-center">
            <h2 className="text-[36px] md:text-[46px] font-extrabold text-white mb-4" style={{ letterSpacing: '-0.035em' }}>
              Ready to deploy<br />your first agent?
            </h2>
            <p className="text-[14px] mb-8" style={{ color: '#52525b' }}>
              Book a 30-minute live demo. A real agent, built for your workflow — before the call ends.
            </p>
            <Link href="/book-demo"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-[15px] font-semibold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 4px 24px rgba(99,102,241,0.35)' }}>
              Book a live demo &rarr;
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
