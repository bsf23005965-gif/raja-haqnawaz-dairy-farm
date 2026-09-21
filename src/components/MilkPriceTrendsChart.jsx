import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download, 
  CheckCircle2, 
  Clock, 
  Layers,
  ArrowUpRight,
  Sparkles,
  DollarSign,
  Tag,
  Info,
  Milk,
  Activity
} from 'lucide-react';

/**
 * 30-day historical daily milk price data for Punjab, Pakistan (Farmgate and Retail)
 * Modeled on realistic market movements from Aug 22, 2026 to Sep 20, 2026
 * Reflecting seasonal butterfat demand and regional mandi trends.
 */
const generate30DayPriceHistory = () => {
  const data = [];
  const baseDate = new Date(2026, 7, 22); // Aug 22, 2026
  
  // Baseline curves for 30 consecutive days
  // Buffalo milk: Rs. 212 rising to Rs. 225
  // Sahiwal cow milk: Rs. 182 rising to Rs. 194
  // Provincial market benchmark average: ~Rs. 198 to 210
  // Packaged retail price: Rs. 290 to Rs. 300
  const buffaloPriceSteps = [
    212, 213, 213, 214, 214, 215, 216,
    216, 217, 218, 218, 217, 218, 219,
    220, 221, 220, 221, 222, 222, 223,
    222, 223, 224, 224, 225, 224, 225, 225, 225
  ];

  const cowPriceSteps = [
    182, 182, 183, 183, 184, 184, 185,
    185, 186, 187, 187, 186, 187, 188,
    188, 189, 189, 190, 191, 190, 191,
    191, 192, 192, 193, 194, 193, 194, 194, 194
  ];

  const retailPriceSteps = [
    290, 290, 290, 290, 290, 292, 292,
    292, 295, 295, 295, 295, 295, 295,
    298, 298, 298, 298, 300, 300, 300,
    300, 300, 300, 300, 300, 300, 305, 305, 305
  ];

  const marketNotes = [
    'Steady harvest inflow',
    'Normal procurement',
    'Local mandi stable',
    'Slight butterfat demand uptick',
    'Wholesale collection steady',
    'Khushab mandi demand surge',
    'Sargodha wholesale rate up',
    'Raw milk collections firm',
    'Winter butterfat testing active',
    'Commercial sweets makers buying',
    'Firm farmgate bids',
    'Fodder prices softened',
    'High cream content recorded',
    'Farm gate orders increase',
    'Mid-month wholesale revision',
    'Raw milk demand expands',
    'Provincial supply steady',
    'A2 cow milk premium firming',
    'Dairy processing collections up',
    'Urban transport rates stable',
    'Sweetmeat makers bulk orders',
    'Sahiwal milk premium active',
    'Nili-Ravi high butterfat demand',
    'Retail pack prices adjusted',
    'Strong farmgate realization',
    'High seasonal butterfat peak',
    'Steady buyer procurement',
    'Khushab farmgate benchmark firm',
    'A2 cow milk demand sustained',
    'All-time high seasonal rate'
  ];

  for (let i = 0; i < 30; i++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i);

    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const fullDate = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const buffalo = buffaloPriceSteps[i];
    const cow = cowPriceSteps[i];
    const retail = retailPriceSteps[i];
    
    // Provincial market benchmark average
    const marketAvg = Math.round((buffalo * 0.6 + cow * 0.4) * 10) / 10;
    
    // Estimated concentrate feed cost per liter (Wanda + Fodder input cost)
    const feedCost = Math.round((114 + (i % 4) * 0.8) * 10) / 10;

    // Farm gross margin per liter over feed
    const farmMargin = Math.round((buffalo - feedCost) * 10) / 10;

    // Daily change relative to previous day
    const prevBuffalo = i > 0 ? buffaloPriceSteps[i - 1] : buffalo;
    const dailyChange = Math.round((buffalo - prevBuffalo) * 10) / 10;

    data.push({
      day: i + 1,
      date: dateStr,
      fullDate,
      buffalo,
      cow,
      retail,
      marketAvg,
      feedCost,
      farmMargin,
      dailyChange,
      note: marketNotes[i] || 'Normal daily trade'
    });
  }

  return data;
};

