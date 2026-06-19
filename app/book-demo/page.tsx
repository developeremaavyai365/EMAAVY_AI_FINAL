'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';

// Replace with your actual Calendly event URL from calendly.com/emaavy
const CALENDLY_URL = 'https://calendly.com/emaavy/demo';

const BLUE   = '#18345d';
const BLUE_D = '#0f2040';
const BLUE_L = '#edf1f7';
const BLUE_M = '#c2cfe0';

const TEAM_SIZES = ['1–10', '11–50', '51–200', '201–500', '500+'];
const USE_CASES  = ['Outbound Sales', 'Customer Support', 'Appointment Setting', 'Operations / HR', 'Other'];

function Field({
  label, type = 'text', placeholder, value, onChange, required = true,
}: {
  label: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="block text-[12px] font-medium mb-1" style={{ color: '#374151' }}>
        {label}{required && <span style={{ color: BLUE }}> *</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-3.5 py-2.5 rounded-lg text-[13px] outline-none transition-all duration-150"
        style={{
          background: '#fff',
          border: `1.5px solid ${focused ? BLUE : '#e5e7eb'}`,
          boxShadow: focused ? `0 0 0 3px ${BLUE}15` : 'none',
          color: '#111827',
        }}
      />
    </div>
  );
}

const WHAT_TO_EXPECT = [
  { label: 'Live agent demo',     body: 'Watch a real Emaavy agent handle a live call end-to-end — no slides.' },
  { label: 'Built for your flow', body: 'We configure an agent for your use case on the spot, not a generic template.' },
  { label: 'ROI breakdown',       body: 'Pipeline impact, headcount savings, and time-to-value — modelled for your team.' },
  { label: 'Integration map',     body: 'We map your CRM, calendar, and telephony stack live during the session.' },
];

export default function BookDemoPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [email,     setEmail]     = useState('');
  const [company,   setCompany]   = useState('');
  const [jobTitle,  setJobTitle]  = useState('');
  const [teamSize,  setTeamSize]  = useState('');
  const [useCase,   setUseCase]   = useState('');
  const [done,      setDone]      = useState(false);
  const [logoOffset, setLogoOffset] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setLogoOffset(o => o - 1), 30);
    return () => clearInterval(id);
  }, []);

  // Listen for Calendly event_scheduled message → show success screen
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data?.event === 'calendly.event_scheduled') {
        setDone(true);
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const canSubmit = firstName && lastName && email && company && teamSize && useCase;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    // Open Calendly popup prefilled with user details
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).Calendly?.initPopupWidget({
      url: CALENDLY_URL,
      prefill: {
        name:  `${firstName} ${lastName}`,
        email,
        customAnswers: {
          a1: company,
          a2: jobTitle,
          a3: teamSize,
          a4: useCase,
        },
      },
      utm: { utmSource: 'book-demo-page' },
    });
  };

  const LOGOS = ['HubSpot', 'Salesforce', 'Twilio', 'Slack', 'OpenAI', 'Zoom'];

  return (
    <div className="min-h-screen flex" style={{ background: '#ffffff' }}>

      {/* ── LEFT: Form ── */}
      <div className="w-full lg:w-[48%] flex flex-col px-8 py-10 lg:px-14 xl:px-16 min-h-screen"
        style={{ background: '#ffffff', borderRight: '1px solid #e5e7eb' }}>

        {/* Nav */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/">
            <Image src="/brand/emaavy-logo.svg" alt="Emaavy" width={110} height={22} className="h-auto" />
          </Link>
          <Link href="/" className="text-[12px] font-medium" style={{ color: '#9ca3af' }}>
            &larr; Back
          </Link>
        </div>

        <div className="w-full max-w-sm mx-auto flex-1">
          <AnimatePresence mode="wait">

            {/* Success */}
            {done ? (
              <motion.div key="done"
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
                className="flex flex-col items-center text-center pt-12">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 18, delay: 0.1 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ background: BLUE_L, border: `2px solid ${BLUE_M}` }}>
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke={BLUE} strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h2 className="text-[26px] font-bold mb-2" style={{ color: '#111827', letterSpacing: '-0.025em' }}>
                  You&apos;re booked.
                </h2>
                <p className="text-[13px] mb-6 leading-relaxed" style={{ color: '#6b7280' }}>
                  A calendar invite has been sent to{' '}
                  <strong style={{ color: '#111827' }}>{email}</strong>.{' '}
                  Our sales team has been notified and will be ready for your session.
                </p>
                <div className="w-full h-1 rounded-full overflow-hidden mb-7" style={{ background: BLUE_M }}>
                  <motion.div className="h-full rounded-full" style={{ background: BLUE }}
                    initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 3, ease: 'linear' }} />
                </div>
                <Link href="/" className="w-full py-3 rounded-lg text-[14px] font-semibold text-center text-white block"
                  style={{ background: BLUE }}>
                  Return to homepage
                </Link>
              </motion.div>
            ) : (

              /* Form */
              <motion.div key="form" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="mb-7">
                  <h1 className="text-[24px] font-bold mb-1.5" style={{ color: '#111827', letterSpacing: '-0.025em' }}>
                    Book a live demo
                  </h1>
                  <p className="text-[13px]" style={{ color: '#6b7280' }}>
                    30 minutes. No slides. A real agent built for your workflow.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="First name" placeholder="Jane"  value={firstName} onChange={setFirstName} />
                    <Field label="Last name"  placeholder="Smith" value={lastName}  onChange={setLastName}  />
                  </div>

                  <Field label="Work email"  type="email" placeholder="jane@company.com" value={email}   onChange={setEmail}   />
                  <Field label="Company"     placeholder="Acme Corp"    value={company}  onChange={setCompany} />
                  <Field label="Job title"   placeholder="VP of Sales"  value={jobTitle} onChange={setJobTitle} required={false} />

                  {/* Team size */}
                  <div>
                    <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#374151' }}>
                      Team size <span style={{ color: BLUE }}>*</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {TEAM_SIZES.map(s => (
                        <button key={s} type="button" onClick={() => setTeamSize(s)}
                          className="px-3.5 py-1.5 rounded-lg text-[11.5px] font-medium transition-all"
                          style={{
                            background: teamSize === s ? BLUE : '#f9fafb',
                            color:      teamSize === s ? '#fff' : '#374151',
                            border:     `1.5px solid ${teamSize === s ? BLUE : '#e5e7eb'}`,
                          }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Use case */}
                  <div>
                    <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#374151' }}>
                      Primary use case <span style={{ color: BLUE }}>*</span>
                    </label>
                    <div className="grid grid-cols-1 gap-1.5">
                      {USE_CASES.map(uc => (
                        <button key={uc} type="button" onClick={() => setUseCase(uc)}
                          className="w-full text-left px-3.5 py-2.5 rounded-lg text-[12.5px] font-medium transition-all"
                          style={{
                            background: useCase === uc ? BLUE_L : '#f9fafb',
                            border:     `1.5px solid ${useCase === uc ? BLUE : '#e5e7eb'}`,
                            color:      useCase === uc ? BLUE : '#374151',
                          }}>
                          {uc}
                          {useCase === uc && (
                            <svg className="w-3.5 h-3.5 inline-block ml-2" fill="none" viewBox="0 0 24 24" stroke={BLUE} strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <button type="submit" disabled={!canSubmit}
                    className="w-full py-3 rounded-lg text-[14px] font-semibold transition-all duration-200 mt-1"
                    style={{
                      background: canSubmit ? BLUE : '#e5e7eb',
                      color:      canSubmit ? '#fff' : '#9ca3af',
                      boxShadow:  canSubmit ? `0 2px 12px ${BLUE}35` : 'none',
                      cursor:     canSubmit ? 'pointer' : 'not-allowed',
                    }}>
                    Choose a time &rarr;
                  </button>
                </form>

                {/* Trust */}
                <div className="flex items-center gap-5 mt-6 pt-5" style={{ borderTop: '1px solid #f3f4f6' }}>
                  {['SOC 2 Type II', 'GDPR', 'No hard sell'].map(b => (
                    <span key={b} className="flex items-center gap-1 text-[11px]" style={{ color: '#9ca3af' }}>
                      <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke={BLUE} strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {b}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Calendly popup assets */}
      <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />

      {/* ── RIGHT: Social proof panel ── */}
      <div className="hidden lg:flex w-[52%] flex-col relative overflow-hidden"
        style={{ background: `linear-gradient(150deg, ${BLUE_D} 0%, ${BLUE} 65%, #1d3f70 100%)` }}>

        {/* Live animated orbs */}
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 600, height: 600, top: '-180px', right: '-160px', background: 'radial-gradient(circle, rgba(147,197,253,0.22) 0%, transparent 70%)', filter: 'blur(50px)' }}
          animate={{ x: [0, 55, -25, 0], y: [0, -35, 45, 0], scale: [1, 1.08, 0.94, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 500, height: 500, bottom: '-100px', left: '-120px', background: 'radial-gradient(circle, rgba(74,101,139,0.32) 0%, transparent 70%)', filter: 'blur(55px)' }}
          animate={{ x: [0, -50, 35, 0], y: [0, 40, -55, 0], scale: [1, 1.06, 1.12, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 35% at 50% 52%, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 pointer-events-none opacity-[0.045]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        {/* Integration marquee */}
        <div className="relative pt-12 px-16 overflow-hidden z-10">
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: 'rgba(191,219,254,0.7)' }}>
            Works with your stack
          </p>
          <div className="overflow-hidden">
            <div className="flex gap-2.5"
              style={{ transform: `translateX(${logoOffset % (LOGOS.length * 140)}px)`, transition: 'none', whiteSpace: 'nowrap', width: 'max-content' }}>
              {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
                <div key={i} className="inline-flex items-center px-4 py-1.5 rounded-lg text-[11px] font-semibold shrink-0"
                  style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)', color: '#e0f2fe' }}>
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Central content — big breathing room */}
        <div className="flex-1 flex flex-col justify-center px-16 z-10">

          {/* Headline block */}
          <div className="mb-12">
            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: 'rgba(147,197,253,0.8)' }}>
              What you&apos;ll get
            </p>
            <h2 className="text-[34px] font-bold text-white leading-[1.18]" style={{ letterSpacing: '-0.025em' }}>
              A real agent, built<br />for your workflow.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed" style={{ color: 'rgba(191,219,254,0.75)' }}>
              Not slides. Not a canned demo. A configured Emaavy agent handling your actual use case — live.
            </p>
          </div>

          {/* What to expect — clean spaced rows */}
          <div className="space-y-7 mb-12">
            {WHAT_TO_EXPECT.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-[13.5px] font-semibold text-white mb-1">{item.label}</p>
                  <p className="text-[12.5px] leading-relaxed" style={{ color: 'rgba(191,219,254,0.7)' }}>{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Testimonial — solid white card, generous padding */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.45 }}
            className="rounded-2xl p-7"
            style={{ background: '#ffffff', boxShadow: '0 12px 40px rgba(0,0,0,0.22)' }}>
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill={BLUE}>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-[15px] font-semibold leading-[1.65] mb-5" style={{ color: '#0f1b2d' }}>
              &ldquo;We had a live agent making calls before the demo was even over. I&apos;ve never seen a sales demo that actually shipped something.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0"
                style={{ background: BLUE, color: '#fff' }}>
                TK
              </div>
              <div>
                <p className="text-[13px] font-semibold" style={{ color: '#0f1b2d' }}>Thomas Kim</p>
                <p className="text-[11.5px]" style={{ color: '#4a658b' }}>CTO &middot; Orion Fintech</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom stat strip */}
        <div className="px-16 pb-12 z-10">
          <div className="flex items-center gap-10 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {[
              { val: '30 min',  label: 'demo length' },
              { val: '< 48h',   label: 'response time' },
              { val: '0',       label: 'sales pressure' },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-[22px] font-bold text-white font-mono" style={{ letterSpacing: '-0.03em' }}>{s.val}</p>
                <p className="text-[11px] mt-0.5" style={{ color: 'rgba(191,219,254,0.6)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
