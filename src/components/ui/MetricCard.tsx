'use client';

import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Zap,
  CreditCard,
  PiggyBank,
  ShieldCheck,
  Home,
  Clock,
  AlertOctagon,
  Lock,
  FileWarning,
  Calendar,
  FileText,
  CheckCircle,
  Trash2,
  Award,
  Target,
  Database,
  Building2,
  Percent,
  Scale
} from 'lucide-react';
import { MetricCardData } from '@/lib/types';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Zap,
  CreditCard,
  PiggyBank,
  ShieldCheck,
  Home,
  Clock,
  AlertOctagon,
  Lock,
  FileWarning,
  Calendar,
  FileText,
  CheckCircle,
  Trash2,
  Award,
  Target,
  Database,
  Building2,
  Percent,
  Scale
};

export default function MetricCard({ data }: { data: MetricCardData }) {
  const IconComponent = data.iconName && ICON_MAP[data.iconName] ? ICON_MAP[data.iconName] : Zap;

  const getStatusStyles = (status: MetricCardData['status']) => {
    switch (status) {
      case 'positive':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'negative':
        return 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-900';
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-900';
      case 'neutral':
      default:
        return 'bg-[#F4F7FC] dark:bg-white/10 text-[#53627A] dark:text-slate-300 border-[#DCE5F0] dark:border-white/10';
    }
  };

  return (
    <div className="bg-white dark:bg-[#121722] rounded-3xl p-5 border border-[#DCE5F0] dark:border-white/10 shadow-xs hover:border-[#2563EB] dark:hover:border-blue-500 transition-all group">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-semibold text-[#8092A7] dark:text-slate-400 uppercase tracking-wider font-mono">
          {data.label}
        </span>
        <div className="w-8 h-8 rounded-xl bg-[#F4F7FC] dark:bg-white/5 border border-[#DCE5F0] dark:border-white/5 flex items-center justify-center text-[#53627A] dark:text-slate-400 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 group-hover:bg-[#EBF2FE] dark:group-hover:bg-white/10 transition-colors">
          <IconComponent className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-1.5">
        <h3 className="text-2xl font-serif text-[#101828] dark:text-white tracking-tight font-normal">
          {data.value}
        </h3>
        {data.change && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border font-mono ${getStatusStyles(data.status)}`}>
            {data.change}
          </span>
        )}
      </div>

      {data.subtext && (
        <p className="text-[11px] text-[#8092A7] font-medium truncate">
          {data.subtext}
        </p>
      )}
    </div>
  );
}
