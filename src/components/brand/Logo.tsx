'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'auto';
  className?: string;
}

export default function Logo({ size = 'md', variant = 'auto', className = '' }: LogoProps) {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-base font-bold', sub: 'text-[9px]' },
    md: { icon: 'w-8 h-8', text: 'text-lg font-black', sub: 'text-[10px]' },
    lg: { icon: 'w-10 h-10', text: 'text-2xl font-black', sub: 'text-xs' }
  };

  const current = sizeMap[size];

  const getTextColor = () => {
    if (variant === 'light') return 'text-white';
    if (variant === 'dark') return 'text-[#0F172A]';
    return 'text-[#0F172A] dark:text-white';
  };

  const getSubColor = () => {
    if (variant === 'light') return 'text-slate-400';
    if (variant === 'dark') return 'text-[#53627A]';
    return 'text-[#53627A] dark:text-slate-400';
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Document Prism Mark */}
      <div className={`relative ${current.icon} rounded-xl bg-[#2563EB] flex items-center justify-center p-1.5 shadow-sm shadow-blue-500/20`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Document Sheet */}
          <rect x="22" y="16" width="56" height="68" rx="8" fill="#FFFFFF" fillOpacity="0.95" />
          <path d="M54 16 L78 40 L54 40 Z" fill="#93C5FD" />
          {/* Content Lines */}
          <line x1="32" y1="48" x2="68" y2="48" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" />
          <line x1="32" y1="60" x2="60" y2="60" stroke="#93C5FD" strokeWidth="6" strokeLinecap="round" />
          <line x1="32" y1="72" x2="52" y2="72" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>

      {/* DocFin Wordmark */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`tracking-tight font-sans ${getTextColor()} ${current.text}`}>
            Doc<span className="text-[#2563EB] dark:text-[#60A5FA]">Fin</span>
          </span>
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-[#EBF2FE] text-[#2563EB] dark:bg-blue-950/80 dark:text-blue-300 border border-[#DCE5F0] dark:border-blue-800/60 uppercase">
            AI
          </span>
        </div>
        <span className={`font-mono uppercase tracking-widest text-[9px] mt-0.5 ${getSubColor()}`}>
          Document Intelligence
        </span>
      </div>
    </div>
  );
}
