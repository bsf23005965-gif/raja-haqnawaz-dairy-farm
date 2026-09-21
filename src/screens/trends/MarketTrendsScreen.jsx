import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Search, 
  RefreshCw, 
  Globe, 
  ExternalLink, 
  Newspaper, 
  Milk, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Tag, 
  MapPin, 
  PhoneCall, 
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { MarketNewsService } from '../../services/MarketNewsService.js';
import { WhatsAppService } from '../../services/WhatsAppService.js';
import { PhoneService } from '../../services/PhoneService.js';
import MilkPriceTrendsChart from '../../components/MilkPriceTrendsChart.jsx';

export default function MarketTrendsScreen({ onNavigate }) {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Custom Google Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [searchError, setSearchError] = useState(null);

  const fetchTrends = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await MarketNewsService.getMarketTrends(activeCategory);
      setMarketData(data);
    } catch (err) {
      console.error('Error loading market trends:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, [activeCategory]);

  const handleCustomSearch = async (e) => {
    e?.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError(null);

    try {
      const result = await MarketNewsService.searchMarket(searchQuery.trim());
      setSearchResults(result);
    } catch (err) {
      console.error('Custom search failed:', err);
      setSearchError('Search failed. Please try again or check connection.');
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(null);
    setSearchError(null);
  };

  const quickSearchPills = [
    'Buffalo milk price today',
    'Sahiwal cow mandi rates',
    'Cattle feed wanda price',
    'Cottonseed cake khal price',
    'Punjab dairy export policy'
  ];

  const categories = [
    { id: 'all', label: 'All Updates' },
    { id: 'dairy', label: 'Dairy & Milk' },
    { id: 'livestock', label: 'Livestock & Mandi' },
    { id: 'feed', label: 'Feed & Fodder' },
    { id: 'policy', label: 'Policy & Health' }
  ];

  const filteredNews = (marketData?.news || []).filter(item => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'dairy') return item.category.toLowerCase().includes('dairy') || item.category.toLowerCase().includes('milk');
    if (activeCategory === 'livestock') return item.category.toLowerCase().includes('livestock') || item.category.toLowerCase().includes('mandi');
    if (activeCategory === 'feed') return item.category.toLowerCase().includes('feed') || item.category.toLowerCase().includes('fodder');
    if (activeCategory === 'policy') return item.category.toLowerCase().includes('policy') || item.category.toLowerCase().includes('health');
    return true;
  });

  return (
    <div className="w-full space-y-6 sm:space-y-8 pb-12">
      {/* Page Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-emerald-950/40 border border-neutral-800 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Google Search API Grounded</span>
              </span>
              <span className="inline-flex items-center gap-1 text-neutral-400 text-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>Live Agricultural Market Intelligence</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
              Livestock & Dairy Market Trends
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Real-time commodity rates, live mandi cattle valuations, and dairy news grounded with Google Search. Stay informed with official farmgate benchmarks across Punjab and Pakistan.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => fetchTrends(true)}
              disabled={refreshing || loading}
              className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-bold flex items-center gap-2 border border-neutral-700 transition-all active:scale-95 disabled:opacity-50"
              title="Refresh live data via Google Search"
            >
              <RefreshCw className={`w-4 h-4 text-emerald-400 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Fetching Live Data...' : 'Refresh Rates'}</span>
            </button>
            <button
              onClick={() => onNavigate('marketplace')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all active:scale-95"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Live Commodity Price Ticker Grid */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-['Outfit']">
              Live Price Benchmarks (زندہ مارکیٹ ریٹس)
            </h2>
          </div>
          <span className="text-[11px] text-neutral-400">
            Source: Google Search & PBS Market Index
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {(marketData?.priceTickers || []).map((ticker) => {
            const isUp = ticker.trend === 'up';
            const isDown = ticker.trend === 'down';
            return (
              <div 
                key={ticker.id}
                className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700 transition-all flex flex-col justify-between space-y-2 group shadow-sm hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors">
                      {ticker.name}
                    </h3>
                    <p className="text-[11px] text-neutral-400">{ticker.unit}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                    isUp 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : isDown 
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' 
                        : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                  }`}>
                    {isUp && <TrendingUp className="w-3 h-3" />}
                    {isDown && <TrendingDown className="w-3 h-3" />}
                    {!isUp && !isDown && <Minus className="w-3 h-3" />}
                    <span>{ticker.change}</span>
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-1 border-t border-neutral-800/60">
                  <span className="text-base sm:text-lg font-black text-white font-mono">
                    {ticker.price}
                  </span>
                  <span className="text-[10px] text-neutral-400 italic">
                    {ticker.note}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Historical 30-Day Milk Price Trends Line Chart (Recharts) */}
      <section>
        <MilkPriceTrendsChart />
      </section>

      {/* Interactive Google Search Bar for Custom Livestock Queries */}
      <section className="rounded-3xl bg-neutral-900/90 border border-neutral-800 p-5 sm:p-7 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Globe className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                Search Google for Livestock & Dairy News
              </h2>
            </div>
            <p className="text-xs text-neutral-400">
              Query live dairy prices, mandi valuations, cattle feed rates, or veterinary regulations directly.
            </p>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono self-start sm:self-auto bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/50">
            Grounding: @google/genai
          </span>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleCustomSearch} className="space-y-3">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. Buffalo milk price in Sargodha, Sahiwal cow mandi rates, Corn silage rates..."
              className="w-full pl-11 pr-28 py-3 rounded-2xl bg-neutral-950 border border-neutral-750 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
            />
            <div className="absolute right-2 flex items-center gap-1.5">
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="p-1.5 text-xs text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
                >
                  Clear
                </button>
              )}
              <button
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <span>Search</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Search Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-neutral-500 text-[11px]">Popular:</span>
            {quickSearchPills.map((pill, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSearchQuery(pill);
                  MarketNewsService.searchMarket(pill).then(res => setSearchResults(res));
                }}
                className="px-2.5 py-1 rounded-lg bg-neutral-800/80 hover:bg-neutral-750 text-neutral-300 hover:text-emerald-300 text-[11px] border border-neutral-700/60 transition-colors"
              >
                {pill}
              </button>
            ))}
          </div>
        </form>

        {/* Custom Search Result Box */}
        {searchResults && (
          <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-neutral-950 border border-emerald-900/60 space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-bold text-emerald-400">
                  Google Search Intelligence Result
                </span>
                <span className="text-[11px] text-neutral-400">
                  for "{searchResults.query}"
                </span>
              </div>
              <button
                onClick={() => setSearchResults(null)}
                className="text-[11px] text-neutral-400 hover:text-white"
              >
                Dismiss
              </button>
            </div>

            <div className="text-xs sm:text-sm text-neutral-200 leading-relaxed whitespace-pre-line">
              {searchResults.answer}
            </div>

            {/* Citations & Sources */}
            {searchResults.sources && searchResults.sources.length > 0 && (
              <div className="pt-2 border-t border-neutral-800/80 space-y-1.5">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Grounding Sources & Web References:
                </span>
                <div className="flex flex-wrap gap-2">
                  {searchResults.sources.map((src, idx) => (
                    <a
                      key={idx}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-emerald-400 text-[11px] border border-neutral-800 hover:border-emerald-700/60 transition-colors"
                    >
                      <Globe className="w-3 h-3" />
                      <span className="truncate max-w-[200px]">{src.title}</span>
                      <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {searchError && (
          <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{searchError}</span>
          </div>
        )}
      </section>

      {/* AI Market Briefing Summary Card */}
      {marketData?.aiAnalysis && (
        <section className="rounded-3xl bg-neutral-900/80 border border-neutral-800 p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-['Outfit']">
              Market Intelligence Briefing
            </h2>
            <span className="ml-auto text-[11px] text-neutral-400">
              {marketData.sourceType}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {marketData.aiAnalysis}
          </p>
        </section>
      )}

      {/* Category Tabs and Latest News Articles Grid */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-['Outfit']">
              Latest Livestock & Dairy News
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-neutral-850 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNews.map((article) => (
            <article 
              key={article.id}
              className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800/90 hover:border-neutral-700 transition-all flex flex-col justify-between space-y-3 group shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 text-[11px]">
                  <span className="font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    {article.category}
                  </span>
                  <span className="text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.published}</span>
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800/60 space-y-2">
                {article.impact && (
                  <div className="flex items-center gap-1.5 text-[11px] text-amber-300/90 bg-amber-950/20 px-2.5 py-1 rounded-lg border border-amber-800/30">
                    <span className="font-bold">Market Impact:</span>
                    <span>{article.impact}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[11px] text-neutral-400 truncate max-w-[200px]">
                    Source: {article.source}
                  </span>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                  >
                    <span>Read Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Regional Fresh Milk Price Comparison Table */}
      <section className="rounded-3xl bg-neutral-900 border border-neutral-800 p-5 sm:p-7 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Milk className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-['Outfit']">
                Regional Raw Milk Rates Matrix (پنجاب اور سندھ کے ریٹس)
              </h2>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Comparing commercial farmgate vs urban retail prices across dairy corridors.
            </p>
          </div>
          <span className="text-[11px] text-neutral-400 self-start sm:self-auto">
            Updated Today
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3 font-bold">Region / Dairy Hub</th>
                <th className="py-2.5 px-3 font-bold">Farmgate Realization</th>
                <th className="py-2.5 px-3 font-bold">Urban Retail Rate</th>
                <th className="py-2.5 px-3 font-bold text-right">Market Dynamics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-mono">
              {(marketData?.regionalPrices || []).map((row, idx) => (
                <tr key={idx} className="hover:bg-neutral-850/50 transition-colors">
                  <td className="py-3 px-3 font-sans font-bold text-neutral-200 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{row.city}</span>
                  </td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">
                    {row.farmgate}
                  </td>
                  <td className="py-3 px-3 text-neutral-300">
                    {row.retail}
                  </td>
                  <td className="py-3 px-3 text-right font-sans">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-800 text-neutral-300 border border-neutral-700">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Direct Contact / Booking Call to Action */}
      <section className="rounded-3xl bg-emerald-950/40 border border-emerald-800/60 p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5 text-center md:text-left">
          <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
            Planning Dairy Expansion or High-Yield Cattle Procurement?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
            Raja Haqnawaz Dairy Farm provides pedigree Sahiwal cows and Nili-Ravi buffaloes with certified lactation tests, direct from our breeding facility in Jauharabad, Khushab.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => WhatsAppService.sendInquiry({ type: 'General', name: 'Livestock Market Consultation' })}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Raja Haqnawaz</span>
          </button>
          <button
            onClick={() => PhoneService.callFarm()}
            className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-bold flex items-center gap-2 border border-neutral-700 transition-all active:scale-95"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>0300 6072070</span>
          </button>
        </div>
      </section>
    </div>
  );
}
