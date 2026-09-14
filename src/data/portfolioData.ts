import { Project, SkillItem, SongTrack, ColorwayPreset } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'nuances-and-brat',
    subtitle: 'Brutalist Collage & Digital Poster',
    category: 'design',
    tags: ['Photoshop', 'Halftone Slicer', 'Brat Style', 'Poster Graphic', 'Print Prep'],
    description: "以 2024 最潮热的 Brat（酸性绿）风为灵感创作的数码艺术海报。融合标志性青苹果、酸性流体色块、倾斜裁剪的复古眼部高对比特写，以及带有颗粒质感的半色调网点。上面印有歌词：'I know there's lots of different nuances to you and to me'，探索数字拼贴中的亚文化无序性与真实感。",
    color: '#9ACD32',
    year: '2024',
    link: 'https://github.com/senzhao-360',
    image: 'collage',
    client: 'Subcultural Zine Issue #04',
    role: 'Visual Director & Graphic Synthesizer',
    tools: ['Adobe Illustrator', 'Custom Halftone Shader', 'Risograph Print Engine'],
    conceptDetails: '在千篇一律的商业扁平化设计反弹浪潮中，该作品采用极致解构主义手法，将歌词意象转化为错位网格。通过物理半色调点阵与荧光黄绿底色的相互侵蚀，展现数字时代个人身份的微妙差异与情绪杂质。',
    stats: [
      { label: 'DPI Resolution', value: '600 DPI' },
      { label: 'Halftone Angle', value: '45.0°' },
      { label: 'Color Separation', value: 'Spot Neon Green + Black' }
    ]
  },
  {
    id: 'proj-2',
    title: 'android-3d-rave',
    subtitle: 'Charli & Android Mascot Render',
    category: 'art',
    tags: ['Blender 3D', 'Lighting Render', 'Pop Art', 'Exhibition Design', 'Cycles'],
    description: '3D Blender 渲染艺术。标志性的绿色安卓机器人伫立在极简主义艺术展台上，背后是一幅巨大的 Charli XCX 风格经典黑白人像特写。空间墙面被涂刷以代表性的酸性荧光绿，融合电子大众符号与现代俱乐部锐舞美学。',
    color: '#9ACD32',
    year: '2024',
    link: 'https://github.com/senzhao-360',
    image: 'rave-android',
    client: 'Underground Audio-Visual Night 2024',
    role: '3D Artist & Scene Architect',
    tools: ['Blender 4.2', 'Cycles Engine', 'Substance Painter', 'ACES Color Pipeline'],
    conceptDetails: '将技术极客的经典图腾——Android 机器人，剥离传统科技语境，置入当代流行电音偶像的狂欢殿堂。借助强冷暖光影分割与粗糙材质反射，重现千禧年初锐舞派对与数码波普艺术的化学反应。',
    stats: [
      { label: 'Render Samples', value: '4096 Cycles' },
      { label: 'Focal Length', value: '35mm Prime' },
      { label: 'Color Space', value: 'ACEScg' }
    ]
  },
  {
    id: 'proj-3',
    title: 'brat-studio',
    subtitle: 'Minimal Concrete 3D Ambient',
    category: 'art',
    tags: ['3D Modeling', 'Octane Render', 'V-Ray', 'Minimal Space', 'Brutalism'],
    description: "在极简三维水泥空间内的绿色光影练习。将现代主义的冷灰色混凝土基底与高对比度、高饱和度的发光荧光绿极速碰撞。安卓机器人安静伫立，背景墙壁压塑了经典的低清 Arial 粗体 'brat' 标识，极度纯粹。",
    color: '#9ACD32',
    year: '2024',
    link: 'https://github.com/senzhao-360',
    image: 'studio-android',
    client: 'Architectural Speculation Lab',
    role: 'Spatial Designer & Materialist',
    tools: ['Octane Standalone', 'Cinema 4D', 'Procedural Concrete Shaders'],
    conceptDetails: '探讨野蛮主义（Brutalism）清水混凝土在低频色光激荡下的空间张力。通过压抑的暗色天顶与底部冷绿光带的狭缝漫射，让观众感受到空旷展厅内部微弱而坚韧的生命脉冲。',
    stats: [
      { label: 'Polygon Count', value: '1.2M Tris' },
      { label: 'GI Bounce', value: '16 Depth' },
      { label: 'Volumetric Light', value: '0.04 Density' }
    ]
  },
  {
    id: 'proj-4',
    title: 'brat-chair',
    subtitle: 'Subcultural Furniture Concept',
    category: 'art',
    tags: ['Industrial Render', 'Soft Body Physics', 'Post-Modernism', 'Warm Light', 'C4D'],
    description: "超现实主义概念家具 3D 渲染表现。将经典的白色木饰椅改造成流动着黏润液体感、上面印有低频拉伸 'brat' 文本的酸性荧光绿皮革软垫椅。配合深邃的暗红色到明亮橙红的环境渐变低频光影，营造出迷幻而反常态的现代氛围。",
    color: '#FFFFFF',
    year: '2024',
    link: 'https://github.com/senzhao-360',
    image: 'brat-chair',
    client: 'Hyper-Object Design Gallery',
    role: 'Industrial Form Sculptor',
    tools: ['Houdini Vellum', 'Marvelous Designer', 'Redshift'],
    conceptDetails: '挑战传统功能主义家具的理性规训。利用流变学仿真与软体动力学，将流行文化的字标物理压痕刻入绿色高光胶皮表面，借由橙红暮色与酸性绿补色的冲突，制造不安却极具吸引力的视觉幻象。',
    stats: [
      { label: 'Mesh Solver', value: 'Vellum Cloth' },
      { label: 'Material', value: 'High-Gloss PVC Patent' },
      { label: 'Lighting', value: 'Warm Amber + Acid Split' }
    ]
  },
  {
    id: 'proj-5',
    title: 'neon-graffiti-synth',
    subtitle: '3D WebGL WebAudio Synthesizer',
    category: 'web',
    tags: ['Three.js', 'WebAudio API', 'GLSL Splicer', 'Interactive Canvas', 'DSP'],
    description: '一个全交互式、基于 WebGL 的音乐合成器与视觉染色器。玩家可以在立体空间中通过涂鸦手势直接改变俱乐部低音频率、延迟与波形包络，让声频在屏幕上爆发为酸性绿色的粒子流。',
    color: '#9ACD32',
    year: '2026',
    link: 'https://github.com/senzhao-360',
    image: 'synth',
    client: 'Live Web Audio Experiment',
    role: 'Creative Technologist & Frontend Engineer',
    tools: ['Three.js', 'WebAudio Context', 'GLSL Fragment Shaders', 'Vite'],
    conceptDetails: '打破视觉与声音的感官壁垒，将声音参数（滤波器截止频率、共鸣峰、衰减时间）与屏幕空间手势的粒子轨迹实时绑定。使用 GLSL 计算着色器模拟粒子重力场，达到 60FPS 丝滑声画同步。',
    stats: [
      { label: 'Audio Latency', value: '< 12ms Low-Delay' },
      { label: 'Particle Capacity', value: '120,000 Pts' },
      { label: 'Render Loop', value: 'Pure WebGL 2.0' }
    ]
  },
  {
    id: 'proj-6',
    title: 'analog-bleeding-clipping',
    subtitle: 'VCF Filter & Feedback Simulator',
    category: 'audio',
    tags: ['DSP', 'WebAssembly', 'Tone.js', 'Diode Splicer', 'Audio Worklet'],
    description: '一个在浏览器端模拟模拟磁带饱和与电路削波（Clipping）的单页合成器效果器模块。通过控制反馈环路和信号超载，产生充满颗粒感、肮脏却带有温暖感的低保真酸性音色。',
    color: '#000000',
    year: '2026',
    link: 'https://github.com/senzhao-360',
    image: 'audio-filter',
    client: 'Open Source Audio Plugin',
    role: 'DSP Engine Developer',
    tools: ['WebAudio AudioWorklet', 'Wasm Rust', 'SVG Oscilloscope'],
    conceptDetails: '模拟经典 Roland TB-303 与二极管削波失真电路的非线性响应方程。结合双二阶低通滤波器以及可调谐过载驱动，实现原汁原味的 90 年代酸性浩室（Acid House）泥泞厚重质感。',
    stats: [
      { label: 'Sample Rate', value: '48.0 kHz 32-Bit' },
      { label: 'Distortion Curve', value: 'Tanh Soft-Clip + Asymmetric' },
      { label: 'Thread', value: 'AudioWorklet Node' }
    ]
  }
];

