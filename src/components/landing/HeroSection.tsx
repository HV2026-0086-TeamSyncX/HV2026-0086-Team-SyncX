'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  ArrowRight,
  FileText,
  AlertTriangle,
  Receipt,
  Sparkles,
  CheckCircle2,
  Scale,
  CreditCard,
  BookOpen,
  Zap,
  ShieldCheck,
  FileSpreadsheet,
  Layers,
  ChevronRight,
  TrendingUp,
  Clock,
  Play,
  RotateCcw,
  Cpu,
  Terminal
} from 'lucide-react';

export default function HeroSection() {
  const { isAuthenticated } = useAuth();
  const [activeDocType, setActiveDocType] = useState<'lease' | 'statement' | 'report' | 'invoice'>('lease');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionCount, setExecutionCount] = useState(1);

  const handleRun = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setExecutionCount((prev) => prev + 1);
    }, 600);
  };

  const demoData = {
    lease: {
      fileName: 'Commercial_Lease_Agreement.pdf',
      domain: 'LEGAL CONTRACT',
      page: 1,
      coords: '[124, 48, 380, 92]',
      systemInstruction: 'Radar: Extract non-standard liabilities, auto-renewals & penalty clauses.',
      metric: '₹2,00,000 Deposit Forfeiture Risk',
      quote: 'Clause 5.2 stipulates full security deposit forfeiture upon early lease termination without 90 days notice.',
      action: 'Drafted counter-clause capping liability to 1 month pro-rata rent.',
      status: 'CRITICAL CLAUSE',
      statusColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
    },
    statement: {
      fileName: 'HDFC_Bank_Statement_Jan2026.pdf',
      domain: 'FINANCE & BANKING',
      page: 2,
      coords: '[88, 142, 290, 168]',
      systemInstruction: 'Fee Radar: Reconcile intraday balance surcharges & transaction fees.',
      metric: '-₹650.00 Erroneous Overdraft Surcharge',
      quote: 'Intraday penalty debited on 18 Jan despite positive closing ledger balance.',
      action: 'Dispute letter drafted citing RBI master circular on min balance rules.',
      status: 'RECOVERABLE FEE',
      statusColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    },
    report: {
      fileName: 'WMT14_Translation_Benchmarks.pdf',
      domain: 'AI RESEARCH',
      page: 4,
      coords: '[210, 310, 480, 390]',
      systemInstruction: 'Synthesizer: Extract empirical BLEU benchmarks and dataset matrices.',
      metric: '28.4 BLEU Score (Big Model)',
      quote: 'Transformer (big) outperforms all previous models by 2.0+ BLEU points on English-to-German.',
      action: 'Table 3.1 extracted into 5-column CSV matrix ready for download.',
      status: 'BENCHMARK VERIFIED',
      statusColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    },
    invoice: {
      fileName: 'Supplier_Tax_Invoice_INV-8492.pdf',
      domain: 'BILLING & TAXATION',
      page: 1,
      coords: '[42, 220, 340, 260]',
      systemInstruction: 'Tax Engine: Verify GSTIN unit rates, HSN codes & input tax credits.',
      metric: '₹12,870.00 Eligible ITC Claim',
      quote: '18% IGST matches supplier master record and valid GSTR-1 filing ledger.',
      action: 'Confirmed 100% direct input tax credit deduction eligibility.',
      status: 'TAX CREDIT APPROVED',
      statusColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
    }
  };

  const current = demoData[activeDocType];

  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 select-none bg-[var(--bg-canvas)] overflow-hidden transition-colors duration-300">
      {/* Background Google AI Studio Style Grid & Beam */}
      <div className="absolute inset-0 bg-studio-grid pointer-events-none opacity-70 dark:opacity-40 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,black_70%,transparent_100%)]" />
      <div className="absolute inset-0 bg-studio-dots pointer-events-none opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black_70%,transparent_100%)]" />
      <div className="absolute inset-0 bg-studio-beam pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        {/* Top Header: Clean, Sleek, Non-Bulky */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          {/* Studio Model Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full studio-card text-[11px] font-mono text-slate-700 dark:text-slate-300 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-[#0F172A] dark:text-white">Gemini 2.0 Flash</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 dark:text-slate-400">1.0M Multimodal Context</span>
          </div>

          {/* Crisp, Modern Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#0F172A] dark:text-white tracking-tight leading-[1.12] font-bold">
            The Document Studio for <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] via-indigo-500 to-emerald-500">
              High-Stakes Decisions.
            </span>
          </h1>

          {/* High-Readability Minimal Paragraph */}
          <p className="text-xs sm:text-base text-[#53627A] dark:text-slate-300 leading-relaxed font-sans max-w-xl mx-auto">
            Audit commercial contracts, bank statements, research papers, and invoices with exact page-coordinate citations and zero hallucination.
          </p>

          {/* Sleek Action Buttons */}
          <div className="pt-2 flex flex-col xs:flex-row items-center justify-center gap-3 w-full max-w-xs xs:max-w-none mx-auto">
            <Link
              href={isAuthenticated ? "/dashboard" : "/login"}
              className="glass-button-emerald px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 touch-target shadow-md w-full xs:w-auto active:scale-98 transition-transform"
            >
              <span>{isAuthenticated ? 'Open Studio Workspace' : 'Launch Studio'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {!isAuthenticated ? (
              <Link
                href="/login"
                className="studio-card px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[#0F172A] dark:text-white text-xs sm:text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10 transition-all touch-target text-center w-full xs:w-auto active:scale-98"
              >
                Sign In
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="studio-card px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[#0F172A] dark:text-white text-xs sm:text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10 transition-all touch-target text-center w-full xs:w-auto active:scale-98"
              >
                My Audits
              </Link>
            )}
          </div>
        </div>

        {/* Interactive Google AI Studio Playground Canvas */}
        <div className="max-w-5xl mx-auto w-full">
          <div className="rounded-3xl studio-card overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 text-left">
            {/* Studio Workspace Top Bar */}
            <div className="px-3.5 sm:px-6 py-3 border-b border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-black/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              {/* Document Switcher Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 max-w-full">
                {[
                  { id: 'lease', label: 'Commercial Lease', icon: Scale },
                  { id: 'statement', label: 'Bank Statement', icon: CreditCard },
                  { id: 'report', label: 'Research Paper', icon: BookOpen },
                  { id: 'invoice', label: 'Tax Invoice', icon: Receipt }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveDocType(tab.id as any)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap touch-target flex-shrink-0 ${
                        activeDocType === tab.id
                          ? 'bg-[#2563EB] text-white font-semibold shadow-xs'
                          : 'text-[#53627A] dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Run Trigger & Model Telemetry */}
              <div className="flex items-center gap-2.5 justify-between sm:justify-end flex-shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-black/[0.04] dark:border-white/[0.04]">
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span>48ms Latency</span>
                </span>

                <button
                  onClick={handleRun}
                  disabled={isExecuting}
                  className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-xs disabled:opacity-50 touch-target active:scale-95"
                >
                  {isExecuting ? (
                    <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current" />
                  )}
                  <span>{isExecuting ? 'Extracting...' : 'Run Audit'}</span>
                </button>
              </div>
            </div>

            {/* Studio Workspace 2-Column Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-black/[0.08] dark:divide-white/[0.08]">
              {/* Left Column: System & Spatial Input (5 cols) */}
              <div className="lg:col-span-5 p-4 sm:p-6 bg-black/[0.01] dark:bg-black/20 space-y-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-blue-500" />
                    Input Document
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 font-bold">
                    Page {current.page}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold text-[#0F172A] dark:text-white truncate">
                    {current.fileName}
                  </h4>
                  <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 font-mono text-[10px] text-slate-600 dark:text-slate-300 leading-relaxed break-words">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">SYSTEM_PROMPT: </span>
                    {current.systemInstruction}
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-dashed border-black/15 dark:border-white/15 text-[11px] font-mono text-slate-500 space-y-1">
                  <div className="flex justify-between">
                    <span>SPATIAL_COORDINATES:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{current.coords}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TENSOR_CONFIDENCE:</span>
                    <span className="text-[#0F172A] dark:text-white font-bold">99.4%</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Grounded AI Output (7 cols) */}
              <div className="lg:col-span-7 p-4 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${current.statusColor}`}>
                    {current.status}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Spatial Grounding Verified
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#0F172A] dark:text-white">
                    {current.metric}
                  </h3>
                  
                  {/* Verified Quote Box */}
                  <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs">
                    <p className="text-[10px] font-mono uppercase text-slate-400 mb-1">
                      Exact Page Excerpt:
                    </p>
                    <p className="font-serif text-[#0F172A] dark:text-slate-200 italic leading-relaxed">
                      "{current.quote}"
                    </p>
                  </div>
                </div>

                {/* AI Remedy Box */}
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/20 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-emerald-800 dark:text-emerald-300">
                      Studio Action Taken:
                    </span>
                    <p className="text-[#334155] dark:text-slate-300 mt-0.5 leading-relaxed font-sans">
                      {current.action}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
