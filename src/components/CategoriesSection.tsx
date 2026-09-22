import React from 'react';
import { 
  Smartphone, 
  Laptop, 
  Gamepad2, 
  Headphones, 
  Watch, 
  Keyboard,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ProductCategory, CategoryInfo } from '../types';
import { CATEGORIES_DATA } from '../data/mockData';

interface CategoriesSectionProps {
  onSelectCategory: (category: ProductCategory) => void;
  selectedCategory: string;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  // Map 6 requested categories to glowing icons
  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Smartphones':
        return <Smartphone className="w-7 h-7 text-[#00FF66]" />;
      case 'Laptops':
        return <Laptop className="w-7 h-7 text-[#00FF66]" />;
      case 'Gaming':
        return <Gamepad2 className="w-7 h-7 text-[#00FF66]" />;
      case 'Headphones':
        return <Headphones className="w-7 h-7 text-[#00FF66]" />;
      case 'Smart Watches':
        return <Watch className="w-7 h-7 text-[#00FF66]" />;
      case 'Accessories':
        return <Keyboard className="w-7 h-7 text-[#00FF66]" />;
      default:
        return <Sparkles className="w-7 h-7 text-[#00FF66]" />;
    }
  };

  return (
    <section id="categories" className="py-20 bg-black text-white relative border-b border-[#00FF66]/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#00FF66]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-[0_0_12px_rgba(0,255,102,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-[#00FF66]" />
              HARDWARE DEPARTMENTS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
              Featured <span className="text-[#00FF66] neon-text-glow">Categories</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Engineered for speed, durability, and immersive performance. Select your tech domain below.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-mono text-zinc-400">
            SHOWING <span className="font-bold text-[#00FF66]">6 CORE CATEGORIES</span>
          </div>
        </div>

        {/* Six Modern Glass-Style Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_DATA.slice(0, 6).map((cat: CategoryInfo) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <div
                key={cat.id}
                id={`category-card-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
                className={`group relative rounded-2xl p-6 sm:p-7 transition-all duration-300 overflow-hidden flex flex-col justify-between backdrop-blur-xl border ${
                  isSelected
                    ? 'bg-[#0c0c0c] border-[#00FF66] shadow-[0_0_30px_rgba(0,255,102,0.3)]'
                    : 'bg-[#080808]/80 border-[#00FF66]/20 hover:border-[#00FF66]/60 hover:shadow-[0_0_25px_rgba(0,255,102,0.2)] hover:-translate-y-1'
                }`}
              >
                {/* Background image preview with dark glass gradient */}
                <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
                </div>

                <div className="relative z-10">
                  {/* Glowing Green Icon Container */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-black/90 border border-[#00FF66]/40 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,102,0.3)] group-hover:border-[#00FF66] group-hover:shadow-[0_0_30px_rgba(0,255,102,0.5)] transition-all duration-300">
                      {getCategoryIcon(cat.name)}
                    </div>
                    <span className="text-xs font-mono text-zinc-400 bg-black/70 border border-zinc-800 px-2.5 py-1 rounded-full">
                      {cat.itemCount}+ Units
                    </span>
                  </div>

                  {/* Category Name & Tagline */}
                  <div>
                    <h3 className="text-2xl font-black text-white group-hover:text-[#00FF66] transition-colors uppercase">
                      {cat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {cat.tagline}
                    </p>
                  </div>
                </div>

                {/* Exact "Shop Now →" Button as requested */}
                <div className="relative z-10 mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <button
                    id={`shop-category-btn-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => onSelectCategory(cat.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-black hover:bg-[#00FF66] text-white hover:text-black border border-[#00FF66]/40 hover:border-[#00FF66] text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-md group-hover:shadow-[0_0_15px_rgba(0,255,102,0.4)] cursor-pointer"
                  >
                    <span>Shop Now →</span>
                  </button>
                </div>

                {/* Bottom glowing line indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00FF66] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#00FF66]" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
