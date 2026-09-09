import React, { useState, useRef } from 'react';
import { Play, Eye, Film, Image as ImageIcon, Maximize2, X } from 'lucide-react';

const resolveMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl && url.startsWith('/')) {
    return `${apiUrl.replace(/\/$/, '')}${url}`;
  }
  return url;
};

const ProjectCard = ({ project, onSelect }) => {
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const [hasMediaError, setHasMediaError] = useState(false);
  const videoRef = useRef(null);
  const isVideo = project.mediaType === 'video';

  const mediaUrl = resolveMediaUrl(project.mediaUrl);
  const thumbnailUrl = resolveMediaUrl(project.thumbnailUrl);

  const handleMediaBoxClick = (e) => {
    if (isVideo) {
      if (!isPlayingInline) {
        setIsPlayingInline(true);
      }
    } else {
      onSelect(project);
    }
  };

  const handleStopInline = (e) => {
    e.stopPropagation();
    setIsPlayingInline(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleExpandModal = (e) => {
    e.stopPropagation();
    onSelect(project);
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-400/50 transition-all duration-500 flex flex-col group hover:-translate-y-1 shadow-lg shadow-purple-950/20 bg-[#0e0a16]/90">
      {/* Media Box */}
      <div 
        className="aspect-[16/10] sm:aspect-[16/9] w-full bg-dark-900 relative overflow-hidden cursor-pointer"
        onClick={handleMediaBoxClick}
      >
        {isPlayingInline && isVideo ? (
          <div className="w-full h-full relative bg-black flex items-center justify-center">
            <video
              ref={videoRef}
              src={mediaUrl}
              autoPlay
              controls
              playsInline
              className="w-full h-full object-contain"
              onEnded={() => setIsPlayingInline(false)}
            />
            <div className="absolute top-2 right-2 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={handleExpandModal}
                className="p-1.5 rounded-lg bg-black/70 hover:bg-purple-600 text-white transition-colors"
                title="Open full view"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleStopInline}
                className="p-1.5 rounded-lg bg-black/70 hover:bg-rose-600 text-white transition-colors"
                title="Stop video"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <>
            {hasMediaError ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#160f26] via-[#0e0a16] to-[#07050d] border border-purple-500/20">
                <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center mb-2 shadow-lg shadow-purple-950/50">
                  {isVideo ? <Film className="w-6 h-6 text-purple-400" /> : <ImageIcon className="w-6 h-6 text-purple-400" />}
                </div>
                <span className="text-xs font-bold text-white font-heading line-clamp-1">{project.title}</span>
                <span className="text-[10px] text-purple-300/70 mt-1 uppercase tracking-wider">{project.category}</span>
              </div>
            ) : isVideo && (!thumbnailUrl || thumbnailUrl === mediaUrl || thumbnailUrl.endsWith('.mp4') || thumbnailUrl.endsWith('.webm')) ? (
              <video
                src={`${mediaUrl}#t=0.001`}
                preload="metadata"
                muted
                playsInline
                onError={() => setHasMediaError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            ) : (
              <img
                src={thumbnailUrl || mediaUrl}
                alt={project.title}
                onError={() => setHasMediaError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            )}

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dark-900/80 backdrop-blur-md border border-purple-500/20 text-[10px] font-bold text-purple-300 uppercase tracking-wider">
                {isVideo ? <Film className="w-3 h-3 text-purple-400" /> : <ImageIcon className="w-3 h-3 text-purple-400" />}
                {project.category}
              </span>

              <div className="flex items-center gap-1.5">
                {isVideo && project.duration && (
                  <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-semibold text-purple-200 font-mono border border-white/5">
                    {project.duration}
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleExpandModal}
                  className="p-1.5 rounded-lg bg-dark-900/80 hover:bg-purple-600 text-purple-300 hover:text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all"
                  title="Expand to full screen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Center Play Icon / Eye Icon Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
              {isVideo ? (
                <div className="flex flex-col items-center gap-2 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-xl shadow-purple-600/50 border border-purple-400/40">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-dark-900/90 border border-purple-500/30 text-[10px] font-semibold text-purple-200 shadow-md">
                    Click to Play
                  </span>
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-dark-900/80 backdrop-blur-md border border-purple-500/30 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <Eye className="w-5 h-5 text-purple-300" />
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Content Meta */}
      <div
        onClick={handleExpandModal}
        className="p-4 sm:p-5 flex flex-col flex-grow justify-between space-y-3 cursor-pointer"
      >
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs text-purple-200/70 mt-1 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="pt-2 border-t border-purple-500/10 flex items-center justify-between text-[11px] text-purple-400">
          <span className="capitalize">{project.mediaType} Showcase</span>
          <span className="group-hover:text-purple-300 font-semibold transition-colors flex items-center gap-1">
            {isVideo ? 'Watch & Details' : 'View Image'} &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
