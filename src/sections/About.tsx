import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Compass, GraduationCap, Award, Cpu } from 'lucide-react';

// Sub-component for custom 3D tilt card
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse position to degree rotation ranges
  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    
    // Normalize coordinates (-0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
    
    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`glassmorphism rounded-2xl p-6 relative cursor-pointer group hover:glassmorphism-glow transition-all duration-300 ${className}`}
    >
      <div style={{ transform: 'translateZ(30px)' }} className="h-full flex flex-col gap-4 relative z-10">
        {children}
      </div>
      {/* Soft internal card hover shine glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#04040e]/50">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.25em] text-primary uppercase font-bold">Discover</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl mt-2 text-white">About Me</h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-primary to-secondary mx-auto mt-4" />
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Large Description Card */}
          <div className="lg:col-span-7">
            <TiltCard className="h-full flex flex-col justify-center border-l-4 border-l-primary">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Compass className="w-5 h-5 text-primary text-glow-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-white">My Mission & Background</h3>
              </div>
              <p className="font-sans text-sm md:text-base text-gray-300 leading-relaxed mt-4">
                Recent Computer Science Engineering graduate passionate about Frontend Development, UI/UX Design, and building meaningful digital experiences. Skilled in React, JavaScript, SQL, PHP, Power BI, and Figma. Dedicated to creating user-centric solutions that solve real-world problems.
              </p>
              <p className="font-sans text-sm text-gray-400 leading-relaxed mt-3">
                My workflow is built on bringing clean frontend architecture, pixel-perfect layout execution, and high-converting modern aesthetic values together. As a Prompt Engineer, I also leverage LLMs to optimize codebase generation workflows and build intelligent digital systems.
              </p>
            </TiltCard>
          </div>

          {/* Right Cards Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            
            {/* Card 1 */}
            <TiltCard className="border-l-4 border-l-secondary">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/20">
                  <GraduationCap className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">Academic Journey</h4>
                  <p className="font-sans text-xs text-gray-400 mt-1">B.E. Computer Science Graduate (2022 - 2026)</p>
                </div>
              </div>
            </TiltCard>

            {/* Card 2 */}
            <TiltCard className="border-l-4 border-l-accent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20">
                  <Cpu className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">Prompt Engineering</h4>
                  <p className="font-sans text-xs text-gray-400 mt-1">AWS Foundation Prompting Certified Expert</p>
                </div>
              </div>
            </TiltCard>

            {/* Card 3 */}
            <TiltCard className="border-l-4 border-l-emerald-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Award className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">Heuristics UI/UX</h4>
                  <p className="font-sans text-xs text-gray-400 mt-1">Accenture UX & Digital design validations</p>
                </div>
              </div>
            </TiltCard>

          </div>
        </div>
      </div>

      {/* Floating abstract structural graphic shapes */}
      <div className="absolute top-10 left-5 w-4 h-4 rounded-full border border-primary/20 animate-pulse-slow hidden md:block" />
      <div className="absolute bottom-10 right-12 w-6 h-6 border border-secondary/20 rotate-45 animate-float hidden md:block" />
    </section>
  );
};
