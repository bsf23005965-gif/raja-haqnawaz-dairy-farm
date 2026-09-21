import React, { useState } from 'react';
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Camera,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { getAnimalInspectionGallery } from '../constants/cattleImageAngles.js';

export default function CattleAngleGalleryViewer({ animal }) {
  const gallery = getAnimalInspectionGallery(animal);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!gallery || gallery.length === 0) return null;

  const currentAngle = gallery[activeIndex] || gallery[0];
  const isSold = animal.availability === 'Sold';
  const isReserved = animal.availability === 'Reserved';

  const handlePrev = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      {/* Main Image Showcase with Multi-Angle Badges & Controls */}
      <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 aspect-[16/10] shadow-2xl group">
        <img
          src={currentAngle.url}
          alt={`${animal.name} - ${currentAngle.label}`}
          className="w-full h-full object-cover transition-all duration-300 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
          onError={(e) => {
            e.target.src = '/assets/cattle/sahiwal_body.jpg';
          }}
        />

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          {/* Availability Badge */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-lg ${
              isSold 
                ? 'bg-rose-600 text-white' 
                : isReserved 
                ? 'bg-amber-600 text-white' 
                : 'bg-emerald-600 text-white'
            }`}
          >
            {animal.availability}
          </span>

          {/* Active Angle Indicator */}
          <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950/90 backdrop-blur-md border border-neutral-700/60 text-white text-xs font-bold shadow-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{currentAngle.label}</span>
            <span className="text-emerald-400 text-[11px] font-medium hidden sm:inline">({currentAngle.urduLabel})</span>
          </div>
        </div>

        {/* Previous / Next Arrow Controls */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all opacity-80 hover:opacity-100 hover:scale-105"
          aria-label="Previous angle"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all opacity-80 hover:opacity-100 hover:scale-105"
          aria-label="Next angle"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bottom Inspection Details Bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-neutral-950/90 backdrop-blur-md text-xs font-bold text-emerald-300 border border-neutral-700">
              {animal.breed}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-neutral-950/80 backdrop-blur-md text-[11px] text-neutral-300 hidden sm:inline">
              Angle {activeIndex + 1} of {gallery.length}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="pointer-events-auto flex items-center gap-1.5 px-3 py-1 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-white text-xs font-semibold backdrop-blur-md border border-neutral-700 shadow transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Full View</span>
          </button>
        </div>
      </div>

      {/* 5-Angle Thumbnail Selector Row */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
            5-Point Inspection Angles (معائنہ تصاویر)
          </span>
          <span className="text-[11px] text-emerald-400/90">
            Click any angle to view details
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {gallery.map((item, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative rounded-xl overflow-hidden aspect-[4/3] border transition-all text-left group ${
                  isSelected
                    ? 'border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg scale-[1.02]'
                    : 'border-neutral-800 hover:border-neutral-700 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={item.url}
                  alt={item.label}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/cattle/sahiwal_body.jpg';
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent ${isSelected ? 'opacity-80' : 'opacity-60'}`} />

                {/* Angle Number & Label */}
                <div className="absolute bottom-1 left-1 right-1 leading-none">
                  <span className="text-[9px] font-extrabold text-white block truncate">
                    {item.label}
                  </span>
                  <span className="text-[8px] text-emerald-300 font-medium truncate block">
                    {item.urduLabel}
                  </span>
                </div>

                {isSelected && (
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 shadow-sm" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Veterinary Angle Clinical Note */}
      <div className="p-3 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-xs flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white block">
            {currentAngle.label} ({currentAngle.urduLabel}):
          </span>
          <p className="text-neutral-400 text-[11px] mt-0.5 leading-relaxed">
            {currentAngle.description}
          </p>
        </div>
      </div>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Modal Header */}
          <div 
            className="w-full max-w-4xl flex items-center justify-between mb-3 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="text-base font-black text-white">
                {animal.name} — {currentAngle.label}
              </h3>
              <p className="text-xs text-emerald-400 font-medium">
                {currentAngle.urduLabel} • Angle {activeIndex + 1} of {gallery.length}
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Image Box */}
          <div 
            className="relative max-w-4xl w-full max-h-[75vh] flex items-center justify-center rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentAngle.url}
              alt={currentAngle.label}
              className="max-w-full max-h-[75vh] object-contain rounded-xl"
            />

            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Selector in Modal */}
          <div 
            className="flex items-center gap-2 mt-4 max-w-md w-full justify-center overflow-x-auto py-1"
            onClick={(e) => e.stopPropagation()}
          >
            {gallery.map((g, idx) => (
              <button
                key={g.key}
                onClick={() => setActiveIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeIndex === idx
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
