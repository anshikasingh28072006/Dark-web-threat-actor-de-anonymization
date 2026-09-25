import React, { useEffect, useRef, useState } from 'react';
import cytoscape, { Core, EventObject } from 'cytoscape';
import { 
  Network, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Filter,
  Key,
  MessageSquare,
  Wallet,
  Server,
  X,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  GitMerge,
  RotateCcw
} from 'lucide-react';
import { ThreatActorProfile, NodeEntity, EdgeEntity, VectorType } from '../types';

interface GraphZoneProps {
  profile: ThreatActorProfile;
  searchTerm: string;
  onSelectNode: (node: NodeEntity | null) => void;
  onSelectEdge: (edge: EdgeEntity | null) => void;
  onOpenDrawerWithEdge?: (edge: EdgeEntity) => void;
  selectedNode?: NodeEntity | null;
  selectedEdge?: EdgeEntity | null;
}

export const GraphZone: React.FC<GraphZoneProps> = ({
  profile,
  searchTerm,
  onSelectNode,
  onSelectEdge,
  onOpenDrawerWithEdge,
  selectedNode,
  selectedEdge
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<Core | null>(null);

  // Filter States
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(70);
  const [activeFilters, setActiveFilters] = useState<Record<VectorType, boolean>>({
    PGP: true,
    Stylometry: true,
    Wallets: true,
    Infrastructure: true
  });
  const [layoutName, setLayoutName] = useState<'cose' | 'concentric' | 'circle' | 'breadthfirst'>('cose');

  // Stats
  const [visibleNodeCount, setVisibleNodeCount] = useState<number>(profile.nodes.length);
  const [visibleEdgeCount, setVisibleEdgeCount] = useState<number>(profile.edges.length);

  // Initialize and update Cytoscape
  useEffect(() => {
    if (!containerRef.current) return;

    // Build elements
    const elements: cytoscape.ElementDefinition[] = [];

    // Nodes
    profile.nodes.forEach(n => {
      let bgColor = '#38bdf8'; // handle (blue)
      let shape: cytoscape.Css.NodeShape = 'ellipse';

      if (n.type === 'actor') {
        bgColor = '#f43f5e'; // red
        shape = 'diamond';
      } else if (n.type === 'wallet') {
        bgColor = '#fbbf24'; // gold
        shape = 'rectangle';
      } else if (n.type === 'pgp') {
        bgColor = '#34d399'; // green
        shape = 'hexagon';
      } else if (n.type === 'infra') {
        bgColor = '#94a3b8'; // gray
        shape = 'round-rectangle';
      }

      elements.push({
        group: 'nodes',
        data: {
          id: n.id,
          label: n.label,
          type: n.type,
          bgColor,
          shape,
          rawNode: n
        }
      });
    });

    // Edges
    profile.edges.forEach(e => {
      const isDashed = e.type === 'probabilistic';
      let edgeColor = '#38bdf8'; // sky
      if (e.vector === 'PGP') edgeColor = '#34d399';
      if (e.vector === 'Wallets') edgeColor = '#fbbf24';
      if (e.vector === 'Stylometry') edgeColor = '#c084fc';
      if (e.vector === 'Infrastructure') edgeColor = '#94a3b8';

      elements.push({
        group: 'edges',
        data: {
          id: e.id,
          source: e.source,
          target: e.target,
          label: e.label,
          type: e.type,
          vector: e.vector,
          confidence: e.confidence,
          edgeColor,
          lineStyle: isDashed ? 'dashed' : 'solid',
          rawEdge: e
        }
      });
    });

    // Destroy existing instance
    if (cyRef.current) {
      cyRef.current.destroy();
    }

    // Initialize Cytoscape
    const cy = cytoscape({
      container: containerRef.current,
      elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'data(bgColor)',
            'shape': (ele: any) => ele.data('shape'),
            'label': 'data(label)',
            'color': '#f8fafc',
            'font-family': 'ui-monospace, monospace',
            'font-size': '10px',
            'text-valign': 'bottom',
            'text-margin-y': 4,
            'text-wrap': 'wrap',
            'text-max-width': '100px',
            'width': (ele: any) => ele.data('type') === 'actor' ? 36 : 24,
            'height': (ele: any) => ele.data('type') === 'actor' ? 36 : 24,
            'border-width': 2,
            'border-color': '#0f172a',
            'text-background-color': '#020617',
            'text-background-opacity': 0.8,
            'text-background-padding': '2px',
            'text-background-shape': 'roundrectangle',
            'transition-property': 'background-color, border-color, opacity, border-width',
            'transition-duration': 0.2
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': 'data(edgeColor)',
            'line-style': (ele: any) => ele.data('lineStyle'),
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'target-arrow-color': 'data(edgeColor)',
            'arrow-scale': 0.9,
            'opacity': 0.75,
            'transition-property': 'opacity, width, line-color',
            'transition-duration': 0.2
          }
        },
        // Highlight states
        {
          selector: 'node.highlighted',
          style: {
            'border-width': 4,
            'border-color': '#38bdf8',
            'underlay-color': '#38bdf8',
            'underlay-padding': 4,
            'underlay-opacity': 0.6,
            'opacity': 1.0,
            'z-index': 999
          }
        },
        {
          selector: 'node.dimmed',
          style: {
            'opacity': 0.15
          }
        },
        {
          selector: 'edge.highlighted',
          style: {
            'width': 4,
            'opacity': 1.0,
            'z-index': 998
          }
        },
        {
          selector: 'edge.dimmed',
          style: {
            'opacity': 0.08
          }
        }
      ],
      layout: {
        name: layoutName,
        animate: false,
        padding: 40,
        nodeDimensionsIncludeLabels: true
      }
    });

    cyRef.current = cy;

    // Node click handler: Highlight direct neighborhood & populate details
    cy.on('tap', 'node', (evt: EventObject) => {
      const node = evt.target;
      const rawNode = node.data('rawNode');
      onSelectNode(rawNode);
      onSelectEdge(null);

      const neighborhood = node.neighborhood().add(node);
      cy.elements().removeClass('highlighted dimmed');
      cy.elements().difference(neighborhood).addClass('dimmed');
      neighborhood.addClass('highlighted');
    });

    // Edge click handler: Select edge & trigger bottom comparison drawer
    cy.on('tap', 'edge', (evt: EventObject) => {
      const edge = evt.target;
      const rawEdge = edge.data('rawEdge');
      onSelectEdge(rawEdge);
      onSelectNode(null);

      cy.elements().removeClass('highlighted dimmed');
      edge.addClass('highlighted');
      edge.connectedNodes().addClass('highlighted');

      if (onOpenDrawerWithEdge) {
        onOpenDrawerWithEdge(rawEdge);
      }
    });

    // Background click handler: Reset view
    cy.on('tap', (evt: EventObject) => {
      if (evt.target === cy) {
        cy.elements().removeClass('highlighted dimmed');
        onSelectNode(null);
        onSelectEdge(null);
      }
    });

    applyFilters();

    return () => {
      cy.destroy();
    };
  }, [profile, layoutName]);

  // Apply filtering rules
  const applyFilters = () => {
    if (!cyRef.current) return;
    const cy = cyRef.current;

    cy.batch(() => {
      cy.edges().forEach(edge => {
        const data = edge.data();
        const vectorMatch = activeFilters[data.vector as VectorType];
        const confidenceMatch = data.confidence >= confidenceThreshold;

        if (vectorMatch && confidenceMatch) {
          edge.show();
        } else {
          edge.hide();
        }
      });

      // Filter or highlight based on search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        cy.nodes().forEach(node => {
          const label = node.data('label').toLowerCase();
          const details = (node.data('rawNode')?.details || '').toLowerCase();
          if (label.includes(term) || details.includes(term)) {
            node.addClass('highlighted').removeClass('dimmed');
          } else {
            node.addClass('dimmed').removeClass('highlighted');
          }
        });
      } else {
        cy.nodes().removeClass('highlighted dimmed');
      }

      // Count visible entities
      const visibleEdges = cy.edges(':visible').length;
      const visibleNodes = cy.nodes(':visible').length;
      setVisibleEdgeCount(visibleEdges);
      setVisibleNodeCount(visibleNodes);
    });
  };

  useEffect(() => {
    applyFilters();
  }, [confidenceThreshold, activeFilters, searchTerm]);

  // Graph Action Controls
  const handleZoomIn = () => {
    if (cyRef.current) cyRef.current.zoom(cyRef.current.zoom() * 1.25);
  };

  const handleZoomOut = () => {
    if (cyRef.current) cyRef.current.zoom(cyRef.current.zoom() * 0.8);
  };

  const handleFit = () => {
    if (cyRef.current) cyRef.current.fit(undefined, 30);
  };

  const toggleFilter = (vec: VectorType) => {
    setActiveFilters(prev => ({ ...prev, [vec]: !prev[vec] }));
  };

  const setPreset = (preset: 'all' | 'wallets' | 'pgp' | 'stylometry' | 'high') => {
    if (preset === 'all') {
      setActiveFilters({ PGP: true, Stylometry: true, Wallets: true, Infrastructure: true });
      setConfidenceThreshold(0);
    } else if (preset === 'wallets') {
      setActiveFilters({ PGP: false, Stylometry: false, Wallets: true, Infrastructure: false });
      setConfidenceThreshold(60);
    } else if (preset === 'pgp') {
      setActiveFilters({ PGP: true, Stylometry: false, Wallets: false, Infrastructure: false });
      setConfidenceThreshold(60);
    } else if (preset === 'stylometry') {
      setActiveFilters({ PGP: false, Stylometry: true, Wallets: false, Infrastructure: false });
      setConfidenceThreshold(60);
    } else if (preset === 'high') {
      setActiveFilters({ PGP: true, Stylometry: true, Wallets: true, Infrastructure: true });
      setConfidenceThreshold(85);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 relative overflow-hidden select-none">
      {/* Zone 2 Top Bar: Graph Controls & Filters */}
      <div className="h-10 bg-slate-900/90 border-b border-slate-800 px-3 flex items-center justify-between z-10 shrink-0 text-xs font-mono">
        {/* Left: Zone Label & Counts */}
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-sky-400" />
          <span className="font-bold text-slate-200">ZONE 2: ATTRIBUTION TOPOLOGY</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
            {visibleNodeCount} Nodes / {visibleEdgeCount} Edges
          </span>
        </div>

        {/* Center: Vector Filters */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-slate-500 mr-1 hidden sm:inline">VECTORS:</span>
          
          <button
            onClick={() => toggleFilter('PGP')}
            className={`px-2 py-0.5 rounded text-[10px] flex items-center gap-1 border transition-all ${
              activeFilters.PGP 
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700' 
                : 'bg-slate-900 text-slate-500 border-slate-800 opacity-60'
            }`}
          >
            <Key className="w-2.5 h-2.5" />
            PGP
          </button>

          <button
            onClick={() => toggleFilter('Stylometry')}
            className={`px-2 py-0.5 rounded text-[10px] flex items-center gap-1 border transition-all ${
              activeFilters.Stylometry 
                ? 'bg-purple-950 text-purple-300 border-purple-700' 
                : 'bg-slate-900 text-slate-500 border-slate-800 opacity-60'
            }`}
          >
            <MessageSquare className="w-2.5 h-2.5" />
            Stylometry
          </button>

          <button
            onClick={() => toggleFilter('Wallets')}
            className={`px-2 py-0.5 rounded text-[10px] flex items-center gap-1 border transition-all ${
              activeFilters.Wallets 
                ? 'bg-amber-950 text-amber-300 border-amber-700' 
                : 'bg-slate-900 text-slate-500 border-slate-800 opacity-60'
            }`}
          >
            <Wallet className="w-2.5 h-2.5" />
            Wallets
          </button>

          <button
            onClick={() => toggleFilter('Infrastructure')}
            className={`px-2 py-0.5 rounded text-[10px] flex items-center gap-1 border transition-all ${
              activeFilters.Infrastructure 
                ? 'bg-slate-800 text-slate-200 border-slate-600' 
                : 'bg-slate-900 text-slate-500 border-slate-800 opacity-60'
            }`}
          >
            <Server className="w-2.5 h-2.5" />
            Infra
          </button>
        </div>

        {/* Right: Confidence Threshold Slider & Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400">Min Confidence:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              className="w-16 sm:w-24 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <span className="text-[10px] font-bold text-sky-400 w-8 text-right">
              {confidenceThreshold}%
            </span>
          </div>

          {/* Layout Selector */}
          <select
            value={layoutName}
            onChange={(e) => setLayoutName(e.target.value as any)}
            className="bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-[10px] text-slate-300 focus:outline-none focus:border-sky-500"
          >
            <option value="cose">Force CoSE</option>
            <option value="concentric">Concentric</option>
            <option value="circle">Circle</option>
            <option value="breadthfirst">Tree</option>
          </select>

          {/* Zoom Buttons */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded">
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              className="p-1 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              className="p-1 text-slate-400 hover:text-slate-100 hover:bg-slate-800 border-l border-slate-800"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleFit}
              title="Fit View"
              className="p-1 text-slate-400 hover:text-slate-100 hover:bg-slate-800 border-l border-slate-800"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* User-Friendly Quick Preset Scenarios Bar */}
      <div className="h-8 bg-slate-950 border-b border-slate-850 px-3 flex items-center justify-between z-10 shrink-0 text-[11px] font-mono">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          <span className="text-slate-500 text-[10px]">PRESETS:</span>
          <button
            onClick={() => setPreset('all')}
            className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
          >
            Show All
          </button>
          <button
            onClick={() => setPreset('wallets')}
            className="px-2 py-0.5 rounded bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-800 flex items-center gap-1"
          >
            <Wallet className="w-3 h-3" />
            Bitcoin UTXO Co-Spends
          </button>
          <button
            onClick={() => setPreset('pgp')}
            className="px-2 py-0.5 rounded bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800 flex items-center gap-1"
          >
            <Key className="w-3 h-3" />
            PGP Subkey Rings
          </button>
          <button
            onClick={() => setPreset('stylometry')}
            className="px-2 py-0.5 rounded bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 border border-purple-800 flex items-center gap-1"
          >
            <MessageSquare className="w-3 h-3" />
            Stylometry Links
          </button>
          <button
            onClick={() => setPreset('high')}
            className="px-2 py-0.5 rounded bg-sky-950/40 hover:bg-sky-900/60 text-sky-300 border border-sky-800 flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            High Confidence (&gt;85%)
          </button>
        </div>

        <button
          onClick={handleFit}
          className="text-[10px] text-slate-400 hover:text-sky-400 flex items-center gap-1 shrink-0"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Center Graph</span>
        </button>
      </div>

      {/* Cytoscape Canvas Container */}
      <div 
        ref={containerRef} 
        className="flex-1 w-full h-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] cursor-grab active:cursor-grabbing relative"
      />

      {/* FLOATING INSPECTOR CARD OVERLAY (WHEN NODE OR EDGE IS SELECTED) */}
      {(selectedNode || selectedEdge) && (
        <div className="absolute top-20 right-4 z-20 w-80 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl p-4 shadow-2xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase bg-sky-950 text-sky-300 border border-sky-800">
                {selectedNode ? selectedNode.type : `${selectedEdge?.vector} LINK`}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {selectedNode ? `${selectedNode.confidence}% Conf.` : `${selectedEdge?.confidence}% Conf.`}
              </span>
            </div>
            <button
              onClick={() => {
                onSelectNode(null);
                onSelectEdge(null);
              }}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {selectedNode && (
            <div className="space-y-2 text-xs">
              <div>
                <h4 className="font-bold text-slate-100 break-all">{selectedNode.label}</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{selectedNode.details}</p>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">First Seen:</span>
                  <span>{selectedNode.firstSeen}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Entity Type:</span>
                  <span className="text-sky-300 uppercase">{selectedNode.type}</span>
                </div>
                {selectedNode.metadata && Object.entries(selectedNode.metadata).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-slate-500">{k}:</span>
                    <span className="truncate max-w-[140px] text-slate-300">{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedEdge && (
            <div className="space-y-2 text-xs">
              <div>
                <h4 className="font-bold text-slate-100">{selectedEdge.label}</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {selectedEdge.details || 'Deterministic cryptographic or behavioral link between identities.'}
                </p>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Source:</span>
                  <span className="text-slate-300">{selectedEdge.source}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target:</span>
                  <span className="text-slate-300">{selectedEdge.target}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Link Type:</span>
                  <span className="text-amber-300 uppercase">{selectedEdge.type}</span>
                </div>
              </div>

              {onOpenDrawerWithEdge && (
                <button
                  onClick={() => onOpenDrawerWithEdge(selectedEdge)}
                  className="w-full py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Inspect Evidence Proof</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Legend Overlay at Bottom-Left */}
      <div className="absolute bottom-12 left-3 z-10 bg-slate-900/90 backdrop-blur-sm border border-slate-800 rounded p-2 text-[9px] font-mono space-y-1 shadow-lg pointer-events-none">
        <div className="text-slate-400 font-bold uppercase tracking-wider mb-1">GRAPH ENTITY CODING</div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
          <span className="text-slate-300">Target Threat Core</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
          <span className="text-slate-300">Forum Handle / Persona</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          <span className="text-slate-300">Crypto Wallet / UTXO</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="text-slate-300">PGP Key Fingerprint</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
          <span className="text-slate-300">Host / Server Infra</span>
        </div>
        <div className="pt-1 border-t border-slate-800 text-slate-400">
          Solid: Deterministic Link | Dashed: Probabilistic Link
        </div>
      </div>
    </div>
  );
};
