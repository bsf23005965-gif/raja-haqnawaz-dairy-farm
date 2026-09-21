import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Home, 
  Sparkles, 
  Store, 
  LayoutDashboard,
  PhoneCall,
  PlusCircle,
  MessageCircle,
  MapPin,
  X,
  Zap,
  ChevronRight,
  TrendingUp,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuthStore } from '../stores/authStore.js';
import { useAnimalStore } from '../stores/animalStore.js';
import { useOrderStore } from '../stores/orderStore.js';
import { useThemeStore } from '../stores/themeStore.js';
import { PhoneService } from '../services/PhoneService.js';
import { WhatsAppService } from '../services/WhatsAppService.js';

/**
 * Responsive Bottom Navigation component to manage seamless switching between:
 * 1. Home
 * 2. AI Assistant
 * 3. Marketplace
 * 4. Farm Dashboard
 *
 * Supports touch and pointer horizontal swipe-to-navigate gestures.
 */
export default function BottomNav({ activeScreen, onNavigate }) {
  const { user, setRole } = useAuthStore();
  const { animals } = useAnimalStore();
  const { orders } = useOrderStore();
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';
  const [clickedTab, setClickedTab] = useState(null);
  const [swipeIndicator, setSwipeIndicator] = useState(null); // 'left' | 'right' | null
  const isAdmin = user?.role === 'Admin';

  // Swipe detection refs
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const touchDeltaX = useRef(0);
  const isSwiping = useRef(false);
  const pointerStartX = useRef(null);
  const pointerStartY = useRef(null);
  const isPointerDown = useRef(false);

  // Long-press detection state & refs
  const [quickMenu, setQuickMenu] = useState({ isOpen: false, targetTab: null });
  const [pressingTabId, setPressingTabId] = useState(null);
  const [hoveredTabId, setHoveredTabId] = useState(null);
  const longPressTimerRef = useRef(null);
  const longPressStartPos = useRef({ x: 0, y: 0 });
  const isLongPressTriggeredRef = useRef(false);
  const activePressTabIdRef = useRef(null);

  const totalAnimals = animals?.length || 33;
  const pendingOrders = orders?.filter(o => o.status === 'Pending')?.length || 0;

  // Physical confirmation vibration feedback trigger (navigator.vibrate) when a long-press is detected on .bottom-navigation items
  const triggerLongPressVibration = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && 'navigator' in window && typeof navigator.vibrate === 'function') {
        // Distinctive physical confirmation pattern: pulse-pause-pulse for tactile feedback
        const hasVibrated = navigator.vibrate([40, 50, 40]);
        if (!hasVibrated) {
          navigator.vibrate(60);
        }
      }
    } catch {
      // Gracefully ignore if Vibration API is unsupported or restricted
    }
  }, []);

  const openQuickMenu = useCallback((targetTab) => {
    triggerLongPressVibration();
    isLongPressTriggeredRef.current = true;
    setPressingTabId(null);
    activePressTabIdRef.current = null;
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    setQuickMenu({
      isOpen: true,
      targetTab,
    });

    // Guard window to absorb any subsequent synthetic click event from standard navigation
    setTimeout(() => {
      isLongPressTriggeredRef.current = false;
    }, 450);
  }, [triggerLongPressVibration]);

  const closeQuickMenu = useCallback(() => {
    setQuickMenu({ isOpen: false, targetTab: null });
  }, []);

  const startLongPress = (e, item) => {
    // Only capture primary button on pointer events
    if (e.button !== undefined && e.button !== 0) return;

    // Avoid duplicate timer if both pointerdown and touchstart fire
    if (longPressTimerRef.current && activePressTabIdRef.current === item.id) {
      return;
    }

    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }

    activePressTabIdRef.current = item.id;
    setPressingTabId(item.id);

    const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    longPressStartPos.current = { x: clientX, y: clientY };

    longPressTimerRef.current = setTimeout(() => {
      triggerLongPressVibration();
      openQuickMenu(item);
    }, 450);
  };

  const cancelLongPress = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    setPressingTabId(null);
    activePressTabIdRef.current = null;
  };

  const checkLongPressMove = (e) => {
    if (!longPressTimerRef.current) return;
    const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    const dx = Math.abs(clientX - longPressStartPos.current.x);
    const dy = Math.abs(clientY - longPressStartPos.current.y);
    // If movement exceeds 10px, cancel long-press so gestures/swiping take precedence
    if (dx > 10 || dy > 10) {
      cancelLongPress();
    }
  };

  // Keyboard shortcut: Escape to close quick menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && quickMenu.isOpen) {
        closeQuickMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickMenu.isOpen, closeQuickMenu]);

  // Quick Access Menu Actions
  const quickActions = [
    {
      id: 'quick_call',
      title: 'Quick Call Farm Hotline',
      subtitle: 'Instant phone call to 0300 6072070',
      icon: PhoneCall,
      badge: 'Hotline',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      iconBg: 'bg-emerald-950/90 border-emerald-700/60 text-emerald-400',
      action: () => {
        closeQuickMenu();
        PhoneService.callFarm();
      },
    },
    {
      id: 'market_trends',
      title: 'Market Trends & Prices',
      subtitle: 'Google Search live milk rates, mandi cattle & feed prices',
      icon: TrendingUp,
      badge: 'Grounded',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      iconBg: 'bg-emerald-950/90 border-emerald-700/60 text-emerald-400',
      action: () => {
        closeQuickMenu();
        onNavigate('market_trends');
      },
    },
    {
      id: 'add_listing',
      title: 'Add Animal Listing',
      subtitle: 'Publish a new cow or buffalo for sale',
      icon: PlusCircle,
      badge: 'Seller Action',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      iconBg: 'bg-emerald-950/90 border-emerald-700/60 text-emerald-400',
      action: () => {
        closeQuickMenu();
        if (!isAdmin) setRole('Admin');
        onNavigate('add_animal');
      },
    },
    {
      id: 'whatsapp_chat',
      title: 'WhatsApp Direct Chat',
      subtitle: 'Ask about cows/buffaloes, pedigree & video clips',
      icon: MessageCircle,
      badge: 'Chat',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      iconBg: 'bg-emerald-950/90 border-emerald-700/60 text-emerald-400',
      action: () => {
        closeQuickMenu();
        WhatsAppService.openGeneralInquiry();
      },
    },
    {
      id: 'ai_consultant',
      title: 'Ask AI Vet Consultant',
      subtitle: 'Instant diagnostic advice & dairy feed calculator',
      icon: Sparkles,
      badge: 'AI Vet',
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      iconBg: 'bg-amber-950/80 border-amber-700/60 text-amber-400',
      action: () => {
        closeQuickMenu();
        onNavigate('ai');
      },
    },
    {
      id: 'farm_location',
      title: 'Farm Location & GPS',
      subtitle: 'Directions to Naseem Colony, Jauharabad, Khushab',
      icon: MapPin,
      badge: 'Directions',
      badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      iconBg: 'bg-sky-950/80 border-sky-700/60 text-sky-400',
      action: () => {
        closeQuickMenu();
        onNavigate('location');
      },
    },
    {
      id: 'theme_toggle',
      title: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      subtitle: 'Trigger smooth circular clip-path theme animation',
      icon: isDark ? Sun : Moon,
      badge: isDark ? 'Light' : 'Dark',
      badgeClass: isDark ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      iconBg: isDark ? 'bg-amber-950/80 border-amber-700/60 text-amber-400' : 'bg-indigo-950/80 border-indigo-700/60 text-indigo-400',
      action: (e) => {
        closeQuickMenu();
        toggleTheme(e);
      },
    },
  ];

  const navItems = [
    { 
      id: 'home', 
      label: 'Home', 
      fullLabel: 'Home',
      icon: Home,
      badge: null,
      isActive: activeScreen === 'home',
    },
    { 
      id: 'ai', 
      label: 'AI', 
      fullLabel: 'AI Assistant',
      icon: Sparkles,
      badge: 'LIVE',
      badgeColor: 'bg-emerald-500 text-neutral-950',
      isActive: activeScreen === 'ai',
    },
    { 
      id: 'marketplace', 
      label: 'Marketplace', 
      fullLabel: 'Marketplace',
      icon: Store,
      badge: `${totalAnimals}`,
      badgeColor: 'bg-emerald-900/80 text-emerald-300 border border-emerald-700/60',
      isActive: activeScreen === 'marketplace' || activeScreen === 'animal_details',
    },
    { 
      id: 'admin', 
      label: 'Dashboard', 
      fullLabel: 'Farm Dashboard',
      icon: LayoutDashboard,
      badge: pendingOrders > 0 ? `${pendingOrders}` : (isAdmin ? 'ADMIN' : null),
      badgeColor: 'bg-amber-500 text-neutral-950',
      isActive: activeScreen === 'admin' || activeScreen === 'add_animal',
    },
  ];

  const triggerHapticFeedback = () => {
    try {
      if (typeof window !== 'undefined' && 'navigator' in window && typeof navigator.vibrate === 'function') {
        // Subtle 15ms haptic pulse for clean tactile tap confirmation on view switch
        navigator.vibrate(15);
      }
    } catch {
      // Gracefully ignore if Vibration API is unsupported or blocked by permissions policy
    }
  };

  const navigateToTab = useCallback((itemId) => {
    triggerHapticFeedback();
    setClickedTab(itemId);
    setTimeout(() => {
      setClickedTab(null);
    }, 400);

    if (itemId === 'admin') {
      if (!isAdmin) {
        setRole('Admin');
      }
      onNavigate('admin');
    } else {
      onNavigate(itemId);
    }
  }, [isAdmin, setRole, onNavigate]);

  // Navigate relative to current tab position (-1 for previous, +1 for next)
  const navigateRelative = useCallback((direction) => {
    const currentIndex = navItems.findIndex(item => item.isActive);
    const activeIdx = currentIndex !== -1 ? currentIndex : 0;
    const nextIndex = (activeIdx + direction + navItems.length) % navItems.length;
    const targetItem = navItems[nextIndex];
    if (targetItem && targetItem.id !== navItems[activeIdx]?.id) {
      setSwipeIndicator(direction > 0 ? 'left' : 'right');
      setTimeout(() => setSwipeIndicator(null), 350);
      navigateToTab(targetItem.id);
    }
  }, [navItems, navigateToTab]);

  // Touch Swipe Handlers (Mobile)
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      touchDeltaX.current = 0;
      isSwiping.current = false;
    }
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current === null || !e.touches || e.touches.length !== 1) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartX.current;
    const deltaY = currentY - touchStartY.current;
    touchDeltaX.current = deltaX;

    // Detect intentional horizontal swipe vs vertical page scroll
    if (Math.abs(deltaX) > 12 && Math.abs(deltaX) > Math.abs(deltaY) * 1.1) {
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;
    const deltaX = touchDeltaX.current;
    const swipeThreshold = 35; // 35px threshold for deliberate swipe gesture

    if (Math.abs(deltaX) >= swipeThreshold) {
      if (deltaX < -swipeThreshold) {
        // Swiped left -> move forward in navigation
        navigateRelative(1);
      } else if (deltaX > swipeThreshold) {
        // Swiped right -> move backward in navigation
        navigateRelative(-1);
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    touchDeltaX.current = 0;
    setTimeout(() => {
      isSwiping.current = false;
    }, 80);
  };

  // Pointer / Mouse Drag Handlers (Desktop & Preview Support)
  const handlePointerDown = (e) => {
    // Only capture primary button (mouse left-click) or touch/pen
    if (e.button !== undefined && e.button !== 0) return;
    pointerStartX.current = e.clientX;
    pointerStartY.current = e.clientY;
    isPointerDown.current = true;
  };

  const handlePointerMove = (e) => {
    if (!isPointerDown.current || pointerStartX.current === null) return;
    const deltaX = e.clientX - pointerStartX.current;
    const deltaY = e.clientY - (pointerStartY.current || e.clientY);
    if (Math.abs(deltaX) > 15 && Math.abs(deltaX) > Math.abs(deltaY)) {
      isSwiping.current = true;
    }
  };

  const handlePointerUp = (e) => {
    if (!isPointerDown.current || pointerStartX.current === null) return;
    const deltaX = e.clientX - pointerStartX.current;
    const deltaY = e.clientY - (pointerStartY.current || e.clientY);
    isPointerDown.current = false;
    pointerStartX.current = null;
    pointerStartY.current = null;

    const swipeThreshold = 40;
    if (Math.abs(deltaX) >= swipeThreshold && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < -swipeThreshold) {
        navigateRelative(1);
      } else if (deltaX > swipeThreshold) {
        navigateRelative(-1);
      }
    }

    setTimeout(() => {
      isSwiping.current = false;
    }, 80);
  };

  /**
   * Dynamically creates a .nav-ripple-circle element at the pointer position
   * to provide an authentic visual ripple effect.
   */
  const createNavRipple = useCallback((e, targetButton) => {
    // Avoid double triggering if both delegated listener and click handler catch the event
    if (e && e._navRippleHandled) return;
    if (e) e._navRippleHandled = true;

    const button = targetButton || (e && e.currentTarget) || (e && e.target && e.target.closest('.bottom-navigation-item, .bottom-nav-btn, button'));
    if (!button) return;

    const rect = button.getBoundingClientRect();
    let clientX = e ? e.clientX : undefined;
    let clientY = e ? e.clientY : undefined;

    // Handle touch event coordinates if present
    if ((clientX === undefined || (clientX === 0 && clientY === 0)) && e && e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ((clientX === undefined || (clientX === 0 && clientY === 0)) && e && e.changedTouches && e.changedTouches[0]) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else if ((clientX === undefined || (clientX === 0 && clientY === 0)) && e && e.nativeEvent) {
      if (e.nativeEvent.clientX !== undefined && e.nativeEvent.clientX !== 0) {
        clientX = e.nativeEvent.clientX;
        clientY = e.nativeEvent.clientY;
      }
    }

    // Default to optical center of the item if click has no coordinates
    if (clientX === undefined || (clientX === 0 && clientY === 0)) {
      clientX = rect.left + rect.width / 2;
      clientY = rect.top + rect.height / 2;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2.4;

    // Dynamically create the .nav-ripple-circle DOM element
    const circle = document.createElement('span');
    circle.className = 'nav-ripple-circle';
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    // Locate ripple container inside the button (or fallback directly to button)
    const container = button.querySelector('.nav-ripple-container') || button;
    container.appendChild(circle);

    // Safely remove element after ripple animation completes
    const removeCircle = () => {
      if (circle && circle.parentNode) {
        circle.parentNode.removeChild(circle);
      }
    };

    circle.addEventListener('animationend', removeCircle);
    setTimeout(removeCircle, 600);
  }, []);

  // JavaScript click handler for .bottom-navigation items
  const handleItemClick = (e, itemId, active) => {
    // If user was executing a horizontal swipe gesture, prevent click action
    if (isSwiping.current) {
      e.preventDefault();
      return;
    }

    // If long press was triggered, prevent standard navigation
    if (isLongPressTriggeredRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    cancelLongPress();

    // Dynamically create the .nav-ripple-circle at pointer position
    createNavRipple(e, e.currentTarget);
    navigateToTab(itemId);
  };

  // Delegated JavaScript click listener for .bottom-navigation items
  useEffect(() => {
    const navContainer = document.querySelector('.bottom-navigation');
    if (!navContainer) return;

    const onNavClick = (e) => {
      const itemBtn = e.target.closest('.bottom-navigation-item, .bottom-nav-btn, button');
      if (!itemBtn || !navContainer.contains(itemBtn)) return;
      createNavRipple(e, itemBtn);
    };

    navContainer.addEventListener('click', onNavClick);
    return () => {
      navContainer.removeEventListener('click', onNavClick);
    };
  }, [createNavRipple]);

  return (
    <>
      <nav 
        id="responsive-bottom-navigation"
        role="navigation" 
        aria-label="Bottom Navigation (Swipe left or right to switch views, press and hold for quick access)"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="bottom-navigation w-full pointer-events-auto select-none rounded-t-2xl md:rounded-2xl touch-pan-y relative"
      >
        <div className="w-full bg-neutral-900/95 backdrop-blur-xl border-t border-x border-neutral-750/80 rounded-t-2xl md:rounded-2xl shadow-[0_-8px_25px_-4px_rgba(0,0,0,0.55),0_-2px_8px_-1px_rgba(16,185,129,0.12)] md:shadow-2xl md:shadow-emerald-950/25 px-2.5 sm:px-4 py-2 sm:py-2 transition-all relative">
          
          {/* Subtle Horizontal Swipe Feedback Cue */}
          {swipeIndicator && (
            <div 
              className={`absolute top-0 bottom-0 w-2 rounded-2xl bg-gradient-to-r ${
                swipeIndicator === 'left' 
                  ? 'right-0 from-transparent to-emerald-500/80' 
                  : 'left-0 from-emerald-500/80 to-transparent'
              } transition-opacity duration-300 pointer-events-none z-30 animate-pulse`}
            />
          )}

          <div className="bottom-nav-grid max-w-md md:max-w-xl mx-auto flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 w-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = item.isActive;
              const isClicked = clickedTab === item.id;
              const isPressed = pressingTabId === item.id;
              const isHovered = hoveredTabId === item.id;
              const showTooltip = !quickMenu.isOpen && (isHovered || isPressed);

              return (
                <button
                  key={item.id}
                  id={`bottom-nav-tab-${item.id}`}
                  onMouseEnter={() => setHoveredTabId(item.id)}
                  onMouseLeave={() => {
                    setHoveredTabId(null);
                    cancelLongPress();
                  }}
                  onFocus={() => setHoveredTabId(item.id)}
                  onBlur={() => setHoveredTabId(null)}
                  onPointerDown={(e) => {
                    startLongPress(e, item);
                  }}
                  onPointerMove={(e) => {
                    checkLongPressMove(e);
                  }}
                  onPointerUp={() => {
                    cancelLongPress();
                  }}
                  onPointerCancel={() => {
                    cancelLongPress();
                  }}
                  onPointerLeave={() => {
                    cancelLongPress();
                    setHoveredTabId(null);
                  }}
                  onTouchStart={(e) => {
                    startLongPress(e, item);
                  }}
                  onTouchMove={(e) => {
                    checkLongPressMove(e);
                  }}
                  onTouchEnd={() => {
                    cancelLongPress();
                  }}
                  onTouchCancel={() => {
                    cancelLongPress();
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                  }}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && e.altKey) {
                      e.preventDefault();
                      openQuickMenu(item);
                    }
                  }}
                  onClick={(e) => handleItemClick(e, item.id, active)}
                  aria-current={active ? 'page' : undefined}
                  aria-describedby={`bottom-nav-tooltip-${item.id}`}
                  aria-label={`${item.fullLabel || item.label} (Hold for Quick Menu)`}
                  className={`bottom-navigation-item bottom-nav-btn w-[calc(50%-8px)] sm:w-auto sm:flex-1 min-w-0 flex flex-col items-center justify-center py-2 sm:py-1.5 px-2 rounded-xl transition-all duration-200 relative group cursor-pointer active:scale-[0.96] ${
                    isPressed ? 'scale-[0.94] ring-2 ring-emerald-400/80 shadow-lg shadow-emerald-900/40 ' : ''
                  }${
                    active 
                      ? 'active bg-emerald-600 border-2 border-emerald-400 text-white font-black shadow-lg shadow-emerald-950/60 scale-[1.02]' 
                      : 'bg-neutral-950/60 border border-neutral-800/70 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 hover:border-neutral-700'
                  }`}
                >
                  {/* Subtle Fade-in Tooltip (High-Contrast Theme) */}
                  <div
                    id={`bottom-nav-tooltip-${item.id}`}
                    role="tooltip"
                    aria-hidden={!showTooltip}
                    className={`bottom-navigation-tooltip absolute -top-8 sm:-top-9 left-1/2 -translate-x-1/2 pointer-events-none z-50 transition-all duration-200 ease-out whitespace-nowrap ${
                      quickMenu.isOpen
                        ? 'hidden'
                        : showTooltip
                          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                          : 'opacity-0 translate-y-1 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100'
                    }`}
                  >
                    <div className="relative flex items-center justify-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-neutral-950 text-white text-[10px] sm:text-xs font-bold tracking-tight border border-neutral-600 shadow-[0_4px_16px_rgba(0,0,0,0.9)] ring-1 ring-white/30">
                      <span>{item.fullLabel || item.label}</span>
                      {/* High-Contrast Downward Arrow / Caret */}
                      <div
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-neutral-950 border-r border-b border-neutral-600 rotate-45"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Background Ripple Effect Container for dynamically created .nav-ripple-circle */}
                  <div className="nav-ripple-container absolute inset-0 overflow-hidden rounded-xl pointer-events-none z-0" aria-hidden="true" />

                  {/* Icon Container with Badge & Color-Morphing / Scale-Up Animation */}
                  <div className="relative z-10 flex items-center justify-center shrink-0 mb-0.5">
                    <Icon 
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ease-out ${
                        isClicked 
                          ? 'animate-nav-icon-pop scale-125 text-white' 
                          : active 
                            ? 'animate-nav-icon-morph scale-110 text-white' 
                            : 'group-hover:scale-105 group-active:scale-125 text-neutral-400 group-hover:text-neutral-200'
                      }`} 
                    />

                    {/* Optional Badges */}
                    {item.badge && (
                      <span 
                        className={`absolute -top-1.5 -right-2.5 text-[8px] sm:text-[9px] font-black px-1 sm:px-1.5 py-0.2 rounded-full shadow-sm leading-none z-20 ${
                          active ? 'bg-amber-400 text-neutral-950 ring-1 ring-emerald-700' : item.badgeColor
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Text Label Below Icon */}
                  <span 
                    className={`nav-label relative z-10 text-[11px] sm:text-xs mt-0.5 tracking-tight truncate w-full text-center select-none ${
                      active ? 'text-white font-black' : 'text-neutral-350 group-hover:text-neutral-200 font-semibold'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Modern Active Underline Focus Indicator with Smooth Width-Expanding Animation */}
                  {active && (
                    <span 
                      id={`bottom-nav-active-underline-${item.id}`}
                      className="active-underline nav-active-underline active-indicator absolute bottom-1 sm:bottom-1.5 left-1/2 -translate-x-1/2 h-[3px] rounded-full bg-gradient-to-r from-emerald-200 via-white to-emerald-200 shadow-[0_0_10px_2px_rgba(255,255,255,0.95),0_0_16px_4px_rgba(52,211,153,0.85)] z-20 pointer-events-none"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Quick-Access Menu Modal / Action Sheet with Blurred Glassmorphism Overlay (sitting above the navigation bar) */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {quickMenu.isOpen && (
            <>
              {/* Full-screen Blurred Glassmorphism Backdrop Overlay sitting above the navigation bar */}
              <motion.div
                key="quick-menu-backdrop"
                id="quick-access-menu-glass-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                onClick={closeQuickMenu}
                className="quick-access-glass-overlay glassmorphism-overlay fixed inset-0 z-[100] cursor-pointer"
                aria-hidden="true"
              />

              {/* Quick-Access Glassmorphism Action Sheet positioned above the bottom navigation bar */}
              <motion.div
                key="quick-menu-sheet"
                id="quick-access-menu-sheet"
                role="dialog"
                aria-modal="true"
                aria-label="Quick Access Menu"
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.96 }}
                transition={{ type: 'spring', damping: 26, stiffness: 360 }}
                className="quick-access-glass-sheet glassmorphism-menu fixed bottom-24 sm:bottom-22 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-md rounded-2xl p-4 text-neutral-100 z-[101] overflow-hidden"
              >
                {/* Top Edge Specular Reflection Sheen */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

                {/* Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 shadow-sm backdrop-blur-md">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-tight text-white flex items-center gap-2">
                        Quick Access Menu
                        {quickMenu.targetTab && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-700/50">
                            {quickMenu.targetTab.fullLabel || quickMenu.targetTab.label}
                          </span>
                        )}
                      </h3>
                      <p className="text-[11px] text-neutral-300/80">
                        Long-press shortcut menu
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={closeQuickMenu}
                    aria-label="Close Quick Access Menu"
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Actions List */}
                <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-0.5">
                  {quickActions.map((action) => {
                    const ActionIcon = action.icon;
                    return (
                      <button
                        key={action.id}
                        type="button"
                        onClick={action.action}
                        className="glassmorphism-item w-full p-2.5 rounded-xl flex items-center justify-between gap-3 text-left cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`p-2 rounded-lg border shrink-0 ${action.iconBg} group-hover:scale-105 transition-transform`}>
                            <ActionIcon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-neutral-100 group-hover:text-emerald-400 truncate">
                                {action.title}
                              </span>
                              {action.badge && (
                                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase tracking-wider ${action.badgeClass}`}>
                                  {action.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-neutral-400 truncate">
                              {action.subtitle}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </button>
                    );
                  })}
                </div>

                {/* Footer Note */}
                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-neutral-400 px-1">
                  <span>Tap tab for standard view • Hold for quick menu</span>
                  <button
                    type="button"
                    onClick={closeQuickMenu}
                    className="text-emerald-400 font-semibold hover:underline cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
