'use client';

import React, { useState, useEffect } from 'react';
import {
  Scale,
  GitCompare,
  ArrowRight,
  Plus,
  Minus,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Download,
  Copy,
  Check,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { DocumentAnalysis, DocumentComparison } from '@/lib/types';
import { compareDocuments } from '@/lib/documentComparator';

export default function CompareTab({
  currentDoc,
  docsList,
  onSelectDoc
}: {
  currentDoc: DocumentAnalysis;
  docsList: DocumentAnalysis[];
  onSelectDoc?: (doc: DocumentAnalysis) => void;
}) {
  const otherDocs = docsList.filter((d) => d.id !== currentDoc.id);
  const [selectedSecondDocId, setSelectedSecondDocId] = useState<string>(otherDocs[0]?.id || '');
  const [comparison, setComparison] = useState<DocumentComparison | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const selectedSecondDoc = docsList.find((d) => d.id === selectedSecondDocId);

  useEffect(() => {
    if (selectedSecondDoc) {
      const result = compareDocuments(currentDoc, selectedSecondDoc);
      setComparison(result);
    } else {
      setComparison(null);
    }
  }, [currentDoc, selectedSecondDocId, docsList]);

  const handleCopyReport = () => {
    if (!comparison) return;
    const text = `# Document Comparison Report
Document A: ${currentDoc.name} (${currentDoc.detectedDomain.toUpperCase()})
Document B: ${comparison.doc2Name}
Similarity Score: ${comparison.similarityScore}%

## Summary Verdict
${comparison.verdict}

${comparison.comparisonSummary}

## Changed Values (${comparison.changedValues.length})
${comparison.changedValues.map((v) => `- ${v.field}: "${v.doc1Value}" -> "${v.doc2Value}" [${v.significance}]`).join('\n')}

## Added Elements (${comparison.addedItems.length})
${comparison.addedItems.map((a) => `+ [${a.category}] ${a.description}`).join('\n')}

## Removed Elements (${comparison.removedItems.length})
${comparison.removedItems.map((r) => `- [${r.category}] ${r.description}`).join('\n')}
`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Comparison Document Selector Header */}
      <div className="bg-white dark:bg-[#121722] p-6 sm:p-8 rounded-3xl border border-[#DCE5F0] dark:border-white/10 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Doc A Card */}
          <div className="flex-1 p-4 rounded-2xl bg-[#F8FAFD] dark:bg-white/5 border border-[#DCE5F0] dark:border-white/5">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#2563EB] text-white font-mono uppercase">
                Base Document (A)
              </span>
              <span className="text-[10px] font-mono text-[#8092A7]">{currentDoc.fileSize} • {currentDoc.pageCount} pages</span>
            </div>
            <h3 className="text-sm font-bold text-[#0F172A] dark:text-white truncate">
              {currentDoc.name}
            </h3>
            <p className="text-xs text-[#53627A] dark:text-slate-400 mt-1">
              Domain: {currentDoc.detectedDomain.toUpperCase()} ({currentDoc.confidenceScore}% confidence)
            </p>
          </div>

          {/* VS Divider Badge */}
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 rounded-2xl bg-[#EBF2FE] dark:bg-white/10 text-[#2563EB] dark:text-blue-300 flex items-center justify-center font-bold text-xs shadow-xs border border-[#DCE5F0] dark:border-white/10">
              <GitCompare className="w-5 h-5" />
            </div>
          </div>

          {/* Doc B Selector Card */}
          <div className="flex-1 p-4 rounded-2xl bg-[#F8FAFD] dark:bg-white/5 border border-[#DCE5F0] dark:border-white/5 w-full">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#1E7145] text-white font-mono uppercase">
                Comparison Target (B)
              </span>
              <span className="text-[10px] text-[#8092A7]">Select target file</span>
            </div>

            {otherDocs.length > 0 ? (
              <select
                value={selectedSecondDocId}
                onChange={(e) => setSelectedSecondDocId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#121722] border border-[#DCE5F0] dark:border-white/15 text-[#0F172A] dark:text-white font-semibold focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
              >
                {otherDocs.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.detectedDomain.toUpperCase()})
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-xs text-[#8092A7] italic py-1">
                Upload or select a 2nd document in the right history sidebar to compare.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 2. Comparison Results */}
      {comparison && (
        <>
          {/* Executive Verdict & Similarity Card */}
          <div className="bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-[#DCE5F0] dark:border-white/10 shadow-xs relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#EBF2FE] dark:bg-white/10 text-[#2563EB] dark:text-blue-300 flex items-center justify-center font-bold text-lg font-mono">
                  {comparison.similarityScore}%
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-[#0F172A] dark:text-white">
                    Structural & Content Correlation
                  </h3>
                  <p className="text-xs text-[#53627A] dark:text-slate-400">
                    Calculated across {comparison.changedValues.length} value shifts and {comparison.addedItems.length + comparison.removedItems.length} clause variations
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyReport}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F4F7FC] dark:bg-white/10 text-[#0F172A] dark:text-white hover:bg-[#EBF2FE] text-xs font-bold transition-all border border-[#DCE5F0] dark:border-white/10"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Copied' : 'Copy Diff Memo'}</span>
              </button>
            </div>

            {/* Verdict Box */}
            <div className="p-4 rounded-2xl bg-[#EBF2FE]/60 dark:bg-blue-950/30 border border-[#DCE5F0] dark:border-blue-900/40 text-xs text-[#0F172A] dark:text-slate-200 leading-relaxed font-medium">
              <span className="font-bold text-[#2563EB] dark:text-blue-400 mr-2 font-mono uppercase">EXECUTIVE VERDICT:</span>
              {comparison.verdict}
            </div>
          </div>

          {/* 3. Changed Values & Variances Grid */}
          {comparison.changedValues.length > 0 && (
            <div className="bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-[#DCE5F0] dark:border-white/10 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Scale className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
                <h3 className="text-base font-serif font-bold text-[#0F172A] dark:text-white">
                  Modified Values, Quantities & Figures ({comparison.changedValues.length})
                </h3>
              </div>

              <div className="space-y-3">
                {comparison.changedValues.map((v, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#F8FAFD] dark:bg-white/5 border border-[#DCE5F0] dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="font-bold text-[#0F172A] dark:text-white min-w-0">
                      <span className="text-[10px] text-[#8092A7] font-mono block uppercase">Field</span>
                      <span className="truncate">{v.field}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-800 dark:text-rose-300 font-mono">
                        <span className="text-[9px] block text-rose-500 uppercase font-sans">Doc A</span>
                        {v.doc1Value}
                      </div>

                      <ArrowRight className="w-4 h-4 text-[#8092A7]" />

                      <div className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300 font-mono">
                        <span className="text-[9px] block text-emerald-500 uppercase font-sans">Doc B</span>
                        {v.doc2Value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Added & Removed Elements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Added in Doc B */}
            <div className="bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-emerald-200 dark:border-emerald-900/40 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Plus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-serif font-bold text-[#0F172A] dark:text-white">
                  Added in Document B ({comparison.addedItems.length})
                </h3>
              </div>

              <div className="space-y-2.5">
                {comparison.addedItems.length === 0 ? (
                  <p className="text-xs text-[#8092A7] italic">No newly added clauses or entities.</p>
                ) : (
                  comparison.addedItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/30 text-xs text-emerald-950 dark:text-emerald-200"
                    >
                      <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 dark:text-emerald-400 block mb-0.5">
                        +{item.category}
                      </span>
                      <p>{item.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Removed from Doc A */}
            <div className="bg-white dark:bg-[#121722] rounded-3xl p-6 sm:p-8 border border-rose-200 dark:border-rose-900/40 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Minus className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <h3 className="text-base font-serif font-bold text-[#0F172A] dark:text-white">
                  Removed from Document A ({comparison.removedItems.length})
                </h3>
              </div>

              <div className="space-y-2.5">
                {comparison.removedItems.length === 0 ? (
                  <p className="text-xs text-[#8092A7] italic">No omitted clauses or entities.</p>
                ) : (
                  comparison.removedItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/30 text-xs text-rose-950 dark:text-rose-200"
                    >
                      <span className="text-[10px] font-mono font-bold uppercase text-rose-700 dark:text-rose-400 block mb-0.5">
                        -{item.category}
                      </span>
                      <p>{item.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
