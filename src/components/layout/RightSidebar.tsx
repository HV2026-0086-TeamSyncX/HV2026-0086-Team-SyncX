'use client';

import React, { useState, useRef } from 'react';
import {
  History,
  FileText,
  ChevronRight,
  ChevronLeft,
  Trash2,
  Search,
  CheckCircle2,
  X,
  Plus,
  CreditCard,
  Scale,
  BookOpen,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import { DocumentAnalysis } from '@/lib/types';

interface RightSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentDoc: DocumentAnalysis | null;
  docs: DocumentAnalysis[];
  onSelectDoc: (doc: DocumentAnalysis) => void;
  onClearHistory: () => void;
  onRemoveDoc?: (docId: string) => void;
  onNewAudit?: () => void;
  onUploadFile?: (file: File) => void;
  onOpenAddMedia?: () => void;
}

export default function RightSidebar({
  isOpen,
  onToggle,
  currentDoc,
  docs,
  onSelectDoc,
  onClearHistory,
  onRemoveDoc,
  onNewAudit,
  onUploadFile,
  onOpenAddMedia
}: RightSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredDocs = docs.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.detectedDomain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUploadClick = () => {
    if (onNewAudit) onNewAudit();
    if (onOpenAddMedia) {
      onOpenAddMedia();
    } else if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getDocIcon = (domain: string) => {
    switch (domain) {
      case 'academic':
        return <BookOpen className="w-4 h-4 text-purple-400" />;
      case 'legal':
        return <Scale className="w-4 h-4 text-rose-400" />;
      case 'finance':
      case 'billing':
        return <CreditCard className="w-4 h-4 text-emerald-400" />;
      case 'insurance':
        return <ShieldCheck className="w-4 h-4 text-blue-400" />;
      default:
        return <FileText className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.doc,.txt,.md,.xlsx,.xls,.csv,.pptx,.png,.jpg,.jpeg,.mp4"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0] && onUploadFile) {
            onUploadFile(e.target.files[0]);
          }
        }}
      />

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      <aside
        className={`bg-white/80 dark:bg-[#0c1017]/80 backdrop-blur-2xl backdrop-saturate-150 text-[#0F172A] dark:text-slate-300 border-l border-black/10 dark:border-white/10 transition-all duration-300 ease-in-out select-none z-50 h-full flex flex-col ${
          isOpen
            ? 'fixed inset-y-0 right-0 w-[300px] max-w-[85vw] md:relative md:w-72 lg:w-80 shadow-2xl md:shadow-none'
            : 'hidden md:flex md:w-0 md:border-l-0 overflow-hidden'
        }`}
      >
        {/* Visible Content Only When Open */}
        {isOpen && (
          <div className="flex flex-col h-full w-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 h-14 border-b border-black/[0.08] dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-md flex-shrink-0">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-white">
                  Document History
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[#53627A] dark:text-slate-400">
                  {docs.length}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleUploadClick}
                  className="p-2 rounded-lg text-[#8092A7] hover:text-[#0F172A] dark:hover:text-white hover:bg-blue-50/60 dark:hover:bg-white/10 transition-colors cursor-pointer touch-target flex items-center justify-center"
                  title="Add Media Files"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={onToggle}
                  className="p-2 rounded-lg text-[#8092A7] hover:text-[#0F172A] dark:hover:text-white hover:bg-blue-50/60 dark:hover:bg-white/10 transition-colors cursor-pointer touch-target flex items-center justify-center"
                  title="Collapse History Sidebar"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Search Filter */}
            <div className="p-3 border-b border-black/[0.08] dark:border-white/10 bg-white/20 dark:bg-white/[0.01] backdrop-blur-xs flex-shrink-0">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#8092A7]" />
                <input
                  type="text"
                  placeholder="Search history..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 placeholder:text-[#8092A7] text-[#0F172A] dark:text-white shadow-2xs backdrop-blur-md"
                />
              </div>
            </div>

            {/* Documents List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-white/10">
              {filteredDocs.length === 0 ? (
                <div className="text-center py-12 px-4 space-y-2.5">
                  <FileText className="w-8 h-8 text-[#8092A7] mx-auto opacity-50" />
                  <p className="text-xs text-[#53627A] dark:text-slate-400">No documents found</p>
                  <button
                    onClick={handleUploadClick}
                    className="text-xs text-[#2563EB] dark:text-blue-400 hover:underline font-semibold cursor-pointer inline-flex items-center gap-1 touch-target"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Media Files</span>
                  </button>
                </div>
              ) : (
                filteredDocs.map((doc) => {
                  const isSelected = currentDoc?.id === doc.id;
                  return (
                    <div
                      key={doc.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('application/json', JSON.stringify({ type: 'docfin-doc', doc }));
                        e.dataTransfer.setData('text/plain', doc.name);
                        e.dataTransfer.effectAllowed = 'copyMove';
                      }}
                      onClick={() => {
                        onSelectDoc(doc);
                        if (typeof window !== 'undefined' && window.innerWidth < 768 && isOpen) {
                          onToggle();
                        }
                      }}
                      className={`group relative p-3.5 rounded-2xl border text-left cursor-grab active:cursor-grabbing transition-all hover:scale-[1.01] touch-target shadow-xs ${
                        isSelected
                          ? 'bg-blue-50/90 dark:bg-blue-950/40 border-blue-500/80 dark:border-blue-500 shadow-aesthetic-sm ring-2 ring-blue-500/20 backdrop-blur-md'
                          : 'bg-white/70 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-blue-400 dark:hover:border-white/20 hover:bg-white/95 dark:hover:bg-white/10 backdrop-blur-md hover:shadow-aesthetic'
                      }`}
                      title="Click to open or drag & drop to chat"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          {getDocIcon(doc.detectedDomain)}
                          <h4 className="text-xs font-bold text-[#0F172A] dark:text-white truncate">
                            {doc.name}
                          </h4>
                        </div>

                        {onRemoveDoc && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveDoc(doc.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 text-[#8092A7] hover:text-rose-600 transition-all rounded cursor-pointer"
                            title="Remove document from history"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-[#53627A] dark:text-slate-400 mt-1.5 font-mono">
                        <span className="uppercase font-semibold text-blue-600 dark:text-blue-400">{doc.detectedDomain}</span>
                        <span>{doc.pageCount} {doc.pageCount === 1 ? 'page' : 'pages'}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Clear History */}
            {docs.length > 0 && (
              <div className="p-3 pb-safe border-t border-black/[0.08] dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-md flex-shrink-0">
                <button
                  onClick={onClearHistory}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-[#53627A] dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors cursor-pointer touch-target"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All History</span>
                </button>
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
