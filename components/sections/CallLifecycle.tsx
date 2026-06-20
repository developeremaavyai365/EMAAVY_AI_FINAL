'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* --- Stage definitions ---------------------------------------------------- */
const STAGES = [
  {
    id: 'trigger',
    index: 0,
    phase: 'Initiation',
    label: 'Call Triggered',
    sublabel: 'Campaign fires / Agent selected',
    time: '0 ms',
    color: '#a78bfa',
    dim: '#a78bfa18',
    border: '#a78bfa35',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    detail: 'The Emaavy campaign engine evaluates all active flows, selects the best-matched AI agent persona, pulls CRM context, and fires the outbound dial in under 2 ms.',
    metrics: [
      { label: 'Engine startup', val: '0.8ms' },
      { label: 'Agent selected', val: 'Aria v2' },
      { label: 'CRM context', val: 'Loaded' },
    ],
    transcript: null,
    tech: ['Campaign DAG evaluated', 'Lead scored: 82', 'Agent: Aria-SalesQualifier-v2', 'CRM context pulled from HubSpot'],
  },
  {
    id: 'routing',
    index: 1,
    phase: 'Network',
    label: 'PSTN Routing',
    sublabel: 'Carrier handshake / E.164 resolved',
    time: '12 ms',
    color: '#38bdf8',
    dim: '#38bdf818',
    border: '#38bdf835',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    detail: 'Emaavy routes via the optimal carrier (Twilio -> Telnyx failover) using geo-latency scoring. SIP trunk established, caller ID set, SRTP encryption activated on both legs.',
    metrics: [
      { label: 'Carrier selected', val: 'Twilio' },
      { label: 'Route latency', val: '12ms' },
      { label: 'Encryption', val: 'SRTP' },
    ],
    transcript: null,
    tech: ['SIP INVITE sent', 'E.164: +14155550192', 'Carrier: Twilio US-East', 'SRTP keys exchanged'],
  },
  {
    id: 'connect',
    index: 2,
    phase: 'Connection',
    label: 'Line Connected',
    sublabel: 'Ring detected / Audio path open',
    time: '1.2 s',
    color: '#34d399',
    dim: '#34d39918',
    border: '#34d39935',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    detail: "Prospect answers. 200 OK from carrier arrives, full-duplex audio established. Emaavy's edge node begins real-time audio buffering with 20ms jitter correction.",
    metrics: [
      { label: 'Ring-to-answer', val: '3 rings' },
      { label: 'Audio codec', val: 'G.711u' },
      { label: 'Jitter buffer', val: '20ms' },
    ],
    transcript: null,
    tech: ['SIP 200 OK received', 'RTP stream: 8kHz G.711u', 'Duplex audio confirmed', 'Noise gate activated'],
  },
  {
    id: 'stt',
    index: 3,
    phase: 'Perception',
    label: 'STT Streaming',
    sublabel: 'Voice transcribed / Speaker identified',
    time: '1.4 s',
    color: '#f59e0b',
    dim: '#f59e0b18',
    border: '#f59e0b35',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
      </svg>
    ),
    detail: "Raw PCM audio streams into Emaavy's STT layer (Deepgram Nova-2 by default). Word-level timestamps, speaker diarization, and filler-word detection run in real time at under 90ms lag.",
    metrics: [
      { label: 'STT engine', val: 'Deepgram' },
      { label: 'Transcription lag', val: '88ms' },
      { label: 'Confidence', val: '97.4%' },
    ],
    transcript: { speaker: 'Prospect', text: 'Hello?' },
    tech: ['Deepgram Nova-2 streaming', 'Speaker: PROSPECT identified', 'Word timestamps: active', 'Filler filter: enabled'],
  },
  {
    id: 'llm',
    index: 4,
    phase: 'Cognition',
    label: 'LLM Processing',
    sublabel: 'Context assembled / Response generated',
    time: '1.68 s',
    color: '#818cf8',
    dim: '#818cf818',
    border: '#818cf835',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
    ),
    detail: 'The full system prompt, CRM context, call history, and live transcript are assembled into a context window and sent to GPT-4o with streaming enabled. First token arrives in 280ms.',
    metrics: [
      { label: 'Model', val: 'GPT-4o' },
      { label: 'TTFT', val: '280ms' },
      { label: 'Tokens in', val: '1,842' },
    ],
    transcript: { speaker: 'Aria', text: 'Hi, this is Aria from Emaavy. Is this Marcus?' },
    tech: ['Context: 1,842 tokens', 'System prompt: v7', 'Temperature: 0.25', 'Streaming: enabled'],
  },
  {
    id: 'tts',
    index: 5,
    phase: 'Voice',
    label: 'TTS + Audio Out',
    sublabel: 'Speech synthesized / Streamed live',
    time: '1.96 s',
    color: '#fb923c',
    dim: '#fb923c18',
    border: '#fb923c35',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
      </svg>
    ),
    detail: 'LLM tokens stream directly into ElevenLabs Turbo v2.5. Audio chunks play before the model finishes generating, delivering natural speech with under 500ms end-to-end latency.',
    metrics: [
      { label: 'TTS provider', val: 'ElevenLabs' },
      { label: 'Voice', val: 'Aria-Neural' },
      { label: 'E2E latency', val: '<500ms' },
    ],
    transcript: { speaker: 'Aria', text: 'Hi, this is Aria from Emaavy. Is this Marcus?' },
    tech: ['ElevenLabs Turbo v2.5', 'Voice: aria-neural', 'Chunk size: 50ms', 'Played before gen ends'],
  },
  {
    id: 'tools',
    index: 6,
    phase: 'Action',
    label: 'Tool Execution',
    sublabel: 'CRM updated / Calendar booked',
    time: '~2 min',
    color: '#4ade80',
    dim: '#4ade8018',
    border: '#4ade8035',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    detail: 'Mid-call, Aria fires tool calls to HubSpot (contact log), Google Calendar (slot check), and Slack (#deals-alerts) all resolving within 38ms, completely invisible to the prospect.',
    metrics: [
      { label: 'HubSpot write', val: '22ms' },
      { label: 'Calendar check', val: '38ms' },
      { label: 'Slack alert', val: '11ms' },
    ],
    transcript: { speaker: 'Aria', text: "Perfect. I've found Thursday at 2pm, booking that in now." },
    tech: ['hubspot.updateContact()', 'calendar.checkSlot()', 'calendar.bookMeeting()', 'slack.postMessage(#deals)'],
  },
  {
    id: 'outcome',
    index: 7,
    phase: 'Completion',
    label: 'Call Outcome',
    sublabel: 'Meeting booked / Transcript indexed',
    time: '+3 min',
    color: '#f43f5e',
    dim: '#f43f5e18',
    border: '#f43f5e35',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    detail: 'Call ends. Full word-level transcript is indexed in under 2s. Sentiment scores, intent signals, and the meeting booking are synced to HubSpot. Analytics update instantly.',
    metrics: [
      { label: 'Result', val: 'Booked' },
      { label: 'Duration', val: '3m 22s' },
      { label: 'Sentiment', val: '+0.82' },
    ],
    transcript: { speaker: 'Prospect', text: 'Thursday works. Looking forward to it.' },
    tech: ['Transcript: 847 words indexed', 'Sentiment: 0.82 (positive)', 'Meeting: Thu 2pm confirmed', 'HubSpot deal stage -> qualified'],
  },
] as const;

