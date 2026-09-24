'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Scale,
  CreditCard,
  BookOpen,
  FileSpreadsheet,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Code2,
  FileText,
  TrendingUp,
  Cpu,
  Layers,
  Search,
  Download,
  Terminal,
  FileCheck2,
  Lock
} from 'lucide-react';

export default function StudioBentoGrid() {
  const [activePersona, setActivePersona] = useState<'auditor' | 'counsel' | 'founder' | 'researcher'>('auditor');
  const [tableCopied, setTableCopied] = useState(false);

  const personas = {
    auditor: {
      title: 'Chartered Accountants & Auditors',
      tag: 'Finance & Taxation',
      icon: CreditCard,
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      description: 'Reconcile multi-bank statement batches, spot intraday overdraft surcharges, verify GSTR-3B tax credit eligibility, and export clean CSV tables.',
      output: 'Disputable overdraft penalty (-₹650) flagged on SBI statement. Dispute refund letter drafted citing RBI master circular.'
    },
    counsel: {
      title: 'Corporate Legal Counsel & Law Firms',
      tag: 'Contracts & Governance',
      icon: Scale,
      badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      description: 'Audit 50+ page commercial leases and NDAs. Catch unflagged deposit forfeiture clauses, uncapped indemnities, and notice period traps.',
      output: 'Clause 5.2 forfeits entire ₹2,00,000 security deposit. Pro-rata counter-clause generated capping liability to 1 month rent.'
    },
    founder: {
      title: 'SMB Founders & Operations Leads',
      tag: 'Operations & Invoices',
      icon: FileSpreadsheet,
      badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      description: 'Audit supplier invoices, verify GSTIN rates against purchase orders, and summarize 40-page policy schedules into plain English.',
      output: 'Matched ₹12,870 Integrated GST against vendor ledger. 100% eligible for immediate ITC deduction.'
    },
    researcher: {
      title: 'Researchers & Technical Analysts',
      tag: 'Research & Benchmarks',
      icon: BookOpen,
      badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      description: 'Deconstruct complex ML/AI research papers, extract empirical benchmark tables (WMT/BLEU), and evaluate theoretical frameworks.',
      output: 'Table 3.1 BLEU score matrix extracted (Base: 27.3, Big: 28.4). Verified against Transformer architecture baseline.'
    }
  };

  const currentPersona = personas[activePersona];

  const handleCopyTable = () => {
    setTableCopied(true);
    setTimeout(() => setTableCopied(false), 2000);
  };

  return (
    <section id="capabilities" className="py-20 sm:py-28 select-none bg-[var(--bg-canvas)] relative overflow-hidden transition-colors duration-300">
      {/* Background Studio Grid */}
      <div className="absolute inset-0 bg-studio-grid pointer-events-none opacity-60 dark:opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_60%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-medium">
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture & Capabilities</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif text-[#0F172A] dark:text-white tracking-tight font-bold">
            High-precision intelligence. <br className="hidden sm:inline" />
            <span className="text-[#2563EB] dark:text-blue-400">Engineered for clarity.</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#53627A] dark:text-slate-400 font-sans max-w-lg mx-auto leading-relaxed">
            From million-token document parsing to spatial bounding boxes and automated legal counter-clauses.
          </p>
        </div>

        {/* Asymmetrical Bento Grid Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 max-w-6xl mx-auto w-full">
          {/* Card 1: 1M Token Context Ingestion (8 cols) */}
          <div className="md:col-span-8 studio-card rounded-3xl p-4 sm:p-7 flex flex-col justify-between group relative overflow-hidden shadow-aesthetic">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                  1,000,000 Token Ingestion
                </span>
                <span className="text-[10px] font-mono text-slate-400">Gemini 2.0 Multimodal</span>
              </div>

              <h3 className="text-base sm:text-lg font-serif font-bold text-[#0F172A] dark:text-white mb-2">
                Unified Cross-Modal Document Pipeline
              </h3>
              <p className="text-xs text-[#53627A] dark:text-slate-400 leading-relaxed font-sans mb-4">
                Drop 500-page lease deeds, multi-month bank statements, audio earnings calls, and camera photos in a single conversational thread.
              </p>

              {/* Supported Media Matrix Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-xs font-mono">
                {[
                  { label: 'PDF Decks', desc: '500+ Pages' },
                  { label: 'Excel & CSV', desc: 'Auto Matrix' },
                  { label: 'Scanned Photos', desc: '4K Tensor' },
                  { label: 'Audio Briefs', desc: 'Native Whisper' }
                ].map((item, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 text-center">
                    <span className="font-bold text-[#0F172A] dark:text-white block text-[11px]">{item.label}</span>
                    <span className="text-[9px] text-slate-400">{item.desc}</span>
                  </div>
                ))}
              </div>

              {/* Mini Terminal Trace */}
              <div className="p-3 rounded-2xl bg-slate-900 text-slate-200 font-mono text-[10px] space-y-1 shadow-inner overflow-x-auto scrollbar-none">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1 gap-2">
                  <span className="flex items-center gap-1.5 truncate"><Terminal className="w-3 h-3 text-blue-400 flex-shrink-0" /> MULTIMODAL_DECOMPOSE</span>
                  <span className="text-emerald-400 font-bold flex-shrink-0">LATENCY 142ms</span>
                </div>
                <div className="text-slate-300 break-words">
                  <span className="text-blue-400">❯</span> Ingested 544 pages • Detected 18 structured tables • Extracted 62 page anchors
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-xs text-[#2563EB] dark:text-blue-400 font-semibold">
              <span>View Ingestion Benchmarks</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Interactive Table-to-CSV Extractor (4 cols) */}
          <div className="md:col-span-4 studio-card rounded-3xl p-4 sm:p-7 flex flex-col justify-between group relative overflow-hidden shadow-aesthetic">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  Table Matrix Extractor
                </span>
                <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
              </div>

              <h3 className="text-base font-serif font-bold text-[#0F172A] dark:text-white mb-1.5">
                Zero Retyping. Instant CSV.
              </h3>
              <p className="text-xs text-[#53627A] dark:text-slate-400 leading-relaxed font-sans mb-3.5">
                Deconstructs scanned financial tables and multi-column ledger statements into formatted spreadsheets.
              </p>

              {/* Interactive Mini Spreadsheet Preview */}
              <div className="rounded-xl border border-black/10 dark:border-white/10 overflow-hidden text-[10px] font-mono bg-white dark:bg-[#0c1017] shadow-sm">
                <div className="grid grid-cols-3 bg-black/5 dark:bg-white/5 p-1.5 font-bold text-slate-700 dark:text-slate-300 border-b border-black/5 dark:border-white/10">
                  <span>Quarter</span>
                  <span>Revenue</span>
                  <span className="text-right">EBITDA</span>
                </div>
                <div className="divide-y divide-black/5 dark:divide-white/5 text-slate-600 dark:text-slate-400">
                  <div className="grid grid-cols-3 p-1.5"><span>Q3 FY25</span><span>₹42.8 Cr</span><span className="text-right text-emerald-600 font-bold">+18.4%</span></div>
                  <div className="grid grid-cols-3 p-1.5"><span>Q4 FY25</span><span>₹51.2 Cr</span><span className="text-right text-emerald-600 font-bold">+22.1%</span></div>
                </div>
              </div>
            </div>

            <button
              onClick={handleCopyTable}
              className="mt-4 w-full py-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-blue-500/10 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-black/5 dark:border-white/10 touch-target active:scale-98"
            >
              {tableCopied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 font-bold">Copied as CSV!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-blue-500" />
                  <span>1-Click Export to Excel</span>
                </>
              )}
            </button>
          </div>

          {/* Card 3: Automated Legal & Dispute Remedies (4 cols) */}
          <div className="md:col-span-4 studio-card rounded-3xl p-4 sm:p-7 flex flex-col justify-between group relative overflow-hidden shadow-aesthetic">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                  Remedy Drafter
                </span>
                <Scale className="w-4 h-4 text-purple-500" />
              </div>

              <h3 className="text-base font-serif font-bold text-[#0F172A] dark:text-white mb-1.5">
                Automated Dispute Letters
              </h3>
              <p className="text-xs text-[#53627A] dark:text-slate-400 leading-relaxed font-sans mb-3.5">
                Generates actionable counter-clauses and dispute briefs citing RBI circulars and legal statutes.
              </p>

              <div className="p-3 rounded-2xl bg-purple-500/10 dark:bg-purple-950/30 border border-purple-500/20 text-[11px] space-y-1 font-serif text-slate-700 dark:text-slate-300">
                <span className="text-[9px] font-mono text-purple-600 dark:text-purple-400 font-bold uppercase block">
                  CITED: RBI/2024-25/92
                </span>
                <p className="italic break-words">
                  "Formal request for full reversal of non-consensual annual fee debited on Account ending **8912..."
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-xs text-purple-600 dark:text-purple-400 font-semibold">
              <span>Inspect Redline Workflow</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Domain Personas & Industry Profiles (8 cols) */}
          <div className="md:col-span-8 studio-card rounded-3xl p-4 sm:p-7 flex flex-col justify-between group relative overflow-hidden shadow-aesthetic">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Target Workflows
                </span>
                <h3 className="text-base font-serif font-bold text-[#0F172A] dark:text-white">
                  Engineered for High-Stakes Professionals
                </h3>
              </div>

              {/* Persona Selector Tabs */}
              <div className="flex flex-wrap items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/5 dark:border-white/10 text-xs font-medium">
                {[
                  { id: 'auditor', label: 'Auditors' },
                  { id: 'counsel', label: 'Legal Counsel' },
                  { id: 'founder', label: 'Founders' },
                  { id: 'researcher', label: 'Researchers' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePersona(tab.id as any)}
                    className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                      activePersona === tab.id
                        ? 'bg-[#2563EB] text-white font-bold shadow-xs'
                        : 'text-[#53627A] dark:text-slate-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Persona Content Display */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-6 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${currentPersona.badgeColor}`}>
                    {currentPersona.tag}
                  </span>
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-[#0F172A] dark:text-white">
                    {currentPersona.title}
                  </h4>
                </div>
                <p className="text-xs text-[#53627A] dark:text-slate-400 leading-relaxed font-sans">
                  {currentPersona.description}
                </p>
              </div>

              <div className="sm:col-span-6 p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Real-World Discovery</span>
                </div>
                <p className="text-xs text-[#0F172A] dark:text-slate-200 font-sans leading-relaxed">
                  {currentPersona.output}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
