import React, { useState } from 'react';
import { useAnimalStore } from '../../stores/animalStore.js';
import { useFavoriteStore } from '../../stores/favoriteStore.js';
import LivestockFilterBar from '../../components/LivestockFilterBar.jsx';
import { 
  Search, 
  SlidersHorizontal, 
  Heart, 
  Sparkles, 
  ChevronRight, 
  X, 
  RotateCcw,
  Check,
  Milk,
  MapPin,
  Calendar
} from 'lucide-react';

export default function MarketplaceScreen({ onNavigate }) {
  const {
    animals,
    searchQuery,
    selectedType,
    selectedBreed,
    selectedAvailability,
    selectedGender,
    maxPrice,
    minMilkProduction,
    sortBy,
    setSearchQuery,
    setSelectedType,
    setSelectedBreed,
    setSelectedAvailability,
    setSelectedGender,
    setMaxPrice,
    setMinMilkProduction,
    setSortBy,
    resetFilters,
    getFilteredAnimals,
    selectAnimal
  } = useAnimalStore();

  const { favoriteIds, toggleFavorite } = useFavoriteStore();
  const [showFilterModal, setShowFilterModal] = useState(false);

  const filteredAnimals = getFilteredAnimals();

  const types = ['All', 'Cow', 'Buffalo', 'Bull', 'Calf'];
  const breeds = [
    'All',
    'Sahiwal',
    'Nili Ravi',
    'Cholistani',
    'Red Sindhi',
    'Holstein Friesian',
    'Jersey',
    'Cross Breed'
  ];

  return (
    <div className="space-y-5 pb-20">
      {/* Header & Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase font-['Outfit']">
            Livestock Marketplace
          </h1>
          <p className="text-xs text-neutral-400">
            Showing {filteredAnimals.length} of {animals.length} verified farm animals
          </p>
        </div>

        <button
          onClick={() => setShowFilterModal(true)}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
            selectedType !== 'All' || selectedBreed !== 'All' || selectedAvailability !== 'All' || maxPrice < 800000 || minMilkProduction > 0
              ? 'bg-emerald-600 text-white border-emerald-500'
              : 'bg-neutral-850 text-neutral-200 border-neutral-700 hover:bg-neutral-800'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters</span>
          {(selectedType !== 'All' || selectedBreed !== 'All' || selectedAvailability !== 'All' || minMilkProduction > 0) && (
            <span className="w-2 h-2 rounded-full bg-amber-400" />
          )}
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by animal name, breed, location (e.g. Sahiwal, Nili Ravi)..."
          className="w-full pl-10 pr-10 py-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-white text-xs sm:text-sm placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Animal Type Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedType === type
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700'
            }`}
          >
            {type === 'All' ? 'All Types' : type}
          </button>
        ))}
      </div>

      {/* Livestock Filtering & Sorting Component (Breed, Age Range, Price Point, Sort) */}
      <LivestockFilterBar />

      {/* Quick Availability Status Filter */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[11px] text-neutral-500 font-medium">Status:</span>
          {['All', 'Available', 'Reserved', 'Sold'].map((avail) => (
            <button
              key={avail}
              onClick={() => setSelectedAvailability(avail)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                selectedAvailability === avail
                  ? 'bg-neutral-200 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {avail}
            </button>
          ))}
        </div>
      </div>

      {/* Animal Cards Grid */}
      {filteredAnimals.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-3">
          <div className="w-12 h-12 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto text-xl">
            🔍
          </div>
          <h2 className="text-sm font-bold text-white">No Animals Found</h2>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            No livestock match your active search and filter combinations. Try adjusting or resetting filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAnimals.map((animal) => {
            const isFav = favoriteIds.includes(animal.id);

            return (
              <div
                key={animal.id}
                className="group relative rounded-2xl bg-neutral-900 border border-neutral-800/90 overflow-hidden flex flex-col hover:border-emerald-800/60 transition-all hover:shadow-xl hover:shadow-emerald-950/20"
              >
                {/* Animal Photo */}
                <div className="relative aspect-[4/3] bg-neutral-800 overflow-hidden">
                  <img
                    src={animal.imageUrl}
                    alt={animal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/30" />

                  {/* Availability Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md ${
                        animal.availability === 'Available'
                          ? 'bg-emerald-600 text-white'
                          : animal.availability === 'Reserved'
                          ? 'bg-amber-600 text-white'
                          : 'bg-rose-700 text-white'
                      }`}
                    >
                      {animal.availability}
                    </span>
                  </div>

                  {/* Favorite Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(animal.id);
                    }}
                    className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-colors ${
                      isFav 
                        ? 'bg-rose-600 text-white' 
                        : 'bg-black/40 text-neutral-300 hover:text-white hover:bg-black/60'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                  </button>

                  {/* Breed pill */}
                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-lg bg-neutral-900/85 backdrop-blur-sm text-[11px] font-semibold text-emerald-300 border border-neutral-700/50">
                      {animal.breed}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-neutral-900/85 backdrop-blur-sm text-[10px] text-neutral-300">
                      {animal.type}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h2 className="font-bold text-sm text-white line-clamp-1 group-hover:text-emerald-400 transition-colors">
                      {animal.name}
                    </h2>

                    <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-neutral-800 text-[11px] text-neutral-400">
                      <div>Age: <strong className="text-neutral-200">{animal.age} Yrs</strong></div>
                      <div>Weight: <strong className="text-neutral-200">{animal.weight} kg</strong></div>
                      {animal.milkProductionPerDay > 0 && (
                        <div className="col-span-2 text-emerald-400 flex items-center gap-1 font-semibold">
                          <Milk className="w-3 h-3" />
                          <span>Yield: {animal.milkProductionPerDay} Liters / Day</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase tracking-tight block">Official Price</span>
                      <span className="text-sm font-black text-amber-400">
                        Rs. {animal.price.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        selectAnimal(animal);
                        onNavigate('animal_details');
                      }}
                      className="py-1.5 px-3.5 rounded-xl bg-neutral-800 hover:bg-emerald-600 hover:text-white text-neutral-200 text-xs font-semibold transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <LivestockFilterBar isMobileModal={true} onClose={() => setShowFilterModal(false)} />

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-3 border-t border-neutral-800">
              <button
                onClick={() => {
                  resetFilters();
                  setShowFilterModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All</span>
              </button>

              <button
                onClick={() => setShowFilterModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-950/60"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply Filters</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
