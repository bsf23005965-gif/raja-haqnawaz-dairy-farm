import React from 'react';
import { 
  ChevronRight, 
  Heart, 
  Sparkles, 
  Tag, 
  ArrowUpRight,
  TrendingUp,
  Droplets,
  ShieldCheck
} from 'lucide-react';
import { useAnimalStore } from '../stores/animalStore.js';
import { useAuthStore } from '../stores/authStore.js';

/**
 * FeaturedLivestock Component
 * Showcases top-selling dairy cattle and championship livestock
 * with authentic photography, pedigree breed tags, verified lactation metrics, and price tags.
 */
export default function FeaturedLivestock({ onNavigate, title, subtitle }) {
  const { animals, selectAnimal } = useAnimalStore();
  const { user, toggleFavorite } = useAuthStore();
  const favoriteIds = user?.favorites || [];

  // Filter top-selling / high-performing cattle (or top 4 animals)
  const featuredList = React.useMemo(() => {
    if (!animals || animals.length === 0) return [];
    
    // Sort to prioritize available animals with top milk yields or verified status
    return [...animals]
      .sort((a, b) => {
        // High yield or featured availability first
        const yieldDiff = (b.milkProductionPerDay || 0) - (a.milkProductionPerDay || 0);
        return yieldDiff;
      })
      .slice(0, 4);
  }, [animals]);

  if (!featuredList || featuredList.length === 0) {
    return null;
  }

  return (
    <section 
      id="featured-livestock-section"
      aria-label="Featured Livestock"
      className="space-y-4 pt-1"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold tracking-wide">
              <TrendingUp className="w-3 h-3" />
              TOP DEMAND LIVESTOCK
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-['Outfit'] mt-1">
            {title || 'Featured Livestock'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            {subtitle || 'Hand-picked championship dairy breeds and high-yielding lactation stock'}
          </p>
        </div>

        <button
          id="featured-view-all-livestock-btn"
          type="button"
          onClick={() => onNavigate?.('marketplace')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors py-1 cursor-pointer self-start sm:self-auto"
        >
          <span>View All Livestock ({animals.length})</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Livestock Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {featuredList.map((animal) => {
          const isFav = favoriteIds.includes(animal.id);

          return (
            <div
              key={animal.id}
              id={`featured-animal-card-${animal.id}`}
              onClick={() => {
                selectAnimal(animal);
                onNavigate?.('animal_details');
              }}
              className="group relative rounded-2xl bg-neutral-900/90 border border-neutral-800/90 overflow-hidden flex flex-col justify-between hover:border-emerald-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/40 cursor-pointer"
            >
              {/* Image Container with Badges */}
              <div className="relative aspect-[4/3] w-full bg-neutral-800 overflow-hidden">
                <img
                  src={animal.imageUrl}
                  alt={`${animal.name} - ${animal.breed}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/farm_logo.jpg';
                  }}
                />
                
                {/* Visual Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/40 opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top Status & Breed Tags */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md pointer-events-auto ${
                      animal.availability === 'Available'
                        ? 'bg-emerald-600 text-white shadow-emerald-950/50'
                        : animal.availability === 'Reserved'
                        ? 'bg-amber-600 text-white shadow-amber-950/50'
                        : 'bg-rose-700 text-white shadow-rose-950/50'
                    }`}
                  >
                    {animal.availability || 'Available'}
                  </span>

                  {/* Favorite Toggle Button */}
                  <button
                    type="button"
                    id={`toggle-fav-featured-${animal.id}`}
                    aria-label={isFav ? 'Remove from favorites' : 'Save to favorites'}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(animal.id);
                    }}
                    className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-transform duration-200 active:scale-90 ${
                      isFav 
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-950/60' 
                        : 'bg-black/50 text-neutral-300 hover:text-white hover:bg-black/80'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Breed Tag on Bottom Image Edge */}
                <div className="absolute bottom-2.5 left-2.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-950/85 backdrop-blur-md text-[11px] font-bold text-emerald-300 border border-emerald-500/30 shadow-md">
                    <Tag className="w-3 h-3 text-emerald-400" />
                    {animal.breed}
                  </span>
                </div>

                {/* Category Pill on Bottom Right */}
                <div className="absolute bottom-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-neutral-900/80 backdrop-blur-sm text-[10px] font-semibold text-neutral-300 border border-neutral-700/60">
                    {animal.category || 'Dairy Cattle'}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="font-bold text-sm sm:text-base text-white line-clamp-1 group-hover:text-emerald-400 transition-colors">
                      {animal.name}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                  </div>

                  {/* Core Livestock Specs */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-neutral-400">
                    <span>Age: <strong className="text-neutral-200">{animal.age} Yrs</strong></span>
                    <span>•</span>
                    <span>Weight: <strong className="text-neutral-200">{animal.weightKg} kg</strong></span>
                    {animal.milkProductionPerDay > 0 && (
                      <>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                          <Droplets className="w-3 h-3 text-emerald-400" />
                          {animal.milkProductionPerDay} L/day
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Price and Action Footer */}
                <div className="pt-2.5 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase font-medium tracking-tight block">
                      Asking Price
                    </span>
                    <span className="text-base sm:text-lg font-black text-amber-400 tracking-tight">
                      Rs. {Number(animal.price).toLocaleString()}
                    </span>
                  </div>

                  <span className="py-1.5 px-3 rounded-xl bg-neutral-800 group-hover:bg-emerald-600 text-neutral-200 group-hover:text-white text-xs font-bold transition-all shadow-sm">
                    Inspect
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
