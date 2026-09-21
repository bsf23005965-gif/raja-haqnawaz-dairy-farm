import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore.js';

/**
 * ThemeToggle
 * Button component that triggers the smooth circular clip-path theme transition.
 * Supports compact (icon-only for navbars) and full (with label) variants.
 */
export default function ThemeToggle({ variant = 'compact', className = '' }) {
  const { theme, toggleTheme, isTransitioning } = useThemeStore();
  const isDark = theme === 'dark';

  const handleClick = (e) => {
    // Pass the click event so origin coordinates (clientX, clientY) are captured
    toggleTheme(e);
  };

  if (variant === 'full') {
    return (
      <button
        type="button"
        id="btn-theme-toggle-full"
        onClick={handleClick}
        disabled={isTransitioning}
        aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
        title={`Click to switch to ${isDark ? 'Light' : 'Dark'} Mode (Circular Transition)`}
        className={`flex items-center justify-between w-full p-2.5 rounded-xl border transition-all cursor-pointer ${
          isDark
            ? 'bg-neutral-900 hover:bg-neutral-850 border-neutral-800 text-neutral-200 hover:text-white'
            : 'bg-white hover:bg-amber-50/60 border-neutral-200 text-neutral-800 shadow-sm'
        } ${className}`}
      >
        <div className="flex items-center gap-2.5">
          <div className={`p-1.5 rounded-lg transition-transform duration-300 ${
            isDark 
              ? 'bg-amber-500/15 text-amber-400 rotate-0' 
              : 'bg-indigo-500/15 text-indigo-600 rotate-180'
          }`}>
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </div>
          <div className="text-left">
            <p className="text-xs font-bold leading-tight">
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </p>
            <p className="text-[10px] text-neutral-400 leading-tight">
              Smooth circular transition
            </p>
          </div>
        </div>

        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
          isDark 
            ? 'bg-neutral-800 border-neutral-700 text-amber-300' 
            : 'bg-neutral-100 border-neutral-300 text-neutral-700'
        }`}>
          {isDark ? 'Dark Active' : 'Light Active'}
        </span>
      </button>
    );
  }

  // Compact Pill / Icon-Only Variant for Top Header & Navbar
  return (
    <button
      type="button"
      id="btn-theme-toggle"
      onClick={handleClick}
      disabled={isTransitioning}
      aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Theme (Smooth Circular Transition)`}
      className={`relative group flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
        isDark
          ? 'bg-neutral-950/80 hover:bg-neutral-800/90 border-neutral-750 text-neutral-300 hover:text-amber-400 hover:border-amber-500/40 hover:shadow-[0_0_12px_rgba(245,158,11,0.25)]'
          : 'bg-white hover:bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-indigo-600 hover:border-indigo-400 hover:shadow-[0_0_12px_rgba(99,102,241,0.2)] shadow-sm'
      } ${className}`}
    >
      {/* Background radial glow on hover */}
      <div 
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
          isDark 
            ? 'bg-gradient-to-tr from-amber-500/10 via-emerald-500/10 to-transparent' 
            : 'bg-gradient-to-tr from-indigo-500/10 via-amber-500/10 to-transparent'
        }`} 
      />

      {/* Rotating Icon Container */}
      <div className="relative z-10 transition-transform duration-500 ease-out group-hover:scale-110">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 transition-all duration-300 group-hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-600 transition-all duration-300 group-hover:-rotate-12" />
        )}
      </div>

      {/* Screen Reader & Accessible Tag */}
      <span className="sr-only">Toggle theme (Circular transition)</span>
    </button>
  );
}
