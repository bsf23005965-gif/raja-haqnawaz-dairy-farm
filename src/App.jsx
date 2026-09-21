import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import BottomNav from './components/BottomNav.jsx';
import ThemeTransitionOverlay from './components/ThemeTransitionOverlay.jsx';
import { useThemeStore } from './stores/themeStore.js';

// Screens
import SplashScreen from './screens/splash/SplashScreen.jsx';
import HomeScreen from './screens/home/HomeScreen.jsx';
import MarketplaceScreen from './screens/marketplace/MarketplaceScreen.jsx';
import AnimalDetailsScreen from './screens/animals/AnimalDetailsScreen.jsx';
import FavoritesScreen from './screens/favorites/FavoritesScreen.jsx';
import CheckoutScreen from './screens/checkout/CheckoutScreen.jsx';
import OrdersScreen from './screens/orders/OrdersScreen.jsx';
import AboutFarmScreen from './screens/about/AboutFarmScreen.jsx';
import ContactScreen from './screens/contact/ContactScreen.jsx';
import FarmLocationScreen from './screens/maps/FarmLocationScreen.jsx';
import AIConsultantScreen from './screens/ai/AIConsultantScreen.jsx';
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen.jsx';
import AddAnimalScreen from './screens/animals/AddAnimalScreen.jsx';
import MarketTrendsScreen from './screens/trends/MarketTrendsScreen.jsx';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('splash');
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const navigateTo = (screenId) => {
    setActiveScreen(screenId);
    // Smooth scroll to top when changing screens
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'splash':
        return <SplashScreen onGetStarted={() => navigateTo('home')} />;
      case 'home':
        return <HomeScreen onNavigate={navigateTo} />;
      case 'market_trends':
        return <MarketTrendsScreen onNavigate={navigateTo} />;
      case 'marketplace':
        return <MarketplaceScreen onNavigate={navigateTo} />;
      case 'animal_details':
        return <AnimalDetailsScreen onNavigate={navigateTo} />;
      case 'favorites':
        return <FavoritesScreen onNavigate={navigateTo} />;
      case 'checkout':
        return <CheckoutScreen onNavigate={navigateTo} />;
      case 'orders':
        return <OrdersScreen onNavigate={navigateTo} />;
      case 'ai':
        return <AIConsultantScreen onNavigate={navigateTo} />;
      case 'about':
        return <AboutFarmScreen onNavigate={navigateTo} />;
      case 'contact':
        return <ContactScreen onNavigate={navigateTo} />;
      case 'location':
        return <FarmLocationScreen onNavigate={navigateTo} />;
      case 'more':
        return <AboutFarmScreen onNavigate={navigateTo} />;
      case 'admin':
        return <AdminDashboardScreen onNavigate={navigateTo} />;
      case 'add_animal':
        return <AddAnimalScreen onNavigate={navigateTo} />;
      default:
        return <HomeScreen onNavigate={navigateTo} />;
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col selection:bg-emerald-600 selection:text-white relative overflow-x-hidden antialiased transition-colors duration-200 ${
      isDark ? 'bg-neutral-950 text-neutral-100' : 'bg-stone-50 text-neutral-900'
    }`}>
      {/* Global Theme-Switching Circular Clip-Path Animation Overlay */}
      <ThemeTransitionOverlay />

      {/* Responsive Header Navbar */}
      {activeScreen !== 'splash' && (
        <div className="w-full shrink-0 z-40">
          <Navbar onNavigate={navigateTo} activeScreen={activeScreen} />
        </div>
      )}

      {/* Primary Page Content Container with Container & Grid Utilities */}
      <main
        id="app-main-content"
        className={`flex-1 w-full transition-all duration-200 ${
          activeScreen !== 'splash'
            ? 'container mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 pt-3 sm:pt-4 md:pt-6 lg:pt-8 pb-20 sm:pb-24 md:pb-10 lg:pb-14'
            : ''
        }`}
      >
        <div className="w-full grid grid-cols-1 gap-6 md:gap-8">
          {renderActiveScreen()}
        </div>
      </main>

      {/* Modern Responsive Footer with Bottom Navigation Clearance */}
      {activeScreen !== 'splash' && (
        <div className="w-full mt-auto pb-32 sm:pb-24 md:pb-24 transition-all">
          <Footer onNavigate={navigateTo} />
        </div>
      )}

      {/* Responsive Bottom Navigation for rapid switching between Home, AI Assistant, Marketplace, and Farm Dashboard */}
      {activeScreen !== 'splash' && (
        <aside 
          id="main-bottom-navigation-container"
          className="bottom-navigation fixed bottom-0 md:bottom-4 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:max-w-xl md:w-full z-50 px-0 md:px-4 pointer-events-none transition-all duration-300" 
          aria-label="Bottom Navigation"
        >
          <BottomNav activeScreen={activeScreen} onNavigate={navigateTo} />
        </aside>
      )}
    </div>
  );
}
