import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Mail, Briefcase } from 'lucide-react';

const roles = ['Frontend Developer', 'UI/UX Designer', 'Prompt Engineer'];

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Dynamic ambient background gradients */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left copy text info */}
        <div className="lg:col-span-5 text-left flex flex-col gap-6 justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-mono text-sm tracking-[0.2em] uppercase font-bold bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
              Welcome to the future
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-white"
          >
            Hi, I'm <br />
            <span className="bg-gradient-to-r from-primary via-[#00f2fe] to-secondary bg-clip-text text-transparent text-glow-primary">
              Arikara Sudhan
            </span>
          </motion.h1>

          <div className="h-12 flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="font-display text-xl md:text-2xl font-bold tracking-wide text-gray-300 border-r-2 border-primary/80 pr-2 whitespace-nowrap"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-sans text-base md:text-lg text-gray-400 max-w-xl leading-relaxed"
          >
            "Crafting modern digital experiences through design, development, and innovation."
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 mt-4"
          >
            <a
              href="#projects"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full font-sans text-sm font-semibold bg-gradient-to-r from-primary to-secondary hover:brightness-110 shadow-lg shadow-primary/20 transition-all duration-300"
            >
              <Briefcase className="w-4 h-4" />
              View Projects
            </a>
            
            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full font-sans text-sm font-semibold border border-white/10 hover:border-primary/50 hover:bg-white/[0.03] text-gray-200 hover:text-white transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right side Developer Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-7 flex items-center justify-center relative w-full h-[400px] md:h-[500px] lg:h-[650px]"
        >
          {/* Animated illustration container */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full max-w-[480px] aspect-square flex items-center justify-center p-4 drop-shadow-[0_0_35px_rgba(0,212,255,0.15)]"
          >
            <img
              src="/developer_illustration.png"
              alt="Developer Coding Illustration"
              className="w-full h-full object-contain rounded-3xl"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gray-400">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-primary" />
        </motion.div>
      </div>
    </section>
  );
};
