'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiChevronDown } from 'react-icons/hi';
import {
  HiOutlineDevicePhoneMobile, HiOutlineCpuChip,
  HiOutlineMicrophone, HiOutlineSpeakerWave, HiOutlineWrenchScrewdriver,
} from 'react-icons/hi2';
import { NAV_LINKS, INTEGRATION_CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

const ICONS = {
  phone: HiOutlineDevicePhoneMobile, cpu: HiOutlineCpuChip,
  mic: HiOutlineMicrophone, speaker: HiOutlineSpeakerWave, tools: HiOutlineWrenchScrewdriver,
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [integOpen, setIntegOpen]     = useState(false);
  const [mobileInteg, setMobileInteg] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open  = () => { if (timerRef.current) clearTimeout(timerRef.current); setIntegOpen(true); };
  const close = () => { timerRef.current = setTimeout(() => setIntegOpen(false), 150); };

  return (
    <>
      {/* Announcement bar */}
      <div className="announce-bar">
        <span className="hidden sm:inline">Deploy AI voice agents that call, qualify, and close — in under 20 minutes.</span>
        <span className="sm:hidden">AI voice agents. Live in 20 min.</span>
      </div>

      {/* White sticky navbar */}
      <header className="site-nav">
        <div className="site-container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image src="/brand/emaavy-logo.svg" alt="Emaavy" width={130} height={26} priority className="h-auto w-[110px] sm:w-[130px]" />
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-1 lg:flex">
            <Link
              href="/platform"
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              Platform
            </Link>

            {/* Integrations dropdown */}
            <div className="relative" onMouseEnter={open} onMouseLeave={close}>
              <button className={cn('flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                integOpen ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900')}>
                Integrations <HiChevronDown className={cn('h-3.5 w-3.5 transition-transform', integOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {integOpen && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full z-50 mt-1 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg"
                    onMouseEnter={open} onMouseLeave={close}>
                    <div className="p-2">
                      <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Categories</p>
                      {INTEGRATION_CATEGORIES.map((cat) => {
                        const Icon = ICONS[cat.icon as keyof typeof ICONS];
                        return (
                          <Link key={cat.href} href={cat.href} onClick={() => setIntegOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-gray-50">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                              <Icon className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{cat.label}</p>
                              <p className="text-xs text-gray-400">{cat.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* AI Agents, How It Works, Case Studies, Pricing, FAQ */}
            {NAV_LINKS.slice(1).map((l) => (
              <Link key={l.href} href={l.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/signup" className="text-sm font-medium text-gray-600 hover:text-gray-900">Login</Link>
            <Link href="/book-demo" className="btn-black px-5 py-2.5 text-sm">Start Building</Link>

          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg p-2 text-gray-700 lg:hidden">
            {mobileOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white lg:hidden">
            <div className="flex h-full flex-col px-5 pb-8 pt-20">
              <div className="flex flex-col gap-1">
                <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0 }}>
                  <Link href="/platform" onClick={() => setMobileOpen(false)}
                    className="block min-h-[44px] rounded-xl px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-100">
                    Platform
                  </Link>
                </motion.div>

                {NAV_LINKS.slice(1, 4).map((l, i) => (
                  <motion.div key={l.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (i + 1) * 0.04 }}>
                    <Link href={l.href} onClick={() => setMobileOpen(false)}
                      className="block min-h-[44px] rounded-xl px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-100">
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }}>
                  <button onClick={() => setMobileInteg(!mobileInteg)}
                    className="flex min-h-[44px] w-full items-center justify-between rounded-xl px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-100">
                    Integrations <HiChevronDown className={cn('h-4 w-4 transition-transform', mobileInteg && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {mobileInteg && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden">
                        <div className="ml-4 space-y-1 border-l border-gray-200 pl-4">
                          {INTEGRATION_CATEGORIES.map((cat) => {
                            const Icon = ICONS[cat.icon as keyof typeof ICONS];
                            return (
                              <Link key={cat.href} href={cat.href} onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-gray-50">
                                <Icon className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-semibold text-gray-800">{cat.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                {NAV_LINKS.slice(4).map((l, i) => (
                  <motion.div key={l.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (i + 5) * 0.04 }}>
                    <Link href={l.href} onClick={() => setMobileOpen(false)}
                      className="block min-h-[44px] rounded-xl px-4 py-3 text-lg font-medium text-gray-800 hover:bg-gray-100">
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-3">
                <Link href="/book-demo" onClick={() => setMobileOpen(false)} className="btn-black w-full py-3.5 text-center">Start Building</Link>
                <Link href="/book-demo" onClick={() => setMobileOpen(false)} className="btn-outline w-full py-3.5 text-center">Contact Sales</Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)} className="w-full py-3 text-center text-sm font-medium text-gray-500 hover:text-gray-800">Login</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
