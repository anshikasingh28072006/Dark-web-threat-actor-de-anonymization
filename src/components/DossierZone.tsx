import React, { useState, useEffect } from 'react';
import { 
  User, 
  Clock, 
  Moon, 
  Sun, 
  Globe, 
  Coins, 
  AlertTriangle, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  HelpCircle,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { ThreatActorProfile, StylometryAnalysisResult, InferredTimezoneResult } from '../types';
import { analyzeStylometry } from '../services/stylometryEngine';
import { inferTimezoneFromDiurnal } from '../services/diurnalEngine';

interface DossierZoneProps {
  profile: ThreatActorProfile;
}

export const DossierZone: React.FC<DossierZoneProps> = ({ profile }) => {
  // Stylometry state
  const [textA, setTextA] = useState(profile.stylometric.sampleA);
  const [textB, setTextB] = useState(profile.stylometric.sampleB);
  const [stylometryResult, setStylometryResult] = useState<StylometryAnalysisResult>(() => 
    analyzeStylometry(profile.stylometric.sampleA, profile.stylometric.sampleB)
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Diurnal hover state
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);

  // Timezone inference
  const [timezoneResult, setTimezoneResult] = useState<InferredTimezoneResult>(() =>
    inferTimezoneFromDiurnal(profile.diurnal.hourly)
  );

  // Update when profile changes
  useEffect(() => {
    setTextA(profile.stylometric.sampleA);
    setTextB(profile.stylometric.sampleB);
    setStylometryResult(analyzeStylometry(profile.stylometric.sampleA, profile.stylometric.sampleB));
    setTimezoneResult(inferTimezoneFromDiurnal(profile.diurnal.hourly));
  }, [profile]);

  const handleRunStylometry = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const res = analyzeStylometry(textA, textB);
      setStylometryResult(res);
      setIsAnalyzing(false);
    }, 150);
  };

  const maxActivity = Math.max(...profile.diurnal.hourly, 1);

  return (
    <aside className="w-84 xl:w-92 bg-slate-900/95 border-r border-slate-800 flex flex-col h-full overflow-hidden shrink-0 select-none">
      {/* Zone Header */}
      <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
            ZONE 1: THREAT DOSSIER & BIOMETRICS
          </span>
        </div>
        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${profile.badgeClass} font-semibold`}>
          {profile.badge}
        </span>
      </div>

      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs font-mono">
        
        {/* CARD 1: Core Attribution Profile */}
        <div className="bg-slate-950/70 rounded-lg p-3 border border-slate-800/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">THREAT ENTITY</span>
            <span className="text-emerald-400 text-[10px] flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3 h-3" /> VERIFIED ATTRIBUTION
            </span>
          </div>

          <div>
            <h1 className="text-sm font-bold text-slate-100">{profile.name}</h1>
            <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{profile.vector}</p>
          </div>

          <div className="pt-2 border-t border-slate-800/70 grid grid-cols-2 gap-2 text-[10px]">
            <div>
              <span className="text-slate-500 block">Territory / Region:</span>
              <span className="text-slate-300 font-medium flex items-center gap-1">
                <Globe className="w-3 h-3 text-sky-400" />
                {profile.locale}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Illicit Proceeds:</span>
              <span className="text-amber-300 font-bold flex items-center gap-1">
                <Coins className="w-3 h-3 text-amber-400" />
                {profile.proceeds}
              </span>
            </div>
          </div>

          <div className="pt-1.5 border-t border-slate-800/70 text-[10px]">
            <span className="text-slate-500 block mb-1">Observed Rebrand Handles:</span>
            <div className="flex flex-wrap gap-1">
              {profile.aliases.map((alias) => (
                <span
                  key={alias}
                  className="px-1.5 py-0.5 rounded bg-sky-950/80 text-sky-300 border border-sky-800/60 text-[10px]"
                >
                  {alias}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 2: Diurnal Activity & Timezone Profiler */}
        <div className="bg-slate-950/70 rounded-lg p-3 border border-slate-800/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-amber-400" />
              24-HR DIURNAL POSTING CURVE
            </span>
            <span className="text-amber-400 font-semibold text-[10px]">
              {timezoneResult.inferredUtcString}
            </span>
          </div>

          {/* Interactive Bar Chart */}
          <div className="space-y-1">
            <div className="h-20 flex items-end gap-0.5 pt-2 px-1 bg-slate-900/60 rounded border border-slate-850 relative">
              {profile.diurnal.hourly.map((val, h) => {
                const heightPct = Math.round((val / maxActivity) * 100);
                const isSleepTrough =
                  (timezoneResult.sleepTroughStart <= timezoneResult.sleepTroughEnd)
                    ? (h >= timezoneResult.sleepTroughStart && h < timezoneResult.sleepTroughEnd)
                    : (h >= timezoneResult.sleepTroughStart || h < timezoneResult.sleepTroughEnd);
                const isPeak = h === timezoneResult.peakHour;
                const isHovered = hoveredHour === h;

                let barColor = 'bg-sky-500/70 hover:bg-sky-400';
                if (isSleepTrough) barColor = 'bg-purple-600/40 border border-purple-500/50';
                if (isPeak) barColor = 'bg-rose-500 hover:bg-rose-400';
                if (isHovered) barColor = 'bg-emerald-400';

                return (
                  <div
                    key={h}
                    onMouseEnter={() => setHoveredHour(h)}
                    onMouseLeave={() => setHoveredHour(null)}
                    className="flex-1 h-full flex flex-col justify-end items-center cursor-pointer group"
                  >
                    <div
                      style={{ height: `${Math.max(6, heightPct)}%` }}
                      className={`w-full rounded-t-sm transition-all duration-150 ${barColor}`}
                    />
                  </div>
                );
              })}
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between text-[9px] text-slate-500 px-1 font-mono">
              <span>00:00 UTC</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:00</span>
            </div>
          </div>

          {/* Dynamic Hover Status or Summary */}
          <div className="p-2 rounded bg-slate-900/90 border border-slate-850 text-[10px] space-y-1">
            {hoveredHour !== null ? (
              <div className="flex items-center justify-between text-slate-200">
                <span>Hour {String(hoveredHour).padStart(2, '0')}:00 UTC:</span>
                <span className="text-emerald-400 font-bold">
                  {profile.diurnal.hourly[hoveredHour]} forum postings recorded
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1 text-purple-300">
                  <Moon className="w-3 h-3 text-purple-400" />
                  Sleep Window: {String(timezoneResult.sleepTroughStart).padStart(2, '0')}:00-{String(timezoneResult.sleepTroughEnd).padStart(2, '0')}:00 UTC
                </span>
                <span className="flex items-center gap-1 text-rose-300">
                  <Sun className="w-3 h-3 text-rose-400" />
                  Peak: {String(timezoneResult.peakHour).padStart(2, '0')}:00 UTC
                </span>
              </div>
            )}
            <div className="text-slate-400 text-[9px] pt-1 border-t border-slate-800/60 flex justify-between">
              <span>Circadian Inferred Territory:</span>
              <span className="text-sky-300 font-medium">{timezoneResult.suspectedRegion}</span>
            </div>
          </div>
        </div>

        {/* CARD 3: Real NLP Stylometry Engine */}
        <div className="bg-slate-950/70 rounded-lg p-3 border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-purple-400" />
              REAL NLP STYLOMETRY ENGINE
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800">
              3-5 CHAR N-GRAM TF-IDF
            </span>
          </div>

          {/* Cosine Score Visualizer */}
          <div className="bg-slate-900 p-2.5 rounded border border-slate-850 flex items-center justify-between">
            <div>
              <span className="text-slate-400 text-[10px] block">Cosine Similarity:</span>
              <span className={`text-base font-bold ${
                stylometryResult.percentage >= 85 ? 'text-emerald-400' :
                stylometryResult.percentage >= 70 ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {stylometryResult.percentage}%
              </span>
              <span className="text-[9px] text-slate-500 block">
                {stylometryResult.percentage >= 85 ? 'Statistically Deterministic Match' : 'Probative Correlation'}
              </span>
            </div>

            {/* Circular score gauge */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-12 h-12 transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="#1e293b"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke={stylometryResult.percentage >= 85 ? '#10b981' : '#f59e0b'}
                  strokeWidth="4"
                  strokeDasharray={`${(stylometryResult.percentage / 100) * 125.6} 125.6`}
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <Sparkles className="w-4 h-4 absolute text-purple-400" />
            </div>
          </div>

          {/* Side-by-Side Input Fields */}
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
                <span className="text-sky-400 font-semibold">{profile.stylometric.sourceHandle}</span>
                <span>Post A</span>
              </div>
              <textarea
                value={textA}
                onChange={(e) => setTextA(e.target.value)}
                rows={2}
                className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-[10px] text-slate-300 font-mono focus:outline-none focus:border-sky-500 resize-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
                <span className="text-purple-400 font-semibold">{profile.stylometric.targetHandle}</span>
                <span>Post B</span>
              </div>
              <textarea
                value={textB}
                onChange={(e) => setTextB(e.target.value)}
                rows={2}
                className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-[10px] text-slate-300 font-mono focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

            <button
              onClick={handleRunStylometry}
              disabled={isAnalyzing}
              className="w-full py-1 bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/50 rounded text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              {isAnalyzing ? 'Vectorizing TF-IDF...' : 'Run Stylometric Analysis'}
            </button>
          </div>

          {/* Punctuation & Lexical Metrics Table */}
          <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">SYNTACTIC IDIOSYNCRASIES</span>

            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              <div className="bg-slate-900/90 p-1.5 rounded border border-slate-850 flex justify-between">
                <span className="text-slate-400">Triple Commas (,,,):</span>
                <span className="text-amber-400 font-bold">
                  {stylometryResult.punctuationStats.tripleCommasA} vs {stylometryResult.punctuationStats.tripleCommasB}
                </span>
              </div>
              <div className="bg-slate-900/90 p-1.5 rounded border border-slate-850 flex justify-between">
                <span className="text-slate-400">Space-Question ( ?):</span>
                <span className="text-sky-400 font-bold">
                  {stylometryResult.punctuationStats.detachedQuestionA} vs {stylometryResult.punctuationStats.detachedQuestionB}
                </span>
              </div>
              <div className="bg-slate-900/90 p-1.5 rounded border border-slate-850 flex justify-between">
                <span className="text-slate-400">Lexical TTR (A/B):</span>
                <span className="text-emerald-400 font-bold">
                  {stylometryResult.ttrA} / {stylometryResult.ttrB}
                </span>
              </div>
              <div className="bg-slate-900/90 p-1.5 rounded border border-slate-850 flex justify-between">
                <span className="text-slate-400">Sentence Length:</span>
                <span className="text-slate-300 font-bold">
                  {stylometryResult.avgSentenceLenA}w / {stylometryResult.avgSentenceLenB}w
                </span>
              </div>
            </div>

            {/* Leetspeak Chips */}
            {stylometryResult.leetspeakStats.tokensA.length > 0 && (
              <div className="pt-1 text-[10px]">
                <span className="text-slate-500 block mb-0.5">Detected Hacker Slang / Leetspeak:</span>
                <div className="flex flex-wrap gap-1">
                  {stylometryResult.leetspeakStats.tokensA.map(tok => (
                    <span key={tok} className="px-1 py-0.2 rounded bg-rose-950/80 text-rose-300 border border-rose-800 text-[9px]">
                      {tok}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </aside>
  );
};
