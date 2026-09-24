'use client';

import React from 'react';
import {
  Scale,
  BarChart3,
  Calendar,
  CreditCard,
  CheckCircle2,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function WhatDocFinFinds() {
  const examples = [
    {
      category: 'Contracts & Legal',
      icon: Scale,
      tag: 'Covenant Radar',
      tagColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      title: 'Deposit forfeiture penalty flagged',
      quote: 'Clause 5.2 stipulates full ₹2,00,000 security deposit forfeiture upon early exit.',
      action: 'Pro-rata counter-clause generated capping liability to 1 month notice rent.'
    },
    {
      category: 'Business & Reports',
      icon: BarChart3,
      tag: 'Executive Synthesis',
      tagColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      title: 'Key benchmark metrics tabulated',
      quote: 'Q4 regional revenue targets grew 24.6% YoY with 18 key metrics synthesized.',
      action: 'Structured executive brief with numerical data tables ready for CSV download.'
    },
    {
      category: 'Deadlines & Terms',
      icon: Calendar,
      tag: 'Milestone Alert',
      tagColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      title: 'Notice period deadline tracked',
      quote: 'Written notice required 60 days prior to lock-in expiry on 14 Sept 2026.',
      action: 'Calendar milestone and formal renewal notice letter drafted automatically.'
    },
    {
      category: 'Finance & Statements',
      icon: CreditCard,
      tag: 'Fee Radar',
      tagColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      title: 'Disputable surcharge identified',
      quote: 'Intraday overdraft penalty (-₹650.00) flagged on bank statement.',
      action: 'Bank dispute refund letter prepared citing regulatory balance rules.'
    },
    {
      category: 'Invoices & Billing',
      icon: FileSpreadsheet,
      tag: 'Line-Item Audit',
      tagColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      title: 'Tax credit & unit rates verified',
      quote: '₹12,870 Integrated GST matched against supplier master record.',
      action: 'Confirmed eligible for 100% direct GSTR-3B input tax credit offset.'
    },
    {
      category: 'Insurance Policies',
      icon: ShieldCheck,
      tag: 'Coverage Audit',
      tagColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
      title: 'Hidden sub-limits & exclusions decoded',
      quote: 'Clause 8.4 caps robotic surgery claims to 20% of base sum insured.',
      action: 'Co-pay clause highlighted with pre-authorization documentation requirements.'
    }
  ];

  return (
    <section id="what-we-find" className="py-28 sm:py-36 border-t border-black/[0.06] dark:border-white/[0.08] select-none bg-[var(--bg-canvas)] relative overflow-hidden transition-colors duration-300">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-hero-ambient pointer-events-none opacity-30" />
      <div className="absolute inset-0 bg-dot-matrix pointer-events-none opacity-20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
            <span>Real-World Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-[#0F172A] dark:text-white tracking-tight leading-tight font-bold">
            What DocFin finds inside <br className="hidden sm:inline" />
            <span className="text-[#2563EB] dark:text-blue-400">your daily paperwork.</span>
          </h2>

          <p className="text-base text-[#53627A] dark:text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto">
            Actionable intelligence extracted from contracts, reports, financial statements, and invoices.
          </p>
        </div>

        {/* 6 Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto">
          {examples.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group p-7 rounded-3xl bg-white/75 dark:bg-[#0c1017]/85 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8092A7]">
                      {item.category}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-serif text-[#0F172A] dark:text-white font-bold mb-3">
                    {item.title}
                  </h3>

                  {/* Quote Snippet Box */}
                  <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs text-[#0F172A] dark:text-slate-300 mb-3 font-sans leading-relaxed">
                    <p className="italic text-[11px] text-[#64748B] dark:text-slate-400 mb-1 font-mono uppercase">
                      Detected In Document:
                    </p>
                    <p className="font-serif">"{item.quote}"</p>
                  </div>
                </div>

                {/* AI Remedy Action */}
                <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[#334155] dark:text-slate-300 leading-snug font-sans">
                    <span className="font-bold text-[#0F172A] dark:text-white">AI Remedy: </span>
                    {item.action}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
