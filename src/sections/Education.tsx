import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

interface TimelineItem {
  degree: string;
  institution: string;
  year: string;
  description: string;
  location: string;
}

const educationData: TimelineItem[] = [
  {
    degree: 'B.E. Computer Science Engineering',
    institution: 'PSNA College of Engineering and Technology',
    year: '2022 - 2026',
    location: 'Dindigul, Tamil Nadu, India',
    description: 'Specialized in Core Computer Science foundations, database architectures, user-interface systems, and software engineering methodologies.',
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Star Matriculation Higher Secondary School',
    year: '2022',
    location: 'Thoothukudi, Tamil Nadu, India',
    description: 'Completed secondary education with focused studies in Mathematics, Physics, Chemistry, and Computer Science.',
  },
  {
    degree: 'Secondary School Leaving Certificate (SSLC)',
    institution: 'Star Matriculation Higher Secondary School',
    year: '2020',
    location: 'Thoothukudi, Tamil Nadu, India',
    description: 'Secured academic foundations across Mathematics, Science, and Social studies.',
  },
];

export const Education: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll height relative to this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  // Smooth out drawing animation line
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="timeline" ref={containerRef} className="py-24 relative overflow-hidden bg-[#04040e]/50">
      {/* Decorative glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" />

      <div className="max-w-4xl mx-auto px-6 w-full relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-20">
          <span className="font-mono text-xs tracking-[0.25em] text-primary uppercase font-bold">Milestones</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl mt-2 text-white">Education Timeline</h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-primary to-secondary mx-auto mt-4" />
        </div>

        {/* Timeline body wrapper */}
        <div className="relative">
          
          {/* Timeline background vertical line */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[2px] bg-white/10 -translate-x-1/2" />

          {/* Animated drawing vertical SVG/Line */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary via-[#00f2fe] to-secondary -translate-x-1/2 origin-top"
            style={{ scaleY }}
          />

          {/* Timeline nodes */}
          <div className="flex flex-col gap-16 md:gap-24">
            {educationData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={index}
                  className={`relative flex flex-col md:flex-row items-stretch ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Glowing central node badge */}
                  <div className="absolute left-4 md:left-1/2 top-0 w-8 h-8 rounded-full bg-[#03030b] border-2 border-primary flex items-center justify-center -translate-x-1/2 z-20 shadow-md shadow-primary/20">
                    <GraduationCap className="w-4 h-4 text-primary" />
                  </div>

                  {/* Left Side (Spacing placeholder on larger screen) */}
                  <div className="w-full md:w-1/2 md:px-12" />

                  {/* Right Side (Content card block) */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="p-6 rounded-2xl glassmorphism border border-white/5 relative hover:glassmorphism-glow transition-all duration-300 group"
                    >
                      {/* Interactive edge glows */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Header details */}
                      <span className="flex items-center gap-1.5 text-xs font-mono text-primary font-bold mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.year}
                      </span>
                      
                      <h3 className="font-display font-extrabold text-lg md:text-xl text-white group-hover:text-primary transition-colors">
                        {item.degree}
                      </h3>
                      
                      <h4 className="font-display font-semibold text-sm text-gray-300 mt-1">
                        {item.institution}
                      </h4>

                      <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-2 font-sans font-medium">
                        <MapPin className="w-3 h-3 text-secondary" />
                        {item.location}
                      </div>

                      <p className="font-sans text-xs md:text-sm text-gray-400 leading-relaxed mt-4 border-t border-white/5 pt-4">
                        {item.description}
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
