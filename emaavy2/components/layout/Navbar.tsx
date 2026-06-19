'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled ? 'py-2' : 'py-4',
        )}
      >
        <div className="section-container">
          <nav
            className={cn(
              'flex items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-6',
              scrolled ? 'glass-nav py-2.5 shadow-glass' : 'bg-transparent py-3',
            )}
          >
            <Link href="/" className="relative z-10 flex shrink-0 items-center">
              <Image
                src="/brand/emaavy-logo.svg"
                alt="Emaavy"
                width={140}
                height={28}
                priority
                className={cn(
                  'h-auto w-[120px] transition-all duration-500 sm:w-[140px]',
                  scrolled && 'sm:w-[128px]',
                )}
              />
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-emaavy-secondary transition-colors hover:bg-emaavy-accent hover:text-emaavy-deep"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <Link
                href="#pricing"
                className="text-sm font-medium text-emaavy-bolt transition-colors hover:text-emaavy-deep"
              >
                Start Free
              </Link>
              <Link href="#contact" className="btn-primary px-4 py-2 text-sm">
                Book Demo
              </Link>
            </div>

            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="relative z-10 rounded-lg p-2 text-emaavy-deep lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-full flex-col px-6 pb-8 pt-24">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl px-4 py-3 text-lg font-medium text-emaavy-deep hover:bg-emaavy-accent"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-3">
                <Link href="#contact" onClick={() => setMobileOpen(false)} className="btn-primary w-full py-3 text-center">
                  Book Demo
                </Link>
                <Link href="#pricing" onClick={() => setMobileOpen(false)} className="btn-secondary w-full py-3 text-center">
                  Start Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
