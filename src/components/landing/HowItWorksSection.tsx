'use client';

import React from 'react';
import { UploadCloud, FileSearch, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Ingest any document format',
      description:
        'Drag and drop any contract, research paper, bank statement, spreadsheet, or invoice. DocFin parses layout coordinates and structure automatically.',
      icon: UploadCloud,
      bullets: ['Auto-detects document domain', 'OCR & scanned page support', 'Multi-page batch analysis']
    },
    {
      num: '02',
      title: 'Deconstruct structure & meaning',
      description:
        'Extract numerical ledgers, dates, counter-party commitments, and critical covenants, tying every finding directly to its original page coordinates.',
      icon: FileSearch,
      bullets: ['Covenant & liability radar', 'CSV data table generator', 'Page-grounded spatial citations']
    },
    {
      num: '03',
      title: 'Query, summarize & export',
      description:
        'Generate executive briefs, chat conversationally with your files in plain English, and export clean structured audit memos and spreadsheets.',
      icon: Sparkles,
      bullets: ['30-second plain English summary', 'Grounded conversational Q&A', 'One-click Markdown/CSV export']
    }
  ];

  return (
    <section id="how-it-works" className="py-28 sm:py-36 border-t border-black/[0.06] dark:border-white/[0.08] select-none bg-[var(--bg-canvas)] relative overflow-hidden transition-colors duration-300">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-dot-matrix pointer-events-none opacity-20" />
      <div className="absolute inset-0 bg-hero-ambient pointer-events-none opacity-40" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-medium">
            <span>Step-by-Step Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-[#0F172A] dark:text-white tracking-tight leading-tight font-bold">
            How DocFin turns complex files into <br className="hidden sm:inline" />
            <span className="text-[#2563EB] dark:text-blue-400">clear, actionable intelligence.</span>
          </h2>

          <p className="text-base text-[#53627A] dark:text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto">
            A seamless three-stage pipeline engineered for precision, speed, and zero hallucination.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group p-8 rounded-3xl bg-white/75 dark:bg-[#0c1017]/85 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Step Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-[#2563EB] dark:text-blue-400 border border-black/5 dark:border-white/10">
                      Step {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-transform group-hover:scale-110">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-serif text-[#0F172A] dark:text-white font-bold mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#53627A] dark:text-slate-400 leading-relaxed mb-6 font-sans">
                    {step.description}
                  </p>

                  {/* Bullets */}
                  <div className="space-y-2 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                    {step.bullets.map((b, bIdx) => (
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
      </div>
    </section>
  );
}
