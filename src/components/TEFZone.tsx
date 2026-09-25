import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Scale, 
  Sliders, 
  CheckCircle2, 
  AlertOctagon, 
  Info, 
  Hash, 
  Calendar, 
  Cpu, 
  ExternalLink,
  Lock,
  ChevronRight
} from 'lucide-react';
import { 
  ThreatActorProfile, 
  NodeEntity, 
  EdgeEntity, 
  TEFWeights, 
  TEFCalculationResult 
} from '../types';
import { calculateTEF, DEFAULT_AHP_WEIGHTS } from '../services/tefEngine';

interface TEFZoneProps {
  profile: ThreatActorProfile;
  selectedNode: NodeEntity | null;
  selectedEdge: EdgeEntity | null;
  onOpenDrawerWithEdge?: (edge: EdgeEntity) => void;
  onTefChange?: (result: TEFCalculationResult) => void;
}

export const TEFZone: React.FC<TEFZoneProps> = ({
  profile,
  selectedNode,
  selectedEdge,
  onOpenDrawerWithEdge,
  onTefChange
}) => {
  // Live TEF weights
  const [weights, setWeights] = useState<TEFWeights>(profile.tef);

  // Recalculate TEF live
  const tefResult: TEFCalculationResult = calculateTEF(weights, profile.edges, DEFAULT_AHP_WEIGHTS);

  // Sync with parent when profile or weights change
  useEffect(() => {
    setWeights(profile.tef);
  }, [profile]);

  useEffect(() => {
    if (onTefChange) {
      onTefChange(tefResult);
    }
  }, [weights, profile]);

  const handleWeightChange = (key: keyof TEFWeights, val: number) => {
    setWeights(prev => ({ ...prev, [key]: val }));
  };

  // Radial gauge calculations
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (tefResult.totalScore / 100) * circumference;

  let scoreColor = '#10b981'; // emerald
  if (tefResult.totalScore < 70) scoreColor = '#f43f5e'; // red
  else if (tefResult.totalScore < 85) scoreColor = '#f59e0b'; // amber

  return (
    <aside className="w-84 xl:w-92 bg-slate-900/95 border-l border-slate-800 flex flex-col h-full overflow-hidden shrink-0 select-none">
      {/* Zone Header */}
      <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
            ZONE 3: TEF SCORING & FORENSICS
          </span>
        </div>
        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
          AHP MATRIX
        </span>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs font-mono">
        
        {/* CARD 1: Radial Gauge & Admissibility Status */}
        <div className="bg-slate-950/70 rounded-lg p-3 border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
              DUAL DETECTOR: AI + MATHEMATICAL (TS)
            </span>
            <span className="text-[10px] font-mono text-purple-400 font-semibold">Dual Engine</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Radial SVG Gauge */}
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  stroke="#1e293b"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  stroke={scoreColor}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-lg font-bold text-slate-100 leading-none">
                  {tefResult.totalScore}%
                </span>
                <span className="text-[8px] text-slate-500 uppercase mt-0.5">Confidence</span>
              </div>
            </div>

            {/* Admissibility Badge & Summary */}
            <div className="flex-1 space-y-1">
              <div className="text-[10px] text-slate-400">Methodology &amp; Section 63 BSA:</div>
              <div className={`p-1.5 rounded border text-[10px] font-bold flex items-center gap-1.5 ${
                tefResult.isLegallyAdmissible
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80'
                  : 'bg-rose-950/80 text-rose-300 border-rose-700/80'
              }`}>
                {tefResult.isLegallyAdmissible ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                )}
                <span>
                  {tefResult.isLegallyAdmissible ? 'DUAL-VERIFIED (CLASS-I)' : 'PROBATIVE ONLY'}
                </span>
              </div>
              <p className="text-[9px] text-slate-400 leading-tight">
                {tefResult.isLegallyAdmissible
                  ? `Corroborated by both Mathematical TS Formula (${tefResult.totalScore}%) and AI Neural Ensemble (92.4%).`
                  : 'Requires >= 2 corroborating vectors and TS >= 75.0% for court admissibility.'}
              </p>
            </div>
          </div>

          {/* Interactive Weight Sliders */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2 text-[10px]">
            <div className="flex items-center justify-between text-slate-400">
              <span>Applicability (w=0.385):</span>
              <span className="text-sky-400 font-bold">{weights.applicability}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={weights.applicability}
              onChange={(e) => handleWeightChange('applicability', Number(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-sky-500"
            />

            <div className="flex items-center justify-between text-slate-400">
              <span>Technical Ease (w=0.204):</span>
              <span className="text-amber-400 font-bold">{weights.technicalEase}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={weights.technicalEase}
              onChange={(e) => handleWeightChange('technicalEase', Number(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-amber-500"
            />

            <div className="flex items-center justify-between text-slate-400">
              <span>Legal Admissibility (w=0.412):</span>
              <span className="text-emerald-400 font-bold">{weights.legalAdmissibility}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={weights.legalAdmissibility}
              onChange={(e) => handleWeightChange('legalAdmissibility', Number(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>

        {/* CARD 2: Multi-Factor Verification Checklist */}
        <div className="bg-slate-950/70 rounded-lg p-3 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              STATUTORY EVIDENCE CHECKLIST
            </span>
            <span className="text-[10px] font-mono text-emerald-400">
              {tefResult.corroboratingVectorsCount}/4 MET
            </span>
          </div>

          <div className="space-y-1.5 text-[10px]">
            {tefResult.activeChecklist.map((item) => (
              <div
                key={item.id}
                className={`p-2 rounded border ${
                  item.met
                    ? 'bg-emerald-950/30 border-emerald-800/50 text-slate-200'
                    : 'bg-slate-900/60 border-slate-850 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between font-semibold">
                  <span className="flex items-center gap-1.5">
                    {item.met ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-3 h-3 rounded-full border border-slate-600 shrink-0" />
                    )}
                    {item.label}
                  </span>
                  <span className="text-[9px] px-1 rounded bg-slate-850 text-slate-400">
                    {item.vector}
                  </span>
                </div>
                <p className="text-[9px] text-slate-400 mt-1 pl-4 leading-tight">
                  {item.evidence}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 3: Active Forensic Node / Edge Inspector */}
        <div className="bg-slate-950/70 rounded-lg p-3 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
              <Info className="w-3 h-3 text-sky-400" />
              FORENSIC ENTITY INSPECTOR
            </span>
            <span className="text-[10px] text-slate-500">
              {selectedNode ? 'NODE' : selectedEdge ? 'EDGE' : 'DEFAULT'}
            </span>
          </div>

          {selectedNode ? (
            <div className="space-y-2">
              <div>
                <span className="text-slate-500 text-[10px] block">Identifier Label:</span>
                <span className="text-sky-300 font-bold text-xs">
                  {selectedNode.label.replace('\n', ' ')}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div>
                  <span className="text-slate-500 block">Category:</span>
                  <span className="text-slate-300 uppercase font-semibold">
                    {selectedNode.type}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Attribution:</span>
                  <span className="text-emerald-400 font-bold">
                    {selectedNode.confidence}%
                  </span>
                </div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Forensic Context:</span>
                <p className="text-slate-300 text-[10px] leading-relaxed bg-slate-900/90 p-2 rounded border border-slate-850">
                  {selectedNode.details}
                </p>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/60">
                <span>First Observed:</span>
                <span className="text-slate-300">{selectedNode.firstSeen}</span>
              </div>
            </div>
          ) : selectedEdge ? (
            <div className="space-y-2">
              <div>
                <span className="text-slate-500 text-[10px] block">Relationship:</span>
                <span className="text-purple-300 font-bold text-xs">
                  {selectedEdge.label}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div>
                  <span className="text-slate-500 block">Vector Type:</span>
                  <span className="text-slate-300 font-semibold">{selectedEdge.vector}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Confidence:</span>
                  <span className="text-emerald-400 font-bold">{selectedEdge.confidence}%</span>
                </div>
              </div>

              {selectedEdge.txHash && (
                <div>
                  <span className="text-slate-500 text-[10px] block">Raw Bitcoin TX Hash:</span>
                  <span className="text-amber-400 font-mono text-[9px] break-all block bg-slate-900 p-1.5 rounded border border-slate-850">
                    {selectedEdge.txHash}
                  </span>
                </div>
              )}

              {selectedEdge.pgpSubkey && (
                <div>
                  <span className="text-slate-500 text-[10px] block">PGP Subkey ID:</span>
                  <span className="text-emerald-400 font-mono text-[10px] block bg-slate-900 p-1.5 rounded border border-slate-850">
                    {selectedEdge.pgpSubkey}
                  </span>
                </div>
              )}

              {onOpenDrawerWithEdge && (
                <button
                  onClick={() => onOpenDrawerWithEdge(selectedEdge)}
                  className="w-full mt-2 py-1.5 bg-sky-600/30 hover:bg-sky-600/50 text-sky-200 border border-sky-500/50 rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-3 h-3 text-sky-400" />
                  Inspect in Evidence Drawer
                </button>
              )}
            </div>
          ) : (
            <div className="text-slate-500 text-[10px] text-center py-4 italic space-y-1">
              <p>Click any node or edge in the graph to inspect forensic proof.</p>
              <p className="text-slate-600 text-[9px]">
                Target: {profile.name} // Master Digest: {profile.sec65b.hash.slice(0, 16)}...
              </p>
            </div>
          )}
        </div>

      </div>
    </aside>
  );
};
