import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Youtube, MessageSquare, ArrowUpRight, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-900 border-t border-white/5 pt-16 pb-12 relative overflow-hidden">
      {/* Glow Ambient background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gold-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Col 1: Brand & Positioning */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-400 to-amber-700 p-[1px]">
                <div className="w-full h-full bg-dark-900 rounded-[11px] flex items-center justify-center">
                  <span className="font-heading font-extrabold text-sm text-gold-400">N3D</span>
                </div>
              </div>
              <span className="font-heading font-bold text-white tracking-wide text-lg">
                NOUMAN — 3D VISUALS
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Premium 3D Product Visualization & Cinematic Motion Specialist. Bringing products to life with photorealistic rendering, precision lighting, and high-impact visual storytelling.
            </p>

            {/* Direct WhatsApp Contact Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/923000000000?text=Hello%20Nouman,%20I'm%20interested%20in%203D%20Product%20Visualization"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold transition-all group"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/work" className="hover:text-white transition-colors">Visual Work & Motion</Link></li>
              <li><Link to="/expertise" className="hover:text-white transition-colors">Technical Expertise</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Nouman</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact & Inquiry</Link></li>
            </ul>
          </div>

          {/* Col 3: Social Profiles & Direct Mail */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">Connect</h4>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-gold-500/10 border border-white/10 hover:border-gold-500/30 text-slate-300 hover:text-gold-400 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-gold-500/10 border border-white/10 hover:border-gold-500/30 text-slate-300 hover:text-gold-400 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-gold-500/10 border border-white/10 hover:border-gold-500/30 text-slate-300 hover:text-gold-400 transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
            <div className="pt-2">
              <a
                href="mailto:nouman3dvisuals@gmail.com"
                className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-gold-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-gold-400" />
                <span>nouman3dvisuals@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} N3D — Nouman. All rights reserved.</p>
          <p className="text-[11px] text-slate-600">
            Crafted for Premium Brands, Art Directors & Recruiters worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