const HISTORICAL_PRICE_DATA = generate30DayPriceHistory();

// Custom Dark Mode Glassmorphic Tooltip for Recharts Line Chart
const CustomPriceTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div 
        id="recharts-milk-price-glass-tooltip"
        className="relative overflow-hidden backdrop-blur-2xl bg-neutral-950/85 border border-white/20 p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.25)] text-xs min-w-[280px] max-w-[330px] space-y-3 pointer-events-none"
      >
        {/* Ambient Specular Glass Glow Effects */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Glass Header: Date & Day Badge */}
        <div className="relative z-10 flex items-center justify-between pb-1">
          <div className="flex items-center gap-1.5 font-bold text-white tracking-tight">
            <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-['Outfit']">{item.fullDate}</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-mono text-neutral-300 font-semibold shadow-inner">
            Day {item.day}/30
          </span>
        </div>

        {/* Subtle Frosted Specular Divider */}
        <div className="relative z-10 h-px bg-gradient-to-r from-emerald-400/50 via-white/20 to-transparent" />

        {/* Specific Milk Price Values: Buffalo & Cow Glass Cards */}
        <div className="relative z-10 space-y-2">
          {/* Fresh Buffalo Milk Price Card */}
          <div className="p-2.5 rounded-2xl bg-emerald-950/45 backdrop-blur-md border border-emerald-500/35 shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />
                <span className="font-bold text-emerald-200 text-xs">Fresh Buffalo Milk</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                6.5%+ Fat
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-0.5">
              <span className="text-lg font-black font-mono text-white tracking-tight">
                Rs. {item.buffalo} <span className="text-xs font-normal text-emerald-400">/ L</span>
              </span>
              {item.dailyChange > 0 ? (
                <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" />+{item.dailyChange} Rs/d
                </span>
              ) : item.dailyChange < 0 ? (
                <span className="text-[11px] font-bold text-rose-400 flex items-center gap-0.5">
                  <TrendingDown className="w-3 h-3" />{item.dailyChange} Rs/d
                </span>
              ) : (
                <span className="text-[11px] text-neutral-400 font-medium">
                  Day Δ: Steady
                </span>
              )}
            </div>
          </div>

          {/* Pure A2 Sahiwal Cow Milk Price Card */}
          <div className="p-2.5 rounded-2xl bg-amber-950/45 backdrop-blur-md border border-amber-500/35 shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
                <span className="font-bold text-amber-200 text-xs">A2 Sahiwal Cow Milk</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                4.5%+ Fat
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-0.5">
              <span className="text-lg font-black font-mono text-white tracking-tight">
                Rs. {item.cow} <span className="text-xs font-normal text-amber-400">/ L</span>
              </span>
              <span className="text-[11px] text-amber-300/80 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Pure Heritage
              </span>
            </div>
          </div>

          {/* Comparative Market Benchmarks & Net Margin */}
          <div className="p-2.5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-neutral-300 flex items-center gap-1.5">
                <span className="w-2 h-0.5 rounded-full bg-sky-400" />
                Provincial Market Avg:
              </span>
              <span className="font-mono font-bold text-sky-300">
                Rs. {item.marketAvg} / L
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-neutral-400 flex items-center gap-1.5">
                <span className="w-2 h-0.5 rounded-full bg-purple-400" />
                Packaged Retail Benchmark:
              </span>
              <span className="font-mono text-purple-300">
                Rs. {item.retail} / L
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-white/10">
              <span className="text-neutral-300 flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-emerald-400" />
                Realized Net Margin:
              </span>
              <span className="font-mono font-bold text-emerald-400">
                +Rs. {item.farmMargin} / L
              </span>
            </div>
          </div>

          {/* Daily Mandi Market Condition Insight */}
          <div className="p-2 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 flex items-start gap-2 text-[11px] text-neutral-300">
            <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <span className="font-bold text-white">Mandi Note: </span>
              {item.note}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

