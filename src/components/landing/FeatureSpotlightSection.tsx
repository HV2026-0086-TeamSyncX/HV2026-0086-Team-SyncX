'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  FileText,
  Target,
  Maximize2,
  Zap,
  Lock,
  Layers
} from 'lucide-react';

export default function FeatureSpotlightSection() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'lease' | 'statement' | 'tax'>('lease');

  const spotlightData = {
    lease: {
      badge: 'Legal & Risk Radar',
      title: 'Commercial Lease Deposit Clause',
      docName: 'Standard_Office_Lease_2026.pdf',
      page: 1,
      coords: '[124, 48, 380, 92]',
      severity: 'Critical Liability',
      severityColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      quote: '5.2 Early Termination: In the event of tenant default or vacation prior to 36 months, the entire security deposit of ₹2,00,000 shall be irreversibly forfeited without prorated credit.',
      analysis: 'Identified non-standard unilateral forfeiture with zero grace period.',
      remedy: 'Drafted bilateral counter-clause: limits liability to 30 days pro-rata rent upon 60 days advance written notice.',
      stats: 'Saved ₹2,00,000 deposit exposure'
    },
    statement: {
      badge: 'Banking & Fee Radar',
      title: 'Erroneous Surcharge Detection',
      docName: 'Corporate_Current_Account_Jan.pdf',
      page: 2,
      coords: '[88, 142, 290, 168]',
      severity: 'Recoverable Charge',
      severityColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      quote: '18-Jan-2026: INTRADAY MIN BAL PENALTY CHARGE - ₹650.00 | LEDGER EOD BALANCE: ₹4,12,850.00 CR',
      analysis: 'Automated ledger audit detected fee debited despite average quarterly balance exceeding required thresholds.',
      remedy: 'Generated formal charge dispute letter citing RBI Master Circular on Fair Banking Practices.',
      stats: '100% automated dispute brief'
    },
    tax: {
      badge: 'Tax & Invoicing Engine',
      title: 'Input Tax Credit (ITC) Reconciliation',
      docName: 'Vendor_Invoice_INV-9821.pdf',
      page: 1,
      coords: '[42, 220, 340, 260]',
      severity: 'ITC Verified',
      severityColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      quote: 'HSN 998313: IT Consulting Services | Taxable: ₹71,500.00 | IGST @ 18%: ₹12,870.00 | GSTIN: 36AAACG1234A1Z5',
      analysis: 'Reconciled GSTIN ledger against supplier GSTR-1 active return status with zero math discrepancy.',
      remedy: 'Approved 100% direct input tax credit claim for upcoming monthly GSTR-3B tax return filing.',
      stats: '₹12,870 ITC Claim Confirmed'
    }
  };

  const current = spotlightData[activeTab];

  return (
    <section className="py-20 sm:py-28 bg-[#07090E] text-white relative overflow-hidden select-none border-y border-white/10">
      {/* Radiant Atmosphere Halo Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[48rem] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-studio-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-mono font-semibold">
            <Target className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>Zero-Hallucination Spatial Grounding</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight leading-tight">
            Every answer linked to its <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
              exact page coordinate.
            </span>
          </h2>

          <p className="text-xs sm:text-base text-slate-400 font-sans max-w-xl mx-auto leading-relaxed">
            Unlike generic chatbots that guess, DocFin calculates precise <code className="text-blue-300 bg-blue-950/60 px-1.5 py-0.5 rounded font-mono text-xs">[x,y]</code> bounding boxes to verify every extracted liability, penalty, and table.
          </p>

          {/* Interactive Scenario Switcher */}
          <div className="pt-2 flex justify-center w-full">
            <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10 gap-1 overflow-x-auto scrollbar-none max-w-full">
              {[
                { id: 'lease', label: 'Commercial Lease Audit' },
                { id: 'statement', label: 'Bank Fee Surcharge' },
                { id: 'tax', label: 'Tax & ITC Verification' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 sm:px-5 py-1.5 rounded-full text-xs font-serif font-bold transition-all cursor-pointer whitespace-nowrap touch-target flex-shrink-0 active:scale-95 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* High-Contrast Interactive Showcase Split Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left: Interactive Simulated Document Page with Spatial Bounding Box Radar (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0E131E] rounded-3xl border border-white/15 p-4 sm:p-8 flex flex-col justify-between shadow-2xl relative group overflow-hidden">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300 min-w-0">
                <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="font-semibold truncate max-w-[150px] xs:max-w-[200px] sm:max-w-xs">{current.docName}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 flex-shrink-0">Page {current.page}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Radar Active
                </span>
              </div>
            </div>

            {/* Document Simulation Canvas with Highlighted Laser Bounding Box */}
            <div className="my-5 p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3.5 relative font-serif text-slate-300 text-xs sm:text-sm leading-relaxed">
              <p className="opacity-40 text-[11px] font-sans">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              {/* The Laser Bounding Box Highlight */}
              <div className="relative p-3.5 sm:p-4 rounded-xl bg-blue-500/15 border-2 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-pulse">
                <div className="absolute -top-3 left-3 bg-blue-600 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                  <Target className="w-2.5 h-2.5" />
                  <span>TENSOR {current.coords}</span>
                </div>
                <p className="text-white font-medium italic mt-1 leading-relaxed break-words">
                  &ldquo;{current.quote}&rdquo;
                </p>
              </div>

              <p className="opacity-40 text-[11px] font-sans">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
              </p>
            </div>

            {/* Bottom Grounding Telemetry Bar */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">Spatial Hash Verified:</span>
                <span className="text-blue-300 font-bold">sha256:9f482a...</span>
              </div>
              <span className="text-emerald-400 font-semibold">{current.stats}</span>
            </div>
          </div>

          {/* Right: DocFin AI Extracted Reasoning & Automated Remedy Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#121826] to-[#0D121B] rounded-3xl border border-white/15 p-4 sm:p-8 flex flex-col justify-between shadow-2xl space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${current.severityColor}`}>
                  {current.severity}
                </span>
                <span className="text-xs text-blue-400 font-mono font-bold">{current.badge}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                {current.title}
              </h3>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                  AI Structural Audit:
                </span>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {current.analysis}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Actionable Studio Remedy:</span>
                </div>
                <p className="text-xs text-emerald-200/90 font-sans leading-relaxed">
                  {current.remedy}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                href={isAuthenticated ? "/dashboard" : "/login"}
                className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Try Instant Document Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
