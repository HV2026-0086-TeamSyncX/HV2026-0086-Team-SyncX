'use client';

import React, { useState } from 'react';
import { Copy, Check, Download, X, FileJson } from 'lucide-react';

interface RawJsonViewerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: unknown;
}

export default function RawJsonViewer({
  isOpen,
  onClose,
  title,
  data
}: RawJsonViewerProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_raw_data.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0E121A] border border-[#DCE5F0] dark:border-white/10 rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#DCE5F0] dark:border-white/10 flex items-center justify-between bg-[#F8FAFD] dark:bg-[#07090E]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2563EB]/10 text-[#2563EB] dark:text-blue-400 flex items-center justify-center">
              <FileJson className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                Raw JSON Schema Inspector
              </h3>
              <p className="text-[11px] text-[#53627A] dark:text-slate-400 truncate max-w-sm">
                {title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl border border-[#DCE5F0] dark:border-white/10 bg-white dark:bg-white/5 text-xs font-semibold text-[#0F172A] dark:text-slate-200 hover:bg-[#EBF2FE] dark:hover:bg-white/10 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .json</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#8092A7] hover:text-[#0F172A] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Code Content Body */}
        <div className="flex-1 overflow-auto p-6 bg-[#07090E] text-slate-200 font-mono text-xs leading-relaxed select-text">
          <pre className="whitespace-pre-wrap break-all">
            {jsonString}
          </pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#DCE5F0] dark:border-white/10 flex items-center justify-between text-[11px] text-[#8092A7] font-mono bg-[#F8FAFD] dark:bg-[#07090E]">
          <span>Structured Output Size: {(jsonString.length / 1024).toFixed(1)} KB</span>
          <span>DocFin Coordinate Grounded Schema</span>
        </div>
      </div>
    </div>
  );
}
