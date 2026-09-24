'use client';

import React from 'react';
import Link from 'next/link';
import {
  CreditCard,
  Scale,
  ShieldCheck,
  Receipt,
  Building2,
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

export default function LensShowcase() {
  const lenses = [
    {
      id: 'finance',
      title: 'Commercial Banking & Cashflow Statements',
      eyebrow: 'LENS 01',
      description:
        'Dissects transactions into spend categories, pinpoints non-consensual overdraft fees, drafts RBI dispute letters, and projects flexi-FD auto-sweep returns.',
      badge: 'Cashflow Radar',
      bullets: ['RBI fee dispute drafting', '7.15% auto-sweep FD yield model', 'Idle recurring auto-debit radar'],
      link: '/dashboard?lens=finance'
    },
    {
      id: 'legal',
      title: 'Commercial Leases & Vendor Contracts',
      eyebrow: 'LENS 02',
      description:
        'Audits lock-in clauses, uncapped repainting charges, unilateral indemnities, and jurisdiction liabilities with instant tenant counter-clause drafting.',
      badge: 'Covenant Audit',
      bullets: ['Clause 5.2 deposit forfeiture alert', 'Counter-clause generation', 'Notice & penalty timeline timeline'],
      link: '/dashboard?lens=legal'
    },
    {
      id: 'insurance',
      title: 'Insurance & Mediclaim Policy Schedules',
      eyebrow: 'LENS 03',
      description:
        'Renders green/red Covered vs. Excluded matrices, flags 20% non-network hospital co-pay limits, and compiles 4-step emergency cashless claim checklists.',
      badge: 'Coverage Matrix',
      bullets: ['Covered vs Excluded matrix', '20% non-network co-pay alert', '4-step cashless claim checklist'],
      link: '/dashboard?lens=insurance'
    },
    {
      id: 'billing',
      title: 'Corporate Tax Invoices & B2B Billing',
      eyebrow: 'LENS 04',
      description:
        'Validates GSTIN matches, reconciles CGST/SGST/IGST tax breakdowns, flags unattached cloud volume storage waste, and computes Input Tax Credit eligibility.',
      badge: 'Tax Reconciliation',
      bullets: ['GST ITC eligibility engine', 'Cloud storage waste detector', 'Tabular CSV ledger export'],
      link: '/dashboard?lens=billing'
    },
    {
      id: 'overall',
      title: 'Commercial Lending & Working Capital',
      eyebrow: 'LENS 05',
      description:
        'Synthesizes multi-disciplinary sanction letters, covenants, DSCR debt-service ratios, and generates 1-click executive audit memos for investment committees.',
      badge: 'Executive Brief',
      bullets: ['1.35x DSCR covenant monitoring', '1-click executive audit memo', 'Cross-table forensic synthesis'],
      link: '/dashboard?lens=overall'
    }
  ];

  return (
    <section id="capabilities" className="py-28 sm:py-36 border-t border-slate-200/80 dark:border-white/10 select-none bg-[var(--bg-canvas)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs font-semibold mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Specialized Domain Lenses</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-serif text-slate-900 dark:text-white tracking-tight mt-2 mb-6 font-normal">
            Five Purpose-Built Financial Lenses
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto">
            DocFin switches specialized heuristic models depending on whether you upload a bank statement, commercial lease, mediclaim schedule, or corporate invoice.
          </p>
        </div>

        {/* 5 Lens Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {lenses.map((lens, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl bg-white dark:bg-[#0E121A] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-slate-500">
                    {lens.eyebrow}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 dark:bg-white/10 dark:text-slate-200 border border-blue-200 dark:border-white/10">
                    {lens.badge}
                  </span>
                </div>

                <h3 className="text-xl font-serif text-slate-900 dark:text-white font-normal mb-3">
                  {lens.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {lens.description}
                </p>

                <div className="space-y-2 mb-8">
                  {lens.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-300 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={lens.link}
                className="w-full py-3 px-4 rounded-full bg-slate-50 dark:bg-white/5 hover:bg-[#0F172A] hover:text-white dark:hover:bg-white dark:hover:text-[#07090E] text-slate-900 dark:text-white text-xs font-bold border border-slate-200 dark:border-white/10 transition-all flex items-center justify-center gap-2"
              >
                <span>Launch {lens.badge}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
