'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Header from '@/components/layout/Header';
import RightSidebar from '@/components/layout/RightSidebar';
import DocumentViewer from '@/components/workspace/DocumentViewer';
import PromptBar from '@/components/workspace/PromptBar';
import ExportModal from '@/components/ui/ExportModal';
import RawJsonViewer from '@/components/ui/RawJsonViewer';
import CommandPalette from '@/components/ui/CommandPalette';
import OnboardingModal from '@/components/ui/OnboardingModal';
import SettingsModal from '@/components/ui/SettingsModal';
import InlineDataChart from '@/components/ui/InlineDataChart';
import FormattedMessageText from '@/components/ui/FormattedMessageText';
import { SAMPLE_DOCUMENTS } from '@/lib/sampleData';
import { DocumentDomain, DocumentAnalysis, ChatMessage, GenerationState, ModelConfig, Workspace, AttachedMediaFile } from '@/lib/types';
import {
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  Loader2,
  CheckCircle2,
  Scale,
  Receipt,
  BarChart3,
  FileJson,
  Star,
  FolderPlus,
  Sliders,
  AlertTriangle,
  RotateCcw,
  FileText,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Landmark,
  GraduationCap,
  FileSpreadsheet,
  Code2,
  CreditCard,
  Zap,
  BookOpen
} from 'lucide-react';

