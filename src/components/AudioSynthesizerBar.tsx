import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX, Radio, Disc3 } from 'lucide-react';

interface AudioSynthesizerBarProps {
  isActive: boolean;
  onToggle: () => void;
}

export const AudioSynthesizerBar: React.FC<AudioSynthesizerBarProps> = ({
  isActive,
  onToggle
}) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef<number>(0);

  // Pattern of acid 303 frequencies: C2 -> C2 -> Eb2 -> F2 -> G2 -> Bb2 -> C3 -> Eb2
  const pattern = [65.41, 65.41, 77.78, 87.31, 98.0, 116.54, 130.81, 77.78];

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.suspend();
      }
      return;
    }

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioContextClass();
      } else if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      stepRef.current = 0;

      // 130 BPM = ~115ms per 16th note
      const intervalMs = 230;

      const playStep = () => {
        if (!ctx || ctx.state !== 'running') return;

        const currentStep = stepRef.current;
        const freq = pattern[currentStep % pattern.length];
        stepRef.current++;

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);

        // Acid resonant filter sweep
        filter.type = 'lowpass';
        filter.Q.setValueAtTime(8, now);
        filter.frequency.setValueAtTime(250, now);
        filter.frequency.exponentialRampToValueAtTime(1400, now + 0.1);
        filter.frequency.exponentialRampToValueAtTime(300, now + 0.2);

        // Low volume ambient level
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.22);
      };

      playStep();
      timerRef.current = window.setInterval(playStep, intervalMs);
    } catch (e) {
      console.warn('Audio autoplay blocked by browser policy.', e);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 bg-[#111310] border-2 border-[#9ACD32] p-2.5 shadow-[0_0_20px_rgba(154,205,50,0.3)] flex items-center space-x-3 select-none">
      <div className="flex items-center space-x-2">
        <Disc3 className="w-4 h-4 text-[#9ACD32] animate-spin" />
        <span className="font-mono text-[10px] text-[#9ACD32] font-bold uppercase">
          ACID 303 RHYTHM: 130 BPM
        </span>
      </div>

      <div className="flex items-end gap-1 h-3">
        {[40, 80, 100, 60, 90, 40].map((h, i) => (
          <div
            key={i}
            className="w-1 bg-[#9ACD32] animate-pulse"
            style={{
              height: `${h}%`,
              animationDuration: `${0.3 + i * 0.1}s`
            }}
          />
        ))}
      </div>

      <button
        onClick={onToggle}
        className="p-1 hover:bg-[#9ACD32]/20 text-gray-400 hover:text-white transition-colors cursor-pointer"
        title="Stop sound"
      >
        <VolumeX className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
