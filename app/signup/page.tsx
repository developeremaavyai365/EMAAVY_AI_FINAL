'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Emaavy brand navy (tailwind.config emaavy.deep) ───────────────────── */
const BLUE   = '#18345d';   // exact logo color
const BLUE_D = '#0f2040';   // deeper navy for gradient depth
const BLUE_L = '#edf1f7';   // lightest tint for backgrounds
const BLUE_M = '#c2cfe0';   // mid tint for borders/accents

/* ─── Reviews ───────────────────────────────────────────────────────────── */
const REVIEWS = [
  {
    quote: "We replaced our entire SDR team's cold-call volume with Emaavy in three weeks. Pipeline didn't dip — it went up 40%.",
    name: 'Marcus Reid',
    title: 'VP of Sales',
    company: 'Clarivate Solutions',
    avatar: 'MR',
    metric: { val: '+40%', label: 'pipeline growth in 30 days' },
  },
  {
    quote: "Our support queue used to hit 800 tickets a day. Emaavy auto-resolves 68% of them before a human even sees the ticket.",
    name: 'Priya Anand',
    title: 'Head of Customer Experience',
    company: 'Nexora Health',
    avatar: 'PA',
    metric: { val: '68%', label: 'ticket auto-resolution rate' },
  },
  {
    quote: "I was skeptical an AI agent could handle enterprise objections. After the first campaign, I was wrong. Closed two Fortune 500 pilots in a month.",
    name: 'James Whitfield',
    title: 'Chief Revenue Officer',
    company: 'Stratum Capital',
    avatar: 'JW',
    metric: { val: '2', label: 'Fortune 500 pilots closed in one month' },
  },
  {
    quote: "From signup to first live call was under 20 minutes. We had Aria running a full outbound sequence before our team finished their morning standup.",
    name: 'Sofia Marchetti',
    title: 'Growth Lead',
    company: 'Vento SaaS',
    avatar: 'SM',
    metric: { val: '20 min', label: 'from signup to first live call' },
  },
  {
    quote: "Emaavy recovered $840K in dormant ARR we had completely written off. The win-back agent found accounts our team had stopped chasing months ago.",
    name: 'Daniel Osei',
    title: 'Director of Revenue Operations',
    company: 'Pinnacle Labs',
    avatar: 'DO',
    metric: { val: '$840K', label: 'ARR recovered from dormant accounts' },
  },
] as const;

const LOGOS = ['HubSpot', 'Salesforce', 'Twilio', 'Google Calendar', 'Slack', 'ElevenLabs', 'Deepgram', 'OpenAI'];

/* ─── Input ─────────────────────────────────────────────────────────────── */
function Field({
  label, type = 'text', placeholder, value, onChange, icon,
}: {
  label: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void;
  icon: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#374151' }}>{label}</label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: focused ? BLUE : '#9ca3af' }}>
          {icon}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg text-[13.5px] outline-none transition-all duration-150"
          style={{
            background: '#ffffff',
            border: `1.5px solid ${focused ? BLUE : '#e5e7eb'}`,
            boxShadow: focused ? `0 0 0 3px ${BLUE}18` : 'none',
            color: '#111827',
          }}
        />
      </div>
    </div>
  );
}

