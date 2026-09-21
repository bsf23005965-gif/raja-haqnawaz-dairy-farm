import React, { useState } from 'react';
import { useAnimalStore } from '../../stores/animalStore.js';
import { AIService } from '../../services/AIService.js';
import { 
  Sparkles, 
  Search, 
  Milk, 
  CheckCircle2, 
  SlidersHorizontal, 
  Loader2, 
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

export default function AIRecommenderTab({ onNavigate }) {
  const { animals, selectAnimal } = useAnimalStore();

  const [preferences, setPreferences] = useState({
    budget: 450000,
    breed: 'All',
    type: 'Cow',
    minMilk: 18,
    maxAge: 5,
    gender: 'Female'
  });

  const [recommended, setRecommended] = useState([]);
  const [aiInsights, setAiInsights] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);

  const handleComputeRecommendations = async () => {
    setIsCalculating(true);
    try {
      // 1. Compute Deterministic recommendations (strictly excluding Sold)
      const scored = AIService.computeDeterministicRecommendations(animals, preferences);
      const topPicks = scored.slice(0, 4);
      setRecommended(topPicks);

      // 2. Fetch AI Insights
      const insights = await AIService.getRecommendationInsights(topPicks, preferences);
      setAiInsights(insights);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCalculating(false);
    }
  };

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
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Preferences */}
        <div className="lg:col-span-5 p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Recommendation Parameters
            </h3>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Budget */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-neutral-400 font-medium">Purchase Budget</span>
                <span className="text-amber-400 font-bold">Rs. {Number(preferences.budget).toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="150000"
                max="750000"
                step="25000"
                value={preferences.budget}
                onChange={(e) => setPreferences({ ...preferences, budget: Number(e.target.value) })}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Breed Preference */}
            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">Breed Preference</label>
              <select
                value={preferences.breed}
                onChange={(e) => setPreferences({ ...preferences, breed: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              >
                {breeds.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Animal Type */}
            <div className="space-y-1">
              <label className="text-neutral-400 font-medium">Livestock Type</label>
              <select
                value={preferences.type}
                onChange={(e) => setPreferences({ ...preferences, type: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-850 border border-neutral-750 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Types</option>
                <option value="Cow">Cow (Milch)</option>
                <option value="Buffalo">Buffalo (Black Gold)</option>
                <option value="Bull">Stud Bull</option>
                <option value="Calf">Heifer / Calf</option>
              </select>
            </div>

            {/* Desired Milk */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-neutral-400 font-medium">Desired Daily Milk Yield</span>
                <span className="text-emerald-400 font-bold">{preferences.minMilk} L / Day</span>
              </div>
              <input
                type="range"
                min="0"
                max="32"
                step="2"
                value={preferences.minMilk}
                onChange={(e) => setPreferences({ ...preferences, minMilk: Number(e.target.value) })}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Age */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-neutral-400 font-medium">Maximum Age</span>
                <span className="text-white font-bold">{preferences.maxAge} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={preferences.maxAge}
                onChange={(e) => setPreferences({ ...preferences, maxAge: Number(e.target.value) })}
                className="w-full accent-emerald-500"
              />
            </div>
          </div>

          <button
            onClick={handleComputeRecommendations}
            disabled={isCalculating}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition-all"
          >
            {isCalculating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Running Weighted Multi-Factor Scoring...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Compute Best Livestock Matches</span>
              </>
            )}
          </button>
        </div>

        {/* Right Area: Results & Explanations */}
        <div className="lg:col-span-7 space-y-4">
          {aiInsights && (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Raja Haqnawaz Dairy Evaluation Commentary</span>
              </div>
              <p className="text-xs text-neutral-200 leading-relaxed italic">
                "{aiInsights}"
              </p>
            </div>
          )}

          {recommended.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-400 px-1">
                <span>Top Matching Animals (Excluding Sold)</span>
                <span className="text-[11px] text-neutral-500">Price 30% • Breed 20% • Milk 25% • Age 10%</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recommended.map((animal) => (
                  <div
                    key={animal.id}
                    className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-emerald-700/60 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-800 shrink-0">
                        <img
                          src={animal.imageUrl}
                          alt={animal.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-emerald-400 font-bold uppercase">{animal.breed}</span>
                          <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                            {animal.matchScore}% Match
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white truncate mt-0.5">{animal.name}</h4>
                        <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-1">
                          <span>{animal.age} Yrs</span>
                          {animal.milkProductionPerDay > 0 && (
                            <span>• {animal.milkProductionPerDay} L/day</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                      <span className="text-xs font-black text-amber-400">
                        Rs. {animal.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => {
                          selectAnimal(animal);
                          onNavigate('animal_details');
                        }}
                        className="py-1 px-3 rounded-lg bg-neutral-800 hover:bg-emerald-600 hover:text-white text-neutral-200 text-[11px] font-semibold transition-colors"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-neutral-900/60 border border-neutral-800 text-center space-y-3 flex flex-col items-center justify-center min-h-[300px]">
              <Sparkles className="w-10 h-10 text-neutral-600" />
              <h4 className="text-xs font-bold text-neutral-300">Ready to Match Livestock</h4>
              <p className="text-xs text-neutral-500 max-w-xs">
                Adjust your budget, breed, and milk targets on the left, then click 'Compute Best Livestock Matches' to see ranked suggestions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
