import React from 'react';
import { 
  Award, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar 
} from 'lucide-react';
import { BRANDING } from '../constants/branding.js';

/**
 * Hero component for the Home view
 * Highlights 30+ years of dairy farming heritage with high-contrast badge,
 * verified stats, and prominent call-to-action button for exploring livestock.
 */
export default function Hero({ 
  branding = {}, 
  totalAnimals = 33, 
  onNavigate 
}) {
  const farmHeroImage = branding?.farmHeroImage || BRANDING.farmHeroImage || '/raja-haqnawaz-dairy-farm/farm_hero_banner.jpg';
  const farmLogo = branding?.logo || BRANDING.logo || '/raja-haqnawaz-dairy-farm/farm_logo.jpg';
  const experienceText = branding?.experienceYears || '30+ Years of Experience';

  return (
    <section 
      id="home-hero-banner"
      aria-label="Farm Experience and Livestock Overview"
      className="relative overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 md:p-10 shadow-2xl"
    >
      {/* Background imagery with dark overlay for optimal text contrast */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
        style={{ backgroundImage: `url(${farmHeroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-transparent" />

      {/* Hero Content Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Brand Story & CTA */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* 30+ Years Experience Highlight Badge */}
            <div 
              id="hero-experience-badge"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs sm:text-sm font-semibold shadow-md shadow-emerald-950/40"
            >
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{experienceText}</span>
            </div>

            <button
              id="hero-location-btn"
              type="button"
              onClick={() => onNavigate?.('location')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/80 text-neutral-300 text-xs sm:text-sm hover:border-emerald-500/60 hover:text-white transition-all cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Jauharabad, Khushab</span>
            </button>
          </div>

          {/* Farm Title & Logo */}
          <div className="flex items-center gap-3.5">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-600 p-0.5 shadow-xl shadow-emerald-950/60 shrink-0">
              <div className="w-full h-full rounded-[14px] overflow-hidden bg-neutral-900">
                <img
                  src={farmLogo}
                  alt="Raja Haqnawaz Dairy Farm Logo"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.src = '/raja-haqnawaz-dairy-farm/farm_logo.jpg';
                  }}
                />
              </div>
            </div>
            <div className="space-y-0.5">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight uppercase font-['Outfit']">
                {branding?.brandName || 'RAJA HAQNAWAZ DAIRY FARM'}
              </h1>
              <p className="text-emerald-400 font-medium text-xs sm:text-sm">
                {branding?.tagline || 'Healthy Animals | Quality Dairy | Better Tomorrow'}
              </p>
            </div>
          </div>

          {/* Value Proposition Description */}
          <p className="text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl">
            Established in 1994, offering over three decades of verified dairy excellence. Based at{' '}
            <strong className="text-white font-semibold">Naseem Colony near Imambargah, Jauharabad, District Khushab</strong>
            . Browse championship pure Sahiwal cows, prime Nili-Ravi dairy buffaloes, and stud pedigree bulls with comprehensive health and vaccination records.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Primary CTA Button for Exploring Livestock */}
            <button
              id="hero-explore-livestock-btn"
              type="button"
              onClick={() => onNavigate?.('marketplace')}
              className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm md:text-base flex items-center gap-2.5 shadow-lg shadow-emerald-950/80 hover:shadow-emerald-700/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Explore Livestock</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Secondary CTA for AI Farm Consultant */}
            <button
              id="hero-ask-ai-btn"
              type="button"
              onClick={() => onNavigate?.('ai')}
              className="py-3 px-5 rounded-xl bg-neutral-800/90 hover:bg-neutral-750 text-neutral-200 hover:text-white font-medium text-xs sm:text-sm md:text-base flex items-center gap-2 border border-neutral-700 hover:border-neutral-600 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Ask AI Consultant</span>
            </button>
          </div>
        </div>

        {/* Right Column: Verified Farm Credentials Card */}
        <div className="lg:col-span-5 hidden lg:block">
          <div className="p-5 md:p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800 backdrop-blur-md space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                Farm Verified Highlights
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/50 font-bold">
                Official Records
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block font-medium">Available Livestock</span>
                <span className="text-lg font-black text-emerald-400 mt-1 block">
                  {totalAnimals} Cattle
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block font-medium">Verified Heritage</span>
                <span className="text-lg font-black text-amber-400 mt-1 block">
                  30+ Yrs (1994)
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block font-medium">Pedigree Breeds</span>
                <span className="text-xs font-bold text-white mt-1 block truncate">
                  Sahiwal & Nili-Ravi
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800">
                <span className="text-[11px] text-neutral-400 block font-medium">Veterinary Care</span>
                <span className="text-xs font-bold text-emerald-300 mt-1 block flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  100% Certified
                </span>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-400 border-t border-neutral-800/80">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                Active Daily Inspection
              </span>
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Direct Transport Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
