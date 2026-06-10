import React, { useEffect, useRef } from 'react';

export const MouseFollower: React.FC = () => {
  const delayGlowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const delayGlow = delayGlowRef.current;
    const dot = dotRef.current;
    if (!delayGlow || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Immediately move the small pointer dot
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Smooth animation loop for the glow ring (inertia)
    let animationId = 0;
    const animate = () => {
      // Glow interpolation (linear interpolation for lagging effect)
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;

      delayGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Outer soft neon glow circle */}
      <div
        ref={delayGlowRef}
        className="pointer-events-none fixed top-0 left-0 z-50 -ml-10 -mt-10 h-20 w-20 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 blur-xl transition-opacity duration-300 hidden md:block"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      />
      {/* Inner tiny dot indicator */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-50 -ml-1 -mt-1 h-2 w-2 rounded-full bg-primary mix-blend-difference transition-opacity duration-300 hidden md:block"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      />
    </>
  );
};
