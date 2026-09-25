import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  ShieldAlert, 
  Globe, 
  Coins, 
  Scale, 
  Cpu, 
  Network, 
  Clock, 
  Key, 
  GitMerge, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  Radio,
  FileSpreadsheet,
  Download,
  AlertTriangle,
  Flame,
  Terminal
} from 'lucide-react';
import { ThreatActorProfile, TEFCalculationResult } from '../types';

interface OverviewViewProps {
  profile: ThreatActorProfile;
  tefResult: TEFCalculationResult;
  onNavigateTab: (tab: 'graph' | 'stylometry' | 'diurnal' | 'legal' | 'cockpit') => void;
  onSelectProfile?: (id: string) => void;
  allProfiles?: ThreatActorProfile[];
  onOpenSection65B?: () => void;
  onExportSTIX?: () => void;
  onExportCSV?: () => void;
  onOpenTour?: () => void;
  isSimulating: boolean;
  onToggleSimulation: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  profile,
  tefResult,
  onNavigateTab,
  onSelectProfile = (_id: string) => {},
  allProfiles = [],
  onOpenSection65B = () => {},
  onExportSTIX = () => {},
  onExportCSV = () => {},
  onOpenTour = () => {},
  isSimulating,
  onToggleSimulation
}) => {
  // Simulation Step (0 to 5)
  const [simStep, setSimStep] = useState<number>(0);
  const [simLogs, setSimLogs] = useState<string[]>([]);

  // Steps definition
  const scanStages = [
    {
      title: 'Darknet Crawl & Harvest',
      desc: 'Ingesting 4,200+ posts from Dread, BreachForums & Russian Exploit forums',
      icon: Terminal,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/30'
    },
    {
      title: 'Stylometric NLP Vectorization',
      desc: '3-5 char n-gram TF-IDF cosine comparison & idiosyncratic punctuation matching',
      icon: Cpu,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
    },
    {
      title: 'Blockchain Satoshi Clustering',
      desc: 'Tracing joint-input UTXO co-spend linking Dread deposit to Breach payout address',
      icon: GitMerge,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    },
    {
      title: 'PGP Cross-Certification',
      desc: 'Mathematical verification of shared RSA-4096 master signing key across aliases',
      icon: Key,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    },
    {
      title: 'Section 63 BSA Evidence Admissibility',
      desc: 'Statutory verification completed with 4 corroborating vectors meeting court threshold',
      icon: Scale,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
    }
  ];

  // Simulation timer logic
  useEffect(() => {
    let timer: any;
    if (isSimulating) {
      setSimStep(1);
      setSimLogs([
        `[00.1s] Crawling Tor onion services for targets: ${profile.aliases.join(', ')}...`,
        `[00.4s] Discovered 2 active mirror nodes with matching JARM TLS signatures.`
      ]);

      timer = setInterval(() => {
        setSimStep(prev => {
          if (prev >= 5) {
            clearInterval(timer);
            setSimLogs(logs => [
              ...logs,
              `[02.8s] Forensic proof established. Operator identity verified under Section 63 BSA.`
            ]);
            return 5;
          }
          const next = prev + 1;
          if (next === 2) {
            setSimLogs(logs => [
              ...logs,
              `[01.0s] Stylometric TF-IDF Cosine Match: 91.4%. Habitual triple commas (,,,) detected.`
            ]);
          } else if (next === 3) {
            setSimLogs(logs => [
              ...logs,
              `[01.6s] Satoshi UTXO co-spend detected in tx 7c89a01f... Joint private key proven!`
            ]);
          } else if (next === 4) {
            setSimLogs(logs => [
              ...logs,
              `[02.1s] OpenPGP Subkey 0x9E7A412F validly bound to both target aliases.`
            ]);
          } else if (next === 5) {
            setSimLogs(logs => [
              ...logs,
              `[02.5s] AHP Composite Score: ${tefResult.totalScore}%. Section 63 BSA Certificate signed.`
            ]);
          }
          return next;
        });
      }, 700);
    } else {
      setSimStep(0);
      setSimLogs([]);
    }

    return () => clearInterval(timer);
  }, [isSimulating, profile]);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-4 lg:p-6 space-y-6 select-none">
      
      {/* 1. TOP EXECUTIVE KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Target Entity */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>TARGET ENTITY</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded border font-semibold ${profile.badgeClass}`}>
              {profile.badge.split(' ')[0]}
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 truncate">{profile.name}</h3>
            <p className="text-[11px] text-slate-400 truncate mt-0.5">{profile.vector}</p>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-sky-400">
            <span>Aliases:</span>
            <span className="text-slate-300 truncate font-mono">{profile.aliases.slice(0, 2).join(', ')}</span>
          </div>
        </div>

        {/* Card 2: Attribution Confidence */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>CONFIDENCE RATING</span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-emerald-400">{tefResult.totalScore}%</span>
              <span className="text-xs text-slate-400 font-mono">AHP COMPOSITE</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${tefResult.totalScore}%` }}
              />
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex justify-between">
            <span>Probative Level:</span>
            <span className="text-emerald-300 font-semibold">{tefResult.admissibilityTier.split(' ')[0]}</span>
          </div>
        </div>

        {/* Card 3: Inferred Geography */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>INFERRED REGION</span>
            <Globe className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 leading-tight">{profile.locale}</h3>
            <span className="text-xs font-mono text-sky-400 font-semibold mt-1 inline-block">
              {profile.diurnal.inferredOffset} ({profile.diurnal.zone})
            </span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex justify-between">
            <span>Circadian Sleep:</span>
            <span className="text-purple-300 font-mono">
              {String(profile.diurnal.sleepWindow[0]).padStart(2, '0')}:00-{String(profile.diurnal.sleepWindow[1]).padStart(2, '0')}:00 UTC
            </span>
          </div>
        </div>

        {/* Card 4: Crypto Proceeds */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>ILLICIT FLOW</span>
            <Coins className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-amber-300 font-mono">{profile.proceeds}</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Tracked Blockchain UTXO Volume</p>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex justify-between">
            <span>Laundering Method:</span>
            <span className="text-amber-400 font-semibold">Mixer Peel Hops</span>
          </div>
        </div>

        {/* Card 5: Section 63 BSA Status */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>COURT STATUS</span>
            <Scale className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
              tefResult.isLegallyAdmissible
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                : 'bg-rose-950 text-rose-300 border border-rose-700'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              {tefResult.isLegallyAdmissible ? 'SEC 63 BSA ADMISSIBLE' : 'PROBATIVE ONLY'}
            </span>
            <p className="text-[10px] text-slate-400 mt-1">4 of 4 statutory vectors corroborated</p>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <button
              onClick={onOpenSection65B}
              className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <span>View Certificate</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC ATTRIBUTION SCAN SIMULATOR */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800 font-semibold flex items-center gap-1">
                <Radio className="w-3 h-3 text-sky-400 animate-pulse" />
                AUTOMATED REASONING PIPELINE
              </span>
              <span className="text-xs text-slate-400">Interactive Forensic Demonstration</span>
            </div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              Live Threat Actor De-Anonymization Scan
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 max-w-xl">
              Simulate an end-to-end multi-vector attribution scan. Watch raw darknet handles converge into a verified real-world operator profile.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onToggleSimulation}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 shadow-lg transition-all ${
                isSimulating
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
                  : 'bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-sky-600/25'
              }`}
            >
              {isSimulating ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  <span>Reset Scan</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-sky-200 fill-current" />
                  <span>Run Live Attribution Scan</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 5-Stage Visual Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-4">
          {scanStages.map((stage, idx) => {
            const stepNum = idx + 1;
            const isPassed = simStep >= stepNum;
            const isCurrent = simStep === stepNum && isSimulating;
            const Icon = stage.icon;

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border transition-all duration-300 ${
                  isCurrent
                    ? 'bg-sky-950/60 border-sky-500 ring-2 ring-sky-500/20 shadow-lg'
                    : isPassed
                    ? 'bg-slate-900/80 border-emerald-500/40 text-slate-200'
                    : 'bg-slate-950/40 border-slate-850 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${stage.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold">
                    {isPassed ? (
                      <span className="text-emerald-400 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> DONE
                      </span>
                    ) : (
                      <span className="text-slate-500">STAGE {stepNum}</span>
                    )}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-100">{stage.title}</h4>
                <p className="text-[10px] text-slate-400 mt-1 leading-snug">{stage.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Scan Status Console Banner */}
        {simLogs.length > 0 && (
          <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-[10px] pb-1 border-b border-slate-850">
              <span className="flex items-center gap-1">
                <Terminal className="w-3 h-3 text-sky-400" />
                FORENSIC ENGINE LOGS
              </span>
              <span className="text-emerald-400">
                {simStep === 5 ? 'COMPLETED (100%)' : `PROCESSING STAGE ${simStep}/5`}
              </span>
            </div>
            {simLogs.map((log, index) => (
              <div key={index} className="text-slate-300">
                {log}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. CASE PRESETS SWITCHER (EXPLORE DIFFERENT SYNDICATES) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
            Switch Target Dossier Case:
          </span>
          <span className="text-[11px] text-slate-400">
            Explore 3 high-profile darknet syndicates with full forensic evidence chains.
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(allProfiles || []).map(p => (
            <button
              key={p.id}
              onClick={() => onSelectProfile(p.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                profile.id === p.id
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700'
              }`}
            >
              {p.name.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* 4. INTERACTIVE WORKSPACES (BENTO GRID WITH DEEP-DIVE LINKS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        
        {/* Workspace Card 1: Knowledge Graph */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-sky-500/50 transition-all group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Network className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {profile.nodes.length} Nodes / {profile.edges.length} Edges
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
              Attribution Knowledge Graph
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Interactive Cytoscape topology showing forum accounts, Bitcoin wallets, PGP fingerprints, and server infrastructure.
            </p>
            <div className="mt-3 flex flex-wrap gap-1 text-[10px] font-mono">
              <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">Target Core</span>
              <span className="px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">Handles</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">UTXO Wallets</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">PGP Keys</span>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('graph')}
            className="mt-4 w-full py-2 bg-slate-800 hover:bg-sky-600 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Launch Interactive Graph</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Workspace Card 2: Stylometry & NLP Lab */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-purple-500/50 transition-all group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                91.4% Cosine Match
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
              Stylometric NLP Lab
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Test writing styles across aliases. Subconscious habits like triple commas (,,,) and space-questions ( ?) expose the same author.
            </p>
            <div className="mt-3 p-2 bg-slate-950 rounded-lg border border-slate-850 text-[10px] text-slate-300 font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Triple Commas (,,,):</span>
                <span className="text-amber-400 font-bold">18 Matched Instances</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Space-Question ( ?):</span>
                <span className="text-sky-400 font-bold">Cyrillic Keyboard Habit</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('stylometry')}
            className="mt-4 w-full py-2 bg-slate-800 hover:bg-purple-600 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Open Stylometry Lab</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Workspace Card 3: Chronobiology & Timezone */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-500/50 transition-all group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                {profile.diurnal.inferredOffset}
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
              Diurnal Circadian Profiler
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Analyzes 24-hour darknet posting distributions to calculate human biological sleep cycles and identify geographic timezones.
            </p>
            <div className="mt-3 p-2 bg-slate-950 rounded-lg border border-slate-850 text-[10px] text-slate-300 font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Sleep Trough Window:</span>
                <span className="text-purple-300 font-bold">02:00 - 07:00 UTC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Suspected Country:</span>
                <span className="text-amber-300 font-bold">{profile.locale.split('/')[0]}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('diurnal')}
            className="mt-4 w-full py-2 bg-slate-800 hover:bg-amber-600 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Inspect Diurnal Timeline</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Workspace Card 4: Legal & Court Admissibility */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-500/50 transition-all group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Scale className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                SEC 63 BSA
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
              Legal Admissibility (TEF)
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Analytic Hierarchy Process (AHP) scoring engine ensuring cyber evidence withstands strict judicial scrutiny in courts.
            </p>
            <div className="mt-3 p-2 bg-slate-950 rounded-lg border border-slate-850 text-[10px] text-slate-300 font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Statutory Corroboration:</span>
                <span className="text-emerald-400 font-bold">4 / 4 Vectors</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Master Hash Digest:</span>
                <span className="text-slate-300 font-mono">{profile.sec65b.hash.slice(0, 14)}...</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('legal')}
            className="mt-4 w-full py-2 bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Calculate AHP Matrix</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 5. FAST EXPORT ACTIONS BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100">Ready for Judicial Submission</h4>
            <p className="text-[11px] text-slate-400">
              Generate court-ready certificates, STIX 2.1 JSON bundles, and forensic evidence tables.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSection65B}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Generate Sec 63 Certificate</span>
          </button>

          <button
            onClick={onExportSTIX}
            className="px-3 py-1.5 bg-sky-600/30 hover:bg-sky-600 text-sky-200 hover:text-white border border-sky-500/40 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export STIX 2.1</span>
          </button>

          <button
            onClick={onExportCSV}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

    </div>
  );
};
