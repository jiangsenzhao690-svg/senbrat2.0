import React, { useState, useEffect } from 'react';
import { Asterisk, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('zh-CN', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141614] border-t-2 border-[#9ACD32] py-12 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & info */}
          <div className="flex items-center space-x-3 text-center md:text-left">
            <Asterisk
              className="w-6 h-6 text-[#9ACD32] animate-spin"
              style={{ animationDuration: '12s' }}
            />
            <div>
              <span className="font-brat uppercase text-xl text-white block leading-snug">
                senzhao_creative.2026
              </span>
              <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">
                built with precision // full responsive acid system
              </span>
            </div>
          </div>

          {/* Time & Live indicator */}
          <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
            <span className="uppercase text-[10px] text-gray-500">
              SYS.TIME: <span className="text-[#9ACD32] font-bold">{timeString}</span>
            </span>
            <span className="hidden sm:inline text-gray-700">|</span>
            <span className="uppercase text-[10px] text-gray-500">
              VANGUARD CLUB COLLECTION
            </span>
            <span className="hidden sm:inline text-gray-700">|</span>
            <span className="text-[#9ACD32] font-brat uppercase text-lg select-all">
              SO BRAT.
            </span>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-2 border border-gray-800 hover:border-[#9ACD32] hover:bg-[#9ACD32]/10 text-gray-400 hover:text-[#9ACD32] transition-colors cursor-pointer flex items-center gap-1.5 font-mono text-[10px] uppercase"
            title="Scroll to top"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
