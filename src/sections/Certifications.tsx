import React from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, Key, ExternalLink, ShieldCheck } from 'lucide-react';

interface Certificate {
  title: string;
  authority: string;
  topics: string[];
  id: string;
  glowColor: string;
  icon: React.ReactNode;
}

export const Certifications: React.FC = () => {
  const certs: Certificate[] = [
    {
      title: 'AWS Foundation of Prompt Engineering',
      authority: 'Amazon Web Services',
      topics: ['LLMs foundations', 'Prompt patterns', 'Tokens management', 'System instruction modeling'],
      id: 'AWS-PE-2025',
      glowColor: '#00D4FF',
      icon: <Compass className="w-8 h-8 text-primary text-glow-primary" />,
    },
    {
      title: 'Introduction to MySQL',
      authority: 'Oracle / Database Authority',
      topics: ['Relational queries', 'Index structures', 'Triggers & Procedures', 'Join execution plans'],
      id: 'SQL-MY-4829',
      glowColor: '#8B5CF6',
      icon: <Key className="w-8 h-8 text-secondary" />,
    },
    {
      title: 'JavaScript Mastery',
      authority: 'JS Foundation Academy',
      topics: ['Functional paradigms', 'Event loop & Concurrency', 'Modular structures', 'ESNext features'],
      id: 'JS-MAS-1092',
      glowColor: '#EC4899',
      icon: <Award className="w-8 h-8 text-pink-500" />,
    },
    {
      title: 'Accenture UX Digital Skills',
      authority: 'Accenture',
      topics: ['User experience testing', 'Wireframing grids', 'Heuristics checking', 'User personas mapping'],
      id: 'ACC-UX-8821',
      glowColor: '#10B981',
      icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
    },
  ];

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-[#03030b]">
      {/* Dynamic light bursts */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.25em] text-primary uppercase font-bold">Credentials</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl mt-2 text-white">Certifications</h2>
          <p className="font-sans text-xs text-gray-400 mt-3 max-w-sm mx-auto">
            Hover over certificates to flip them and inspect credential details.
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-primary to-secondary mx-auto mt-4" />
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[300px]">
          {certs.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group h-[260px] relative rounded-2xl"
              style={{ perspective: '1000px' }}
            >
              {/* Inner container performing Y-axis rotation */}
              <div 
                className="w-full h-full relative rounded-2xl transition-transform duration-700 ease-out transform style-3d group-hover:rotate-y-180"
                style={{ transformStyle: 'preserve-3d' }}
              >
                
                {/* FRONT side of card */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl glassmorphism border border-white/5 p-6 flex flex-col justify-between items-start backface-hidden"
                  style={{ 
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <div className="flex flex-col gap-4">
                    <div 
                      className="p-3 rounded-xl border w-fit" 
                      style={{ 
                        borderColor: `${cert.glowColor}22`,
                        backgroundColor: `${cert.glowColor}11`,
                        boxShadow: `0 0 15px ${cert.glowColor}15`
                      }}
                    >
                      {cert.icon}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-white line-clamp-2">
                        {cert.title}
                      </h3>
                      <p className="font-sans text-xs text-gray-400 mt-1">
                        {cert.authority}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-[9px] tracking-wider text-gray-500 uppercase">
                    ID: {cert.id}
                  </span>
                </div>

                {/* BACK side of card (Flipped) */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl bg-[#090918] border border-white/10 p-6 flex flex-col justify-between items-stretch backface-hidden rotate-y-180"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="flex flex-col gap-3">
                    <h4 className="font-display font-bold text-xs text-primary uppercase tracking-wider">
                      Skills Acquired
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {cert.topics.map((t, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-sans text-gray-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => alert(`Redirecting to verify credential ${cert.id}...`)}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary hover:brightness-110 text-white font-sans text-xs font-semibold shadow-md transition-all duration-300"
                  >
                    Verify Credential
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