type StageId = (typeof STAGES)[number]['id'];

/* --- Waveform bars --------------------------------------------------------- */
const WAVE_SEED = [14, 22, 8, 30, 18, 26, 10, 34, 20, 28, 12, 32, 16, 24, 30, 8, 26, 18, 22, 14];

function AudioWave({ color, active }: { color: string; active: boolean }) {
  const [bars, setBars] = useState(WAVE_SEED);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setBars(Array.from({ length: 20 }, () => 6 + Math.floor(Math.random() * 30))), 120);
    return () => clearInterval(id);
  }, [active]);
  return (
    <div className="flex items-end gap-[2px]" style={{ height: 28 }}>
      {bars.map((h, i) => (
        <motion.div key={i} className="flex-1 rounded-[1px]"
          style={{ background: active ? color : color + '30' }}
          animate={{ height: active ? h : 4 }}
          transition={{ duration: 0.12, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* --- Pipeline SVG connector ------------------------------------------------ */
function PipelineTrack({ activeIndex, total }: { activeIndex: number; total: number }) {
  const pct = ((activeIndex) / (total - 1)) * 100;
  return (
    <div className="relative w-full h-[3px] rounded-full my-6" style={{ background: '#1e2235' }}>
      <motion.div
        className="absolute left-0 top-0 h-full rounded-full"
        style={{ background: 'linear-gradient(90deg,#a78bfa,#38bdf8,#34d399,#f59e0b,#818cf8,#fb923c,#4ade80,#f43f5e)' }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
        style={{ background: STAGES[activeIndex].color, boxShadow: `0 0 12px ${STAGES[activeIndex].color}` }}
        animate={{ left: `calc(${pct}% - 8px)` }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

/* --- Main component -------------------------------------------------------- */
export default function CallLifecycle() {
  const [activeIdx, setActiveIdx]   = useState(0);
  const [playing, setPlaying]       = useState(true);
  const [transcript, setTranscript] = useState<{ speaker: string; text: string; color: string }[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null!);

  const stage = STAGES[activeIdx];

  const advance = useCallback(() => {
    setActiveIdx(i => {
      const next = (i + 1) % STAGES.length;
      if (next === 0) setTranscript([]);
      return next;
    });
  }, []);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setTimeout(advance, activeIdx === 0 ? 1200 : 2800);
    return () => clearTimeout(timerRef.current);
  }, [activeIdx, playing, advance]);

  useEffect(() => {
    const t = stage.transcript;
    if (!t) return;
    setTranscript(prev => {
      const already = prev.some(l => l.text === t.text);
      if (already) return prev;
      return [...prev, { speaker: t.speaker, text: t.text, color: stage.color }];
    });
  }, [stage]);

  return (
    <section
      className="relative border-b border-white/5 overflow-hidden"
      style={{ background: '#080608' }}
    >
      {/* Radial ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <motion.div
          className="absolute rounded-full blur-[180px]"
          style={{
            width: 700, height: 700, top: '-20%', left: '50%', transform: 'translateX(-50%)',
            background: stage.color + '0a', transition: 'background 1s ease',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 pt-24 pb-28">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] mb-6"
              style={{ color: stage.color, transition: 'color 0.5s ease' }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full" style={{ background: stage.color, transition: 'background 0.5s ease' }} />
              Call Lifecycle
            </span>
            <h2 className="text-[40px] md:text-[58px] font-bold text-white leading-[1.04]"
              style={{ letterSpacing: '-0.03em' }}>
              From dial to deal &mdash;<br />
              <span style={{ color: stage.color, transition: 'color 0.5s ease' }}>in under 2 seconds.</span>
            </h2>
            <p className="mt-5 mx-auto max-w-xl text-[15px] leading-relaxed text-neutral-500">
              Every Emaavy call traverses 8 precision-engineered stages. Here&apos;s exactly what happens &mdash; millisecond by millisecond.
            </p>
          </motion.div>
        </div>

        {/* Stage pill selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {STAGES.map((s, i) => {
            const isActive = i === activeIdx;
            const isPast = i < activeIdx;
            return (
              <motion.button key={s.id} onClick={() => { setActiveIdx(i); setPlaying(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-300"
                style={{
                  background: isActive ? s.color + '22' : isPast ? '#ffffff06' : 'transparent',
                  border: `1px solid ${isActive ? s.color + '50' : '#ffffff08'}`,
                  color: isActive ? s.color : isPast ? '#4b5563' : '#374151',
                }}
                whileHover={{ scale: 1.04 }}
              >
                <span className="font-mono text-[9px]">{String(i + 1).padStart(2, '0')}</span>
                {s.label}
              </motion.button>
            );
          })}
        </div>

        {/* Progress pipeline track */}
        <PipelineTrack activeIndex={activeIdx} total={STAGES.length} />

        {/* Main content */}
        <div className="grid grid-cols-12 gap-5 mt-8">

          {/* LEFT: Stage detail card */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-5">

            <AnimatePresence mode="wait">
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl overflow-hidden"
                style={{ background: '#0d0d12', border: `1px solid ${stage.border}` }}
              >
                {/* Card top bar */}
                <div className="flex items-center justify-between px-7 py-4 border-b"
                  style={{ borderColor: stage.border, background: stage.dim }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: stage.color + '20', border: `1px solid ${stage.color}30`, color: stage.color }}>
                      <div className="w-5 h-5">{stage.icon}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-[16px] font-bold text-white">{stage.label}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: stage.color + '18', color: stage.color, border: `1px solid ${stage.color}28` }}>
                          {stage.phase}
                        </span>
                      </div>
                      <p className="text-[11px] mt-0.5" style={{ color: stage.color + 'aa' }}>{stage.sublabel}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[22px] font-bold font-mono" style={{ color: stage.color }}>{stage.time}</p>
                    <p className="text-[10px] text-neutral-600">into call</p>
                  </div>
                </div>

                {/* Stage description */}
                <div className="px-7 py-5 border-b" style={{ borderColor: '#ffffff08' }}>
                  <p className="text-[14px] leading-[1.9] text-neutral-400">{stage.detail}</p>
                </div>

                {/* Metrics + tech log row */}
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {/* Metrics */}
                  <div className="px-7 py-5" style={{ borderRight: '1px solid #ffffff08' }}>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-4">Stage metrics</p>
                    <div className="space-y-3">
                      {stage.metrics.map((m, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-[12px] text-neutral-500">{m.label}</span>
                          <motion.span
                            initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-[13px] font-semibold font-mono"
                            style={{ color: stage.color }}
                          >
                            {m.val}
                          </motion.span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech log */}
                  <div className="px-7 py-5">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-4">System log</p>
                    <div className="space-y-1.5 font-mono">
                      {stage.tech.map((line, i) => (
                        <motion.div key={i}
                          initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-center gap-2"
                        >
                          <span className="text-[9px]" style={{ color: stage.color + '60' }}>{'>'}</span>
                          <span className="text-[10px] text-neutral-500">{line}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Audio wave - active on STT/TTS/connect stages */}
                {(stage.id === 'stt' || stage.id === 'tts' || stage.id === 'connect') && (
                  <div className="px-7 py-4 border-t" style={{ borderColor: '#ffffff08' }}>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-3">Audio stream</p>
                    <AudioWave color={stage.color} active />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Stage nav row */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => { setActiveIdx(i => Math.max(0, i - 1)); setPlaying(false); }}
                disabled={activeIdx === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium transition-all disabled:opacity-30"
                style={{ background: '#111118', border: '1px solid #1e2235', color: '#94a3b8' }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <button
                onClick={() => setPlaying(p => !p)}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-[12px] font-semibold transition-all"
                style={{ background: stage.color + '18', border: `1px solid ${stage.color}30`, color: stage.color }}
              >
                {playing ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
                    </svg>
                    Pause
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                    Play
                  </>
                )}
              </button>

              <button
                onClick={() => { setActiveIdx(i => Math.min(STAGES.length - 1, i + 1)); setPlaying(false); }}
                disabled={activeIdx === STAGES.length - 1}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium transition-all disabled:opacity-30"
                style={{ background: '#111118', border: '1px solid #1e2235', color: '#94a3b8' }}
              >
                Next
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* RIGHT: Live transcript + stage map */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">

            {/* Live call transcript */}
            <div className="flex-1 rounded-2xl overflow-hidden flex flex-col"
              style={{ background: '#0d0d12', border: '1px solid #1e2235' }}>
              <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#1e2235' }}>
                <span className="text-[12px] font-semibold text-neutral-300">Live Transcript</span>
                <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                  className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-emerald-400">Recording</span>
                </motion.div>
              </div>

              <div className="flex-1 p-5 space-y-4 min-h-[200px]">
                <AnimatePresence>
                  {transcript.length === 0 && (
                    <motion.p initial={{ opacity: 0.4 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }}
                      className="text-[12px] text-neutral-700 italic">
                      Waiting for call to connect...
                    </motion.p>
                  )}
                  {transcript.map((line, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}>
                      <p className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: line.color + 'aa' }}>
                        {line.speaker}
                      </p>
                      <p className="text-[12px] leading-relaxed text-neutral-300">{line.text}</p>
                    </motion.div>
                  ))}
                  {playing && activeIdx >= 3 && activeIdx < 7 && (
                    <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-1 pt-1">
                      {[0, 1, 2].map(i => (
                        <motion.span key={i} className="w-1.5 h-1.5 rounded-full"
                          style={{ background: stage.color + '60' }}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }} />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Stage map */}
            <div className="rounded-2xl overflow-hidden" style={{ background: '#0d0d12', border: '1px solid #1e2235' }}>
              <div className="px-5 py-3.5 border-b" style={{ borderColor: '#1e2235' }}>
                <span className="text-[11px] font-semibold text-neutral-400">All Stages</span>
              </div>
              <div className="p-3 space-y-1">
                {STAGES.map((s, i) => {
                  const isActive = i === activeIdx;
                  const isPast = i < activeIdx;
                  return (
                    <button key={s.id} onClick={() => { setActiveIdx(i); setPlaying(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left"
                      style={{
                        background: isActive ? s.color + '12' : 'transparent',
                        border: `1px solid ${isActive ? s.color + '30' : 'transparent'}`,
                      }}>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: isPast ? s.color + '20' : isActive ? s.color + '25' : '#1e2235' }}>
                        {isPast ? (
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            strokeWidth={3} style={{ color: s.color }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : isActive ? (
                          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
                        ) : (
                          <span className="text-[8px] font-mono text-neutral-700">{i + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium truncate"
                          style={{ color: isActive ? '#fff' : isPast ? '#6b7280' : '#374151' }}>
                          {s.label}
                        </p>
                      </div>
                      <span className="text-[9px] font-mono shrink-0"
                        style={{ color: isActive ? s.color : '#374151' }}>{s.time}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom outcome stats (shown after final stage) */}
        <AnimatePresence>
          {activeIdx === STAGES.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 rounded-2xl grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 overflow-hidden"
              style={{ border: '1px solid #4ade8030', background: '#4ade8008' }}
            >
              {[
                { label: 'Total call duration', val: '3m 22s', color: '#4ade80' },
                { label: 'End-to-end latency', val: '<500ms', color: '#38bdf8' },
                { label: 'Meeting outcome', val: 'Booked', color: '#a78bfa' },
                { label: 'CRM fields updated', val: '14 fields', color: '#f59e0b' },
              ].map((s, i) => (
                <div key={i} className="px-8 py-5"
                  style={{ borderRight: i < 3 ? '1px solid #4ade8015' : 'none' }}>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-2">{s.label}</p>
                  <p className="text-[22px] font-bold font-mono" style={{ color: s.color }}>{s.val}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
