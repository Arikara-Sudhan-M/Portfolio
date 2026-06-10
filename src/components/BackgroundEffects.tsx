import React, { useState, useEffect } from 'react';

export const BackgroundEffects: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initial trigger
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar at the top of the viewport */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-white/5 z-[150] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-primary via-[#00f2fe] to-secondary shadow-[0_0_12px_rgba(0,212,255,0.7)] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hardware-accelerated slow-drifting background blur gradient shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Blob 1: Top-Left Cyber Cyan Bloom */}
        <div className="absolute top-[5%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-primary/6 blur-[120px] animate-drift-slow" />

        {/* Blob 2: Mid-Right Nebula Purple Bloom */}
        <div className="absolute top-[30%] right-[-15%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-secondary/10 blur-[140px] animate-drift-slow-reverse" />

        {/* Blob 3: Lower-Left Cyber Magenta Bloom */}
        <div className="absolute top-[60%] left-[-15%] w-[52vw] h-[52vw] max-w-[650px] max-h-[650px] rounded-full bg-pink-500/6 blur-[130px] animate-drift-slow" />

        {/* Blob 4: Bottom-Right Deep Blue Bloom */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[48vw] h-[48vw] max-w-[600px] max-h-[600px] rounded-full bg-accent/8 blur-[120px] animate-drift-slow-reverse" />
      </div>
    </>
  );
};
