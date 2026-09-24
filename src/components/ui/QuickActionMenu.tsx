'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  CreditCard,
  Scale,
  ShieldAlert,
  Receipt,
  FileText,
  CheckSquare,
  Zap,
  Layers,
  BarChart3,
  Search,
  Bot,
  Plus
} from 'lucide-react';
import { DocumentDomain, MediaType } from '@/lib/types';

interface ActionItem {
  id: string;
  icon: React.ElementType;
  iconColor?: string;
  title: string;
  description: string;
  prompt: string;
  badge?: string;
  isUpload?: boolean;
  mediaCategory?: MediaType | 'all';
}

interface QuickActionMenuProps {
  activeDomain: DocumentDomain;
  isOpen: boolean;
  onClose: () => void;
  onExecuteAction: (actionTitle: string, queryPrompt: string) => void;
  onUploadClick?: () => void;
  onOpenAddMedia?: (category?: MediaType | 'all') => void;
}

export default function QuickActionMenu({
  activeDomain,
  isOpen,
  onClose,
  onExecuteAction,
  onUploadClick,
  onOpenAddMedia
}: QuickActionMenuProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on outside click or Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getDomainSpecificActions = (domain: DocumentDomain): ActionItem[] => {
    switch (domain) {
      case 'finance':
        return [
          {
            id: 'fin_simplifier',
            icon: CreditCard,
            iconColor: 'text-blue-400',
            title: 'Statement Simplifier',
            description: 'Breakdown credits, debits, subscriptions & net cash flow',
            prompt: 'Simplify and breakdown this bank statement into total monthly credits, debits, recurring subscriptions, and net cash flow.',
            badge: 'Finance'
          },
          {
            id: 'fin_cashflow',
            icon: BarChart3,
            iconColor: 'text-emerald-400',
            title: 'Cash Flow & Expense Audit',
            description: 'Categorize spending into essential vs discretionary expenses',
            prompt: 'Analyze all high-value debits and categorize spending into essential vs discretionary expenses.',
            badge: 'Audit'
          },
          {
            id: 'fin_fees',
            icon: ShieldAlert,
            iconColor: 'text-rose-400',
            title: 'Hidden Fee & Interest Detector',
            description: 'Audit statement for hidden charges, penalties & fee spikes',
            prompt: 'Audit this statement for hidden service charges, penalties, overdraft fees, or interest rate spikes.',
            badge: 'Detector'
          },
          {
            id: 'fin_budget',
            icon: Sparkles,
            iconColor: 'text-purple-400',
            title: '50/30/20 Budget Plan',
            description: 'Personalized 50/30/20 budget recommendation & savings plan',
            prompt: 'Provide a personalized 50/30/20 budget recommendation and savings plan based on this financial flow.',
            badge: 'Budget'
          }
        ];

      case 'insurance':
        return [
          {
            id: 'ins_coverage',
            icon: ShieldAlert,
            iconColor: 'text-blue-400',
            title: 'Policy Coverage Breakdown',
            description: 'Coverage limits, sum insured, copay & network rules',
            prompt: 'Breakdown the coverage limits, sum insured, copay percentages, and cashless network provisions in this insurance policy.',
            badge: 'Insurance'
          },
          {
            id: 'ins_exclusions',
            icon: Sparkles,
            iconColor: 'text-amber-400',
            title: 'Exclusions & Waiting Periods',
            description: 'Permanent clause restrictions & pre-existing disease limits',
            prompt: 'Highlight all specific exclusions, permanent clause restrictions, and pre-existing disease waiting periods in this policy.',
            badge: 'Exclusions'
          },
          {
            id: 'ins_claim_steps',
            icon: CheckSquare,
            iconColor: 'text-emerald-400',
            title: 'Claim Settlement Checklist',
            description: 'Step-by-step checklist of documents & deadlines for approval',
            prompt: 'Generate a step-by-step checklist of documents, deadlines, and requirements to ensure guaranteed claim approval.',
            badge: 'Checklist'
          },
          {
            id: 'ins_copay',
            icon: FileText,
            iconColor: 'text-rose-400',
            title: 'Deductibles & Copay Rules',
            description: 'Deductibles, out-of-pocket maximums & room rent caps',
            prompt: 'Explain the exact deductibles, out-of-pocket maximums, and room rent capping rules in simple terms.',
            badge: 'Rules'
          }
        ];

      case 'legal':
        return [
          {
            id: 'leg_liability',
            icon: Scale,
            iconColor: 'text-rose-400',
            title: 'Liability & Indemnity Audit',
            description: 'Uncapped liability, indemnity risks & non-competes',
            prompt: 'Audit this contract for uncapped liability, indemnity risks, non-compete clauses, and jurisdiction traps.',
            badge: 'Legal'
          },
          {
            id: 'leg_termination',
            icon: FileText,
            iconColor: 'text-amber-400',
            title: 'Termination & Exit Terms',
            description: 'Lock-in periods, notice requirements & early exit penalties',
            prompt: 'Extract all termination conditions, lock-in periods, notice requirements, and early exit penalties.',
            badge: 'Terms'
          },
          {
            id: 'leg_ip',
            icon: Sparkles,
            iconColor: 'text-blue-400',
            title: 'Confidentiality & IP Rights',
            description: 'NDA durations, IP ownership rights & data protection',
            prompt: 'Verify standard NDA confidentiality durations, proprietary IP ownership rights, and data protection terms.',
            badge: 'IP Rights'
          },
          {
            id: 'leg_redlines',
            icon: CheckSquare,
            iconColor: 'text-emerald-400',
            title: 'Clause Summary & Redlines',
            description: 'Plain-English summary with recommended redlines',
            prompt: 'Provide a plain-English clause-by-clause summary with recommended redlines for negotiation.',
            badge: 'Redlines'
          }
        ];

      case 'academic':
        return [
          {
            id: 'acad_critique',
            icon: Sparkles,
            iconColor: 'text-purple-400',
            title: 'Methodology & Architecture',
            description: 'Theoretical framework, neural topology & novelty',
            prompt: 'Explain the methodology, core theoretical framework, and novelty of this research paper.',
            badge: 'Academic'
          },
          {
            id: 'acad_benchmarks',
            icon: BarChart3,
            iconColor: 'text-blue-400',
            title: 'Benchmark Results & BLEU',
            description: 'Quantitative benchmark scores, baselines & metrics',
            prompt: 'Extract all benchmark evaluation scores, baseline comparisons, and statistical significance metrics.',
            badge: 'BLEU'
          },
          {
            id: 'acad_contributions',
            icon: FileText,
            iconColor: 'text-emerald-400',
            title: 'Key Contributions & Limits',
            description: 'Primary contributions, assumptions & acknowledged limits',
            prompt: 'Summarize the primary contributions, assumptions, and acknowledged limitations of this study.',
            badge: 'Limits'
          },
          {
            id: 'acad_literature',
            icon: Layers,
            iconColor: 'text-amber-400',
            title: 'Literature & Prior Work',
            description: 'Concise literature review contextualizing prior art',
            prompt: 'Provide a concise literature review contextualizing how this paper advances state-of-the-art work.',
            badge: 'Literature'
          }
        ];

      case 'billing':
        return [
          {
            id: 'bil_tax',
            icon: Receipt,
            iconColor: 'text-emerald-400',
            title: 'Invoice & GST Reconciliation',
            description: 'Reconcile line items, GST/VAT rates, and total payable',
            prompt: 'Reconcile all line items, tax rates (GST/VAT), discount deductions, and total amount payable in this invoice.',
            badge: 'Billing'
          },
          {
            id: 'bil_cost',
            icon: BarChart3,
            iconColor: 'text-blue-400',
            title: 'Vendor Cost Comparison',
            description: 'Unit rates, quantity variances & cost savings',
            prompt: 'Compare vendor unit rates, quantity variances, and identify potential cost savings.',
            badge: 'Vendor'
          },
          {
            id: 'bil_matrix',
            icon: Zap,
            iconColor: 'text-purple-400',
            title: 'Tabular Matrix Extraction',
            description: 'Extract tabular rows & columns into clean CSV / Markdown',
            prompt: 'Extract all tabular rows and columns into clean CSV / Markdown table format.',
            badge: 'Matrix'
          },
          {
            id: 'bil_duplicates',
            icon: ShieldAlert,
            iconColor: 'text-rose-400',
            title: 'Discrepancy & Duplicate Check',
            description: 'Audit for duplicate numbers, math errors & overbilling',
            prompt: 'Audit this billing file for duplicate invoice numbers, arithmetic errors, or overbilling.',
            badge: 'Audit'
          }
        ];

      case 'medical':
        return [
          {
            id: 'med_lab',
            icon: Sparkles,
            iconColor: 'text-rose-400',
            title: 'Lab Report Simplifier',
            description: 'Explain test markers, reference ranges & abnormal results',
            prompt: 'Explain these medical lab test markers, reference ranges, and abnormal findings in clear, plain language.',
            badge: 'Medical'
          },
          {
            id: 'med_dosage',
            icon: FileText,
            iconColor: 'text-blue-400',
            title: 'Medication & Dosage Schedule',
            description: 'Prescribed medicines, timings & drug interactions',
            prompt: 'Extract prescribed medicines, dosage timings, dietary precautions, and possible drug interactions.',
            badge: 'Dosage'
          },
          {
            id: 'med_treatment',
            icon: CheckSquare,
            iconColor: 'text-emerald-400',
            title: 'Treatment Plan Summary',
            description: 'Diagnosis, lifestyle changes & follow-up dates',
            prompt: 'Summarize the diagnosis, recommended lifestyle modifications, and follow-up consultation dates.',
            badge: 'Plan'
          },
          {
            id: 'med_warning',
            icon: ShieldAlert,
            iconColor: 'text-amber-400',
            title: 'Warning Signs & Emergency Care',
            description: 'Critical warning symptoms requiring immediate attention',
            prompt: 'List critical warning symptoms that require immediate medical attention or emergency care.',
            badge: 'Emergency'
          }
        ];

      default:
        return [
          {
            id: 'gen_summary',
            icon: Sparkles,
            iconColor: 'text-amber-400',
            title: 'Summarize or Analyze Document',
            description: 'Executive takeaways, critical action items & risk check',
            prompt: 'Please summarize this document, highlight the key executive takeaways, and list any critical action items or risks.',
            badge: 'Summary'
          },
          {
            id: 'gen_code',
            icon: Zap,
            iconColor: 'text-blue-400',
            title: 'Write, Explain, or Debug Code',
            description: 'Type-safe TypeScript & Python code solutions',
            prompt: 'Write clean, type-safe TypeScript code to parse, validate, and transform structured data, with explanations and error handling.',
            badge: 'Code'
          },
          {
            id: 'gen_tables',
            icon: BarChart3,
            iconColor: 'text-emerald-400',
            title: 'Extract & Format Structured Data',
            description: 'Extract numbers, figures & tabular matrices to Markdown',
            prompt: 'Extract all numerical figures, financial metrics, and data tables from this document into structured Markdown table format.',
            badge: 'Data'
          },
          {
            id: 'gen_concept',
            icon: Bot,
            iconColor: 'text-purple-400',
            title: 'Explain Complex Concept Simply',
            description: 'Clear analogies and intuitive plain-English breakdowns',
            prompt: 'Explain how transformer self-attention neural network architectures work in simple, intuitive terms with an analogy.',
            badge: 'Explain'
          }
        ];
    }
  };

  // Base universal intelligence routines & media ingestion options
  const baseActions: ActionItem[] = [
    {
      id: 'act_add_media_all',
      icon: Plus,
      iconColor: 'text-blue-400',
      title: 'Add Media Files',
      description: 'Photos, videos, documents, spreadsheets & decks',
      prompt: '',
      badge: 'Multimodal',
      isUpload: true,
      mediaCategory: 'all'
    }
  ];

  const domainActions = getDomainSpecificActions(activeDomain);
  const allActions = [...baseActions, ...domainActions];

  const filteredActions = searchQuery.trim()
    ? allActions.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allActions;

  const handleSelect = (action: ActionItem) => {
    if (action.isUpload) {
      if (onOpenAddMedia) {
        onOpenAddMedia(action.mediaCategory || 'all');
      } else if (onUploadClick) {
        onUploadClick();
      }
      onClose();
      return;
    }
    onExecuteAction(action.title, action.prompt);
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="absolute bottom-full mb-3 -left-2 sm:left-0 z-50 w-[calc(100vw-2rem)] max-w-[460px] bg-white/95 dark:bg-[#0c1017]/90 backdrop-blur-2xl backdrop-saturate-200 text-slate-900 dark:text-white border border-black/10 dark:border-white/10 rounded-[22px] sm:rounded-[26px] shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200 select-none max-h-[75vh] flex flex-col"
    >
      {/* Glassmorphic Header */}
      <div className="px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-black/[0.06] dark:border-white/10 flex items-center justify-between text-xs bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 dark:border-blue-400/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Sparkles className="w-3 h-3" />
          </div>
          <span className="font-bold text-[#0F172A] dark:text-white text-xs tracking-tight">
            DocFin Routines
          </span>
        </div>
        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/25 border border-blue-200 dark:border-blue-400/30 text-blue-700 dark:text-blue-200 font-bold tracking-wider">
          {activeDomain}
        </span>
      </div>

      {/* Menu List */}
      <div className="p-1.5 sm:p-2 space-y-1 max-h-[min(350px,50vh)] overflow-y-auto scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/15 hover:scrollbar-thumb-black/20 dark:hover:scrollbar-thumb-white/25 scrollbar-track-transparent flex-1">
        {filteredActions.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400">
            No matching routines found for &quot;{searchQuery}&quot;
          </div>
        ) : (
          filteredActions.map((action) => {
            const Icon = action.icon;
            const isHeroMedia = action.id === 'act_add_media_all';
            return (
              <button
                key={action.id}
                type="button"
                onClick={() => handleSelect(action)}
                className={`w-full text-left px-3.5 py-2.5 rounded-2xl transition-all flex items-center gap-3.5 group cursor-pointer border ${
                  isHeroMedia
                    ? 'bg-blue-50 dark:bg-blue-600/20 hover:bg-blue-100 dark:hover:bg-blue-600/30 border-blue-200 dark:border-blue-500/40 shadow-xs mb-1'
                    : 'bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.08] active:bg-black/[0.08] dark:active:bg-white/[0.12] border-transparent hover:border-black/5 dark:hover:border-white/10 hover:shadow-sm'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-all border ${
                    isHeroMedia
                      ? 'bg-blue-600 text-white border-blue-400/50 shadow-md'
                      : 'bg-black/5 dark:bg-white/[0.06] border-black/5 dark:border-white/10 group-hover:bg-black/10 dark:group-hover:bg-white/[0.12]'
                  } ${action.iconColor || 'text-blue-600 dark:text-blue-400'}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold truncate transition-colors ${
                        isHeroMedia ? 'text-blue-700 dark:text-blue-200 font-bold' : 'text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300'
                      }`}
                    >
                      {action.title}
                    </span>
                    {action.badge && (
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-mono border ${
                          isHeroMedia
                            ? 'bg-blue-100 dark:bg-blue-500/40 text-blue-700 dark:text-white border-blue-200 dark:border-blue-300/40 font-bold'
                            : 'bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border-blue-200/60 dark:border-blue-400/20'
                        }`}
                      >
                        {action.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors truncate mt-0.5 font-normal">
                    {action.description}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Glassmorphic Search Filter Footer */}
      <div className="p-3 border-t border-black/[0.06] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] backdrop-blur-md flex items-center gap-2.5">
        <Search className="w-4 h-4 text-slate-400 flex-shrink-0 ml-1" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && filteredActions.length > 0) {
              e.preventDefault();
              handleSelect(filteredActions[0]);
            }
          }}
          placeholder="Type to search routines, files & skills..."
          className="w-full bg-transparent border-none text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-[10px] text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
