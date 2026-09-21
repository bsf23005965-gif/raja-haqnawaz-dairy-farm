import React, { useState, useEffect } from 'react';
import { BRANDING } from '../../constants/branding.js';
import { FARM_CONTACT } from '../../constants/farmContact.js';
import { Sparkles, ArrowRight, ShieldCheck, Award } from 'lucide-react';

export default function SplashScreen({ onGetStarted }) {
  const [counter, setCounter] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Experience counter animation from 0 to 30
    const duration = 1200;
    const steps = 30;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev < 30) return prev + 1;
        clearInterval(timer);
        return 30;
      });
    }, intervalTime);

    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 1400);

    return () => {
      clearInterval(timer);
      clearTimeout(readyTimer);
    };
  }, []);

  return (
    <div className="relative min-h-[92vh] flex flex-col justify-between items-center text-center p-6 overflow-hidden bg-neutral-950">
      {/* Farm Background with subtle overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 scale-105 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url(${BRANDING.farmHeroImage})`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />

      {/* Top Experience Pill */}
      <div className="relative z-10 pt-4 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-lg shadow-emerald-950/50">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Established 1994 • Jauharabad, District Khushab</span>
        </div>
      </div>

      {/* Center Branding Block */}
      <div className="relative z-10 flex flex-col items-center my-auto max-w-sm">
        {/* Founder Photograph & Crest Badge */}
        <div className="relative mb-5 group">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-emerald-500 to-green-600 shadow-2xl shadow-emerald-900/60 transition-transform duration-700 hover:scale-105">
            <div className="w-full h-full rounded-full overflow-hidden bg-neutral-900 border-2 border-neutral-950 relative flex items-center justify-center">
              <img
                src={BRANDING.fallbackPhoto}
                alt="Raja Haqnawaz"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-1">
                <span className="text-[10px] font-bold text-amber-200 tracking-wider">RAJA HAQNAWAZ</span>
              </div>
            </div>
          </div>

          {/* Experience Counter Badge */}
          <div className="absolute -bottom-2 -right-1 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-black px-2.5 py-1 rounded-full text-xs shadow-lg border border-amber-300/40 flex items-center gap-1">
            <span className="text-sm font-extrabold">{counter}+</span>
            <span className="text-[9px] uppercase tracking-tighter">Yrs Exp</span>
          </div>
        </div>

        {/* Farm Name */}
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2 leading-tight uppercase font-['Outfit']">
          {BRANDING.brandName}
        </h1>

        {/* Tagline */}
        <p className="text-emerald-400 font-medium text-xs sm:text-sm tracking-wide mb-3">
          {BRANDING.tagline}
        </p>

        {/* 30+ Years Experience Highlight */}
        <div className="w-full bg-neutral-900/80 border border-neutral-800 rounded-2xl p-3 mb-4 backdrop-blur-sm">
          <p className="text-xs text-neutral-300 leading-relaxed">
            More than <span className="text-emerald-400 font-bold">30 years</span> of trusted pedigree livestock breeding, pure milk production, and honest farmer relations across Pakistan.
          </p>
        </div>

        {/* Direct WhatsApp & Call info */}
        <div className="flex items-center gap-4 text-[11px] text-neutral-400 mb-1.5">
          <span>WhatsApp: <strong className="text-white">{FARM_CONTACT.displayWhatsapp}</strong></span>
          <span>•</span>
          <span>Call: <strong className="text-white">{FARM_CONTACT.displayPhone}</strong></span>
        </div>

        <p className="text-[11px] text-emerald-400/90 font-medium">
          📍 Naseem Colony near Imambargah, Jauharabad, Khushab
        </p>
      </div>

      {/* Bottom Button Action */}
      <div className="relative z-10 w-full max-w-xs pb-4">
        <button
          onClick={onGetStarted}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-emerald-950/70 border border-emerald-400/30 flex items-center justify-center gap-2 group transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>Explore Livestock Marketplace</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-300" />
        </button>

        <p className="text-[10px] text-neutral-400 mt-3 font-medium">
          Raja Haqnawaz Dairy Farm • Naseem Colony, Jauharabad, Khushab • Est. 1994
        </p>
      </div>
    </div>
  );
}