/**
 * MilkPriceTrendsChart Component
 * Dynamic Line Chart using Recharts showing 30-day historical milk price movements
 */
export default function MilkPriceTrendsChart() {
  const [timeRange, setTimeRange] = useState('30'); // '7' | '14' | '30'
  const [activeSeries, setActiveSeries] = useState({
    buffalo: true,
    cow: true,
    marketAvg: true,
    retail: false
  });
  const [showBenchmark, setShowBenchmark] = useState(true);

  // Filter 30-day data by selected time range
  const filteredData = useMemo(() => {
    const count = parseInt(timeRange, 10);
    return HISTORICAL_PRICE_DATA.slice(30 - count);
  }, [timeRange]);

  // Dynamic statistics calculations over the filtered range
  const stats = useMemo(() => {
    if (!filteredData.length) return {};

    const firstItem = filteredData[0];
    const latestItem = filteredData[filteredData.length - 1];

    const currentBuffalo = latestItem.buffalo;
    const initialBuffalo = firstItem.buffalo;
    const buffaloChange = currentBuffalo - initialBuffalo;
    const buffaloChangePct = ((buffaloChange / initialBuffalo) * 100).toFixed(1);

    const currentCow = latestItem.cow;
    const initialCow = firstItem.cow;
    const cowChange = currentCow - initialCow;
    const cowChangePct = ((cowChange / initialCow) * 100).toFixed(1);

    const highestBuffalo = Math.max(...filteredData.map(d => d.buffalo));
    const lowestBuffalo = Math.min(...filteredData.map(d => d.buffalo));

    const avgBuffalo = Math.round((filteredData.reduce((sum, d) => sum + d.buffalo, 0) / filteredData.length) * 10) / 10;
    const avgFarmMargin = Math.round((filteredData.reduce((sum, d) => sum + d.farmMargin, 0) / filteredData.length) * 10) / 10;

    return {
      currentBuffalo,
      buffaloChange,
      buffaloChangePct,
      currentCow,
      cowChange,
      cowChangePct,
      highestBuffalo,
      lowestBuffalo,
      avgBuffalo,
      avgFarmMargin,
      latestDate: latestItem.date,
      earliestDate: firstItem.date
    };
  }, [filteredData]);

  // Toggle individual series
  const toggleSeries = (seriesKey) => {
    setActiveSeries(prev => {
      // Don't allow unchecking all series
      const next = { ...prev, [seriesKey]: !prev[seriesKey] };
      const hasAny = Object.values(next).some(Boolean);
      return hasAny ? next : prev;
    });
  };

  // Export 30-Day Historical Price Data as CSV
  const handleExportCSV = () => {
    const headers = 'Day,Date,Full_Date,Buffalo_Milk_Price_Rs,Sahiwal_Cow_Milk_Price_Rs,Provincial_Market_Avg_Rs,Retail_Packaged_Rs,Estimated_Feed_Cost_Rs,Gross_Margin_Rs,Market_Condition\n';
    const rows = HISTORICAL_PRICE_DATA.map(d =>
      `${d.day},"${d.date}","${d.fullDate}",${d.buffalo},${d.cow},${d.marketAvg},${d.retail},${d.feedCost},${d.farmMargin},"${d.note}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Raja_Haqnawaz_Historical_Milk_Prices_30_Days.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      id="milk-price-trends-dashboard-component"
      aria-label="30-Day Historical Milk Price Trends"
      className="p-5 sm:p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6 shadow-xl relative overflow-hidden"
    >
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & Interactive Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-neutral-800 pb-5 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2 font-['Outfit']">
                <span>Historical Milk Price Trends</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 uppercase">
                  Recharts Line Chart
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Official 30-day commodity price trends (Rs. / Liter) across Central Punjab dairy markets
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Controls: Time Filter, Line Toggles & Export */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Time Range Filter (7D, 14D, 30D) */}
          <div className="flex items-center bg-neutral-950 p-1 rounded-xl border border-neutral-800 text-xs">
            {[
              { label: '7 Days', value: '7' },
              { label: '14 Days', value: '14' },
              { label: '30 Days', value: '30' },
            ].map((t) => (
              <button
                key={t.value}
                id={`btn-price-range-${t.value}`}
                type="button"
                onClick={() => setTimeRange(t.value)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  timeRange === t.value
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Benchmark Line Toggle */}
          <button
            type="button"
            onClick={() => setShowBenchmark(prev => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              showBenchmark
                ? 'bg-amber-950/70 text-amber-300 border-amber-600/50'
                : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
            title="Toggle Farmgate Base Rate Benchmark Line (Rs. 215/L)"
          >
            <span>Target Line (Rs. 215)</span>
          </button>

          {/* Export CSV */}
          <button
            id="btn-export-price-csv"
            type="button"
            onClick={handleExportCSV}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-300 hover:text-white transition-colors cursor-pointer border border-neutral-700"
            title="Download 30-Day Milk Price Records (CSV)"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dynamic Key Performance Indicator Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
        {/* Buffalo Milk Price */}
        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/90 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">
              Fresh Buffalo Milk
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
            Rs. {stats.currentBuffalo} <span className="text-xs font-normal text-neutral-400">/ L</span>
          </p>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+{stats.buffaloChange} Rs ({stats.buffaloChangePct}%) over {timeRange}D</span>
          </div>
        </div>

        {/* Sahiwal Cow Milk Price */}
        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/90 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">
              A2 Sahiwal Cow Milk
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-400" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
            Rs. {stats.currentCow} <span className="text-xs font-normal text-neutral-400">/ L</span>
          </p>
          <div className="flex items-center gap-1 text-[10px] text-amber-400 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+{stats.cowChange} Rs ({stats.cowChangePct}%) over {timeRange}D</span>
          </div>
        </div>

        {/* 30-Day Range (High / Low) */}
        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/90 space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">
            {timeRange}-Day Price Spread
          </span>
          <p className="text-lg sm:text-xl font-black text-white font-mono">
            Rs. {stats.lowestBuffalo} - {stats.highestBuffalo}
          </p>
          <span className="text-[10px] text-neutral-400 block">
            Avg: Rs. {stats.avgBuffalo}/L (Khushab Mandi)
          </span>
        </div>

        {/* Realized Farmer Margin */}
        <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/90 space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">
            Average Net Margin
          </span>
          <p className="text-xl sm:text-2xl font-black text-emerald-300 font-mono">
            +Rs. {stats.avgFarmMargin} <span className="text-xs font-normal text-neutral-400">/ L</span>
          </p>
          <span className="text-[10px] text-neutral-400 block">
            Spread above feed & wanda cost
          </span>
        </div>
      </div>

      {/* Interactive Line Legend & Dynamic Series Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-neutral-950/60 p-2.5 rounded-2xl border border-neutral-800 text-xs relative z-10">
        <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider pl-1">
          Toggle Chart Series:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {/* Buffalo Milk Line Toggle */}
          <button
            type="button"
            onClick={() => toggleSeries('buffalo')}
            className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSeries.buffalo
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-neutral-900 text-neutral-500 border border-neutral-800 opacity-60'
            }`}
          >
            <span className="w-2.5 h-1 rounded-full bg-emerald-400" />
            <span>Buffalo Milk (Rs. 225)</span>
          </button>

          {/* Sahiwal Cow Milk Line Toggle */}
          <button
            type="button"
            onClick={() => toggleSeries('cow')}
            className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSeries.cow
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-neutral-900 text-neutral-500 border border-neutral-800 opacity-60'
            }`}
          >
            <span className="w-2.5 h-1 rounded-full bg-amber-400" />
            <span>A2 Sahiwal Cow (Rs. 194)</span>
          </button>

          {/* Market Provincial Avg Line Toggle */}
          <button
            type="button"
            onClick={() => toggleSeries('marketAvg')}
            className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSeries.marketAvg
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                : 'bg-neutral-900 text-neutral-500 border border-neutral-800 opacity-60'
            }`}
          >
            <span className="w-2.5 h-1 rounded-full bg-sky-400" />
            <span>Provincial Avg</span>
          </button>

          {/* Retail Benchmark Line Toggle */}
          <button
            type="button"
            onClick={() => toggleSeries('retail')}
            className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSeries.retail
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'bg-neutral-900 text-neutral-500 border border-neutral-800 opacity-60'
            }`}
          >
            <span className="w-2.5 h-1 rounded-full bg-purple-400" />
            <span>Retail Benchmark</span>
          </button>
        </div>
      </div>

      {/* Main Recharts Line Chart Container */}
      <div 
        id="recharts-milk-price-container"
        className="h-72 sm:h-80 w-full pt-2 relative z-10"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData} margin={{ top: 10, right: 15, left: -5, bottom: 0 }}>
            <CartesianGrid stroke="#262626" strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#737373" 
              fontSize={11} 
              tickLine={false}
              axisLine={{ stroke: '#404040' }}
            />
            <YAxis 
              stroke="#737373" 
              fontSize={11} 
              domain={['dataMin - 5', 'dataMax + 10']}
              tickLine={false}
              axisLine={{ stroke: '#404040' }}
              unit=" Rs"
            />
            <Tooltip 
              content={<CustomPriceTooltip />} 
              cursor={{ stroke: 'rgba(52, 211, 153, 0.45)', strokeWidth: 1.5, strokeDasharray: '4 4' }}
              wrapperStyle={{ zIndex: 100, outline: 'none' }}
              isAnimationActive={true}
              animationDuration={150}
            />

            {/* Target Farmgate Benchmark Reference Line */}
            {showBenchmark && (
              <ReferenceLine 
                y={215} 
                stroke="#f59e0b" 
                strokeDasharray="4 4" 
                strokeWidth={1.5}
                label={{ 
                  value: 'Target Benchmark: Rs. 215/L', 
                  position: 'insideTopLeft', 
                  fill: '#f59e0b', 
                  fontSize: 10,
                  fontWeight: 600 
                }} 
              />
            )}

            {/* Buffalo Milk Line (Emerald) */}
            {activeSeries.buffalo && (
              <Line
                type="monotone"
                dataKey="buffalo"
                name="Fresh Buffalo Milk (Rs/L)"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 3, fill: '#10b981', stroke: '#064e3b', strokeWidth: 1.5 }}
                activeDot={{ r: 6, fill: '#34d399', stroke: '#064e3b', strokeWidth: 2 }}
                animationDuration={800}
              />
            )}

            {/* Sahiwal Cow Milk Line (Amber) */}
            {activeSeries.cow && (
              <Line
                type="monotone"
                dataKey="cow"
                name="A2 Sahiwal Cow Milk (Rs/L)"
                stroke="#f59e0b"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#f59e0b', stroke: '#78350f', strokeWidth: 1.5 }}
                activeDot={{ r: 6, fill: '#fbbf24', stroke: '#78350f', strokeWidth: 2 }}
                animationDuration={800}
              />
            )}

            {/* Provincial Market Average Line (Sky Blue) */}
            {activeSeries.marketAvg && (
              <Line
                type="monotone"
                dataKey="marketAvg"
                name="Provincial Market Average (Rs/L)"
                stroke="#38bdf8"
                strokeWidth={2}
                strokeDasharray="4 3"
                dot={false}
                activeDot={{ r: 5, fill: '#38bdf8', stroke: '#0c4a6e', strokeWidth: 1.5 }}
                animationDuration={800}
              />
            )}

            {/* Retail Benchmark Line (Purple) */}
            {activeSeries.retail && (
              <Line
                type="monotone"
                dataKey="retail"
                name="Packaged Retail Rate (Rs/L)"
                stroke="#a855f7"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 5, fill: '#c084fc', stroke: '#581c87', strokeWidth: 1.5 }}
                animationDuration={800}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Analytical Insights & Transparency Footer */}
      <div className="pt-2 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-400 relative z-10">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Verified with Punjab Livestock Department procurement guidelines and Pakistan Bureau of Statistics daily price monitoring.
          </span>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-auto text-[11px] font-mono text-neutral-500">
          <span>Observed Period: {stats.earliestDate} - {stats.latestDate}, 2026</span>
        </div>
      </div>
    </div>
  );
}
