import React, { useState } from 'react';
import { 
  Filter, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Tag, 
  Calendar, 
  Coins, 
  Check, 
  SlidersHorizontal,
  ArrowUpDown,
  Sparkles,
  X
} from 'lucide-react';
import { useAnimalStore } from '../stores/animalStore.js';

/**
 * LivestockFilterBar Component
 * Allows users to filter livestock in the Marketplace by:
 * 1. Breed (Sahiwal, Nili Ravi, Cholistani, Jersey, etc.)
 * 2. Age Range (Young < 2.5y, Prime Dairy 2.5-5y, Mature 5.5y+, or custom slider)
 * 3. Price Point (Tier presets & max price slider)
 * 4. Sorting by Breed, Age, Price, and Milk Production
 */
export default function LivestockFilterBar({ isMobileModal = false, onClose }) {
  const {
    animals,
    selectedBreed,
    selectedType,
    selectedAvailability,
    minPrice,
    maxPrice,
    minAge,
    maxAge,
    ageRange,
    sortBy,
    setSelectedBreed,
    setSelectedType,
    setSelectedAvailability,
    setMinPrice,
    setMaxPrice,
    setMinAge,
    setMaxAge,
    setAgeRange,
    setSortBy,
    resetFilters,
  } = useAnimalStore();

  const [isExpanded, setIsExpanded] = useState(!isMobileModal);

  const breeds = [
    { label: 'All Breeds', value: 'All' },
    { label: 'Sahiwal (ساہیوال)', value: 'Sahiwal' },
    { label: 'Nili-Ravi (نیلی راوی)', value: 'Nili Ravi' },
    { label: 'Cholistani (چولستانی)', value: 'Cholistani' },
    { label: 'Red Sindhi (لال سندھی)', value: 'Red Sindhi' },
    { label: 'Holstein Friesian', value: 'Holstein Friesian' },
    { label: 'Jersey', value: 'Jersey' },
    { label: 'Cross Breed', value: 'Cross Breed' },
  ];

  const agePresets = [
    { label: 'All Ages', value: 'All', desc: 'Any age' },
    { label: 'Heifers & Young (0 - 2.5 Yrs)', value: 'young', desc: 'Growing stock' },
    { label: 'Prime Dairy (2.5 - 5.5 Yrs)', value: 'prime', desc: 'Peak yield' },
    { label: 'Mature & Proven (5.5+ Yrs)', value: 'mature', desc: 'Established' },
  ];

  const pricePresets = [
    { label: 'All Prices', min: 0, max: 800000 },
    { label: 'Under Rs. 300,000', min: 0, max: 300000 },
    { label: 'Rs. 300,000 - 450,000', min: 300000, max: 450000 },
    { label: 'Rs. 450,000 - 600,000', min: 450000, max: 600000 },
    { label: 'Premium (Rs. 600,000+)', min: 600000, max: 800000 },
  ];

  const hasActiveFilters = 
    selectedBreed !== 'All' || 
    ageRange !== 'All' || 
    minAge > 0 || 
    maxAge < 15 || 
    minPrice > 0 || 
    maxPrice < 800000 || 
    sortBy !== 'default';

  return (
    <div 
      id="marketplace-filtering-component"
      aria-label="Livestock Filter and Sorting Controls"
      className={`rounded-3xl bg-neutral-900 border border-neutral-800 p-4 sm:p-5 shadow-xl transition-all ${
        isMobileModal ? 'border-none p-0 bg-transparent shadow-none' : ''
      }`}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-3 border-b border-neutral-800 pb-3.5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>Filter & Sort Livestock</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </h2>
            <p className="text-[11px] text-neutral-400">
              Refine by pedigree breed, biological age, and price point
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              id="reset-livestock-filters-btn"
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          {!isMobileModal && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
              title={isExpanded ? 'Collapse Filters' : 'Expand Filters'}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}

          {isMobileModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Filter Body */}
      {isExpanded && (
        <div className="pt-4 space-y-5">
          {/* SECTION 1: BREED SELECTION */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-200 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pedigree Breed</span>
              </label>
              <span className="text-[11px] text-emerald-400 font-semibold">
                {selectedBreed === 'All' ? 'All Breeds' : selectedBreed}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {breeds.map((b) => {
                const isActive = selectedBreed === b.value;
                return (
                  <button
                    key={b.value}
                    id={`filter-breed-${b.value.replace(/\s+/g, '-').toLowerCase()}`}
                    type="button"
                    onClick={() => setSelectedBreed(b.value)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium text-left truncate transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-950/50'
                        : 'bg-neutral-850 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <span className="truncate">{b.label}</span>
                    {isActive && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: AGE RANGE FILTER */}
          <div className="space-y-2 pt-1 border-t border-neutral-800/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-200 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Age Range</span>
              </label>
              <span className="text-[11px] font-mono text-amber-400 font-semibold">
                {minAge === 0 && maxAge === 15 ? 'All Ages (0 - 15 Yrs)' : `${minAge} - ${maxAge} Years`}
              </span>
            </div>

            {/* Age Presets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {agePresets.map((preset) => {
                const isSelected = ageRange === preset.value;
                return (
                  <button
                    key={preset.value}
                    id={`filter-age-preset-${preset.value}`}
                    type="button"
                    onClick={() => setAgeRange(preset.value)}
                    className={`p-2.5 rounded-xl text-left transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500/60 text-amber-300 font-bold'
                        : 'bg-neutral-850 border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold">{preset.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">
                      {preset.desc}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Age Slider Range */}
            <div className="pt-2 px-1 flex items-center gap-3">
              <span className="text-[11px] text-neutral-500 font-mono">0 Yr</span>
              <input
                id="filter-max-age-slider"
                type="range"
                min="1"
                max="12"
                step="0.5"
                value={maxAge > 12 ? 12 : maxAge}
                onChange={(e) => {
                  setMaxAge(parseFloat(e.target.value));
                  if (ageRange !== 'custom') {
                    // set to custom
                  }
                }}
                className="flex-1 accent-amber-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
              />
              <span className="text-[11px] text-neutral-400 font-mono">
                Max {maxAge >= 12 ? '12+ Yrs' : `${maxAge} Yrs`}
              </span>
            </div>
          </div>

          {/* SECTION 3: PRICE POINT FILTER */}
          <div className="space-y-2 pt-1 border-t border-neutral-800/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-200 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-emerald-400" />
                <span>Price Point (PKR)</span>
              </label>
              <span className="text-xs font-black text-emerald-400 font-mono">
                Rs. {minPrice.toLocaleString()} - Rs. {maxPrice.toLocaleString()}
              </span>
            </div>

            {/* Price Presets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {pricePresets.map((tier, idx) => {
                const isActive = minPrice === tier.min && maxPrice === tier.max;
                return (
                  <button
                    key={idx}
                    id={`filter-price-tier-${idx}`}
                    type="button"
                    onClick={() => {
                      setMinPrice(tier.min);
                      setMaxPrice(tier.max);
                    }}
                    className={`py-2 px-2.5 rounded-xl text-[11px] text-center font-medium transition-all cursor-pointer border truncate ${
                      isActive
                        ? 'bg-emerald-600 border-emerald-500 text-white font-bold shadow-md shadow-emerald-950/40'
                        : 'bg-neutral-850 border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    {tier.label}
                  </button>
                );
              })}
            </div>

            {/* Continuous Max Price Slider */}
            <div className="pt-2 px-1 flex items-center gap-3">
              <span className="text-[11px] text-neutral-500 font-mono">Rs. 150k</span>
              <input
                id="filter-max-price-slider"
                type="range"
                min="200000"
                max="800000"
                step="25000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                className="flex-1 accent-emerald-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
              />
              <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                Up to Rs. {maxPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* SECTION 4: SORTING OPTIONS */}
          <div className="pt-2 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-xs font-bold text-neutral-300">Sort Livestock By:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { label: 'Default', value: 'default' },
                { label: 'Price: Low to High', value: 'price_asc' },
                { label: 'Price: High to Low', value: 'price_desc' },
                { label: 'Youngest First', value: 'age_asc' },
                { label: 'Milk Yield: Top First', value: 'milk_desc' },
                { label: 'Newest Arrivals', value: 'newest' },
              ].map((sortOption) => (
                <button
                  key={sortOption.value}
                  id={`sort-option-${sortOption.value}`}
                  type="button"
                  onClick={() => setSortBy(sortOption.value)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                    sortBy === sortOption.value
                      ? 'bg-emerald-500 text-neutral-950 font-bold'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-750'
                  }`}
                >
                  {sortOption.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
