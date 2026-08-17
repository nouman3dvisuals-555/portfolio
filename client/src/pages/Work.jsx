import React, { useState, useEffect } from 'react';
import { Sparkles, Film, Image as ImageIcon, Layers, Filter } from 'lucide-react';
import { fetchProjects } from '../services/api';
import CategoryFilter from '../components/CategoryFilter';
import ProjectCard from '../components/ProjectCard';
import VideoPlayerModal from '../components/VideoPlayerModal';

const Work = () => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllProjects = async () => {
      setLoading(true);
      try {
        const res = await fetchProjects();
        if (res.success && res.data) {
          setProjects(res.data);
        }
      } catch (err) {
        console.error('Failed to load portfolio projects:', err);
      } finally {
        setLoading(false);
      }
    };
    loadAllProjects();
  }, []);

  // Filter projects by activeCategory
  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.category.toLowerCase() === activeCategory.toLowerCase();
  });

  // Separate into Image Projects and Video Projects
  const imageProjects = filteredProjects.filter((p) => p.mediaType === 'image');
  const videoProjects = filteredProjects.filter((p) => p.mediaType === 'video');

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* PAGE HEADER */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest">
          <Layers className="w-3.5 h-3.5" />
          <span>Portfolio Archive</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-purple-100">
          3D Product Visualization & <span className="gold-gradient-text">Motion Portfolio</span>
        </h1>
        <p className="text-sm sm:text-base text-purple-200">
          Explore static product renders and cinematic motion animations crafted with studio realism.
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-purple-500/20">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider pl-2">
          <Filter className="w-4 h-4 text-purple-400" />
          <span>Filter Category:</span>
        </div>
        <div className="w-full md:w-auto">
          <CategoryFilter activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-purple-400 animate-pulse">Loading portfolio projects...</div>
      ) : (
        <div className="space-y-20">
          {/* SECTION 01 — VISUAL WORK (Image Projects) */}
          <section className="space-y-8">
            <div className="border-b border-purple-500/20 pb-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest">
                <ImageIcon className="w-4 h-4" />
                <span>Section 01</span>
              </div>
              <h2 className="text-3xl font-extrabold font-heading text-purple-100">
                Visual Work
              </h2>
              <p className="text-sm text-purple-300 max-w-2xl leading-relaxed">
                A collection of photorealistic product visuals created to showcase products with precision, realism and impact.
              </p>
            </div>

            {imageProjects.length === 0 ? (
              <div className="p-12 text-center glass-panel rounded-2xl border border-white/5 text-slate-400 text-sm">
                No visual image projects found under "{activeCategory}". Select another category.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {imageProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} onSelect={setSelectedProject} />
                ))}
              </div>
            )}
          </section>

          {/* SECTION 02 — MOTION & ANIMATION (Video Projects) */}
          <section className="space-y-8">
            <div className="border-b border-purple-500/20 pb-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest">
                <Film className="w-4 h-4" />
                <span>Section 02</span>
              </div>
              <h2 className="text-3xl font-extrabold font-heading text-purple-100">
                Motion & Animation
              </h2>
              <p className="text-sm text-purple-300 max-w-2xl leading-relaxed">
                Cinematic product animations and visual presentations designed to bring products to life.
              </p>
            </div>

            {videoProjects.length === 0 ? (
              <div className="p-12 text-center glass-panel rounded-2xl border border-white/5 text-slate-400 text-sm">
                No motion video projects found under "{activeCategory}". Select another category.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {videoProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} onSelect={setSelectedProject} />
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedProject && (
        <VideoPlayerModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};

export default Work;
