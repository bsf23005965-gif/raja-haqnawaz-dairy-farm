import React, { useEffect, useState } from 'react';
import { useThemeStore } from '../stores/themeStore.js';

/**
 * ThemeTransitionOverlay
 * Renders the circular clip-path animation wavefront and glowing ring
 * when toggling between light and dark modes.
 */
export default function ThemeTransitionOverlay() {
  const { isTransitioning, transitionOrigin, transitionRadius, targetTheme } = useThemeStore();
  const [animProgress, setAnimProgress] = useState(0);

  useEffect(() => {
    if (!isTransitioning) {
      setAnimProgress(0);
      return;
    }

    let startTime = null;
    const duration = 650; // ms
    let frameId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimProgress(eased);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isTransitioning]);

  if (!isTransitioning) return null;

  const { x, y } = transitionOrigin;
  const currentRadius = animProgress * (transitionRadius || 1200);
  const isTargetLight = targetTheme === 'light';

  // Native View Transitions handle the actual element snapshot rendering when supported;
  // This overlay adds the glowing specular circular shockwave ring and wavefront ambient lighting.
  return (
    <div 
      id="theme-circular-transition-overlay"
      className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden"
      aria-hidden="true"
    >
      {/* Expanding Circular Clip-Path Glow Ring */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: `${x}px`,
          top: `${y}px`,
          width: `${Math.max(currentRadius * 2, 2)}px`,
          height: `${Math.max(currentRadius * 2, 2)}px`,
          transform: 'translate(-50%, -50%)',
          border: isTargetLight 
            ? '3px solid rgba(245, 158, 11, 0.75)' // Golden sunlight ring
            : '3px solid rgba(52, 211, 153, 0.85)', // Emerald twilight ring
          boxShadow: isTargetLight
            ? `0 0 35px 8px rgba(251, 191, 36, 0.55), inset 0 0 25px 4px rgba(245, 158, 11, 0.4)`
            : `0 0 35px 8px rgba(16, 185, 129, 0.65), inset 0 0 25px 4px rgba(52, 211, 153, 0.4)`,
          opacity: Math.max(0, 1 - animProgress * 0.9),
          filter: 'blur(0.5px)',
          transition: 'opacity 0.15s ease-out'
        }}
      />

      {/* Secondary Soft Ambient Wavefront Diffusion */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: `${x}px`,
          top: `${y}px`,
          width: `${Math.max(currentRadius * 2.1, 4)}px`,
          height: `${Math.max(currentRadius * 2.1, 4)}px`,
          transform: 'translate(-50%, -50%)',
          background: isTargetLight
            ? 'radial-gradient(circle, transparent 75%, rgba(251, 191, 36, 0.15) 90%, rgba(245, 158, 11, 0.3) 100%)'
            : 'radial-gradient(circle, transparent 75%, rgba(16, 185, 129, 0.18) 90%, rgba(5, 150, 105, 0.35) 100%)',
          opacity: Math.max(0, 0.85 - animProgress),
          pointerEvents: 'none'
        }}
      />

      {/* Sparkle Particles at the Origin of the Toggle */}
      {animProgress < 0.6 && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${x}px`,
            top: `${y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div 
            className="w-10 h-10 rounded-full animate-ping"
            style={{
              backgroundColor: isTargetLight ? 'rgba(245, 158, 11, 0.4)' : 'rgba(52, 211, 153, 0.5)',
            }}
          />
        </div>
      )}
    </div>
  );
}