/* ─── Stars ─────────────────────────────────────────────────────────────── */
function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill={BLUE} opacity={0.9}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function SignupPage() {
  const [mode, setMode]             = useState<'signup' | 'login'>('signup');
  const [name, setName]             = useState('');
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [company, setCompany]       = useState('');
  const [showPass, setShowPass]     = useState(false);
  const [loading, setLoading]       = useState(false);
  const [done, setDone]             = useState(false);
  const [reviewIdx, setReviewIdx]   = useState(0);
  const [logoOffset, setLogoOffset] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setReviewIdx(i => (i + 1) % REVIEWS.length), 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setLogoOffset(o => o - 1), 28);
    return () => clearInterval(id);
  }, []);

  const review = REVIEWS[reviewIdx];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1600));
    setLoading(false);
    setDone(true);
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#ffffff' }}>

      {/* ══════════════════════════════════════════
          LEFT — White form panel
          ══════════════════════════════════════════ */}
      <div className="w-full lg:w-[46%] flex flex-col px-6 py-10 lg:px-14 xl:px-16 justify-between min-h-screen"
        style={{ background: '#ffffff', borderRight: '1px solid #e5e7eb' }}>

        {/* Logo */}
        <div>
          <Link href="/">
            <Image src="/brand/emaavy-logo.svg" alt="Emaavy" width={120} height={24} className="h-auto" />
          </Link>
        </div>

        {/* Form */}
        <div className="w-full max-w-sm mx-auto py-10">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
                className="text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: BLUE_L, border: `2px solid ${BLUE_M}` }}>
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke={BLUE} strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-[24px] font-bold mb-2" style={{ color: '#111827', letterSpacing: '-0.02em' }}>You&apos;re in.</h2>
                <p className="text-[13px] mb-8" style={{ color: '#6b7280' }}>Your account is ready. Redirecting to dashboard...</p>
                <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: BLUE_M }}>
                  <motion.div className="h-full rounded-full" style={{ background: BLUE }}
                    initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2, ease: 'linear' }} />
                </div>
              </motion.div>
            ) : (
              <motion.div key={mode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>

                <div className="mb-7">
                  <h1 className="text-[26px] font-bold mb-1.5" style={{ color: '#111827', letterSpacing: '-0.025em' }}>
                    {mode === 'signup' ? 'Create your account' : 'Welcome back'}
                  </h1>
                  <p className="text-[13px]" style={{ color: '#6b7280' }}>
                    {mode === 'signup' ? 'Start deploying AI agents in under 20 minutes.' : 'Sign in to your Emaavy workspace.'}
                  </p>
                </div>

                {/* Google SSO */}
                <button type="button"
                  className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-lg text-[13px] font-semibold mb-5 transition-all hover:bg-gray-50"
                  style={{ border: '1.5px solid #e5e7eb', color: '#374151', background: '#fff' }}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px" style={{ background: '#e5e7eb' }} />
                  <span className="text-[11px] font-medium" style={{ color: '#9ca3af' }}>or with email</span>
                  <div className="flex-1 h-px" style={{ background: '#e5e7eb' }} />
                </div>

                {/* Fields */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {mode === 'signup' && (
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Full name" placeholder="Jane Smith" value={name} onChange={setName}
                        icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>}
                      />
                      <Field label="Company" placeholder="Acme Corp" value={company} onChange={setCompany}
                        icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>}
                      />
                    </div>
                  )}

                  <Field label="Work email" type="email" placeholder="you@company.com" value={email} onChange={setEmail}
                    icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>}
                  />

                  {/* Password */}
                  <div>
                    <label className="block text-[12px] font-medium mb-1.5" style={{ color: '#374151' }}>Password</label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9ca3af' }}>
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                      </div>
                      <input
                        type={showPass ? 'text' : 'password'}
                        placeholder={mode === 'signup' ? 'Min. 8 characters' : 'Your password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg text-[13.5px] outline-none transition-all duration-150"
                        style={{ background: '#fff', border: '1.5px solid #e5e7eb', color: '#111827' }}
                      />
                      <button type="button" onClick={() => setShowPass(s => !s)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                        style={{ color: '#9ca3af' }}>
                        {showPass
                          ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                          : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                      </button>
                    </div>
                    {mode === 'login' && (
                      <div className="text-right mt-1.5">
                        <button type="button" className="text-[12px] font-medium transition-colors"
                          style={{ color: BLUE }}>Forgot password?</button>
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <button type="submit" disabled={loading}
                    className="w-full py-3 rounded-lg text-[14px] font-semibold transition-all duration-200 mt-1"
                    style={{
                      background: loading ? '#93c5fd' : BLUE,
                      color: '#fff',
                      boxShadow: loading ? 'none' : `0 1px 3px ${BLUE}40, 0 4px 16px ${BLUE}25`,
                    }}>
                    <AnimatePresence mode="wait">
                      {loading ? (
                        <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                            <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          {mode === 'signup' ? 'Creating account...' : 'Signing in...'}
                        </motion.span>
                      ) : (
                        <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          {mode === 'signup' ? 'Create account' : 'Sign in'}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </form>

                {/* Toggle */}
                <p className="text-center text-[13px] mt-5" style={{ color: '#6b7280' }}>
                  {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button onClick={() => setMode(m => m === 'signup' ? 'login' : 'signup')}
                    className="font-semibold transition-colors" style={{ color: BLUE }}>
                    {mode === 'signup' ? 'Sign in' : 'Create one'}
                  </button>
                </p>

                {mode === 'signup' && (
                  <p className="text-center text-[11px] mt-3 leading-relaxed" style={{ color: '#9ca3af' }}>
                    By signing up you agree to our{' '}
                    <Link href="/terms" className="underline hover:text-gray-600">Terms</Link> and{' '}
                    <Link href="/privacy" className="underline hover:text-gray-600">Privacy Policy</Link>.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Trust */}
        <div className="flex items-center gap-5 flex-wrap">
          {['SOC 2 Type II', 'GDPR', 'Enterprise-ready'].map(b => (
            <span key={b} className="flex items-center gap-1.5 text-[11px]" style={{ color: '#9ca3af' }}>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke={BLUE} strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT — Blue panel
          ══════════════════════════════════════════ */}
      <div className="hidden lg:flex w-[54%] flex-col justify-between relative overflow-hidden"
        style={{ background: `linear-gradient(145deg, ${BLUE_D} 0%, ${BLUE} 60%, #1e3f6f 100%)` }}>

        {/* Subtle dot-grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />

        {/* Animated floating orbs — "live" background */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 520, height: 520, top: '-120px', right: '-100px', background: 'radial-gradient(circle, rgba(147,197,253,0.28) 0%, transparent 70%)', filter: 'blur(40px)' }}
          animate={{ x: [0, 55, -25, 0], y: [0, -35, 45, 0], scale: [1, 1.09, 0.94, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 440, height: 440, bottom: '-60px', left: '-80px', background: 'radial-gradient(circle, rgba(74,101,139,0.35) 0%, transparent 70%)', filter: 'blur(50px)' }}
          animate={{ x: [0, -60, 35, 0], y: [0, 40, -55, 0], scale: [1, 1.06, 1.12, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 320, height: 320, top: '40%', left: '30%', background: 'radial-gradient(circle, rgba(90,125,158,0.22) 0%, transparent 70%)', filter: 'blur(60px)' }}
          animate={{ x: [0, 40, -40, 0], y: [0, -60, 30, 0], scale: [1, 1.14, 0.92, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
        {/* Subtle shimmer pulse at centre */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 55% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Integrations marquee */}
        <div className="relative pt-12 px-14 overflow-hidden z-10">
          <p className="text-[10px] uppercase tracking-widest mb-4 font-medium" style={{ color: '#bfdbfe' }}>
            Works with your stack
          </p>
          <div className="overflow-hidden">
            <div className="flex gap-2.5" style={{ transform: `translateX(${logoOffset % (LOGOS.length * 130)}px)`, transition: 'none', whiteSpace: 'nowrap', width: 'max-content' }}>
              {[...LOGOS, ...LOGOS].map((logo, i) => (
                <div key={i} className="inline-flex items-center px-4 py-1.5 rounded-lg text-[11px] font-semibold shrink-0"
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', color: '#e0f2fe' }}>
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review */}
        <div className="flex-1 flex items-center px-14 z-10">
          <AnimatePresence mode="wait">
            <motion.div key={reviewIdx}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-lg">

              {/* Card — solid white, crystal clear */}
              <div className="rounded-2xl p-8 mb-6" style={{ background: '#ffffff', boxShadow: '0 8px 40px rgba(0,0,0,0.28), 0 2px 12px rgba(0,0,0,0.18)' }}>
                <Stars />
                <blockquote className="mt-5 text-[18px] font-semibold leading-[1.65]"
                  style={{ color: '#0f1b2d', letterSpacing: '-0.01em' }}>
                  &ldquo;{review.quote}&rdquo;
                </blockquote>

                {/* Metric */}
                <div className="mt-6 inline-flex items-baseline gap-2 px-4 py-2.5 rounded-xl"
                  style={{ background: BLUE_L, border: `1px solid ${BLUE_M}` }}>
                  <span className="text-[24px] font-bold font-mono" style={{ color: BLUE }}>{review.metric.val}</span>
                  <span className="text-[12px] font-medium" style={{ color: '#4a658b' }}>{review.metric.label}</span>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0"
                  style={{ background: BLUE, border: `2px solid rgba(255,255,255,0.25)`, color: '#fff' }}>
                  {review.avatar}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-white">{review.name}</p>
                  <p className="text-[12px]" style={{ color: '#bfdbfe' }}>{review.title} &middot; {review.company}</p>
                </div>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-2 mt-7">
                {REVIEWS.map((_, i) => (
                  <button key={i} onClick={() => setReviewIdx(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === reviewIdx ? 22 : 6,
                      height: 6,
                      background: i === reviewIdx ? '#fff' : 'rgba(255,255,255,0.25)',
                    }} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats */}
        <div className="px-14 pb-12 z-10">
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: '4.2M+', label: 'calls monthly' },
              { val: '99.97%', label: 'platform uptime' },
              { val: '20 min', label: 'to first call' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl px-4 py-4"
                style={{ background: 'rgba(255,255,255,0.95)', boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
                <p className="text-[21px] font-bold font-mono mb-0.5" style={{ color: BLUE }}>{s.val}</p>
                <p className="text-[10px] font-medium" style={{ color: '#4a658b' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
