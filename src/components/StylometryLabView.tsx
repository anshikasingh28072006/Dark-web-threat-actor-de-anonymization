import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  HelpCircle,
  Copy,
  Layers,
  Search,
  ArrowRight
} from 'lucide-react';
import { ThreatActorProfile, StylometryAnalysisResult } from '../types';
import { analyzeStylometry } from '../services/stylometryEngine';

interface StylometryLabViewProps {
  profile: ThreatActorProfile;
}

export const StylometryLabView: React.FC<StylometryLabViewProps> = ({ profile }) => {
  // Preset selector
  const [activePreset, setActivePreset] = useState<'default' | 'ransom' | 'custom'>('default');

  const presetA = profile.stylometric.sampleA;
  const presetB = profile.stylometric.sampleB;

  const ransomSampleA = `Attention IT Security team,,, your corporate ESXi cluster and core Active Directory databases are completely encrypted using ChaCha20-Poly1305 . All backups were wiped prior to execution . Do not attempt recovery or contact outside negotiators ? Contact us on qTox or our onion escrow portal within 72 hours with 25 BTC,,, or 1.2 TB of sensitive employee PII and source code will be published on our leak site .`;
  const ransomSampleB = `To all management,,, we have acquired complete internal git repositories, financial ledgers and customer PII . Encrypted files use military grade cipher . Is escrow ready ? If payment is delayed past 48 hours,,, files will be auctioned to competitor syndicates on BreachForums . Do not test us .`;

  const [textA, setTextA] = useState<string>(presetA);
  const [textB, setTextB] = useState<string>(presetB);
  const [handleA, setHandleA] = useState<string>(profile.stylometric.sourceHandle);
  const [handleB, setHandleB] = useState<string>(profile.stylometric.targetHandle);

  // Filter highlights
  const [highlightPunct, setHighlightPunct] = useState<boolean>(true);
  const [highlightLeet, setHighlightLeet] = useState<boolean>(true);

  // Analysis result
  const [analysis, setAnalysis] = useState<StylometryAnalysisResult>(() =>
    analyzeStylometry(textA, textB)
  );

  // Auto-run analysis when text changes
  useEffect(() => {
    setAnalysis(analyzeStylometry(textA, textB));
  }, [textA, textB]);

  // Sync with profile if selected actor changes
  useEffect(() => {
    setTextA(profile.stylometric.sampleA);
    setTextB(profile.stylometric.sampleB);
    setHandleA(profile.stylometric.sourceHandle);
    setHandleB(profile.stylometric.targetHandle);
  }, [profile.id]);

  const handleSelectPreset = (preset: 'default' | 'ransom' | 'custom') => {
    setActivePreset(preset);
    if (preset === 'default') {
      setTextA(profile.stylometric.sampleA);
      setTextB(profile.stylometric.sampleB);
      setHandleA(profile.stylometric.sourceHandle);
      setHandleB(profile.stylometric.targetHandle);
    } else if (preset === 'ransom') {
      setTextA(ransomSampleA);
      setTextB(ransomSampleB);
      setHandleA('SpectreOp (Darknet Forum)');
      setHandleB('NemesisVendor (Extortion Portal)');
    } else {
      setTextA('');
      setTextB('');
      setHandleA('Suspect Post #1');
      setHandleB('Suspect Post #2');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-4 lg:p-6 space-y-6 select-none">
      
      {/* Top Header & Presets */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-semibold flex items-center gap-1">
              <Cpu className="w-3 h-3 text-purple-400" />
              NLP STYLOMETRY WORKBENCH
            </span>
            <span className="text-xs text-slate-400">Subconscious Linguistic Biometrics</span>
          </div>
          <h2 className="text-lg font-bold text-slate-100">
            Author Attribution & Syntax Comparison Lab
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
            Compare dark web posts across different handles. Extract 3-5 character n-grams, lexical richness (TTR), and idiosyncratic punctuation quirks that prove common authorship.
          </p>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">Presets:</span>
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 gap-1">
            <button
              onClick={() => handleSelectPreset('default')}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
                activePreset === 'default'
                  ? 'bg-purple-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Forum Posts
            </button>
            <button
              onClick={() => handleSelectPreset('ransom')}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
                activePreset === 'ransom'
                  ? 'bg-purple-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Ransom Note
            </button>
            <button
              onClick={() => handleSelectPreset('custom')}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
                activePreset === 'custom'
                  ? 'bg-purple-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Custom Test
            </button>
          </div>
        </div>
      </div>

      {/* Primary Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        {/* Cosine Similarity Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>COSINE SIMILARITY</span>
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-purple-400 font-mono">
                {analysis.percentage}%
              </span>
              <span className="text-xs text-slate-400">TF-IDF Vector</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-purple-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(analysis.percentage, 100)}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-emerald-400 font-semibold mt-2 pt-2 border-t border-slate-800/80">
            {analysis.percentage >= 80 ? '✓ High Attribution Match' : analysis.percentage >= 50 ? 'Moderate Correlation' : 'Low Correlation'}
          </p>
        </div>

        {/* Punctuation Anomalies */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>TRIPLE COMMAS (,,,)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
              HABITUAL
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-amber-400 font-mono">
                {analysis.punctuationStats.tripleCommasA} vs {analysis.punctuationStats.tripleCommasB}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Sample A: {analysis.punctuationStats.tripleCommasA} | Sample B: {analysis.punctuationStats.tripleCommasB}
            </p>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
            Subconscious pause delimiter
          </p>
        </div>

        {/* Detached Question Mark */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>SPACE-QUESTION ( ?)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
              KEYBOARD ARTIFACT
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-sky-400 font-mono">
                {analysis.punctuationStats.detachedQuestionA} vs {analysis.punctuationStats.detachedQuestionB}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Pre-punctuation whitespace habit
            </p>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
            Common in Cyrillic transliteration
          </p>
        </div>

        {/* Lexical Diversity */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>TYPE-TOKEN RATIO (TTR)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
              VOCABULARY
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-400 font-mono">
                {(analysis.ttrA * 100).toFixed(0)}% / {(analysis.ttrB * 100).toFixed(0)}%
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Unique word ratio across samples
            </p>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
            Shows vocabulary richness parity
          </p>
        </div>
      </div>

      {/* Interactive Side-by-Side Editor & Live Highlighter */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Sample A */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              <input
                type="text"
                value={handleA}
                onChange={e => setHandleA(e.target.value)}
                className="bg-transparent text-xs font-mono font-bold text-slate-200 border-b border-transparent hover:border-slate-700 focus:border-sky-500 focus:outline-none"
              />
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              {textA.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          <textarea
            value={textA}
            onChange={e => setTextA(e.target.value)}
            rows={7}
            placeholder="Type or paste sample text from forum post A..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors leading-relaxed resize-none"
          />

          <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-850 text-[11px] text-slate-400 space-y-1">
            <span className="text-slate-500 font-mono text-[10px] block uppercase">Detected Markers:</span>
            <div className="flex flex-wrap gap-1.5">
              {textA.includes(',,,') && (
                <span className="px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800 font-mono text-[10px]">
                  Triple Comma (,,,)
                </span>
              )}
              {textA.includes(' ?') && (
                <span className="px-1.5 py-0.5 rounded bg-sky-950/60 text-sky-300 border border-sky-800 font-mono text-[10px]">
                  Space-Question ( ?)
                </span>
              )}
              {(analysis?.leetspeakStats?.tokensA || []).map((t, idx) => (
                <span key={idx} className="px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800 font-mono text-[10px]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sample B */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              <input
                type="text"
                value={handleB}
                onChange={e => setHandleB(e.target.value)}
                className="bg-transparent text-xs font-mono font-bold text-slate-200 border-b border-transparent hover:border-slate-700 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              {textB.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          <textarea
            value={textB}
            onChange={e => setTextB(e.target.value)}
            rows={7}
            placeholder="Type or paste sample text from forum post B..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors leading-relaxed resize-none"
          />

          <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-850 text-[11px] text-slate-400 space-y-1">
            <span className="text-slate-500 font-mono text-[10px] block uppercase">Detected Markers:</span>
            <div className="flex flex-wrap gap-1.5">
              {textB.includes(',,,') && (
                <span className="px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800 font-mono text-[10px]">
                  Triple Comma (,,,)
                </span>
              )}
              {textB.includes(' ?') && (
                <span className="px-1.5 py-0.5 rounded bg-sky-950/60 text-sky-300 border border-sky-800 font-mono text-[10px]">
                  Space-Question ( ?)
                </span>
              )}
              {(analysis?.leetspeakStats?.tokensB || []).map((t, idx) => (
                <span key={idx} className="px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800 font-mono text-[10px]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 3-5 Character N-Grams & Shared Substrings */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-slate-100">
              Extracted 3–5 Character Shared N-Grams
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Top mathematical token overlaps between the two samples
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {(analysis?.topSharedNGrams || []).slice(0, 10).map((ng, index) => (
            <div
              key={index}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-between font-mono text-xs"
            >
              <span className="text-purple-300 font-bold bg-purple-950/60 px-1.5 py-0.5 rounded">
                "{ng.gram}"
              </span>
              <span className="text-[10px] text-slate-500">
                {ng.countA}x : {ng.countB}x
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Explainer Box: Why Stylometry Works */}
      <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/40 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 space-y-1 leading-relaxed">
          <h4 className="font-bold text-purple-300">Why Stylometric Forensic Evidence Holds Up</h4>
          <p>
            While human actors can alter their usernames, passwords, and VPN exit nodes, they rarely suppress their subconscious linguistic rhythms. Repetitive habits—such as habitual comma spacing, sentence clause boundaries, and Cyrillic keyboard auto-space artifacts—provide strong probabilistic correlation that corroborates blockchain and PGP records.
          </p>
        </div>
      </div>

    </div>
  );
};
