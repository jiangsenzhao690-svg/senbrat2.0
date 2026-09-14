import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, ArrowUpRight, Search, Eye, Filter, Sparkles } from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { ProjectVisual } from './ProjectVisuals';
import { ProjectModal } from './ProjectModal';

export const Works: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all' as ProjectCategory, label: 'all.全部作品' },
    { id: 'web' as ProjectCategory, label: 'code.技术渲染' },
    { id: 'design' as ProjectCategory, label: 'type.平面排版' },
    { id: 'art' as ProjectCategory, label: 'art.视觉表达' },
    { id: 'audio' as ProjectCategory, label: 'dsp.声音交互' }
  ];

  const filteredProjects = PROJECTS.filter((proj) => {
    const matchesCategory = activeCategory === 'all' || proj.category === activeCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      proj.title.toLowerCase().includes(query) ||
      proj.subtitle.toLowerCase().includes(query) ||
      proj.tags.some((t) => t.toLowerCase().includes(query)) ||
      proj.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="works" className="py-24 bg-[#0A0B08] border-b-2 border-[#9ACD32] relative">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#9ACD32]/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[#9ACD32] uppercase tracking-[0.3em] text-xs flex items-center gap-2 font-semibold">
              <Code className="w-3.5 h-3.5" />
              <span>[ SELECTED WORK INDEX // 作品集合 ]</span>
            </span>
            <h2 className="font-brat text-4xl sm:text-6xl text-white tracking-tighter mt-3 uppercase text-blur-sm">
              works.作品展示
            </h2>
            <p className="font-mono text-xs text-gray-400 mt-2 max-w-lg leading-relaxed">
              汇集 3D 渲染、前卫平面排版、交互式 WebGL 与 DSP 声音工程的实验性商业作品。点击任意卡片展开完整设计白皮书。
            </p>
          </motion.div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tags or title..."
                className="bg-[#141614] border border-[#9ACD32]/30 focus:border-[#9ACD32] text-white font-mono text-xs pl-8 pr-3 py-2 rounded-none focus:outline-none w-full sm:w-56"
              />
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-2 font-brat text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-[#9ACD32] text-black border-transparent font-bold text-blur-xs scale-105 shadow-sm'
                        : 'bg-[#141614] text-gray-400 hover:text-white border border-[#9ACD32]/20 hover:border-[#9ACD32]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-[#9ACD32]/20 p-8">
            <p className="font-mono text-xs text-gray-400 uppercase tracking-widest">
              [ 未匹配到符合条件的作品数据 // NO CORRESPONDING PROJECT FOUND ]
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#9ACD32] text-black font-brat text-xs uppercase font-bold"
            >
              RESET FILTERS / 重置筛选
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className="group relative flex flex-col justify-between bg-[#141614] border-2 border-transparent hover:border-[#9ACD32] p-5 sm:p-7 transition-all duration-300 rounded-none shadow-lg hover:shadow-[0_0_30px_rgba(154,205,50,0.12)]"
                >
                  {/* Subtle diagonal pinstripe */}
                  <div
                    className="absolute inset-0 opacity-[0.02] bg-repeat pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-300"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 12px)'
                    }}
                  />

                  <div className="space-y-5 relative">
                    {/* Visual stage */}
                    <div
                      onClick={() => setSelectedProject(project)}
                      className="cursor-pointer overflow-hidden border border-gray-800 group-hover:border-[#9ACD32]/50 transition-colors"
                      title="Click to expand case study"
                    >
                      <ProjectVisual image={project.image} />
                    </div>

                    {/* Metadata strip */}
                    <div className="flex items-center justify-between border-b border-gray-800 pb-2.5">
                      <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                        NO.{project.id.split('-')[1]} // CLASS: {project.category.toUpperCase()}
                      </span>
                      <span className="font-mono text-xs text-[#9ACD32] font-bold">
                        {project.year}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="space-y-1.5">
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className="font-brat text-2xl sm:text-3xl text-white tracking-tight uppercase group-hover:text-[#9ACD32] origin-left duration-200 transition-all text-blur-xs cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      <p className="font-mono text-xs text-gray-400 uppercase tracking-wide">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Description preview */}
                    <p className="font-mono text-xs text-gray-300 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] text-gray-400 bg-black/60 border border-gray-800 px-2 py-0.5 uppercase"
                        >
                          #{tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="font-mono text-[9px] text-[#9ACD32] bg-[#9ACD32]/10 px-1.5 py-0.5">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-5 mt-5 border-t border-gray-800/80 relative z-10">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 font-brat text-xs text-[#9ACD32] hover:text-white uppercase tracking-wider cursor-pointer font-bold"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>CASE STUDY / 详情</span>
                    </button>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-gray-400 hover:text-[#9ACD32] hover:bg-[#9ACD32]/10 transition-colors"
                      title="Open source"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Modal View */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
