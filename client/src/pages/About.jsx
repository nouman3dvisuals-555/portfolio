import React from 'react';
import { Link } from 'react-router-dom';
import { User, Award, CheckCircle2, ArrowRight, MessageSquare, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* PAGE HEADER */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest">
          <User className="w-3.5 h-3.5" />
          <span>Professional Background</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
          About <span className="gold-gradient-text">Nouman</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          3D Product Visualization Specialist bridging creative art direction with technical CGI engineering.
        </p>
      </div>

      {/* BIOGRAPHY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        {/* Profile Card / Visual Accent */}
        <div className="md:col-span-5 relative">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 relative z-10 space-y-6">
            <div className="aspect-square rounded-2xl overflow-hidden bg-dark-900 border border-white/10 relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
                alt="Nouman 3D Product Visualization Specialist"
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-bold text-white font-heading">Nouman</h3>
                <p className="text-xs text-gold-400 font-medium">3D Product Visualization Specialist</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-500">Specialization:</span>
                <span className="text-white font-medium">Luxury Product CGI & Motion</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-500">Primary Post Tool:</span>
                <span className="text-white font-medium">DaVinci Resolve Studio</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Availability:</span>
                <span className="text-emerald-400 font-semibold">Open for Commissions & Remote Roles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & Positioning */}
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Philosophy & Identity</span>
            <h2 className="text-3xl font-extrabold font-heading text-white">
              Precision Realism for High-Impact Product Visuals
            </h2>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">
            I specialize in transforming physical products into photorealistic digital assets. By replacing traditional costly studio photography setups with CGI, brands gain complete control over lighting, angles, materials, liquid physics, and motion animation.
          </p>

          <p className="text-slate-300 text-sm leading-relaxed">
            My work spans across luxury fragrances, skincare bottles, premium beverages, watches, and consumer electronics. Every project is meticulously built from accurate CAD dimensions or reference specifications, applying physically based materials and cinematic studio lighting.
          </p>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Core Value Pillars</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>Pixel-Perfect Photorealism</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>Cinematic DaVinci Color Grade</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>Transparent Milestone Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>On-Time Launch Delivery</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-900 font-bold text-xs shadow-lg shadow-gold-500/20 transition-all flex items-center gap-2"
            >
              <span>Work With Me</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/923000000000?text=Hi%20Nouman,%20let's%20connect"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
