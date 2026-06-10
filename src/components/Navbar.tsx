import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Projects', href: '#projects' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-4 bg-[#03030b]/70 backdrop-blur-md border-b border-white/5'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:neon-border-glow transition-all duration-300">
            <Terminal className="w-5 h-5 text-primary group-hover:text-glow-primary group-hover:scale-110 transition-all duration-300" />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="font-display font-bold text-lg tracking-wider bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary transition-all duration-300">
            SUDHAN.dev
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 glassmorphism px-6 py-2.5 rounded-full">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-sans text-sm font-medium text-gray-300 hover:text-primary transition-colors duration-300 relative py-1 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full font-sans text-sm font-semibold border border-primary/50 hover:bg-primary/10 text-primary transition-all duration-300 hover:neon-border-glow"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] z-30 bg-[#03030b]/95 backdrop-blur-xl border-t border-white/5 flex flex-col items-center justify-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="font-display text-2xl font-bold text-gray-200 hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="px-8 py-3 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors w-48 text-center"
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
};
