'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  SquarePen,
  Image as ImageIcon,
  Library,
  Puzzle,
  Folder,
  MoreHorizontal,
  MessageSquare,
  Search,
  PanelLeftClose,
  PanelLeft,
  Trash2,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight,
  CreditCard,
  Scale,
  BookOpen,
  ShieldCheck,
  FileSpreadsheet,
  Film
} from 'lucide-react';
import { DocumentAnalysis, DocumentDomain, MediaType } from '@/lib/types';

interface LeftSidebarProps {
  currentDoc?: DocumentAnalysis | null;
  docsList?: DocumentAnalysis[];
  onSelectDoc?: (doc: DocumentAnalysis) => void;
  onNewSession?: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onNewAudit?: () => void;
  activeDomain?: DocumentDomain;
  onSelectDomain?: (domain: DocumentDomain) => void;
  onOpenAddMedia?: (category?: MediaType | 'all') => void;
  onOpenSearch?: () => void;
  isHistoryOpen?: boolean;
  onToggleHistory?: () => void;
}

export default function LeftSidebar({
  currentDoc,
  docsList = [],
  onSelectDoc,
  onNewSession,
  isCollapsed,
  onToggleCollapse,
  onNewAudit,
  activeDomain,
  onSelectDomain,
  onOpenAddMedia,
  onOpenSearch,
  isHistoryOpen = false,
  onToggleHistory
}: LeftSidebarProps) {
  const router = useRouter();
  const { logout, user } = useAuth();
  const [showCapabilitiesMenu, setShowCapabilitiesMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleCreateNew = () => {
    if (onNewSession) onNewSession();
    else if (onNewAudit) onNewAudit();
  };

  // Separate pinned documents from regular recent documents
  const pinnedDocs = docsList.filter((doc) => doc.isFavorite);
  const recentDocs = docsList.filter((doc) => !doc.isFavorite);

  return (
    <>
      {/* Mobile Drawer Backdrop (Only on < md when not collapsed) */}
      {!isCollapsed && (
        <div
          onClick={onToggleCollapse}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      <aside
        className={`bg-[#0d0d0d] text-[#e3e3e3] border-r border-white/[0.08] transition-all duration-300 ease-in-out select-none z-50 h-full font-sans flex flex-col ${
          isCollapsed
            ? 'hidden md:flex md:w-16 relative'
            : 'fixed inset-y-0 left-0 w-[280px] max-w-[85vw] md:relative md:w-64 lg:w-[260px] shadow-2xl md:shadow-none'
        }`}
      >
        {/* 1. Top Header */}
        <div className="flex items-center justify-between px-3.5 h-14 border-b border-white/[0.06] flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 overflow-hidden group">
            <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white font-bold text-xs group-hover:bg-[#2563EB] transition-colors">
              D
            </div>
            {!isCollapsed && (
              <span className="font-semibold text-sm tracking-tight text-white">
                DocFin
              </span>
            )}
          </Link>

          {!isCollapsed && (
            <div className="flex items-center gap-0.5">
              {onOpenSearch && (
                <button
                  onClick={onOpenSearch}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer touch-target flex items-center justify-center"
                  title="Search (⌘K)"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onToggleCollapse}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer touch-target flex items-center justify-center"
                title="Close sidebar"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>
          )}

          {isCollapsed && (
            <button
              onClick={onToggleCollapse}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors mx-auto cursor-pointer touch-target flex items-center justify-center"
              title="Expand sidebar"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
          )}
        </div>

      {/* 2. Top Navigation Items (ChatGPT Style) */}
      <div className="p-2 space-y-0.5 flex-shrink-0">
        {/* New Chat Button */}
        <button
          onClick={handleCreateNew}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-white hover:bg-white/10 transition-colors cursor-pointer ${
            isCollapsed ? 'justify-center px-0' : ''
          }`}
          title="New chat"
        >
          <SquarePen className="w-4 h-4 text-slate-300" />
          {!isCollapsed && <span>New chat</span>}
        </button>

        {/* Library (Toggles Right History Sidebar) */}
        <button
          onClick={() => {
            if (onToggleHistory) onToggleHistory();
          }}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            isHistoryOpen
              ? 'bg-blue-600/30 text-white border border-blue-500/40 shadow-xs'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          } ${isCollapsed ? 'justify-center px-0' : ''}`}
          title="Library (Document History)"
        >
          <Library className={`w-4 h-4 ${isHistoryOpen ? 'text-blue-400' : 'text-slate-400'}`} />
          {!isCollapsed && (
            <div className="flex-1 flex items-center justify-between">
              <span>Library</span>
              {isHistoryOpen && <span className="text-[10px] font-mono text-blue-400 font-bold">OPEN</span>}
            </div>
          )}
        </button>

        {/* Capabilities / Plugins */}
        <div className="relative">
          <button
            onClick={() => setShowCapabilitiesMenu(!showCapabilitiesMenu)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center px-0' : ''
            }`}
            title="Capabilities"
          >
            <div className="flex items-center gap-3">
              <Puzzle className="w-4 h-4 text-slate-400" />
              {!isCollapsed && <span>Plugins</span>}
            </div>
            {!isCollapsed && (
              <ChevronRight
                className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                  showCapabilitiesMenu ? 'rotate-90' : ''
                }`}
              />
            )}
          </button>

          {/* Expanded Capabilities Submenu */}
          {showCapabilitiesMenu && !isCollapsed && (
            <div className="pl-9 pr-2 py-1 space-y-1 animate-in fade-in">
              {[
                { id: 'finance', label: 'Bank Statements', icon: CreditCard, color: 'text-emerald-400' },
                { id: 'legal', label: 'Legal Contracts', icon: Scale, color: 'text-rose-400' },
                { id: 'academic', label: 'Academic Papers', icon: BookOpen, color: 'text-purple-400' },
                { id: 'insurance', label: 'Insurance Policies', icon: ShieldCheck, color: 'text-blue-400' },
                { id: 'billing', label: 'Spreadsheets & Data', icon: FileSpreadsheet, color: 'text-cyan-400' },
                { id: 'overall', label: 'Photos & Videos', icon: Film, color: 'text-amber-400' }
              ].map((cap) => {
                const CapIcon = cap.icon;
                const isSelected = activeDomain === cap.id;
                return (
                  <button
                    key={cap.id}
                    onClick={() => {
                      if (onSelectDomain) onSelectDomain(cap.id as DocumentDomain);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded-lg text-[11px] transition-colors flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-white/15 text-white font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <CapIcon className={`w-3 h-3 ${cap.color}`} />
                    <span className="truncate">{cap.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Projects / Workspaces */}
        <button
          onClick={() => {
            if (onSelectDomain) onSelectDomain('general');
          }}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ${
            isCollapsed ? 'justify-center px-0' : ''
          }`}
          title="Projects"
        >
          <Folder className="w-4 h-4 text-slate-400" />
          {!isCollapsed && <span>Projects</span>}
        </button>

        {/* More */}
        <button
          onClick={() => setShowCapabilitiesMenu(!showCapabilitiesMenu)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ${
            isCollapsed ? 'justify-center px-0' : ''
          }`}
          title="More options"
        >
          <MoreHorizontal className="w-4 h-4 text-slate-400" />
          {!isCollapsed && <span>More</span>}
        </button>
      </div>

      {/* 3. Main Scrollable Sessions Area (Pinned & Recents) */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4 scrollbar-thin scrollbar-thumb-white/10 border-t border-white/[0.06]">
        {/* Pinned Section */}
        {mounted && pinnedDocs.length > 0 && !isCollapsed && (
          <div>
            <p className="px-3 mb-1 text-[11px] font-medium text-slate-500">
              Pinned
            </p>
            <div className="space-y-0.5">
              {pinnedDocs.map((doc) => {
                const isActive = currentDoc?.id === doc.id;
                return (
                  <button
                    key={doc.id}
                    onClick={() => {
                      if (onSelectDoc) onSelectDoc(doc);
                      if (typeof window !== 'undefined' && window.innerWidth < 768 && !isCollapsed) {
                        onToggleCollapse();
                      }
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-2.5 group cursor-pointer touch-target ${
                      isActive
                        ? 'bg-[#212121] text-white font-medium'
                        : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                    }`}
                    title={doc.name}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate flex-1">{doc.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Recents Section */}
        <div>
          {!isCollapsed && (
            <p className="px-3 mb-1 text-[11px] font-medium text-slate-500">
              Recents
            </p>
          )}

          {!mounted || recentDocs.length === 0 ? (
            !isCollapsed && (
              <div className="px-3 py-4 text-center">
                <p className="text-[11px] text-slate-500">No recent chats</p>
              </div>
            )
          ) : (
            <div className="space-y-0.5">
              {recentDocs.map((doc) => {
                const isActive = currentDoc?.id === doc.id;
                const formattedName = doc.name.replace(/_/g, ' ');
                return (
                  <button
                    key={doc.id}
                    onClick={() => {
                      if (onSelectDoc) onSelectDoc(doc);
                      if (typeof window !== 'undefined' && window.innerWidth < 768 && !isCollapsed) {
                        onToggleCollapse();
                      }
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-2.5 group cursor-pointer touch-target ${
                      isActive
                        ? 'bg-[#212121] text-white font-medium shadow-2xs'
                        : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                    }`}
                    title={doc.name}
                  >
                    {isCollapsed ? (
                      <MessageSquare className="w-4 h-4 mx-auto text-slate-400" />
                    ) : (
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <MessageSquare className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-400 transition-colors'}`} />
                        <span className="truncate flex-1 text-xs text-slate-200 group-hover:text-white transition-colors font-sans">
                          {formattedName}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 4. Bottom User Profile & Settings */}
      <div className="p-2 pb-safe border-t border-white/[0.06] flex-shrink-0 relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className={`w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer text-left touch-target ${
            isCollapsed ? 'justify-center p-1' : ''
          }`}
          title="Account settings"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
            {user?.name ? user.name[0].toUpperCase() : 'U'}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">
                {user?.name || user?.email || 'DocFin User'}
              </p>
            </div>
          )}
          {!isCollapsed && <MoreHorizontal className="w-4 h-4 text-slate-500" />}
        </button>

        {/* User Popup Menu */}
        {showUserMenu && !isCollapsed && (
          <div className="absolute bottom-14 left-2 right-2 p-1.5 rounded-2xl bg-[#1e1e1e] border border-white/10 shadow-2xl space-y-0.5 animate-in fade-in slide-in-from-bottom-2 z-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer touch-target"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>
        )}
      </div>
    </aside>
    </>
  );
}
