import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Film, Image as ImageIcon, Layers, Filter, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';
import { fetchProjects } from '../services/api';
import CategoryFilter from '../components/CategoryFilter';
import ProjectCard from '../components/ProjectCard';
import VideoPlayerModal from '../components/VideoPlayerModal';

const ITEMS_PER_PAGE = 8;

const Pagination = ({ currentPage, totalPages, onPageChange, sectionTitle }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-purple-500/10">
      <span className="text-xs font-medium text-purple-300/80">
        Page <span className="text-white font-bold">{currentPage}</span> of{' '}
        <span className="text-white font-bold">{totalPages}</span>
        {sectionTitle ? ` (${sectionTitle})` : ''}
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Prev</span>
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                currentPage === pageNum
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 border border-purple-400/40'
                  : 'bg-dark-800/80 hover:bg-purple-900/40 text-purple-300 border border-purple-500/10'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

const Work = () => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [mediaView, setMediaView] = useState('all'); // 'all', 'photo', 'video'
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pagination states (8 items per page)
  const [photoPage, setPhotoPage] = useState(1);
  const [videoPage, setVideoPage] = useState(1);

  const photosSectionRef = useRef(null);
  const videosSectionRef = useRef(null);

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

  // Reset pagination when category filter changes
  useEffect(() => {
    setPhotoPage(1);
    setVideoPage(1);
  }, [activeCategory]);

  // Filter projects by active category
  const filteredByCategory = useMemo(() => {
    return projects.filter((p) => {
      if (activeCategory === 'All') return true;
      return p.category.toLowerCase() === activeCategory.toLowerCase();
    });
  }, [projects, activeCategory]);

  const allPhotoProjects = useMemo(() => {
    return filteredByCategory.filter((p) => p.mediaType === 'image');
  }, [filteredByCategory]);

  const allVideoProjects = useMemo(() => {
    return filteredByCategory.filter((p) => p.mediaType === 'video');
  }, [filteredByCategory]);

  // Pagination calculations: 8 items per page
  const photoTotalPages = Math.ceil(allPhotoProjects.length / ITEMS_PER_PAGE) || 1;
  const paginatedPhotos = useMemo(() => {
    const start = (photoPage - 1) * ITEMS_PER_PAGE;
    return allPhotoProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [allPhotoProjects, photoPage]);

  const videoTotalPages = Math.ceil(allVideoProjects.length / ITEMS_PER_PAGE) || 1;
  const paginatedVideos = useMemo(() => {
    const start = (videoPage - 1) * ITEMS_PER_PAGE;
    return allVideoProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [allVideoProjects, videoPage]);

  const handlePhotoPageChange = (newPage) => {
    setPhotoPage(newPage);
    if (photosSectionRef.current) {
      photosSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleVideoPageChange = (newPage) => {
    setVideoPage(newPage);
    if (videosSectionRef.current) {
      videosSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* PAGE HEADER */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          <span>Portfolio Archive</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white">
          3D Product Visualization & <span className="purple-gradient-text">Motion Portfolio</span>
        </h1>
        <p className="text-sm sm:text-base text-purple-200/90 max-w-2xl mx-auto">
          Explore photorealistic product renders and cinematic motion animations crafted with studio precision.
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-purple-500/20 bg-[#0c0816]/70 backdrop-blur-md">
        {/* Section View Tabs (All / Photos / Videos) */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-purple-950/50 border border-purple-500/20 self-start lg:self-center">
          <button
            type="button"
            onClick={() => setMediaView('all')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              mediaView === 'all'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40'
                : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>All Sections</span>
          </button>

          <button
            type="button"
            onClick={() => setMediaView('photo')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              mediaView === 'photo'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40'
                : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Photos ({allPhotoProjects.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setMediaView('video')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              mediaView === 'video'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40'
                : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Videos ({allVideoProjects.length})</span>
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="w-full lg:w-auto overflow-x-auto">
          <CategoryFilter activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
        </div>
      </div>

      {/* CONTENT SECTIONS */}
      {loading ? (
        <div className="py-24 text-center text-purple-400 font-semibold animate-pulse">
          Loading 3D portfolio showcase...
        </div>
      ) : (
        <div className="space-y-24">
          {/* ======================================================== */}
          {/* SEPARATE PHOTO SECTION */}
          {/* ======================================================== */}
          {(mediaView === 'all' || mediaView === 'photo') && (
            <section ref={photosSectionRef} className="space-y-8 scroll-mt-28">
              {/* Photo Section Heading */}
              <div className="border-b border-purple-500/20 pb-5 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest">
                  <ImageIcon className="w-4 h-4 text-purple-400" />
                  <span>3D Product Photography & Stills</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
                  Visual Work & <span className="purple-gradient-text">Product Renders</span>
                </h2>
                <p className="text-sm text-purple-200/80 max-w-3xl leading-relaxed">
                  Photorealistic 3D product visuals crafted with studio-grade lighting, hyper-detailed materials, and commercial elegance.
                </p>
              </div>

              {/* Photo Items Grid (4 items per row on desktop) */}
              {allPhotoProjects.length === 0 ? (
                <div className="p-12 text-center glass-panel rounded-2xl border border-purple-500/20 text-purple-300 text-sm">
                  No visual photo renders found under "{activeCategory}". Select another category.
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                    {paginatedPhotos.map((project) => (
                      <ProjectCard
                        key={project._id || project.id}
                        project={project}
                        onSelect={setSelectedProject}
                      />
                    ))}
                  </div>

                  {/* Pagination: Shows when more than 8 items */}
                  <Pagination
                    currentPage={photoPage}
                    totalPages={photoTotalPages}
                    onPageChange={handlePhotoPageChange}
                    sectionTitle="Photos"
                  />
                </div>
              )}
            </section>
          )}

          {/* ======================================================== */}
          {/* SEPARATE VIDEO SECTION */}
          {/* ======================================================== */}
          {(mediaView === 'all' || mediaView === 'video') && (
            <section ref={videosSectionRef} className="space-y-8 scroll-mt-28">
              {/* Video Section Heading */}
              <div className="border-b border-purple-500/20 pb-5 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest">
                  <Film className="w-4 h-4 text-purple-400" />
                  <span>Motion Design & Animation</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
                  Cinematic Motion & <span className="purple-gradient-text">Commercial Animation</span>
                </h2>
                <p className="text-sm text-purple-200/80 max-w-3xl leading-relaxed">
                  Dynamic 3D product animations, cinematic camera sweeps, and commercial teasers designed to bring products to life.
                </p>
              </div>

              {/* Video Items Grid (4 items per row on desktop) */}
              {allVideoProjects.length === 0 ? (
                <div className="p-12 text-center glass-panel rounded-2xl border border-purple-500/20 text-purple-300 text-sm">
                  No motion video projects found under "{activeCategory}". Select another category.
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                    {paginatedVideos.map((project) => (
                      <ProjectCard
                        key={project._id || project.id}
                        project={project}
                        onSelect={setSelectedProject}
                      />
                    ))}
                  </div>

                  {/* Pagination: Shows when more than 8 items */}
                  <Pagination
                    currentPage={videoPage}
                    totalPages={videoTotalPages}
                    onPageChange={handleVideoPageChange}
                    sectionTitle="Videos"
                  />
                </div>
              )}
            </section>
          )}
        </div>
      )}

      {/* Lightbox / Video Theater Modal */}
      {selectedProject && (
        <VideoPlayerModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};

export default Work;
