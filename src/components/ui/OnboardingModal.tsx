'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  UploadCloud,
  Key,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
  FileSearch,
  Zap,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Layers
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartAudit: () => void;
  onOpenSettings: () => void;
}

export default function OnboardingModal({
  isOpen,
  onClose,
  onStartAudit,
  onOpenSettings
}: OnboardingModalProps) {
  const [step, setStep] = useState(1);

  const handleClose = useCallback(() => {
    setStep(1);
    onClose();
  }, [onClose]);

  // Keyboard navigation for Left & Right arrow keys
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        setStep((prev) => Math.min(prev + 1, 3));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setStep((prev) => Math.max(prev - 1, 1));
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const totalSteps = 3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 dark:bg-black/75 backdrop-blur-2xl animate-in fade-in select-none">
      {/* Floating Ambient Glow Behind Modal */}
      <div className="absolute w-[32rem] h-[32rem] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute w-[28rem] h-[28rem] bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Floating Left Arrow (Previous Step) */}
      {step > 1 && (
        <button
          onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
          className="hidden md:flex absolute left-8 lg:left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 dark:bg-[#121722]/80 hover:bg-white dark:hover:bg-[#161c28] border border-black/10 dark:border-white/15 backdrop-blur-xl shadow-xl items-center justify-center text-slate-700 dark:text-slate-200 hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
          title="Previous Step (Left Arrow)"
          aria-label="Previous step"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Floating Right Arrow (Next Step) */}
      {step < totalSteps && (
        <button
          onClick={() => setStep((prev) => Math.min(prev + 1, totalSteps))}
          className="hidden md:flex absolute right-8 lg:left-auto lg:right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 dark:bg-[#121722]/80 hover:bg-white dark:hover:bg-[#161c28] border border-black/10 dark:border-white/15 backdrop-blur-xl shadow-xl items-center justify-center text-slate-700 dark:text-slate-200 hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
          title="Next Step (Right Arrow)"
          aria-label="Next step"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Glassmorphic Modal Window Container */}
      <div className="card-glass bg-white/90 dark:bg-[#0E1210]/92 backdrop-blur-3xl rounded-3xl sm:rounded-[32px] w-full max-w-xl text-[#0F172A] dark:text-[#F2F4F3] border border-black/10 dark:border-white/15 shadow-2xl shadow-emerald-950/20 overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200 group max-h-[92vh] overflow-y-auto">
        {/* Top Specular Light Highlight */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/15 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white transition-all z-20 cursor-pointer backdrop-blur-md touch-target"
          title="Close Tour (Esc)"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Interactive 2-Way Step Progress Indicators */}
        <div className="px-6 sm:px-8 pt-6 sm:pt-7">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className="flex-1 h-2 rounded-full relative overflow-hidden transition-all duration-300 group cursor-pointer"
                title={`Jump to Step ${s}`}
              >
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    step >= s
                      ? 'bg-gradient-to-r from-emerald-500 to-[#288E4F] dark:from-emerald-400 dark:to-teal-400 shadow-[0_0_12px_rgba(40,142,79,0.5)]'
                      : 'bg-black/10 dark:bg-white/10 group-hover:bg-black/15 dark:group-hover:bg-white/20'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-[#8E9690] mt-2 font-medium">
            <span>Step {step} of {totalSteps}</span>
            <span className="hidden sm:inline">Use ← → arrow keys to navigate</span>
          </div>
        </div>

        {/* =========================================================================
            STEP 1: WELCOME & MULTIMODAL INTELLIGENCE
           ========================================================================= */}
        {step === 1 && (
          <div className="p-6 sm:p-8 space-y-6 text-center animate-in fade-in">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-sm">
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] dark:text-[#F2F4F3] tracking-tight">
                Welcome to DocFin Intelligence
              </h3>
              <p className="text-xs sm:text-sm text-[#2E503B] dark:text-[#8E9690] leading-relaxed max-w-md mx-auto">
                DocFin ingests dense documents, extracts structured data tables into CSV, flags liability traps, and grounds answers with page coordinate citations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-center">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/10 flex sm:flex-col items-center gap-2.5 sm:gap-1.5 hover:border-emerald-500/30 transition-all">
                <FileSearch className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="font-bold text-xs text-[#0F172A] dark:text-white block">Multimodal OCR</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">1.0M Token Context</span>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/10 flex sm:flex-col items-center gap-2.5 sm:gap-1.5 hover:border-emerald-500/30 transition-all">
                <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div>
                  <span className="font-bold text-xs text-[#0F172A] dark:text-white block">Spatial Grounding</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Pixel Bounding Boxes</span>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/10 flex sm:flex-col items-center gap-2.5 sm:gap-1.5 hover:border-emerald-500/30 transition-all">
                <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <div>
                  <span className="font-bold text-xs text-[#0F172A] dark:text-white block">Zero Hallucinations</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Exact Text Quotations</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={() => setStep(2)}
                className="btn-primary w-full py-3.5 px-5 rounded-full bg-[#288E4F] dark:bg-[#4CAF6B] text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Next: AI Engines & Vector DB</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 2: ENGINES & CLOUD CONNECTION
           ========================================================================= */}
        {step === 2 && (
          <div className="p-6 sm:p-8 space-y-6 text-center animate-in fade-in">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-sm">
              <Key className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] dark:text-[#F2F4F3] tracking-tight">
                Live Cloud Engine Connected
              </h3>
              <p className="text-xs sm:text-sm text-[#2E503B] dark:text-[#8E9690] leading-relaxed max-w-md mx-auto">
                DocFin is pre-configured with Google Gemini 2.0 Flash, Qdrant Cloud Vector DB, and Upstash Redis. You can also configure custom BYOK keys in Settings.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/10 text-left space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-blue-500" />
                  Gemini Model:
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active (2.0 Flash)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-purple-500" />
                  Qdrant Vector DB:
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">Online (docfin_documents)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Redis In-Memory Cache:
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">Connected (&lt;10ms)</span>
              </div>
            </div>

            {/* 2-Way Left & Right Controls */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setStep(1)}
                className="py-3 sm:py-3.5 px-4 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/15 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={() => { handleClose(); onOpenSettings(); }}
                className="py-3 sm:py-3.5 px-4 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/15 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center cursor-pointer"
              >
                Configure Keys
              </button>

              <button
                onClick={() => setStep(3)}
                className="btn-primary flex-1 py-3 sm:py-3.5 px-4 rounded-full bg-[#288E4F] dark:bg-[#4CAF6B] text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 3: READY & SUPER ACTIONS
           ========================================================================= */}
        {step === 3 && (
          <div className="p-6 sm:p-8 space-y-6 text-center animate-in fade-in">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-sm">
              <UploadCloud className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0F172A] dark:text-[#F2F4F3] tracking-tight">
                You&apos;re All Set!
              </h3>
              <p className="text-xs sm:text-sm text-[#2E503B] dark:text-[#8E9690] leading-relaxed max-w-md mx-auto">
                Drop your first file (PDF, Contract, Invoice, Bank Statement, Photo, or Sheet) to run an instantaneous spatial audit.
              </p>
            </div>

            <div className="space-y-3 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/10 p-4 sm:p-5 rounded-2xl">
              <p className="flex items-center gap-2.5">
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">1.</span>
                <span>Drag & drop or click anywhere to upload documents</span>
              </p>
              <p className="flex items-center gap-2.5">
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">2.</span>
                <span>Click <strong className="text-[#0F172A] dark:text-white">[+]</strong> in the prompt bar for 1-click super-actions</span>
              </p>
              <p className="flex items-center gap-2.5">
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">3.</span>
                <span>Grounded citations and CSV tables generated in seconds</span>
              </p>
            </div>

            {/* 2-Way Left & Right Controls */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setStep(2)}
                className="py-3.5 px-4 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/15 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={() => { handleClose(); onStartAudit(); }}
                className="btn-primary flex-1 py-3.5 px-5 rounded-full bg-[#288E4F] dark:bg-[#4CAF6B] text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Launch Workspace Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
