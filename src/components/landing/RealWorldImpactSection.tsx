'use client';

import React from 'react';

export default function RealWorldImpactSection() {
  const stats = [
    {
      figure: '60–70%',
      label: 'Banking Value Chain Costs in Manual Review',
      citation: 'McKinsey & Company — Productivity in Financial Ingestion Operations',
      context:
        'Financial institutions and treasury teams spend up to 70% of document review time on manual data extraction, reconciliation, and audit verification.'
    },
    {
      figure: '85%',
      label: 'Discrepancy Reduction via Straight-Through Verification',
      citation: 'McKinsey & Company — Financial Workflow Automation Benchmarks',
      context:
        'Automated spatial OCR verification with coordinate cross-checking catches significantly more fee and covenant discrepancies than manual sampling.'
    },
    {
      figure: '1.8%–3.2%',
      label: 'Operating Margin Lost to Overlooked Invoicing Errors',
      citation: 'OECD Global Financial Operations & Commercial Invoicing Review',
      context:
        'Mid-market enterprises routinely lose between 1.8% and 3.2% of cashflow to un-reconciled tax line items, duplicate billing charges, and unvetted contract penalties.'
    }
  ];

  return (
    <section className="py-24 sm:py-32 border-t border-[#DCE5F0] dark:border-white/10 select-none bg-[var(--bg-canvas)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-serif text-[#101828] dark:text-white tracking-tight mb-4 font-normal">
            Why document efficiency matters
          </h2>
          <p className="text-base text-[#53627A] dark:text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto">
            Document processing overhead documented by leading economic institutions and management consultancies.
          </p>
        </div>

        {/* 3 Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-[#0E121A] border border-[#DCE5F0] dark:border-white/10 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl sm:text-5xl font-serif text-[#101828] dark:text-white mb-3 font-normal">
                  {s.figure}
                </div>
                <h3 className="text-sm font-serif text-[#101828] dark:text-white font-normal mb-2">
                  {s.label}
                </h3>
                <p className="text-xs text-[#53627A] dark:text-slate-400 leading-relaxed mb-6">
                  {s.context}
                </p>
              </div>

              <div className="pt-4 border-t border-[#DCE5F0]/60 dark:border-white/5 text-[10px] text-[#8092A7] font-mono">
                <span className="font-bold text-[#101828] dark:text-slate-300 uppercase block mb-0.5">Source:</span>
                <span className="truncate block">{s.citation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
