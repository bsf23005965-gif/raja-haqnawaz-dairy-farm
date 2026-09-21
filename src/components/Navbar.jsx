import React, { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore.js';
import { useAdminStore } from '../stores/adminStore.js';
import { BRANDING } from '../constants/branding.js';
import { FARM_CONTACT } from '../constants/farmContact.js';
import { 
  ShoppingBag, 
  Shield, 
  Sparkles, 
  PhoneCall, 
  MessageCircle,
  Menu,
  X,
  MapPin,
  Info,
  Home,
  User,
  ShieldCheck,
  LayoutDashboard,
  ChevronDown,
  TrendingUp
} from 'lucide-react';
import { WhatsAppService } from '../services/WhatsAppService.js';
import { PhoneService } from '../services/PhoneService.js';
import ThemeToggle from './ThemeToggle.jsx';

export default function Header({ onNavigate, activeScreen }) {
  const { user, setRole } = useAuthStore();
  const { branding, farmContact } = useAdminStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMoreDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchToCustomer = () => {
    setRole('Customer');
    onNavigate('home');
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  };

  const switchToAdmin = () => {
    setRole('Admin');
    onNavigate('admin');
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  };

  // Primary core links for clean desktop navigation
  const primaryNavLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'marketplace', label: 'Livestock', icon: ShoppingBag },
    { id: 'market_trends', label: 'Market Rates', icon: TrendingUp, isLive: true },
    { id: 'admin', label: 'Farm Dashboard', icon: LayoutDashboard },
    { id: 'ai', label: 'AI Doctor', icon: Sparkles }
  ];

  // Secondary links tucked cleanly into More dropdown (and also in mobile menu)
  const secondaryNavLinks = [
    { id: 'about', label: 'About Farm', icon: Info, desc: '30+ Years Legacy & Story' },
    { id: 'contact', label: 'Contact Us', icon: PhoneCall, desc: 'WhatsApp, Call & Inquiry' },
    { id: 'location', label: 'Farm Location', icon: MapPin, desc: 'Directions & Jauharabad Map' }
  ];

  // All links for mobile menu
  const allNavLinks = [...primaryNavLinks, ...secondaryNavLinks];

  const handleNavClick = (screenId) => {
    if (screenId === 'admin' && user?.role !== 'Admin') {
      setRole('Admin');
    }
    onNavigate(screenId);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  };

  const isAdmin = user?.role === 'Admin';
  const isSecondaryActive = ['about', 'contact', 'location'].includes(activeScreen);

  return (
    <header className="sticky top-0 z-40 bg-neutral-900/98 backdrop-blur-md border-b border-neutral-800 shadow-xl w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* Brand Logo & Title */}
          <button 
            id="btn-navbar-brand-logo"
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-2 sm:gap-2.5 text-left group shrink-0 min-w-0"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 via-emerald-600 to-green-800 p-0.5 shadow-lg shadow-emerald-950/40 shrink-0">
              <div className="w-full h-full rounded-[10px] bg-neutral-900 flex items-center justify-center overflow-hidden">
                <img
                  src={branding.logo || '/raja-haqnawaz-dairy-farm/farm_logo.jpg'}
                  alt="Raja Haqnawaz Dairy Farm Logo"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <span className="font-extrabold text-emerald-400 text-xs tracking-tighter">RH</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-amber-500 rounded-full border-2 border-neutral-900 flex items-center justify-center shadow">
                <span className="text-[7px] font-black text-neutral-950">✓</span>
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="font-black text-xs sm:text-sm tracking-tight text-white group-hover:text-emerald-400 transition-colors uppercase truncate max-w-[130px] sm:max-w-[190px] xl:max-w-none">
                  {branding.shortName || 'HAQNAWAZ DAIRY FARM'}
                </h1>
                <span className="hidden xl:inline-block text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-950 text-emerald-300 font-bold border border-emerald-800/50 shrink-0">
                  30+ Yrs
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 truncate max-w-[140px] sm:max-w-[180px]">
                📍 Jauharabad, Khushab
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links - Compact & Guaranteed No-Overflow */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {primaryNavLinks.map((link) => {
              const isActive = activeScreen === link.id || 
                (link.id === 'marketplace' && activeScreen === 'animal_details');
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40 font-bold'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                  {link.isLive && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-tighter">
                      Live
                    </span>
                  )}
                </button>
              );
            })}

            {/* Compact "More" Dropdown Menu for Secondary Pages (About, Contact, Location) */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="btn-nav-more-dropdown"
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
                  isSecondaryActive || moreDropdownOpen
                    ? 'bg-neutral-800 text-emerald-400 border border-neutral-700'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-emerald-400' : 'text-neutral-400'}`} />
              </button>

              {/* Popover Menu */}
              {moreDropdownOpen && (
                <div 
                  id="navbar-more-popover"
                  className="absolute left-0 mt-2 w-56 rounded-2xl bg-neutral-900 border border-neutral-750 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  {secondaryNavLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = activeScreen === link.id;
                    return (
                      <button
                        key={link.id}
                        id={`more-menu-${link.id}`}
                        onClick={() => handleNavClick(link.id)}
                        className={`w-full p-2 rounded-xl text-left flex items-start gap-2.5 transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-emerald-600 text-white font-bold'
                            : 'hover:bg-neutral-800 text-neutral-200'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${isActive ? 'bg-emerald-700 text-white' : 'bg-neutral-800 text-emerald-400'}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold leading-tight">{link.label}</p>
                          <p className={`text-[10px] ${isActive ? 'text-emerald-100' : 'text-neutral-400'} leading-tight mt-0.5`}>
                            {link.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Controls: Role Switcher & Contacts */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Role Switcher Pill */}
            <div className="hidden sm:flex items-center bg-neutral-950/90 p-0.5 rounded-xl border border-neutral-750 shadow-inner">
              <button
                type="button"
                id="btn-role-customer"
                onClick={switchToCustomer}
                title="View app as Customer"
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  !isAdmin
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Customer</span>
              </button>

              <button
                type="button"
                id="btn-role-admin"
                onClick={switchToAdmin}
                title="Farm Admin / Manager Dashboard"
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isAdmin
                    ? 'bg-amber-500 text-neutral-950 font-black shadow-sm'
                    : 'text-neutral-400 hover:text-amber-400'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Admin</span>
              </button>
            </div>

            {/* Global Theme Toggle with Circular Clip-Path Transition */}
            <ThemeToggle variant="compact" />

            {/* Quick Call Button */}
            <button 
              id="btn-navbar-call"
              onClick={() => PhoneService.callFarm()}
              title={`Call Farm: ${farmContact.displayPhone || FARM_CONTACT.displayPhone}`}
              className="hidden md:flex p-2 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 hover:text-emerald-400 border border-neutral-700 transition-colors items-center gap-1 text-xs font-semibold cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden 2xl:inline">{farmContact.displayPhone || FARM_CONTACT.displayPhone}</span>
            </button>

            {/* Quick WhatsApp Button */}
            <button 
              id="btn-navbar-whatsapp"
              onClick={() => WhatsAppService.openGeneralInquiry()}
              title={`WhatsApp: ${farmContact.displayWhatsapp || FARM_CONTACT.displayWhatsapp}`}
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden xl:inline">WhatsApp</span>
            </button>

            {/* Mobile Menu Toggle (on screens < lg) */}
            <button
              id="btn-navbar-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-300 border border-neutral-700 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-neutral-200" /> : <Menu className="w-5 h-5 text-neutral-200" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Navigation Menu */}
      {mobileMenuOpen && (
        <div 
          id="navbar-mobile-dropdown-menu"
          className="lg:hidden border-t border-neutral-800 bg-neutral-900/98 px-4 py-4 space-y-3 shadow-2xl animate-fade-in"
        >
          {/* Mobile Role Switcher */}
          <div className="p-2.5 rounded-2xl bg-neutral-950 border border-neutral-800">
            <span className="text-[11px] text-neutral-400 font-bold block mb-2 px-1">
              Select Role / موڈ منتخب کریں:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                id="btn-mobile-role-customer"
                onClick={switchToCustomer}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  !isAdmin
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/60'
                    : 'bg-neutral-850 text-neutral-400 hover:text-white border border-neutral-750'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Customer View</span>
              </button>

              <button
                id="btn-mobile-role-admin"
                onClick={switchToAdmin}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isAdmin
                    ? 'bg-amber-500 text-neutral-950 font-black shadow-md'
                    : 'bg-neutral-850 text-amber-400 hover:text-amber-300 border border-amber-900/40'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Admin Console</span>
              </button>
            </div>
          </div>

          {/* Mobile Global Theme Toggle with Circular Clip-Path Animation */}
          <div className="pt-1 pb-1">
            <ThemeToggle variant="full" />
          </div>

          {/* All Navigation Links on Mobile */}
          <div className="space-y-1">
            {allNavLinks.map((link) => {
              const isActive = activeScreen === link.id ||
                (link.id === 'marketplace' && activeScreen === 'animal_details');
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  id={`btn-mobile-nav-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
