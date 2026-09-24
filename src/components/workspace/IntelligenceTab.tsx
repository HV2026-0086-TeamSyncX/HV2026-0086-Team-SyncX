'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Tag,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  Hash,
  Copy,
  Check,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { DocumentAnalysis, TrackedNumber, TrackedDate, TrackedRisk, ExtractedEntity } from '@/lib/types';

export default function IntelligenceTab({
  doc,
  onTriggerPrompt
}: {
  doc: DocumentAnalysis;
  onTriggerPrompt?: (prompt: string) => void;
}) {
  const [activeSubSection, setActiveSubSection] = useState<'all' | 'numbers' | 'dates' | 'entities' | 'risks'>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const numbers = doc.trackedNumbers || doc.summary.numbersAndMetrics || [];
  const dates = doc.trackedDates || doc.summary.importantDates || [];
  const entities = doc.extractedEntities || doc.summary.entities || [];
  const risks = doc.trackedRisks || doc.summary.risksAndConcerns || [];
  const questions = doc.summary.questionsToConsider || doc.sampleQuestions || [];

  const filteredNumbers = numbers.filter((n) =>
    n.label.toLowerCase().includes(searchFilter.toLowerCase()) ||
    String(n.value).toLowerCase().includes(searchFilter.toLowerCase())
  );

  const filteredDates = dates.filter((d) =>
    d.event.toLowerCase().includes(searchFilter.toLowerCase()) ||
    d.date.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const filteredEntities = entities.filter((e) =>
    e.key.toLowerCase().includes(searchFilter.toLowerCase()) ||
    e.value.toLowerCase().includes(searchFilter.toLowerCase()) ||
    e.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const filteredRisks = risks.filter((r) =>
    r.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    r.plainEnglish.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const availableTabs = [
    { id: 'all', label: 'All Intelligence', count: numbers.length + dates.length + entities.length + risks.length },
    ...(numbers.length > 0 ? [{ id: 'numbers', label: 'Numbers & Metrics', count: numbers.length }] : []),
    ...(dates.length > 0 ? [{ id: 'dates', label: 'Timeline & Dates', count: dates.length }] : []),
    ...(entities.length > 0 ? [{ id: 'entities', label: 'Entities & Concepts', count: entities.length }] : []),
    ...(risks.length > 0 ? [{ id: 'risks', label: 'Risks & Anomalies', count: risks.length }] : [])
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Sub-navigation & Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#121722] p-4 rounded-3xl border border-[#DCE5F0] dark:border-white/10 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          {availableTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubSection(tab.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSubSection === tab.id
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-[#F4F7FC] dark:bg-white/5 text-[#53627A] dark:text-slate-300 hover:bg-[#EBF2FE]'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[10px] opacity-75 font-mono">({tab.count})</span>
            </button>
          ))}
        </div>

        <div className="relative sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#8092A7] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter intelligence points..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#F8FAFD] dark:bg-white/5 border border-[#DCE5F0] dark:border-white/10 rounded-full text-xs text-[#0F172A] dark:text-white placeholder:text-[#8092A7] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
          />
        </div>
      </div>

      {/* 1. Tracked Numbers & Quantitative Data */}
      {(activeSubSection === 'all' || activeSubSection === 'numbers') && numbers.length > 0 && (
        <div className="bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-[#DCE5F0] dark:border-white/10 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
              <h3 className="text-base font-serif font-bold text-[#0F172A] dark:text-white">
                Quantitative Numbers & Key Metrics Tracker
              </h3>
            </div>
            <span className="text-xs font-mono text-[#8092A7]">
              {filteredNumbers.length} data points extracted
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredNumbers.map((num) => (
              <div
                key={num.id}
                className="p-4 rounded-2xl bg-[#F8FAFD] dark:bg-white/5 border border-[#DCE5F0] dark:border-white/5 hover:border-[#2563EB] dark:hover:border-blue-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8092A7] mb-1.5">
                    <span className="uppercase font-semibold tracking-wider">{num.category}</span>
                    <span>Page {num.page}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#0F172A] dark:text-white mb-1">
                    {num.label}
                  </h4>
                  <p className="text-lg font-mono font-bold text-[#2563EB] dark:text-blue-400 mb-2">
                    {num.value}
                  </p>
                  <p className="text-xs text-[#53627A] dark:text-slate-400 leading-relaxed">
                    {num.context}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#DCE5F0]/60 dark:border-white/5 flex items-center justify-between text-[11px]">
                  <button
                    onClick={() => onTriggerPrompt?.(`Explain how the figure "${num.value}" (${num.label}) was calculated or referenced in ${doc.name}.`)}
                    className="text-[#2563EB] dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Analyze figure</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleCopy(`${num.label}: ${num.value}`, num.id)}
                    className="text-[#8092A7] hover:text-[#0F172A] p-1"
                  >
                    {copiedKey === num.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Timeline & Milestone Dates */}
      {(activeSubSection === 'all' || activeSubSection === 'dates') && dates.length > 0 && (
        <div className="bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-[#DCE5F0] dark:border-white/10 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
            <h3 className="text-base font-serif font-bold text-[#0F172A] dark:text-white">
              Timeline of Critical Dates & Deadlines
            </h3>
          </div>

          <div className="space-y-3">
            {filteredDates.map((d) => (
              <div
                key={d.id}
                className="p-4 rounded-2xl bg-[#F8FAFD] dark:bg-white/5 border border-[#DCE5F0] dark:border-white/5 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#EBF2FE] dark:bg-white/10 text-[#2563EB] dark:text-blue-300 flex items-center justify-center font-bold flex-shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-[#0F172A] dark:text-white truncate">{d.event}</h4>
                    <span className="text-[11px] text-[#8092A7] font-mono">
                      Category: {d.type.toUpperCase()} • Grounded on Page {d.page}
                    </span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 ml-4">
                  <span className="px-3 py-1 rounded-full bg-[#EBF2FE] dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-300 font-mono font-bold text-xs border border-[#DCE5F0] dark:border-blue-800">
                    {d.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Entities & Stakeholders */}
      {(activeSubSection === 'all' || activeSubSection === 'entities') && entities.length > 0 && (
        <div className="bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-[#DCE5F0] dark:border-white/10 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
            <h3 className="text-base font-serif font-bold text-[#0F172A] dark:text-white">
              Grounded Entities & Concepts
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredEntities.map((entity, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#F8FAFD] dark:bg-white/5 border border-[#DCE5F0] dark:border-white/5 flex items-center justify-between text-xs"
              >
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] font-mono font-semibold uppercase text-[#8092A7] block">
                    {entity.category}: {entity.key}
                  </span>
                  <p className="font-bold text-[#0F172A] dark:text-white truncate mt-0.5">
                    {entity.value}
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#EBF2FE] dark:bg-white/10 text-[#2563EB] dark:text-slate-300 flex-shrink-0 font-semibold">
                  Pg {entity.page}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Risks & Anomalies Radar */}
      {(activeSubSection === 'all' || activeSubSection === 'risks') && risks.length > 0 && (
        <div className="bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-[#DCE5F0] dark:border-white/10 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <h3 className="text-base font-serif font-bold text-[#0F172A] dark:text-white">
              Identified Risks, Anomalies & Concerns
            </h3>
          </div>

          <div className="space-y-3.5">
            {filteredRisks.map((risk) => (
              <div
                key={risk.id}
                className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-xs"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      risk.riskLevel === 'Critical' ? 'bg-rose-600 text-white' :
                      risk.riskLevel === 'High' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200' :
                      'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                    }`}>
                      {risk.riskLevel.toUpperCase()} RISK
                    </span>
                    <h4 className="font-bold text-[#0F172A] dark:text-white font-serif">{risk.title}</h4>
                  </div>
                  <span className="text-[10px] font-mono text-[#8092A7]">Page {risk.page}</span>
                </div>

                <p className="text-xs text-[#53627A] dark:text-slate-300 leading-relaxed mb-2.5">
                  {risk.plainEnglish}
                </p>

                {risk.mitigation && (
                  <div className="p-2.5 rounded-xl bg-white dark:bg-black/30 border border-rose-100 dark:border-white/10 text-emerald-800 dark:text-emerald-300 text-[11px] font-medium">
                    <strong>🛡️ Recommended Counter-Measure:</strong> {risk.mitigation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Questions to Consider */}
      {questions.length > 0 && (
        <div className="bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-[#DCE5F0] dark:border-white/10 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
            <h3 className="text-base font-serif font-bold text-[#0F172A] dark:text-white">
              Questions to Consider for Further Investigation
            </h3>
          </div>

          <div className="space-y-2.5">
            {questions.map((q, idx) => (
              <div
                key={idx}
                onClick={() => onTriggerPrompt?.(q)}
                className="p-3.5 rounded-2xl bg-[#F8FAFD] dark:bg-white/5 border border-[#DCE5F0] dark:border-white/5 hover:border-[#2563EB] dark:hover:border-blue-500 transition-all flex items-center justify-between text-xs cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#EBF2FE] dark:bg-white/10 text-[#2563EB] dark:text-blue-300 font-mono font-bold flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-[#0F172A] dark:text-slate-200 group-hover:text-[#2563EB] dark:group-hover:text-blue-400">
                    {q}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#8092A7] group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
