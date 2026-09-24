'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileText,
  CreditCard,
  ShieldCheck,
  Receipt,
  ArrowRight,
  BookOpen,
  Scale,
  FileSpreadsheet,
  Film
} from 'lucide-react';

export default function DocumentTypesSection() {
  const types = [
    {
      icon: CreditCard,
      color: 'text-emerald-500 dark:text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      title: 'Bank Statements & Ledgers',
      description: 'Dissects transaction categories, summarizes spending trends, flags unannounced bank fees, and drafts regulatory dispute letters.',
      lensParam: 'finance'
    },
    {
      icon: Scale,
      color: 'text-rose-500 dark:text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
      title: 'Legal Contracts & Leases',
      description: 'Translates dense legal jargon, maps obligations and notice deadlines, and flags high-risk indemnity and deposit forfeiture clauses.',
      lensParam: 'legal'
    },
    {
      icon: BookOpen,
      color: 'text-purple-500 dark:text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
      title: 'Academic Papers & Research',
      description: 'Synthesizes novel methodologies, extracts empirical benchmark tables, explains complex theorems, and parses academic citations.',
      lensParam: 'academic'
    },
    {
      icon: ShieldCheck,
      color: 'text-blue-500 dark:text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
      title: 'Insurance Policies & Schedules',
      description: 'Decodes covered versus excluded treatments, highlights hidden sub-limits and co-pay requirements, and lists claim checklists.',
      lensParam: 'insurance'
    },
    {
      icon: FileSpreadsheet,
      color: 'text-cyan-500 dark:text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
      title: 'Spreadsheets, Data & Invoices',
      description: 'Extracts multi-column tables, verifies supplier tax identifiers, calculates eligible ITC deductions, and identifies rate discrepancies.',
      lensParam: 'billing'
    },
    {
      icon: Film,
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      title: 'Photos, Receipts & Video Files',
      description: 'Analyzes mobile snapshots, whiteboard diagrams, receipts, and video recordings using advanced multimodal vision models.',
      lensParam: 'overall'
    }
  ];

  return (
    <section id="document-types" className="py-28 sm:py-36 border-t border-black/[0.06] dark:border-white/[0.08] select-none bg-[var(--bg-canvas)] relative overflow-hidden transition-colors duration-300">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-hero-ambient pointer-events-none opacity-30" />
      <div className="absolute inset-0 bg-dot-matrix pointer-events-none opacity-20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-medium">
            <span>Multimodal Intelligence</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-[#0F172A] dark:text-white tracking-tight leading-tight font-bold">
            Supported document formats
          </h2>

          <p className="text-base text-[#53627A] dark:text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto">
            Configured with specialized domain extraction models for every document and media type.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto">
          {types.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div
                key={idx}
                className="group p-8 rounded-3xl bg-white/75 dark:bg-[#0c1017]/85 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${t.bg} ${t.color} border flex items-center justify-center mb-6 transition-transform group-hover:scale-105`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-serif text-[#0F172A] dark:text-white font-bold mb-2.5">
                    {t.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#53627A] dark:text-slate-400 leading-relaxed mb-6 font-sans">
                    {t.description}
                  </p>
                </div>

                <Link
                  href={`/dashboard?lens=${t.lensParam}`}
                  className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-xs font-semibold text-[#2563EB] dark:text-blue-400 group-hover:text-blue-600 transition-colors"
                >
                  <span>Launch {t.title.split(' ')[0]} Lens</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
