import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Radio, RefreshCw, Sparkles, Activity, Play, Volume2, Music, Cpu } from 'lucide-react';
import { SKILLS, SONGS, MANIFESTO_QUOTES } from '../data/portfolioData';

interface ManifestoProps {
  onPlayNote?: (freq: number) => void;
}

export const Manifesto: React.FC<ManifestoProps> = ({ onPlayNote }) => {
  const [activeSongId, setActiveSongId] = useState<string | null>(null);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [activeKey, setActiveKey] = useState<number | null>(null);

  // Play WebAudio synthesis tone
  const playSynthesizedTone = (songId: string, idx: number, customFreq?: number) => {
    setActiveSongId(songId);
    setTimeout(() => setActiveSongId(null), 800);

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      const freqs = [110.0, 146.83, 164.81, 130.81, 220.0, 293.66];
      const targetFreq = customFreq || freqs[idx % freqs.length] || 110;

      osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(targetFreq, ctx.currentTime);

      // Lowpass acid envelope
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.75);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.75);
    } catch (err) {
      console.warn('Audio synthesis restricted by browser autoplay policy.', err);
    }
  };

  // Acid keyboard notes
  const keyboardNotes = [
    { label: 'C2', freq: 65.41 },
    { label: 'Eb2', freq: 77.78 },
    { label: 'F2', freq: 87.31 },
    { label: 'G2', freq: 98.0 },
    { label: 'Bb2', freq: 116.54 },
    { label: 'C3', freq: 130.81 },
    { label: 'Eb3', freq: 155.56 }
  ];

  const handleKeyPlay = (noteIdx: number, freq: number) => {
    setActiveKey(noteIdx);
    setTimeout(() => setActiveKey(null), 300);
    playSynthesizedTone(`key-${noteIdx}`, noteIdx, freq);
  };

  const handleNextQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % MANIFESTO_QUOTES.length);
  };

  return (
    <section id="about" className="py-24 bg-[#0A0B08] border-b-2 border-[#9ACD32] relative">
      <div className="absolute top-1/2 left-10 w-[350px] h-[350px] bg-[#9ACD32]/6 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bio & Manifesto text */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-mono text-[#9ACD32] uppercase tracking-[0.3em] text-xs font-semibold">
                [ CREATIVE MANIFESTO / BIO // 艺术宣言 ]
              </span>
              <h2 className="font-brat text-4xl sm:text-6xl text-white tracking-tighter mt-3 uppercase text-blur-sm">
                the.alternative.path
              </h2>
            </motion.div>

            <div className="font-mono text-xs text-gray-300 leading-relaxed space-y-5">
              <p className="border-l-2 border-[#9ACD32] pl-4 text-[#9ACD32] italic font-semibold text-sm">
                “我们不追求光滑平整的无瑕排版，我们在低分辨率的模糊、拉伸与噪声干扰中，寻找数字灵魂的原始质感。”
              </p>

              <p>
                我是 <strong>SENZHAO（赵江森）</strong>。一名根植于反传统排版（Anti-Design）、前卫数码艺术与复杂 Web 开发交叉领域的创意工程师。
                利用 React 等前沿前端工程体系，配合 WebAudio API、Shaders（着色器）与物理模拟交互，
                我专为对视觉有极致态度、向往亚文化电子乐美学的独特品牌打造高度沉浸式的数字门户与艺术展示级载体。
              </p>

              <p>
                我的核心理念就如 Charli XCX 掀起的那场关于绿色和 Arial 粗糙字体的 Brat 盛宴：
                <strong className="text-white bg-[#9ACD32]/20 px-1 py-0.5 ml-1 mr-1">极致简单、保持粗野。</strong>
                当所有的移动端和桌面网站都缩进千篇一律的完美边距与温和渐变时，在这里，我们打破常规：用强对比的黄绿色调（YellowGreen）、低频溢出效果和互动控制模块，实现难以令人移开目光的电子噪音美学。
              </p>
            </div>

            {/* Interactive Manifesto Quote Flipper */}
            <div className="bg-[#141614] border border-[#9ACD32]/30 p-5 rounded-none space-y-2 select-none shadow-md">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-[#9ACD32]" />
                  <span>INTERACTIVE.VIBE_MANIFESTO_CHECK</span>
                </span>
                <button
                  onClick={handleNextQuote}
                  className="font-mono text-[10px] text-[#9ACD32] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className="w-2.5 h-2.5" />
                  <span>[ NEXT.切换宣言 ]</span>
                </button>
              </div>
              <p className="font-brat text-lg text-white italic tracking-tight lowercase text-blur-xs pt-1">
                "{MANIFESTO_QUOTES[quoteIdx]}"
              </p>
            </div>

            {/* Micro stats counter grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-[#141614] p-4 text-center border border-gray-800">
                <span className="block font-brat text-[#9ACD32] text-2xl">360°</span>
                <span className="font-mono text-[9px] text-gray-400 uppercase">RESPONSIVE GRID</span>
              </div>
              <div className="bg-[#141614] p-4 text-center border border-gray-800">
                <span className="block font-brat text-[#9ACD32] text-2xl">0.0s</span>
                <span className="font-mono text-[9px] text-gray-400 uppercase">INSTANT LOAD</span>
              </div>
              <div className="bg-[#141614] p-4 text-center border border-gray-800 col-span-2 sm:col-span-1">
                <span className="block font-brat text-[#9ACD32] text-2xl">100%</span>
                <span className="font-mono text-[9px] text-gray-400 uppercase">ACID AUTHENTICITY</span>
              </div>
            </div>
          </div>

          {/* Right Column: Skills & Interactive Soundboard */}
          <div className="lg:col-span-5 space-y-8 bg-[#141614] border-2 border-[#9ACD32]/25 p-6 sm:p-8 rounded-none shadow-xl">
            {/* Skills Parameters */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#9ACD32]/20 pb-2">
                <span className="font-brat text-lg uppercase text-[#9ACD32] flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#9ACD32]" />
                  <span>skills.核心参数体系</span>
                </span>
                <span className="font-mono text-[10px] text-gray-500">LEVEL / RATING</span>
              </div>

              <div className="space-y-3">
                {SKILLS.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-[#9ACD32] font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-black border border-[#9ACD32]/20 rounded-none overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                        className="h-full bg-[#9ACD32]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Soundboard & Synth Notes */}
            <div className="space-y-4 pt-2 border-t border-gray-800">
              <div className="flex justify-between items-center border-b border-[#9ACD32]/20 pb-2">
                <span className="font-brat text-lg uppercase text-white flex items-center gap-2">
                  <Music className="w-4 h-4 text-[#9ACD32]" />
                  <span>vibe.合成音板 (Soundboard)</span>
                </span>
                <Volume2 className="w-4 h-4 text-[#9ACD32] animate-pulse" />
              </div>

              <p className="font-mono text-[10px] text-gray-400 uppercase leading-relaxed">
                * 点击曲目或下方模拟低音键位，触发即时 WebAudio 微积分酸性振荡器音阶：
              </p>

              {/* Mini Acid Bass Keys */}
              <div className="space-y-1.5">
                <span className="font-mono text-[9px] text-gray-500 uppercase block">
                  ACID BASSLINE PADS (303 SYNTH)
                </span>
                <div className="grid grid-cols-7 gap-1">
                  {keyboardNotes.map((k, idx) => (
                    <button
                      key={k.label}
                      onClick={() => handleKeyPlay(idx, k.freq)}
                      className={`py-2 text-center font-mono text-[10px] uppercase font-bold cursor-pointer transition-all border ${
                        activeKey === idx
                          ? 'bg-[#9ACD32] text-black border-white scale-95'
                          : 'bg-black text-gray-300 border-gray-800 hover:border-[#9ACD32] hover:text-[#9ACD32]'
                      }`}
                    >
                      {k.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Song tracks */}
              <div className="space-y-2 pt-2">
                {SONGS.map((song, idx) => {
                  const isCurrent = activeSongId === song.id;
                  return (
                    <div
                      key={song.id}
                      onClick={() => playSynthesizedTone(song.id, idx, song.freq)}
                      className={`flex items-center justify-between p-2.5 bg-black hover:bg-[#9ACD32]/10 border transition-all cursor-pointer ${
                        isCurrent
                          ? 'border-[#9ACD32] bg-[#9ACD32]/15 shadow-[0_0_12px_rgba(154,205,50,0.2)]'
                          : 'border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <div
                          className={`w-6 h-6 flex items-center justify-center border ${
                            isCurrent
                              ? 'bg-[#9ACD32] text-black border-[#9ACD32]'
                              : 'border-gray-700 text-gray-400'
                          }`}
                        >
                          <Play className={`w-3 h-3 ${isCurrent ? 'fill-black' : ''}`} />
                        </div>
                        <div>
                          <span className="font-brat text-sm text-white block uppercase tracking-tight leading-none">
                            {song.title}
                          </span>
                          <span className="font-mono text-[9px] text-gray-500 uppercase">
                            {song.artist} // {song.energyLevel}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[10px] text-[#9ACD32] font-semibold">
                          {song.bpm} BPM
                        </span>
                        <span className="font-mono text-[9px] text-gray-600">
                          {song.duration}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
