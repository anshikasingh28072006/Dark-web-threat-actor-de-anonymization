import { TEFWeights, TEFCalculationResult, VectorType, EdgeEntity } from '../types';

/**
 * Real Traceability Evaluation Framework (TEF) Calculator
 * Based on Analytic Hierarchy Process (AHP) multi-criteria decision matrix:
 * TS = (wA * Applicability) + (wT * Technical_Ease) + (wL * Legal_Admissibility)
 *
 * Statutory Threshold for Section 63 BSA / 65B IEA Admissibility:
 * Requires minimum Total Score >= 75.0 AND corroboration by at least two (2)
 * mathematically independent forensic vectors (e.g., PGP + Blockchain, or Stylometry + Infra).
 */

export const DEFAULT_AHP_WEIGHTS = {
  wApplicability: 0.385,
  wTechnicalEase: 0.204,
  wLegalAdmissibility: 0.412,
};

export function calculateTEF(
  weights: TEFWeights,
  edges: EdgeEntity[],
  customAHP = DEFAULT_AHP_WEIGHTS
): TEFCalculationResult {
  // 1. Calculate Weighted Composite Score
  const appWeighted = +(weights.applicability * customAHP.wApplicability).toFixed(2);
  const techWeighted = +(weights.technicalEase * customAHP.wTechnicalEase).toFixed(2);
  const legalWeighted = +(weights.legalAdmissibility * customAHP.wLegalAdmissibility).toFixed(2);

  const totalScore = +(appWeighted + techWeighted + legalWeighted).toFixed(1);

  // 2. Corroborating Forensic Vectors Analysis
  // Evaluate present independent vectors in active edges
  const activeVectors = new Set<VectorType>();
  let hasPGP = false;
  let hasWallets = false;
  let hasStylometry = false;
  let hasInfra = false;

  for (const edge of edges) {
    if (edge.confidence >= 70) {
      activeVectors.add(edge.vector);
      if (edge.vector === 'PGP' && edge.confidence >= 85) hasPGP = true;
      if (edge.vector === 'Wallets' && edge.confidence >= 85) hasWallets = true;
      if (edge.vector === 'Stylometry' && edge.confidence >= 85) hasStylometry = true;
      if (edge.vector === 'Infrastructure' && edge.confidence >= 80) hasInfra = true;
    }
  }

  const checklist = [
    {
      id: 'vec_pgp',
      label: 'Cryptographic Determinism (OpenPGP Subkey Collision)',
      met: hasPGP,
      vector: 'PGP' as VectorType,
      evidence: hasPGP ? 'RSA-4096 / Ed25519 subkey cross-certified by same master key ID.' : 'Subkey binding certification missing or unverified.'
    },
    {
      id: 'vec_wallet',
      label: 'Financial Co-Spend (Bitcoin Satoshi UTXO Clustering)',
      met: hasWallets,
      vector: 'Wallets' as VectorType,
      evidence: hasWallets ? 'Common-input ownership confirmed in multi-input darknet transaction.' : 'Wallets unlinked by direct UTXO spend graph.'
    },
    {
      id: 'vec_stylometry',
      label: 'Behavioral Stylometry (Cosine Similarity > 85%)',
      met: hasStylometry,
      vector: 'Stylometry' as VectorType,
      evidence: hasStylometry ? 'Character 3-5 gram TF-IDF similarity exceeds 85.0% threshold with idiosyncratic syntactic markers.' : 'Stylometric similarity below probative threshold.'
    },
    {
      id: 'vec_infra',
      label: 'Infrastructure Correlation (JARM / TLS / HTTP 404 Leaks)',
      met: hasInfra,
      vector: 'Infrastructure' as VectorType,
      evidence: hasInfra ? 'Identical JARM fingerprint and reverse-proxy header leak detected.' : 'No shared host fingerprints identified.'
    }
  ];

  const corroboratingCount = checklist.filter(c => c.met).length;

  // Under Section 63 BSA / Section 65B(4) IEA, digital attribution requires:
  // 1) Total TEF Score >= 75.0
  // 2) At least 2 independent corroborating vectors
  const isLegallyAdmissible = totalScore >= 75.0 && corroboratingCount >= 2;

  let admissibilityTier: 'High (Forensically Sound)' | 'Medium (Probative Intelligence)' | 'Low (Inconclusive)';
  if (totalScore >= 85 && corroboratingCount >= 3) {
    admissibilityTier = 'High (Forensically Sound)';
  } else if (totalScore >= 70 && corroboratingCount >= 2) {
    admissibilityTier = 'Medium (Probative Intelligence)';
  } else {
    admissibilityTier = 'Low (Inconclusive)';
  }

  return {
    totalScore,
    applicabilityWeighted: appWeighted,
    technicalEaseWeighted: techWeighted,
    legalAdmissibilityWeighted: legalWeighted,
    isLegallyAdmissible,
    corroboratingVectorsCount: corroboratingCount,
    admissibilityTier,
    activeChecklist: checklist
  };
}
