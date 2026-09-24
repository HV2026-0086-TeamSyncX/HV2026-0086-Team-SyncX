export type DocumentDomain =
  | 'overall'
  | 'general'
  | 'legal'
  | 'academic'
  | 'technical'
  | 'business'
  | 'finance'
  | 'billing'
  | 'insurance'
  | 'government'
  | 'medical'
  | 'mixed'
  | 'unknown';

export type ProcessingState =
  | 'idle'
  | 'uploading'
  | 'validating'
  | 'extracting'
  | 'ocr_processing'
  | 'classifying'
  | 'analyzing'
  | 'indexing'
  | 'ready'
  | 'failed';

export interface ActionChecklistItem {
  id: string;
  text: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  category?: string;
  page?: number;
}

export interface MetricCardData {
  label: string;
  value: string;
  subtext?: string;
  change?: string;
  iconName?: string;
  status?: 'positive' | 'negative' | 'warning' | 'neutral';
  page?: number;
}

export interface TrackedNumber {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  category: 'monetary' | 'percentage' | 'count' | 'measurement' | 'ratio' | 'score' | 'other';
  context: string;
  page: number;
}

export interface TrackedDate {
  id: string;
  event: string;
  date: string;
  type: 'deadline' | 'effective' | 'expiration' | 'milestone' | 'period' | 'filing' | 'other';
  status?: 'upcoming' | 'past' | 'critical' | 'normal';
  page: number;
}

export interface TrackedRisk {
  id: string;
  title: string;
  riskLevel: 'Critical' | 'High' | 'Warning' | 'Caution' | 'Low';
  plainEnglish: string;
  mitigation?: string;
  category?: string;
  page: number;
}

export interface ExtractedEntity {
  category:
    | 'Person'
    | 'Organization'
    | 'Location'
    | 'Date'
    | 'Amount'
    | 'ID/Reference'
    | 'Clause'
    | 'Concept'
    | 'Component'
    | 'Requirement'
    | 'Status'
    | 'Other';
  key: string;
  value: string;
  page: number;
  relevance?: 'primary' | 'secondary';
}

export interface ExtractedTable {
  id: string;
  tableName: string;
  columns: string[];
  rows: Record<string, string | number>[];
  page?: number;
}

export interface SpendingCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface RecurringSubscription {
  id: string;
  name: string;
  amount: number;
  frequency?: 'Monthly' | 'Yearly' | string;
  lastBilled?: string;
  canCancel?: boolean;
  potentialSavings?: boolean | number;
  status?: 'Active' | 'Optimizable' | 'Warning' | 'active' | 'infrequent' | 'flagged' | string;
}

export interface SavingsTip {
  id: string;
  title: string;
  description: string;
  difficulty?: string;
  estimatedMonthlySavings?: number;
  potentialSavings?: string | number;
  impact?: 'High' | 'Medium' | 'Low' | string;
  action?: string;
}

export interface FeeOrPenalty {
  id: string;
  type?: string;
  feeType?: string;
  amount: number;
  date: string;
  description?: string;
  isRecurring?: boolean;
  flaggedReason?: string;
  disputeEligible?: boolean;
}

export interface CoveredItem {
  id: string;
  item?: string;
  title?: string;
  details?: string;
  limit: string;
  status?: 'Covered' | 'Conditional' | 'Excluded' | string;
  clauseRef?: string;
}

export interface ExcludedItem {
  id: string;
  item?: string;
  title?: string;
  details?: string;
  reason: string;
  severity?: string;
  clauseRef?: string;
}

export interface ClaimStep {
  step: number;
  title: string;
  description: string;
  docsNeeded: string[];
}

export interface RiskyClause {
  id: string;
  clause: string;
  page: number;
  riskLevel: 'Critical' | 'Warning' | 'Caution' | 'High' | 'Low';
  plainEnglish: string;
  mitigation: string;
}

export interface LegalObligation {
  id: string;
  party: string;
  obligation: string;
  deadline: string;
  page?: number;
}

