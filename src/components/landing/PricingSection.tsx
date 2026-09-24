'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    {
      name: 'Starter Auditor',
      priceMonthly: 0,
      priceAnnual: 0,
      description: 'For individuals and solo analysts auditing personal bank statements and rental contracts.',
      features: [
        '15 Document Audits / month',
        'Commercial Banking & Statement Lens',
        'Legal & Tenancy Contract Lens',
        'Extracted Tables to CSV Export',
        'Page-Grounded Citations',
        'Community Support'
      ],
      ctaText: 'Get Started Free',
      ctaHref: '/signup',
      highlight: false
    },
    {
      name: 'Professional',
      priceMonthly: 49,
      priceAnnual: 39,
      description: 'For chartered accountants, corporate counsel, and financial consultants handling high-volume client audits.',
      features: [
        '100 Document Audits / month',
        'All 5 Specialized Financial Lenses',
        '1-Click Executive Client Memo Export',
        'Side-by-Side Split Screen Examiner',
        'Custom Gemini API Key Option (Unlimited)',
        'Cloud Database Session Sync (Supabase)',
        'Priority Sub-Second Processing'
      ],
      ctaText: 'Start 14-Day Free Trial',
      ctaHref: '/signup',
      highlight: true
    },
    {
      name: 'Enterprise Organization',
      priceMonthly: 199,
      priceAnnual: 159,
      description: 'For banking teams, underwriting desks, and accounting firms requiring dedicated SOC-2 compliance.',
      features: [
        'Unlimited Monthly Document Audits',
        'Custom Regulatory Ruleset Engines',
        'Automated RBI & GST Dispute Drafters',
        'Dedicated On-Premise VPC Deployment Option',
        'Custom SLA & 24/7 Dedicated Support',
        'Enterprise Single Sign-On (SSO / SAML)'
      ],
      ctaText: 'Contact Institutional Sales',
      ctaHref: '/signup',
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-24 border-t border-slate-200/80 dark:border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Institutional Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2 mb-4">
            Predictable Financial Intelligence Plans
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            Deploy DocFin for individual analysis or scale across entire auditing and finance departments.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-[#1B4332] text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-white dark:bg-[#1B4332] text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((p, idx) => {
            const price = billingCycle === 'annual' ? p.priceAnnual : p.priceMonthly;
            return (
              <div
                key={idx}
                className={`rounded-3xl p-5 sm:p-8 flex flex-col justify-between transition-all ${
                  p.highlight
                    ? 'bg-[#1B4332] text-white shadow-xl ring-2 ring-[#2D6A4F]'
                    : 'bg-white dark:bg-[#121722] text-slate-900 dark:text-white border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold tracking-tight">{p.name}</h3>
                    {p.highlight && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">
                        MOST POPULAR
                      </span>
                    )}
                  </div>

                  <p className={`text-xs leading-relaxed mb-6 ${p.highlight ? 'text-emerald-100' : 'text-slate-600 dark:text-slate-400'}`}>
                    {p.description}
                  </p>

                  <div className="flex items-baseline gap-1.5 pb-6 border-b border-slate-200/40 dark:border-white/10 mb-6">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight">
                      ${price}
                    </span>
                    <span className={`text-xs ${p.highlight ? 'text-emerald-200' : 'text-slate-500'}`}>
                      / user / month
                    </span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${p.highlight ? 'text-emerald-200' : 'text-slate-400'}`}>
                      Included Capabilities
                    </span>
                    {p.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs">
                        <Check className={`w-4 h-4 flex-shrink-0 ${p.highlight ? 'text-emerald-300' : 'text-[#1B4332] dark:text-[#52B788]'}`} />
                        <span className={p.highlight ? 'text-emerald-50' : 'text-slate-700 dark:text-slate-300'}>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={p.ctaHref}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 touch-target active:scale-98 cursor-pointer ${
                    p.highlight
                      ? 'bg-white text-[#1B4332] hover:bg-slate-100 shadow-md'
                      : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90'
                  }`}
                >
                  <span>{p.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
