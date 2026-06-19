'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FadeContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  blur?: boolean;
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
}

export default function FadeContent({
  children,
  blur = false,
  duration = 0.8,
  delay = 0,
  threshold = 0.15,
  className = '',
  ...props
}: FadeContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const startPct = (1 - threshold) * 100;

    gsap.set(el, {
      autoAlpha: 0,
      filter: blur ? 'blur(8px)' : 'blur(0px)',
    });

    const tl = gsap.timeline({ paused: true, delay });
    tl.to(el, {
      autoAlpha: 1,
      filter: 'blur(0px)',
      duration,
      ease: 'power2.out',
    });

    const st = ScrollTrigger.create({
      trigger: el,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => tl.play(),
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, [blur, duration, delay, threshold]);

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
}
