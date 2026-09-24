'use client';

import React from 'react';
import { ShieldCheck, Lock, EyeOff, Database } from 'lucide-react';

export default function SecuritySection() {
  const items = [
    {
      icon: EyeOff,
      title: 'Zero Model Training',
      description:
        'Your uploaded ledgers, contracts, and statements are never used to train or fine-tune public foundation models. Strictly isolated processing.'
    },
    {
      icon: Lock,
      title: 'Encryption in Transit & Rest',
      description:
        'All document transmissions are secured with TLS 1.3. Stored records and extracted metadata utilize industry-standard AES-256 encryption.'
    },
    {
      icon: ShieldCheck,
      title: 'Stateless Document Extraction',
      description:
        'Pre-processing and layout coordinate parsing execute in isolated memory partitions without secondary caching.'
    },
    {
      icon: Database,
      title: 'Isolated Private Workspaces',
      description:
        'Each account maintains strict multi-tenant boundary isolation. Your documents and chat inquiries remain private to your team.'
    }
  ];

  return (
    <section id="security" className="py-24 sm:py-32 border-t border-[#DCE5F0] dark:border-white/10 select-none bg-[var(--bg-canvas)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-serif text-[#101828] dark:text-white tracking-tight mb-4 font-normal">
            Security and data privacy
          </h2>
          <p className="text-base text-[#53627A] dark:text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto">
            Built to handle sensitive financial records with verifiable privacy and isolation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-[#0E121A] border border-[#DCE5F0] dark:border-white/10 shadow-xs flex items-start gap-5"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#F4F7FC] dark:bg-white/5 border border-[#DCE5F0] dark:border-white/10 text-[#2563EB] dark:text-white flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-serif text-[#101828] dark:text-white font-normal mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#53627A] dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
