'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { ArrowRight, Sparkles, Command, ShieldCheck, Zap } from 'lucide-react';

export default function FinalCtaSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-20 sm:py-28 select-none bg-[var(--bg-canvas)] relative overflow-hidden transition-colors duration-300">
      {/* Radiant Glow Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-blue-600/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-studio-dots pointer-events-none opacity-25" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-14 rounded-3xl studio-card text-center relative overflow-hidden shadow-aesthetic-lg border border-black/10 dark:border-white/15 bg-gradient-to-b from-white/90 to-slate-50/90 dark:from-[#121722]/90 dark:to-[#0a0d14]/90 backdrop-blur-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for Production Audits</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-[#0F172A] dark:text-white tracking-tight leading-tight mb-3.5 font-bold">
            Start auditing documents <br className="hidden sm:inline" />
            <span className="text-[#2563EB] dark:text-blue-400">with 100% spatial precision.</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#53627A] dark:text-slate-300 max-w-lg mx-auto leading-relaxed mb-8 font-sans">
            Upload any contract, research paper, bank statement, or invoice to extract clear answers, spatial citations, and structured tables.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href={isAuthenticated ? "/dashboard" : "/login"}
              className="glass-button-primary px-8 py-3.5 rounded-full text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-2 touch-target shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{isAuthenticated ? 'Open Studio Workspace' : 'Launch Free Workspace'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {!isAuthenticated ? (
              <Link
                href="/login"
                className="px-6 py-3.5 rounded-full text-[#0F172A] dark:text-white text-xs sm:text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10 transition-all touch-target border border-black/10 dark:border-white/15 studio-card"
              >
                Sign In
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="px-6 py-3.5 rounded-full text-[#0F172A] dark:text-white text-xs sm:text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10 transition-all touch-target border border-black/10 dark:border-white/15 studio-card"
              >
                My Audits
              </Link>
            )}
          </div>

          {/* Quick Telemetry Footnote */}
          <div className="mt-8 pt-6 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Zero Data Retention Vault</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-blue-500" /> Sub-second Latency</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Command className="w-3 h-3" /> Quick Launch Studio</span>
          </div>
        </div>
      </div>
    </section>
  );
}
