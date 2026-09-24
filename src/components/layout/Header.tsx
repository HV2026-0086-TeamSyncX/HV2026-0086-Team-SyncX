'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import {
  Columns,
  Download,
  Home,
  Sun,
  Moon,
  FileText,
  History,
  LogOut,
  Settings,
  HelpCircle,
  Sparkles,
  Plus,
  X,
  Menu,
  MoreVertical
} from 'lucide-react';
import { DocumentDomain, DocumentAnalysis } from '@/lib/types';

interface HeaderProps {
  activeDomain: DocumentDomain;
  currentDoc: DocumentAnalysis | null;
  isSplitView: boolean;
  onToggleSplitView: () => void;
  onOpenExportModal: () => void;
  onResetDoc?: () => void;
  isHistoryOpen?: boolean;
  onToggleHistory?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenSettings?: () => void;
  onOpenOnboarding?: () => void;
  onToggleLeftSidebar?: () => void;
  isLeftSidebarOpen?: boolean;
}

export default function Header({
  activeDomain,
  currentDoc,
  isSplitView,
  onToggleSplitView,
  onOpenExportModal,
  onResetDoc,
  isHistoryOpen = false,
  onToggleHistory,
  onOpenCommandPalette,
  onOpenSettings,
  onOpenOnboarding,
  onToggleLeftSidebar,
  isLeftSidebarOpen
}: HeaderProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="h-14 bg-white/85 dark:bg-[#07090e]/85 backdrop-blur-md border-b border-[#DCE5F0] dark:border-white/10 px-2.5 sm:px-4 md:px-6 flex items-center justify-between gap-2 z-20 select-none transition-colors duration-200 w-full max-w-[100vw]">
      {/* Left: Mobile Drawer Trigger + Active Mode & Context Info */}
      <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 flex-1">
        {/* Mobile Hamburger Toggle for Left Sidebar */}
        {onToggleLeftSidebar && (
          <button
            onClick={onToggleLeftSidebar}
            className="md:hidden p-2 rounded-xl text-[#53627A] dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white hover:bg-blue-50/60 dark:hover:bg-white/5 border border-[#DCE5F0] dark:border-white/10 flex-shrink-0 touch-target flex items-center justify-center cursor-pointer"
            aria-label="Toggle navigation menu"
            title="Toggle navigation"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        {currentDoc ? (
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 bg-[#F4F7FC] dark:bg-white/5 border border-[#DCE5F0] dark:border-white/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full max-w-[calc(100vw-170px)] sm:max-w-none">
            <FileText className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400 flex-shrink-0" />
            <span className="text-xs font-semibold text-[#0F172A] dark:text-white truncate max-w-[110px] xs:max-w-[160px] sm:max-w-xs md:max-w-md">
              {currentDoc.name}
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded-full bg-[#EBF2FE] dark:bg-blue-950/80 text-[#2563EB] dark:text-blue-300 font-bold hidden xs:inline-block">
              {currentDoc.detectedDomain.toUpperCase()}
            </span>
            {onResetDoc && (
              <button
                onClick={onResetDoc}
                className="hover:text-rose-500 text-slate-400 p-0.5 rounded-full transition-colors ml-0.5 cursor-pointer"
                title="Close document and return to general AI chat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shadow-xs flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="text-xs font-bold text-[#0F172A] dark:text-white truncate">
                DocFin AI
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-semibold hidden sm:inline-block">
                Gemini 2.0
              </span>
            </div>
          </div>
        )}

        {/* Start New Chat Action */}
        {onResetDoc && (
          <button
            onClick={onResetDoc}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F7FC] hover:bg-[#EBF2FE] dark:bg-white/5 dark:hover:bg-white/10 border border-[#DCE5F0] dark:border-white/10 text-xs font-medium text-[#0F172A] dark:text-slate-200 transition-colors cursor-pointer flex-shrink-0"
            title="Start new conversation"
          >
            <Plus className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
            <span className="hidden md:inline">New Chat</span>
          </button>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="w-8 h-8 rounded-xl text-[#53627A] dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white hover:bg-blue-50/60 dark:hover:bg-white/5 border border-[#DCE5F0] dark:border-white/10 flex items-center justify-center transition-colors cursor-pointer"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-[#0F172A]" />}
        </button>

        {currentDoc && (
          <>
            {/* Split View Toggle (Desktop & Tablets) */}
            <button
              onClick={onToggleSplitView}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                isSplitView
                  ? 'bg-[#2563EB] text-white border-[#2563EB]'
                  : 'bg-[#F4F7FC] dark:bg-white/5 text-[#53627A] dark:text-slate-300 border-[#DCE5F0] dark:border-white/10 hover:text-[#0F172A] hover:bg-[#EBF2FE]'
              }`}
              title="Toggle split view document canvas"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>{isSplitView ? 'Close Split' : 'Split View'}</span>
            </button>

            {/* Export Audit Memo */}
            <button
              onClick={onOpenExportModal}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-[#1E7145] hover:bg-[#185E39] text-white text-xs font-bold shadow-xs transition-all cursor-pointer flex-shrink-0"
              title="Export structured document audit brief"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Memo</span>
            </button>
          </>
        )}

        {/* Quick Tour / Helper Button */}
        {onOpenOnboarding && (
          <button
            onClick={onOpenOnboarding}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/80 dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 border border-black/10 dark:border-white/10 hover:border-emerald-500/30 text-xs font-semibold transition-all cursor-pointer shadow-2xs backdrop-blur-md"
            title="Interactive Product Tour & Helper Guide"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span className="hidden sm:inline">Tour</span>
          </button>
        )}

        {/* Settings Dialog Trigger (Hidden on small mobile, accessible in overflow) */}
        {onOpenSettings && (
          <button
            onClick={onOpenSettings}
            className="hidden sm:flex p-2 rounded-xl text-[#53627A] dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white hover:bg-blue-50/60 dark:hover:bg-white/5 border border-[#DCE5F0] dark:border-white/10 transition-colors cursor-pointer"
            title="Settings & API Key Configuration"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Home Button (Hidden on xs mobile) */}
        <Link
          href="/"
          className="hidden sm:flex p-2 rounded-xl text-[#53627A] dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white hover:bg-blue-50/60 dark:hover:bg-white/5 border border-[#DCE5F0] dark:border-white/10 transition-colors"
          title="Return to Home"
        >
          <Home className="w-3.5 h-3.5" />
        </Link>

        {/* Right-Most Collapsible History Toggle */}
        {onToggleHistory && (
          <button
            onClick={onToggleHistory}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              isHistoryOpen
                ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                : 'bg-[#F4F7FC] dark:bg-white/5 text-[#53627A] dark:text-slate-300 border-[#DCE5F0] dark:border-white/10 hover:text-[#0F172A] hover:bg-[#EBF2FE]'
            }`}
            title="Toggle document history sidebar"
          >
            <History className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">History</span>
          </button>
        )}

        {/* Mobile Overflow Menu Button (Visible on screens < 640px) */}
        <div className="relative sm:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-8 h-8 rounded-xl text-[#53627A] dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white hover:bg-blue-50/60 dark:hover:bg-white/5 border border-[#DCE5F0] dark:border-white/10 flex items-center justify-center transition-colors cursor-pointer touch-target"
            aria-label="More options"
            aria-expanded={isMobileMenuOpen}
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* Mobile Overflow Dropdown */}
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40 bg-black/20"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
              />

              <div className="absolute right-0 top-11 w-52 p-2 rounded-2xl bg-white dark:bg-[#121722] border border-[#DCE5F0] dark:border-white/15 shadow-2xl space-y-1 z-50 animate-in fade-in zoom-in-95">
                {onResetDoc && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onResetDoc();
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#0F172A] dark:text-white hover:bg-blue-50 dark:hover:bg-white/5 transition-colors text-left touch-target cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-blue-500" />
                    <span>New Chat</span>
                  </button>
                )}
                {onOpenOnboarding && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenOnboarding();
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#0F172A] dark:text-white hover:bg-blue-50 dark:hover:bg-white/5 transition-colors text-left touch-target cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4 text-emerald-500" />
                    <span>Product Tour</span>
                  </button>
                )}
                {onOpenSettings && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenSettings();
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#0F172A] dark:text-white hover:bg-blue-50 dark:hover:bg-white/5 transition-colors text-left touch-target cursor-pointer"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Settings & API</span>
                  </button>
                )}
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#0F172A] dark:text-white hover:bg-blue-50 dark:hover:bg-white/5 transition-colors touch-target"
                >
                  <Home className="w-4 h-4 text-slate-400" />
                  <span>Return to Home</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
