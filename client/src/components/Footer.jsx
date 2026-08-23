import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Youtube, MessageSquare, ArrowUpRight, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050508] border-t border-purple-500/10 pt-16 pb-12 relative overflow-hidden">
      {/* Ambient purple background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-purple-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-purple-500/10">
          {/* Col 1: Brand & Positioning */}
          <div className="md:col-span-2 space-y-4 text-left">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full overflow-hidden p-[1px] bg-gradient-to-br from-purple-400 to-purple-700 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
                <img
                  src="/assets/logo.png"
                  alt="N3D Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="font-heading font-extrabold text-white tracking-wide text-lg group-hover:text-purple-300 transition-colors">
                NOUMAN — 3D ARTIST
              </span>
            </Link>
            <p className="text-purple-200/70 text-sm max-w-md leading-relaxed">
              3D Product Visualization Artist creating high-quality product visuals and animations that help brands showcase products with impact.
            </p>

            {/* Direct WhatsApp Contact Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/923000000000?text=Hello%20Nouman,%20I'm%20interested%20in%203D%20Product%20Visualization"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-all group"
              >
                <MessageSquare className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-purple-400">Navigation</h4>
            <ul className="space-y-2 text-sm text-purple-200/80">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Me</Link></li>
              <li><Link to="/work" className="hover:text-white transition-colors">My Work</Link></li>
              <li><a href="/#services" className="hover:text-white transition-colors">Services</a></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Social Profiles & Direct Mail */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-purple-400">Connect</h4>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2.5 rounded-full bg-purple-950/50 hover:bg-purple-600/30 border border-purple-500/20 text-purple-300 hover:text-white transition-all hover:scale-110"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-full bg-purple-950/50 hover:bg-purple-600/30 border border-purple-500/20 text-purple-300 hover:text-white transition-all hover:scale-110"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="p-2.5 rounded-full bg-purple-950/50 hover:bg-purple-600/30 border border-purple-500/20 text-purple-300 hover:text-white transition-all hover:scale-110"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
            <div className="pt-2">
              <a
                href="mailto:nouman3dvisuals@gmail.com"
                className="inline-flex items-center gap-2 text-xs text-purple-300 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>nouman3dvisuals@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-400/60">
          <p>© {new Date().getFullYear()} NOUMAN — 3D ARTIST. All rights reserved.</p>
          <p className="text-[11px]">
            High-Impact 3D Product Visualization & Animation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