export const SKILLS: SkillItem[] = [
  { name: 'React / Next.js / TypeScript', level: 96, category: 'Code' },
  { name: 'WebGL / Three.js / Custom GLSL', level: 88, category: 'Code' },
  { name: 'WebAudio DSP / Tone.js / AudioWorklet', level: 84, category: 'Audio' },
  { name: 'Acidic Yellow-Green Aesthetic & Brutalism', level: 100, category: 'Vibe' },
  { name: 'Alternative Layout & Anti-Design Principles', level: 92, category: 'Vibe' },
  { name: 'Raw Type Distortion & Ink Bleeding FX', level: 95, category: 'Vibe' },
  { name: 'Tailwind CSS v4 & Precision Responsive', level: 96, category: 'Code' },
  { name: 'Motion Orchestration & Micro-Interactions', level: 93, category: 'Code' }
];

export const SONGS: SongTrack[] = [
  { id: 'song-1', title: '360', artist: 'Charli XCX', duration: '2:26', energyLevel: '100% Club Pop', bpm: 120, freq: 110.0 },
  { id: 'song-2', title: 'Von dutch', artist: 'Charli XCX', duration: '2:44', energyLevel: 'Acid Synth Overdrive', bpm: 132, freq: 146.83 },
  { id: 'song-3', title: 'b2b', artist: 'Charli XCX', duration: '2:58', energyLevel: 'Strobe Lights Loop', bpm: 126, freq: 164.81 },
  { id: 'song-4', title: '365', artist: 'Charli XCX', duration: '3:23', energyLevel: 'Endless Green Rave Simulator', bpm: 136, freq: 130.81 },
  { id: 'song-5', title: 'Sympathy is a knife', artist: 'Charli XCX', duration: '2:52', energyLevel: 'Low-res Contrast Vibe', bpm: 124, freq: 220.0 }
];

