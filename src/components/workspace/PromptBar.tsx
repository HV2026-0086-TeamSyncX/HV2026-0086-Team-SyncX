'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Mic,
  Send,
  Sparkles,
  FileText,
  X,
  UploadCloud,
  Image as ImageIcon,
  Video,
  FileSpreadsheet,
  Presentation,
  FileCode,
  CheckCircle2,
  Loader2,
  FolderOpen,
  Paperclip,
  ArrowUp,
  Atom,
  Scale,
  Search,
  Zap,
  ShieldAlert,
  CreditCard,
  TrendingUp
} from 'lucide-react';
import { DocumentDomain, DocumentAnalysis, AttachedMediaFile, MediaType } from '@/lib/types';
import QuickActionMenu from '@/components/ui/QuickActionMenu';
import AddMediaModal from '@/components/ui/AddMediaModal';

interface PromptBarProps {
  activeDomain: DocumentDomain;
  onSendMessage: (query: string, attachedMedia?: AttachedMediaFile[]) => void;
  isLoading: boolean;
  onResetAnalysis?: () => void;
  currentDoc?: DocumentAnalysis | null;
  onSelectDoc?: (doc: DocumentAnalysis) => void;
  onFileDrop?: (file: File) => void;
  onMediaBatchAttached?: (files: AttachedMediaFile[]) => void;
  suggestions?: string[];
}

