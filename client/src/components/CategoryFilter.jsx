import React from 'react';
import { Sparkles, Layers, Box, Droplets, Watch, Smartphone, MoreHorizontal } from 'lucide-react';

const CATEGORIES = [
  { name: 'All', icon: Layers },
  { name: 'Perfume', icon: Sparkles },
  { name: 'Skincare', icon: Droplets },
  { name: 'Beverage', icon: Box },
  { name: 'Tech', icon: Smartphone },
  { name: 'Watch', icon: Watch },
  { name: 'Other', icon: MoreHorizontal }
];

const CategoryFilter = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none py-2">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const selected = activeCategory === cat.name;

        return (
          <button
            key={cat.name}
            onClick={() => onSelectCategory(cat.name)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
              selected
                ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-dark-900 font-bold shadow-lg shadow-gold-500/20 scale-105'
                : 'bg-dark-800/80 hover:bg-dark-700 text-slate-300 hover:text-white border border-white/5 hover:border-white/20'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${selected ? 'text-dark-900' : 'text-gold-400'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
