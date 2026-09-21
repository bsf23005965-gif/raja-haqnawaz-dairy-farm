import React, { useState } from 'react';
import AIChatTab from './AIChatTab.jsx';
import AIHealthTab from './AIHealthTab.jsx';
import AIRecommenderTab from './AIRecommenderTab.jsx';
import { Sparkles, Stethoscope, SlidersHorizontal } from 'lucide-react';

export default function AIConsultantScreen({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'health' | 'recommend'

  const tabs = [
    { id: 'chat', label: 'AI Farm Advisor', icon: Sparkles, desc: 'Livestock Q&A' },
    { id: 'health', label: 'Health Checker', icon: Stethoscope, desc: 'Symptom Assessment' },
    { id: 'recommend', label: 'Smart Matches', icon: SlidersHorizontal, desc: 'Breed Scoring' },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Screen Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase font-['Outfit']">
          AI Livestock Intelligence Suite
        </h1>
        <p className="text-xs text-neutral-400">
          Powered by Gemini AI combined with Raja Haqnawaz Dairy Farm's 30+ years breeding expertise.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="grid grid-cols-3 gap-2 bg-neutral-900/90 p-1.5 rounded-2xl border border-neutral-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab View */}
      <div>
        {activeTab === 'chat' && <AIChatTab />}
        {activeTab === 'health' && <AIHealthTab />}
        {activeTab === 'recommend' && <AIRecommenderTab onNavigate={onNavigate} />}
      </div>
    </div>
  );
}
