import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Layers,
  Cpu,
  Sliders,
  FileCode,
  Radio,
  Compass,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Settings,
  Activity,
  AlertTriangle,
  Terminal,
  Maximize2,
  Minimize2,
  SlidersHorizontal,
  Zap
} from 'lucide-react';
import { SCENARIOS } from './data/scenarios';

export default function App() {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const scenario = SCENARIOS[selectedScenarioIndex];
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1500); // ms per step
  const [selectedNode, setSelectedNode] = useState(null);
  const [weights, setWeights] = useState({ ...scenario.initialWeights });
  const [activeTab, setActiveTab] = useState('inspector'); // 'inspector' | 'prompts' | 'playground'
  const [customEvents, setCustomEvents] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isAnomalous, setIsAnomalous] = useState(false);

  const currentFrame = scenario.frames[currentFrameIndex] || scenario.frames[0];
  const playIntervalRef = useRef(null);

  // Update weights when scenario changes
  useEffect(() => {
    setWeights({ ...scenario.initialWeights });
    setCurrentFrameIndex(0);
    setSelectedNode(null);
    setIsAnomalous(false);
    setCustomEvents([]);
  }, [selectedScenarioIndex]);

  // Playback engine
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setCurrentFrameIndex((prev) => {
          if (prev < scenario.frames.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playbackSpeed);
    } else {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    }
    return () => clearInterval(playIntervalRef.current);
  }, [isPlaying, playbackSpeed, scenario]);

  // Handle Node selection
  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  // Trigger Event Injection Simulation
  const handleInjectAnomaly = (anomalyType) => {
    setIsAnomalous(true);
    // Custom logic to simulate dynamic re-planning based on chosen event
    let alertMessage = "";
    if (anomalyType === "network_timeout") {
      alertMessage = "🔴 Injected Network Outage Event. High level agent will suspend active subgoals.";
    } else if (anomalyType === "resource_exhaustion") {
      alertMessage = "⚠️ Resource constraints active. Action execution parameters restricted.";
    }

    const newEvent = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      type: 'warning',
      text: alertMessage
    };
    setCustomEvents(prev => [newEvent, ...prev]);

    // Force step forward to visualize adaptive state transition
    if (currentFrameIndex < scenario.frames.length - 1) {
      setCurrentFrameIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentFrameIndex(0);
    setIsPlaying(false);
    setIsAnomalous(false);
    setCustomEvents([]);
    setSelectedNode(null);
  };

  const handleWeightChange = (key, value) => {
    setWeights(prev => ({
      ...prev,
      [key]: parseFloat(value)
    }));
  };

  return (
    <div class="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* HEADER BAR */}
      <header class="flex items-center justify-between px-6 py-3 bg-slate-900 border-b border-slate-800 shrink-0 z-20">
        <div class="flex items-center space-x-3">
          <div class="relative flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-glow-cyan">
            <Cpu class="w-5 h-5" />
            <span class="absolute -top-1 -right-1 flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <h1 class="text-lg font-semibold tracking-wide bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">HRM-Lens</h1>
              <span class="px-2 py-0.5 text-[10px] font-mono uppercase font-bold tracking-wider rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60">v1.2 Active</span>
            </div>
            <p class="text-xs text-slate-400">Interactive Visualizer & Playground for Hierarchical Reasoning Models</p>
          </div>
        </div>

        {/* SCENARIO SELECTOR */}
        <div class="flex items-center space-x-4">
          <span class="text-xs text-slate-400 font-medium font-mono hidden md:inline">Reasoning Task:</span>
          <select
            value={selectedScenarioIndex}
            onChange={(e) => setSelectedScenarioIndex(parseInt(e.target.value))}
            class="bg-slate-950 text-slate-100 border border-slate-800 hover:border-slate-700 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition cursor-pointer font-medium max-w-xs"
          >
            {SCENARIOS.map((sc, index) => (
              <option key={sc.id} value={index}>
                {sc.name}
              </option>
            ))} 
          </select>

          <div class="h-6 w-px bg-slate-800"></div>

          {/* EXTERNAL LINK MOCK */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); alert("HRM-Lens package documentation, research papers, and codebase connections are built-in.") }}
            class="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition py-1 px-2.5 rounded bg-slate-850 border border-slate-800/80"
          >
            <HelpCircle class="w-3.5 h-3.5" />
            <span class="hidden sm:inline">Documentation</span>
          </a>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div class="flex flex-1 overflow-hidden w-full">
        
        {/* LEFT COLUMN: CONTROL & PLAYGROUND DECK */}
        <aside class="w-80 border-r border-slate-900 bg-slate-900/40 shrink-0 flex flex-col justify-between overflow-y-auto">
          <div class="p-4 space-y-5">
            {/* Scenario Description Card */}
            <div class="bg-slate-900/80 border border-slate-800/60 rounded-xl p-4">
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center mb-2">
                <Compass class="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                Scenario Bounds
              </h3>
              <p class="text-xs text-slate-300 leading-relaxed font-sans">
                {scenario.description}
              </p>
            </div>

            {/* Dynamic Weights playground sliders */}
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                  <Sliders class="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                  Cognitive Layers Weights
                </h3>
                <span class="text-[10px] text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-900/60 font-mono">Realtime</span>
              </div>

              <div class="space-y-3 bg-slate-900/60 p-3 rounded-lg border border-slate-850">
                {/* Slider 1 */}
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-slate-400">Goal Persistence (W_g)</span>
                    <span class="font-mono text-cyan-400 font-bold">{weights.goalPersistence.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={weights.goalPersistence}
                    onChange={(e) => handleWeightChange('goalPersistence', e.target.value)}
                    class="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <p class="text-[9px] text-slate-500 mt-0.5">Determines commitment value before hierarchical pruning triggers.</p>
                </div>

                {/* Slider 2 */}
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-slate-400">Subgoal Flexibility (W_s)</span>
                    <span class="font-mono text-cyan-400 font-bold">{weights.subgoalFlexibility.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={weights.subgoalFlexibility}
                    onChange={(e) => handleWeightChange('subgoalFlexibility', e.target.value)}
                    class="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <p class="text-[9px] text-slate-500 mt-0.5">Allows active sub-routines to re-plan autonomously without Master feedback.</p>
                </div>

                {/* Slider 3 */}
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-slate-400">Action Rate Limit (W_a)</span>
                    <span class="font-mono text-cyan-400 font-bold">{weights.actionRateLimit.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={weights.actionRateLimit}
                    onChange={(e) => handleWeightChange('actionRateLimit', e.target.value)}
                    class="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <p class="text-[9px] text-slate-500 mt-0.5">Max low-level execution concurrency before context window saturation.</p>
                </div>
              </div>
            </div>

            {/* Event Injection Panel (Unique HRM feature) */}
            <div class="space-y-3">
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                <Zap class="w-3.5 h-3.5 mr-1.5 text-amber-500 animate-pulse" />
                Inject Environment Feedback
              </h3>
              <p class="text-xs text-slate-400">Force external events into the environment. HRM-Lens demonstrates how hierarchical loops adapt instantly, avoiding total agent restart.</p>
              
              <div class="grid grid-cols-1 gap-2">
                <button
                  onClick={() => handleInjectAnomaly("network_timeout")}
                  class="flex items-center justify-between text-left text-xs bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-800/80 hover:border-amber-500/50 p-2.5 rounded-lg transition duration-200 group"
                >
                  <span class="flex items-center space-x-2">
                    <AlertTriangle class="w-3.5 h-3.5 text-amber-500" />
                    <span>Force Network Timeout</span>
                  </span>
                  <ChevronRight class="w-3 h-3 text-slate-500 group-hover:text-amber-500 transition-transform group-hover:translate-x-0.5" />
                </button>

                <button
                  onClick={() => handleInjectAnomaly("resource_exhaustion")}
                  class="flex items-center justify-between text-left text-xs bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-800/80 hover:border-rose-500/50 p-2.5 rounded-lg transition duration-200 group"
                >
                  <span class="flex items-center space-x-2">
                    <XCircle class="w-3.5 h-3.5 text-rose-500" />
                    <span>Simulate Resource Limit</span>
                  </span>
                  <ChevronRight class="w-3 h-3 text-slate-500 group-hover:text-rose-500 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Live Feed / Events */}
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider">Sim Event Log</h4>
                <span class="text-[10px] font-mono text-slate-500">{customEvents.length} Injected</span>
              </div>
              <div class="bg-slate-950/80 border border-slate-900 rounded-lg p-2.5 max-h-36 overflow-y-auto text-[11px] font-mono space-y-1.5">
                {customEvents.length === 0 ? (
                  <p class="text-slate-600 text-center py-2 italic">No external events injected yet. Click an injector card above.</p>
                ) : (
                  customEvents.map((ev) => (
                    <div key={ev.id} class="border-l border-amber-500/40 pl-2 py-0.5 text-slate-300">
                      <span class="text-slate-500 mr-1">[{ev.timestamp}]</span> {ev.text}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Bottom attribution/status */} 
          <div class="p-4 border-t border-slate-900 bg-slate-950/40 text-[11px] text-slate-500 flex justify-between items-center">
            <div class="flex items-center space-x-1">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Active Layer: Actions v2</span>
            </div>
            <span>Repo: HRM</span>
          </div>
        </aside>

        {/* CENTER INTERACTIVE FLOW CANVAS */}
        <main class="flex-1 flex flex-col bg-slate-950 relative border-r border-slate-900 overflow-hidden">
          
          {/* CANVAS CONTROLS HEADER */}
          <div class="flex flex-wrap items-center justify-between p-4 bg-slate-900/60 border-b border-slate-900/80 z-10 shrink-0 gap-3">
            
            {/* Playback step-by-step controller */}
            <div class="flex items-center space-x-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setCurrentFrameIndex(prev => Math.max(0, prev - 1))}
                disabled={currentFrameIndex === 0}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-850 rounded disabled:opacity-35 transition"
                title="Step Backward"
              >
                <ChevronLeft class="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-1.5 rounded px-3 flex items-center space-x-1.5 text-xs font-medium transition ${
                  isPlaying ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause class="w-3.5 h-3.5 fill-current" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play class="w-3.5 h-3.5 fill-current" />
                    <span>Auto Play</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setCurrentFrameIndex(prev => Math.min(scenario.frames.length - 1, prev + 1))}
                disabled={currentFrameIndex === scenario.frames.length - 1}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-850 rounded disabled:opacity-35 transition"
                title="Step Forward"
              >
                <ChevronRight class="w-4 h-4" />
              </button>

              <div class="w-px h-5 bg-slate-800"></div>

              <button
                onClick={handleReset}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-850 rounded transition"
                title="Reset Scenario"
              >
                <RotateCcw class="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Playback speed slider */}
            <div class="flex items-center space-x-2 text-xs text-slate-400 bg-slate-950 py-1.5 px-3 rounded-lg border border-slate-800">
              <Clock class="w-3.5 h-3.5 text-slate-500" />
              <span class="hidden sm:inline">Interval:</span>
              <input
                type="range"
                min="500"
                max="4000"
                step="250"
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseInt(e.target.value))}
                class="w-20 accent-cyan-500 h-1 cursor-pointer bg-slate-800 rounded"
              />
              <span class="font-mono font-medium text-slate-300">{(playbackSpeed / 1000).toFixed(1)}s</span>
            </div>

            {/* Frame indicator & Metrics summary badge */}
            <div class="flex items-center space-x-2.5">
              <div class="text-xs bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-850 flex items-center space-x-2 font-mono">
                <span class="text-slate-500">Frame:</span>
                <span class="text-cyan-400 font-bold">{currentFrameIndex + 1}/{scenario.frames.length}</span>
              </div>

              <div class="text-xs bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-850 flex items-center space-x-2 font-mono">
                <span class="text-slate-500">Sim Clock:</span>
                <span class="text-indigo-400 font-semibold">{currentFrame.timestamp}</span>
              </div>
            </div>

          </div>

          {/* REALTIME SYSTEM ANOMALY BANNER */}
          {isAnomalous && (
            <div class="bg-amber-950/50 border-y border-amber-900/60 px-4 py-2 flex items-center justify-between text-xs z-10 transition duration-300">
              <div class="flex items-center space-x-2">
                <span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                <span class="text-amber-200 font-mono"><strong>SIMULATED ANOMALY INJECTED</strong>: Re-planning dynamic tree nodes instantly.</span>
              </div>
              <button 
                onClick={() => setIsAnomalous(false)} 
                class="text-amber-400 hover:text-amber-200 underline font-mono text-[10px]"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* CANVAS GRAPH BODY */}
          <div class="flex-1 relative overflow-auto p-6 md:p-12 flex flex-col items-center justify-center min-h-[500px] select-none">
            
            {/* Grid Overlay Backing */}
            <div 
              class="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #06b6d4 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Dynamic Status ticker overlay */}
            <div class="absolute top-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-800/80 px-3 py-1.5 rounded-lg max-w-md z-10">
              <div class="flex items-start space-x-2">
                <Activity class="w-3.5 h-3.5 text-cyan-400 mt-0.5 animate-pulse" />
                <div>
                  <p class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Cognitive State</p>
                  <p class="text-xs text-slate-200 leading-snug mt-0.5 font-mono">{currentFrame.statusText}</p>
                </div>
              </div>
            </div>

            {/* Map Hierarchy Legend */}
            <div class="absolute bottom-4 left-4 bg-slate-900/50 backdrop-blur-sm border border-slate-850 px-3 py-2 rounded-lg text-[10px] space-y-1.5 z-10 hidden sm:block">
              <p class="font-semibold text-slate-400 uppercase tracking-widest text-[9px]">Node Layers Code</p>
              <div class="flex items-center space-x-2">
                <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span class="text-slate-300">High-Level Goal Intent (W_g)</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="w-2 h-2 rounded-full bg-cyan-500"></span>
                <span class="text-slate-300">Medium-Level Subgoal Decompositions (W_s)</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span class="text-slate-300">Low-Level Executable Action Vectors (W_a)</span>
              </div>
            </div>

            {/* Zoom Widget */}
            <div class="absolute bottom-4 right-4 bg-slate-900 border border-slate-800 rounded-lg p-1 flex items-center space-x-1 z-10">
              <button 
                onClick={() => setZoomLevel(prev => Math.max(0.7, prev - 0.1))} 
                class="p-1 text-slate-400 hover:text-white rounded bg-slate-950 border border-slate-850 text-xs font-bold w-6 h-6 flex items-center justify-center"
              >
                -
              </button>
              <span class="text-[10px] font-mono font-medium px-2 text-slate-400">{Math.round(zoomLevel * 100)}%</span>
              <button 
                onClick={() => setZoomLevel(prev => Math.min(1.3, prev + 0.1))} 
                class="p-1 text-slate-400 hover:text-white rounded bg-slate-950 border border-slate-850 text-xs font-bold w-6 h-6 flex items-center justify-center"
              >
                +
              </button>
            </div>

            {/* Dynamic Hierarchical Tree SVG Render */}
            <div 
              className="w-full max-w-4xl transition-all duration-300 ease-out flex flex-col items-center relative"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              
              {/* Row 1: High-Level Goal */}
              <div class="w-full flex justify-center mb-16 relative z-10">
                {currentFrame.nodes.filter(n => n.type === 'goal').map(node => {
                  const isNodeSelected = selectedNode?.id === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => handleNodeClick(node)}
                      className={`relative group cursor-pointer max-w-xs w-full p-4 rounded-xl border transition-all duration-300 ${
                        isNodeSelected 
                          ? 'bg-slate-900 border-indigo-500 shadow-glow-cyan scale-105'
                          : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:scale-102'
                      }`}
                    >
                      {/* Connection point bottom */}
                      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0.5 h-16 bg-indigo-500/30 group-hover:bg-indigo-500/60 transition"></div>
                      
                      <div class="flex items-center justify-between">
                        <span class="text-[9px] font-bold tracking-widest text-indigo-400 uppercase">[W_g] Intent Layer</span>
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          node.state === 'active' ? 'bg-amber-500 animate-pulse' : 
                          node.state === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
                        }`} />
                      </div>
                      <h4 class="text-sm font-bold text-slate-100 mt-2 line-clamp-1">{node.label}</h4>
                      <p class="text-[11px] text-slate-400 mt-1 line-clamp-2">{node.desc}</p>
                      <div class="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>Attention: <strong class="text-white">{node.weight}</strong></span>
                        <span class="underline text-cyan-500 group-hover:text-cyan-400">Inspect node</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Row 2: Subgoals */}
              <div class="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 relative z-10">
                {currentFrame.nodes.filter(n => n.type === 'subgoal').map(node => {
                  const isNodeSelected = selectedNode?.id === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => handleNodeClick(node)}
                      className={`relative group cursor-pointer p-3.5 rounded-xl border transition-all duration-300 ${
                        isNodeSelected 
                          ? 'bg-slate-900 border-cyan-500 shadow-glow-cyan scale-105'
                          : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:scale-102'
                      }`}
                    >
                      {/* Connecting Line upward to parents (virtual aesthetic) */}
                      <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-px h-16 bg-cyan-500/20 group-hover:bg-cyan-500/50 transition"></div>
                      {/* Connecting Line downward */}
                      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0.5 h-16 bg-cyan-500/20 group-hover:bg-cyan-500/40 transition"></div>

                      <div class="flex items-center justify-between">
                        <span class="text-[9px] font-bold tracking-widest text-cyan-400 uppercase">[W_s] Subgoal</span>
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                          node.state === 'active' ? 'bg-amber-950 text-amber-400 border border-amber-800/60' :
                          node.state === 'success' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/60' :
                          node.state === 'failed' ? 'bg-rose-950 text-rose-400 border border-rose-900/60' :
                          'bg-slate-950 text-slate-500 border border-slate-850'
                        }`}>
                          {node.state}
                        </span>
                      </div>
                      <h4 class="text-xs font-bold text-slate-200 mt-2 line-clamp-1">{node.label}</h4>
                      <p class="text-[11px] text-slate-400 mt-1 line-clamp-2">{node.desc}</p>
                      <div class="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>Attn: <strong class="text-slate-200">{node.weight}</strong></span>
                        <span>Inspect</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Row 3: Action Execution Sequences */}
              <div class="w-full flex flex-wrap justify-center gap-4 relative z-10">
                {currentFrame.nodes.filter(n => n.type === 'action').map(node => {
                  const isNodeSelected = selectedNode?.id === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => handleNodeClick(node)}
                      className={`relative group cursor-pointer max-w-[190px] w-full p-3 rounded-lg border transition-all duration-300 ${
                        isNodeSelected 
                          ? 'bg-slate-900 border-emerald-500 shadow-glow-green scale-105'
                          : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:scale-102'
                      }`}
                    >
                      {/* Connecting line to subgoals */}
                      <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-px h-16 bg-emerald-500/20 group-hover:bg-emerald-500/40 transition"></div>

                      <div class="flex items-center justify-between">
                        <span class="text-[8px] font-mono font-bold tracking-wider text-emerald-400 uppercase">[W_a] Exec Action</span>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          node.state === 'active' ? 'bg-amber-500 animate-pulse' :
                          node.state === 'success' ? 'bg-emerald-400' :
                          node.state === 'failed' ? 'bg-rose-500' :
                          'bg-slate-700'
                        }`} />
                      </div>
                      <h4 class="text-[11px] font-bold text-slate-300 mt-1 line-clamp-1">{node.label}</h4>
                      <p class="text-[10px] text-slate-400 line-clamp-2 mt-0.5">{node.desc}</p>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Empty state context if needed */}
            {!currentFrame.nodes || currentFrame.nodes.length === 0 && (
              <div class="text-slate-500 text-center">
                <AlertTriangle class="w-8 h-8 mx-auto mb-2 text-amber-500/60" />
                <p class="text-sm">No dynamic nodes detected in this frame.</p>
              </div>
            )}
          </div>

          {/* BOTTOM QUICK METRICS STRIP */}
          <div class="bg-slate-900/80 border-t border-slate-850 p-4 shrink-0 grid grid-cols-2 md:grid-cols-4 gap-4 z-10">
            <div class="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
              <p class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Layer 1 (Goal) Prompt Tokens</p>
              <p class="text-lg font-mono font-bold text-slate-100 mt-1">
                {currentFrame.metrics.promptTokens.toLocaleString()} 
                <span class="text-xs text-slate-500 font-normal ml-1">tokens</span>
              </p>
            </div>
            <div class="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
              <p class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Layer 2-3 Output Tokens</p>
              <p class="text-lg font-mono font-bold text-slate-100 mt-1">
                {currentFrame.metrics.completionTokens.toLocaleString()} 
                <span class="text-xs text-slate-500 font-normal ml-1">tokens</span>
              </p>
            </div>
            <div class="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
              <p class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Dec Decomp Latency</p>
              <p class="text-lg font-mono font-bold text-cyan-400 mt-1">
                {currentFrame.metrics.latency} <span class="text-xs text-slate-500 font-normal ml-0.5">ms</span>
              </p>
            </div>
            <div class="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
              <p class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Model Alignment Confidence</p>
              <div class="flex items-center space-x-2 mt-1">
                <p class="text-lg font-mono font-bold text-emerald-400">
                  {(currentFrame.metrics.planningConfidence * 100).toFixed(0)}%
                </p>
                <div class="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden max-w-[80px]">
                  <div 
                    class="bg-emerald-500 h-full rounded-full" 
                    style={{ width: `${currentFrame.metrics.planningConfidence * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* RIGHT COLUMN: COGNITIVE INSPECTOR & PROMPT PLAYGROUND */}
        <aside class="w-96 bg-slate-900/60 border-l border-slate-900 shrink-0 flex flex-col overflow-hidden">
          
          {/* Tabs header */}
          <div class="flex border-b border-slate-900 bg-slate-900 p-1.5 shrink-0">
            <button
              onClick={() => setActiveTab('inspector')}
              className={`flex-1 text-center py-2 px-3 text-xs font-semibold rounded-md transition-all flex items-center justify-center space-x-1.5 ${
                activeTab === 'inspector'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers class="w-3.5 h-3.5" />
              <span>Inspector</span>
            </button>
            <button
              onClick={() => setActiveTab('prompts')}
              className={`flex-1 text-center py-2 px-3 text-xs font-semibold rounded-md transition-all flex items-center justify-center space-x-1.5 ${
                activeTab === 'prompts'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode class="w-3.5 h-3.5" />
              <span>Layer Prompts</span>
            </button>
          </div>

          {/* TAB CONTENTS */}
          <div class="flex-1 overflow-y-auto p-4">
            
            {activeTab === 'inspector' && (
              <div class="space-y-5">
                
                {/* Selected node card detail */}
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Node State</h3>
                    <span class="text-[10px] text-slate-500 font-mono">Interactive Drilldown</span>
                  </div>

                  {selectedNode ? (
                    <div class="bg-slate-950 border border-slate-850 rounded-xl p-4 space-y-4">
                      <div class="flex items-start justify-between">
                        <div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wide ${
                            selectedNode.type === 'goal' ? 'bg-indigo-950 text-indigo-400 border border-indigo-900' :
                            selectedNode.type === 'subgoal' ? 'bg-cyan-950 text-cyan-400 border border-cyan-900' :
                            'bg-emerald-950 text-emerald-400 border border-emerald-900'
                          }`}>
                            {selectedNode.type}
                          </span>
                          <h4 class="text-sm font-bold text-white mt-2">{selectedNode.label}</h4>
                        </div>
                        <span class="text-[11px] font-mono bg-slate-900 text-slate-300 px-2 py-1 rounded">
                          ID: {selectedNode.id}
                        </span>
                      </div>

                      <div>
                        <p class="text-xs text-slate-500 font-medium">Description Context</p>
                        <p class="text-xs text-slate-300 bg-slate-900/50 p-2.5 rounded border border-slate-900/60 leading-relaxed mt-1.5">
                          {selectedNode.desc}
                        </p>
                      </div>

                      <div class="grid grid-cols-2 gap-3 pt-2">
                        <div class="bg-slate-900/60 p-2 rounded-lg border border-slate-850">
                          <p class="text-[9px] text-slate-500 font-bold uppercase">Weight Allocation</p>
                          <p class="text-sm font-mono font-bold text-slate-200 mt-1">{selectedNode.weight}</p>
                        </div>
                        <div class="bg-slate-900/60 p-2 rounded-lg border border-slate-850">
                          <p class="text-[9px] text-slate-500 font-bold uppercase">Resolution Status</p>
                          <p class="text-sm font-mono font-bold text-cyan-400 mt-1 uppercase">{selectedNode.state}</p>
                        </div>
                      </div>

                      <div class="pt-2 border-t border-slate-850 space-y-2">
                        <p class="text-[10px] text-slate-500 font-bold uppercase">Activation Vector Log</p>
                        <pre class="text-[10px] font-mono text-indigo-300 bg-slate-900 p-2 rounded overflow-x-auto">
{JSON.stringify({
  layer_id: selectedNode.type === 'goal' ? 0 : selectedNode.type === 'subgoal' ? 1 : 2,
  attention_score: selectedNode.weight * weights.goalPersistence,
  adaptive_prune_threat: (1.0 - selectedNode.weight).toFixed(2),
  active_execution_state: selectedNode.state,
  dependencies_mapped: selectedNode.type === 'action' ? 0 : 1
}, null, 2)}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div class="bg-slate-900/30 border border-dashed border-slate-800 rounded-xl p-8 text-center">
                      <Terminal class="w-8 h-8 text-slate-600 mx-auto mb-2" />
                      <p class="text-xs text-slate-400">No Node Selected.</p>
                      <p class="text-[11px] text-slate-500 mt-1">Click any goal, subgoal, or action node in the visual flow area to inspect hierarchical runtime context.</p>
                    </div>
                  )}
                </div>

                {/* Active Layers Attention Graph */}
                <div class="bg-slate-950 border border-slate-850 rounded-xl p-4">
                  <h4 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Realtime Weight Distribution</h4>
                  <div class="space-y-2 text-xs">
                    <div>
                      <div class="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>High Level Intent Layers</span>
                        <span class="font-mono">{(weights.goalPersistence * 100).toFixed(0)}%</span>
                      </div>
                      <div class="w-full bg-slate-900 h-2 rounded overflow-hidden border border-slate-850">
                        <div class="bg-indigo-500 h-full rounded" style={{ width: `${weights.goalPersistence * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div class="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>Mid Level Decomp Blocks</span>
                        <span class="font-mono">{(weights.subgoalFlexibility * 100).toFixed(0)}%</span>
                      </div>
                      <div class="w-full bg-slate-900 h-2 rounded overflow-hidden border border-slate-850">
                        <div class="bg-cyan-500 h-full rounded" style={{ width: `${weights.subgoalFlexibility * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div class="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>Low Level Action Execs</span>
                        <span class="font-mono">{(weights.actionRateLimit * 100).toFixed(0)}%</span>
                      </div>
                      <div class="w-full bg-slate-900 h-2 rounded overflow-hidden border border-slate-850">
                        <div class="bg-emerald-500 h-full rounded" style={{ width: `${weights.actionRateLimit * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {activeTab === 'prompts' && (
              <div class="space-y-4">
                <div class="bg-slate-950 p-3 rounded-lg border border-slate-850">
                  <div class="flex justify-between items-center mb-1.5">
                    <span class="text-[10px] font-bold text-indigo-400 uppercase font-mono">L1: High-Level Meta Prompt</span>
                    <span class="text-[9px] text-slate-500">Tokens: 1,820</span>
                  </div>
                  <p class="text-[11px] text-slate-300 font-mono bg-slate-900/80 p-2.5 rounded border border-slate-850 leading-relaxed">
                    "You are a master planning agent. Decompose the high-level intent into resilient subgoals. Do not list raw functions yet; establish conceptual milestones first..."
                  </p>
                </div>

                <div class="bg-slate-950 p-3 rounded-lg border border-slate-850">
                  <div class="flex justify-between items-center mb-1.5">
                    <span class="text-[10px] font-bold text-cyan-400 uppercase font-mono">L2: Subgoal Scheduler</span>
                    <span class="text-[9px] text-slate-500">Tokens: 2,400</span>
                  </div>
                  <p class="text-[11px] text-slate-300 font-mono bg-slate-900/80 p-2.5 rounded border border-slate-850 leading-relaxed">
                    "Incorporate state observation vector. If any subgoal reports FAILURE, initiate hierarchical branch pruning immediately using prune weight: {weights.pruningSensitity}..."
                  </p>
                </div>

                <div class="bg-slate-950 p-3 rounded-lg border border-slate-850">
                  <div class="flex justify-between items-center mb-1.5">
                    <span class="text-[10px] font-bold text-emerald-400 uppercase font-mono">L3: Executable Action Loop</span>
                    <span class="text-[9px] text-slate-500">Tokens: 1,210</span>
                  </div>
                  <p class="text-[11px] text-slate-300 font-mono bg-slate-900/80 p-2.5 rounded border border-slate-850 leading-relaxed">
                    "Translate scheduled target subgoal into isolated tool calling outputs. Target execution context is highly rate-limited..."
                  </p>
                </div>
              </div>
            )}

          </div>
          
          {/* Inspector footer statistics */} 
          <div class="p-4 bg-slate-950 border-t border-slate-900 text-xs text-slate-400 space-y-1">
            <div class="flex justify-between">
              <span>Total Frame Latency:</span>
              <span class="font-mono font-medium text-white">{currentFrame.metrics.latency}ms</span>
            </div>
            <div class="flex justify-between">
              <span>Workspace Config:</span>
              <span class="font-mono text-cyan-400">HRM_v2_Release</span>
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}