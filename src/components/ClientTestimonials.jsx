import React, { useState } from 'react';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  Award, 
  MapPin, 
  ShieldCheck, 
  ThumbsUp, 
  ChevronLeft, 
  ChevronRight,
  MessageSquareHeart,
  Calendar
} from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '../constants/testimonials.js';

/**
 * ClientTestimonials Component for the Home View
 * Showcases verified customer reviews, ratings, and testimonials from past cattle buyers,
 * reinforcing the farm's 30+ years of pedigree breeding and dairy expertise.
 */
export default function ClientTestimonials({ onNavigate }) {
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Repeat Customer', 'Nili-Ravi Specialist', 'Breeding Genetics', 'Family Farm'];

  const filteredReviews = activeFilter === 'All'
    ? testimonials
    : testimonials.filter((item) => item.tag === activeFilter);

  // Overall Trust Statistics
  const trustStats = [
    { label: 'Verified Experience', value: '30+ Years', sub: 'Est. 1994 in Jauharabad' },
    { label: 'Customer Satisfaction', value: '99.4%', sub: 'Over 1,200+ Livestock Dispatches' },
    { label: 'Certified Pedigrees', value: '100%', sub: 'Genuine Sahiwal & Nili-Ravi' },
    { label: 'Milk Yield Accuracy', value: 'Verified', sub: 'On-site Morning & Evening Milking' },
  ];

  return (
    <section 
      id="home-client-testimonials-section"
      aria-label="Client Testimonials and Customer Trust"
      className="space-y-6 pt-2"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Built on 30+ Years of Customer Trust
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Outfit']">
            What Dairy Farmers & Buyers Say
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl">
            Real feedback from commercial dairy owners, progressive breeders, and families across Pakistan who rely on Raja Haqnawaz Dairy Farm for authentic livestock genetics.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Trust Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {trustStats.map((stat, idx) => (
          <div 
            key={idx}
            className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 space-y-1"
          >
            <span className="text-xs text-neutral-400 font-medium block">
              {stat.label}
            </span>
            <span className="text-xl sm:text-2xl font-black text-amber-400 block tracking-tight font-['Outfit']">
              {stat.value}
            </span>
            <span className="text-[11px] text-emerald-400 block truncate">
              {stat.sub}
            </span>
          </div>
        ))}
      </div>

      {/* Testimonial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            id={`testimonial-card-${rev.id}`}
            className="rounded-3xl bg-neutral-900/90 border border-neutral-800 p-6 sm:p-7 flex flex-col justify-between space-y-5 hover:border-emerald-500/50 transition-all duration-300 shadow-xl group relative overflow-hidden"
          >
            {/* Background Decorative Quote Accent */}
            <Quote className="absolute right-4 bottom-4 w-24 h-24 text-neutral-800/20 pointer-events-none group-hover:text-emerald-950/20 transition-colors" />

            <div className="space-y-4 relative z-10">
              {/* Card Header: Rating, Tag, and Purchased Animal */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800/80 pb-3.5">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-700'
                      }`} 
                    />
                  ))}
                  <span className="text-xs font-black text-white ml-1.5">
                    {rev.rating}.0
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-800/50 text-[10px] font-black uppercase tracking-wider">
                    {rev.tag}
                  </span>
                </div>
              </div>

              {/* Verified Animal Purchased Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-950/80 border border-neutral-800 text-neutral-300 text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-neutral-400">Purchased:</span>
                <strong className="text-white font-semibold">{rev.animalPurchased}</strong>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed italic relative">
                "{rev.comment}"
              </p>

              {/* Trust Highlight Pill */}
              <div className="inline-block">
                <span className="text-[11px] font-semibold text-amber-300/90 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                  ★ Key Highlight: {rev.highlight}
                </span>
              </div>
            </div>

            {/* Author Footer */}
            <div className="relative z-10 pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700 shrink-0">
                  <img
                    src={rev.avatar}
                    alt={rev.customerName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/farm_logo.jpg';
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white">
                      {rev.customerName}
                    </h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" title="Verified Customer" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{rev.location}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-semibold">
                  Experience
                </span>
                <span className="text-[11px] font-semibold text-neutral-300">
                  {rev.farmExperience}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
