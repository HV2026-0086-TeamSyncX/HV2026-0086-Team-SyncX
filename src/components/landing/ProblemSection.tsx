'use client';

import React from 'react';
import { AlertOctagon, Scale, ShieldAlert, FileSpreadsheet, ArrowRight } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      icon: AlertOctagon,
      title: 'Hidden Surcharges & Intraday Dip Penalties',
      description:
        'Banks silently debit accounts for non-home branch ATM usage, NACH return penalties, and balance dips that violate regulatory charters.',
      metric: '₹4,800/yr',
      submetric: 'Average silent leakage per commercial account'
    },
    {
      icon: Scale,
      title: 'Uncapped Deductions & Lock-In Forfeitures',
      description:
        'Standard lease and vendor agreements bury aggressive lock-in clauses, automatic renewal traps, and uncapped maintenance deductions.',
      metric: '100% Deposit',
      submetric: 'At risk in 68% of unvetted commercial contracts'
    },
    {
      icon: ShieldAlert,
      title: 'Unnoticed Policy Exclusions & High Co-Pay',
      description:
        'Crucial exclusions (e.g. 20% non-network co-pay, specific robotic surgery sub-limits) are buried on page 34 of policy wordings.',
      metric: '20% to 35%',
      submetric: 'Out-of-pocket surprise on cashless claim rejections'
    },
    {
      icon: FileSpreadsheet,
      title: 'Un-reconciled GST Credits & Invoice Errors',
      description:
        'Vendor tax invoices with mismatched GSTINs or orphaned cloud resource line-items slip past manual reviews unnoticed.',
      metric: '1.8% to 3.2%',
      submetric: 'Annual operating cashflow lost to discrepancies'
    }
  ];

  return (
    <section id="problem" className="py-28 sm:py-36 border-t border-slate-200/80 dark:border-white/10 select-none bg-[var(--bg-canvas)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs font-semibold mb-4">
            <span>The Silent Financial Overhead</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-serif text-slate-900 dark:text-white tracking-tight mt-2 mb-6 font-normal">
            Financial documents contain <br className="hidden sm:inline" />
            more than numbers.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto">
            Buried in fine print and 40-page schedules are hidden fees, asymmetric liabilities, and strict compliance traps that manual reviews miss.
          </p>
        </div>

        {/* 4 Problem Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {problems.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0E121A] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-amber-400 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif text-slate-900 dark:text-white font-normal mb-3">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10 flex items-baseline justify-between">
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 dark:text-white">
                    {p.metric}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 max-w-[180px] text-right font-medium">
                    {p.submetric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
