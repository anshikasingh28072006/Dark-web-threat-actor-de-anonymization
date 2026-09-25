import React, { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  Search, 
  Cpu, 
  GitMerge, 
  Scale, 
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Play
} from 'lucide-react';

interface GuidedTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartSimulation?: () => void;
  onSelectProfile?: (id: string) => void;
}

export const GuidedTourModal: React.FC<GuidedTourModalProps> = ({
  isOpen,
  onClose,
  onStartSimulation = () => {},
  onSelectProfile
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      step: 'STEP 1 / 4',
      title: 'The Dark Web Anonymity Problem',
      subtitle: 'Criminals assume they are invisible behind Tor, burner handles, and Bitcoin.',
      icon: Search,
      iconColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      description:
        'Threat actors operate multiple personas across darknet forums (e.g., Dread, BreachForums). They switch aliases regularly to avoid detection, thinking Tor encryption and privacy coins protect them.',
      keyTakeaways: [
        'Actors manage multiple distinct pseudonyms across different illegal marketplaces',
        'Traditional IP-based tracking fails due to Tor multi-hop onion routing',
        'De-anonymization requires fusing linguistic, financial, and cryptographic evidence'
      ],
      badge: 'PROBLEM CONTEXT'
    },
    {
      step: 'STEP 2 / 4',
      title: 'Stylometry & Circadian Sleep Profiling',
      subtitle: 'Unconscious writing habits and human biological sleep cycles act as fingerprints.',
      icon: Cpu,
      iconColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      description:
        'Every human has subconscious typing mannerisms. Our NLP engine extracts 3–5 character n-grams, punctuation quirks (like triple commas ",,," or detached question marks " ?"), and circadian posting curves to infer physical longitude.',
      keyTakeaways: [
        'TF-IDF Character N-Gram analysis yields over 90% cosine attribution similarity',
        'Habitual keyboard artifacts expose regional keyboards (e.g., Cyrillic spacing rules)',
        '24-hour diurnal posting graphs reveal an operator\'s 5-hour sleep trough to pinpoint timezones'
      ],
      badge: 'BEHAVIORAL BIOMETRICS'
    },
    {
      step: 'STEP 3 / 4',
      title: 'Blockchain UTXO & Cryptographic Proofs',
      subtitle: 'Mathematical certainty through Satoshi common-input clustering and PGP keys.',
      icon: GitMerge,
      iconColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      description:
        'When an actor combines funds from two forum wallets into one transaction, Bitcoin Satoshi common-input rules prove joint private key ownership. Furthermore, PGP subkeys cross-signed by the same master key provide 100% mathematical linkage.',
      keyTakeaways: [
        'Common-Input Ownership Proof: Joint inputs in a single BTC tx establish co-possession',
        'OpenPGP Subkey Cross-Certification: Shared master RSA-4096 signature binding',
        'Deterministic links remove reasonable doubt and withstand cross-examination'
      ],
      badge: 'FORENSIC CERTAINTY'
    },
    {
      step: 'STEP 4 / 4',
      title: 'Court Admissibility & Section 63 BSA',
      subtitle: 'Transforming raw cyber intelligence into legally enforceable digital evidence.',
      icon: Scale,
      iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      description:
        'In courts of law, raw intelligence is useless unless it meets statutory admissibility rules. The Traceability Evaluation Framework (TEF) computes Analytic Hierarchy Process (AHP) scores and outputs Section 63 BSA / 65B IEA certificates.',
      keyTakeaways: [
        'AHP Weighted Score: 38.5% Applicability + 20.4% Technical Ease + 41.2% Legal Admissibility',
        'Requires >= 2 corroborating vectors for Section 63 BSA court compliance',
        'Produces one-click OASIS STIX 2.1 bundles and signed tamper-evident certificates'
      ],
      badge: 'LEGAL ADMISSIBILITY'
    }
  ];

  const slide = slides[currentSlide];
  const IconComponent = slide.icon;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onClose();
      onStartSimulation();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
              {slide.step}
            </span>
            <span className="text-xs font-mono font-semibold text-slate-400">
              GUIDED FORENSIC WALKTHROUGH
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 flex-1">
          {/* Slide Header */}
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${slide.iconColor}`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {slide.badge}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-100">{slide.title}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{slide.subtitle}</p>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs leading-relaxed text-slate-300">
            {slide.description}
          </div>

          {/* Key Takeaways */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Key Forensic Principles:
            </span>
            <div className="space-y-2">
              {slide.keyTakeaways.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-850/60 border border-slate-800 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer & Navigation */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentSlide ? 'w-6 bg-sky-500' : 'bg-slate-700 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {currentSlide > 0 && (
              <button
                onClick={handlePrev}
                className="px-3 py-1.5 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 text-xs font-mono flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-mono font-semibold flex items-center gap-1.5 shadow-lg shadow-sky-600/20 transition-all"
            >
              {currentSlide < slides.length - 1 ? (
                <>
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-sky-200" />
                  <span>Launch Live Scan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