export default function PromptBar({
  activeDomain,
  onSendMessage,
  isLoading,
  onResetAnalysis,
  currentDoc,
  onSelectDoc,
  onFileDrop,
  onMediaBatchAttached,
  suggestions
}: PromptBarProps) {
  const [input, setInput] = useState('');
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [isAddMediaOpen, setIsAddMediaOpen] = useState(false);
  const [mediaCategory, setMediaCategory] = useState<MediaType | 'all'>('all');
  const [isRecording, setIsRecording] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<AttachedMediaFile[]>([]);
  const nativeFileInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  const detectMediaType = (file: File): MediaType => {
    const type = file.type.toLowerCase();
    const name = file.name.toLowerCase();
    if (type.startsWith('image/') || /\.(png|jpg|jpeg|webp|svg|gif)$/i.test(name)) return 'image';
    if (type.startsWith('video/') || /\.(mp4|mov|webm|avi|mkv)$/i.test(name)) return 'video';
    if (type.includes('pdf') || /\.pdf$/i.test(name)) return 'pdf';
    if (type.includes('spreadsheet') || type.includes('excel') || type.includes('csv') || /\.(xlsx|xls|csv|tsv)$/i.test(name)) return 'spreadsheet';
    if (type.includes('presentation') || type.includes('powerpoint') || /\.(pptx|ppt|key)$/i.test(name)) return 'presentation';
    if (/\.(json|yaml|yml|xml|py|ts|js|jsx|tsx|html|css|log)$/i.test(name)) return 'code';
    if (/\.(docx|doc|txt|md|rtf)$/i.test(name)) return 'document';
    return 'other';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const processFiles = (files: FileList | File[]) => {
    const incoming: AttachedMediaFile[] = Array.from(files).map((file) => {
      const mediaType = detectMediaType(file);
      let previewUrl: string | undefined;
      if (mediaType === 'image') {
        previewUrl = URL.createObjectURL(file);
      }
      return {
        id: `att_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        size: file.size,
        sizeFormatted: formatFileSize(file.size),
        mimeType: file.type || 'application/octet-stream',
        mediaType,
        previewUrl,
        fileObject: file,
        status: 'uploading',
        progress: 30
      };
    });

    setAttachedFiles((prev) => [...prev, ...incoming]);

    // Simulate realistic upload -> processing -> ready pipeline
    incoming.forEach((item) => {
      setTimeout(() => {
        setAttachedFiles((prev) =>
          prev.map((f) => (f.id === item.id ? { ...f, status: 'processing', progress: 85 } : f))
        );
      }, 400);

      setTimeout(() => {
        setAttachedFiles((prev) =>
          prev.map((f) => (f.id === item.id ? { ...f, status: 'ready', progress: 100 } : f))
        );
      }, 900);
    });

    if (onMediaBatchAttached) {
      onMediaBatchAttached(incoming);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    // 1. Check for history document drag
    const jsonStr = e.dataTransfer.getData('application/json');
    if (jsonStr) {
      try {
        const payload = JSON.parse(jsonStr);
        if (payload.type === 'docfin-doc' && payload.doc) {
          const newDocItem: AttachedMediaFile = {
            id: `doc_${payload.doc.id}`,
            name: payload.doc.name,
            size: 1024 * 1024,
            sizeFormatted: payload.doc.fileSize || '1.0 MB',
            mimeType: 'application/pdf',
            mediaType: 'pdf',
            status: 'ready'
          };
          setAttachedFiles((prev) => [...prev.filter((f) => f.id !== newDocItem.id), newDocItem]);
          if (onSelectDoc) {
            onSelectDoc(payload.doc);
          }
          return;
        }
      } catch {
        // pass
      }
    }

    // 2. Multi-file native drop
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleNativeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      e.target.value = '';
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('');
          setInput(transcript);
        };

        recognition.onerror = () => {
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim() || (attachedFiles.length > 0 ? `Analyze and synthesize findings from attached ${attachedFiles.length} media file(s).` : '');
    if (!query || isLoading) return;

    onSendMessage(query, attachedFiles);
    setInput('');
    setAttachedFiles([]);
  };

  const handleOpenAddMedia = (cat: MediaType | 'all' = 'all') => {
    setMediaCategory(cat);
    setIsAddMediaOpen(true);
    setIsQuickActionOpen(false);
  };

  const handleMediaAttachedFromModal = (newFiles: AttachedMediaFile[]) => {
    setAttachedFiles((prev) => [...prev, ...newFiles]);
    if (onMediaBatchAttached) {
      onMediaBatchAttached(newFiles);
    }
    const firstPdf = newFiles.find((f) => f.mediaType === 'pdf' && f.fileObject);
    if (firstPdf && firstPdf.fileObject && onFileDrop) {
      onFileDrop(firstPdf.fileObject);
    }
  };

  const handleRemoveAttached = (id: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      setIsRecording(!isRecording);
      if (!isRecording) {
        setTimeout(() => {
          setInput('Give me a 30-second executive summary with key numbers and takeaways.');
          setIsRecording(false);
        }, 1200);
      }
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.warn('Speech recognition error:', err);
      }
    }
  };

  const getMediaBadgeIcon = (mediaType: MediaType) => {
    switch (mediaType) {
      case 'image':
        return <ImageIcon className="w-4 h-4 text-emerald-400" />;
      case 'video':
        return <Video className="w-4 h-4 text-purple-400" />;
      case 'pdf':
        return <FileText className="w-4 h-4 text-rose-400" />;
      case 'spreadsheet':
        return <FileSpreadsheet className="w-4 h-4 text-cyan-400" />;
      case 'presentation':
        return <Presentation className="w-4 h-4 text-amber-400" />;
      case 'code':
        return <FileCode className="w-4 h-4 text-blue-400" />;
      default:
        return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  const getDomainFeaturePills = () => {
    if (activeDomain === 'finance') {
      return [
        {
          label: '💳 Statement Simplifier',
          prompt: currentDoc
            ? `Simplify and breakdown ${currentDoc.name} into total monthly credits, debits, recurring subscriptions, and net cash flow.`
            : 'Simplify and breakdown this bank statement into total monthly credits, debits, recurring subscriptions, and net cash flow.'
        },
        {
          label: '📈 Cash Flow & Expense Audit',
          prompt: 'Analyze all high-value debits and categorize spending into essential vs discretionary expenses.'
        },
        {
          label: '🔍 Hidden Fee & Interest Detector',
          prompt: 'Audit this statement for hidden service charges, penalties, overdraft fees, or interest rate spikes.'
        },
        {
          label: '🎯 50/30/20 Budget Plan',
          prompt: 'Provide a personalized 50/30/20 budget recommendation and savings plan based on this financial flow.'
        }
      ];
    }

    if (activeDomain === 'insurance') {
      return [
        {
          label: '🛡️ Policy Coverage Breakdown',
          prompt: currentDoc
            ? `Breakdown the coverage limits, sum insured, copay percentages, and cashless network provisions in ${currentDoc.name}.`
            : 'Breakdown the coverage limits, sum insured, copay percentages, and cashless network provisions in this insurance policy.'
        },
        {
          label: '⚠️ Exclusions & Waiting Periods',
          prompt: 'Highlight all specific exclusions, permanent clause restrictions, and pre-existing disease waiting periods in this policy.'
        },
        {
          label: '🏥 Claim Settlement Checklist',
          prompt: 'Generate a step-by-step checklist of documents, deadlines, and requirements to ensure guaranteed claim approval.'
        },
        {
          label: '📑 Deductibles & Copay Rules',
          prompt: 'Explain the exact deductibles, out-of-pocket maximums, and room rent capping rules in simple terms.'
        }
      ];
    }

    if (activeDomain === 'legal') {
      return [
        {
          label: '⚖️ Liability & Indemnity Audit',
          prompt: currentDoc
            ? `Audit ${currentDoc.name} for uncapped liability, indemnity risks, non-compete clauses, and jurisdiction traps.`
            : 'Audit this contract for uncapped liability, indemnity risks, non-compete clauses, and jurisdiction traps.'
        },
        {
          label: '📝 Termination & Exit Terms',
          prompt: 'Extract all termination conditions, lock-in periods, notice requirements, and early exit penalties.'
        },
        {
          label: '🔒 Confidentiality & IP Rights',
          prompt: 'Verify standard NDA confidentiality durations, proprietary IP ownership rights, and data protection terms.'
        },
        {
          label: '✍️ Clause Summary & Redlines',
          prompt: 'Provide a plain-English clause-by-clause summary with recommended redlines for negotiation.'
        }
      ];
    }

    if (activeDomain === 'academic') {
      return [
        {
          label: '🎓 Methodology & Architecture',
          prompt: currentDoc
            ? `Explain the methodology, core theoretical framework, and novelty of ${currentDoc.name}.`
            : 'Explain the methodology, core theoretical framework, and novelty of this research paper.'
        },
        {
          label: '📊 Benchmark Results & BLEU',
          prompt: 'Extract all benchmark evaluation scores, baseline comparisons, and statistical significance metrics.'
        },
        {
          label: '💡 Key Contributions & Limits',
          prompt: 'Summarize the primary contributions, assumptions, and acknowledged limitations of this study.'
        },
        {
          label: '📚 Literature & Prior Work',
          prompt: 'Provide a concise literature review contextualizing how this paper advances state-of-the-art work.'
        }
      ];
    }

    if (activeDomain === 'billing') {
      return [
        {
          label: '📑 Invoice & GST Reconciliation',
          prompt: currentDoc
            ? `Reconcile all line items, tax rates (GST/VAT), discount deductions, and total amount payable in ${currentDoc.name}.`
            : 'Reconcile all line items, tax rates (GST/VAT), discount deductions, and total amount payable in this invoice.'
        },
        {
          label: '📊 Vendor Cost Comparison',
          prompt: 'Compare vendor unit rates, quantity variances, and identify potential cost savings.'
        },
        {
          label: '🔢 Tabular Matrix Extraction',
          prompt: 'Extract all tabular rows and columns into clean CSV / Markdown table format.'
        },
        {
          label: '⚠️ Discrepancy & Duplicate Check',
          prompt: 'Audit this billing file for duplicate invoice numbers, arithmetic errors, or overbilling.'
        }
      ];
    }

    if (activeDomain === 'medical') {
      return [
        {
          label: '🩺 Lab Report Simplifier',
          prompt: currentDoc
            ? `Explain the medical lab test markers, reference ranges, and abnormal findings in ${currentDoc.name} in clear, plain language.`
            : 'Explain these medical lab test markers, reference ranges, and abnormal findings in clear, plain language.'
        },
        {
          label: '💊 Medication & Dosage Schedule',
          prompt: 'Extract prescribed medicines, dosage timings, dietary precautions, and possible drug interactions.'
        },
        {
          label: '📋 Treatment Plan Summary',
          prompt: 'Summarize the diagnosis, recommended lifestyle modifications, and follow-up consultation dates.'
        },
        {
          label: '⚠️ Warning Signs & Emergency Care',
          prompt: 'List critical warning symptoms that require immediate medical attention or emergency care.'
        }
      ];
    }

    if (currentDoc) {
      return [
        {
          label: '📝 Executive Summary',
          prompt: `Please provide a concise executive summary of ${currentDoc.name} highlighting the top 5 key takeaways and conclusions.`
        },
        {
          label: '📊 Extract Data Tables',
          prompt: 'Extract all data tables and numerical matrices from this document into clean Markdown rows.'
        },
        {
          label: '⚖️ Risk & Clause Audit',
          prompt: 'Audit all key clauses, liability risks, financial obligations, and critical deadlines in this document.'
        },
        {
          label: '📅 Critical Deadlines',
          prompt: 'List all important dates, renewal milestones, payment terms, and deadlines found in this document.'
        }
      ];
    }

    return [
      {
        label: '📄 Summarize or analyze a document',
        prompt: 'Please summarize this document, highlight the key executive takeaways, and list any critical action items or risks.'
      },
      {
        label: '⚡ Write, explain, or debug code',
        prompt: 'Write clean, type-safe TypeScript code to parse, validate, and transform structured data, with explanations and error handling.'
      },
      {
        label: '📊 Extract and format structured data',
        prompt: 'Extract all numerical figures, financial metrics, and data tables from this document into structured Markdown table format.'
      },
      {
        label: '💡 Explain a complex concept simply',
        prompt: 'Explain how transformer self-attention neural network architectures work in simple, intuitive terms with an analogy.'
      }
    ];
  };

  const featurePills = getDomainFeaturePills();

  const handlePillClick = (promptText: string) => {
    setInput(promptText);
    setTimeout(() => {
      textInputRef.current?.focus();
    }, 50);
  };

  return (
    <>
      {/* Hidden Native File Picker for Instant Upload */}
      <input
        ref={nativeFileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp,.xlsx,.xls,.csv,.pptx,.txt,.json,.mp4,.mov"
        onChange={handleNativeFileInput}
        className="hidden"
      />

      <div className="sticky bottom-0 bg-transparent px-3 sm:px-6 py-3 sm:py-4 pb-safe z-20 transition-colors pointer-events-none w-full max-w-[100vw]">
        <form
          onSubmit={handleSubmit}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="max-w-4xl lg:max-w-5xl mx-auto flex flex-col gap-2 relative pointer-events-auto"
        >
          {/* Staged Multi-Media Attachment Cards (ChatGPT Style) */}
          {attachedFiles.length > 0 && (
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none animate-in fade-in slide-in-from-bottom-2 px-1">
              {attachedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 px-3.5 py-2 bg-white/90 dark:bg-white/10 backdrop-blur-md rounded-2xl text-xs text-slate-800 dark:text-white shadow-md flex-shrink-0 animate-in zoom-in-95 group relative border border-black/10 dark:border-white/15"
                >
                  {/* Thumbnail or Media Icon */}
                  {file.previewUrl ? (
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-black/10 dark:border-white/20 flex-shrink-0 bg-black/10 dark:bg-black/40">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={file.previewUrl} alt={file.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 flex items-center justify-center flex-shrink-0">
                      {getMediaBadgeIcon(file.mediaType)}
                    </div>
                  )}

                  <div className="flex flex-col min-w-0 pr-1">
                    <span className="font-semibold text-xs truncate max-w-[140px] sm:max-w-[180px] text-slate-900 dark:text-white">
                      {file.name}
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      <span>{file.sizeFormatted}</span>
                      <span>•</span>
                      {file.status === 'uploading' && (
                        <span className="text-amber-500 dark:text-amber-400 flex items-center gap-1">
                          <Loader2 className="w-2.5 h-2.5 animate-spin" /> Uploading
                        </span>
                      )}
                      {file.status === 'processing' && (
                        <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
                          <Loader2 className="w-2.5 h-2.5 animate-spin" /> Processing
                        </span>
                      )}
                      {(!file.status || file.status === 'ready') && (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Ready
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveAttached(file.id)}
                    className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 hover:bg-rose-500/20 text-slate-500 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-300 transition-colors flex items-center justify-center cursor-pointer ml-1 touch-target"
                    title="Remove attachment"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Main Floating Chat Pill Interface (DeepSeek / Gemini Style) */}
          <div
            className={`rounded-3xl p-3 sm:p-3.5 shadow-2xl transition-all relative ${
              isDragOver
                ? 'border-2 border-dashed border-blue-400 bg-blue-500/20 ring-4 ring-blue-500/30 scale-[1.01]'
                : 'bg-white/95 dark:bg-[#181a20] border border-black/10 dark:border-white/10 shadow-aesthetic-lg focus-within:border-blue-500/80 focus-within:ring-2 focus-within:ring-blue-500/20 backdrop-blur-xl'
            }`}
          >
            {isDragOver ? (
              <div className="flex items-center justify-center gap-2 py-4 text-xs sm:text-sm text-blue-600 dark:text-blue-300 font-bold animate-pulse">
                <UploadCloud className="w-5 h-5" />
                <span>Drop files anywhere to attach to conversation...</span>
              </div>
            ) : (
              <>
                {/* Top: Auto-growing Prompt Input */}
                <textarea
                  ref={textInputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  rows={1}
                  placeholder={
                    attachedFiles.length > 0
                      ? `Ask questions about attached ${attachedFiles.length} file(s)...`
                      : 'Ask anything, summarize documents, analyze tables, or drop files...'
                  }
                  className="w-full px-2 py-1 text-xs sm:text-sm bg-transparent border-none focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400 min-h-[38px] max-h-32 resize-none font-sans leading-relaxed"
                />

                {/* Bottom Row: Dynamic Contextual Feature Pills (Left) + Paperclip & Send ArrowUp (Right) */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-black/[0.04] dark:border-white/[0.06] select-none">
                  {/* Left: Dynamic Functions & Features Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 max-w-[calc(100%-80px)]">
                    {suggestions && suggestions.length > 0 ? (
                      suggestions.slice(0, 4).map((sug, idx) => {
                        const getIcon = (text: string) => {
                          const t = text.toLowerCase();
                          if (t.includes('50/30/20') || t.includes('budget') || t.includes('table') || t.includes('csv') || t.includes('matrix')) {
                            return <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />;
                          }
                          if (t.includes('fee') || t.includes('penalty') || t.includes('risk') || t.includes('red flag') || t.includes('audit')) {
                            return <ShieldAlert className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />;
                          }
                          if (t.includes('subscription') || t.includes('recurring') || t.includes('credit') || t.includes('bank') || t.includes('card')) {
                            return <CreditCard className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" />;
                          }
                          if (t.includes('tip') || t.includes('saving') || t.includes('ai') || t.includes('optimize') || t.includes('strategy')) {
                            return <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />;
                          }
                          if (t.includes('dispute') || t.includes('legal') || t.includes('clause') || t.includes('counter') || t.includes('memo') || t.includes('remedy')) {
                            return <Scale className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />;
                          }
                          if (t.includes('date') || t.includes('timeline') || t.includes('deadline') || t.includes('growth')) {
                            return <TrendingUp className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />;
                          }
                          return <Atom className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />;
                        };

                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handlePillClick(sug)}
                            className="px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-50/60 dark:hover:bg-blue-500/10 cursor-pointer transition-all active:scale-95 flex-shrink-0 whitespace-nowrap"
                            title={sug}
                          >
                            {getIcon(sug)}
                            <span className="truncate max-w-[170px] sm:max-w-[220px]">{sug}</span>
                          </button>
                        );
                      })
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handlePillClick('Perform a deep risk audit on this document. Flag all liabilities, non-standard penalty clauses, and auto-renewal traps with page citations.')}
                          className="px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-50/60 dark:hover:bg-blue-500/10 cursor-pointer transition-all active:scale-95 flex-shrink-0"
                          title="Deep Risk Audit"
                        >
                          <Atom className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                          <span>Deep Audit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handlePillClick('Extract all financial numerical tables and structured ledger items from this document into clean structured markdown tables.')}
                          className="px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-50/60 dark:hover:bg-blue-500/10 cursor-pointer transition-all active:scale-95 flex-shrink-0"
                          title="Table Matrix Extractor"
                        >
                          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>Table Matrix</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handlePillClick('Draft a formal dispute letter and counter-clause remedy addressing all flagged risks in this document.')}
                          className="hidden sm:flex px-3 py-1 rounded-full text-[11px] font-medium items-center gap-1.5 border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-50/60 dark:hover:bg-blue-500/10 cursor-pointer transition-all active:scale-95 flex-shrink-0"
                          title="Action & Dispute Memo"
                        >
                          <Scale className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                          <span>Action Memo</span>
                        </button>
                      </>
                    )}

                    {/* More Routines Dropup Button */}
                    <div className="relative flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => setIsQuickActionOpen(!isQuickActionOpen)}
                        className="px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400/50 transition-all cursor-pointer"
                        title="More Super-Action Routines"
                      >
                        <Plus className="w-3 h-3 text-blue-500" />
                        <span>More</span>
                      </button>

                      <QuickActionMenu
                        activeDomain={activeDomain}
                        isOpen={isQuickActionOpen}
                        onClose={() => setIsQuickActionOpen(false)}
                        onExecuteAction={(title, prompt) => handlePillClick(prompt)}
                        onUploadClick={() => nativeFileInputRef.current?.click()}
                        onOpenAddMedia={handleOpenAddMedia}
                      />
                    </div>
                  </div>

                  {/* Right: Attachment & Send */}
                  <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                    {/* Paperclip Button */}
                    <button
                      type="button"
                      onClick={() => nativeFileInputRef.current?.click()}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer touch-target active:scale-95"
                      title="Attach File or Media"
                      aria-label="Attach File or Media"
                    >
                      <Paperclip className="w-4 h-4 rotate-45" />
                    </button>

                    {/* ArrowUp Blue Circle Send Button */}
                    <button
                      type="submit"
                      disabled={(!input.trim() && attachedFiles.length === 0) || isLoading}
                      className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-md disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all flex-shrink-0 cursor-pointer touch-target"
                      title="Send Message"
                      aria-label="Send Message"
                    >
                      <ArrowUp className="w-4.5 h-4.5 font-bold stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </form>
      </div>

      {/* Advanced Media Upload Modal */}
      <AddMediaModal
        isOpen={isAddMediaOpen}
        onClose={() => setIsAddMediaOpen(false)}
        onAttachFiles={handleMediaAttachedFromModal}
        initialCategory={mediaCategory}
      />
    </>
  );
}
