import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Sliders,
  Shuffle,
  RotateCcw,
  Copy,
  Check,
  Download,
  Square,
  Smartphone,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { COLORWAY_PRESETS, SLOGAN_POOL } from '../data/portfolioData';
import { ColorwayPreset } from '../types';

export const BratGenerator: React.FC = () => {
  const [text, setText] = useState('senzhao');
  const [blur, setBlur] = useState(0.5);
  const [scaleX, setScaleX] = useState(0.85);
  const [scaleY, setScaleY] = useState(1.02);
  const [fontSize, setFontSize] = useState(72);
  const [letterSpacing, setLetterSpacing] = useState(-0.06);
  const [bgColor, setBgColor] = useState('#9ACD32');
  const [textColor, setTextColor] = useState('#000000');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '9:16' | '16:9'>('1:1');
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  // Apply colorway preset
  const applyPreset = (preset: ColorwayPreset) => {
    setBgColor(preset.bg);
    setTextColor(preset.text);
    setBlur(preset.blur);
    setScaleX(preset.scaleX);
  };

  // Random slogan
  const handleRandomSlogan = () => {
    const randomItem = SLOGAN_POOL[Math.floor(Math.random() * SLOGAN_POOL.length)];
    setText(randomItem);
  };

  // Reset defaults
  const handleReset = () => {
    setText('senzhao');
    setBlur(0.5);
    setScaleX(0.85);
    setScaleY(1.02);
    setFontSize(72);
    setLetterSpacing(-0.06);
    setBgColor('#9ACD32');
    setTextColor('#000000');
    setAspectRatio('1:1');
  };

  // Copy CSS Code
  const handleCopyCSS = () => {
    const cssCode = `/* BRAT AESTHETIC STYLES */
background-color: ${bgColor};
color: ${textColor};
filter: blur(${blur}px);
transform: scale(${scaleX}, ${scaleY});
font-family: Arial, "Helvetica Neue", sans-serif;
font-weight: 900;
letter-spacing: ${letterSpacing}em;
text-transform: lowercase;`;

    navigator.clipboard.writeText(cssCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  // Export high-res PNG
  const handleExportPNG = () => {
    setIsExporting(true);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsExporting(false);
      return;
    }

    // Determine dimensions based on aspect ratio
    let width = 1200;
    let height = 1200;
    if (aspectRatio === '9:16') {
      width = 1080;
      height = 1920;
    } else if (aspectRatio === '16:9') {
      width = 1920;
      height = 1080;
    }

    canvas.width = width;
    canvas.height = height;

    // Fill background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Add slight low-res noise/grain
    const grainCanvas = document.createElement('canvas');
    grainCanvas.width = 100;
    grainCanvas.height = 100;
    const gCtx = grainCanvas.getContext('2d');
    if (gCtx) {
      const imgData = gCtx.createImageData(100, 100);
      for (let i = 0; i < imgData.data.length; i += 4) {
        const val = Math.random() * 255;
        imgData.data[i] = val;
        imgData.data[i + 1] = val;
        imgData.data[i + 2] = val;
        imgData.data[i + 3] = 12; // faint
      }
      gCtx.putImageData(imgData, 0, 0);
      const pattern = ctx.createPattern(grainCanvas, 'repeat');
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width, height);
      }
    }

    // Configure text with blur & scale
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(scaleX, scaleY);

    if (blur > 0.1) {
      ctx.filter = `blur(${blur * 3}px)`;
    }

    const calculatedFontSize = fontSize * (width / 480);
    ctx.font = `900 ${calculatedFontSize}px Arial, "Helvetica Neue", sans-serif`;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = `${letterSpacing * 100}px`;

    ctx.fillText(text.toLowerCase(), 0, 0);
    ctx.restore();

    // Trigger download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `brat-${text.toLowerCase() || 'cover'}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();

    setTimeout(() => {
      setIsExporting(false);
    }, 500);
  };

  return (
    <section
      id="generator"
      className="py-24 bg-[#0A0B08] border-b-2 border-[#9ACD32] relative overflow-hidden"
    >
      {/* Atmosphere radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#9ACD32]/6 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[#9ACD32] uppercase tracking-[0.3em] text-xs font-semibold">
              [ INTERACTIVE VISUAL MODULE // 专辑与贴纸生成器 ]
            </span>
            <h2 className="font-brat text-4xl sm:text-6xl text-white tracking-tighter mt-3 uppercase text-blur-sm">
              brat-sticker.creator
            </h2>
            <p className="font-mono text-gray-400 mt-3 text-xs max-w-xl mx-auto leading-relaxed">
              输入任意文本，自由调节低分辨率油墨溢出、字体水平横向压缩、字号与色彩参数。支持一键导出高清 PNG 封面或壁纸，感受纯正亚文化粗粝美学。
            </p>
          </motion.div>
        </div>

        {/* Generator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Controls Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-[#141614] border-2 border-[#9ACD32]/30 p-6 sm:p-8 rounded-none relative shadow-xl">
            <div className="space-y-5">
              {/* Header inside panel */}
              <div className="flex items-center justify-between border-b border-[#9ACD32]/20 pb-3">
                <span className="font-brat text-lg uppercase text-[#9ACD32] flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#9ACD32]" />
                  <span>customizer.控制参数</span>
                </span>
                <span className="font-mono text-[10px] text-gray-500 uppercase">
                  v2.0 PRO ACID
                </span>
              </div>

              {/* Text Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="font-mono text-xs text-gray-400 uppercase tracking-wider">
                    label.文本内容 (Text)
                  </label>
                  <button
                    onClick={handleRandomSlogan}
                    className="font-mono text-[10px] text-[#9ACD32] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Shuffle className="w-3 h-3" />
                    <span>随机特拉普词</span>
                  </button>
                </div>
                <input
                  type="text"
                  maxLength={30}
                  value={text}
                  onChange={(e) => setText(e.target.value.toLowerCase())}
                  className="w-full bg-[#0d0e0d] border border-[#9ACD32]/40 text-white font-brat py-2.5 px-3.5 rounded-none focus:outline-none focus:border-[#9ACD32] text-lg transition-all"
                  placeholder="enter.anything..."
                />
              </div>

              {/* Ink Bleed Blur Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400 uppercase">blur.油墨溢出模糊</span>
                  <span className="text-[#9ACD32] font-bold">{blur.toFixed(1)}px</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="4.0"
                  step="0.1"
                  value={blur}
                  onChange={(e) => setBlur(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#0d0e0d] appearance-none cursor-pointer accent-[#9ACD32]"
                />
              </div>

              {/* Stretch X Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400 uppercase">stretch-x.水平缩放</span>
                  <span className="text-[#9ACD32] font-bold">{scaleX.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.05"
                  value={scaleX}
                  onChange={(e) => setScaleX(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#0d0e0d] appearance-none cursor-pointer accent-[#9ACD32]"
                />
              </div>

              {/* Stretch Y Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400 uppercase">stretch-y.垂直缩放</span>
                  <span className="text-[#9ACD32] font-bold">{scaleY.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="1.4"
                  step="0.05"
                  value={scaleY}
                  onChange={(e) => setScaleY(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#0d0e0d] appearance-none cursor-pointer accent-[#9ACD32]"
                />
              </div>

              {/* Font Size */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400 uppercase">size.字号基底</span>
                  <span className="text-[#9ACD32] font-bold">{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min="32"
                  max="130"
                  step="2"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-[#0d0e0d] appearance-none cursor-pointer accent-[#9ACD32]"
                />
              </div>

              {/* Aspect Ratio Selector */}
              <div className="space-y-1.5">
                <span className="font-mono text-xs text-gray-400 uppercase block">
                  ratio.画幅比例
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '1:1', label: '1:1 封面', icon: Square },
                    { id: '9:16', label: '9:16 壁纸', icon: Smartphone },
                    { id: '16:9', label: '16:9 横幅', icon: Maximize2 }
                  ].map((r) => {
                    const active = aspectRatio === r.id;
                    const Icon = r.icon;
                    return (
                      <button
                        key={r.id}
                        onClick={() => setAspectRatio(r.id as any)}
                        className={`py-2 px-2 text-center font-mono text-[10px] uppercase flex items-center justify-center gap-1 cursor-pointer border ${
                          active
                            ? 'bg-[#9ACD32] text-black border-transparent font-bold'
                            : 'bg-[#0d0e0d] text-gray-400 border-gray-800 hover:text-white'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{r.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Presets */}
              <div className="space-y-2">
                <span className="font-mono text-xs text-gray-400 uppercase block">
                  presets.色彩预设
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {COLORWAY_PRESETS.map((cp) => (
                    <button
                      key={cp.name}
                      onClick={() => applyPreset(cp)}
                      className="p-1.5 border border-gray-800 hover:border-[#9ACD32] text-left cursor-pointer flex items-center gap-2 bg-[#0d0e0d]"
                    >
                      <div
                        className="w-3.5 h-3.5 border border-black/40 shrink-0"
                        style={{ backgroundColor: cp.bg }}
                      />
                      <span className="font-mono text-[9px] text-gray-300 uppercase truncate">
                        {cp.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Color Pickers */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-[10px] font-mono text-gray-500 uppercase block mb-1">
                    背景色 (Bg)
                  </label>
                  <div className="flex items-center gap-2 bg-[#0d0e0d] p-1.5 border border-gray-800">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-6 h-6 rounded-none border-0 p-0 cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-[10px] uppercase text-gray-300">{bgColor}</span>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono text-gray-500 uppercase block mb-1">
                    文字色 (Text)
                  </label>
                  <div className="flex items-center gap-2 bg-[#0d0e0d] p-1.5 border border-gray-800">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-6 h-6 rounded-none border-0 p-0 cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-[10px] uppercase text-gray-300">{textColor}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#9ACD32]/20 flex items-center gap-3">
              <button
                onClick={handleReset}
                className="px-3 py-2.5 bg-transparent border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white font-mono text-xs uppercase flex items-center gap-1.5 cursor-pointer"
                title="Reset all settings to default"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>重置</span>
              </button>

              <button
                onClick={handleCopyCSS}
                className="flex-1 py-2.5 bg-black border border-[#9ACD32] hover:bg-[#9ACD32]/15 text-[#9ACD32] font-brat text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'CSS 已复制到剪贴板' : '复制 CSS 样式代码'}</span>
              </button>
            </div>
          </div>

          {/* Live Preview Display Stage */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="bg-[#141614] border-2 border-gray-800 p-4 sm:p-6 flex flex-col items-center justify-center min-h-[440px] relative overflow-hidden">
              {/* Aspect Ratio Frame */}
              <div
                ref={previewRef}
                className={`relative flex items-center justify-center overflow-hidden transition-all duration-300 shadow-2xl p-6 select-none ${
                  aspectRatio === '1:1'
                    ? 'w-full max-w-[420px] aspect-square'
                    : aspectRatio === '9:16'
                    ? 'w-full max-w-[300px] aspect-[9/16]'
                    : 'w-full max-w-[540px] aspect-[16/9]'
                }`}
                style={{ backgroundColor: bgColor }}
              >
                {/* Micro noise layer */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.06]"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 2px)'
                  }}
                />

                {/* Main Rendered Text */}
                <span
                  className="font-brat block select-none text-center font-black transition-all duration-100 ease-out"
                  style={{
                    color: textColor,
                    fontSize: `${fontSize}px`,
                    filter: `blur(${blur}px)`,
                    transform: `scale(${scaleX}, ${scaleY})`,
                    letterSpacing: `${letterSpacing}em`,
                    lineHeight: 1.0,
                    textShadow: '0 0 2px rgba(0,0,0,0.1)'
                  }}
                >
                  {text || 'brat'}
                </span>
              </div>

              {/* Status info under preview */}
              <div className="w-full flex items-center justify-between mt-4 pt-3 border-t border-gray-800/80 font-mono text-[10px] text-gray-500">
                <span>CANVAS: {aspectRatio} // REAL-TIME RENDER</span>
                <span className="text-[#9ACD32]">CSS BLUR: {blur.toFixed(1)}PX</span>
              </div>
            </div>

            {/* Download and Share Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleExportPNG}
                disabled={isExporting}
                className="flex-1 py-3.5 px-6 bg-[#9ACD32] hover:bg-white text-black font-brat text-sm uppercase tracking-widest font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg hover:shadow-[0_0_25px_rgba(154,205,50,0.3)] disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isExporting ? '正在生成高清图像...' : '下载高清 PNG 图像 / EXPORT COVER'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
