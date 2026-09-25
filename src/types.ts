export type EntityType = 'actor' | 'handle' | 'wallet' | 'pgp' | 'infra';

export type VectorType = 'PGP' | 'Stylometry' | 'Wallets' | 'Infrastructure';

export type EdgeType = 'deterministic' | 'probabilistic';

export interface NodeEntity {
  id: string;
  label: string;
  type: EntityType;
  details: string;
  firstSeen: string;
  confidence: number;
  metadata?: Record<string, string | number>;
}

export interface EdgeEntity {
  id: string;
  source: string;
  target: string;
  label: string;
  type: EdgeType;
  vector: VectorType;
  confidence: number;
  details?: string;
  txHash?: string;
  pgpSubkey?: string;
  proofType?: string;
}

export interface DiurnalProfile {
  zone: string;
  inferredOffset: string;
  sleepWindow: [number, number]; // e.g. [2, 7]
  peakWindow: [number, number];  // e.g. [14, 21]
  hourly: number[];              // 24 hours (0-23)
  forums: string;
  confidence: number;
}

export interface StylometricProfile {
  sampleA: string;
  sampleB: string;
  sourceHandle: string;
  targetHandle: string;
  sentenceLength: string;
  ttr: number;
  tripleCommaMatch: number;
  questionMarkDetached: number;
  homoglyphCount: number;
  leetspeakTokens: string[];
}

export interface TEFWeights {
  applicability: number;
  technicalEase: number;
  legalAdmissibility: number;
}

export interface ThreatActorProfile {
  id: string;
  name: string;
  badge: string;
  badgeClass: string;
  aliases: string[];
  vector: string;
  locale: string;
  proceeds: string;
  rebrand: string;
  diurnal: DiurnalProfile;
  stylometric: StylometricProfile;
  tef: TEFWeights;
  sec65b: {
    ref: string;
    hash: string;
    custody: string;
    custodian: string;
    hardwareUuid: string;
  };
  nodes: NodeEntity[];
  edges: EdgeEntity[];
}

export interface NGramMatch {
  gram: string;
  countA: number;
  countB: number;
  weight: number;
}

export interface StylometryAnalysisResult {
  cosineSimilarity: number;
  percentage: number;
  ttrA: number;
  ttrB: number;
  avgSentenceLenA: number;
  avgSentenceLenB: number;
  punctuationStats: {
    commasA: number;
    commasB: number;
    tripleCommasA: number;
    tripleCommasB: number;
    detachedQuestionA: number;
    detachedQuestionB: number;
    ellipsesA: number;
    ellipsesB: number;
    exclamationsA: number;
    exclamationsB: number;
  };
  leetspeakStats: {
    tokensA: string[];
    tokensB: string[];
    frequencyA: number;
    frequencyB: number;
  };
  topSharedNGrams: NGramMatch[];
  matchedPhrases: string[];
}

export interface InferredTimezoneResult {
  sleepTroughStart: number;
  sleepTroughEnd: number;
  troughActivityMean: number;
  peakHour: number;
  inferredUtcOffsetHours: number;
  inferredUtcString: string;
  confidenceScore: number;
  suspectedRegion: string;
}

export interface TEFCalculationResult {
  totalScore: number;
  applicabilityWeighted: number;
  technicalEaseWeighted: number;
  legalAdmissibilityWeighted: number;
  isLegallyAdmissible: boolean;
  corroboratingVectorsCount: number;
  admissibilityTier: 'High (Forensically Sound)' | 'Medium (Probative Intelligence)' | 'Low (Inconclusive)';
  activeChecklist: {
    id: string;
    label: string;
    met: boolean;
    vector: VectorType;
    evidence: string;
  }[];
}
