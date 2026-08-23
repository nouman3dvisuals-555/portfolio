import React from 'react';
import { Link } from 'react-router-dom';
import { User, CheckCircle2, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* PAGE HEADER */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>ABOUT ME</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
          About <span className="purple-gradient-text">Nouman</span>
        </h1>
        <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed">
          3D Product Visualization Specialist bridging high-end CGI photorealism with commercial brand impact.
        </p>
      </div>

      {/* BIOGRAPHY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        {/* Profile Card */}
        <div className="md:col-span-5 relative">
          <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 bg-[#0e0a16]/90 relative z-10 space-y-6 shadow-2xl shadow-purple-950/50">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-dark-900 border border-purple-500/20 relative group">
              <img
                src="/assets/nouman-profile.jpg"
                alt="Nouman 3D Product Visualization Specialist"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <h3 className="text-lg font-bold text-white font-heading">Nouman</h3>
                <p className="text-xs text-purple-400 font-semibold">3D Product Visualization Artist</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-purple-200/80">
              <div className="flex justify-between py-1 border-b border-purple-500/10">
                <span className="text-purple-400/70 font-medium">Specialization:</span>
                <span className="text-white font-semibold">3D Product CGI & Motion</span>
              </div>
              <div className="flex justify-between py-1 border-b border-purple-500/10">
                <span className="text-purple-400/70 font-medium">Experience:</span>
                <span className="text-white font-semibold">2+ Years</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-purple-400/70 font-medium">Availability:</span>
                <span className="text-emerald-400 font-bold">Open for Freelance & Remote Work</span>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & Positioning */}
        <div className="md:col-span-7 space-y-6 text-left">
          <div className="space-y-3">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Philosophy & Mission</span>
            <h2 className="text-3xl font-extrabold font-heading text-white">
              Crafting Visuals That <span className="text-purple-400">Sell.</span>
            </h2>
          </div>

          <p className="text-purple-200/90 text-sm leading-relaxed">
            I'm a 3D product visualization artist who helps brands present their products in the best possible way. From realistic renders to engaging animations, I focus on quality, detail and visuals that connect.
          </p>

          <p className="text-purple-200/90 text-sm leading-relaxed">
            Every product visualization project is crafted with studio precision: from precise 3D modeling and physically accurate materials to cinematic lighting and compositing.
          </p>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">Core Principles</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-purple-200">
              <div className="glass-panel p-3 rounded-xl border border-purple-500/20 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Detail Oriented</span>
              </div>
              <div className="glass-panel p-3 rounded-xl border border-purple-500/20 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>High Quality Renders</span>
              </div>
              <div className="glass-panel p-3 rounded-xl border border-purple-500/20 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>On Time Delivery</span>
              </div>
              <div className="glass-panel p-3 rounded-xl border border-purple-500/20 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Client Focused Approach</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2"
            >
              <span>Let's Work Together</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/923000000000?text=Hi%20Nouman,%20let's%20connect"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-purple-950/40 hover:bg-purple-900/40 border border-purple-500/30 text-xs font-semibold text-purple-200 transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-purple-400" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
