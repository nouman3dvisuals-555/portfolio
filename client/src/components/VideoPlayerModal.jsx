import React, { useEffect, useRef, useState } from 'react';
import { X, Film, Sparkles, Calendar, Tag, ExternalLink, Volume2, VolumeX } from 'lucide-react';

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

const VideoPlayerModal = ({ project, onClose }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const [hasError, setHasError] = useState(false);
  const isVideo = project?.mediaType === 'video';
  const mediaUrl = resolveMediaUrl(project?.mediaUrl);
  const thumbnailUrl = resolveMediaUrl(project?.thumbnailUrl);

  // Guarantee instant video playback with browser autoplay policy handling
  useEffect(() => {
    if (isVideo && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser restricts unmuted autoplay, mute and resume
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  }, [isVideo, mediaUrl]);

  if (!project) return null;

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Window */}
      <div className="relative z-10 w-full max-w-5xl bg-[#0e0a16] border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/80 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/20 bg-[#09060f]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-xs text-purple-200/80 font-medium capitalize">
              {project.mediaType} Portfolio
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isVideo && (
              <button
                type="button"
                onClick={toggleMute}
                className="p-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 hover:text-white border border-purple-500/20 transition-colors"
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-purple-400" /> : <Volume2 className="w-4 h-4 text-purple-300" />}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-purple-600 text-purple-300 hover:text-white transition-colors border border-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-grow">
          {/* Media Player Container */}
          <div className="bg-black relative flex items-center justify-center min-h-[300px] max-h-[65vh]">
            {hasError ? (
              <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center space-y-3 bg-[#0e0a16] w-full min-h-[280px]">
                <div className="w-14 h-14 rounded-2xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-950/50">
                  {isVideo ? <Film className="w-7 h-7" /> : <ImageIcon className="w-7 h-7" />}
                </div>
                <h3 className="text-white font-bold text-base font-heading">Media Asset Temporarily Unavailable</h3>
                <p className="text-xs text-purple-300/80 max-w-md leading-relaxed">
                  This media file may have been stored on an ephemeral server disk that restarted. Configure Cloudinary in the server environment or update the project with a permanent direct asset link in the Admin panel.
                </p>
              </div>
            ) : isVideo ? (
              <video
                ref={videoRef}
                src={mediaUrl}
                controls
                autoPlay
                playsInline
                onError={() => setHasError(true)}
                className="w-full max-h-[65vh] object-contain"
                poster={thumbnailUrl || undefined}
              >
                Your browser does not support HTML5 video playback.
              </video>
            ) : (
              <img
                src={mediaUrl}
                alt={project.title}
                onError={() => setHasError(true)}
                className="w-full max-h-[65vh] object-contain"
              />
            )}
          </div>

          {/* Project Details */}
          <div className="p-6 md:p-8 space-y-4 bg-[#0e0a16]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-500/20 pb-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white font-heading">
                  {project.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-purple-300 mt-1">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-purple-400" />
                    {project.category}
                  </span>
                  {isVideo && project.duration && (
                    <span className="text-purple-300">Duration: {project.duration}</span>
                  )}
                </div>
              </div>

              <a
                href={mediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-600 border border-purple-500/30 text-xs font-semibold text-white transition-colors"
              >
                <span>Open Full Asset</span>
                <ExternalLink className="w-3.5 h-3.5 text-purple-300" />
              </a>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">
                Project Overview & Specifications
              </h4>
              <p className="text-purple-200/90 text-sm leading-relaxed whitespace-pre-line">
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
