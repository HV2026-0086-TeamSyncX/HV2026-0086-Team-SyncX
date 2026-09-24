'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Plus,
  History,
  Sun,
  Moon,
  Download,
  Settings,
  FileText,
  FileJson,
  Command,
  Sparkles
} from 'lucide-react';
import { DocumentAnalysis } from '@/lib/types';
import { useTheme } from '@/context/ThemeContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  documents: DocumentAnalysis[];
  onSelectDocument: (doc: DocumentAnalysis) => void;
  onNewAudit: () => void;
  onOpenSettings: () => void;
  onOpenExport: () => void;
  onOpenRawJson: () => void;
  onToggleHistory: () => void;
  onOpenOnboarding?: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  documents,
  onSelectDocument,
  onNewAudit,
  onOpenSettings,
  onOpenExport,
  onOpenRawJson,
  onToggleHistory,
  onOpenOnboarding
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard shortcut listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const defaultActions = [
    { id: 'new_doc', title: 'Upload New Document', category: 'Actions', icon: Plus, shortcut: '⌘N', action: () => { onNewAudit(); onClose(); } },
    { id: 'export_memo', title: 'Export Structured Audit Memo', category: 'Actions', icon: Download, shortcut: '⌘E', action: () => { onOpenExport(); onClose(); } },
    { id: 'raw_json', title: 'Inspect Raw JSON Output', category: 'Actions', icon: FileJson, shortcut: '⌘J', action: () => { onOpenRawJson(); onClose(); } },
    { id: 'toggle_history', title: 'Toggle Document History Sidebar', category: 'Navigation', icon: History, shortcut: '⌘H', action: () => { onToggleHistory(); onClose(); } },
    ...(onOpenOnboarding ? [{ id: 'tour', title: 'Launch Interactive Product Tour', category: 'Help', icon: Sparkles, shortcut: '⌘?', action: () => { onOpenOnboarding(); onClose(); } }] : []),
    { id: 'settings', title: 'Open Settings & API Key Config', category: 'Settings', icon: Settings, shortcut: '⌘,', action: () => { onOpenSettings(); onClose(); } },
    { id: 'theme', title: theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme', category: 'Preferences', icon: theme === 'dark' ? Sun : Moon, shortcut: '⌘T', action: () => { toggleTheme(); onClose(); } }
  ];

  const docActions = documents.map((doc) => ({
    id: `doc_${doc.id}`,
    title: doc.name,
    category: 'Recent Documents',
    icon: FileText,
    shortcut: doc.detectedDomain.toUpperCase(),
    action: () => { onSelectDocument(doc); onClose(); }
  }));

  const allItems = [...defaultActions, ...docActions];

  const filtered = query.trim()
    ? allItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-12 sm:pt-24 p-3 sm:p-4 animate-in fade-in duration-150 select-none">
      <div className="bg-white dark:bg-[#0E121A] border border-[#DCE5F0] dark:border-white/15 rounded-2xl sm:rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 border-b border-[#DCE5F0] dark:border-white/10 bg-[#F8FAFD] dark:bg-[#07090E]">
          <Search className="w-4 h-4 text-[#8092A7] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search documents..."
            className="flex-1 text-xs sm:text-sm bg-transparent border-none focus:outline-none text-[#0F172A] dark:text-white placeholder:text-[#8092A7] min-w-0"
          />
          <kbd className="px-2 py-0.5 rounded-lg bg-white dark:bg-white/10 border border-[#DCE5F0] dark:border-white/15 text-[10px] font-mono text-[#8092A7] flex-shrink-0">
            ESC
          </kbd>
        </div>

        {/* Action List */}
        <div className="max-h-80 overflow-y-auto p-1.5 sm:p-2 space-y-1 scrollbar-thin">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#8092A7]">
              No commands or documents found for &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 sm:px-3.5 py-2.5 rounded-2xl text-xs transition-all touch-target cursor-pointer ${
                    isSelected
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'text-[#0F172A] dark:text-slate-200 hover:bg-[#F8FAFD] dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-white' : 'text-[#8092A7]'}`} />
                    <span className="truncate font-medium">{item.title}</span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-lg ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-[#F4F7FC] dark:bg-white/10 text-[#8092A7]'
                    }`}>
                      {item.shortcut}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-[#DCE5F0] dark:border-white/10 bg-[#F8FAFD] dark:bg-[#07090E] flex items-center justify-between text-[10px] text-[#8092A7] font-mono">
          <span>Navigate with ↑ ↓ • Press Enter to select</span>
          <span className="flex items-center gap-1">
            <Command className="w-3 h-3" /> Quick Access
          </span>
        </div>
      </div>
    </div>
  );
}
