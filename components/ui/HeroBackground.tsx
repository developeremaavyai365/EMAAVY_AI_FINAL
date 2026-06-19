'use client';

/**
 * HeroBackground — full-screen animated background for the hero section.
 *
 * Layer stack (bottom → top):
 *   1. Deep dark base
 *   2. Looping ambient video (full-bleed, muted, autoplay)
 *   3. Dark vignette over video edges
 *   4. Four Framer Motion gradient orbs (mix-blend-mode: screen) — slow ambient color shifts
 *   5. Dot-grid texture
 *   6. Laser-glow top border (multi-color scanning line)
 *   7. Canvas grain noise
 *   8. [children] — z-10, rendered above everything
 */

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────────
   VIDEO SOURCE — swap this URL for any looping ambient/AI/abstract video
   ───────────────────────────────────────────────────────────────────────────── */
const VIDEO_SRC = '/hero.mp4';

/* ─────────────────────────────────────────────────────────────────────────────
   GRADIENT ORB DEFINITIONS
   Each orb is a large blurred radial gradient that drifts independently.
   mix-blend-mode: screen means the video colours + orb colours add together.
   ───────────────────────────────────────────────────────────────────────────── */
const ORBS: {
  style: React.CSSProperties;
  animate: { x: number[]; y: number[]; scale: number[] };
  duration: number;
}[] = [
  {
    style: {
      top: '-12%',
      right: '-6%',
      width: '58vw',
      height: '58vw',
      background:
        'radial-gradient(circle at 40% 40%, rgba(20,184,166,0.55) 0%, rgba(6,182,212,0.25) 45%, transparent 70%)',
      filter: 'blur(52px)',
    },
    animate: { x: [0, 60, -28, 0], y: [0, -40, 50, 0], scale: [1, 1.09, 0.95, 1] },
    duration: 18,
  },
  {
    style: {
      bottom: '-6%',
      left: '-10%',
      width: '52vw',
      height: '52vw',
      background:
        'radial-gradient(circle at 55% 55%, rgba(99,102,241,0.50) 0%, rgba(79,70,229,0.22) 45%, transparent 70%)',
      filter: 'blur(60px)',
    },
    animate: { x: [0, -70, 40, 0], y: [0, 35, -60, 0], scale: [1, 1.06, 1.12, 1] },
    duration: 22,
  },
  {
    style: {
      top: '18%',
      left: '28%',
      width: '42vw',
      height: '42vw',
      background:
        'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.40) 0%, rgba(139,92,246,0.15) 50%, transparent 70%)',
      filter: 'blur(68px)',
    },
    animate: { x: [0, 48, -20, 0], y: [0, 55, -30, 0], scale: [1, 0.94, 1.07, 1] },
    duration: 26,
  },
  {
    style: {
      top: '38%',
      right: '8%',
      width: '36vw',
      height: '36vw',
      background:
        'radial-gradient(circle at 50% 40%, rgba(56,189,248,0.45) 0%, rgba(14,165,233,0.18) 50%, transparent 70%)',
      filter: 'blur(46px)',
    },
    animate: { x: [0, -42, 62, 0], y: [0, -55, 22, 0], scale: [1, 1.13, 0.92, 1] },
    duration: 20,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   LASER BORDER — the multi-colour neon scanning line at the top edge
   ───────────────────────────────────────────────────────────────────────────── */
const LASER_GRADIENT =
  'linear-gradient(90deg, transparent 0%, #06b6d4 8%, #818cf8 22%, #a78bfa 38%, #f59e0b 54%, #ec4899 68%, #22d3ee 82%, transparent 100%)';

/* ─────────────────────────────────────────────────────────────────────────────
   GRAIN OVERLAY — single-draw canvas noise for tactile texture
   ───────────────────────────────────────────────────────────────────────────── */
function GrainOverlay() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const SIZE = 256;
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext('2d')!;
    const img = ctx.createImageData(SIZE, SIZE);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 16;
    }
    ctx.putImageData(img, 0, 0);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        imageRendering: 'pixelated',
        backgroundRepeat: 'repeat',
        opacity: 0.32,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────────────────── */
interface HeroBackgroundProps {
  children?: React.ReactNode;
}

export default function HeroBackground({ children }: HeroBackgroundProps) {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: '#04060c' }}
    >

      {/* ── Layer 1: Looping ambient video ─────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <video
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0.55 }}
        />
      </div>

      {/* ── Layer 2: Dark vignette — keeps edges and corners dark ──────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 110% 110% at 50% 50%, transparent 25%, rgba(4,6,12,0.55) 60%, rgba(4,6,12,0.90) 100%)',
        }}
      />

      {/* ── Layer 3: Gradient orb mesh (screen blend over video) ───────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ mixBlendMode: 'screen', opacity: 0.55 }}
      >
        {ORBS.map((orb, i) => (
          <motion.div
            key={i}
            aria-hidden
            className="absolute rounded-full will-change-transform"
            style={orb.style}
            animate={orb.animate}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.33, 0.66, 1],
            }}
          />
        ))}
      </div>

      {/* ── Layer 4: Dot-grid depth texture ────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.75) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
          opacity: 0.04,
        }}
      />

      {/* ── Layer 5: Laser-glow top border ─────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-20">

        {/* Hard 2px crisp laser line — colour scans across */}
        <motion.div
          className="h-[2px] w-full"
          style={{
            background: LASER_GRADIENT,
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        {/* Blurred bloom just below the line */}
        <motion.div
          className="h-[7px] w-full -translate-y-[2px]"
          style={{
            background: LASER_GRADIENT,
            backgroundSize: '200% 100%',
            filter: 'blur(7px)',
            opacity: 0.70,
          }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        {/* Wide soft halo that bleeds 80px downward */}
        <motion.div
          className="h-20 w-full -translate-y-[9px]"
          style={{
            background:
              'linear-gradient(180deg, rgba(6,182,212,0.22) 0%, rgba(139,92,246,0.12) 40%, transparent 100%)',
            filter: 'blur(14px)',
          }}
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Scanning bright hot-spot capsule — slides left → right */}
        <motion.div
          className="absolute top-0 h-[3px] w-56 rounded-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.98), rgba(6,182,212,0.95), transparent)',
            filter: 'blur(3px)',
            boxShadow:
              '0 0 18px 5px rgba(6,182,212,0.75), 0 0 36px 10px rgba(139,92,246,0.45)',
          }}
          animate={{ left: ['-8%', '108%'] }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 0.8,
          }}
        />

        {/* Secondary slower hot-spot — opposite direction, different colour */}
        <motion.div
          className="absolute top-0 h-[2px] w-32 rounded-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(245,158,11,0.9), rgba(236,72,153,0.85), transparent)',
            filter: 'blur(4px)',
            boxShadow:
              '0 0 14px 4px rgba(245,158,11,0.60), 0 0 28px 8px rgba(236,72,153,0.35)',
          }}
          animate={{ left: ['108%', '-8%'] }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 1.2,
          }}
        />
      </div>

      {/* ── Layer 6: Grain texture ──────────────────────────────────────────── */}
      <GrainOverlay />

      {/* ── Content slot — sits above all background layers ─────────────────── */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
