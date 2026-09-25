import React, { useState } from 'react';
import { 
  Code2, 
  GitMerge, 
  Server, 
  Key, 
  ChevronUp, 
  ChevronDown, 
  ExternalLink,
  ShieldCheck,
  Hash,
  Copy,
  Check
} from 'lucide-react';
import { ThreatActorProfile, EdgeEntity } from '../types';

interface EvidenceDrawerProps {
  profile: ThreatActorProfile;
  isOpen: boolean;
  onToggle: () => void;
  activeEdge: EdgeEntity | null;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({
  profile,
  isOpen,
  onToggle,
  activeEdge
}) => {
  const [activeTab, setActiveTab] = useState<'stylo' | 'blockchain' | 'server' | 'pgp'>('stylo');
  const [copiedTx, setCopiedTx] = useState(false);

  // If user clicked an edge with specific vector, automatically switch tab
  React.useEffect(() => {
    if (activeEdge) {
      if (activeEdge.vector === 'Stylometry') setActiveTab('stylo');
      else if (activeEdge.vector === 'Wallets') setActiveTab('blockchain');
      else if (activeEdge.vector === 'Infrastructure') setActiveTab('server');
      else if (activeEdge.vector === 'PGP') setActiveTab('pgp');
    }
  }, [activeEdge]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTx(true);
    setTimeout(() => setCopiedTx(false), 2000);
  };

  const sampleTx = activeEdge?.txHash || '7c89a01f89bc2143de8745129038abce128793410294821a08734291834232bd';

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 bg-slate-900 border-t border-slate-700 shadow-2xl transition-transform duration-300 ${
        isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-36px)]'
      }`}
    >
      {/* Drawer Drag Handle & Toggle Header */}
      <div
        onClick={onToggle}
        className="h-9 px-4 bg-slate-850 hover:bg-slate-800 border-b border-slate-800 cursor-pointer flex items-center justify-between select-none"
      >
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-mono font-bold text-slate-200">
            ZONE 4: FORENSIC EVIDENCE DRILL-DOWN & SIDE-BY-SIDE COMPARATOR
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800">
            {activeTab.toUpperCase()} EVIDENCE
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
            {isOpen ? 'Click to collapse drawer' : 'Click to expand forensic proofs'}
          </span>
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </div>

      {/* Drawer Content Area (Scrollable max height) */}
      <div className="p-4 max-h-80 overflow-y-auto bg-slate-950 space-y-4 font-mono text-xs select-none">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('stylo')}
            className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'stylo'
                ? 'bg-purple-900/40 text-purple-300 border border-purple-500/60 font-semibold'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Stylometric Syntax Diff
          </button>

          <button
            onClick={() => setActiveTab('blockchain')}
            className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'blockchain'
                ? 'bg-amber-900/40 text-amber-300 border border-amber-500/60 font-semibold'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <GitMerge className="w-3.5 h-3.5" />
            Blockchain Co-Spend (UTXO)
          </button>

          <button
            onClick={() => setActiveTab('server')}
            className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'server'
                ? 'bg-slate-800 text-slate-100 border border-slate-600 font-semibold'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            Server & HTTP Headers
          </button>

          <button
            onClick={() => setActiveTab('pgp')}
            className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'pgp'
                ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/60 font-semibold'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            PGP Cryptographic Subkeys
          </button>
        </div>

        {/* TAB 1: Stylometric Diff Content */}
        {activeTab === 'stylo' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sample A */}
              <div className="bg-slate-900 rounded-lg p-3 border border-slate-800">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <span className="text-sky-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-sky-400"></span>
                    {profile.stylometric.sourceHandle}
                  </span>
                  <span className="text-[10px] text-slate-500">Post ID: #41209</span>
                </div>
                <div className="text-slate-300 leading-relaxed text-[11px] bg-slate-950 p-2.5 rounded border border-slate-850">
                  Greetings to all members<span className="bg-amber-500/30 text-amber-300 px-1 rounded font-bold">,,,</span> releasing our private active directory dumper <span className="bg-sky-500/30 text-sky-300 px-1 rounded font-bold"> ?</span> escrow accepted via <span className="bg-emerald-500/30 text-emerald-300 px-1 rounded">bc1q9v8p4...cold</span> only. <span className="bg-purple-500/30 text-purple-300 px-1 rounded">Do not waste time with fake proof</span>, ping me on Jabber <span className="text-rose-400">sh3ll</span> broker.
                </div>
              </div>

              {/* Sample B */}
              <div className="bg-slate-900 rounded-lg p-3 border border-slate-800">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <span className="text-purple-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-purple-400"></span>
                    {profile.stylometric.targetHandle}
                  </span>
                  <span className="text-[10px] text-slate-500">Post ID: #10988</span>
                </div>
                <div className="text-slate-300 leading-relaxed text-[11px] bg-slate-950 p-2.5 rounded border border-slate-850">
                  Hello breach community<span className="bg-amber-500/30 text-amber-300 px-1 rounded font-bold">,,,</span> fresh domain controller dumps available <span className="bg-sky-500/30 text-sky-300 px-1 rounded font-bold"> ?</span> escrow deposit at <span className="bg-emerald-500/30 text-emerald-300 px-1 rounded">bc1q9v8p4...cold</span> ready. <span className="bg-purple-500/30 text-purple-300 px-1 rounded">Do not waste time with fake escrow</span>, ping on session with <span className="text-rose-400">sh3ll</span> access.
                </div>
              </div>
            </div>

            {/* Idiosyncratic Summary Grid */}
            <div className="bg-slate-900/70 rounded border border-slate-800 p-2.5">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1.5">
                SYNTACTIC & IDIOSYNCRATIC MATCH SUMMARY
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
                <div className="p-2 rounded bg-slate-950 border border-slate-850">
                  <span className="text-amber-400 block font-semibold">Triple Comma (,,,)</span>
                  <span className="text-slate-300">Habitual comma repetition (18 matched instances, p &lt; 0.0001)</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-850">
                  <span className="text-sky-400 block font-semibold">Detached Space-Question ( ?)</span>
                  <span className="text-slate-300">Pre-punctuation whitespace artifact (Cyrillic keyboard layout)</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-850">
                  <span className="text-purple-400 block font-semibold">Phrase Collocation</span>
                  <span className="text-slate-300">"Do not waste time with fake..." verbatim semantic n-gram</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-850">
                  <span className="text-rose-400 block font-semibold">Homoglyph Substitution</span>
                  <span className="text-slate-300">Cyrillic Unicode U+0430 ('а') embedded inside ASCII word token 'access'</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Blockchain Co-Spend UTXO Diff Content */}
        {activeTab === 'blockchain' && (
          <div className="space-y-3">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-amber-400 flex items-center gap-1.5 font-bold">
                  <GitMerge className="w-4 h-4" />
                  Satoshi Common-Input Ownership Proof
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                  100% Deterministic Attribution
                </span>
              </div>

              <div className="flex items-center gap-2 bg-slate-950 p-2 rounded border border-slate-850">
                <span className="text-slate-400 text-[10px]">TXID:</span>
                <span className="text-amber-300 text-[10px] font-mono select-all flex-1 break-all">
                  {sampleTx}
                </span>
                <button
                  onClick={() => copyToClipboard(sampleTx)}
                  className="px-2 py-1 bg-slate-850 hover:bg-slate-800 text-slate-300 rounded text-[10px] flex items-center gap-1 shrink-0"
                >
                  {copiedTx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedTx ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <p className="text-[10px] text-slate-400 leading-relaxed">
                Because both GhostBroker's Dread deposit address and VaporZero's Breach payout address were consumed as joint inputs in the exact same Bitcoin transaction, private key co-possession is mathematically established.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[10px] pt-1">
                <div className="bg-slate-950 p-2.5 rounded border border-slate-850">
                  <span className="text-slate-500 block">INPUT ADDRESS 1 (GhostBroker)</span>
                  <span className="text-amber-300 font-bold break-all">1A1zP1e...hydra</span>
                  <span className="text-slate-400 block mt-1">Value: 4.82500000 BTC</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded border border-slate-850">
                  <span className="text-slate-500 block">INPUT ADDRESS 2 (VaporZero)</span>
                  <span className="text-amber-300 font-bold break-all">bc1q9v8p4...cold</span>
                  <span className="text-slate-400 block mt-1">Value: 9.37500000 BTC</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded border border-slate-850 border-emerald-500/40">
                  <span className="text-emerald-400 block font-bold">OUTPUT TO MIXER PEEL</span>
                  <span className="text-emerald-300 font-bold break-all">bc1q7w2x9...peel</span>
                  <span className="text-slate-400 block mt-1">Value: 14.19950000 BTC</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Server Fingerprint & Headers */}
        {activeTab === 'server' && (
          <div className="space-y-3">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-2">
              <div className="text-slate-200 font-bold flex items-center justify-between">
                <span className="text-sky-400 flex items-center gap-1.5">
                  <Server className="w-4 h-4" />
                  JARM TLS & OpenSSH Host Key Collision Proof
                </span>
                <span className="text-[10px] text-sky-300 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                  Infrastructure Linkage
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
                <div className="bg-slate-950 p-2.5 rounded border border-slate-850 space-y-1">
                  <span className="text-slate-400 font-semibold block">JARM TLS Fingerprint (Port 443):</span>
                  <span className="text-emerald-400 font-bold break-all">
                    27d3ed3ed0003ed1dc42d43d43d41d9426f42319f39000a6f8742fb6e46820
                  </span>
                  <span className="text-slate-500 block text-[9px]">
                    Custom compiled OpenSSL library on hardened Nginx proxy.
                  </span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded border border-slate-850 space-y-1">
                  <span className="text-slate-400 font-semibold block">OpenSSH ED25519 Host Key (Port 2222):</span>
                  <span className="text-sky-400 font-bold break-all">
                    SHA256:7mG89q1X+90vKpL1m/48jklA9184019283019283019
                  </span>
                  <span className="text-slate-500 block text-[9px]">
                    Identical private host key deployed across all 3 darknet mirrors.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PGP Cryptographic Subkeys */}
        {activeTab === 'pgp' && (
          <div className="space-y-3">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-2">
              <div className="text-slate-200 font-bold flex items-center justify-between">
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <Key className="w-4 h-4" />
                  OpenPGP Subkey Binding & Cross-Certification Proof
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                  Mathematical Certainty: 100%
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded border border-slate-850 space-y-2 text-[10px]">
                <div className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-slate-500">Master Signing Key ID:</span>
                  <span className="text-emerald-400 font-bold">0x9E7A412F8820B1C0 (RSA-4096)</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-slate-500">GhostBroker Subkey (Dread):</span>
                  <span className="text-slate-300 font-bold">SUBKEY-0x9E7A-SUB1 (4096R) - Binding Sig Valid</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-1">
                  <span className="text-slate-500">VaporZero Subkey (BreachForums):</span>
                  <span className="text-emerald-400 font-bold">SUBKEY-0x9E7A-SUB2 (2048E) - Certified by 0x9E7A412F</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Forensic Admissibility:</span>
                  <span className="text-emerald-300 font-semibold">
                    Unambiguous mathematical link (Same master RSA private exponent signed binding certs)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
