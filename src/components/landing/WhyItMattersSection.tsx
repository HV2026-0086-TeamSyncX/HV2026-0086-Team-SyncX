'use client';

import React from 'react';
import { Scale, FileSpreadsheet, ShieldAlert, ReceiptText, ArrowUpRight } from 'lucide-react';

export default function WhyItMattersSection() {
  const problems = [
    {
      icon: Scale,
      color: 'text-rose-500 dark:text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
      title: 'Hidden Contract Liabilities',
      description:
        'Commercial leases, NDAs, and vendor agreements bury strict lock-in periods, auto-renewals, and full deposit forfeiture clauses deep in fine print.',
      stat: '74% of leases contain unflagged penalty clauses'
    },
    {
      icon: FileSpreadsheet,
      color: 'text-blue-500 dark:text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
      title: 'Data Trapped in Static PDFs',
      description:
        'Crucial numbers, multi-page data tables, and performance ledgers are locked inside static documents, requiring hours of error-prone manual re-entry.',
      stat: '5+ hours spent manually transcribing tables per audit'
    },
    {
      icon: ShieldAlert,
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      title: 'Buried Terms & Exclusions',
      description:
        'Insurance schedules, warranty policies, and corporate service level agreements conceal sub-limits, co-pay clauses, and hidden exclusions on page 30+.',
      stat: '42% of claim denials stem from missed policy exclusions'
    },
    {
      icon: ReceiptText,
      color: 'text-emerald-500 dark:text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      title: 'Billing & Surcharge Discrepancies',
      description:
        'Mismatched line items, unannounced banking surcharges, and lost tax credits easily slip past manual review when auditing high-volume paperwork.',
      stat: '₹18,000+ avg. recoverable discrepancy per statement'
    }
  ];

  return (
    <section className="py-28 sm:py-36 border-t border-black/[0.06] dark:border-white/[0.08] select-none bg-[var(--bg-canvas)] relative overflow-hidden transition-colors duration-300">
      {/* Background Subtle Radial Glow */}
      <div className="absolute inset-0 bg-hero-ambient pointer-events-none opacity-50" />
      <div className="absolute inset-0 bg-dot-matrix pointer-events-none opacity-25" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[#64748B] dark:text-slate-400 text-xs font-mono">
            <span>The Reality of Modern Documents</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-[#0F172A] dark:text-white tracking-tight leading-tight font-bold">
            Important details shouldn't be <br className="hidden sm:inline" />
            <span className="text-[#2563EB] dark:text-blue-400">buried in paperwork.</span>
          </h2>

          <p className="text-base text-[#53627A] dark:text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto">
            Complex documents conceal critical commitments, numerical ledgers, and clauses that manual skimming easily overlooks.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-5xl mx-auto">
          {problems.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="group p-8 rounded-3xl bg-white/75 dark:bg-[#0c1017]/85 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${p.bg} ${p.color} border flex items-center justify-center mb-6 transition-transform group-hover:scale-105`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif text-[#0F172A] dark:text-white font-bold mb-2.5">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#53627A] dark:text-slate-400 leading-relaxed font-sans">
                    {p.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#64748B] dark:text-slate-400">
                  <span>{p.stat}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
