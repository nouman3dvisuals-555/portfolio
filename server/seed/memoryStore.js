/**
 * Memory Store & Initial Seed Data for fallback operations
 */

export const INITIAL_PROJECTS = [
  {
    _id: 'proj-01',
    title: 'Aura Elixir — Luxury Parfum',
    description: 'Photorealistic 3D rendering highlighting intricate glass refractive indices, liquid caustics, gold foil embossing, and studio rim lighting for a premium French perfume brand.',
    category: 'Perfume',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600',
    duration: '',
    status: 'published',
    featured: true,
    order: 1,
    createdAt: new Date('2026-01-15T10:00:00Z').toISOString(),
    updatedAt: new Date('2026-01-15T10:00:00Z').toISOString()
  },
  {
    _id: 'proj-02',
    title: 'Lumina Velvet Skincare Serum',
    description: 'High-precision 3D visualization showcasing frosted amber bottle texturing, realistic dropper fluid viscosity, and soft volumetric studio lighting.',
    category: 'Skincare',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1608248597263-000796df9c11?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1608248597263-000796df9c11?auto=format&fit=crop&q=80&w=600',
    duration: '',
    status: 'published',
    featured: true,
    order: 2,
    createdAt: new Date('2026-01-20T10:00:00Z').toISOString(),
    updatedAt: new Date('2026-01-20T10:00:00Z').toISOString()
  },
  {
    _id: 'proj-03',
    title: 'Vortex Titanium Audio Headphones',
    description: 'Industrial 3D product design reveal with brushed anodized aluminum materials, acoustic mesh micro-textures, and dramatic shadow composition.',
    category: 'Tech',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
    duration: '',
    status: 'published',
    featured: true,
    order: 3,
    createdAt: new Date('2026-02-01T10:00:00Z').toISOString(),
    updatedAt: new Date('2026-02-01T10:00:00Z').toISOString()
  },
  {
    _id: 'proj-04',
    title: 'Chronos Heritage Tourbillon Watch',
    description: 'Ultra-detailed mechanical watch 3D visualization with anti-reflective sapphire crystal rendering, hand-stitched leather strap bump maps, and micro-gear reflections.',
    category: 'Watch',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
    duration: '',
    status: 'published',
    featured: true,
    order: 4,
    createdAt: new Date('2026-02-05T10:00:00Z').toISOString(),
    updatedAt: new Date('2026-02-05T10:00:00Z').toISOString()
  },
  {
    _id: 'proj-05',
    title: 'Ignite Energy Botanical Tonic',
    description: 'Condensation splash simulation and aluminum beverage can rendering with tactile matte/gloss spot varnishes and dynamic fruit macro depth of field.',
    category: 'Beverage',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600',
    duration: '',
    status: 'published',
    featured: false,
    order: 5,
    createdAt: new Date('2026-02-10T10:00:00Z').toISOString(),
    updatedAt: new Date('2026-02-10T10:00:00Z').toISOString()
  },
  {
    _id: 'proj-06',
    title: 'Obsidian Noir — 3D Commercial Teaser',
    description: 'Cinematic 3D animation featuring slow-motion particle dissipation, camera sweep over luxury fragrance metallic cap, DaVinci Resolve color grade, and sound design sync.',
    category: 'Perfume',
    mediaType: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-perfume-bottle-spinning-in-slow-motion-41584-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    duration: '0:30',
    status: 'published',
    featured: true,
    order: 6,
    createdAt: new Date('2026-02-12T10:00:00Z').toISOString(),
    updatedAt: new Date('2026-02-12T10:00:00Z').toISOString()
  },
  {
    _id: 'proj-07',
    title: 'CyberCore Smart Ring Reveal',
    description: 'Futuristic 3D product animation demonstrating internal sensor exploded view, metallic chassis reflections, micro-LED pulsing, and 360 camera orbit.',
    category: 'Tech',
    mediaType: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartwatch-close-up-42797-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=800',
    duration: '0:22',
    status: 'published',
    featured: true,
    order: 7,
    createdAt: new Date('2026-02-15T10:00:00Z').toISOString(),
    updatedAt: new Date('2026-02-15T10:00:00Z').toISOString()
  },
  {
    _id: 'proj-08',
    title: 'Hydra-Dew Hydro-Gel Commercial',
    description: 'Dynamic water droplet splash collision and soft-focus camera pan over skincare cream jar with translucent procedural subsurface scattering.',
    category: 'Skincare',
    mediaType: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cosmetic-cream-being-spread-on-skin-41578-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
    duration: '0:18',
    status: 'published',
    featured: false,
    order: 8,
    createdAt: new Date('2026-02-16T10:00:00Z').toISOString(),
    updatedAt: new Date('2026-02-16T10:00:00Z').toISOString()
  }
];

let inMemoryProjects = [...INITIAL_PROJECTS];

export const getMemoryProjects = (filters = {}) => {
  return inMemoryProjects.filter((p) => {
    if (filters.status && p.status !== filters.status) return false;
    if (filters.category && filters.category !== 'All' && p.category !== filters.category) return false;
    if (filters.type && p.mediaType !== filters.type) return false;
    return true;
  });
};

export const addMemoryProject = (projectData) => {
  const newProj = {
    _id: 'proj-' + Date.now(),
    ...projectData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  inMemoryProjects.unshift(newProj);
  return newProj;
};

export const updateMemoryProject = (id, updates) => {
  const idx = inMemoryProjects.findIndex((p) => p._id === id);
  if (idx !== -1) {
    inMemoryProjects[idx] = {
      ...inMemoryProjects[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return inMemoryProjects[idx];
  }
  return null;
};

export const deleteMemoryProject = (id) => {
  const idx = inMemoryProjects.findIndex((p) => p._id === id);
  if (idx !== -1) {
    const deleted = inMemoryProjects.splice(idx, 1);
    return deleted[0];
  }
  return null;
};
