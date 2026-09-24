'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does DocFin guarantee 0% hallucinations on financial figures?',
      a: 'Unlike generic LLMs that synthesize plausible numbers from memory, DocFin uses a deterministic Layout-Aware OCR Tensor. Every number, percentage, and date displayed in the UI is tied to an immutable spatial bounding box coordinate on the original document.'
    },
    {
      q: 'Can DocFin process multi-column bank statements and blurred scans?',
      a: 'Yes. DocFin pre-processes scans with adaptive binarization, skew correction, and column-aware boundary parsing. It preserves debit vs. credit balance alignments even on complex 50-page statements.'
    },
    {
      q: 'How does the automated RBI fee dispute drafting work?',
      a: 'When DocFin detects disputable charges (such as non-consensual SMS alert hikes or unfair balance-dip penalties), it cites the exact Reserve Bank of India Charter of Customer Rights clause and auto-populates a formal waiver request letter.'
    },
    {
      q: 'Is our corporate data used to train any AI models?',
      a: 'Never. DocFin enforces a zero-retention contract. Your documents, extracted tables, and chat conversations are processed in stateless RAM partitions and stored only in your private workspace.'
    }
  ];

  return (
    <section id="faq" className="py-28 sm:py-36 border-t border-slate-200/80 dark:border-white/10 select-none bg-[var(--bg-canvas)] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-serif text-slate-900 dark:text-white tracking-tight mt-2 mb-6 font-normal">
            Clarity on Every Detail
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto">
            Everything you need to know about precision, compliance, and document intelligence.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-3xl bg-white dark:bg-[#0E121A] border border-slate-200/90 dark:border-white/10 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg text-slate-900 dark:text-white font-normal"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-blue-600 dark:text-white' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans border-t border-slate-100 dark:border-white/5 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
