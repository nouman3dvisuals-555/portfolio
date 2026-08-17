import React from 'react';
import { Play, Eye, Sparkles, Film, Image as ImageIcon } from 'lucide-react';

const ProjectCard = ({ project, onSelect }) => {
  const isVideo = project.mediaType === 'video';

  return (
    <div
      onClick={() => onSelect(project)}
      className="group cursor-pointer glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col h-full border border-white/10 hover:border-gold-500/40 transition-all duration-300 relative"
    >
      {/* Media Box */}
      <div className="relative aspect-[16/10] overflow-hidden bg-dark-900">
        {isVideo && (!project.thumbnailUrl || project.thumbnailUrl === project.mediaUrl || project.thumbnailUrl.endsWith('.mp4') || project.thumbnailUrl.endsWith('.webm')) ? (
          <video
            src={`${project.mediaUrl}#t=0.001`}
            preload="metadata"
            muted
            playsInline
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <img
            src={project.thumbnailUrl || project.mediaUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        )}

        {/* Overlay Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-900/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-gold-400 uppercase tracking-wider">
            {isVideo ? <Film className="w-3 h-3 text-gold-400" /> : <ImageIcon className="w-3 h-3 text-gold-400" />}
            {project.category}
          </span>

          {isVideo && project.duration && (
            <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-semibold text-slate-300 font-mono">
              {project.duration}
            </span>
          )}
        </div>

        {/* Play Icon / View Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {isVideo ? (
            <div className="w-14 h-14 rounded-full bg-gold-500/90 text-dark-900 flex items-center justify-center shadow-xl shadow-gold-500/30 group-hover:scale-110 transition-transform duration-300">
              <Play className="w-6 h-6 fill-dark-900 ml-1" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-dark-900/80 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <Eye className="w-5 h-5 text-gold-400" />
            </div>
          )}
        </div>
      </div>

      {/* Content Meta */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-gold-400 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
          <span className="capitalize">{project.mediaType} Project</span>
          <span className="group-hover:text-gold-400 font-semibold transition-colors flex items-center gap-1">
            View Details &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
