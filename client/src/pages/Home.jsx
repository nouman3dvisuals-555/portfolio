import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Box, 
  Video, 
  Layers, 
  Disc, 
  Sun, 
  Camera, 
  Check, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Mail 
} from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-28 overflow-hidden min-h-[80vh] flex items-center">
        {/* Glow ambient background spots */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-purple-600/20 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-purple-400/20 blur-[120px] pointer-events-none rounded-full" />

        {/* Right Half Background Image (Hero Keyboard) */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 pointer-events-none z-0 overflow-hidden flex items-center justify-end">
          <div className="relative w-full h-full">
            <img
              src="/assets/hero-keyboard.png"
              alt="3D RGB Mechanical Keyboard Background Render"
              className="w-full h-full object-cover object-left opacity-40 lg:opacity-75 transform lg:translate-x-10 scale-105"
            />
            {/* Seamless Blending Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-[#050508]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/80" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508]" />
            <div className="absolute inset-0 bg-purple-950/20 mix-blend-overlay" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Category Pill Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-purple-950/40">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>3D PRODUCT VISUALIZATION ARTIST</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] font-heading text-white">
                3D Product <span className="purple-gradient-text">Visualization</span>
                <br />
                <span className="text-2xl sm:text-4xl lg:text-5xl text-purple-300 font-bold block mt-2">
                  That Makes Products <span className="text-purple-400">Stand Out.</span>
                </span>
              </h1>

              {/* Subtitle Paragraph */}
              <p className="text-base sm:text-lg text-purple-200/90 max-w-xl font-normal leading-relaxed">
                I create high-quality 3D product visuals and animations that help brands showcase their products with impact and drive real results.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/work"
                  className="px-7 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 hover:shadow-purple-500/50 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2 group"
                >
                  <span>View My Work</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/contact"
                  className="px-7 py-3.5 rounded-full bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 font-semibold text-sm border border-purple-500/30 hover:border-purple-400 transition-all duration-300 flex items-center gap-2 backdrop-blur-md"
                >
                  <span>Let's Work Together</span>
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                </Link>
              </div>

              {/* Social Links Bar */}
              <div className="pt-6 flex items-center gap-4 border-t border-purple-500/10">
                <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">Follow Me</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="p-2.5 rounded-full bg-purple-950/60 hover:bg-purple-600/30 border border-purple-500/20 text-purple-300 hover:text-white transition-all hover:scale-110 backdrop-blur-md"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="p-2.5 rounded-full bg-purple-950/60 hover:bg-purple-600/30 border border-purple-500/20 text-purple-300 hover:text-white transition-all hover:scale-110 backdrop-blur-md"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="p-2.5 rounded-full bg-purple-950/60 hover:bg-purple-600/30 border border-purple-500/20 text-purple-300 hover:text-white transition-all hover:scale-110 backdrop-blur-md"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-28">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">WHAT I DO</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            My <span className="purple-gradient-text">Services</span>
          </h2>
          <div className="w-16 h-1 bg-purple-500 mx-auto rounded-full" />
        </div>

        {/* 6 Card Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-panel p-6 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 space-y-4 group hover:-translate-y-1 shadow-lg shadow-purple-950/20">
            <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Box className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">3D Product Visualization</h3>
            <p className="text-sm text-purple-200/80 leading-relaxed">
              High quality renders that bring your products to life.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-6 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 space-y-4 group hover:-translate-y-1 shadow-lg shadow-purple-950/20">
            <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">Product Animation</h3>
            <p className="text-sm text-purple-200/80 leading-relaxed">
              Engaging animations that showcase features and details.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-6 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 space-y-4 group hover:-translate-y-1 shadow-lg shadow-purple-950/20">
            <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">3D Modeling</h3>
            <p className="text-sm text-purple-200/80 leading-relaxed">
              Clean, optimized and production ready 3D models.
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-panel p-6 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 space-y-4 group hover:-translate-y-1 shadow-lg shadow-purple-950/20">
            <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Disc className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">Materials & Texturing</h3>
            <p className="text-sm text-purple-200/80 leading-relaxed">
              Realistic materials and textures that add detail and depth.
            </p>
          </div>

          {/* Card 5 */}
          <div className="glass-panel p-6 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 space-y-4 group hover:-translate-y-1 shadow-lg shadow-purple-950/20">
            <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">Lighting & Rendering</h3>
            <p className="text-sm text-purple-200/80 leading-relaxed">
              Studio quality lighting and photorealistic rendering.
            </p>
          </div>

          {/* Card 6 */}
          <div className="glass-panel p-6 rounded-2xl border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 space-y-4 group hover:-translate-y-1 shadow-lg shadow-purple-950/20">
            <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">Camera & Composition</h3>
            <p className="text-sm text-purple-200/80 leading-relaxed">
              Cinematic camera angles and perfect composition.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          {/* Left Column: Profile Card */}
          <div className="md:col-span-5 relative">
            <div className="glass-panel p-5 rounded-3xl border border-purple-500/30 bg-[#0e0a16]/90 relative z-10 space-y-4 shadow-2xl shadow-purple-950/50">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-dark-900 border border-purple-500/20 relative group">
                <img
                  src="/assets/nouman-profile.jpg"
                  alt="Nouman 3D Artist Portrait"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent" />
              </div>
              <div className="text-center pt-1 pb-2">
                <h3 className="text-xl font-extrabold text-white font-heading tracking-wide">Nouman 3D Artist</h3>
                <p className="text-xs text-purple-400 font-semibold mt-0.5">3D Product Visualization Specialist</p>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Highlights */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">ABOUT ME</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
                Crafting Visuals That <span className="text-purple-400">Sell.</span>
              </h2>
            </div>

            <p className="text-purple-200/90 text-base leading-relaxed">
              I'm a 3D product visualization artist who helps brands present their products in the best possible way. From realistic renders to engaging animations, I focus on quality, detail and visuals that connect.
            </p>

            {/* Pill Tags Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="glass-panel px-4 py-3 rounded-xl border border-purple-500/20 flex items-center gap-2.5 text-sm font-semibold text-white">
                <Check className="w-4 h-4 text-purple-400" />
                <span>Detail Oriented</span>
              </div>
              <div className="glass-panel px-4 py-3 rounded-xl border border-purple-500/20 flex items-center gap-2.5 text-sm font-semibold text-white">
                <Check className="w-4 h-4 text-purple-400" />
                <span>High Quality</span>
              </div>
              <div className="glass-panel px-4 py-3 rounded-xl border border-purple-500/20 flex items-center gap-2.5 text-sm font-semibold text-white">
                <Check className="w-4 h-4 text-purple-400" />
                <span>On Time Delivery</span>
              </div>
              <div className="glass-panel px-4 py-3 rounded-xl border border-purple-500/20 flex items-center gap-2.5 text-sm font-semibold text-white">
                <Check className="w-4 h-4 text-purple-400" />
                <span>Client Focused</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 md:p-10 rounded-3xl border border-purple-500/25 bg-gradient-to-r from-[#0b0a10] via-[#0e0a16] to-[#0b0a10] shadow-xl shadow-purple-950/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-heading">20+</span>
              <p className="text-xs sm:text-sm font-semibold text-purple-200/80">Projects Completed</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-heading">10+</span>
              <p className="text-xs sm:text-sm font-semibold text-purple-200/80">Happy Clients</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-heading">2+</span>
              <p className="text-xs sm:text-sm font-semibold text-purple-200/80">Years Experience</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-heading">100%</span>
              <p className="text-xs sm:text-sm font-semibold text-purple-200/80">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-dark-800 to-purple-950/40 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-purple-950/50">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <p className="text-base sm:text-xl font-bold text-white font-heading">
              Have a project in mind? Let's create something amazing together.
            </p>
          </div>

          <Link
            to="/contact"
            className="shrink-0 px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 hover:scale-[1.02] transition-all flex items-center gap-2"
          >
            <span>Let's Work Together</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
