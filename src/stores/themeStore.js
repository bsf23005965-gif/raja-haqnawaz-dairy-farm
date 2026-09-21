import { create } from 'zustand';

/**
 * Global Theme Store managing Light and Dark modes with
 * smooth circular clip-path transitions.
 */
export const useThemeStore = create((set, get) => {
  // Initialize theme from localStorage or default to 'dark'
  const savedTheme = typeof window !== 'undefined' 
    ? localStorage.getItem('rh_theme') || 'dark'
    : 'dark';

  // Apply initial theme class to <html>
  if (typeof document !== 'undefined') {
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }

  return {
    theme: savedTheme, // 'dark' | 'light'
    isTransitioning: false,
    transitionOrigin: { x: 0, y: 0 },
    transitionRadius: 0,
    targetTheme: null,

    /**
     * Toggles theme with a smooth circular clip-path animation
     * from the click coordinates.
     */
    toggleTheme: (event) => {
      const currentTheme = get().theme;
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      get().applyThemeWithCircularTransition(nextTheme, event);
    },

    setTheme: (newTheme, event) => {
      if (newTheme === get().theme) return;
      get().applyThemeWithCircularTransition(newTheme, event);
    },

    /**
     * Core circular clip-path transition logic
     */
    applyThemeWithCircularTransition: (nextTheme, event) => {
      // Determine click origin
      let x = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
      let y = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

      if (event && typeof event.clientX === 'number' && typeof event.clientY === 'number') {
        x = event.clientX;
        y = event.clientY;
      } else if (event?.currentTarget && typeof event.currentTarget.getBoundingClientRect === 'function') {
        const rect = event.currentTarget.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      }

      // Calculate maximum distance to the furthest viewport corner
      const maxRadius = typeof window !== 'undefined'
        ? Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
        : 1200;

      // Update local storage
      if (typeof window !== 'undefined') {
        localStorage.setItem('rh_theme', nextTheme);
      }

      // Check for native View Transitions API support
      const hasViewTransition = typeof document !== 'undefined' && 
        typeof document.startViewTransition === 'function';

      if (hasViewTransition) {
        set({ 
          isTransitioning: true, 
          transitionOrigin: { x, y }, 
          transitionRadius: maxRadius,
          targetTheme: nextTheme 
        });

        try {
          const transition = document.startViewTransition(() => {
            // Update DOM class and state synchronously in transition callback
            document.documentElement.classList.remove('dark', 'light');
            document.documentElement.classList.add(nextTheme);
            set({ theme: nextTheme });
          });

          transition.ready.then(() => {
            // Animate circular clip-path expanding outward
            document.documentElement.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${maxRadius}px at ${x}px ${y}px)`
                ]
              },
              {
                duration: 650,
                easing: 'cubic-bezier(0.25, 1, 0.35, 1)',
                pseudoElement: '::view-transition-new(root)'
              }
            );
          }).catch((err) => {
            console.warn('View transition animation fallback:', err);
          }).finally(() => {
            setTimeout(() => {
              set({ isTransitioning: false, targetTheme: null });
            }, 680);
          });
        } catch (err) {
          console.warn('View transition start fallback:', err);
          // Fallback path
          executeFallbackTransition(nextTheme, x, y, maxRadius, set);
        }
      } else {
        // Universal Fallback Animation using circular clip-path overlay
        executeFallbackTransition(nextTheme, x, y, maxRadius, set);
      }
    }
  };
});

/**
 * Universal fallback transition when View Transitions API is unavailable
 */
function executeFallbackTransition(nextTheme, x, y, maxRadius, set) {
  set({ 
    isTransitioning: true, 
    transitionOrigin: { x, y }, 
    transitionRadius: maxRadius,
    targetTheme: nextTheme 
  });

  // Switch DOM theme class halfway through circular expansion
  setTimeout(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(nextTheme);
    }
    set({ theme: nextTheme });
  }, 180);

  setTimeout(() => {
    set({ isTransitioning: false, targetTheme: null });
  }, 680);
}
