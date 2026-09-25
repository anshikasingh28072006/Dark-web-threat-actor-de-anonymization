import { StylometryAnalysisResult, NGramMatch } from '../types';

/**
 * Real Mathematical Implementation of Character N-gram (3-5 gram) TF-IDF Vectorizer
 * and Cosine Similarity Evaluator for Cyber Threat Actor Stylometry De-Anonymization.
 */

// Common leetspeak substitutions used by darknet threat actors
const LEET_PATTERNS = [
  /\b[a-z0-9]*[034517!@$][a-z0-9]*\b/gi,
  /\b(sh3ll|w4ll3t|b1tco1n|p4ssw0rd|3scr0w|dr0p|l0g1n|k3y|h4ck|r00t|b0t|c01n|m1x|l34k)\b/gi
];

/**
 * Tokenize text into words
 */
function tokenizeWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 0);
}

/**
 * Split text into sentences
 */
function splitSentences(text: string): string[] {
  return text
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

/**
 * Extract character n-grams of sizes minN through maxN
 */
function extractCharNGrams(text: string, minN = 3, maxN = 5): Map<string, number> {
  const ngrams = new Map<string, number>();
  // Normalize whitespaces
  const clean = text.toLowerCase().replace(/\s+/g, ' ');

  for (let n = minN; n <= maxN; n++) {
    for (let i = 0; i <= clean.length - n; i++) {
      const gram = clean.substring(i, i + n);
      ngrams.set(gram, (ngrams.get(gram) || 0) + 1);
    }
  }

  return ngrams;
}

/**
 * Compute Term Frequency - Inverse Document Frequency (TF-IDF) representation
 * for two documents (Corpus of 2)
 */
function computeTFIDF(
  countsA: Map<string, number>,
  countsB: Map<string, number>,
  totalGramsA: number,
  totalGramsB: number
): { vectorA: Map<string, number>; vectorB: Map<string, number>; allVocab: string[] } {
  const allVocabSet = new Set<string>([...countsA.keys(), ...countsB.keys()]);
  const allVocab = Array.from(allVocabSet);
  const N = 2; // two documents in direct comparative evaluation

  const vectorA = new Map<string, number>();
  const vectorB = new Map<string, number>();

  for (const term of allVocab) {
    const countA = countsA.get(term) || 0;
    const countB = countsB.get(term) || 0;

    // Document frequency (how many docs contain this term)
    let df = 0;
    if (countA > 0) df++;
    if (countB > 0) df++;

    // Standard smoothed IDF: ln((N + 1) / (df + 1)) + 1
    const idf = Math.log((N + 1) / (df + 1)) + 1;

    // Augmented TF: 0.5 + 0.5 * (count / maxCount) or count / total
    const tfA = totalGramsA > 0 ? countA / totalGramsA : 0;
    const tfB = totalGramsB > 0 ? countB / totalGramsB : 0;

    vectorA.set(term, tfA * idf);
    vectorB.set(term, tfB * idf);
  }

  return { vectorA, vectorB, allVocab };
}

/**
 * Compute Cosine Similarity between two sparse vectors
 */
function computeCosineSimilarity(
  vecA: Map<string, number>,
  vecB: Map<string, number>,
  vocab: string[]
): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const term of vocab) {
    const valA = vecA.get(term) || 0;
    const valB = vecB.get(term) || 0;

    dotProduct += valA * valB;
    normA += valA * valA;
    normB += valB * valB;
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;

  return Math.min(1.0, Math.max(0.0, dotProduct / denominator));
}

/**
 * Punctuation Distribution Extraction
 */
function analyzePunctuation(text: string) {
  const commas = (text.match(/,/g) || []).length;
  // Forensic signature: Triple commas ',,,' or repetitive commas
  const tripleCommas = (text.match(/,{2,}/g) || []).length;
  // Forensic signature: Space before question mark ' ?' (French/Russian typographic leak)
  const detachedQuestion = (text.match(/\s\?/g) || []).length;
  // Ellipses '...'
  const ellipses = (text.match(/\.{3,}/g) || []).length;
  // Multiple exclamation marks '!!+'
  const exclamations = (text.match(/!{2,}/g) || []).length;

  return {
    commas,
    tripleCommas,
    detachedQuestion,
    ellipses,
    exclamations
  };
}

/**
 * Detect leetspeak tokens and density
 */
function analyzeLeetspeak(text: string): { tokens: string[]; frequency: number } {
  const words = text.split(/\s+/);
  const found = new Set<string>();

  for (const word of words) {
    const clean = word.toLowerCase().replace(/[^a-z0-9]/g, '');
    // Contains both numbers/symbols and letters, or matches known hacker slang
    if (/[0-9]/.test(clean) && /[a-z]/.test(clean)) {
      found.add(clean);
    } else if (/^(sh3ll|w4ll3t|b1tco1n|p4ssw0rd|3scr0w|dr0p|l0g1n|k3y|h4ck|r00t|b0t|c01n|m1x|l34k)$/i.test(clean)) {
      found.add(clean);
    }
  }

  const tokens = Array.from(found);
  const frequency = words.length > 0 ? tokens.length / words.length : 0;

  return { tokens, frequency };
}

