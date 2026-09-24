'use client';

import React from 'react';
import { Star, Quote, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "VaultIQ analyzed 14 months of messy bank statements in under 30 seconds, flagged ₹42,000 in unapproved overdraft dip charges, and drafted the exact RBI waiver letter that got my client a full refund.",
      author: "Vikram Sengupta, FCA",
      role: "Senior Partner, Sengupta & Associates (Tax & Audit)",
      domain: "BANKING & FINANCE",
      rating: 5,
      impact: "₹42,000 Refund Claimed"
    },
    {
      quote: "The Legal Lens caught a 6-month lock-in penalty on page 4 that would have cost us ₹2,00,000 in security deposit forfeiture. The plain-English counter-clause was accepted by the lessor within 2 hours.",
      author: "Priya Sundaram",
      role: "Lead Counsel, NexaScale Ventures",
      domain: "LEGAL & TENANCY",
      rating: 5,
      impact: "₹2.0L Deposit Protected"
    },
    {
      quote: "Our team spends hours reading 50-page mediclaim schedules. VaultIQ’s green/red covered vs. excluded matrix and cashless hospital checklist makes claim verification 10x faster.",
      author: "Dr. Anirudh Mehta",
      role: "Head of Medical Underwriting, HealthCare Direct",
      domain: "HEALTHCARE & INSURANCE",
      rating: 5,
      impact: "10x Verification Speed"
    }
  ];

  return (
    <section className="py-24 border-t border-white/10 relative select-none">
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-semibold mb-3">
            <Quote className="w-3.5 h-3.5" />
            <span>Proven In Real-World High-Stakes Audits</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4">
            Trusted by Auditors, Counsel & Analysts
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Real outcomes from professionals who need 100% grounded document intelligence with zero tolerance for hallucinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121622] via-[#0f121a] to-[#0a0c10] border border-white/10 hover:border-white/20 shadow-xl flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {t.domain}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-white text-xs">{t.author}</h4>
                    <p className="text-[11px] text-slate-400">{t.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Impact: {t.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
