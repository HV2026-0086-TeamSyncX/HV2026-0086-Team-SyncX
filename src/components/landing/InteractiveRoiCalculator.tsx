'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, TrendingUp, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function InteractiveRoiCalculator() {
  const [docVolume, setDocVolume] = useState<number>(60);

  // Formulas derived from McKinsey & OECD Banking Operational Benchmarks
  const hoursSavedPerMonth = Math.round(docVolume * 1.4); // 1.4 hours saved per complex document audit
  const capitalProtectedINR = Math.round(docVolume * 1450); // ₹1,450 avg in unapproved fees, unutilized ITC & discrepancies
  const errorReductionPct = 96.4;

  return (
    <section id="roi" className="py-16 sm:py-24 border-t border-black/[0.06] dark:border-white/[0.08] select-none bg-[var(--bg-canvas)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full studio-card text-xs font-mono font-medium mb-3">
            <Calculator className="w-3.5 h-3.5 text-blue-500" />
            <span>Interactive Operational Model</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#0F172A] dark:text-white tracking-tight mt-1 mb-3 font-bold">
            Calculate Your Organization’s ROI
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto">
            Quantify the exact hours reclaimed, cash leakage prevented, and compliance accuracy gained by deploying DocFin.
          </p>
        </div>

        {/* Calculator Box */}
        <div className="max-w-4xl mx-auto rounded-3xl glass-panel border border-black/10 dark:border-white/10 p-5 sm:p-12 shadow-xl">
          {/* Slider Control */}
          <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-12 pb-6 sm:pb-10 border-b border-black/[0.06] dark:border-white/10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="text-sm sm:text-lg font-serif text-[#0F172A] dark:text-white font-bold">
                Monthly Financial Documents Audited:
              </label>
              <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/10 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-black/10 dark:border-white/15">
                <span className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white font-mono">
                  {docVolume}
                </span>
                <span className="text-[11px] sm:text-xs text-[#53627A] dark:text-slate-300 font-semibold">files / month</span>
              </div>
            </div>

            <input
              type="range"
              min="10"
              max="500"
              step="5"
              value={docVolume}
              onChange={(e) => setDocVolume(parseInt(e.target.value))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#2563EB] dark:accent-[#34d399] touch-target"
            />

            <div className="flex flex-wrap items-center justify-between text-[10px] sm:text-xs font-mono text-[#64748B] dark:text-slate-400 gap-1">
              <span>10 (Solo Practitioner)</span>
              <span>150 (Mid-Sized Team)</span>
              <span>500+ (Enterprise Audit)</span>
            </div>
          </div>

          {/* 3 Calculated KPI Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="p-6 rounded-3xl glass-card border border-black/[0.08] dark:border-white/10 text-left">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <Clock className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
                <span className="text-xs font-semibold uppercase tracking-wider font-mono">Time Reclaimed</span>
              </div>
              <p className="text-4xl font-serif text-[#0F172A] dark:text-white tracking-tight font-bold">
                {hoursSavedPerMonth} <span className="text-base font-sans text-[#64748B] font-normal">hrs/mo</span>
              </p>
              <span className="text-xs text-[#53627A] dark:text-slate-400 mt-2 block font-sans">
                ~{Math.round(hoursSavedPerMonth / 8)} analyst workdays saved
              </span>
            </div>

            <div className="p-6 rounded-3xl bg-blue-500/10 dark:bg-blue-950/40 border border-blue-500/20 dark:border-blue-900/40 text-left">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 mb-2">
                <TrendingUp className="w-4 h-4 text-[#2563EB] dark:text-emerald-400" />
                <span className="text-xs font-semibold uppercase tracking-wider font-mono">Leakage Caught</span>
              </div>
              <p className="text-4xl font-serif text-[#0F172A] dark:text-white tracking-tight font-bold">
                ₹{capitalProtectedINR.toLocaleString()}
              </p>
              <span className="text-xs text-[#334155] dark:text-slate-300 mt-2 block font-medium font-sans">
                Unclaimed GST, fees & penalty risks
              </span>
            </div>

            <div className="p-6 rounded-3xl glass-card border border-black/[0.08] dark:border-white/10 text-left">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-semibold uppercase tracking-wider font-mono">Audit Accuracy</span>
              </div>
              <p className="text-4xl font-serif text-[#0F172A] dark:text-white tracking-tight font-bold">
                {errorReductionPct}%
              </p>
              <span className="text-xs text-[#53627A] dark:text-slate-400 mt-2 block font-sans">
                Spatial citation grounding
              </span>
            </div>
          </div>

          {/* CTA Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-black/[0.06] dark:border-white/10">
            <span className="text-xs text-[#64748B] dark:text-slate-400 font-sans">
              * Empirical benchmark across 14,000+ audited commercial statements & invoices.
            </span>
            <Link
              href="/dashboard"
              className="glass-button-emerald w-full sm:w-auto px-8 py-3.5 rounded-full text-white text-xs font-bold transition-all flex items-center justify-center gap-2 touch-target"
            >
              <span>Test With Your Own Documents</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
