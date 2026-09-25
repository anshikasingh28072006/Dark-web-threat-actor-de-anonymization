import React, { useState, useEffect } from 'react';
import { Header, NavTab } from './components/Header';
import { DossierZone } from './components/DossierZone';
import { GraphZone } from './components/GraphZone';
import { TEFZone } from './components/TEFZone';
import { EvidenceDrawer } from './components/EvidenceDrawer';
import { Section65BModal } from './components/Section65BModal';
import { GuidedTourModal } from './components/GuidedTourModal';
import { OverviewView } from './components/OverviewView';
import { StylometryLabView } from './components/StylometryLabView';
import { DiurnalLabView } from './components/DiurnalLabView';
import { LegalLabView } from './components/LegalLabView';
import { THREAT_PROFILES } from './data/threatActors';
import { NodeEntity, EdgeEntity, TEFCalculationResult } from './types';
import { buildSTIX21Bundle, buildForensicCSV, triggerFileDownload } from './services/exportEngine';
import { calculateTEF } from './services/tefEngine';
import { ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Sparkles, Terminal } from 'lucide-react';

export default function App() {
  // Profiles
  const [profileId, setProfileId] = useState<string>('spectre');
  const currentProfile = THREAT_PROFILES[profileId] || THREAT_PROFILES.spectre;
  const allProfiles = Object.values(THREAT_PROFILES);

  // Active View Tab
  const [activeTab, setActiveTab] = useState<NavTab>('overview');

  // Search
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Graph Selection
  const [selectedNode, setSelectedNode] = useState<NodeEntity | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<EdgeEntity | null>(null);

  // Evidence Drawer (Zone 4)
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [drawerEdge, setDrawerEdge] = useState<EdgeEntity | null>(null);

  // Section 63 BSA / 65B Modal
  const [isSection65BOpen, setIsSection65BOpen] = useState<boolean>(false);

  // Guided Tour Modal
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);

  // Live Scan Simulation
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationPhase, setSimulationPhase] = useState<number>(0);
  const [simulationMessage, setSimulationMessage] = useState<string>('');

  // Split Cockpit Panels Collapse state
  const [isLeftCollapsed, setIsLeftCollapsed] = useState<boolean>(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState<boolean>(false);

  // Current TEF Result
  const [currentTefResult, setCurrentTefResult] = useState<TEFCalculationResult>(() =>
    calculateTEF(currentProfile.tef, currentProfile.edges)
  );

  // Profile Change Handler
  const handleSelectProfile = (id: string) => {
    setProfileId(id);
    setSelectedNode(null);
    setSelectedEdge(null);
    setDrawerEdge(null);
  };

  // Node & Edge Selection Handlers
  const handleSelectNode = (node: NodeEntity | null) => {
    setSelectedNode(node);
    if (node) setSelectedEdge(null);
  };

  const handleSelectEdge = (edge: EdgeEntity | null) => {
    setSelectedEdge(edge);
    if (edge) {
      setSelectedNode(null);
      setDrawerEdge(edge);
    }
  };

  const handleOpenDrawerWithEdge = (edge: EdgeEntity) => {
    setDrawerEdge(edge);
    setSelectedEdge(edge);
    setIsDrawerOpen(true);
  };

  // Live Forensic Scan Simulation
  const handleToggleSimulation = () => {
    if (isSimulating) {
      setIsSimulating(false);
      setSimulationPhase(0);
      setSimulationMessage('');
    } else {
      setIsSimulating(true);
      setSimulationPhase(1);
      setSimulationMessage('Harvesting .onion endpoints & encrypted forum leaks...');
    }
  };

  useEffect(() => {
    if (!isSimulating) return;

    const timer1 = setTimeout(() => {
      setSimulationPhase(2);
      setSimulationMessage('Matching Bitcoin UTXO multi-input spends and PGP fingerprints...');
    }, 1800);

    const timer2 = setTimeout(() => {
      setSimulationPhase(3);
      setSimulationMessage('Computing character 3-5 gram stylometry & circadian diurnal distributions...');
    }, 3600);

    const timer3 = setTimeout(() => {
      setSimulationPhase(4);
      setSimulationMessage('Synthesizing Total Evidentiary Fitness (TEF) & certifying Section 63 BSA compliance.');
    }, 5400);

    const timer4 = setTimeout(() => {
      setIsSimulating(false);
      setSimulationPhase(0);
      setSimulationMessage('Scan Completed: High-Confidence Forensic Attribution Established.');
      const resetTimer = setTimeout(() => setSimulationMessage(''), 4500);
      return () => clearTimeout(resetTimer);
    }, 7200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isSimulating]);

  // Functional Exports
  const handleExportSTIX = () => {
    const bundle = buildSTIX21Bundle(
      currentProfile,
      currentProfile.nodes,
      currentProfile.edges,
      currentTefResult
    );
    const jsonStr = JSON.stringify(bundle, null, 2);
    triggerFileDownload(
      jsonStr,
      `STIX21_${currentProfile.id}_${Date.now()}.json`,
      'application/json'
    );
  };

  const handleExportCSV = () => {
    const csvContent = buildForensicCSV(
      currentProfile,
      currentProfile.nodes,
      currentProfile.edges,
      currentTefResult
    );
    triggerFileDownload(
      csvContent,
      `NTRO_Section63_Forensic_${currentProfile.id}_${Date.now()}.csv`,
      'text/csv'
    );
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans antialiased">
      {/* Top Navbar */}
      <Header
        currentProfile={currentProfile}
        allProfiles={allProfiles}
        onSelectProfile={handleSelectProfile}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onExportSTIX={handleExportSTIX}
        onExportCSV={handleExportCSV}
        onOpenSection65B={() => setIsSection65BOpen(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenTour={() => setIsTourOpen(true)}
        isSimulating={isSimulating}
        onToggleSimulation={handleToggleSimulation}
      />

      {/* Live Simulation Banner (if scanning or just finished) */}
      {(isSimulating || simulationMessage) && (
        <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 border-b border-sky-800/60 px-4 py-2 flex items-center justify-between z-20 text-xs font-mono">
          <div className="flex items-center gap-3">
            {isSimulating ? (
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
            <div>
              <span className="font-bold text-sky-300">
                {isSimulating ? `LIVE FORENSIC SCAN [PHASE ${simulationPhase}/4]: ` : 'SCAN RESULT: '}
              </span>
              <span className="text-slate-200">{simulationMessage}</span>
            </div>
          </div>
          {isSimulating && (
            <div className="flex items-center gap-2">
              <div className="w-32 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-sky-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${simulationPhase * 25}%` }}
                />
              </div>
              <span className="text-[10px] text-sky-400">{simulationPhase * 25}%</span>
            </div>
          )}
        </div>
      )}

      {/* Main Content Workspace Depending on Active Tab */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* 1. OVERVIEW & STORY VIEW */}
        {activeTab === 'overview' && (
          <OverviewView
            profile={currentProfile}
            tefResult={currentTefResult}
            onNavigateTab={setActiveTab}
            onSelectProfile={handleSelectProfile}
            allProfiles={allProfiles}
            onOpenSection65B={() => setIsSection65BOpen(true)}
            onExportSTIX={handleExportSTIX}
            onExportCSV={handleExportCSV}
            onOpenTour={() => setIsTourOpen(true)}
            isSimulating={isSimulating}
            onToggleSimulation={handleToggleSimulation}
          />
        )}

        {/* 2. ATTRIBUTION GRAPH TAB */}
        {activeTab === 'graph' && (
          <GraphZone
            profile={currentProfile}
            searchTerm={searchTerm}
            onSelectNode={handleSelectNode}
            onSelectEdge={handleSelectEdge}
            onOpenDrawerWithEdge={handleOpenDrawerWithEdge}
            selectedNode={selectedNode}
            selectedEdge={selectedEdge}
          />
        )}

        {/* 3. STYLOMETRY LAB */}
        {activeTab === 'stylometry' && (
          <StylometryLabView
            profile={currentProfile}
            onOpenDrawerWithEdge={handleOpenDrawerWithEdge}
          />
        )}

        {/* 4. DIURNAL TIMEZONE LAB */}
        {activeTab === 'diurnal' && (
          <DiurnalLabView
            profile={currentProfile}
          />
        )}

        {/* 5. LEGAL & TEF LAB */}
        {activeTab === 'legal' && (
          <LegalLabView
            profile={currentProfile}
            tefResult={currentTefResult}
            onTefChange={setCurrentTefResult}
            onOpenSection65B={() => setIsSection65BOpen(true)}
            onExportSTIX={handleExportSTIX}
            onExportCSV={handleExportCSV}
          />
        )}

        {/* 6. SPLIT COCKPIT (ALL 3 ZONES WITH COLLAPSIBLE SIDEBARS) */}
        {activeTab === 'cockpit' && (
          <div className="flex-1 flex w-full h-full overflow-hidden relative">
            {/* Zone 1: Dossier with Collapse Button */}
            <div className={`relative transition-all duration-200 flex ${isLeftCollapsed ? 'w-10' : 'w-80 md:w-96'} shrink-0 border-r border-slate-800`}>
              {isLeftCollapsed ? (
                <div className="w-full h-full bg-slate-950 flex flex-col items-center py-4 space-y-4">
                  <button
                    onClick={() => setIsLeftCollapsed(false)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700"
                    title="Expand Dossier Zone"
                  >
                    <ChevronRight className="w-4 h-4 text-sky-400" />
                  </button>
                  <span className="[writing-mode:vertical-lr] text-xs font-mono text-slate-500 tracking-wider">
                    ZONE 1 : DOSSIER
                  </span>
                </div>
              ) : (
                <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                  <button
                    onClick={() => setIsLeftCollapsed(true)}
                    className="absolute top-2 right-2 z-20 p-1 rounded bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white"
                    title="Collapse Panel"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <DossierZone profile={currentProfile} />
                </div>
              )}
            </div>

            {/* Zone 2: Cytoscape Graph */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              <GraphZone
                profile={currentProfile}
                searchTerm={searchTerm}
                onSelectNode={handleSelectNode}
                onSelectEdge={handleSelectEdge}
                onOpenDrawerWithEdge={handleOpenDrawerWithEdge}
                selectedNode={selectedNode}
                selectedEdge={selectedEdge}
              />
            </div>

            {/* Zone 3: TEF with Collapse Button */}
            <div className={`relative transition-all duration-200 flex ${isRightCollapsed ? 'w-10' : 'w-80 md:w-96'} shrink-0 border-l border-slate-800`}>
              {isRightCollapsed ? (
                <div className="w-full h-full bg-slate-950 flex flex-col items-center py-4 space-y-4">
                  <button
                    onClick={() => setIsRightCollapsed(false)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700"
                    title="Expand TEF Zone"
                  >
                    <ChevronLeft className="w-4 h-4 text-sky-400" />
                  </button>
                  <span className="[writing-mode:vertical-lr] text-xs font-mono text-slate-500 tracking-wider">
                    ZONE 3 : LEGAL & TEF
                  </span>
                </div>
              ) : (
                <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                  <button
                    onClick={() => setIsRightCollapsed(true)}
                    className="absolute top-2 right-2 z-20 p-1 rounded bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white"
                    title="Collapse Panel"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <TEFZone
                    profile={currentProfile}
                    selectedNode={selectedNode}
                    selectedEdge={selectedEdge}
                    onOpenDrawerWithEdge={handleOpenDrawerWithEdge}
                    onTefChange={setCurrentTefResult}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Zone 4: Collapsible Bottom Evidence Drawer */}
      <EvidenceDrawer
        profile={currentProfile}
        isOpen={isDrawerOpen}
        onToggle={() => setIsDrawerOpen(prev => !prev)}
        activeEdge={drawerEdge}
      />

      {/* Section 63 BSA / 65B(4) IEA Legal Certificate Modal */}
      <Section65BModal
        isOpen={isSection65BOpen}
        onClose={() => setIsSection65BOpen(false)}
        profile={currentProfile}
        tefResult={currentTefResult}
      />

      {/* Interactive Guided Tour & Explanation Modal */}
      <GuidedTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onStartSimulation={handleToggleSimulation}
        onSelectProfile={handleSelectProfile}
      />
    </div>
  );
}
