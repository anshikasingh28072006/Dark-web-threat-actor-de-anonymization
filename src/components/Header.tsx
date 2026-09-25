import React from 'react';
import { 
  ShieldAlert, 
  Search, 
  Download, 
  FileSpreadsheet, 
  Scale, 
  Terminal,
  Radio,
  LayoutDashboard,
  Network,
  Cpu,
  Clock,
  Columns3,
  HelpCircle,
  Play,
  RotateCcw
} from 'lucide-react';
import { ThreatActorProfile } from '../types';

export type NavTab = 'overview' | 'graph' | 'stylometry' | 'diurnal' | 'legal' | 'cockpit';

interface HeaderProps {
  currentProfile: ThreatActorProfile;
  allProfiles: ThreatActorProfile[];
  onSelectProfile: (id: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onExportSTIX: () => void;
  onExportCSV: () => void;
  onOpenSection65B: () => void;
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenTour: () => void;
  isSimulating: boolean;
  onToggleSimulation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentProfile,
  allProfiles,
  onSelectProfile,
  searchTerm,
  onSearchChange,
  onExportSTIX,
  onExportCSV,
  onOpenSection65B,
  activeTab,
  onTabChange,
  onOpenTour,
  isSimulating,
  onToggleSimulation,
}) => {
  const tabs = [
    { id: 'overview' as NavTab, label: 'Overview & Story', icon: LayoutDashboard },
    { id: 'graph' as NavTab, label: 'Attribution Graph', icon: Network },
    { id: 'stylometry' as NavTab, label: 'Stylometry Lab', icon: Cpu },
    { id: 'diurnal' as NavTab, label: 'Diurnal Timezone', icon: Clock },
    { id: 'legal' as NavTab, label: 'Legal & TEF', icon: Scale },
    { id: 'cockpit' as NavTab, label: 'Split Cockpit', icon: Columns3 },
  ];

  return (
    <header className="bg-slate-950 border-b border-slate-800 z-30 shrink-0 select-none">
      {/* Top Banner Row */}
      <div className="h-14 px-4 flex items-center justify-between gap-3 border-b border-slate-850">
        {/* Brand & Classification Banner */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold tracking-wider text-slate-100 text-sm">
                NTRO // DE-ANON
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 flex items-center gap-1 font-semibold">
                <Radio className="w-2 h-2 text-rose-400 animate-ping" />
                SIH-2024
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden md:block">
              Dark Web Threat Actor De-Anonymization & Forensic Attribution
            </p>
          </div>
        </div>

        {/* Center: Threat Actor Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400 hidden xl:inline-flex items-center gap-1">
            <Terminal className="w-3 h-3 text-sky-400" />
            TARGET:
          </span>
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            {allProfiles.map(p => (
              <button
                key={p.id}
                onClick={() => onSelectProfile(p.id)}
                className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all ${
                  currentProfile.id === p.id
                    ? 'bg-sky-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {p.name.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Right Controls: Quick Actions & Help */}
        <div className="flex items-center gap-2">
          {/* Quick Simulation Trigger */}
          <button
            onClick={onToggleSimulation}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
              isSimulating
                ? 'bg-rose-600 hover:bg-rose-500 text-white'
                : 'bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/40'
            }`}
            title="Simulate live forensic attribution scan"
          >
            {isSimulating ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">Scanning...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Run Live Scan</span>
              </>
            )}
          </button>

          {/* Guided Tour / How It Works Button */}
          <button
            onClick={onOpenTour}
            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors"
            title="How Threat Actor De-Anonymization Works"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">How It Works</span>
          </button>

          {/* Section 63 BSA Legal Certificate */}
          <button
            onClick={onOpenSection65B}
            title="Section 63 BSA / 65B(4) IEA Statutory Certificate"
            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all"
          >
            <Scale className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden lg:inline">Sec 63 BSA</span>
          </button>

          {/* Export STIX 2.1 */}
          <button
            onClick={onExportSTIX}
            title="Generate & Download STIX 2.1 JSON Bundle"
            className="px-2 py-1.5 bg-slate-900 hover:bg-slate-800 text-sky-300 border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-mono flex items-center gap-1 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden xl:inline">STIX</span>
          </button>

          {/* Export CSV */}
          <button
            onClick={onExportCSV}
            title="Export Section 63 BSA Forensic CSV Table"
            className="px-2 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-mono flex items-center gap-1 transition-all"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden xl:inline">CSV</span>
          </button>
        </div>
      </div>

      {/* Secondary Navigation Row: Workspaces / Tabs & Search */}
      <div className="h-10 px-4 flex items-center justify-between bg-slate-950/80">
        {/* Workspace Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-1 rounded-md text-xs font-mono flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-800 text-sky-300 border border-slate-700 font-semibold shadow-inner'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Global Search Bar */}
        <div className="relative hidden md:block">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search nodes, wallets, handles..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-56 pl-8 pr-3 py-1 bg-slate-900 border border-slate-850 rounded-md text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
          />
        </div>
      </div>
    </header>
  );
};
