import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Layers, FileSpreadsheet, Smartphone, MessageSquare } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  tech: string[];
  features: string[];
  color: string;
  icon: React.ReactNode;
}

const projectsData: Project[] = [
  {
    title: 'E-Bonafide Certificate Automation',
    category: 'Full Stack App',
    tech: ['Next.js', 'React', 'Database & SQL', 'Tailwind'],
    features: ['Automated certificate workflow', 'Role-based access controls', 'AI-ready verification architecture'],
    color: '#00D4FF',
    icon: <Layers className="w-8 h-8 text-primary" />,
  },
  {
    title: 'Student Course Data Analysis',
    category: 'Data Analytics Dashboard',
    tech: ['Power BI', 'Microsoft Excel', 'Data Modeling'],
    features: ['Student enrollment trends mapping', 'Campus placement statistics', 'Interactive sliceable dashboards'],
    color: '#06B6D4',
    icon: <FileSpreadsheet className="w-8 h-8 text-cyan-400" />,
  },
  {
    title: 'Mobile Banking App UI',
    category: 'UI/UX Interface Design',
    tech: ['Figma Design', 'UI/UX Prototypes', 'Visual Layouts'],
    features: ['Transaction category filtering', 'Interactive card management', 'Fast billing payment system'],
    color: '#8B5CF6',
    icon: <Smartphone className="w-8 h-8 text-secondary" />,
  },
  {
    title: 'Instagram-Inspired Chat App',
    category: 'Frontend Application',
    tech: ['Figma Design', 'UI/UX Prototypes', 'Visual Layouts'],
    features: ['Real-time interactive chat UI', 'Fluid responsive styling layout', 'Engaging micro-interactions'],
    color: '#EC4899',
    icon: <MessageSquare className="w-8 h-8 text-pink-500" />,
  },
];

export const Projects: React.FC = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % projectsData.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#04040e]/50">
      {/* Decorative gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.25em] text-primary uppercase font-bold">Showcase</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl mt-2 text-white">Projects Showcase</h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-primary to-secondary mx-auto mt-4" />
        </div>

        {/* 3D Carousel Slider Area */}
        <div className="relative flex flex-col items-center justify-center min-h-[420px]">
          
          <div className="w-full flex items-center justify-center">
            
            {/* Left controller */}
            <button 
              onClick={handlePrev}
              className="absolute left-0 md:left-4 z-30 p-3 rounded-full border border-white/10 bg-[#03030b]/80 backdrop-blur text-gray-400 hover:text-white hover:border-primary/50 transition-all duration-300 shadow-md hover:neon-border-glow"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Slider cards queue */}
            <div className="w-full max-w-2xl px-8 flex justify-center items-center relative h-[360px]">
              <AnimatePresence mode="wait">
                {projectsData.map((project, idx) => {
                  if (idx !== index) return null;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.85, rotateY: 15, z: -100 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
                      exit={{ opacity: 0, scale: 0.85, rotateY: -15, z: -100 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="absolute w-full"
                    >
                      <div 
                        className="glassmorphism rounded-3xl border p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-stretch shadow-2xl relative overflow-hidden group hover:glassmorphism-glow transition-all duration-300"
                        style={{ borderColor: `${project.color}25` }}
                      >
                        {/* Background light indicator */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] to-transparent pointer-events-none" />

                        {/* Card Icon & Tech Column */}
                        <div className="flex flex-col justify-between items-center md:items-start text-center md:text-left md:border-r border-white/5 md:pr-8 md:w-1/3">
                          <div className="flex flex-col items-center md:items-start gap-4">
                            <div 
                              className="p-4 rounded-2xl border"
                              style={{ 
                                borderColor: `${project.color}33`, 
                                backgroundColor: `${project.color}11`,
                                boxShadow: `0 0 15px ${project.color}15`
                              }}
                            >
                              {project.icon}
                            </div>
                            <div>
                              <span className="font-mono text-[9px] tracking-widest uppercase font-bold text-gray-500">
                                {project.category}
                              </span>
                              <h3 className="font-display font-extrabold text-xl text-white mt-1 group-hover:text-glow-primary transition-all">
                                {project.title}
                              </h3>
                            </div>
                          </div>

                          {/* Action Button */}
                          <button 
                            onClick={() => alert(`Launching documentation for: ${project.title}`)}
                            className="hidden md:block w-full py-2.5 mt-6 rounded-xl font-sans text-xs font-semibold border border-white/10 hover:border-primary/50 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                          >
                            Explore Details
                          </button>
                        </div>

                        {/* Card Tech & Features Column */}
                        <div className="flex flex-col justify-center flex-1 w-full text-left">
                          <h4 className="font-display font-bold text-xs text-primary uppercase tracking-widest mb-3">
                            Key Features
                          </h4>
                          <ul className="flex flex-col gap-2.5">
                            {project.features.map((f, fIdx) => (
                              <li key={fIdx} className="flex items-center gap-3 text-sm text-gray-300 font-sans">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                {f}
                              </li>
                            ))}
                          </ul>

                          {/* Tech badges */}
                          <div className="border-t border-white/5 pt-6 mt-6">
                            <h4 className="font-display font-bold text-xs text-secondary uppercase tracking-widest mb-3">
                              Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {project.tech.map((t, tIdx) => (
                                <span 
                                  key={tIdx} 
                                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] font-sans font-medium text-gray-400 group-hover:text-white transition-colors duration-300"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Right controller */}
            <button 
              onClick={handleNext}
              className="absolute right-0 md:right-4 z-30 p-3 rounded-full border border-white/10 bg-[#03030b]/80 backdrop-blur text-gray-400 hover:text-white hover:border-primary/50 transition-all duration-300 shadow-md hover:neon-border-glow"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2.5 mt-8 z-10">
            {projectsData.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setIndex(dotIdx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  dotIdx === index ? 'bg-primary w-6' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
