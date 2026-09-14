export type ProjectCategory = 'all' | 'web' | 'design' | 'art' | 'audio';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'web' | 'design' | 'art' | 'audio';
  tags: string[];
  description: string;
  color: string;
  year: string;
  link: string;
  image: 'collage' | 'rave-android' | 'studio-android' | 'brat-chair' | 'synth' | 'audio-filter';
  client?: string;
  role?: string;
  tools?: string[];
  conceptDetails?: string;
  stats?: { label: string; value: string }[];
}

export interface SkillItem {
  name: string;
  level: number;
  category: 'Code' | 'Vibe' | 'Audio';
}

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  energyLevel: string;
  bpm: number;
  freq: number;
}

export interface MessageLog {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface ColorwayPreset {
  name: string;
  label: string;
  bg: string;
  text: string;
  blur: number;
  scaleX: number;
}