/**
 * Find exact matched multi-word phrases (3+ words) between two texts
 */
function findSharedPhrases(textA: string, textB: string): string[] {
  const wordsA = tokenizeWords(textA);
  const wordsB = tokenizeWords(textB);
  const matchedPhrases = new Set<string>();

  // Look for 3-5 word n-grams
  for (let len = 4; len >= 3; len--) {
    for (let i = 0; i <= wordsA.length - len; i++) {
      const phrase = wordsA.slice(i, i + len).join(' ');
      const joinedB = wordsB.join(' ');
      if (joinedB.includes(phrase) && phrase.length > 8) {
        matchedPhrases.add(phrase);
      }
    }
  }

  return Array.from(matchedPhrases).slice(0, 5);
}

/**
 * Full Stylometric Comparative Analysis
 */
export function analyzeStylometry(textA: string, textB: string): StylometryAnalysisResult {
  if (!textA.trim() || !textB.trim()) {
    return {
      cosineSimilarity: 0,
      percentage: 0,
      ttrA: 0,
      ttrB: 0,
      avgSentenceLenA: 0,
      avgSentenceLenB: 0,
      punctuationStats: {
        commasA: 0, commasB: 0,
        tripleCommasA: 0, tripleCommasB: 0,
        detachedQuestionA: 0, detachedQuestionB: 0,
        ellipsesA: 0, ellipsesB: 0,
        exclamationsA: 0, exclamationsB: 0
      },
      leetspeakStats: { tokensA: [], tokensB: [], frequencyA: 0, frequencyB: 0 },
      topSharedNGrams: [],
      matchedPhrases: []
    };
  }

  // 1. Lexical and Sentence Statistics
  const wordsA = tokenizeWords(textA);
  const wordsB = tokenizeWords(textB);

  const sentencesA = splitSentences(textA);
  const sentencesB = splitSentences(textB);

  const avgSentenceLenA = sentencesA.length > 0 ? +(wordsA.length / sentencesA.length).toFixed(1) : wordsA.length;
  const avgSentenceLenB = sentencesB.length > 0 ? +(wordsB.length / sentencesB.length).toFixed(1) : wordsB.length;

  // Type-Token Ratio (TTR)
  const uniqueWordsA = new Set(wordsA).size;
  const uniqueWordsB = new Set(wordsB).size;
  const ttrA = wordsA.length > 0 ? +(uniqueWordsA / wordsA.length).toFixed(3) : 0;
  const ttrB = wordsB.length > 0 ? +(uniqueWordsB / wordsB.length).toFixed(3) : 0;

  // 2. Character N-Grams (3 to 5)
  const countsA = extractCharNGrams(textA, 3, 5);
  const countsB = extractCharNGrams(textB, 3, 5);

  let totalGramsA = 0;
  for (const c of countsA.values()) totalGramsA += c;
  let totalGramsB = 0;
  for (const c of countsB.values()) totalGramsB += c;

  // 3. TF-IDF & Cosine Similarity
  const { vectorA, vectorB, allVocab } = computeTFIDF(countsA, countsB, totalGramsA, totalGramsB);
  const cosine = computeCosineSimilarity(vectorA, vectorB, allVocab);
  const percentage = +(cosine * 100).toFixed(1);

  // 4. Punctuation Analysis
  const punctA = analyzePunctuation(textA);
  const punctB = analyzePunctuation(textB);

  // 5. Leetspeak
  const leetA = analyzeLeetspeak(textA);
  const leetB = analyzeLeetspeak(textB);

  // 6. Top Shared Character N-Grams
  const sharedGrams: NGramMatch[] = [];
  for (const gram of allVocab) {
    const cA = countsA.get(gram) || 0;
    const cB = countsB.get(gram) || 0;
    if (cA > 0 && cB > 0) {
      const weight = (vectorA.get(gram) || 0) * (vectorB.get(gram) || 0);
      sharedGrams.push({ gram, countA: cA, countB: cB, weight });
    }
  }
  sharedGrams.sort((a, b) => b.weight - a.weight);

  // 7. Shared Phrases
  const matchedPhrases = findSharedPhrases(textA, textB);

  return {
    cosineSimilarity: cosine,
    percentage,
    ttrA,
    ttrB,
    avgSentenceLenA,
    avgSentenceLenB,
    punctuationStats: {
      commasA: punctA.commas,
      commasB: punctB.commas,
      tripleCommasA: punctA.tripleCommas,
      tripleCommasB: punctB.tripleCommas,
      detachedQuestionA: punctA.detachedQuestion,
      detachedQuestionB: punctB.detachedQuestion,
      ellipsesA: punctA.ellipses,
      ellipsesB: punctB.ellipses,
      exclamationsA: punctA.exclamations,
      exclamationsB: punctB.exclamations
    },
    leetspeakStats: {
      tokensA: leetA.tokens,
      tokensB: leetB.tokens,
      frequencyA: +(leetA.frequency * 100).toFixed(1),
      frequencyB: +(leetB.frequency * 100).toFixed(1)
    },
    topSharedNGrams: sharedGrams.slice(0, 10),
    matchedPhrases
  };
}