export const MANIFESTO_QUOTES: string[] = [
  "brat and it's the same but it's a website so it's fully interactive to type whatever you want.",
  "i'm your favorite digital subculture designer, call me when you want something messy yet pristine.",
  "everything is fuzzy, everything is green, but the code is perfectly structured and responsive.",
  "we don't do boring corporate margins here. select black, select green, let text blur.",
  "who cares about polished clean gradients when you can have brutal yellowgreen overload?",
  "low-fidelity visuals paired with high-performance code: that is the true alternative path."
];

export const COLORWAY_PRESETS: ColorwayPreset[] = [
  { name: 'classic-brat', label: '经典酸绿', bg: '#9ACD32', text: '#000000', blur: 0.4, scaleX: 0.85 },
  { name: 'club-inverted', label: '深渊低频', bg: '#0A0B08', text: '#9ACD32', blur: 0.6, scaleX: 0.75 },
  { name: 'overdrive-orange', label: '过载荧橙', bg: '#FF4500', text: '#FFFFFF', blur: 0.3, scaleX: 0.90 },
  { name: 'toxic-cyan', label: '毒性电青', bg: '#00F0FF', text: '#0A0B08', blur: 0.5, scaleX: 0.82 },
  { name: 'ambient-gray', label: '水泥颗粒', bg: '#2B2E29', text: '#9ACD32', blur: 0.7, scaleX: 0.80 },
  { name: 'matrix-acid', label: '矩阵光标', bg: '#051203', text: '#50FA7B', blur: 0.4, scaleX: 0.88 }
];

export const SLOGAN_POOL = [
  'brat',
  'so-brat',
  '360-designer',
  'alternative',
  'club-classics',
  'low-res',
  'anti-design',
  'synthesizer',
  'analog-clipping',
  'hyperpop',
  'acid-green',
  'subculture',
  'raw-energy',
  'bassline-heavy',
  'terminal-mode',
  'sensory-overload'
];
