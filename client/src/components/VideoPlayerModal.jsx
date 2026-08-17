import React, { useEffect } from 'react';
import { X, Film, Sparkles, Calendar, Tag, ExternalLink } from 'lucide-react';

const VideoPlayerModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const isVideo = project.mediaType === 'video';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Window */}
      <div className="relative z-10 w-full max-w-5xl bg-dark-800 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-dark-900/60">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-xs text-slate-400 font-medium capitalize">
              {project.mediaType} Portfolio
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-grow">
          {/* Media Player Container */}
          <div className="bg-black relative flex items-center justify-center min-h-[300px] max-h-[65vh]">
            {isVideo ? (
              <video
                src={project.mediaUrl}
                controls
                autoPlay
                className="w-full max-h-[65vh] object-contain"
                poster={project.thumbnailUrl}
              >
                Your browser does not support HTML5 video playback.
              </video>
            ) : (
              <img
                src={project.mediaUrl}
                alt={project.title}
                className="w-full max-h-[65vh] object-contain"
              />
            )}
          </div>

          {/* Project Details */}
          <div className="p-6 md:p-8 space-y-4 bg-dark-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white font-heading">
                  {project.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-gold-400" />
                    {project.category}
                  </span>
                  {isVideo && project.duration && (
                    <span>Duration: {project.duration}</span>
                  )}
                </div>
              </div>

              <a
                href={project.mediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors"
              >
                <span>Open Full Asset</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
              </a>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Project Overview & Specifications
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerModal;
