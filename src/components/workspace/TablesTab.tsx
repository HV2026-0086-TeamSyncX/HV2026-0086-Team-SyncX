'use client';

import React, { useState } from 'react';
import {
  Download,
  Filter,
  Search,
  ChevronDown,
  ArrowUpDown,
  Table as TableIcon,
  Check,
  FileSpreadsheet
} from 'lucide-react';
import { DocumentAnalysis, ExtractedTable } from '@/lib/types';

export default function TablesTab({ doc }: { doc: DocumentAnalysis }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTableIndex, setSelectedTableIndex] = useState(0);
  const [isExported, setIsExported] = useState(false);

  const tables: ExtractedTable[] = doc.extractedTables || [];
  const activeTable = tables[selectedTableIndex] || tables[0];

  if (tables.length === 0) {
    return (
      <div className="bg-white dark:bg-[#121722] rounded-3xl p-8 border border-[#DCE5F0] dark:border-white/10 shadow-xs text-center space-y-4 animate-in fade-in duration-300">
        <div className="w-12 h-12 rounded-2xl bg-[#EBF2FE] dark:bg-white/5 text-[#2563EB] dark:text-blue-400 flex items-center justify-center mx-auto">
          <TableIcon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-serif font-bold text-[#101828] dark:text-white">
            No Structured Data Tables Detected
          </h3>
          <p className="text-xs text-[#53627A] dark:text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
            The document <strong>{doc.name}</strong> contains narrative paragraphs and layout streams without explicit grid or delimited tables.
          </p>
        </div>
      </div>
    );
  }

  const handleExportCSV = () => {
    if (!activeTable) return;
    const headers = activeTable.columns;
    const csvContent = [
      headers.join(','),
      ...activeTable.rows.map((row) =>
        headers.map((col) => `"${String(row[col] ?? '').replace(/"/g, '""')}"`).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${activeTable.tableName.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsExported(true);
    setTimeout(() => setIsExported(false), 2000);
  };

  const filteredRows = activeTable
    ? activeTable.rows.filter((row) =>
        Object.values(row).some((cell) =>
          String(cell).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : [];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Table Switcher & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#121722] p-4 rounded-3xl border border-[#DCE5F0] dark:border-white/10 shadow-xs">
        {/* Table Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {tables.map((t: ExtractedTable, idx: number) => (
            <button
              key={t.id || idx}
              onClick={() => setSelectedTableIndex(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedTableIndex === idx
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-[#F4F7FC] dark:bg-white/5 text-[#53627A] dark:text-slate-300 hover:text-[#101828] hover:bg-[#EBF2FE]'
              }`}
            >
              {t.tableName}
            </button>
          ))}
        </div>

        {/* Search & Export Actions */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#8092A7] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search table rows..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#F8FAFD] dark:bg-white/5 border border-[#DCE5F0] dark:border-white/10 rounded-full text-xs text-[#101828] dark:text-white placeholder:text-[#8092A7] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            />
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0F172A] hover:bg-[#1E293B] dark:bg-white dark:hover:bg-slate-200 text-white dark:text-[#0F172A] text-xs font-bold transition-all shadow-xs flex-shrink-0"
          >
            {isExported ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileSpreadsheet className="w-3.5 h-3.5" />}
            <span>{isExported ? 'Exported' : 'Export CSV'}</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      {activeTable && (
        <div className="bg-white dark:bg-[#121722] rounded-3xl border border-[#DCE5F0] dark:border-white/10 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-[#DCE5F0] dark:border-white/10 flex items-center justify-between bg-[#F8FAFD] dark:bg-black/20">
            <div className="flex items-center gap-2">
              <TableIcon className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
              <h3 className="text-xs font-bold text-[#101828] dark:text-white uppercase tracking-wider font-mono">
                {activeTable.tableName}
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#8092A7] px-2.5 py-0.5 rounded-full bg-white dark:bg-white/5 border border-[#DCE5F0] dark:border-white/10">
              {filteredRows.length} Rows • Spatial Extraction
            </span>
          </div>

          <div className="overflow-x-auto table-scroll-container scrollbar-thin">
            <table className="min-w-full text-left text-xs whitespace-nowrap sm:whitespace-normal">
              <thead className="bg-[#F8FAFD] dark:bg-white/5 border-b border-[#DCE5F0] dark:border-white/10 text-[#53627A] dark:text-slate-400 uppercase font-mono text-[10px]">
                <tr>
                  {activeTable.columns.map((col: string, idx: number) => (
                    <th key={idx} className="px-3 sm:px-6 py-2.5 sm:py-3 font-semibold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE5F0]/60 dark:divide-white/5 text-[#101828] dark:text-slate-300">
                {filteredRows.map((row: Record<string, string | number>, rIdx: number) => (
                  <tr key={rIdx} className="hover:bg-blue-50/40 dark:hover:bg-white/5 transition-colors">
                    {activeTable.columns.map((col: string, cIdx: number) => (
                      <td key={cIdx} className="px-3 sm:px-6 py-2.5 sm:py-3.5 font-sans break-words-anywhere">
                        {String(row[col] ?? '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
