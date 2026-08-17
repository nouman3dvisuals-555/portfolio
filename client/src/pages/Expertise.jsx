import React from 'react';
import { Sparkles, Cpu, Layers, Video, ShieldCheck, Box, Eye, CheckCircle2, Wrench } from 'lucide-react';

const Expertise = () => {
  const capabilities = [
    {
      title: '3D Product Modeling',
      desc: 'Precision polygonal topology and CAD cleanup for intricate product forms including glass bottles, metal caps, watch gears, and ergonomic tech chassis.',
      tags: ['SubD Topology', 'CAD Import', 'Hard-Surface Modeling', 'Dimension Accuracy']
    },
    {
      title: 'Texturing & PBR Materials',
      desc: 'Creating realistic physically based shading with procedural roughness, subsurface scattering (SSS) for skin and wax, glass refractions, and foil embossing.',
      tags: ['Procedural Shaders', 'Subsurface Scattering', 'Micro-Roughness', 'Displacement Maps']
    },
    {
      title: 'Photorealistic Rendering',
      desc: 'High-end ray-traced lighting setup, global illumination, metallic caustics, and crisp shadow falloffs for magazine-grade product stills.',
      tags: ['Ray Tracing', 'Global Illumination', 'Glass Caustics', '4K / 8K Output']
    },
    {
      title: 'Professional Studio Lighting',
      desc: 'Custom studio rim lighting, softbox diffusion, specular highlight shaping, and high-dynamic-range environment map synthesis.',
      tags: ['Rim Lighting', 'HDRI Synthesis', 'Softbox Diffusion', 'Specular Shaping']
    },
    {
      title: 'Camera Composition',
      desc: 'Macro depth of field (DoF), tilt-shift perspective control, focal length selection (50mm, 85mm, 105mm macro), and cinematic framing rules.',
      tags: ['Macro DoF', 'Tilt-Shift Control', 'Focal Length Selection', 'Golden Ratio Framing']
    },
    {
      title: 'Product Animation & Rigging',
      desc: 'Exploded mechanical assembly reveals, smooth 360-degree camera orbits, particle fluid splashes, and dynamic product unveil transitions.',
      tags: ['Exploded Views', 'Liquid Splash FX', 'Camera Orbits', '3D Motion Graphics']
    },
    {
      title: 'DaVinci Resolve Post-Production',
      desc: 'Industry-standard film color grading, ACES color pipeline management, multipass CGI compositing, velocity curves, and sound sync.',
      tags: ['Color Grading', 'Compositing', 'ACES Pipeline', 'Motion Blur & Editing']
    },
    {
      title: 'AI-Assisted Creative Workflow',
      desc: 'Integrating state-of-the-art AI tools for rapid moodboarding, procedural texture generation, lighting concept testing, and render denoiser optimization.',
      tags: ['Concept Iteration', 'AI Texture Synthesis', 'HDRI Generation', 'Workflow Speedup']
    }
  ];

  const tools = [
    { name: 'DaVinci Resolve Studio', role: 'Color Grading, Compositing & Video Editing' },
    { name: 'Blender / Maya / Cinema 4D', role: '3D Modeling, UV Unwrapping & Rigging' },
    { name: 'Octane / Redshift / Cycles', role: 'Physically Based GPU Ray Tracing' },
    { name: 'Substance 3D Painter', role: 'High-Res PBR Material Texturing' },
    { name: 'Adobe Creative Suite', role: 'After Effects, Photoshop & Illustrator' }
  ];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* HEADER */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest">
          <Wrench className="w-3.5 h-3.5" />
          <span>Technical Competencies</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
          3D Product Visualization <span className="gold-gradient-text">Expertise</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Detailed technical breakdown designed for Art Directors, Creative Leads, and Recruiters evaluating CGI capabilities.
        </p>
      </div>

      {/* CAPABILITIES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {capabilities.map((cap) => (
          <div key={cap.title} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 hover:border-gold-500/30 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold-500/10 text-gold-400 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-white font-heading">{cap.title}</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{cap.desc}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {cap.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-400 font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* SOFTWARE & TOOLSET */}
      <div className="glass-panel p-8 md:p-12 rounded-3xl border border-gold-500/20 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Production Stack</span>
          <h2 className="text-2xl font-bold font-heading text-white">Software & Pipeline Tools</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tools.map((t) => (
            <div key={t.name} className="p-4 rounded-xl bg-dark-800 border border-white/5 space-y-1">
              <h4 className="text-sm font-bold text-white">{t.name}</h4>
              <p className="text-xs text-slate-400">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expertise;
