'use client';

import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
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
  const router   = useRouter();
  const pathname = usePathname();

  const open  = () => { if (timerRef.current) clearTimeout(timerRef.current); setIntegOpen(true); };
  const close = () => { timerRef.current = setTimeout(() => setIntegOpen(false), 150); };

  // Close the menu instantly, then handle navigation + smooth scroll to anchor
  const handleMobileNav = useCallback((href: string) => {
    setMobileOpen(false);
    setMobileInteg(false);

    const hashIdx = href.indexOf('#');
    const hash    = hashIdx !== -1 ? href.slice(hashIdx + 1) : '';
    const path    = hashIdx !== -1 ? href.slice(0, hashIdx) : href;
    const isSamePage = path === pathname || path === '';

    if (!hash) {
      router.push(href);
      return;
    }

    if (isSamePage) {
      // Same page — wait two frames so the overlay unmounts, then scroll
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    } else {
      // Different page — navigate (hash in URL triggers native anchor scroll)
      router.push(href);
      // Fallback: scroll after page settles in case element renders after paint
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 700);
    }
  }, [pathname, router]);

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
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg p-2 text-gray-700 lg:hidden"
          >
            {mobileOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer — drops down from navbar, scrollable, closes instantly on tap */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Dim backdrop — tapping it closes the menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-30 bg-black/20 lg:hidden"
              style={{ top: '88px' }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-0 right-0 z-40 bg-white shadow-2xl lg:hidden"
              style={{ top: '88px', maxHeight: 'calc(100dvh - 88px)', overflowY: 'auto', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
            >
              <div className="flex flex-col px-4 py-3 pb-10">

                {/* Nav links */}
                <div className="flex flex-col gap-0.5">

                  <button
                    onClick={() => handleMobileNav('/platform')}
                    className="flex min-h-[44px] w-full items-center rounded-xl px-4 py-3 text-left text-[15px] font-medium text-gray-800 transition-colors hover:bg-gray-50 active:bg-gray-100"
                  >
                    Platform
                  </button>

                  {NAV_LINKS.slice(1, 4).map((l) => (
                    <button
                      key={l.href}
                      onClick={() => handleMobileNav(l.href)}
                      className="flex min-h-[44px] w-full items-center rounded-xl px-4 py-3 text-left text-[15px] font-medium text-gray-800 transition-colors hover:bg-gray-50 active:bg-gray-100"
                    >
                      {l.label}
                    </button>
                  ))}

                  {/* Integrations accordion */}
                  <button
                    onClick={() => setMobileInteg(!mobileInteg)}
                    className="flex min-h-[44px] w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium text-gray-800 transition-colors hover:bg-gray-50 active:bg-gray-100"
                  >
                    Integrations
                    <HiChevronDown className={cn('h-4 w-4 text-gray-500 transition-transform duration-200', mobileInteg && 'rotate-180')} />
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileInteg && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="ml-4 mb-1 space-y-0.5 border-l-2 border-gray-100 pl-3">
                          {INTEGRATION_CATEGORIES.map((cat) => {
                            const Icon = ICONS[cat.icon as keyof typeof ICONS];
                            return (
                              <button
                                key={cat.href}
                                onClick={() => handleMobileNav(cat.href)}
                                className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-gray-50 active:bg-gray-100"
                              >
                                <Icon className="h-4 w-4 shrink-0 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">{cat.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {NAV_LINKS.slice(4).map((l) => (
                    <button
                      key={l.href}
                      onClick={() => handleMobileNav(l.href)}
                      className="flex min-h-[44px] w-full items-center rounded-xl px-4 py-3 text-left text-[15px] font-medium text-gray-800 transition-colors hover:bg-gray-50 active:bg-gray-100"
                    >
                      {l.label}
                    </button>
                  ))}
                </div>

                <div className="my-4 border-t border-gray-100" />

                {/* CTAs */}
                <div className="flex flex-col gap-3">
                  <button onClick={() => handleMobileNav('/book-demo')} className="btn-black w-full py-3.5 text-center text-sm">
                    Start Building
                  </button>
                  <button onClick={() => handleMobileNav('/book-demo')} className="btn-outline w-full py-3.5 text-center text-sm">
                    Contact Sales
                  </button>
                  <button onClick={() => handleMobileNav('/signup')} className="w-full py-3 text-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-800">
                    Login
                  </button>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
