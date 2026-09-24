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
  XCircle,
  FileText,
  Building2,
  Compass,
  Layers,
  HelpCircle,
  Lightbulb,
  MapPin,
  TrendingUp,
  Target
} from 'lucide-react';

export default function WhyWhatWhereSection() {
  const [activePillar, setActivePillar] = useState<'what' | 'why' | 'where'>('what');

  const pillars = {
    what: {
      badge: '01 • THE PRODUCT',
      title: 'What is DocFin?',
      headline: 'A Universal Document Intelligence Studio.',
      summary:
        'DocFin is a multimodal document reasoning engine powered by Gemini 2.0. It ingests complex 500+ page PDFs, financial ledgers, scans, and contracts—extracting structured data tables, identifying hidden covenants, and generating plain-English executive memos with exact page-coordinate citations.',
      keyPoints: [
        {
          label: 'Spatial Coordinate Grounding',
          desc: 'Every key number, liability, and covenant is tied to exact x,y pixel bounding boxes on the original page.'
        },
        {
          label: 'Multimodal Parsing Engine',
          desc: 'Processes high-res scanned PDFs, mobile receipt photos, spreadsheets, audio calls, and slide decks.'
        },
        {
          label: 'Conversational Reasoning Canvas',
          desc: 'Chat freely with your documents, draft negotiation redlines, and export structured CSV/Markdown matrices.'
        }
      ],
      visualQuote: {
        tag: 'CORE CAPABILITY',
        text: 'Zero hallucination coordinate tensors. Ask any question and verify the exact page citation in real-time.'
      }
    },
    why: {
      badge: '02 • THE PROBLEM',
      title: 'Why It Matters',
      headline: 'Crucial commitments stay buried in fine print.',
      summary:
        'Modern agreements and financial paperwork are deliberately dense. Manual human review is slow, error-prone, and misses high-stake risks: deposit forfeiture clauses, unannounced bank fees, missed GST input credits, and restrictive insurance exclusions.',
      keyPoints: [
        {
          label: 'Prevent Silent Capital Leakage',
          desc: 'Catches intraday bank surcharges, unutilized GSTR-3B tax deductions, and auto-renewal penalties.'
        },
        {
          label: 'Eliminate 5+ Hours of Transcribing',
          desc: 'Converts complex multi-column static PDF tables into clean structured CSV spreadsheets in milliseconds.'
        },
        {
          label: 'Protect Against Legal Traps',
          desc: 'Flags non-standard indemnity obligations, uncapped liabilities, and strict notice period deadlines.'
        }
      ],
      visualQuote: {
        tag: 'OPERATIONAL REALITY',
        text: '74% of commercial leases contain unflagged penalty clauses. DocFin instantly surfaces them with counter-clauses.'
      }
    },
    where: {
      badge: '03 • REAL-WORLD APPLICATION',
      title: 'Where This Is Used',
      headline: 'Across high-stakes professional sectors.',
      summary:
        'DocFin is deployed across accounting firms, legal teams, operations departments, and research institutions to automate rigorous document audits with zero setup.',
      keyPoints: [
        {
          label: 'Commercial Contracts & Leases',
          desc: 'Audit deposit forfeiture terms, lock-in periods, indemnity caps, and notice renewal milestones.'
        },
        {
          label: 'Banking Statements & Cash Flow',
          desc: 'Reconcile multi-account inflows, debit breakdowns, recurring fees, and generate dispute letters.'
        },
        {
          label: 'Supplier Invoices & Tax Filings',
          desc: 'Audit line-item unit rates, HSN tax codes, and verify 100% GSTR-3B input tax credit eligibility.'
        },
        {
          label: 'Academic Research & Benchmarks',
          desc: 'Extract empirical benchmark tables (BLEU/WMT), mathematical theorems, and dataset citations.'
        }
      ],
      visualQuote: {
        tag: 'DEPLOYMENT SCENE',
        text: 'From Fortune 500 audit teams to solo founders auditing vendor agreements before signing.'
      }
    }
  };

  const current = pillars[activePillar];

  const comparisonRows = [
    {
      feature: 'Spatial Grounding & Citations',
      legacy: 'None — Generates text without knowing where words exist',
      docfin: 'Exact [x, y] bounding box coordinate tensors on page',
      isAdvantage: true
    },
    {
      feature: 'Multi-Column Table Deconstruction',
      legacy: 'Fails / Scrambles columns into unstructured text blobs',
      docfin: 'Preserves grid hierarchy & exports 1-click clean CSV/Excel',
      isAdvantage: true
    },
    {
      feature: 'Context Horizon',
      legacy: 'Truncated to 4k–32k tokens (chokes on large documents)',
      docfin: '1,000,000 token multimodal window (500+ pages + audio/media)',
      isAdvantage: true
    },
    {
      feature: 'Remedy & Counter-Clause Drafting',
      legacy: 'Passive summary with no actionable legal/financial solutions',
      docfin: 'Drafts bilateral counter-clauses & formal RBI dispute memos',
      isAdvantage: true
    },
    {
      feature: 'Zero-Retention Privacy Vault',
      legacy: 'Public cloud model training on customer corporate files',
      docfin: 'Strict client-isolated memory; zero model training retention',
      isAdvantage: true
    }
  ];

  const metrics = [
    { label: 'Spatial Precision', val: '99.8%', desc: 'Verified coordinate tensor accuracy' },
    { label: 'Table Retyping', val: '0 sec', desc: 'Instant matrix to CSV conversion' },
    { label: 'Multimodal Context', val: '1.0M', desc: '500+ pages in a single live session' },
    { label: 'Reasoning Latency', val: '<800ms', desc: 'Sub-second neural response speed' }
  ];

  return (
    <section id="what-why-where" className="py-20 sm:py-28 select-none bg-[var(--bg-canvas)] relative overflow-hidden transition-colors duration-300">
      {/* Background Subtle Coordinate Lines */}
      <div className="absolute inset-0 bg-studio-grid pointer-events-none opacity-60 dark:opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black_60%,transparent_100%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full studio-card text-xs font-mono font-medium shadow-xs">
            <Compass className="w-3.5 h-3.5 text-blue-500" />
            <span>Foundational Manifesto</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-[#0F172A] dark:text-white tracking-tight leading-tight font-bold">
            Clarity for high-stakes documents.
          </h2>

          <p className="text-xs sm:text-sm text-[#53627A] dark:text-slate-400 font-sans max-w-xl mx-auto leading-relaxed">
            Understand the essence of DocFin: what it does, why it matters, and where this is used.
          </p>
        </div>

        {/* 3 Interactive Pillar Selector Tabs */}
        <div className="flex justify-center w-full">
          <div className="inline-flex p-1 rounded-full studio-card border border-black/10 dark:border-white/10 gap-1 overflow-x-auto scrollbar-none shadow-xs max-w-full">
            {[
              { id: 'what', label: '01 • What is DocFin?', icon: Sparkles },
              { id: 'why', label: '02 • Why It Matters', icon: Lightbulb },
              { id: 'where', label: '03 • Where This Is Used', icon: MapPin }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePillar(tab.id as any)}
                  className={`px-3.5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-serif font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap touch-target flex-shrink-0 active:scale-95 ${
                    activePillar === tab.id
                      ? 'bg-[#2563EB] text-white shadow-md'
                      : 'text-[#53627A] dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Pillar Detailed Card */}
        <div className="studio-card rounded-3xl p-4 sm:p-10 shadow-aesthetic-lg border border-black/10 dark:border-white/10 animate-in fade-in space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2563EB] dark:text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block">
                {current.badge}
              </span>

              <h3 className="text-xl sm:text-3xl font-serif font-bold text-[#0F172A] dark:text-white leading-tight">
                {current.headline}
              </h3>

              <p className="text-xs sm:text-sm text-[#53627A] dark:text-slate-300 font-sans leading-relaxed">
                {current.summary}
              </p>

              {/* Key Bullet Highlights */}
              <div className="space-y-3 pt-2">
                {current.keyPoints.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0F172A] dark:text-white">{point.label}</h4>
                      <p className="text-[11px] text-[#53627A] dark:text-slate-400 leading-relaxed font-sans">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Quote Card */}
            <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#121826] to-[#0A0E17] text-white space-y-4 border border-white/10 shadow-xl">
              <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider block">
                {current.visualQuote.tag}
              </span>
              <p className="text-sm sm:text-base font-serif italic text-slate-200 leading-relaxed break-words">
                &ldquo;{current.visualQuote.text}&rdquo;
              </p>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Studio Intelligence</span>
                <span className="text-emerald-400 font-bold">100% Grounded</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Quantitative Scorecard Highlight Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4">
          {metrics.map((m, idx) => (
            <div key={idx} className="studio-card p-4 sm:p-6 rounded-3xl text-center space-y-1.5 shadow-aesthetic group hover:border-blue-500/30 transition-all">
              <span className="text-2xl sm:text-4xl font-mono font-bold text-[#2563EB] dark:text-blue-400 group-hover:scale-105 transition-transform inline-block">
                {m.val}
              </span>
              <h3 className="text-xs font-serif font-bold text-[#0F172A] dark:text-white">
                {m.label}
              </h3>
              <p className="text-[11px] text-[#53627A] dark:text-slate-400 font-sans leading-tight">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Direct Side-by-Side Comparative Matrix Table */}
        <div className="studio-card rounded-3xl p-4 sm:p-8 shadow-aesthetic-lg overflow-hidden border border-black/10 dark:border-white/10">
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/[0.08] mb-4 gap-2">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Technical Matrix
              </span>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#0F172A] dark:text-white">
                Traditional OCR vs DocFin Multimodal Studio
              </h3>
            </div>
            <span className="hidden sm:inline text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold flex-shrink-0">
              ● 100% Deterministic Grounding
            </span>
          </div>

          <div className="overflow-x-auto scrollbar-thin table-scroll-container">
            <table className="min-w-full text-left text-xs divide-y divide-black/[0.06] dark:divide-white/[0.08]">
              <thead>
                <tr className="text-slate-500 dark:text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 pr-4 font-semibold">Capability</th>
                  <th className="py-3 px-4 font-semibold text-rose-500">Legacy OCR & Chatbots</th>
                  <th className="py-3 pl-4 font-semibold text-blue-600 dark:text-blue-400">DocFin AI Studio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.05]">
                {comparisonRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-blue-50/30 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 pr-4 font-serif font-bold text-[#0F172A] dark:text-white">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      <span>{row.legacy}</span>
                    </td>
                    <td className="py-3.5 pl-4 text-slate-900 dark:text-slate-200 font-medium">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-[#0F172A] dark:text-white font-semibold">{row.docfin}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
