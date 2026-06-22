'use client';

import { useState, useEffect, useRef } from 'react'; // useRef kept for TiltCard
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { HiOutlinePlayCircle, HiOutlinePhoneXMark, HiOutlineChevronDown, HiOutlineGlobeAlt } from 'react-icons/hi2';
import HeroBackground from '@/components/ui/HeroBackground';

/* ─── Constants ─────────────────────────────────────── */

const USE_CASES = [
  'Lead Qualification',
  'Appointment Scheduling',
  'Customer Support',
  'Outbound Sales',
];

const LANGUAGES = ['English', 'Hindi', 'Spanish', 'French'];

const HEADLINES = [
  'Automate Every\nCustomer Conversation',
  'Deploy Voice AI\nin Minutes',
  'Scale to Millions\nof Calls Instantly',
];

function fmt(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

/* ─── Tilt card (right side) ────────────────────────── */

function TiltCard() {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const onLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      initial={{ opacity: 0, x: 60, y: 20 }}
      animate={{ opacity: 1, x: 0,  y: 0  }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[520px]"
    >
      {/* Neon border glow trace — top + left edges */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(22,163,74,0.7) 0%, rgba(29,78,216,0.5) 40%, rgba(124,58,237,0.4) 70%, transparent 100%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1.5px',
          borderRadius: '16px',
        }}
      />

      {/* Ambient glow behind card */}
      <div className="absolute -inset-6 rounded-3xl opacity-30"
        style={{ background: 'radial-gradient(ellipse at 30% 20%, #16a34a55 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, #1d4ed855 0%, transparent 60%)', filter: 'blur(30px)' }}
      />

      {/* Main card */}
      <div className="relative overflow-hidden rounded-2xl"
        style={{ background: 'rgba(15,20,30,0.92)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(20px)' }}
      >
        {/* Card header bar */}
        <div className="flex items-center gap-2 border-b px-5 py-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-green-500/70" />
          <span className="ml-3 flex items-center gap-1.5 text-xs font-medium text-white/40">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            emaavy · live dashboard
          </span>
        </div>

        {/* Live Emaavy dashboard — scaled interactive HTML */}
        <div className="relative w-full overflow-hidden" style={{ height: '280px' }}>
          <iframe
            src="/emaavy_dashboard.html"
            title="Emaavy Live Dashboard"
            scrolling="no"
            style={{
              border: 'none',
              width: '800px',
              height: '430px',
              transform: 'scale(0.65)',
              transformOrigin: 'top left',
              pointerEvents: 'none',
              maxWidth: 'none',
            }}
          />
          {/* Bottom fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
            style={{ background: 'linear-gradient(to top, rgba(15,20,30,0.95), transparent)' }}
          />
        </div>

        {/* Bottom glow stripe */}
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(22,163,74,0.5), rgba(29,78,216,0.5), transparent)' }} />
      </div>

      {/* Floating badge — top left of card */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-6 -top-5 rounded-2xl px-4 py-2.5 shadow-2xl"
        style={{ background: 'rgba(15,20,30,0.95)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Agents Live</p>
        <p className="mt-0.5 text-xl font-bold text-white">1,284</p>
        <p className="text-[10px] text-green-400">↑ +18% today</p>
      </motion.div>

      {/* Floating badge — bottom right of card */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        className="absolute -bottom-5 -right-5 rounded-2xl px-4 py-2.5 shadow-2xl"
        style={{ background: 'rgba(15,20,30,0.95)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Latency</p>
        <p className="mt-0.5 text-xl font-bold text-white">&lt;500ms</p>
        <p className="text-[10px] text-blue-400">↓ Global avg</p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Hero ─────────────────────────────────────── */

export default function Hero() {
  const [caseIdx,   setCaseIdx]   = useState(0);
  const [langIdx,   setLangIdx]   = useState(0);
  const [dropOpen,  setDropOpen]  = useState(false);
  const [headIdx,   setHeadIdx]   = useState(0);
  const [callState, setCallState] = useState<'idle' | 'connecting' | 'active'>('idle');
  const [timer,     setTimer]     = useState(0);

  /* Rotate headlines */
  useEffect(() => {
    const t = setInterval(() => setHeadIdx((i) => (i + 1) % HEADLINES.length), 4000);
    return () => clearInterval(t);
  }, []);

  /* Call timer */
  useEffect(() => {
    if (callState !== 'active') return;
    const t = setInterval(() => setTimer((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [callState]);

  const handleCall = () => {
    if (callState === 'idle') {
      setCallState('connecting');
      setTimer(0);
      setTimeout(() => setCallState('active'), 1600);
    } else {
      setCallState('idle');
      setTimer(0);
    }
  };

  return (
    <HeroBackground>
      <div className="site-container flex min-h-screen flex-col justify-center py-20 md:py-24 lg:py-32">
        <div className="flex flex-col items-start gap-16 lg:flex-row lg:items-center lg:gap-20">

          {/* ── LEFT: Text + Widget ── */}
          <div className="flex flex-1 flex-col">

            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest"
              style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc' }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" />
              Now Live — Join 2,500+ teams building with Emaavy
            </motion.div>

            {/* Headline — rotating */}
            <div className="mb-6 h-[140px] overflow-hidden sm:h-[170px] md:h-[200px] lg:h-[230px]">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={headIdx}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="whitespace-pre-line font-display text-[40px] font-extrabold leading-[1.06] tracking-tight text-white sm:text-[56px] md:text-[64px] lg:text-[76px]"
                >
                  {HEADLINES[headIdx]}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 max-w-[480px] text-base sm:text-lg leading-relaxed text-white/55"
            >
              Emaavy orchestrates voice AI agents and workflow automation so your team can deploy intelligent, human-sounding conversations at any scale — in any language.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3"
            >
              <Link href="/book-demo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl w-full sm:w-auto"
              >
                Contact Sales
              </Link>
              <Link href="/book-demo"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 w-full sm:w-auto"
                style={{ border: '1px solid rgba(255,255,255,0.2)' }}
              >
                Start Building
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            {/* ── Interactive widget ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              {/* Widget container */}
              <div className="rounded-2xl p-4 sm:p-5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}>
                <p className="mb-3.5 text-[11px] font-semibold uppercase tracking-widest text-white/30">Try the agent live</p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  {/* Use-case dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setDropOpen(!dropOpen)}
                      className="flex w-full sm:min-w-[210px] items-center justify-between gap-3 rounded-xl px-4 py-3 text-base sm:text-sm font-medium text-white transition-all"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                    >
                      <span>{USE_CASES[caseIdx]}</span>
                      <HiOutlineChevronDown className={`h-4 w-4 text-white/50 transition-transform ${dropOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {dropOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.97 }}
                          transition={{ duration: 0.14 }}
                          className="absolute bottom-full left-0 z-50 mb-2 w-full overflow-hidden rounded-xl"
                          style={{ background: '#0f1623', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 24px 60px rgba(0,0,0,0.6)' }}
                        >
                          {USE_CASES.map((uc, i) => (
                            <button key={uc}
                              onClick={() => { setCaseIdx(i); setDropOpen(false); setCallState('idle'); setTimer(0); }}
                              className={`block w-full px-4 py-3 text-left text-sm transition-colors hover:bg-white/8 ${i === caseIdx ? 'font-semibold text-white' : 'text-white/55'}`}
                            >
                              {uc}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Initiate / End Call */}
                  <button onClick={handleCall}
                    className={`flex shrink-0 items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                      callState === 'active'
                        ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                        : callState === 'connecting'
                        ? 'cursor-wait bg-white/8 text-white/50'
                        : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                    }`}
                    style={{ border: callState === 'active' ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(74,222,128,0.25)' }}
                  >
                    {callState === 'active' ? (
                      <><HiOutlinePhoneXMark className="h-4 w-4" /> End Call</>
                    ) : callState === 'connecting' ? (
                      <>
                        <motion.div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                          animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                        Connecting…
                      </>
                    ) : (
                      <><HiOutlinePlayCircle className="h-4 w-4" /> Initiate Call</>
                    )}
                  </button>
                </div>

                {/* Status row */}
                <div className="mt-3.5 flex flex-wrap items-center gap-4">
                  {/* Language pills */}
                  <div className="flex items-center gap-1.5">
                    <HiOutlineGlobeAlt className="h-3.5 w-3.5 text-white/30" />
                    <div className="flex gap-1.5">
                      {LANGUAGES.map((lang, i) => (
                        <button key={lang} onClick={() => setLangIdx(i)}
                          className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-all ${i === langIdx ? 'bg-white/15 text-white' : 'text-white/35 hover:text-white/60'}`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="flex items-center gap-1.5">
                    {callState === 'idle' && (
                      <>
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/70" />
                        <span className="text-[11px] text-white/30">Mic permissions needed</span>
                      </>
                    )}
                    {callState === 'connecting' && (
                      <>
                        <motion.span className="h-1.5 w-1.5 rounded-full bg-blue-400"
                          animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.6, repeat: Infinity }} />
                        <span className="text-[11px] text-blue-400/80">Connecting to agent…</span>
                      </>
                    )}
                    {callState === 'active' && (
                      <>
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                        </span>
                        <span className="font-mono text-[11px] font-semibold text-green-400">{fmt(timer)}</span>
                        <div className="flex items-end gap-[2px]">
                          {[1,2,3,4,5].map((_, i) => (
                            <motion.div key={i} className="w-[2px] rounded-full bg-green-400"
                              animate={{ height: ['3px', '10px', '3px'] }}
                              transition={{ duration: 0.45, repeat: Infinity, delay: i * 0.09 }} />
                          ))}
                        </div>
                        <span className="text-[11px] text-white/40">{USE_CASES[caseIdx]}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Tilt card — hidden on mobile/tablet, shown on lg+ ── */}
          <div className="hidden w-full lg:flex lg:w-auto lg:justify-end xl:block">
            <TiltCard />
          </div>
        </div>
      </div>
    </HeroBackground>
  );
}
