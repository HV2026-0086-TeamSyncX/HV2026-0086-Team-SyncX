'use client';

import React from 'react';
import Link from 'next/link';
import Logo from '@/components/brand/Logo';

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-[#07090e] select-none text-[#53627A] dark:text-slate-400 text-xs transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand Col (5 Cols) */}
          <div className="md:col-span-5 space-y-3.5">
            <Link href="/" className="inline-block">
              <Logo size="md" />
            </Link>
            <p className="text-xs text-[#8092A7] dark:text-slate-400 max-w-sm leading-relaxed font-sans">
              Universal Multimodal Document Intelligence Platform. Extract figures, synthesize data tables, and decode complex terms across contracts, research, statements, and invoices.
            </p>
          </div>

          {/* Links 1: Document Formats (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider font-mono">
              Document Formats
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard?lens=finance" className="hover:text-[#2563EB] dark:hover:text-white transition-colors">
                  Bank Statements & Fees
                </Link>
              </li>
              <li>
                <Link href="/dashboard?lens=legal" className="hover:text-[#2563EB] dark:hover:text-white transition-colors">
                  Contracts & Leases
                </Link>
              </li>
              <li>
                <Link href="/dashboard?lens=academic" className="hover:text-[#2563EB] dark:hover:text-white transition-colors">
                  Academic & Research
                </Link>
              </li>
              <li>
                <Link href="/dashboard?lens=insurance" className="hover:text-[#2563EB] dark:hover:text-white transition-colors">
                  Insurance Policies
                </Link>
              </li>
              <li>
                <Link href="/dashboard?lens=billing" className="hover:text-[#2563EB] dark:hover:text-white transition-colors">
                  Spreadsheets & Invoices
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2: Product & Access (4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider font-mono">
              Workspace & Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="hover:text-[#2563EB] dark:hover:text-white transition-colors font-semibold text-[#2563EB] dark:text-blue-400">
                  Open Workspace →
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#2563EB] dark:hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#what-we-find" className="hover:text-[#2563EB] dark:hover:text-white transition-colors">
                  What We Find
                </a>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#2563EB] dark:hover:text-white transition-colors">
                  Account Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8092A7] font-mono">
          <p>© {new Date().getFullYear()} DocFin AI Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:underline">Privacy Policy</Link>
            <Link href="#" className="hover:underline">Terms of Service</Link>
            <Link href="#" className="hover:underline">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
