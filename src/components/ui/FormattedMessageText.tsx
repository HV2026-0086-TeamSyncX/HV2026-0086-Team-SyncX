'use client';

import React from 'react';
import { FileText } from 'lucide-react';

interface FormattedTextProps {
  content: string;
  isAssistant?: boolean;
}

export default function FormattedMessageText({ content, isAssistant = true }: FormattedTextProps) {
  if (!content) return null;

  // Split by double newline or distinct section breaks
  const blocks = content.split(/\n\s*\n/);

  return (
    <div className="space-y-3 font-sans text-xs sm:text-[13px] leading-relaxed text-slate-800 dark:text-slate-200">
      {blocks.map((block, bIdx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // 1. Horizontal Dividers (--- or ***)
        if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
          return (
            <div
              key={bIdx}
              className="my-3.5 border-t border-black/[0.08] dark:border-white/[0.08]"
            />
          );
        }

        // 2. Headings (#, ##, ### or bold single-line title)
        if (trimmed.startsWith('#')) {
          const cleanHeading = trimmed.replace(/^#+\s*/, '').replace(/\*\*/g, '');
          return (
            <div
              key={bIdx}
              className="text-xs sm:text-sm font-serif font-bold text-[#0F172A] dark:text-white pt-2 pb-1 flex items-center gap-2 border-b border-black/[0.06] dark:border-white/[0.08]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-blue-400 flex-shrink-0" />
              <span>{cleanHeading}</span>
            </div>
          );
        }

        // Heading without hash (e.g. "50/30/20 Personalized Recommendations" or "Executive Summary")
        if (
          !trimmed.includes('\n') &&
          trimmed.length < 80 &&
          (trimmed.endsWith('Recommendations') ||
            trimmed.endsWith('Summary') ||
            trimmed.endsWith('Analysis') ||
            trimmed.endsWith('Audit') ||
            trimmed.endsWith('Checklist') ||
            trimmed.endsWith('Overview') ||
            trimmed.endsWith('Breakdown') ||
            trimmed.endsWith('Takeaways'))
        ) {
          return (
            <div
              key={bIdx}
              className="text-xs sm:text-sm font-serif font-bold text-[#0F172A] dark:text-white pt-2 pb-1 flex items-center gap-2 border-b border-black/[0.06] dark:border-white/[0.08]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-blue-400 flex-shrink-0" />
              <span>{trimmed.replace(/\*\*/g, '')}</span>
            </div>
          );
        }

        // 3. Markdown Data Table
        if (trimmed.includes('|') && trimmed.split('\n').length >= 2) {
          const lines = trimmed.split('\n').filter((l) => l.trim().startsWith('|'));
          if (lines.length >= 2) {
            const headerLine = lines[0];
            const dataLines = lines.slice(2);
            const headers = headerLine
              .split('|')
              .map((c) => c.trim())
              .filter(Boolean);

            return (
              <div
                key={bIdx}
                className="overflow-x-auto my-3 rounded-2xl border border-black/10 dark:border-white/10 shadow-sm studio-card table-scroll-container max-w-full"
              >
                <table className="min-w-full text-left text-[11px] sm:text-xs divide-y divide-black/[0.06] dark:divide-white/[0.08]">
                  <thead className="bg-black/[0.03] dark:bg-white/5 font-semibold text-[#0F172A] dark:text-white">
                    <tr>
                      {headers.map((h, hIdx) => (
                        <th
                          key={hIdx}
                          className="px-3 py-2 border-b border-black/[0.06] dark:border-white/[0.08] whitespace-nowrap font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-700 dark:text-slate-300"
                        >
                          {h.replace(/\*\*/g, '')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.05]">
                    {dataLines.map((row, rIdx) => {
                      const cells = row
                        .split('|')
                        .map((c) => c.trim())
                        .filter(Boolean);
                      if (cells.length === 0) return null;
                      return (
                        <tr
                          key={rIdx}
                          className="hover:bg-blue-50/40 dark:hover:bg-white/[0.02] transition-colors"
                        >
                          {cells.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className="px-3 py-1.5 whitespace-nowrap text-slate-700 dark:text-slate-300 font-sans text-[11px] sm:text-xs"
                            >
                              {renderFormattedInline(cell)}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          }
        }

        // 4. List Items & Numbered Steps
        const lines = trimmed.split('\n');
        const hasListItems = lines.some(
          (l) =>
            l.trim().startsWith('-') ||
            l.trim().startsWith('*') ||
            /^\d+[\.\)]\s/.test(l.trim()) ||
            /^\*\*\d+[\.\)]\*\*/.test(l.trim())
        );

        if (hasListItems && lines.length > 1) {
          return (
            <div key={bIdx} className="space-y-2 pl-0.5 my-1.5">
              {lines.map((line, lIdx) => {
                const lineTrimmed = line.trim();
                if (!lineTrimmed) return null;

                const isNumbered = /^\d+[\.\)]\s/.test(lineTrimmed) || /^\*\*\d+[\.\)]\*\*/.test(lineTrimmed);
                const isBullet = lineTrimmed.startsWith('-') || lineTrimmed.startsWith('*') || lineTrimmed.startsWith('•');

                if (isNumbered) {
                  const numberMatch = lineTrimmed.match(/^(\d+)[\.\)]/) || lineTrimmed.match(/^\*\*(\d+)[\.\)]\*\*/);
                  const numStr = numberMatch ? numberMatch[1] : `${lIdx + 1}`;
                  const cleanItemText = lineTrimmed
                    .replace(/^\*\*\d+[\.\)]\*\*\s*/, '')
                    .replace(/^\d+[\.\)]\s*/, '')
                    .trim();

                  return (
                    <div
                      key={lIdx}
                      className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] shadow-aesthetic-sm flex items-start gap-3 hover:border-black/15 dark:hover:border-white/15 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono text-[11px] font-bold flex-shrink-0 mt-0.5 shadow-2xs">
                        {numStr}
                      </div>
                      <div className="flex-1 text-slate-800 dark:text-slate-200 text-xs sm:text-[13px] leading-relaxed">
                        {renderFormattedInline(cleanItemText)}
                      </div>
                    </div>
                  );
                }

                if (isBullet) {
                  const cleanItemText = lineTrimmed.replace(/^[-*•]\s*/, '').trim();
                  return (
                    <div key={lIdx} className="flex items-start gap-2.5 pl-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-blue-400 mt-1.5 flex-shrink-0" />
                      <div className="flex-1 text-slate-800 dark:text-slate-200 text-xs sm:text-[13px] leading-relaxed">
                        {renderFormattedInline(cleanItemText)}
                      </div>
                    </div>
                  );
                }

                return (
                  <p key={lIdx} className="text-slate-800 dark:text-slate-200 font-semibold mb-1 text-xs sm:text-[13px]">
                    {renderFormattedInline(lineTrimmed)}
                  </p>
                );
              })}
            </div>
          );
        }

        // 5. Standalone Numbered Block
        if (/^\d+[\.\)]\s/.test(trimmed) || /^\*\*\d+[\.\)]\*\*/.test(trimmed)) {
          const numberMatch = trimmed.match(/^(\d+)[\.\)]/) || trimmed.match(/^\*\*(\d+)[\.\)]\*\*/);
          const numStr = numberMatch ? numberMatch[1] : '1';
          const cleanItemText = trimmed
            .replace(/^\*\*\d+[\.\)]\*\*\s*/, '')
            .replace(/^\d+[\.\)]\s*/, '')
            .trim();

          return (
            <div
              key={bIdx}
              className="p-3 sm:p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.08] shadow-aesthetic-sm flex items-start gap-3 my-1.5 hover:border-black/15 dark:hover:border-white/15 transition-all"
            >
              <div className="w-5 h-5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono text-[11px] font-bold flex-shrink-0 mt-0.5 shadow-2xs">
                {numStr}
              </div>
              <div className="flex-1 text-slate-800 dark:text-slate-200 text-xs sm:text-[13px] leading-relaxed">
                {renderFormattedInline(cleanItemText)}
              </div>
            </div>
          );
        }

        // 6. Normal Clean Text Paragraph
        return (
          <p
            key={bIdx}
            className={`text-xs sm:text-[13px] leading-relaxed ${
              isAssistant ? 'text-slate-800 dark:text-slate-200' : 'text-white font-medium'
            }`}
          >
            {renderFormattedInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function renderFormattedInline(text: string): React.ReactNode {
  // Strip raw italic wrapping syntax e.g. *citation note* -> citation note
  const cleaned = text;

  // Split by bold (**text**), citations, backticks (`code`), and page citations (*(Page X)*)
  const parts = cleaned.split(/(\*\*[^*]+\*\*|`[^`]+`|\*\(Page\s*\d+(?:,\s*Page\s*\d+)*\)\*|\(Page\s*\d+(?:,\s*Page\s*\d+)*\))/g);

  return (
    <>
      {parts.map((part, idx) => {
        if (!part) return null;

        // Bold formatting
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={idx} className="font-bold text-[#0F172A] dark:text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }

        // Inline Code snippet
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={idx}
              className="px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 font-mono text-[11px] text-blue-600 dark:text-blue-400 font-semibold"
            >
              {part.slice(1, -1)}
            </code>
          );
        }

        // Page Citations (e.g. *(Page 2)* or (Page 2, Page 4))
        if (
          (part.startsWith('*(Page') && part.endsWith(')*')) ||
          (part.startsWith('(Page') && part.endsWith(')'))
        ) {
          const pageClean = part.replace(/\*/g, '').replace(/[()]/g, '');
          return (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-bold border border-blue-500/20 mx-1 align-baseline shadow-2xs"
            >
              <FileText className="w-2.5 h-2.5" />
              <span>{pageClean}</span>
            </span>
          );
        }

        return <span key={idx}>{part}</span>;
      })}
    </>
  );
}
