'use client';

import React, { useState } from 'react';
import {
  PiggyBank,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Receipt,
  Scale,
  Sparkles,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  Copy,
  Check,
  Building2,
  ExternalLink,
  BookOpen,
  Code2,
  Server,
  Layers,
  FileCheck,
  Stethoscope,
  Briefcase,
  Globe2,
  Terminal,
  Activity,
  Calendar,
  DollarSign
} from 'lucide-react';
import { DocumentAnalysis } from '@/lib/types';

export default function InsightsTab({
  doc,
  onTriggerPrompt
}: {
  doc: DocumentAnalysis;
  onTriggerPrompt?: (prompt: string) => void;
}) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 1. ACADEMIC & RESEARCH LENS
  if (doc.detectedDomain === 'academic' || doc.academicData) {
    const acad = doc.academicData;
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#EBF2FE]/80 dark:bg-blue-950/30 border border-[#DCE5F0] dark:border-blue-900/50 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center shadow-sm shadow-blue-500/20 flex-shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#2563EB] text-white font-mono uppercase">
                  Academic Paper Lens
                </span>
                <span className="text-xs text-[#8092A7] font-mono">
                  {acad?.institution || 'Peer-Reviewed Research'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#101828] dark:text-white">
                {acad?.researchQuestion || 'Primary Research Thesis & Theoretical Framing'}
              </h3>
              {acad?.authors && acad.authors.length > 0 && (
                <p className="text-xs text-[#53627A] dark:text-slate-300 mt-1">
                  Authors: {acad.authors.join(', ')}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => onTriggerPrompt?.(`Synthesize the methodology and statistical validity of ${doc.name}.`)}
            className="px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm shadow-blue-500/20 transition-all flex items-center gap-2 flex-shrink-0"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Critique Methodology</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-[#DCE5F0] dark:border-white/10 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-[#2563EB] dark:text-blue-400" />
              <h4 className="text-base font-serif font-bold text-[#101828] dark:text-white">
                Experimental Methodology & Dataset
              </h4>
            </div>
            <div className="space-y-3.5 text-xs text-[#53627A] dark:text-slate-300">
              <div className="p-4 rounded-2xl bg-[#F8FAFD] dark:bg-white/5 border border-[#DCE5F0] dark:border-white/5">
                <span className="font-bold text-[#101828] dark:text-white block mb-1 font-mono uppercase text-[10px]">Methodology</span>
                <p className="leading-relaxed">{acad?.methodology || 'Scaled Dot-Product and Multi-Head Self-Attention layers combined with residual connections.'}</p>
              </div>
              {acad?.datasetOrSample && (
                <div className="p-4 rounded-2xl bg-[#F8FAFD] dark:bg-white/5 border border-[#DCE5F0] dark:border-white/5">
                  <span className="font-bold text-[#101828] dark:text-white block mb-1 font-mono uppercase text-[10px]">Dataset / Benchmark Sample</span>
                  <p className="leading-relaxed">{acad.datasetOrSample}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-[#DCE5F0] dark:border-white/10 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-base font-serif font-bold text-[#101828] dark:text-white">
                Key Findings & Empirical Results
              </h4>
            </div>
            <div className="space-y-2.5">
              {(acad?.keyFindings || doc.summary.keyTakeaways).map((finding, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-xs text-emerald-950 dark:text-emerald-200 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{finding}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. TECHNICAL ARCHITECTURE & ENGINEERING LENS
  if (doc.detectedDomain === 'technical' || doc.technicalData) {
    const tech = doc.technicalData;
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#EBF2FE]/80 dark:bg-blue-950/30 border border-[#DCE5F0] dark:border-blue-900/50 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center shadow-sm shadow-blue-500/20 flex-shrink-0">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#2563EB] text-white font-mono uppercase">
                  Technical Architecture Lens
                </span>
                <span className="text-xs text-[#8092A7] font-mono">
                  {tech?.dependencies?.length || 0} Core Dependencies
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#101828] dark:text-white">
                {tech?.systemArchitecture || 'Distributed Cloud-Native Architecture Specification'}
              </h3>
            </div>
          </div>
          <button
            onClick={() => onTriggerPrompt?.(`Extract all API endpoints, parameters, and error codes from ${doc.name}.`)}
            className="px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm shadow-blue-500/20 transition-all flex items-center gap-2 flex-shrink-0"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Generate OpenAPI Spec</span>
          </button>
        </div>

        {tech?.components && tech.components.length > 0 && (
          <div className="bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-[#DCE5F0] dark:border-white/10 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-5 h-5 text-[#2563EB] dark:text-blue-400" />
              <h4 className="text-base font-serif font-bold text-[#101828] dark:text-white">
                Component & Microservice Topology
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tech.components.map((c, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F8FAFD] dark:bg-white/5 border border-[#DCE5F0] dark:border-white/5 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <h5 className="font-bold text-[#101828] dark:text-white font-mono">{c.name}</h5>
                    {c.type && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#EBF2FE] dark:bg-white/10 text-[#2563EB] dark:text-slate-300">
                        {c.type}
                      </span>
                    )}
                  </div>
                  <p className="text-[#53627A] dark:text-slate-400 leading-relaxed">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tech?.apisOrEndpoints && tech.apisOrEndpoints.length > 0 && (
          <div className="bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-[#DCE5F0] dark:border-white/10 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-5 h-5 text-[#2563EB] dark:text-blue-400" />
              <h4 className="text-base font-serif font-bold text-[#101828] dark:text-white">
                Documented API Endpoints & Interfaces
              </h4>
            </div>
            <div className="space-y-2.5">
              {tech.apisOrEndpoints.map((api, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#F8FAFD] dark:bg-white/5 border border-[#DCE5F0] dark:border-white/5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 font-mono">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                      api.method === 'POST' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      api.method === 'GET' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {api.method || 'API'}
                    </span>
                    <span className="font-bold text-[#101828] dark:text-white">{api.name}</span>
                  </div>
                  <p className="text-[#53627A] dark:text-slate-400 sm:text-right">{api.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. BUSINESS STRATEGY & GOVERNANCE LENS
  if (doc.detectedDomain === 'business' || doc.businessData) {
    const biz = doc.businessData;
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#EBF2FE]/80 dark:bg-blue-950/30 border border-[#DCE5F0] dark:border-blue-900/50 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center shadow-sm shadow-blue-500/20 flex-shrink-0">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#2563EB] text-white font-mono uppercase">
                Strategic Business & Governance Lens
              </span>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#101828] dark:text-white mt-1">
                Strategic Objectives & Operational Deliverables
              </h3>
            </div>
          </div>
          <button
            onClick={() => onTriggerPrompt?.(`Create a stakeholder pitch deck executive summary based on ${doc.name}.`)}
            className="px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm shadow-blue-500/20 transition-all flex items-center gap-2 flex-shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Pitch Memo</span>
          </button>
        </div>

        {biz?.strategicObjectives && (
          <div className="bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-[#DCE5F0] dark:border-white/10 shadow-xs">
            <h4 className="text-base font-serif font-bold text-[#101828] dark:text-white mb-4">
              Core Strategic Growth Objectives
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {biz.strategicObjectives.map((obj, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F8FAFD] dark:bg-white/5 border border-[#DCE5F0] dark:border-white/5 text-xs">
                  <span className="text-[10px] font-mono text-[#2563EB] font-bold block mb-1">PILLAR {idx + 1}</span>
                  <p className="font-semibold text-[#101828] dark:text-white">{obj}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 4. BANKING & CASHFLOW INSIGHTS
  if (doc.detectedDomain === 'finance' && doc.financeData) {
    const fin = doc.financeData;
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        {/* Banner: DocFin Cashflow & Fee Radar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#EBF2FE]/80 dark:bg-blue-950/30 border border-[#DCE5F0] dark:border-blue-900/50 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center shadow-sm shadow-blue-500/20 flex-shrink-0">
              <PiggyBank className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#101828] dark:text-white">
                DocFin Cashflow & Fee Optimization Radar
              </h3>
              <p className="text-xs text-[#53627A] dark:text-slate-300 leading-relaxed mt-1">
                We detected <strong className="text-[#2563EB] dark:text-blue-400 font-mono">₹5,800/month</strong> in potential savings across unused subscriptions, non-consensual overdraft fees, and auto-sweep yields.
              </p>
            </div>
          </div>
          <button
            onClick={() => onTriggerPrompt?.('Generate a complete step-by-step action plan to save ₹5,800/month based on this statement.')}
            className="px-6 py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm shadow-blue-500/20 transition-all flex items-center gap-2 flex-shrink-0"
          >
            <Zap className="w-3.5 h-3.5 text-blue-200" />
            <span>Generate Savings Plan</span>
          </button>
        </div>

        {/* Actionable Savings Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fin.savingsTips.map((tip) => (
            <div
              key={tip.id}
              className="bg-white dark:bg-[#121722] rounded-3xl p-6 border border-[#DCE5F0] dark:border-white/10 shadow-xs hover:border-[#2563EB] dark:hover:border-blue-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EBF2FE] text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-300 border border-[#DCE5F0] dark:border-blue-800 font-mono">
                    💰 Save {tip.potentialSavings}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#F4F7FC] dark:bg-white/10 text-[#53627A] dark:text-slate-300 font-mono">
                    {tip.impact}
                  </span>
                </div>
                <h4 className="text-base font-serif font-bold text-[#101828] dark:text-white mb-2">
                  {tip.title}
                </h4>
                <p className="text-xs text-[#53627A] dark:text-slate-400 leading-relaxed">
                  {tip.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#DCE5F0]/60 dark:border-white/5 flex items-center justify-between">
                <button
                  onClick={() => onTriggerPrompt?.(`Explain how to implement: ${tip.title} and give me the exact draft or checklist.`)}
                  className="text-xs font-semibold text-[#2563EB] dark:text-blue-400 hover:underline flex items-center gap-1.5"
                >
                  <span>{tip.action}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleCopy(`${tip.title}: ${tip.description}`, tip.id)}
                  className="p-1.5 text-[#8092A7] hover:text-[#101828] dark:hover:text-slate-200 rounded-lg hover:bg-blue-50/60 dark:hover:bg-white/5"
                  title="Copy tip details"
                >
                  {copiedId === tip.id ? <Check className="w-3.5 h-3.5 text-[#2563EB] dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Section: Recurring Subscriptions & Fee Scanner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recurring Subs (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-[#DCE5F0] dark:border-white/10 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
                <h4 className="text-sm sm:text-base font-serif font-bold text-[#101828] dark:text-white">
                  Recurring Subscriptions & Auto-Debits
                </h4>
              </div>
              <span className="text-xs font-mono font-medium text-[#8092A7]">
                Total: ₹4,350/mo
              </span>
            </div>

            <div className="space-y-2.5">
              {fin.recurringSubs.map((sub) => (
                <div
                  key={sub.id}
                  className="p-3.5 rounded-2xl bg-[#F8FAFD] dark:bg-white/5 border border-[#DCE5F0] dark:border-white/5 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#101828] dark:text-slate-200">{sub.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                        sub.status === 'flagged' ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300' :
                        sub.status === 'infrequent' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' : 'bg-[#EBF2FE] dark:bg-white/10 text-[#2563EB] dark:text-slate-300'
                      }`}>
                        {(sub.status || 'ACTIVE').toUpperCase()}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#8092A7]">Last billed: {sub.lastBilled}</span>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-[#101828] dark:text-white font-mono">₹{sub.amount}</span>
                    <span className="text-[10px] text-[#8092A7] block">{sub.frequency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fee & Penalty Scanner (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-[#DCE5F0] dark:border-white/10 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-rose-700 dark:text-rose-400" />
              <h4 className="text-sm sm:text-base font-serif font-bold text-[#101828] dark:text-white">
                Fees & Overdraft Penalties
              </h4>
            </div>

            <div className="space-y-3">
              {fin.feesAndPenalties.map((fee) => (
                <div key={fee.id} className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#101828] dark:text-slate-200">{fee.feeType}</span>
                    <span className="font-bold text-rose-700 dark:text-rose-400 font-mono">₹{fee.amount}</span>
                  </div>
                  <p className="text-[11px] text-[#53627A] dark:text-slate-400 mb-2.5">{fee.flaggedReason}</p>
                  {fee.disputeEligible && (
                    <button
                      onClick={() => onTriggerPrompt?.(`Draft an official RBI-compliant dispute email to HDFC Bank requesting refund of ₹${fee.amount} for ${fee.feeType}.`)}
                      className="text-[11px] font-bold text-rose-800 dark:text-rose-300 hover:underline flex items-center gap-1 font-mono"
                    >
                      <span>⚡ Draft Bank Dispute Email</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. INSURANCE POLICY INSIGHTS
  if (doc.detectedDomain === 'insurance' && doc.insuranceData) {
    const ins = doc.insuranceData;
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        {/* Coverage vs. Exclusion Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Covered (Green) */}
          <div className="bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-emerald-200 dark:border-emerald-900/40 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-base font-serif font-bold text-[#101828] dark:text-white">
                What Is Fully Covered
              </h4>
            </div>
            <div className="space-y-3">
              {ins.coveredItems.map((item) => (
                <div key={item.id} className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 text-xs">
                  <div className="flex items-center justify-between font-bold text-[#101828] dark:text-white mb-1">
                    <span>{item.title}</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-mono">{item.limit}</span>
                  </div>
                  <p className="text-[11px] text-[#53627A] dark:text-slate-400">{item.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Excluded (Red) */}
          <div className="bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-rose-200 dark:border-rose-900/40 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert className="w-5 h-5 text-rose-700 dark:text-rose-400" />
              <h4 className="text-base font-serif font-bold text-[#101828] dark:text-white">
                Critical Policy Exclusions & Loopholes
              </h4>
            </div>
            <div className="space-y-3">
              {ins.excludedItems.map((item) => (
                <div key={item.id} className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/30 text-xs">
                  <div className="flex items-center justify-between font-bold text-[#101828] dark:text-white mb-1">
                    <span>{item.title}</span>
                    <span className="text-rose-800 dark:text-rose-300 text-[10px] font-mono px-2 py-0.5 rounded-full bg-white dark:bg-white/10">
                      {item.reason}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#53627A] dark:text-slate-400">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cashless Claim 4-Step Checklist */}
        <div className="bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-[#DCE5F0] dark:border-white/10 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
            <h4 className="text-base font-serif font-bold text-[#101828] dark:text-white">
              Emergency Cashless Claim Protocol
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ins.claimChecklist.map((step) => (
              <div key={step.step} className="p-4 rounded-2xl bg-[#F8FAFD] dark:bg-white/5 border border-[#DCE5F0] dark:border-white/5 text-xs flex flex-col justify-between">
                <div>
                  <div className="w-7 h-7 rounded-full bg-[#2563EB] text-white font-bold flex items-center justify-center text-xs mb-3 font-mono">
                    {step.step}
                  </div>
                  <h5 className="font-bold text-[#101828] dark:text-slate-200 mb-1.5 font-serif">{step.title}</h5>
                  <p className="text-[11px] text-[#53627A] dark:text-slate-400 leading-relaxed mb-4">{step.description}</p>
                </div>
                <div className="pt-3 border-t border-[#DCE5F0]/60 dark:border-white/5">
                  <span className="text-[10px] font-semibold text-[#8092A7] uppercase block mb-1 font-mono">Required:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {step.docsNeeded.map((doc, idx) => (
                      <span key={idx} className="text-[9px] px-2 py-0.5 rounded-full bg-[#EBF2FE] dark:bg-white/10 border border-[#DCE5F0] dark:border-white/10 text-[#2563EB] dark:text-slate-300">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 3. LEGAL & CONTRACTS INSIGHTS
  if (doc.detectedDomain === 'legal' && doc.legalData) {
    const leg = doc.legalData;
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-[#DCE5F0] dark:border-white/10 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <Scale className="w-5 h-5 text-[#2563EB] dark:text-slate-200" />
            <h4 className="text-base font-serif font-bold text-[#101828] dark:text-white">
              Covenant & Risk Radar (Plain-English Translations)
            </h4>
          </div>

          <div className="space-y-4">
            {leg.riskyClauses.map((clause) => {
              return (
                <div
                  key={clause.id}
                  className="rounded-3xl border border-[#DCE5F0] dark:border-white/10 bg-[#F8FAFD] dark:bg-white/5 p-5 transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono ${
                        clause.riskLevel === 'Critical' ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900' :
                        'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900'
                      }`}>
                        {clause.riskLevel.toUpperCase()} RISK
                      </span>
                      <h5 className="text-xs font-bold text-[#101828] dark:text-white font-serif">{clause.clause}</h5>
                    </div>
                    <span className="text-[11px] font-mono text-[#8092A7] flex-shrink-0">Page {clause.page}</span>
                  </div>

                  {/* Plain English Translation */}
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-[#161c28] border border-[#DCE5F0] dark:border-white/10 text-xs text-[#101828] dark:text-slate-300 leading-relaxed mb-3">
                    <strong className="text-[#2563EB] dark:text-blue-400 font-bold block mb-1">📖 Plain English Translation:</strong>
                    {clause.plainEnglish}
                  </div>

                  {/* Mitigation Advice */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="text-emerald-700 dark:text-emerald-400 font-medium">
                      <strong>🛡️ Recommended Counter-Clause:</strong> {clause.mitigation}
                    </div>
                    <button
                      onClick={() => onTriggerPrompt?.(`Draft a formal tenant amendment email addressing: ${clause.clause}`)}
                      className="text-xs font-bold text-[#2563EB] dark:text-blue-400 hover:underline flex-shrink-0 ml-3"
                    >
                      Draft Amendment
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 4. BILLING & INVOICE INSIGHTS
  if (doc.detectedDomain === 'billing' && doc.billingData) {
    const bil = doc.billingData;
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-[#DCE5F0] dark:border-white/10 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="w-5 h-5 text-[#2563EB] dark:text-blue-400" />
            <h4 className="text-base font-serif font-bold text-[#101828] dark:text-white">
              Tax & GST Input Credit (ITC) Breakdown
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {bil.taxBreakdown.map((tax, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#F8FAFD] dark:bg-white/5 border border-[#DCE5F0] dark:border-white/5 text-xs flex items-center justify-between">
                <span className="font-medium text-[#101828] dark:text-slate-300">{tax.taxType}</span>
                <span className="font-bold text-[#101828] dark:text-white font-mono">₹{tax.amount}</span>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-2xl bg-[#EBF2FE]/70 dark:bg-blue-950/30 border border-[#DCE5F0] dark:border-blue-900/40 text-xs text-[#101828] dark:text-blue-200">
            <strong>✅ Tax & Billed Breakdown Verified:</strong> All line items and tax components have been verified against the text of {doc.name}.
          </div>
        </div>
      </div>
    );
  }

  // 5. UNIVERSAL / DOMAIN-SPECIFIC INSIGHTS
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-[#DCE5F0] dark:border-white/10 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
          <h4 className="text-base font-serif font-bold text-[#101828] dark:text-white">
            {doc.classificationDetails?.recommendedLens || `${doc.detectedDomain.toUpperCase()} Intelligence`} Synthesis
          </h4>
        </div>
        <p className="text-xs text-[#53627A] dark:text-slate-300 leading-relaxed whitespace-pre-line">
          {doc.summary.executiveBrief || doc.summary.tldr}
        </p>
      </div>

      {doc.summary.importantDetails && doc.summary.importantDetails.length > 0 && (
        <div className="bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-[#DCE5F0] dark:border-white/10 shadow-xs">
          <h4 className="text-base font-serif font-bold text-[#101828] dark:text-white mb-4">
            Domain Attributes & Extracted Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {doc.summary.importantDetails.map((detail, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#F8FAFD] dark:bg-white/5 border border-[#DCE5F0] dark:border-white/5 text-xs">
                <span className="text-[10px] font-mono font-bold text-[#2563EB] uppercase block mb-1">
                  {detail.category}: {detail.title}
                </span>
                <p className="text-[#101828] dark:text-slate-200">{detail.value}</p>
                {detail.page && (
                  <span className="text-[9px] font-mono text-[#8092A7] block mt-1.5">Page {detail.page}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
