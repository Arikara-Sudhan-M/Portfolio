import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, Cpu, Database, CheckCircle2, User, MapPin, Sparkles, Activity } from 'lucide-react';

export const HeroCanvas: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'diagnostics' | 'profile'>('terminal');
  const [cpuUsage, setCpuUsage] = useState(24);
  const [fps, setFps] = useState(60);
  const [ping, setPing] = useState(12);

  // Gentle fluctuation for mock diagnostics
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(15, Math.min(35, prev + delta));
      });
      setPing((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.max(8, Math.min(18, prev + delta));
      });
      setFps((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.max(58, Math.min(62, prev + delta));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative p-1 md:p-4 font-sans select-none">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-secondary/15 rounded-full blur-[80px] pointer-events-none" />

      {/* Main dashboard console */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-[#0a0a16]/80 backdrop-blur-xl border border-primary/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,212,255,0.05)] relative flex flex-col h-[480px] md:h-[520px]"
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0c0c20]/90 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            {/* Window control dots */}
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 font-mono text-xs text-gray-400">system_workspace.sh</span>
          </div>

          <div className="flex items-center gap-1.5 bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[10px] text-primary uppercase tracking-wider font-bold">Workspace: Active</span>
          </div>
        </div>

        {/* Console Navigation Tabs */}
        <div className="flex border-b border-white/[0.04] bg-[#080816]/60">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-2 px-5 py-3 font-mono text-xs transition-all duration-300 relative ${
              activeTab === 'terminal' ? 'text-primary' : 'text-gray-400 hover:text-white'
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>Terminal Logs</span>
            {activeTab === 'terminal' && (
              <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`flex items-center gap-2 px-5 py-3 font-mono text-xs transition-all duration-300 relative ${
              activeTab === 'diagnostics' ? 'text-secondary' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Diagnostics</span>
            {activeTab === 'diagnostics' && (
              <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-5 py-3 font-mono text-xs transition-all duration-300 relative ${
              activeTab === 'profile' ? 'text-accent' : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Developer Profile</span>
            {activeTab === 'profile' && (
              <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />
            )}
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 p-5 overflow-y-auto font-mono text-xs leading-relaxed text-gray-300 bg-[#04040d]/40">
          <AnimatePresence mode="wait">
            {activeTab === 'terminal' && (
              <motion.div
                key="terminal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div className="text-gray-500">// Sudhan Portfolio Core Init</div>
                <div>
                  <span className="text-purple-400">~/sudhan-core</span> <span className="text-emerald-400">$</span> npm run dev
                </div>
                <div className="text-gray-400">
                  &gt; vite v8.0.12 - Dev server running
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>[OK] Development environment loaded successfully.</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-primary" />
                  <span>[OK] Responsive 2D Dashboard active (CPU optimized).</span>
                </div>
                <div className="text-gray-400 mt-2">
                  System specifications & protocols:
                </div>
                <div className="pl-4 text-gray-400 space-y-1">
                  <p>● Core Framework: React 19 + TypeScript</p>
                  <p>● Compiler & Bundler: Vite 8 + ESBuild</p>
                  <p>● Stylesheets Engine: Tailwind CSS v4</p>
                  <p>● Micro-interactions: Framer Motion v12</p>
                </div>
                <div className="text-purple-400 mt-4">
                  &gt; Active modules: UI/UX Prototyping, Frontend SPA, Prompt Engineering
                </div>
                <div className="flex items-center gap-1 mt-4">
                  <span className="text-primary font-bold">Recruiter_Check:</span>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                    APPROVED
                  </span>
                </div>
                <div className="pt-2 flex items-center gap-1.5">
                  <span className="text-primary">$</span>
                  <span className="text-white">waiting for commands</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="inline-block w-2 h-4 bg-primary"
                  />
                </div>
              </motion.div>
            )}

            {activeTab === 'diagnostics' && (
              <motion.div
                key="diagnostics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-secondary">
                      <Cpu className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-wider font-bold">CPU Load</span>
                    </div>
                    <div className="text-xl font-bold mt-2 text-white">{cpuUsage}%</div>
                    <div className="text-[9px] text-gray-500 mt-1">Extremely Low</div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-primary">
                      <Activity className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-wider font-bold">FPS</span>
                    </div>
                    <div className="text-xl font-bold mt-2 text-white">{fps}</div>
                    <div className="text-[9px] text-gray-500 mt-1">Stable Render</div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-accent">
                      <Database className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-wider font-bold">Latency</span>
                    </div>
                    <div className="text-xl font-bold mt-2 text-white">{ping} ms</div>
                    <div className="text-[9px] text-gray-500 mt-1">Excellent Ping</div>
                  </div>
                </div>

                {/* SVG Performance Chart */}
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-3 text-[10px] uppercase tracking-wider font-bold text-gray-400">
                    <span>Performance Matrix (Live)</span>
                    <span className="text-emerald-400">Diagnostics Stable</span>
                  </div>
                  <div className="h-28 w-full flex items-end">
                    <svg className="w-full h-full text-secondary" viewBox="0 0 400 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 80 Q 40 40 80 60 T 160 30 T 240 70 T 320 20 T 400 50 L 400 100 L 0 100 Z"
                        fill="url(#chartGlow)"
                      />
                      <motion.path
                        d="M 0 80 Q 40 40 80 60 T 160 30 T 240 70 T 320 20 T 400 50"
                        fill="transparent"
                        stroke="#8B5CF6"
                        strokeWidth="2.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                      />
                      {/* Interactive glowing dots along path */}
                      <circle cx="320" cy="20" r="4" fill="#00D4FF" className="animate-ping" />
                      <circle cx="320" cy="20" r="3.5" fill="#00D4FF" />
                    </svg>
                  </div>
                </div>

                <div className="flex items-center gap-2 justify-center text-[10px] text-gray-500">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>3D animations replaced with high-fidelity, high-efficiency vectors.</span>
                </div>
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col md:flex-row items-center gap-6 py-2"
              >
                {/* Photo frame with glowing border */}
                <div className="relative shrink-0 group">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary via-secondary to-accent opacity-65 blur-md group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border border-white/10 bg-[#03030b]">
                    <img
                      src="/sudhan.jpg"
                      alt="Arikara Sudhan"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-105 hover:scale-100"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white tracking-wide">Arikara Sudhan M</h3>
                    <p className="text-xs text-primary font-mono tracking-wider font-semibold uppercase mt-0.5">
                      Frontend Developer & Prompt Engineer
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-400">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                      <span>Thoothukudi, Tamil Nadu, India</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Specialized in: React, Next.js, Figma, AI integrations</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-1">
                    <span className="px-2.5 py-1 text-[10px] rounded-full border border-white/5 bg-white/[0.02] text-gray-300">
                      ✦ HMI / Interactive UI
                    </span>
                    <span className="px-2.5 py-1 text-[10px] rounded-full border border-white/5 bg-white/[0.02] text-gray-300">
                      ✦ 60 FPS Vectors
                    </span>
                    <span className="px-2.5 py-1 text-[10px] rounded-full border border-white/5 bg-white/[0.02] text-gray-300">
                      ✦ Clean Code
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Small Console Footer indicator */}
        <div className="bg-[#050510] border-t border-white/[0.04] px-4 py-2 flex items-center justify-between text-[9px] text-gray-500 font-mono">
          <div className="flex items-center gap-1">
            <span>Client Platform:</span>
            <span className="text-gray-400">React 19 SPA</span>
          </div>
          <div>CPU usage: ~0.02% (Idle)</div>
        </div>
      </motion.div>

      {/* Hologram Card Pill overlays on desktop layout */}
      <div className="hidden lg:flex justify-between w-full max-w-2xl mt-4 px-2">
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          className="px-3 py-1.5 rounded-full border border-primary/20 bg-[#0a0a16]/60 backdrop-blur-md text-[10px] text-gray-300 flex items-center gap-1.5 hover:shadow-[0_0_15px_rgba(0,212,255,0.1)] transition-shadow duration-300"
        >
          <span className="text-xs">🎨</span>
          <span>UI/UX Design</span>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          className="px-3 py-1.5 rounded-full border border-secondary/20 bg-[#0a0a16]/60 backdrop-blur-md text-[10px] text-gray-300 flex items-center gap-1.5 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] transition-shadow duration-300"
        >
          <span className="text-xs">⚛️</span>
          <span>React SPA Client</span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          className="px-3 py-1.5 rounded-full border border-accent/20 bg-[#0a0a16]/60 backdrop-blur-md text-[10px] text-gray-300 flex items-center gap-1.5 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-shadow duration-300"
        >
          <span className="text-xs">🤖</span>
          <span>Prompt Engineering</span>
        </motion.div>
      </div>
    </div>
  );
};
