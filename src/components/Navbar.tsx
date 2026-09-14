import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Asterisk, Menu, X, Monitor, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentSection: string;
  isCrtEnabled: boolean;
  onToggleCrt: () => void;
  isAudioActive: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  isCrtEnabled,
  onToggleCrt,
  isAudioActive,
  onToggleAudio
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'home' },
    { id: 'works', label: 'works' },
    { id: 'generator', label: 'brat-creator' },
    { id: 'about', label: 'manifesto' },
    { id: 'contact', label: 'contact' }
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y - 75, behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="app-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0d0e0d]/92 backdrop-blur-md border-b-2 border-[#9ACD32]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            onClick={() => scrollTo('hero')}
            className="flex items-center space-x-2.5 cursor-pointer group select-none"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 9, ease: 'linear' }}
              className="text-[#9ACD32]"
            >
              <Asterisk className="w-6 h-6" />
            </motion.div>
            <div className="flex items-baseline">
              <span className="font-brat text-2xl tracking-tight text-white group-hover:text-[#9ACD32] transition-colors leading-none">
                senzhao
              </span>
              <span className="text-[#9ACD32] text-xs font-mono font-bold ml-1 px-1 bg-[#9ACD32]/10 border border-[#9ACD32]/40">
                360
              </span>
            </div>
          </div>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const active = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-4 py-2 font-brat text-xs lg:text-sm tracking-tight transition-all duration-150 uppercase cursor-pointer ${
                    active
                      ? 'text-[#9ACD32] scale-105 tracking-wider text-blur-xs font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="nav-glow"
                      className="absolute inset-0 bg-[#9ACD32]/10 border border-[#9ACD32]/50 rounded-none -z-10 shadow-[0_0_12px_rgba(154,205,50,0.2)]"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Controls & Quick Action */}
          <div className="hidden md:flex items-center space-x-3">
            {/* CRT Effect Toggle */}
            <button
              onClick={onToggleCrt}
              className={`p-2 border transition-all cursor-pointer text-xs font-mono flex items-center gap-1.5 ${
                isCrtEnabled
                  ? 'border-[#9ACD32] bg-[#9ACD32]/20 text-[#9ACD32]'
                  : 'border-gray-800 text-gray-400 hover:text-white hover:border-gray-600'
              }`}
              title="Toggle retro CRT scanlines overlay"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase font-bold">CRT</span>
            </button>

            {/* Audio Pulse Toggle */}
            <button
              onClick={onToggleAudio}
              className={`p-2 border transition-all cursor-pointer text-xs font-mono flex items-center gap-1.5 ${
                isAudioActive
                  ? 'border-[#9ACD32] bg-[#9ACD32] text-black font-bold animate-pulse'
                  : 'border-gray-800 text-gray-400 hover:text-[#9ACD32] hover:border-[#9ACD32]/40'
              }`}
              title="Toggle ambient synthesized club groove"
            >
              {isAudioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="text-[10px] uppercase">RHYTHM</span>
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className="px-3.5 py-2 bg-[#9ACD32] text-black font-brat text-xs uppercase font-bold tracking-wider hover:bg-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={onToggleCrt}
              className={`p-2 border ${isCrtEnabled ? 'border-[#9ACD32] text-[#9ACD32]' : 'border-gray-800 text-gray-400'}`}
              title="CRT Toggle"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#9ACD32] hover:bg-[#9ACD32]/10 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="md:hidden bg-[#0d0e0d] border-b-2 border-[#9ACD32] overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navItems.map((item) => {
                const active = currentSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`block w-full text-left px-4 py-3 font-brat uppercase text-base ${
                      active
                        ? 'text-[#9ACD32] bg-[#9ACD32]/15 pl-6 border-l-4 border-[#9ACD32] text-blur-xs font-bold'
                        : 'text-gray-300 hover:bg-[#9ACD32]/5 hover:text-white'
                    } transition-all duration-150`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
                <button
                  onClick={onToggleAudio}
                  className={`px-3 py-2 text-xs font-mono border flex items-center gap-2 ${
                    isAudioActive ? 'border-[#9ACD32] text-[#9ACD32]' : 'border-gray-800 text-gray-400'
                  }`}
                >
                  {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span>{isAudioActive ? 'RHYTHM ACTIVE' : 'RHYTHM OFF'}</span>
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="px-4 py-2 bg-[#9ACD32] text-black font-brat text-xs uppercase font-bold"
                >
                  CONNECT
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
