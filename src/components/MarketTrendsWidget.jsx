import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Globe, 
  ArrowRight, 
  Newspaper, 
  Milk, 
  Clock, 
  ExternalLink,
  Sparkles,
  Search
} from 'lucide-react';
import { MarketNewsService } from '../services/MarketNewsService.js';

export default function MarketTrendsWidget({ onNavigate }) {
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    MarketNewsService.getMarketTrends('all')
      .then((data) => {
        if (isMounted) setTrends(data);
      })
      .catch((err) => console.error('Failed to fetch widget market trends:', err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const topTickers = (trends?.priceTickers || []).slice(0, 4);
  const topNews = (trends?.news || []).slice(0, 2);

  return (
    <section className="w-full rounded-3xl bg-neutral-900 border border-neutral-800 p-5 sm:p-7 space-y-5 shadow-xl relative overflow-hidden">
      {/* Decorative subtle background gradient */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Google Search badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/40">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-black text-white uppercase font-['Outfit']">
              Live Dairy Prices & Market News (مارکیٹ ریٹس)
            </h2>
          </div>
          <p className="text-xs text-neutral-400">
            Current farmgate milk rates, mandi livestock demand, and cattle feed prices grounded via Google Search API.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Google Search Grounded</span>
          </span>
          <button
            onClick={() => onNavigate('market_trends')}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <span>Full Market View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Price Benchmarks Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 relative z-10">
        {topTickers.map((ticker) => {
          const isUp = ticker.trend === 'up';
          const isDown = ticker.trend === 'down';
          return (
            <div 
              key={ticker.id}
              onClick={() => onNavigate('market_trends')}
              className="p-3 rounded-xl bg-neutral-850 border border-neutral-800 hover:border-emerald-500/50 cursor-pointer transition-all space-y-1 group"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-neutral-400 truncate max-w-[90px]">
                  {ticker.name}
                </span>
                <span className={`text-[10px] font-bold ${isUp ? 'text-emerald-400' : isDown ? 'text-rose-400' : 'text-neutral-400'}`}>
                  {ticker.change}
                </span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-white font-mono group-hover:text-emerald-300 transition-colors">
                {ticker.price}
              </div>
              <div className="text-[10px] text-neutral-500 truncate">
                {ticker.note}
              </div>
            </div>
          );
        })}
      </div>

      {/* Top News Headlines Snippet */}
      <div className="space-y-2.5 relative z-10">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
            <Newspaper className="w-3.5 h-3.5 text-emerald-400" />
            <span>Latest Industry Headlines</span>
          </span>
          <span className="text-[11px] text-neutral-500">
            Updated Today
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topNews.map((article) => (
            <div 
              key={article.id}
              className="p-3.5 rounded-xl bg-neutral-850/70 border border-neutral-800 hover:border-neutral-700 transition-colors space-y-1.5 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                    {article.category}
                  </span>
                  <span className="text-neutral-500">{article.published}</span>
                </div>
                <h4 className="text-xs font-bold text-neutral-100 leading-snug">
                  {article.title}
                </h4>
                <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px]">
                <span className="text-neutral-500 truncate max-w-[150px]">
                  {article.source}
                </span>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
                >
                  <span>Source</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer bar with Search Call-to-Action */}
      <div className="pt-3 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-400 relative z-10">
        <div className="flex items-center gap-1.5 text-[11px]">
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span>Grounded live with verified sources: Dawn Agri, PBS, & Livestock Punjab</span>
        </div>
        <button
          onClick={() => onNavigate('market_trends')}
          className="text-emerald-400 hover:text-emerald-300 font-bold text-xs flex items-center gap-1 self-start sm:self-auto transition-colors"
        >
          <span>Search Any Livestock Commodity Rates</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}
