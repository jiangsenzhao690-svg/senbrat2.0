/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Works } from './components/Works';
import { BratGenerator } from './components/BratGenerator';
import { Manifesto } from './components/Manifesto';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AudioSynthesizerBar } from './components/AudioSynthesizerBar';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [isCrtEnabled, setIsCrtEnabled] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'works', 'generator', 'about', 'contact'];
      const scrollPos = window.scrollY + 180;

      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setCurrentSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerSynthNote = (freq: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#0A0B08] text-[#E0E2DB] selection:bg-[#9ACD32] selection:text-[#0A0B08] relative font-sans antialiased brat-noise overflow-x-hidden ${
        isCrtEnabled ? 'crt-scanlines' : ''
      }`}
    >
      {/* Dynamic atmospheric radial background */}
      <div
        className="fixed inset-0 pointer-events-none -z-20 transition-all duration-1000 ease-in-out opacity-45"
        style={{
          background:
            currentSection === 'hero'
              ? 'radial-gradient(circle at 80% 20%, rgba(154,205,50,0.18) 0%, rgba(10,11,8,1) 60%)'
              : currentSection === 'works'
              ? 'radial-gradient(circle at 85% 50%, rgba(154,205,50,0.22) 0%, rgba(10,11,8,1) 70%)'
              : currentSection === 'generator'
              ? 'radial-gradient(circle at 15% 85%, rgba(154,205,50,0.18) 0%, rgba(10,11,8,1) 55%)'
              : currentSection === 'about'
              ? 'radial-gradient(circle at 25% 75%, rgba(154,205,50,0.2) 0%, rgba(10,11,8,1) 65%)'
              : 'radial-gradient(circle at 50% 90%, rgba(154,205,50,0.28) 0%, rgba(10,11,8,1) 55%)'
        }}
      />

      {/* Navigation */}
      <Navbar
        currentSection={currentSection}
        isCrtEnabled={isCrtEnabled}
        onToggleCrt={() => setIsCrtEnabled(!isCrtEnabled)}
        isAudioActive={isAudioActive}
        onToggleAudio={() => setIsAudioActive(!isAudioActive)}
      />

      {/* Main Flow */}
      <main>
        <Hero onTriggerSynthNote={triggerSynthNote} />
        <Works />
        <BratGenerator />
        <Manifesto onPlayNote={triggerSynthNote} />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Custom Acid-Green Reactive Cursor */}
      <CustomCursor />

      {/* Floating Ambient Acid Bass Rhythm */}
      <AudioSynthesizerBar
        isActive={isAudioActive}
        onToggle={() => setIsAudioActive(false)}
      />
    </div>
  );
}

