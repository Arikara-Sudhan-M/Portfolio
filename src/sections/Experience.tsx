import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Palette, Code, Cpu, Award } from 'lucide-react';

interface Stage {
  title: string;
  role: string;
  desc: string;
  duration: string;
  icon: React.ReactNode;
  color: string;
}

const roadmapStages: Stage[] = [
  {
    title: 'Academics Foundations',
    role: 'Computer Science Student',
    desc: 'Began journey in CSE, gaining core expertise in SQL, algorithms, OOP, and computing logic.',
    duration: '2022 - Ongoing',
    icon: <Flame className="w-5 h-5 text-gray-300" />,
    color: '#9ca3af',
  },
  {
    title: 'Visual Architecture',
    role: 'UI/UX Designer',
    desc: 'Explored wireframing, color theory grids, Figma prototyping, and design systems with Accenture.',
    duration: '2023 - 2024',
    icon: <Palette className="w-5 h-5 text-primary" />,
    color: '#00D4FF',
  },
  {
    title: 'Interactive Interfaces',
    role: 'Frontend Developer',
    desc: 'Built responsive web projects with React, Vite, and custom CSS libraries focusing on page speeds.',
    duration: '2024 - 2025',
    icon: <Code className="w-5 h-5 text-secondary" />,
    color: '#8B5CF6',
  },
  {
    title: 'Cognitive Engineering',
    role: 'Prompt Engineer',
    desc: 'Learned prompt templates orchestration, structure mapping, and AI workflows using AWS tools.',
    duration: '2025 - 2026',
    icon: <Cpu className="w-5 h-5 text-cyan-400" />,
    color: '#06B6D4',
  },
  {
    title: 'Ultimate Horizon',
    role: 'Future Software Engineer',
    desc: 'Aiming to build robust scalable enterprise systems, cloud integrations, and core backend logic.',
    duration: 'Target 2026+',
    icon: <Award className="w-5 h-5 text-yellow-400 animate-pulse" />,
    color: '#FBBF24',
  },
];

export const Experience: React.FC = () => {
  return (
    <section id="roadmap" className="py-24 relative overflow-hidden bg-[#03030b]">
      {/* Soft backgrounds */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 w-full relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <span className="font-mono text-xs tracking-[0.25em] text-primary uppercase font-bold">Evolution</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl mt-2 text-white">Roadmap of Growth</h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-primary to-secondary mx-auto mt-4" />
        </div>

        {/* Pathway Container */}
        <div className="relative">
          
          {/* Main glowing line pathway */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 bg-white/5 -translate-x-1/2 rounded-full overflow-hidden">
            {/* Pulsating neon glow bar travelling along */}
            <div 
              className="w-full h-1/2 bg-gradient-to-b from-primary via-secondary to-accent animate-pulse" 
              style={{
                animation: 'pulse-glow 5s ease-in-out infinite',
              }}
            />
          </div>

          <div className="flex flex-col gap-12">
            {roadmapStages.map((stage, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={index}
                  className={`flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Milestones badge marker */}
                  <div 
                    className="absolute left-6 md:left-1/2 w-10 h-10 rounded-full bg-[#03030b] border-2 flex items-center justify-center -translate-x-1/2 z-20 transition-all duration-300"
                    style={{ 
                      borderColor: stage.color, 
                      boxShadow: `0 0 15px ${stage.color}44`
                    }}
                  >
                    {stage.icon}
                  </div>

                  {/* Left block (Padding placeholder) */}
                  <div className="w-full md:w-1/2 md:px-12" />

                  {/* Right block (Roadmap Detail Card) */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-12">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="p-6 rounded-2xl glassmorphism border border-white/5 relative group hover:border-white/10 transition-all duration-300"
                    >
                      {/* Active glowing timeline indicator top-right */}
                      <span className="absolute top-4 right-4 px-2 py-0.5 rounded font-mono text-[9px] text-gray-500 border border-white/5 bg-[#03030b]">
                        {stage.duration}
                      </span>

                      <span 
                        className="text-[9px] font-mono tracking-widest uppercase font-bold"
                        style={{ color: stage.color }}
                      >
                        Stage {index + 1}: {stage.title}
                      </span>
                      
                      <h3 className="font-display font-extrabold text-lg text-white mt-1 group-hover:text-primary transition-colors">
                        {stage.role}
                      </h3>

                      <p className="font-sans text-xs md:text-sm text-gray-400 leading-relaxed mt-3 pt-3 border-t border-white/5">
                        {stage.desc}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
