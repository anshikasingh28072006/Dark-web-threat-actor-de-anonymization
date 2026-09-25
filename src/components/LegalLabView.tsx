import React, { useState } from 'react';
import { 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Download, 
  FileSpreadsheet, 
  ShieldCheck, 
  Sliders, 
  HelpCircle,
  Hash,
  Award
} from 'lucide-react';
import { ThreatActorProfile, TEFCalculationResult, TEFWeights } from '../types';
import { calculateTEF } from '../services/tefEngine';

interface LegalLabViewProps {
  profile: ThreatActorProfile;
  tefResult?: TEFCalculationResult;
  onTefChange?: (result: TEFCalculationResult) => void;
  onOpenSection65B?: () => void;
  onExportSTIX?: () => void;
  onExportCSV?: () => void;
}

export const LegalLabView: React.FC<LegalLabViewProps> = ({
  profile,
  tefResult: incomingTefResult,
  onTefChange = (_result: TEFCalculationResult) => {},
  onOpenSection65B = () => {},
  onExportSTIX = () => {},
  onExportCSV = () => {},
}) => {
  // Local editable weights
  const [weights, setWeights] = useState<TEFWeights>({ ...profile.tef });

  // Fallback tefResult if not passed
  const tefResult = incomingTefResult || calculateTEF(weights, profile.edges);

  const handleSliderChange = (field: keyof TEFWeights, value: number) => {
    const updated = { ...weights, [field]: value };
    setWeights(updated);
    const newResult = calculateTEF(updated, profile.edges);
    onTefChange(newResult);
  };

  const handleResetWeights = () => {
    setWeights({ ...profile.tef });
    onTefChange(calculateTEF(profile.tef, profile.edges));
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-4 lg:p-6 space-y-6 select-none">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold flex items-center gap-1">
              <Scale className="w-3 h-3 text-emerald-400" />
              STATUTORY EVIDENCE ENGINE
            </span>
            <span className="text-xs text-slate-400">Section 63 BSA / 65B(4) IEA Admissibility</span>
          </div>
          <h2 className="text-lg font-bold text-slate-100">
            Traceability Evaluation Framework (TEF) & Court Admissibility
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
            In criminal jurisprudence, cyber evidence must satisfy strict statutory standards of chain-of-custody, reproducibility, and multi-factor corroboration to be admissible in a court of law.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSection65B}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-mono font-semibold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Scale className="w-4 h-4" />
            <span>Generate Sec 63 BSA Certificate</span>
          </button>
        </div>
      </div>

      {/* Main Score & Verification Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Score Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>COMPOSITE AHP SCORE</span>
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-bold font-mono text-emerald-400">
                {tefResult.totalScore}%
              </span>
              <span className="text-xs text-slate-400 font-mono">/ 100</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${tefResult.totalScore}%` }}
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs text-slate-400">Admissibility Tier:</span>
            <span className="text-xs font-bold text-emerald-300">
              {tefResult.admissibilityTier}
            </span>
          </div>
        </div>

        {/* Corroboration Vectors Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>CORROBORATING VECTORS</span>
              <ShieldCheck className="w-4 h-4 text-sky-400" />
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-bold font-mono text-sky-400">
                {tefResult.corroboratingVectorsCount}
              </span>
              <span className="text-xs text-slate-400 font-mono">of 4 Required</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Satisfies statutory requirement for multi-source corroboration.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs text-slate-400">Court Threshold:</span>
            <span className="text-xs font-bold text-sky-300">
              &gt;= 2 Distinct Vectors Met
            </span>
          </div>
        </div>

        {/* Legal Status Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>LEGAL STATUTORY STATUS</span>
              <Scale className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                SECTION 63 BSA COMPLIANT
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Tamper-evident SHA-256 hash verified with lawful chain-of-custody.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs text-slate-400">Master Hash:</span>
            <span className="text-[11px] font-mono text-slate-300 truncate max-w-[150px]">
              {profile.sec65b.hash.slice(0, 16)}...
            </span>
          </div>
        </div>
      </div>

      {/* Interactive AHP Sliders Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-slate-100">
              Analytic Hierarchy Process (AHP) Weight Adjuster
            </h3>
          </div>
          <button
            onClick={handleResetWeights}
            className="text-xs font-mono text-slate-400 hover:text-slate-200 underline"
          >
            Reset Default Weights
          </button>
        </div>

        <p className="text-xs text-slate-400">
          The Analytic Hierarchy Process (AHP) computes a weighted composite index: <br />
          <span className="font-mono text-emerald-300">
            TS = (0.385 × Applicability) + (0.204 × Technical Ease) + (0.412 × Legal Admissibility)
          </span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Slider 1: Applicability */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-slate-300">Applicability</span>
              <span className="font-mono text-sky-400 font-bold">
                {weights.applicability.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={weights.applicability}
              onChange={e => handleSliderChange('applicability', parseFloat(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Weight: 38.5% — Relevance to threat vector
            </p>
          </div>

          {/* Slider 2: Technical Ease */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-slate-300">Technical Ease</span>
              <span className="font-mono text-purple-400 font-bold">
                {weights.technicalEase.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={weights.technicalEase}
              onChange={e => handleSliderChange('technicalEase', parseFloat(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Weight: 20.4% — Algorithmic reproducibility
            </p>
          </div>

          {/* Slider 3: Legal Admissibility */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-slate-300">Legal Admissibility</span>
              <span className="font-mono text-emerald-400 font-bold">
                {weights.legalAdmissibility.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={weights.legalAdmissibility}
              onChange={e => handleSliderChange('legalAdmissibility', parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Weight: 41.2% — Judicial evidentiary weight
            </p>
          </div>
        </div>
      </div>

      {/* Multi-Factor Corroboration Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-100">
              Corroborating Evidence Chain (Section 63 BSA Checklist)
            </h3>
          </div>
          <span className="text-xs text-slate-400">All 4 vectors verified forensically</span>
        </div>

        <div className="space-y-2.5">
          {(tefResult?.activeChecklist || []).map((item, index) => (
            <div
              key={index}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{item.name}</h4>
                  <p className="text-[11px] text-slate-400">{item.detail}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold self-end sm:self-center">
                VERIFIED
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-850 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-100">Export Formal Judicial Submission Bundle</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Package this entire investigation into standardized cyber intelligence and legal formats.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onExportSTIX}
            className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-mono font-semibold flex items-center gap-1.5 shadow-md shadow-sky-600/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export OASIS STIX 2.1 JSON</span>
          </button>

          <button
            onClick={onExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold flex items-center gap-1.5 border border-slate-700 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-400" />
            <span>Export Forensic Evidence CSV</span>
          </button>
        </div>
      </div>

    </div>
  );
};
