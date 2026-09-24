'use client';

import React from 'react';
import {
  Briefcase,
  Scale,
  Building2,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function WhoItIsForSection() {
  const personas = [
    {
      role: 'Chartered Accountants & Financial Auditors',
      icon: Briefcase,
      badge: 'Finance & Taxation',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      description:
        'Rapidly reconcile multi-bank statement batches, detect hidden bank surcharges, extract GSTR-3B tax credit discrepancies, and draft formal adjustment letters in seconds.',
      benefits: [
        'Instant statement-to-CSV matrix extraction',
        'Automatic surcharge & fee leakage radar',
        'Direct GST ITC credit eligibility checks'
      ]
    },
    {
      role: 'Corporate Legal Counsel & Executives',
      icon: Scale,
      badge: 'Contracts & Governance',
      badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      description:
        'Audit 50+ page commercial leases, vendor agreements, and NDAs. Pinpoint non-standard indemnities, auto-renewals, deposit forfeiture clauses, and uncapped liabilities.',
      benefits: [
        'Fine-print penalty & lock-in radar',
        'Automated pro-rata counter-clause generator',
        'Exact page coordinate verification citations'
      ]
    },
    {
      role: 'SMB Owners & Operations Leads',
      icon: Building2,
      badge: 'Operations & Procurement',
      badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      description:
        'Eliminate hours of manual invoice verification. Compare supplier unit rates against past purchase orders, check payment terms, and understand complex policy schedules.',
      benefits: [
        '30-second plain-English executive summaries',
        'Supplier unit-rate and GST ledger audits',
        'Actionable checklist with priority deadlines'
      ]
    },
    {
      role: 'Researchers & Academic Analysts',
      icon: GraduationCap,
      badge: 'Research & Engineering',
      badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      description:
        'Critique complex ML/AI research papers, synthesize empirical statistical results, extract benchmark datasets (e.g. BLEU/WMT), and evaluate theoretical frameworks.',
      benefits: [
        'Deconstructed methodology & dataset schemas',
        'Empirical result extraction & citation chains',
        'Domain-specific analytical questions'
      ]
    }
  ];

  return (
    <section id="who-it-is-for" className="py-28 sm:py-36 border-t border-black/[0.06] dark:border-white/[0.08] select-none bg-[var(--bg-canvas)] relative overflow-hidden transition-colors duration-300">
      {/* Background Decorative Motifs */}
      <div className="absolute inset-0 bg-hero-ambient pointer-events-none opacity-40" />
      <div className="absolute inset-0 bg-dot-matrix pointer-events-none opacity-20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 dark:bg-purple-400/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Target Audience & Personas</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-[#0F172A] dark:text-white tracking-tight leading-tight font-bold">
            Engineered for professionals who <br className="hidden sm:inline" />
            <span className="text-[#2563EB] dark:text-blue-400">deal with high-stakes paperwork.</span>
          </h2>

          <p className="text-base text-[#53627A] dark:text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto">
            From chartered accountants and corporate counsel to operations leads and academic researchers.
          </p>
        </div>

        {/* 4 Persona Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-5xl mx-auto">
          {personas.map((persona, idx) => {
            const Icon = persona.icon;
            return (
              <div
                key={idx}
                className="group p-8 rounded-3xl glass-card border border-black/[0.08] dark:border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.4)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-white/5 border border-blue-500/20 dark:border-white/10 flex items-center justify-center text-[#2563EB] dark:text-blue-400 transition-transform group-hover:scale-105">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border ${persona.badgeColor}`}>
                      {persona.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif text-[#0F172A] dark:text-white font-bold mb-2.5">
                    {persona.role}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#53627A] dark:text-slate-400 leading-relaxed mb-6 font-sans">
                    {persona.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                    {persona.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-xs text-[#334155] dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Workspace CTA Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-emerald-600/10 border border-blue-500/20 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base font-serif font-bold text-[#0F172A] dark:text-white">
              Ready to automate your document audits?
            </h4>
            <p className="text-xs text-[#53627A] dark:text-slate-400 mt-0.5 font-sans">
              Test pre-loaded financial statements, commercial leases, and research papers with zero setup.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="glass-button-emerald px-6 py-2.5 rounded-full text-white text-xs font-bold flex items-center gap-2 flex-shrink-0 touch-target"
          >
            <span>Launch Free Audit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
