import React from 'react';
import { Scale, Printer, X, ShieldCheck, Hash, Cpu, Calendar } from 'lucide-react';
import { ThreatActorProfile, TEFCalculationResult } from '../types';

interface Section65BModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ThreatActorProfile;
  tefResult?: TEFCalculationResult;
}

export const Section65BModal: React.FC<Section65BModalProps> = ({
  isOpen,
  onClose,
  profile,
  tefResult
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toISOString();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full p-6 shadow-2xl font-mono text-xs max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-sm font-bold text-slate-100">
                STATUTORY DIGITAL EVIDENCE CERTIFICATE
              </h2>
              <span className="text-[10px] text-slate-400">
                Under Section 63 BSA, 2023 // Section 65B(4) Indian Evidence Act, 1872
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-100 text-base p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Body */}
        <div className="my-4 p-4 bg-slate-950 rounded border border-slate-800 text-[11px] leading-relaxed text-slate-300 space-y-3">
          <div className="border-b border-slate-850 pb-2 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500">CERTIFICATE IDENTIFIER:</span>
              <span className="text-emerald-400 font-bold">{profile.sec65b.ref}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">DATE OF CERTIFICATION:</span>
              <span className="text-slate-200">{currentDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">INVESTIGATIVE MATTER:</span>
              <span className="text-slate-200 font-semibold">Darknet Threat Actor De-Anonymization</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">TARGET SYNDICATE:</span>
              <span className="text-rose-400 font-bold">{profile.name}</span>
            </div>
          </div>

          <p className="text-slate-400 text-[10px]">
            1. I hereby certify that the electronic records produced by the NTRO De-Anonymization System—comprising topological entity graphs, OpenPGP cryptographic signature certifications, Bitcoin Satoshi common-input UTXO clustering trees, and character n-gram stylometric probability matrices—were produced by computer systems under continuous lawful operational custody.
          </p>

          <p className="text-slate-400 text-[10px]">
            2. Throughout the material period of observation, the electronic forensics ingestion nodes and distributed crawler nodes were operating in accordance with Section 63 of the Bharatiya Sakshya Adhiniyam, 2023 (formerly Section 65B of the Indian Evidence Act, 1872). No unauthorized human manipulation or algorithmic distortion occurred to compromise the mathematical integrity of hashes or evidentiary probability scores.
          </p>

          {/* Cryptographic Verification Box */}
          <div className="bg-slate-900 p-3 rounded border border-slate-850 space-y-2 text-[10px]">
            <div>
              <span className="text-slate-500 block">EVIDENCE SHA-256 MASTER DIGEST:</span>
              <span className="text-emerald-400 font-bold font-mono break-all block">
                {profile.sec65b.hash}
              </span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-800">
              <span className="text-slate-500">FORENSIC HARDWARE RIG UUID:</span>
              <span className="text-sky-400 font-bold">{profile.sec65b.hardwareUuid}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">TRACEABILITY SCORE (TEF):</span>
              <span className="text-amber-400 font-bold">
                {tefResult ? `${tefResult.totalScore}%` : 'COMPUTED LIVE'}
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-[10px] border-t border-slate-850">
            <div>
              <span className="text-slate-500 block">CERTIFYING CUSTODIAN:</span>
              <span className="text-slate-200 font-bold">{profile.sec65b.custodian}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block">SECURITY CLASSIFICATION:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1 justify-end">
                <ShieldCheck className="w-3.5 h-3.5" />
                VERIFIED TAMPER-EVIDENT
              </span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={handlePrint}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save Certificate</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-mono transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
