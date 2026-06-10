import React from 'react';
import { GitBranch, GitCommit, GitPullRequest, Code, Terminal, Clock } from 'lucide-react';

export const GithubStats: React.FC = () => {
  // Generate mock contribution grid squares (14 columns x 7 rows = 98 days)
  const gridCells = Array.from({ length: 112 }, () => {
    // Generate organic looking contribution density (0 = none, 1 = low, 2 = medium, 3 = high)
    let level = 0;
    const rand = Math.random();
    if (rand > 0.85) level = 3;
    else if (rand > 0.6) level = 2;
    else if (rand > 0.3) level = 1;
    return level;
  });

  const getCellColor = (level: number) => {
    switch (level) {
      case 3: return 'bg-primary border-primary/30'; // Electric Blue
      case 2: return 'bg-primary/60 border-primary/20';
      case 1: return 'bg-secondary/40 border-secondary/10'; // Purple
      default: return 'bg-white/[0.02] border-white/5';
    }
  };

  const languages = [
    { name: 'TypeScript / JS', percentage: 58, color: '#00D4FF' },
    { name: 'React (JSX)', percentage: 22, color: '#8B5CF6' },
    { name: 'PHP Scripting', percentage: 10, color: '#EC4899' },
    { name: 'SQL Queries', percentage: 10, color: '#10B981' },
  ];

  const statCards = [
    { label: 'Repositories', value: '24', icon: <GitBranch className="w-4 h-4 text-primary" /> },
    { label: 'Total Commits', value: '1,482', icon: <GitCommit className="w-4 h-4 text-secondary" /> },
    { label: 'Pull Requests', value: '46', icon: <GitPullRequest className="w-4 h-4 text-pink-500" /> },
    { label: 'Active Hours', value: '1,240 hrs', icon: <Clock className="w-4 h-4 text-emerald-400" /> },
  ];

  return (
    <section id="github" className="py-24 relative overflow-hidden bg-[#04040e]/50">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.25em] text-primary uppercase font-bold">Metrics</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl mt-2 text-white">GitHub Analytics</h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-primary to-secondary mx-auto mt-4" />
        </div>

        {/* Dashboard Panels Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Stats Badges & Languages Matrix */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Stat counts row */}
            <div className="grid grid-cols-2 gap-4">
              {statCards.map((stat, i) => (
                <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.01] backdrop-blur-md flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-sans">{stat.label}</div>
                    <div className="text-lg font-bold text-white font-mono mt-0.5">{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Language Breakdown */}
            <div className="p-6 rounded-2xl glassmorphism border border-white/5 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                <Code className="w-4.5 h-4.5 text-primary" />
                <h3 className="font-display font-bold text-sm text-white">Languages Distribution</h3>
              </div>
              
              <div className="flex flex-col gap-4">
                {languages.map((lang, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">{lang.name}</span>
                      <span className="text-gray-400">{lang.percentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full" 
                        style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: Contribution Matrix Grid Panel */}
          <div className="lg:col-span-7 p-6 rounded-2xl glassmorphism border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 mb-6 border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4.5 h-4.5 text-secondary" />
                <h3 className="font-display font-bold text-sm text-white">Coding Activity Timeline</h3>
              </div>
              <span className="font-mono text-[9px] text-gray-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                github.com/Arikara-Sudhan-M
              </span>
            </div>

            {/* Matrix Box */}
            <div className="flex flex-col gap-1">
              <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto py-1">
                {gridCells.map((lvl, index) => (
                  <div 
                    key={index} 
                    className={`w-3.5 h-3.5 rounded-[2px] border transition-all duration-300 hover:scale-110 cursor-pointer ${getCellColor(lvl)}`}
                    title={`Contributions: level ${lvl}`}
                  />
                ))}
              </div>
              
              {/* Grid Legend labels */}
              <div className="flex justify-between items-center text-[9px] font-mono text-gray-500 mt-2 px-1">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <div className="flex items-center gap-1">
                  <span>Less</span>
                  <div className="w-2.5 h-2.5 rounded-[1px] bg-white/[0.02] border border-white/5" />
                  <div className="w-2.5 h-2.5 rounded-[1px] bg-secondary/40 border border-secondary/10" />
                  <div className="w-2.5 h-2.5 rounded-[1px] bg-primary/60 border border-primary/20" />
                  <div className="w-2.5 h-2.5 rounded-[1px] bg-primary border border-primary/30" />
                  <span>More</span>
                </div>
              </div>
            </div>

            {/* Sub text message */}
            <div className="mt-6 border-t border-white/5 pt-4 text-left font-sans text-xs text-gray-400 leading-relaxed">
              🌱 <strong className="text-white">Active Developer Contributions:</strong> Consistently pushing code to production repos, optimizing state engines, configuring docker files, and fine-tuning prompt contexts.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
