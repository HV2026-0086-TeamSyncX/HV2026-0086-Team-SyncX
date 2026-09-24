'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Logo from '@/components/brand/Logo';
import { Sun, Moon, Menu, X, ArrowRight, User, HelpCircle, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenTour?: () => void;
}

export default function Navbar({ onOpenTour }: NavbarProps) {
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 pb-2 transition-all duration-300 select-none">
      <div
        className={`max-w-5xl mx-auto rounded-full px-5 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? 'bg-white/75 dark:bg-black/60 backdrop-blur-2xl backdrop-saturate-150 border border-black/[0.10] dark:border-white/[0.16] shadow-[0_12px_40px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.12)]'
            : 'bg-white/55 dark:bg-[#07090e]/50 backdrop-blur-xl backdrop-saturate-150 border border-black/[0.08] dark:border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.3)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.08)]'
        }`}
      >
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-[1.02]">
          <Logo size="sm" />
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-300">
          <a
            href="#capabilities"
            className="px-3.5 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all"
          >
            Capabilities & Bento
          </a>
          <a
            href="#what-why-where"
            className="px-3.5 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all"
          >
            What • Why • Where
          </a>
          {onOpenTour && (
            <button
              onClick={onOpenTour}
              className="px-3.5 py-1.5 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-all flex items-center gap-1.5 font-semibold cursor-pointer"
              title="Interactive Product Tour"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Product Tour</span>
            </button>
          )}
          <Link
            href={isAuthenticated ? "/dashboard" : "/login"}
            className="px-3.5 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all font-semibold text-blue-600 dark:text-blue-400"
          >
            Studio Lab
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-2.5 text-xs font-semibold">
          {/* Quick Tour Pill Trigger (When on smaller desktop) */}
          {onOpenTour && (
            <button
              onClick={onOpenTour}
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer"
              title="Interactive Product Tour"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Tour</span>
            </button>
          )}

          {/* Glassmorphic Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/10 flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Glowing Glass Action Button */}
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="glass-button-emerald group px-5 py-2 rounded-full text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer touch-target"
            >
              <User className="w-3.5 h-3.5" />
              <span>Workspace</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="glass-button-emerald group px-5 py-2 rounded-full text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer touch-target"
            >
              <span>Sign in</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>

        {/* Mobile Action Buttons */}
        <div className="sm:hidden flex items-center gap-1.5">
          {onOpenTour && (
            <button
              onClick={onOpenTour}
              className="w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center cursor-pointer touch-target active:scale-95 transition-transform"
              title="Product Tour"
              aria-label="Open Interactive Product Tour"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 cursor-pointer touch-target active:scale-95 transition-transform"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center text-slate-800 dark:text-white cursor-pointer touch-target active:scale-95 transition-transform"
            aria-label="Toggle mobile navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Frosted Glass Mobile Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 sm:hidden animate-in fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-50 sm:hidden mt-2 p-5 rounded-3xl bg-white/95 dark:bg-[#0c1017]/95 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-2xl space-y-3 animate-in slide-in-from-top-2 duration-200">
            <a
              href="#capabilities"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              Capabilities & Bento
            </a>
            <a
              href="#what-why-where"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              What • Why • Where
            </a>
            {onOpenTour && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenTour();
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Interactive Product Tour</span>
              </button>
            )}
            <Link
              href={isAuthenticated ? "/dashboard" : "/login"}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center px-3 py-2.5 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 transition-colors"
            >
              Open Studio Lab
            </Link>
            <div className="pt-2 border-t border-black/10 dark:border-white/10 space-y-2">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-center py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md touch-target active:scale-98 transition-transform"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Open Workspace</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-center py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md touch-target active:scale-98 transition-transform"
                >
                  <span>Sign in</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
