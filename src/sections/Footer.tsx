import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#03030b] overflow-hidden pt-12 pb-8">
      {/* Animated glowing border line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-gray-500">
        <div>
          Designed &amp; Developed by <span className="text-gray-300 font-bold">Arikara Sudhan M</span>
        </div>
        <div>
          &copy; 2026 &bull; All coordinates registered.
        </div>
      </div>
    </footer>
  );
};
