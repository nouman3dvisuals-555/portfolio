import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Image as ImageIcon, Layers, Cpu, Video, ShieldCheck, MessageSquare } from 'lucide-react';

const Home = () => {

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Glow ambient spots */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-purple-500/15 blur-[140px] pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-purple-500/10">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>3D Product Visualization Specialist</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.1] font-heading text-purple-100">
            Elevating Physical Products into <span className="purple-gradient-text">Photorealistic 3D Experiences</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-purple-200 max-w-2xl mx-auto font-normal leading-relaxed">
            Crafting luxury static imagery and cinematic product animations for brands, creative directors, and agencies worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/work"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-600 text-purple-950 font-bold text-sm shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Explore Portfolio Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel hover:bg-purple-900/30 text-purple-200 font-semibold text-sm border border-purple-500/30 hover:border-purple-400 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Request Project Inquiry</span>
            </Link>
          </div>

          {/* Key Metric Pills */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="glass-panel p-4 rounded-2xl border border-purple-500/20">
              <span className="text-2xl font-extrabold text-purple-400 font-heading">100%</span>
              <p className="text-xs text-purple-300 mt-1">CGI Photorealism Precision</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-purple-500/20">
              <span className="text-2xl font-extrabold text-purple-200 font-heading">DaVinci</span>
              <p className="text-xs text-purple-300 mt-1">Color Grading & Compositing</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-purple-500/20">
              <span className="text-2xl font-extrabold text-purple-400 font-heading">4K UHD</span>
              <p className="text-xs text-purple-300 mt-1">Cinematic Render Resolution</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-purple-500/20">
              <span className="text-2xl font-extrabold text-purple-200 font-heading">AI-Enhanced</span>
              <p className="text-xs text-purple-300 mt-1">Efficient Creative Workflow</p>
            </div>
          </div>
        </div>
      </section>

      {/* SLEEK SKILLS & INDUSTRY TOOLS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Tools & Technical Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-purple-100">
            Core Skills & Industry Software
          </h2>
          <p className="text-sm text-purple-300 leading-relaxed">
            Leveraging industry-standard 3D suites, physically-based render engines, and post-production software.
          </p>
        </div>

        {/* Software & Tools Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 hover:border-purple-400 transition-all text-center space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-300 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-sm font-bold text-purple-100">Blender</h3>
            <p className="text-[11px] text-purple-300">3D Modeling, Cycles Render Engine & Geometry Nodes</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 hover:border-purple-400 transition-all text-center space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-300 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-sm font-bold text-purple-100">Cinema 4D</h3>
            <p className="text-[11px] text-purple-300">Commercial Visualization, Octane & Redshift Renders</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 hover:border-purple-400 transition-all text-center space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-300 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
              <Video className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-sm font-bold text-purple-100">DaVinci Resolve</h3>
            <p className="text-[11px] text-purple-300">ACES Color Grading, Compositing & Video Post</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 hover:border-purple-400 transition-all text-center space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-300 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
              <ImageIcon className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-sm font-bold text-purple-100">Substance Painter</h3>
            <p className="text-[11px] text-purple-300">PBR Texturing, UV Maps & Micro-Surface Roughness</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 hover:border-purple-400 transition-all text-center space-y-3 group col-span-2 sm:col-span-1">
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-300 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-sm font-bold text-purple-100">AI Creative Workflow</h3>
            <p className="text-[11px] text-purple-300">HDRI Generation, Texture Synthesis & Rapid Lookdev</p>
          </div>
        </div>

        {/* Skill Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto pt-2">
          {[
            'Glass Refraction & Liquid Caustics',
            'Subsurface Scattering (SSS)',
            'Studio Rim & Softbox Lighting',
            'Product Splash Physics',
            '4K UHD Render Master',
            'Exploded Product View'
          ].map((tag, idx) => (
            <span key={idx} className="px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs font-medium">
              ✨ {tag}
            </span>
          ))}
        </div>
      </section>

      {/* CORE EXPERTISE & CAPABILITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-purple-500/20 space-y-10 relative overflow-hidden">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Specialized Capabilities</span>
            <h2 className="text-3xl font-extrabold font-heading text-purple-100">
              Full-Stack 3D Production Pipeline
            </h2>
            <p className="text-sm text-purple-300 leading-relaxed">
              From raw product CAD/dimensions to final color-graded commercials, every asset is crafted with meticulous attention to realism.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2 p-5 rounded-2xl bg-dark-800/90 border border-purple-500/15">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-purple-100">3D Modeling & CAD Clean</h3>
              <p className="text-xs text-purple-300 leading-relaxed">
                Precision topology for perfume bottles, tech gadgets, watches, and complex skincare packaging.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-dark-800/90 border border-purple-500/15">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-purple-100">Texturing & Procedural Shading</h3>
              <p className="text-xs text-purple-300 leading-relaxed">
                Subsurface scattering, micro-roughness, brushed metals, glass caustics, and foil embossing.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-dark-800/90 border border-purple-500/15">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center mb-3">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-purple-100">Cinematic Product Animation</h3>
              <p className="text-xs text-purple-300 leading-relaxed">
                Dynamic camera sweeps, liquid splash physics, exploded assembly views, and lighting transitions.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-dark-800/90 border border-purple-500/15">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-purple-100">DaVinci Resolve Post & Color</h3>
              <p className="text-xs text-purple-300 leading-relaxed">
                Professional film color grading, ACES color management, compositing, motion blur, and final output.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-dark-800/90 border border-purple-500/15">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-purple-100">AI-Assisted Workflow</h3>
              <p className="text-xs text-purple-300 leading-relaxed">
                Accelerated concept generation, HDRI lighting synthesis, and texture enhancement.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-dark-800/90 border border-purple-500/15">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center mb-3">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-purple-100">Direct Brand Communication</h3>
              <p className="text-xs text-purple-300 leading-relaxed">
                Clear milestones, progress clay-renders, and reliable turnaround for tight launch dates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTION PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Methodology</span>
          <h2 className="text-3xl font-extrabold font-heading text-purple-100">
            The 5-Step Production Workflow
          </h2>
          <p className="text-sm text-purple-300">
            A structured creative process that guarantees studio-quality results every single time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Briefing & Moodboard', desc: 'Understanding brand aesthetics, dimensions, lighting references, and target vision.' },
            { step: '02', title: '3D Modeling & Setup', desc: 'Building high-fidelity 3D geometry and setting up accurate camera compositions.' },
            { step: '03', title: 'Shading & Materials', desc: 'Crafting physically accurate materials, glass refractions, and surface bump textures.' },
            { step: '04', title: 'Lighting & Render', desc: 'Studio rim lighting, soft reflections, caustics simulation, and high-res rendering.' },
            { step: '05', title: 'DaVinci Post & Delivery', desc: 'Color grading, compositing, final video polish, and delivering high-res master files.' }
          ].map((item) => (
            <div key={item.step} className="glass-panel p-5 rounded-2xl border border-purple-500/15 space-y-3 relative group hover:border-purple-400 transition-colors">
              <span className="text-2xl font-extrabold text-purple-400 font-heading">{item.step}</span>
              <h3 className="text-sm font-bold text-purple-100">{item.title}</h3>
              <p className="text-xs text-purple-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 md:p-14 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-dark-800 via-dark-800 to-dark-700 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-left max-w-xl">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Ready to Elevate Your Product?</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-purple-100">
              Let's Create Photorealistic Visuals Together
            </h2>
            <p className="text-purple-200 text-sm leading-relaxed">
              Available for brand commissions, agency freelance, and long-term remote roles.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link
              to="/contact"
              className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-purple-950 font-bold text-sm shadow-xl shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/923000000000?text=Hi%20Nouman,%20let's%20discuss%20a%203D%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/40 text-purple-300 text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
