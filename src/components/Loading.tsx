import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingProps {
  onComplete: () => void;
}

export const Loading: React.FC<LoadingProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Fast progress initial, slowing down near 100
      const increment = Math.max(1, Math.floor((100 - current) * 0.15));
      current += increment;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 800); // Allow exit animations to finish
        }, 300);
      }
      setProgress(current);
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#03030b]"
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#080815_1px,transparent_1px),linear-gradient(to_bottom,#080815_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

          {/* Futuristic Glowing Rings */}
          <div className="relative flex items-center justify-center w-40 h-40">
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute w-32 h-32 border border-dashed rounded-full border-primary/40 neon-border-glow"
            />
            {/* Inner ring (counter rotating) */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              className="absolute w-24 h-24 border border-dotted rounded-full border-secondary/60"
            />
            {/* 3D Holographic Core */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary blur-sm opacity-80"
            />
            <div className="absolute font-mono text-xl font-bold tracking-wider text-glow-primary text-white">
              {progress}%
            </div>
          </div>

          {/* Tagline */}
          <div className="mt-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-lg tracking-[0.25em] uppercase text-gray-400 font-semibold"
            >
              Arikara Sudhan M
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-2 font-sans text-xs tracking-widest uppercase text-primary/80"
            >
              Initializing Workspace...
            </motion.p>
          </div>

          {/* Futuristic bottom progress indicator */}
          <div className="absolute bottom-12 w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
