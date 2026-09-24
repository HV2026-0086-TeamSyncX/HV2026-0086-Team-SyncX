'use client';

import React from 'react';
import { ShieldCheck, AlertTriangle, TrendingUp, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function LiveAuditTicker() {
  const tickerItems = [
    {
      doc: 'HDFC Commercial Bank Statement',
      badge: 'FEE AUDIT',
      highlight: '-₹650 Overdraft Fee Flagged',
      detail: 'RBI Charter Dispute Drafted',
      status: 'refund'
    },
    {
      doc: 'Bengaluru Commercial Lease',
      badge: 'LEGAL COVENANT',
      highlight: 'Clause 5.2 (6-Mo Lock-in)',
      detail: 'Capped Counter-Clause Generated',
      status: 'risk'
    },
    {
      doc: 'AWS Enterprise Tax Invoice',
      badge: 'TAX & GST',
      highlight: '₹12,870 GST ITC Reconciled',
      detail: '4 Orphan EBS Disks (-₹4,200/mo) Flagged',
      status: 'savings'
    },
    {
      doc: 'Commercial Working Capital Sanction',
      badge: 'LENDING LENS',
      highlight: 'DSCR >= 1.35x Monitored',
      detail: '2% Prepayment Surcharge Disputed',
      status: 'covenant'
    },
    {
      doc: 'Star Health Mediclaim Schedule',
      badge: 'INSURANCE',
      highlight: '20% Non-Network Co-Pay Alert',
      detail: 'Cashless Pre-Auth Checklist Ready',
      status: 'insurance'
    }
  ];

  return (
    <div className="w-full bg-[#121826] text-white py-2.5 overflow-hidden border-y border-white/10 select-none">
      <div className="animate-ticker flex items-center gap-6">
        {/* Double the list for infinite marquee effect */}
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs flex-shrink-0 hover:bg-white/10 transition-colors cursor-default"
          >
            <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
              {item.badge}
            </span>
            <span className="font-bold text-slate-200">{item.doc}:</span>
            <span className={`font-semibold ${
              item.status === 'risk' ? 'text-rose-400' :
              item.status === 'refund' ? 'text-amber-300' :
              item.status === 'savings' ? 'text-emerald-400' : 'text-blue-300'
            }`}>
              {item.highlight}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 font-mono text-[11px]">{item.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