export interface AcademicData {
  researchQuestion: string;
  authors?: string[];
  institution?: string;
  methodology: string;
  datasetOrSample: string;
  keyFindings: string[];
  limitations: string[];
  conclusions: string;
  referencesCount?: number;
  keyReferences: string[];
}

export interface TechnicalData {
  systemArchitecture: string;
  components: { name: string; description: string; type: string }[];
  requirements: { id: string; category: string; description: string; priority: string }[];
  apisOrEndpoints: { name: string; method?: string; description: string }[];
  configurations: { key: string; value: string; purpose: string }[];
  proceduresOrSteps: { step: number; title: string; detail: string }[];
  dependencies: string[];
  warningsOrSecurityNotes: string[];
}

export interface BusinessData {
  executiveSummary: string;
  strategicObjectives: string[];
  stakeholders: { name: string; role: string; interest?: string }[];
  deliverables: { item: string; owner: string; deadline: string }[];
  marketInsights: string[];
  financialProjections: { metric: string; target: string; timeframe: string }[];
  keyDecisions: string[];
  risksAndThreats: string[];
}

export interface GovernmentData {
  issuingAuthority: string;
  documentType: string;
  scopeAndApplicability: string;
  effectiveDate: string;
  complianceDeadlines: string[];
  regulationsOrRules: { section: string; title: string; requirement: string }[];
  penaltiesForNonCompliance: string;
  submissionRequirements: string[];
}

export interface MedicalData {
  subjectOrPatientContext?: string;
  patientName?: string;
  labName?: string;
  testDate?: string;
  reportType?: string;
  criticalMarkers?: Array<{ marker: string; value: string; referenceRange: string; status: string; interpretation: string }>;
  physicianAdviceSummary?: string;
  medicationSchedule?: Array<{ medicine: string; dosage: string; duration: string; timing: string }>;
  observationsOrFindings?: string[];
  diagnosticResults?: { testName: string; result: string; normalRange?: string; status?: string }[];
  prescribedTreatmentsOrMedications?: { name: string; dosage?: string; instructions?: string }[];
  precautionsAndRecommendations?: string[];
  followUpDate?: string;
}

export interface DocumentClassification {
  domain: DocumentDomain;
  secondaryDomains?: DocumentDomain[];
  subCategory?: string;
  language?: string;
  confidenceScore: number;
  complexity: 'Low' | 'Medium' | 'High';
  isScanned?: boolean;
  hasTables: boolean;
  hasImages: boolean;
  pageCount: number;
  keyTopics: string[];
  detectionReason: string;
  recommendedLens: string;
}

export interface DocumentComparison {
  doc1Id: string;
  doc1Name: string;
  doc2Id: string;
  doc2Name: string;
  comparisonSummary: string;
  similarityScore: number;
  addedItems: { category: string; description: string; page?: number }[];
  removedItems: { category: string; description: string; page?: number }[];
  changedValues: { field: string; doc1Value: string; doc2Value: string; significance: 'Major' | 'Minor' | 'Neutral' }[];
  changedDates: { milestone: string; doc1Date: string; doc2Date: string; changeType: 'Accelerated' | 'Delayed' | 'Modified' }[];
  riskDifferences: { topic: string; doc1Risk: string; doc2Risk: string; variance: string }[];
  verdict: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  plan: 'Free' | 'Pro' | 'Enterprise';
  documentsUsed: number;
  documentsLimit: number;
  createdAt: string;
  customApiKey?: string;
}

export interface CitationReference {
  page: number;
  snippet: string;
  section?: string;
  boundingBox?: { x1: number; y1: number; x2: number; y2: number };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  citations?: CitationReference[];
  rawJson?: unknown;
  suggestions?: string[];
  attachedMedia?: AttachedMediaFile[];
  chartData?: {
    title?: string;
    type?: 'bar' | 'area';
    data: Array<{ name: string; value: number; [key: string]: string | number }>;
    color?: string;
  };
}

