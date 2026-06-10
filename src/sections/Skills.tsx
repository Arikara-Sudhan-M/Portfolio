import React from 'react';
import { SkillGalaxy } from '../components/SkillGalaxy';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#03030b]">
      {/* Decorative background grid and glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,#090924_0%,transparent_100%)] opacity-30" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs tracking-[0.25em] text-primary uppercase font-bold">Stack</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl mt-2 text-white">Skills Galaxy</h2>
          <p className="font-sans text-xs text-gray-400 mt-3 max-w-lg mx-auto">
            An interactive 3D constellation mapping technologies, software suites, database structures, analytics tooling, and AI orchestration.
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-primary to-secondary mx-auto mt-4" />
        </div>

        {/* Legend Icons Container */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-xs font-mono">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-gray-300">Frontend Development</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <span className="text-gray-300">Backend Systems</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <div className="w-3 h-3 rounded-full bg-[#EC4899]" />
            <span className="text-gray-300">UI/UX Design</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <div className="w-3 h-3 rounded-full bg-[#06B6D4]" />
            <span className="text-gray-300">Data Analytics</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="text-gray-300">Dev Tools</span>
          </div>
        </div>

        {/* Interactive 3D Orbit / Cosmos component */}
        <div className="relative rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md overflow-hidden">
          <SkillGalaxy />
        </div>
      </div>
    </section>
  );
};
