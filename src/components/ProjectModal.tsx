import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Sparkles, Layers, Cpu, Compass } from 'lucide-react';
import { Project } from '../types';
import { ProjectVisual } from './ProjectVisuals';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-[#111310] border-2 border-[#9ACD32] shadow-[0_0_50px_rgba(154,205,50,0.18)] p-5 sm:p-8 text-white overflow-hidden max-h-[90vh] flex flex-col my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top terminal banner */}
          <div className="flex items-center justify-between border-b border-[#9ACD32]/30 pb-3 mb-6">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-[#9ACD32] inline-block animate-ping" />
              <span className="font-mono text-xs text-[#9ACD32] tracking-wider uppercase font-semibold">
                ARCHIVE.FILE: {project.id.toUpperCase()} // CLASS: {project.category.toUpperCase()}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-[#9ACD32]/20 rounded-none transition-colors cursor-pointer"
              title="Close modal (Esc)"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto pr-1 space-y-6 flex-1">
            {/* Project Visual Stage */}
            <div className="rounded-sm overflow-hidden border border-[#9ACD32]/30">
              <ProjectVisual image={project.image} />
            </div>

            {/* Header info */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h2 className="font-brat text-3xl sm:text-4xl text-white tracking-tight uppercase text-blur-xs">
                  {project.title}
                </h2>
                <span className="font-mono text-sm text-[#9ACD32] font-bold border border-[#9ACD32]/40 px-2 py-0.5">
                  {project.year}
                </span>
              </div>
              <p className="font-mono text-xs sm:text-sm text-gray-300 uppercase tracking-wide">
                {project.subtitle}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-3 font-mono text-xs text-gray-300 leading-relaxed bg-[#0c0d0c] p-4 border-l-2 border-[#9ACD32]">
              <div className="flex items-center gap-1.5 text-[#9ACD32] text-[11px] uppercase font-bold">
                <Compass className="w-3.5 h-3.5" />
                <span>创作背景与视觉哲学</span>
              </div>
              <p>{project.description}</p>
              {project.conceptDetails && (
                <p className="text-gray-400 border-t border-gray-800/80 pt-2 italic">
                  “{project.conceptDetails}”
                </p>
              )}
            </div>

            {/* Technical Stats Grid if available */}
            {project.stats && project.stats.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-400 uppercase">
                  <Cpu className="w-3.5 h-3.5 text-[#9ACD32]" />
                  <span>核心工程参数 (Specification)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {project.stats.map((stat, idx) => (
                    <div key={idx} className="bg-[#181a17] border border-gray-800 p-2.5">
                      <span className="block font-mono text-[9px] text-gray-500 uppercase">{stat.label}</span>
                      <span className="block font-brat text-sm sm:text-base text-[#9ACD32] tracking-tight">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tools and Tags */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-400 uppercase">
                <Layers className="w-3.5 h-3.5 text-[#9ACD32]" />
                <span>技术栈与工具体系</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] text-gray-300 bg-[#1e221b] border border-[#9ACD32]/20 px-2.5 py-1 uppercase"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Client & Role */}
            {(project.client || project.role) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-gray-800/80 text-xs font-mono">
                {project.client && (
                  <div>
                    <span className="text-gray-500 uppercase text-[10px] block">合作/委约方 (Origin)</span>
                    <span className="text-gray-200">{project.client}</span>
                  </div>
                )}
                {project.role && (
                  <div>
                    <span className="text-gray-500 uppercase text-[10px] block">核心角色 (Role)</span>
                    <span className="text-[#9ACD32] font-semibold">{project.role}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-gray-800/80 mt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <span className="font-mono text-[10px] text-gray-500 uppercase">
              SECTOR 360 // VERIFIED ACID SYSTEM
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#9ACD32] hover:bg-white text-black font-brat text-xs uppercase tracking-wider transition-colors font-bold"
              >
                <span>OPEN REPOSITORY</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 border border-gray-700 hover:border-gray-500 font-mono text-xs uppercase text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
