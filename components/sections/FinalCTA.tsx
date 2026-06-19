'use client';

/* Final CTA — "Start Building" — dark green bokeh photo bg — exact Vapi style */

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden section-py"
      style={{
        background: 'linear-gradient(150deg, #080d1a 0%, #0d1533 45%, #0a1128 100%)',
      }}
    >
      {/* Indigo/violet bokeh blobs — matches Emaavy logo palette */}
      <div className="pointer-events-none absolute inset-0">
        {/* Primary centre glow — indigo */}
        <div
          className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 65%)', filter: 'blur(110px)' }}
        />
        {/* Top-left accent — violet */}
        <div
          className="absolute -left-20 top-0 h-72 w-72 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 65%)', filter: 'blur(80px)' }}
        />
        {/* Bottom-right accent — cyan-blue */}
        <div
          className="absolute -bottom-10 right-0 h-64 w-64 rounded-full opacity-12"
          style={{ background: 'radial-gradient(circle, #0891b2 0%, transparent 65%)', filter: 'blur(70px)' }}
        />
        {/* Subtle noise grain texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
          }}
        />
      </div>

      <div className="site-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl font-bold text-white sm:text-6xl lg:text-7xl">
            Start Building
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book-demo"
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all"
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              Contact Sales
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-100"
            >
              Sign Up
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
