'use client';

import React from 'react';
import { ShieldCheck, Lock, Sparkles, Award, CheckCircle2, FileCheck2 } from 'lucide-react';

export default function SocialProofBar() {
  const proofItems = [
    { label: 'SOC-2 Type II Certified', icon: ShieldCheck },
    { label: '256-Bit TLS 1.3 In-Transit Encryption', icon: Lock },
    { label: 'Zero Training on Confidential Customer Data', icon: Sparkles },
    { label: 'Grounded Coordinate-Bound Citations', icon: FileCheck2 },
  ];

  const trustedCategories = [
    'Chartered Accountants & Auditors',
    'Corporate Legal Counsel',
    'Financial Underwriting Desks',
    'Healthcare Claims Officers',
    'Venture Capital & Due Diligence'
  ];

  return (
    <section className="py-12 border-y border-white/5 bg-[#06080c] relative select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          {/* Left: Section descriptor */}
          <div className="flex-shrink-0">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold block mb-0.5">
              ENTERPRISE AUDIT BENCHMARK
            </span>
            <p className="text-xs font-semibold text-slate-300">
              Trusted for precision by high-stakes professionals
            </p>
          </div>

          {/* Center/Right: Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {proofItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/10 text-[11px] font-medium text-slate-300 hover:border-white/20 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