export type GenerationState = 'idle' | 'validating' | 'submitting' | 'generating' | 'completed' | 'failed';

export interface ModelConfig {
  modelName: 'gemini-1.5-flash' | 'gemini-1.5-pro' | 'gemini-2.0-flash' | 'kie-vision-fast';
  temperature: number;
  maxTokens: number;
  outputFormat: 'markdown' | 'json' | 'table';
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  documentIds: string[];
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  domain: DocumentDomain;
  prompt: string;
  icon?: string;
}

export interface UniversalSummary {
  tldr: string;
  keyTakeaways: string[];
  executiveBrief: string;
  actionChecklist: ActionChecklistItem[];
  importantDetails?: { category: string; title: string; value: string; page?: number }[];
  numbersAndMetrics?: TrackedNumber[];
  importantDates?: TrackedDate[];
  entities?: ExtractedEntity[];
  risksAndConcerns?: TrackedRisk[];
  questionsToConsider?: string[];
}

export interface DocumentAnalysis {
  id: string;
  name: string;
  fileSize: string;
  pageCount: number;
  uploadedAt: string;
  detectedDomain: DocumentDomain;
  secondaryDomains?: DocumentDomain[];
  confidenceScore: number;
  detectionReason: string;
  workspaceId?: string;
  isFavorite?: boolean;
  processingState?: ProcessingState;
  
  summary: UniversalSummary;
  metrics: MetricCardData[];
  
  // Tracked Intelligence Fields
  trackedNumbers?: TrackedNumber[];
  trackedDates?: TrackedDate[];
  trackedRisks?: TrackedRisk[];
  classificationDetails?: DocumentClassification;
  savingsTips?: SavingsTip[];
  
  // Extensible Domain Specific Payloads
  legalData?: {
    contractType: string;
    parties: string[];
    effectiveDate: string;
    duration: string;
    riskScore: 'Low' | 'Medium' | 'High' | 'Critical';
    riskyClauses: RiskyClause[];
    obligations: LegalObligation[];
    terminationTerms: string;
  };
  
  academicData?: AcademicData;
  technicalData?: TechnicalData;
  businessData?: BusinessData;
  governmentData?: GovernmentData;
  medicalData?: MedicalData;
  
  financeData?: {
    totalIncome: number;
    totalExpense: number;
    netSavings: number;
    savingsRate: string;
    burnRate: string;
    categorySpend: SpendingCategory[];
    recurringSubs: RecurringSubscription[];
    savingsTips: SavingsTip[];
    feesAndPenalties: FeeOrPenalty[];
  };
  
  insuranceData?: {
    policyType: string;
    sumInsured: string;
    deductible: string;
    copay: string;
    waitingPeriod: string;
    coveredItems: CoveredItem[];
    excludedItems: ExcludedItem[];
    claimChecklist: ClaimStep[];
  };
  
  billingData?: {
    invoiceNumber: string;
    vendor: string;
    client: string;
    dueDate: string;
    taxBreakdown: { taxType: string; rate: string; amount: number }[];
    totalAmount: number;
    lineItems: { description: string; qty: number; unitPrice: number; total: number }[];
    discountsOrPenalties: string[];
  };
  
  extractedEntities: ExtractedEntity[];
  extractedTables: ExtractedTable[];
  sampleQuestions: string[];
  chatHistory?: ChatMessage[];
  rawText?: string;
  pageTexts?: { page: number; text: string }[];
}

export type MediaType = 'image' | 'video' | 'pdf' | 'spreadsheet' | 'presentation' | 'code' | 'document' | 'other';

export interface AttachedMediaFile {
  id: string;
  name: string;
  size: number;
  sizeFormatted: string;
  mimeType: string;
  mediaType: MediaType;
  previewUrl?: string;
  fileObject?: File;
  base64Data?: string;
  status: 'pending' | 'uploading' | 'processing' | 'ready' | 'error' | 'failed';
  progress?: number;
  extractedSnippet?: string;
}
