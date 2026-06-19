'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi2';
import { AnimatedContent } from '@/components/reactbits';
import SectionHeader from '@/components/ui/SectionHeader';
import { FAQ_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding">
      <div className="section-container">
        <AnimatedContent>
          <SectionHeader
            label="FAQ"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about Emaavy. Can't find an answer? Contact our team."
          />
        </AnimatedContent>

        <AnimatedContent className="mx-auto mt-12 max-w-3xl">
          <div className="divide-y divide-emaavy-border rounded-2xl border border-emaavy-border bg-white">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-emaavy-surface/50"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-emaavy-deep">{item.question}</span>
                    <HiChevronDown
                      className={cn(
                        'h-5 w-5 shrink-0 text-emaavy-bolt transition-transform duration-300',
                        isOpen && 'rotate-180',
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-emaavy-secondary">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