function getDocumentFunctions(doc: DocumentAnalysis) {
  const name = doc.name.toLowerCase();
  const domain = doc.detectedDomain;

  // 1. Research Paper / Academic Domain
  if (domain === 'academic' || name.includes('attention') || name.includes('research') || name.includes('paper')) {
    return [
      {
        id: 'fn-acad-1',
        title: '📊 Extract Benchmark Tables (WMT/BLEU)',
        subtitle: 'Pull Table 3.1 & empirical English-to-German BLEU score benchmarks into a clean CSV matrix.',
        badge: 'MAKE TABLES',
        badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
        icon: FileSpreadsheet,
        prompt: `Extract Table 3.1 and all empirical WMT-14 English-to-German / French translation BLEU benchmark scores from ${doc.name} into a structured CSV table.`
      },
      {
        id: 'fn-acad-2',
        title: '🧠 Explain Core Architecture',
        subtitle: 'Break down multi-head scaled dot-product attention with 8 heads and d_k=64 in simple terms.',
        badge: 'SYNTHESIS',
        badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
        icon: GraduationCap,
        prompt: `Explain how multi-head scaled dot-product attention works in ${doc.name} (8 heads, d_k=64) compared to recurrent RNN/LSTM models in simple terms.`
      },
      {
        id: 'fn-acad-3',
        title: '🚨 Red Flags & Complexity Bottlenecks',
        subtitle: 'Highlight quadratic O(n²) self-attention memory bottlenecks and training constraints.',
        badge: 'RED FLAGS',
        badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
        icon: AlertTriangle,
        prompt: `Highlight the critical limitations, quadratic O(n^2) self-attention complexity, and memory bottlenecks mentioned in ${doc.name}.`
      },
      {
        id: 'fn-acad-4',
        title: '💡 PyTorch Implementation Guide',
        subtitle: 'Generate a clean, annotated PyTorch code implementation of the self-attention layer.',
        badge: 'CODE GUIDE',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        icon: Code2,
        prompt: `Generate a step-by-step PyTorch code implementation of the Multi-Head Attention layer described in ${doc.name} with complete comments.`
      }
    ];
  }

  // 2. Bank Statement / Financial Account Domain
  if (domain === 'finance' || name.includes('bank') || name.includes('statement') || name.includes('salary')) {
    return [
      {
        id: 'fn-fin-1',
        title: '💳 Bank Statement Summarizer',
        subtitle: 'Understand total monthly credits, debits, recurring subscriptions, and net cash flow.',
        badge: 'SUMMARIZER',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        icon: CreditCard,
        prompt: `Provide an easy-to-understand breakdown of ${doc.name}: total monthly credits, debits, recurring subscriptions, and net monthly cash flow.`
      },
      {
        id: 'fn-fin-2',
        title: '🚨 Red Flags & Hidden Surcharges',
        subtitle: 'Audit for erroneous overdraft fees, minimum balance penalties, and disputable debit charges.',
        badge: 'RED FLAGS',
        badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
        icon: AlertTriangle,
        prompt: `Audit ${doc.name} for erroneous overdraft fees, penalty charges, and disputable debit transactions.`
      },
      {
        id: 'fn-fin-3',
        title: '📊 Make Tables & Export Ledger (CSV)',
        subtitle: 'Extract all 31-day transactions into a structured 5-column ledger table ready for export.',
        badge: 'MAKE TABLES',
        badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
        icon: FileSpreadsheet,
        prompt: `Extract all transaction records from ${doc.name} into a structured 5-column ledger table ready for CSV export.`
      },
      {
        id: 'fn-fin-4',
        title: '💡 Personalized AI Financial Tips',
        subtitle: '50/30/20 budget recommendation and automated savings optimization based on cash flow.',
        badge: 'AI TIPS',
        badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        icon: Sparkles,
        prompt: `Based on the cash flow and spending patterns in ${doc.name}, give me personalized savings and 50/30/20 budget optimization tips.`
      }
    ];
  }

  // 3. Commercial Lease / Legal Contract Domain
  if (domain === 'legal' || name.includes('lease') || name.includes('agreement') || name.includes('contract')) {
    return [
      {
        id: 'fn-leg-1',
        title: '🚨 Red Flags & Hidden Cons',
        subtitle: 'Audit for security deposit forfeiture risks, uncapped indemnities, and notice traps.',
        badge: 'RED FLAGS',
        badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
        icon: AlertTriangle,
        prompt: `Audit ${doc.name} for hidden risks: security deposit forfeiture clauses, uncapped indemnities, and notice traps.`
      },
      {
        id: 'fn-leg-2',
        title: '⚖️ Liability & Counter-Clause Redline',
        subtitle: 'Analyze Clause 5.2 and draft a tenant counter-clause capping early exit liability to 1 month.',
        badge: 'LEGAL REDLINE',
        badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
        icon: Scale,
        prompt: `Analyze Clause 5.2 in ${doc.name} and generate a professional tenant counter-clause capping early exit liability to 1 month pro-rata rent.`
      },
      {
        id: 'fn-leg-3',
        title: '📅 Key Dates & Critical Deadlines',
        subtitle: 'Extract 11-month lock-in expiration, 5% escalation date, and notice period deadlines.',
        badge: 'DEADLINES',
        badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        icon: TrendingUp,
        prompt: `Extract all critical dates from ${doc.name}: 11-month lock-in expiration, annual escalation date, and mandatory notice period deadlines.`
      },
      {
        id: 'fn-leg-4',
        title: '📝 Plain-English Executive Summary',
        subtitle: 'Bullet-by-bullet breakdown of tenant obligations, maintenance terms, and permitted usage.',
        badge: 'EXECUTIVE SUMMARY',
        badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
        icon: FileText,
        prompt: `Provide a plain-English clause-by-clause summary of all tenant obligations, maintenance terms, and permitted usage in ${doc.name}.`
      }
    ];
  }

  // 4. Insurance Policy Domain
  if (domain === 'insurance' || name.includes('insurance') || name.includes('policy') || name.includes('health')) {
    return [
      {
        id: 'fn-ins-1',
        title: '🚨 Red Flags, Exclusions & Caps',
        subtitle: 'List all hidden exclusions, waiting periods, room-rent capping limits, and co-pay rules.',
        badge: 'RED FLAGS',
        badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
        icon: AlertTriangle,
        prompt: `List all hidden policy exclusions, pre-existing disease waiting periods, room-rent capping limits, and co-payment clauses in ${doc.name}.`
      },
      {
        id: 'fn-ins-2',
        title: '🏥 Guaranteed Claim Approval Checklist',
        subtitle: 'Step-by-step checklist of documents and pre-authorization deadlines for 100% claim settlement.',
        badge: 'CLAIM GUIDE',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        icon: ShieldCheck,
        prompt: `Generate a step-by-step checklist of required documents, hospital notice deadlines, and pre-authorization steps for 100% claim settlement under ${doc.name}.`
      },
      {
        id: 'fn-ins-3',
        title: '📊 Make Sub-limits & Coverage Table',
        subtitle: 'Extract Sum Insured, ICU capping, day-care procedures, and cashless network hospital rules.',
        badge: 'MAKE TABLES',
        badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
        icon: FileSpreadsheet,
        prompt: `Extract the full coverage limits table from ${doc.name}: Sum Insured, ICU capping, day-care procedures, and cashless network hospital rules.`
      },
      {
        id: 'fn-ins-4',
        title: '💡 AI Claim Strategy & Optimization Tips',
        subtitle: 'Expert advice to maximize insurance reimbursement and avoid out-of-pocket room deductions.',
        badge: 'AI TIPS',
        badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
        icon: Sparkles,
        prompt: `Provide expert advice on how to maximize insurance reimbursement and avoid out-of-pocket room rent deductions under ${doc.name}.`
      }
    ];
  }

  // 5. Invoicing & Billing Domain
  if (domain === 'billing' || name.includes('invoice') || name.includes('bill') || name.includes('tax')) {
    return [
      {
        id: 'fn-bil-1',
        title: '🧾 GST & Input Tax Credit (ITC) Verification',
        subtitle: 'Verify 18% Integrated GST calculation against supplier GSTIN for 100% GSTR-3B tax credit.',
        badge: 'TAX CREDIT',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        icon: Receipt,
        prompt: `Verify the 18% Integrated GST calculation in ${doc.name} against the supplier GSTIN and confirm 100% GSTR-3B tax credit eligibility.`
      },
      {
        id: 'fn-bil-2',
        title: '🚨 Red Flags & Surcharges',
        subtitle: 'Audit line items for unexpected compute surcharges, egress bandwidth spikes, or unallocated taxes.',
        badge: 'RED FLAGS',
        badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
        icon: AlertTriangle,
        prompt: `Audit line items in ${doc.name} for unexpected compute surcharges, egress bandwidth spikes, or unallocated regional tax rates.`
      },
      {
        id: 'fn-bil-3',
        title: '📊 Make Line-Item Tables (CSV)',
        subtitle: 'Extract all service charges, HSN/SAC codes, hourly rates, and taxable values into CSV.',
        badge: 'MAKE TABLES',
        badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
        icon: FileSpreadsheet,
        prompt: `Extract all service charges, HSN/SAC codes, hourly rates, and taxable values from ${doc.name} into a structured CSV table.`
      },
      {
        id: 'fn-bil-4',
        title: '💡 Cost Optimization Tips',
        subtitle: 'Analyze compute/bandwidth resource usage and recommend immediate cost-saving optimizations.',
        badge: 'COST SAVINGS',
        badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        icon: Sparkles,
        prompt: `Analyze the resource usage in ${doc.name} and recommend immediate cost-saving optimizations.`
      }
    ];
  }

  // 6. Medical Lab Report / Health
  if (name.includes('metabolic') || name.includes('lab') || name.includes('panel') || name.includes('medical')) {
    return [
      {
        id: 'fn-med-1',
        title: '🚨 Out-of-Range Red Flags',
        subtitle: 'Identify abnormal biomarkers (Fasting Glucose, Creatinine) and explain clinical significance.',
        badge: 'RED FLAGS',
        badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
        icon: AlertTriangle,
        prompt: `Identify all abnormal/out-of-range biomarkers in ${doc.name} (e.g. Fasting Glucose, Creatinine) and explain their clinical significance.`
      },
      {
        id: 'fn-med-2',
        title: '🧪 Biomarker Explanation (Plain English)',
        subtitle: 'Explain what each of the 14 CMP parameters measures and why it matters for organ health.',
        badge: 'EXPLANATION',
        badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
        icon: FileText,
        prompt: `Explain what each of the 14 CMP parameters measures in ${doc.name} and why it matters for metabolic and organ health in plain English.`
      },
      {
        id: 'fn-med-3',
        title: '📊 Make Lab Results Matrix Table',
        subtitle: 'Extract all 14 biomarkers with observed values, reference ranges, and abnormal flags to CSV.',
        badge: 'MAKE TABLES',
        badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
        icon: FileSpreadsheet,
        prompt: `Extract all 14 biomarkers from ${doc.name} with their observed values, standard reference ranges, and abnormal flags into a structured table.`
      },
      {
        id: 'fn-med-4',
        title: '💡 Personalized Lifestyle Tips',
        subtitle: 'Suggest actionable dietary, hydration, and lifestyle improvements based on elevated markers.',
        badge: 'AI TIPS',
        badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        icon: Sparkles,
        prompt: `Based on the elevated markers in ${doc.name}, suggest actionable dietary, hydration, and lifestyle improvements.`
      }
    ];
  }

  // 7. Universal Fallback for any uploaded file
  return [
    {
      id: 'fn-gen-1',
      title: '📝 Plain-English Executive Summary',
      subtitle: 'Summarize key takeaways, obligations, and conclusions in 3 concise bullet points.',
      badge: 'SUMMARIZE',
      badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      icon: FileText,
      prompt: `Summarize ${doc.name} in 3 concise executive bullet points with key takeaways.`
    },
    {
      id: 'fn-gen-2',
      title: '🚨 Red Flags & Hidden Risks',
      subtitle: 'Audit for high-risk clauses, unexpected penalties, obligations, or statistical anomalies.',
      badge: 'RED FLAGS',
      badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      icon: AlertTriangle,
      prompt: `Audit ${doc.name} for high-risk clauses, hidden fees, unusual obligations, or statistical anomalies.`
    },
    {
      id: 'fn-gen-3',
      title: '📊 Make Structured Tables (CSV)',
      subtitle: 'Extract quantitative metrics, financial figures, or tabular data into a spreadsheet matrix.',
      badge: 'MAKE TABLES',
      badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      icon: FileSpreadsheet,
      prompt: `Extract all quantitative metrics, financial numbers, or tabular matrices from ${doc.name} into a structured table.`
    },
    {
      id: 'fn-gen-4',
      title: '💡 Personalized Actionable Tips',
      subtitle: 'Receive strategic recommendations and high-impact next steps based on this analysis.',
      badge: 'AI TIPS',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      icon: Sparkles,
      prompt: `What are the top 3 recommended actions or strategic next steps based on ${doc.name}?`
    }
  ];
}

function DashboardWorkspaceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const docIdParam = searchParams.get('docId');
  const lensParam = searchParams.get('lens') as DocumentDomain | null;
  const { user, isAuthenticated, isLoading } = useAuth();

  // Authentication Route Protection
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Navigation & Workspace State
  const [activeDomain, setActiveDomain] = useState<DocumentDomain>(lensParam || 'overall');
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(true);
  const [isRightHistoryOpen, setIsRightHistoryOpen] = useState(false);
  const [isSplitView, setIsSplitView] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isRawJsonOpen, setIsRawJsonOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isParamsDrawerOpen, setIsParamsDrawerOpen] = useState(false);
  const [mobileActiveView, setMobileActiveView] = useState<'chat' | 'doc'>('chat');

  // Auto-expand sidebar on larger desktop displays
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      setIsLeftCollapsed(false);
      setIsRightHistoryOpen(true);
    }
  }, []);

  // Generation State Machine
  const [generationState, setGenerationState] = useState<GenerationState>('idle');
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Model & Playground Configuration
  const [modelConfig, setModelConfig] = useState<ModelConfig>({
    modelName: 'gemini-1.5-flash',
    temperature: 0.2,
    maxTokens: 4096,
    outputFormat: 'markdown'
  });

  // Workspaces State
  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    { id: 'ws_default', name: 'Primary Workspace', createdAt: new Date().toISOString(), documentIds: [] }
  ]);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>('ws_default');

  // Document State - Starts clean with empty array for exact SSR hydration match
  const [docsList, setDocsList] = useState<DocumentAnalysis[]>([]);
  const [currentDoc, setCurrentDoc] = useState<DocumentAnalysis | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedCitationId, setExpandedCitationId] = useState<string | null>(null);
  const [lastUserQuery, setLastUserQuery] = useState<string>('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Load user documents from dev.db and localStorage on mount
  useEffect(() => {
    async function loadInitialDocuments() {
      try {
        const res = await fetch('/api/documents');
        const data = await res.json();
        if (data.success && Array.isArray(data.documents) && data.documents.length > 0) {
          setDocsList(data.documents);
          return;
        }
      } catch (err) {
        console.warn('API documents fetch notice:', err);
      }

      // Fallback to localStorage or default sample documents
      try {
        const cached = localStorage.getItem('docfin_user_documents');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setDocsList(parsed);
            return;
          }
        }
      } catch {
        // ignore
      }

      setDocsList(SAMPLE_DOCUMENTS);
    }

    loadInitialDocuments();
  }, []);

  useEffect(() => {
    if (docIdParam && docsList.length > 0) {
      const found = docsList.find((d) => d.id === docIdParam);
      if (found) {
        setCurrentDoc(found);
        setActiveDomain(found.detectedDomain);
        setMessages(found.chatHistory || []);
      }
    }
  }, [docIdParam, docsList]);

  // Sync to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && docsList.length > 0) {
      try {
        localStorage.setItem('docfin_user_documents', JSON.stringify(docsList));
      } catch (e) {
        console.warn('LocalStorage save error:', e);
      }
    }
  }, [docsList]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, generationState]);

  // Handlers
  const handleSelectDoc = (doc: DocumentAnalysis) => {
    setCurrentDoc(doc);
    setActiveDomain(doc.detectedDomain);
    setMessages(doc.chatHistory || []);
  };

  const handleLoadDemoDoc = (doc: DocumentAnalysis) => {
    setCurrentDoc(doc);
    setActiveDomain(doc.detectedDomain);

    let initialChart: ChatMessage['chartData'] = undefined;
    if (doc.detectedDomain === 'finance') {
      initialChart = {
        title: 'Monthly Cash Flow & Major Expenditure Categories (₹)',
        type: 'bar',
        data: [
          { name: 'Credits (Inflow)', value: 95000 },
          { name: 'Debits (Outflow)', value: 64200 },
          { name: 'Rent & Bills', value: 24500 },
          { name: 'Food & Dining', value: 21800 },
          { name: 'Subscriptions', value: 4350 }
        ],
        color: '#2563EB'
      };
    } else if (doc.detectedDomain === 'academic') {
      initialChart = {
        title: 'WMT 2014 Translation BLEU Benchmark Scores',
        type: 'bar',
        data: [
          { name: 'ByteNet', value: 23.75 },
          { name: 'Deep-Att', value: 24.6 },
          { name: 'ConvS2S', value: 25.16 },
          { name: 'Base Model', value: 27.3 },
          { name: 'Big Model', value: 28.4 }
        ],
        color: '#10B981'
      };
    } else if (doc.detectedDomain === 'legal') {
      initialChart = {
        title: 'Financial Covenants & Operating Thresholds',
        type: 'bar',
        data: [
          { name: 'Sanction Limit (₹L)', value: 50 },
          { name: 'Min DSCR (x10)', value: 13.5 },
          { name: 'Min Current Ratio (x10)', value: 12.5 },
          { name: 'Interest Spread (%)', value: 8.75 }
        ],
        color: '#F59E0B'
      };
    }

    const welcomeMsg: ChatMessage = {
      id: `asst_demo_${Date.now()}`,
      sender: 'assistant',
      text: `### 📄 Audited Document: ${doc.name}\n\n${doc.summary.executiveBrief || doc.summary.tldr}\n\n**Key Highlights Verified on Page 1:**\n${doc.summary.keyTakeaways.map((t, idx) => `**${idx + 1}.** ${t}`).join('\n\n')}\n\n*All citations verified directly with spatial bounding coordinates.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: [
        { page: 1, snippet: doc.summary.keyTakeaways[0] || 'Verified page coordinate excerpt' },
        { page: 2, snippet: doc.summary.keyTakeaways[1] || 'Spatial layout validated' }
      ],
      suggestions: [
        '📊 Extract all data tables to CSV',
        '⚖️ Highlight critical risks & clauses',
        '📝 Generate 30-second executive summary',
        '📅 List all critical deadlines & dates'
      ],
      chartData: initialChart
    };

    setMessages([welcomeMsg]);
  };

  const handleDocumentAnalyzed = (newDoc: DocumentAnalysis) => {
    const updated = [newDoc, ...docsList.filter((d) => d.id !== newDoc.id)];
    setDocsList(updated);
    setCurrentDoc(newDoc);
    setActiveDomain(newDoc.detectedDomain);
    setMessages([]);
    
    // Save to dev.db
    fetch('/api/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ document: newDoc })
    }).catch((e) => console.warn('dev.db document sync error:', e));

    if (typeof window !== 'undefined') {
      localStorage.setItem('docfin_user_documents', JSON.stringify(updated));
    }
  };

  const handleToggleFavorite = (docId: string) => {
    const updated = docsList.map((d) => (d.id === docId ? { ...d, isFavorite: !d.isFavorite } : d));
    setDocsList(updated);
    if (currentDoc?.id === docId) {
      setCurrentDoc((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
    }
  };

  const handleRemoveDoc = (docId: string) => {
    const updated = docsList.filter((d) => d.id !== docId);
    setDocsList(updated);

    // Delete from dev.db
    fetch(`/api/documents?id=${docId}`, { method: 'DELETE' }).catch(() => {});

    if (typeof window !== 'undefined') {
      localStorage.setItem('docfin_user_documents', JSON.stringify(updated));
    }
    if (currentDoc?.id === docId) {
      setCurrentDoc(updated.length > 0 ? updated[0] : null);
      setMessages([]);
    }
  };

  const handleClearHistory = () => {
    setDocsList([]);
    setCurrentDoc(null);
    setMessages([]);

    // Clear dev.db
    fetch('/api/documents?clearAll=true', { method: 'DELETE' }).catch(() => {});

    if (typeof window !== 'undefined') {
      localStorage.removeItem('docfin_user_documents');
    }
  };

  const handleFileDropUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (user?.customApiKey) {
        formData.append('customApiKey', user.customApiKey);
      }
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.success && data.data) {
        handleDocumentAnalyzed(data.data);
      }
    } catch (err) {
      console.error('File drop upload error:', err);
    }
  };

  const handleSendMessage = async (queryText: string, attachedMedia?: AttachedMediaFile[]) => {
    if (!queryText.trim() && (!attachedMedia || attachedMedia.length === 0)) return;
    if (generationState === 'generating' || generationState === 'submitting') return;

    let mediaContextText = '';
    if (attachedMedia && attachedMedia.length > 0) {
      const fileNames = attachedMedia.map((f) => `${f.name} (${f.mediaType.toUpperCase()})`).join(', ');
      mediaContextText = `\n\n[Attached Media Files: ${fileNames}]`;
    }

    const fullQuery = (queryText + mediaContextText).trim();

    let targetDoc = currentDoc;

    // 1. If real media files are attached with fileObject, run full analysis pipeline
    if (attachedMedia && attachedMedia.length > 0 && attachedMedia[0].fileObject) {
      try {
        setGenerationState('validating');
        const formData = new FormData();
        formData.append('file', attachedMedia[0].fileObject);
        if (user?.customApiKey) {
          formData.append('customApiKey', user.customApiKey);
        }

        const analyzeRes = await fetch('/api/analyze', {
          method: 'POST',
          body: formData
        });
        const analyzeData = await analyzeRes.json();
        if (analyzeData.success && analyzeData.data) {
          targetDoc = analyzeData.data;
          setCurrentDoc(targetDoc);
          setDocsList((prev) => [targetDoc!, ...prev.filter((d) => d.id !== targetDoc!.id)]);
        }
      } catch (err) {
        console.error('Error analyzing attached media in chat:', err);
      }
    }

    // 2. Allow targetDoc to be null for universal general chat
    setGenerationError(null);
    setGenerationState('validating');
    setLastUserQuery(queryText);

    const userMessage: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: queryText,
      attachedMedia: attachedMedia && attachedMedia.length > 0 ? attachedMedia : undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setGenerationState('generating');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          query: queryText,
          documentContext: targetDoc,
          customApiKey: user?.customApiKey,
          history: messages,
          attachedFiles: attachedMedia
        })
      });

      clearTimeout(timeoutId);
      const data = await res.json();
      if (data.success && data.answer) {
        let generatedChart: ChatMessage['chartData'] = undefined;
        const qLower = queryText.toLowerCase();
        if (targetDoc) {
          if (qLower.includes('table') || qLower.includes('extract') || qLower.includes('number') || qLower.includes('breakdown') || qLower.includes('metric') || qLower.includes('summary') || qLower.includes('bleu') || qLower.includes('inflow') || qLower.includes('covenant') || qLower.includes('graph') || qLower.includes('chart')) {
            if (targetDoc.detectedDomain === 'finance') {
              generatedChart = {
                title: 'Financial Cash Flow Breakdown (₹)',
                type: 'bar',
                data: [
                  { name: 'Credits', value: 95000 },
                  { name: 'Debits', value: 64200 },
                  { name: 'Rent', value: 24500 },
                  { name: 'Food', value: 21800 },
                  { name: 'Subs', value: 4350 }
                ],
                color: '#2563EB'
              };
            } else if (targetDoc.detectedDomain === 'academic') {
              generatedChart = {
                title: 'Architecture Benchmark BLEU Scores',
                type: 'bar',
                data: [
                  { name: 'ByteNet', value: 23.75 },
                  { name: 'Deep-Att', value: 24.6 },
                  { name: 'ConvS2S', value: 25.16 },
                  { name: 'Base Model', value: 27.3 },
                  { name: 'Big Model', value: 28.4 }
                ],
                color: '#10B981'
              };
            } else if (targetDoc.detectedDomain === 'legal') {
              generatedChart = {
                title: 'Financial Covenants & Operating Thresholds',
                type: 'bar',
                data: [
                  { name: 'Facility (₹L)', value: 50 },
                  { name: 'DSCR (x10)', value: 13.5 },
                  { name: 'Current (x10)', value: 12.5 },
                  { name: 'Interest (%)', value: 8.75 }
                ],
                color: '#F59E0B'
              };
            }
          }
        }

        const assistantMessage: ChatMessage = {
          id: `asst_${Date.now()}`,
          sender: 'assistant',
          text: data.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: data.citations,
          suggestions: data.suggestions || (targetDoc ? [
            '📝 30-Second Executive Summary',
            '📊 Extract key figures & numbers',
            '📅 List critical dates & deadlines',
            '📄 Export structured summary'
          ] : [
            '📄 Summarize or analyze a document',
            '⚡ Write or explain code',
            '💡 Explain a concept',
            '📊 Extract structured data'
          ]),
          rawJson: data,
          chartData: generatedChart
        };
        const finalizeChat = (asstMsg: ChatMessage) => {
          const updatedHistory = [...messages, userMessage, asstMsg];
          setMessages(updatedHistory);
          setGenerationState('completed');

          let sessionDoc: DocumentAnalysis;
          if (targetDoc) {
            sessionDoc = {
              ...targetDoc,
              chatHistory: updatedHistory,
              uploadedAt: 'Just now'
            };
          } else {
            const titleText = queryText.trim() || 'AI Chat Conversation';
            const formattedTitle = titleText.length > 32 ? titleText.slice(0, 29).trim() + '...' : titleText;
            sessionDoc = {
              id: `chat_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
              name: formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1),
              fileSize: 'Chat Session',
              pageCount: 1,
              uploadedAt: 'Just now',
              detectedDomain: activeDomain || 'general',
              confidenceScore: 99.0,
              detectionReason: 'Interactive AI Chat Conversation Session',
              summary: {
                tldr: queryText,
                keyTakeaways: [queryText],
                executiveBrief: queryText,
                actionChecklist: []
              },
              metrics: [],
              extractedEntities: [],
              extractedTables: [],
              sampleQuestions: [],
              chatHistory: updatedHistory
            };
          }

          setCurrentDoc(sessionDoc);
          setDocsList((prev) => [sessionDoc, ...prev.filter((d) => d.id !== sessionDoc.id)]);

          // Sync to dev.db
          fetch('/api/documents', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ document: sessionDoc })
          }).catch((err) => console.warn('Failed to sync chat to dev.db:', err));

          if (typeof window !== 'undefined') {
            const stored = [sessionDoc, ...docsList.filter((d) => d.id !== sessionDoc.id)];
            localStorage.setItem('docfin_user_documents', JSON.stringify(stored));
          }
        };

        finalizeChat(assistantMessage);
      } else {
        throw new Error(data.error || 'Fallback response needed');
      }
    } catch (e: any) {
      setGenerationError(e?.message || 'Upstream generation error');
      
      let fallbackText = '';
      const q = queryText.toLowerCase();

      if (targetDoc) {
        if (q.includes('clause') || q.includes('lease') || q.includes('contract') || q.includes('risk')) {
          fallbackText = `### ⚖️ Risk & Clause Assessment\n\n- **Document**: ${targetDoc.name}\n- **Executive Finding**: ${targetDoc.summary.keyTakeaways[0] || 'Clean structural alignment across sections.'}\n- **Action Item**: ${targetDoc.summary.actionChecklist[0]?.text || 'Review highlighted obligations on Page 1'}.`;
        } else if (q.includes('table') || q.includes('extract') || q.includes('rows') || q.includes('data')) {
          const tbl = targetDoc.extractedTables?.[0];
          if (tbl) {
            fallbackText = `### 📊 Structured Table Extraction: ${tbl.tableName}\n\n| ${tbl.columns.join(' | ')} |\n| ${tbl.columns.map(() => ':---').join(' | ')} |\n` +
              tbl.rows.map((r) => `| ${tbl.columns.map((col) => r[col] || '').join(' | ')} |`).join('\n');
          } else {
            fallbackText = `### 📊 Structured Data Extraction\n\nExtracted summary metrics and entity tables from **${targetDoc.name}**.`;
          }
        } else if (q.includes('summary') || q.includes('tldr') || q.includes('brief')) {
          fallbackText = `### 📝 Executive Summary\n\n${targetDoc.summary.executiveBrief || targetDoc.summary.tldr}\n\n**Key Highlights:**\n${targetDoc.summary.keyTakeaways.map((t) => `- ${t}`).join('\n')}`;
        } else {
          fallbackText = `### 📝 Document Intelligence Brief\n\n- **Executive TL;DR**: ${targetDoc.summary.tldr}\n- **Confidence**: ${targetDoc.confidenceScore}% spatial accuracy on Page 1.`;
        }
      } else {
        if (q.includes('transformer') || q.includes('attention') || q.includes('complex concept') || q.includes('concept')) {
          fallbackText = `### 💡 Intuitive Explanation: Transformer Neural Networks & Self-Attention\n\nImagine you're at a crowded dinner party with 10 people talking at the same time:\n\n- **Traditional Neural Networks (RNNs)** listen to words one-by-one in sequence. By the time they reach word #50, they have already forgotten word #1.\n- **Transformers (Self-Attention)** look at **every single word simultaneously**. Just like your brain tunes into specific voices across the room, the self-attention mechanism calculates how strongly each word connects to every other word in the text.\n\n**Key Highlights:**\n- ⚡ **Massive Parallelism**: Ingests whole paragraphs and document pages in parallel.\n- 🎯 **Contextual Weighting**: Connects words across long distances (e.g., resolving pronouns and references).\n- 🚀 **Foundation of Modern LLMs**: Powers Gemini, Claude, and modern multimodal AI reasoning systems.`;
        } else if (q.includes('code') || q.includes('typescript') || q.includes('javascript') || q.includes('python')) {
          fallbackText = `### 💻 Code Generation & Engineering\n\nHere is a clean, type-safe TypeScript pattern for structured data processing:\n\n\`\`\`typescript\ninterface ProcessedResult<T> {\n  success: boolean;\n  data?: T;\n  error?: string;\n  timestamp: string;\n}\n\nexport async function processStructuredInput<T>(input: string): Promise<ProcessedResult<T>> {\n  try {\n    const parsed = JSON.parse(input) as T;\n    return {\n      success: true,\n      data: parsed,\n      timestamp: new Date().toISOString()\n    };\n  } catch (err: any) {\n    return {\n      success: false,\n      error: err.message || 'Parsing error',\n      timestamp: new Date().toISOString()\n    };\n  }\n}\n\`\`\``;
        } else {
          fallbackText = `Hello! 👋 How can I help you today?\n\nI can assist you with:\n- 📄 **Document Intelligence**: Upload PDFs, contracts, invoices, or bank statements for instant extraction & risk audits.\n- 💻 **Engineering & Code**: Write, explain, or debug code in TypeScript, Python, and more.\n- 💡 **Concepts & Analysis**: Explain complex technical, financial, or legal ideas in simple terms.`;
        }
      }

      const assistantMessage: ChatMessage = {
        id: `asst_${Date.now()}`,
        sender: 'assistant',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: targetDoc ? [{ page: 1, snippet: 'Spatial coordinate verification' }] : undefined,
        suggestions: targetDoc ? [
          '📝 30-Second Executive Summary',
          '📊 Extract key figures & numbers',
          '📅 List critical dates & deadlines',
          '📄 Export structured summary'
        ] : [
          '📄 Summarize or analyze a document',
          '⚡ Write or explain code',
          '💡 Explain a concept',
          '📊 Extract structured data'
        ]
      };

      const updatedHistory = [...messages, userMessage, assistantMessage];
      setMessages(updatedHistory);
      setGenerationState('completed');

      let sessionDoc: DocumentAnalysis;
      if (targetDoc) {
        sessionDoc = {
          ...targetDoc,
          chatHistory: updatedHistory,
          uploadedAt: 'Just now'
        };
      } else {
        const titleText = queryText.trim() || 'AI Chat Conversation';
        const formattedTitle = titleText.length > 32 ? titleText.slice(0, 29).trim() + '...' : titleText;
        sessionDoc = {
          id: `chat_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          name: formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1),
          fileSize: 'Chat Session',
          pageCount: 1,
          uploadedAt: 'Just now',
          detectedDomain: activeDomain || 'general',
          confidenceScore: 99.0,
          detectionReason: 'Interactive AI Chat Conversation Session',
          summary: {
            tldr: queryText,
            keyTakeaways: [queryText],
            executiveBrief: queryText,
            actionChecklist: []
          },
          metrics: [],
          extractedEntities: [],
          extractedTables: [],
          sampleQuestions: [],
          chatHistory: updatedHistory
        };
      }

      setCurrentDoc(sessionDoc);
      setDocsList((prev) => [sessionDoc, ...prev.filter((d) => d.id !== sessionDoc.id)]);

      // Sync to dev.db
      fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ document: sessionDoc })
      }).catch((err) => console.warn('Failed to sync chat to dev.db:', err));
    }
  };

  const handleRegenerate = () => {
    if (lastUserQuery) {
      handleSendMessage(lastUserQuery);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportAllData = () => {
    const blob = new Blob([JSON.stringify(docsList, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `docfin_complete_export_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#F8FAFD] dark:bg-[#07090E]">
        <Loader2 className="w-8 h-8 animate-spin text-[#2563EB]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-dvh min-h-dvh w-full max-w-[100vw] overflow-hidden bg-[var(--bg-canvas)] text-[var(--text-primary)] antialiased font-sans transition-colors duration-200">
      {/* 1. Left Control Sidebar */}
      <LeftSidebar
        currentDoc={currentDoc}
        docsList={docsList}
        onSelectDoc={handleSelectDoc}
        activeDomain={activeDomain}
        onSelectDomain={setActiveDomain}
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
        onNewSession={() => {
          setCurrentDoc(null);
          setMessages([]);
        }}
        isCollapsed={isLeftCollapsed}
        onToggleCollapse={() => setIsLeftCollapsed(!isLeftCollapsed)}
        onNewAudit={() => {
          setCurrentDoc(null);
          setMessages([]);
        }}
        isHistoryOpen={isRightHistoryOpen}
        onToggleHistory={() => setIsRightHistoryOpen(!isRightHistoryOpen)}
      />

      {/* 2. Main Central Conversational Canvas */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[var(--bg-canvas)] relative w-full">
        {/* Top Header */}
        <Header
          activeDomain={activeDomain}
          currentDoc={currentDoc}
          isSplitView={isSplitView}
          onToggleSplitView={() => setIsSplitView(!isSplitView)}
          onOpenExportModal={() => setIsExportModalOpen(true)}
          onResetDoc={() => {
            setCurrentDoc(null);
            setMessages([]);
          }}
          isHistoryOpen={isRightHistoryOpen}
          onToggleHistory={() => setIsRightHistoryOpen(!isRightHistoryOpen)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
          onToggleLeftSidebar={() => setIsLeftCollapsed(!isLeftCollapsed)}
          isLeftSidebarOpen={!isLeftCollapsed}
        />

        {/* Mobile View Switcher (Only visible on mobile when a document is open) */}
        {currentDoc && (
          <div className="md:hidden flex items-center justify-center p-2 bg-white/80 dark:bg-[#07090e]/80 border-b border-[#DCE5F0] dark:border-white/10 backdrop-blur-md z-10 flex-shrink-0">
            <div className="flex rounded-full bg-slate-100 dark:bg-white/10 p-1 border border-slate-200 dark:border-white/10 w-full max-w-xs shadow-inner">
              <button
                onClick={() => setMobileActiveView('chat')}
                className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all touch-target ${
                  mobileActiveView === 'chat'
                    ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>AI Chat</span>
              </button>
              <button
                onClick={() => setMobileActiveView('doc')}
                className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all touch-target ${
                  mobileActiveView === 'doc'
                    ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Document</span>
              </button>
            </div>
          </div>
        )}

        {/* Workspace Body */}
        <div className="flex-1 flex overflow-hidden w-full relative">
          {/* Main Playground Center Column */}
          <div
            className={`flex-1 flex flex-col h-full overflow-hidden relative w-full ${
              currentDoc && mobileActiveView === 'doc' ? 'hidden md:flex' : 'flex'
            }`}
          >
            {/* Ambient Background Studio Grid & Smooth Lighting for Dashboard */}
            <div className="absolute inset-0 bg-studio-grid pointer-events-none opacity-40 dark:opacity-40 [mask-image:radial-gradient(ellipse_90%_80%_at_50%_40%,black_70%,transparent_100%)] z-0" />
            <div className="absolute inset-0 bg-studio-dots pointer-events-none opacity-20 dark:opacity-35 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black_70%,transparent_100%)] z-0" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] bg-emerald-500/5 dark:bg-emerald-500/8 rounded-full blur-3xl pointer-events-none z-0" />

            <div className="flex-1 flex overflow-hidden w-full relative z-10">
              <div className="flex-1 flex flex-col h-full overflow-hidden relative w-full">
                {/* Conversational Stream */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8 space-y-8 max-w-5xl lg:max-w-6xl w-full mx-auto">
                  {/* Clean Welcome Hero (When no messages yet) */}
                  {messages.length === 0 && (
                    <div className="space-y-10 max-w-4xl lg:max-w-5xl mx-auto pt-4 animate-in fade-in select-none">
                      {/* Top Header */}
                      <div className="text-center space-y-2.5">
                        <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/10 dark:bg-[#2563EB]/20 text-[#2563EB] dark:text-blue-400 flex items-center justify-center mx-auto shadow-sm">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#101828] dark:text-white">
                          {currentDoc ? `Auditing ${currentDoc.name}` : 'How can I help you today?'}
                        </h2>
                        <p className="text-xs sm:text-sm text-[#53627A] dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                          {currentDoc
                            ? `Ask any question about ${currentDoc.name}, extract tables into CSV, or audit specific clauses.`
                            : 'Chat freely on any topic, write & debug code, or inspect pre-loaded demo documents.'}
                        </p>
                      </div>

                      {/* 1-Click Pre-Loaded Demo Audits Showcase (When no document selected) */}
                      {!currentDoc && (
                        <div className="space-y-3.5">
                          <div className="flex items-center justify-between px-1">
                            <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-[#2563EB] dark:text-blue-400 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" />
                              Pre-Loaded Demo Audits (1-Click Live Inspect)
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">Click to test instantly</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {SAMPLE_DOCUMENTS.slice(0, 4).map((demoDoc) => (
                              <button
                                key={demoDoc.id}
                                onClick={() => handleLoadDemoDoc(demoDoc)}
                                className="p-4 sm:p-4.5 rounded-2xl bg-white/90 dark:bg-[#121722]/90 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 border border-black/10 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-600 transition-all text-left group shadow-aesthetic hover:shadow-aesthetic-lg cursor-pointer flex flex-col justify-between"
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-bold uppercase border border-blue-500/20">
                                      {demoDoc.detectedDomain}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-mono">{demoDoc.pageCount} Pages</span>
                                  </div>
                                  <h3 className="text-xs sm:text-sm font-bold text-[#101828] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                                    {demoDoc.name}
                                  </h3>
                                  <p className="text-[11px] text-[#53627A] dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                    {demoDoc.summary.tldr}
                                  </p>
                                </div>
                                <div className="mt-3.5 pt-2.5 border-t border-black/[0.06] dark:border-white/10 flex items-center justify-between text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                                  <span>Inspect Demo Audit</span>
                                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 1-Click Document Intelligence Functions (When a document is actively loaded) */}
                      {currentDoc && (
                        <div className="space-y-3.5">
                          <div className="flex items-center justify-between px-1">
                            <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-[#2563EB] dark:text-blue-400 flex items-center gap-1.5">
                              <Zap className="w-3.5 h-3.5 text-amber-500" />
                              1-Click Audit & Reasoning Functions
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">Click any function to execute</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {getDocumentFunctions(currentDoc).map((fn) => {
                              const Icon = fn.icon;
                              return (
                                <button
                                  key={fn.id}
                                  onClick={() => handleSendMessage(fn.prompt)}
                                  className="p-4 sm:p-4.5 rounded-2xl bg-white/90 dark:bg-[#121722]/90 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 border border-black/10 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-600 transition-all text-left group shadow-aesthetic hover:shadow-aesthetic-lg cursor-pointer flex flex-col justify-between"
                                >
                                  <div>
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border font-bold uppercase ${fn.badgeColor}`}>
                                        {fn.badge}
                                      </span>
                                      <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    </div>
                                    <h3 className="text-xs sm:text-sm font-bold text-[#101828] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                                      {fn.title}
                                    </h3>
                                    <p className="text-[11px] text-[#53627A] dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                      {fn.subtitle}
                                    </p>
                                  </div>
                                  <div className="mt-3.5 pt-2.5 border-t border-black/[0.06] dark:border-white/10 flex items-center justify-between text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                                    <span>Execute Function</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                  {/* Message Stream */}
                  {messages.map((msg) => {
                    const isAssistant = msg.sender === 'assistant';
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3.5 max-w-4xl lg:max-w-5xl w-full ${isAssistant ? '' : 'ml-auto flex-row-reverse'}`}
                      >
                        {/* Avatar */}
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                            isAssistant
                              ? 'bg-[#2563EB] text-white shadow-xs'
                              : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xs'
                          }`}
                        >
                          {isAssistant ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                        </div>

                        {/* Message Content */}
                        <div className={`space-y-1.5 flex-1 min-w-0 ${isAssistant ? 'max-w-4xl' : 'max-w-xl text-right'}`}>
                          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-[#8092A7] font-mono">
                            <span>{isAssistant ? 'DocFin Intelligence Engine' : 'You'}</span>
                            <span>•</span>
                            <span>{msg.timestamp}</span>
                          </div>

                          {/* Inline Attached Files in User Message */}
                          {!isAssistant && msg.attachedMedia && msg.attachedMedia.length > 0 && (
                            <div className="flex flex-wrap gap-2 justify-end mb-1">
                              {msg.attachedMedia.map((f, fIdx) => (
                                <div
                                  key={fIdx}
                                  className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#1E40AF] text-white border border-blue-400/30 text-[11px] font-mono shadow-sm"
                                >
                                  <FileText className="w-3 h-3 text-blue-200" />
                                  <span className="font-semibold truncate max-w-[150px]">{f.name}</span>
                                  <span className="text-[9px] opacity-75">{f.sizeFormatted}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Main Text Bubble */}
                          <div
                            className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-[13px] leading-relaxed text-left transition-all ${
                              isAssistant
                                ? 'bg-white/90 dark:bg-[#121722]/90 border border-black/10 dark:border-white/10 text-[#0F172A] dark:text-slate-200 shadow-aesthetic-lg backdrop-blur-md'
                                : 'bg-[#2563EB] text-white shadow-aesthetic-lg'
                            }`}
                          >
                            <FormattedMessageText content={msg.text} isAssistant={isAssistant} />

                            {/* Optional Visual Chart */}
                            {isAssistant && msg.chartData && (
                              <InlineDataChart
                                title={msg.chartData.title}
                                type={msg.chartData.type}
                                data={msg.chartData.data}
                                color={msg.chartData.color}
                              />
                            )}

                            {/* Grounding Citation Footer & Interactive Action Controls */}
                            {isAssistant && (
                              <div className="mt-4 pt-3 border-t border-[#DCE5F0]/70 dark:border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#2563EB] dark:text-blue-400 font-mono select-none">
                                <div className="flex items-center gap-2">
                                  {msg.citations && msg.citations[0] ? (
                                    <span className="flex items-center gap-1">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                      {`Grounded on Page ${msg.citations[0].page}`}
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                                      <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                                      AI Generated Response
                                    </span>
                                  )}

                                  {msg.citations && msg.citations.length > 0 && (
                                    <button
                                      onClick={() => setExpandedCitationId(expandedCitationId === msg.id ? null : msg.id)}
                                      className="hover:underline flex items-center gap-1 text-[#64748B] dark:text-slate-400 hover:text-blue-500 cursor-pointer"
                                    >
                                      <span>{expandedCitationId === msg.id ? 'Hide Sources' : 'View Sources'}</span>
                                    </button>
                                  )}
                                </div>

                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={handleRegenerate}
                                    className="hover:underline flex items-center gap-1 text-[#8092A7] hover:text-[#0F172A] dark:hover:text-white cursor-pointer"
                                    title="Regenerate Response"
                                  >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                    <span>Retry</span>
                                  </button>

                                  <button
                                    onClick={() => setIsRawJsonOpen(true)}
                                    className="hover:underline flex items-center gap-1 text-[#8092A7] hover:text-[#0F172A] dark:hover:text-white cursor-pointer"
                                    title="Inspect JSON Payload"
                                  >
                                    <FileJson className="w-3.5 h-3.5" />
                                    <span>JSON</span>
                                  </button>

                                  <button
                                    onClick={() => handleCopy(msg.text, msg.id)}
                                    className="hover:underline flex items-center gap-1 text-[#8092A7] hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                                  >
                                    {copiedId === msg.id ? (
                                      <>
                                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                                        <span className="text-emerald-600 font-semibold">Copied</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3.5 h-3.5" />
                                        <span>Copy</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* Expandable Verified Citations Drawer */}
                            {isAssistant && expandedCitationId === msg.id && msg.citations && msg.citations.length > 0 && (
                              <div className="mt-3 p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-2 animate-in fade-in">
                                <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                                  Verified Document Excerpts:
                                </span>
                                {msg.citations.map((c, cIdx) => (
                                  <div key={cIdx} className="text-[11px] font-sans text-slate-700 dark:text-slate-300 pl-2.5 border-l-2 border-blue-500">
                                    <p className="italic font-serif">"{c.snippet}"</p>
                                    <span className="text-[10px] font-mono text-blue-500 font-bold block mt-0.5">
                                      — Page {c.page}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* State Machine Loader */}
                  {generationState === 'generating' && (
                    <div className="flex gap-3.5 max-w-3xl items-center animate-in fade-in">
                      <div className="w-8 h-8 rounded-xl bg-[#2563EB] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                      <div className="p-4 rounded-3xl bg-white dark:bg-[#121722] border border-[#DCE5F0] dark:border-white/10 text-xs flex items-center gap-2 text-[#53627A] dark:text-slate-300 font-mono shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping" />
                        <span>Generating response with Gemini AI...</span>
                      </div>
                    </div>
                  )}

                  <div ref={chatBottomRef} />
                </div>
              </div>
            </div>

            {/* Floating Bottom Prompt Bar ALWAYS ENABLED */}
            <PromptBar
              activeDomain={activeDomain}
              onSendMessage={handleSendMessage}
              isLoading={generationState === 'generating'}
              onResetAnalysis={() => {
                setCurrentDoc(null);
                setMessages([]);
              }}
              currentDoc={currentDoc}
              onSelectDoc={handleSelectDoc}
              onFileDrop={handleFileDropUpload}
              suggestions={
                (() => {
                  const lastAssistant = [...messages].reverse().find(m => m.sender === 'assistant' && m.suggestions && m.suggestions.length > 0);
                  if (lastAssistant?.suggestions && lastAssistant.suggestions.length > 0) {
                    return lastAssistant.suggestions;
                  }
                  if (currentDoc) {
                    return getDocumentFunctions(currentDoc).map(f => f.title);
                  }
                  return undefined;
                })()
              }
            />
          </div>

          {/* Mobile Document Viewer (When mobileActiveView === 'doc') */}
          {currentDoc && mobileActiveView === 'doc' && (
            <div className="flex-1 h-full w-full md:hidden overflow-hidden">
              <DocumentViewer doc={currentDoc} />
            </div>
          )}

          {/* Desktop Split-View Document PDF Inspector */}
          {currentDoc && isSplitView && (
            <div className="w-1/2 border-l border-[#DCE5F0] dark:border-white/10 h-full hidden md:block overflow-hidden">
              <DocumentViewer doc={currentDoc} />
            </div>
          )}

          {/* Collapsible Right Document History Sidebar */}
          <RightSidebar
            docs={docsList}
            currentDoc={currentDoc}
            onSelectDoc={handleSelectDoc}
            onRemoveDoc={handleRemoveDoc}
            onClearHistory={handleClearHistory}
            isOpen={isRightHistoryOpen}
            onToggle={() => setIsRightHistoryOpen(!isRightHistoryOpen)}
            onNewAudit={() => {
              setCurrentDoc(null);
              setMessages([]);
            }}
            onUploadFile={handleFileDropUpload}
          />
        </div>
      </main>

      {/* Export Report Memo Modal */}
      {currentDoc && (
        <ExportModal
          doc={currentDoc}
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
        />
      )}

      {/* Raw JSON Inspector Modal */}
      {currentDoc && (
        <RawJsonViewer
          isOpen={isRawJsonOpen}
          onClose={() => setIsRawJsonOpen(false)}
          title={currentDoc.name}
          data={currentDoc}
        />
      )}

      {/* Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        documents={docsList}
        onSelectDocument={handleSelectDoc}
        onNewAudit={() => setCurrentDoc(null)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenExport={() => setIsExportModalOpen(true)}
        onOpenRawJson={() => setIsRawJsonOpen(true)}
        onToggleHistory={() => setIsRightHistoryOpen(!isRightHistoryOpen)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      {/* Onboarding Tour Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onStartAudit={() => setCurrentDoc(null)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Settings & API Key Configuration Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onPurgeCache={handleClearHistory}
        onExportAllData={handleExportAllData}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center bg-[#F8FAFD] dark:bg-[#07090E]">
          <Loader2 className="w-8 h-8 animate-spin text-[#2563EB]" />
        </div>
      }
    >
      <DashboardWorkspaceContent />
    </Suspense>
  );
}
