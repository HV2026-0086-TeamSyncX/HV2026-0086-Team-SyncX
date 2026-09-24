'use client';

import React, { useState } from 'react';
import { FileUp, Cpu, Binary, Eye, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function WorkflowSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Multimodal Ingestion & Pre-Processing',
      tagline: 'High-DPI rasterization, noise removal & page coordinate mapping',
      description:
        'DocFin ingests PDF, TIFF, scanned receipts, and multi-page bank statements. Pre-processing flattens skew and normalizes DPI for pixel-accurate OCR tensor coordinates.',
      icon: FileUp,
      outputSnippet: 'TENSOR::MAP { pages: 4, dpi: 300, skew_corrected: true, layout_confidence: 99.8% }'
    },
    {
      num: '02',
      title: 'Layout Aware OCR & Spatial Matrix',
      tagline: 'Spatial coordinate matrix with bounding box coordinates',
      description:
        'Preserves columns, hierarchical tables, indented clauses, and signature blocks without destroying spatial relations or misaligning debit/credit figures.',
      icon: Binary,
      outputSnippet: 'BOUNDING_BOX { x: 120.4, y: 450.2, text: "INTRADAY SURCHARGE -650.00 DR", page: 1 }'
    },
    {
      num: '03',
      title: 'Domain Classification & Routing',
      tagline: 'Instant routing to 1 of 5 dedicated financial lenses',
      description:
        'Analyzes semantic markers to assign the document to the Commercial Banking, Lease & Contract, Insurance, or Tax Invoice lens.',
      icon: Cpu,
      outputSnippet: 'ROUTE { domain: "finance", confidence: 99.4%, selected_heuristics: "RBI_Fee_Radar_v2" }'
    },
    {
      num: '04',
      title: 'Grounded Extraction & Cross-Check',
      tagline: 'Zero hallucinations with coordinate-grounded source citations',
      description:
        'Every extracted entity, amount, clause, and metric is tied to the original document page and coordinate tensor, completely preventing hallucinations.',
      icon: Eye,
      outputSnippet: 'CITATION { page: 1, section: "Fee Audit", verified_against_tensor: true }'
    },
    {
      num: '05',
      title: 'Forensic Intelligence & Action Memo',
      tagline: 'Executive brief, fee radar, and 1-click memo export',
      description:
        'Produces actionable insights: fee refund draft letters, tenant counter-clauses, cashless claim checklists, and downloadable CSV tables.',
      icon: Sparkles,
      outputSnippet: 'REPORT { status: "AUDIT_COMPLETE", action_items: 4, memo_ready: true }'
    }
  ];

  return (
    <section id="pipeline" className="py-28 sm:py-36 border-t border-slate-200/80 dark:border-white/10 select-none bg-[var(--bg-canvas)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs font-semibold mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>5-Stage Processing Engine</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-serif text-slate-900 dark:text-white tracking-tight mt-2 mb-6 font-normal">
            The Financial Intelligence Pipeline
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto">
            From raw pixels to verifiable financial audits. How DocFin processes high-stakes documents without guessing.
          </p>
        </div>

        {/* Pipeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
          {/* Left Column: Interactive Step Selector (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 sm:p-7 rounded-3xl border text-left cursor-pointer transition-all ${
                    isActive
                      ? 'bg-white dark:bg-[#0E121A] border-slate-900 dark:border-white shadow-md ring-1 ring-slate-900/10'
                      : 'bg-white/60 dark:bg-white/5 border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                        isActive
                          ? 'bg-[#0F172A] text-white dark:bg-white dark:text-[#07090E]'
                          : 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-400'
                      }`}
                    >
                      {step.num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-serif text-slate-900 dark:text-white font-normal mb-1">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
                        {step.tagline}
                      </p>
                      {isActive && (
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2 pt-2 border-t border-slate-100 dark:border-white/10 animate-in fade-in">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Code & Tensor Output Inspector (5 Cols) */}
          <div className="lg:col-span-5 bg-[#090C12] text-slate-100 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-4 font-mono text-xs sticky top-28">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                  Live Tensor Inspector
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">Stage {steps[activeStep].num} / 05</span>
            </div>

            <div className="space-y-3 py-2">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Active Subsystem:</span>
                <span className="text-blue-300 font-bold text-xs">{steps[activeStep].title}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Processing Tensor:</span>
                <div className="p-3 bg-black/50 rounded-xl border border-white/10 text-emerald-400 text-[11px] break-all leading-relaxed">
                  {steps[activeStep].outputSnippet}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>Deterministic Verification:</span>
                <span className="text-emerald-400 font-bold">Passed (0 ms jitter)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
