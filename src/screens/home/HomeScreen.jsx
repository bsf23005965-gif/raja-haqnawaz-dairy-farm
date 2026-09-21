import React from 'react';
import { useAnimalStore } from '../../stores/animalStore.js';
import { useFavoriteStore } from '../../stores/favoriteStore.js';
import { useAdminStore } from '../../stores/adminStore.js';
import { useAuthStore } from '../../stores/authStore.js';
import { BRANDING } from '../../constants/branding.js';
import { FARM_CONTACT } from '../../constants/farmContact.js';
import { SOCIAL_LINKS } from '../../constants/socialLinks.js';
import { WhatsAppService } from '../../services/WhatsAppService.js';
import { PhoneService } from '../../services/PhoneService.js';
import Hero from '../../components/Hero.jsx';
import FeaturedLivestock from '../../components/FeaturedLivestock.jsx';
import MarketTrendsWidget from '../../components/MarketTrendsWidget.jsx';
import ContactUs from '../../components/ContactUs.jsx';
import ClientTestimonials from '../../components/ClientTestimonials.jsx';
import { 
  Sparkles, 
  ArrowRight, 
  Heart, 
  MapPin, 
  PhoneCall, 
  MessageCircle, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Share2, 
  ChevronRight, 
  Filter,
  Activity,
  Milk,
  TrendingUp
} from 'lucide-react';

export default function HomeScreen({ onNavigate }) {
  const { animals } = useAnimalStore();
  const { branding, farmContact, socialLinks } = useAdminStore();
  const { user, setRole } = useAuthStore();

  const quickActions = [
    { id: 'marketplace', label: 'Livestock', icon: '🐄', desc: `Browse ${animals.length || 33} Cattle` },
    { id: 'market_trends', label: 'Market Rates', icon: '📈', desc: 'Google Search Prices' },
    { id: 'admin', label: 'Farm Dashboard', icon: '📊', desc: '30-Day Milk Trends' },
    { id: 'about', label: 'About Farm', icon: '🏛️', desc: '30+ Years Story' },
  ];

  const handleQuickAction = (actionId) => {
    if (actionId === 'admin' && user?.role !== 'Admin') {
      setRole('Admin');
    }
    onNavigate(actionId);
  };

  const whyChooseUs = [
    {
      title: 'Healthy Livestock',
      description: 'Routine veterinary screening, pedigree verification, and mandatory FMD/HS vaccinations.',
      icon: ShieldCheck,
      color: 'emerald'
    },
    {
      title: 'Quality Dairy',
      description: 'Champion A2 Sahiwal cows and Nili-Ravi buffaloes yielding up to 35 liters daily with high butterfat.',
      icon: Milk,
      color: 'amber'
    },
    {
      title: 'Trusted Service',
      description: 'Direct livestock transport in climate-controlled trucks with live arrival guarantees across Pakistan.',
      icon: CheckCircle2,
      color: 'blue'
    },
    {
      title: '30+ Years Experience',
      description: 'Led by Raja Haqnawaz since 1994, trusted by thousands of progressive dairy entrepreneurs.',
      icon: Award,
      color: 'purple'
    }
  ];

  return (
    <div className="w-full grid grid-cols-1 gap-6 sm:gap-8 pb-6 sm:pb-12">
      {/* Hero Section with 30+ years experience and call-to-action */}
      <Hero 
        branding={branding} 
        totalAnimals={animals?.length || 33} 
        onNavigate={onNavigate} 
      />

      {/* Quick Actions - Responsive Multi-Column Grid */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold text-neutral-200 uppercase tracking-wider">Quick Actions</h2>
          <span className="text-[11px] text-neutral-500">Instant Navigation</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action.id)}
              className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800/80 hover:border-emerald-700/50 hover:bg-neutral-850 text-center transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-800 group-hover:bg-emerald-950/50 flex items-center justify-center text-xl mb-1.5 transition-colors">
                {action.icon}
              </div>
              <span className="text-xs font-bold text-neutral-200 group-hover:text-emerald-400 transition-colors">
                {action.label}
              </span>
              <span className="text-[9px] text-neutral-500 truncate max-w-full">
                {action.desc}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* About Farm Section - Directly After Home Quick Actions */}
      <section className="rounded-3xl bg-neutral-900/90 border border-neutral-800 p-6 sm:p-7 relative overflow-hidden shadow-xl">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 text-xs font-bold">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Established 1994 • 30+ Years of Dairy Trust</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-['Outfit'] uppercase">
              About Raja Haqnawaz Dairy Farm
            </h2>

            <p className="text-xs sm:text-sm text-emerald-300 font-semibold" dir="rtl">
              نسیم کالونی نزد امام بارگاہ، جوہر آباد، ضلع خوشاب
            </p>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Founded in 1994 by <strong>Raja Haqnawaz</strong>, our dairy farm in <strong>Naseem Colony near Imambargah, Jauharabad, District Khushab</strong> is one of Punjab's most renowned hubs for pure A2 Sahiwal cows, championship Nili-Ravi buffaloes, and certified stud bulls. Every animal undergoes strict veterinary testing and verified lactation recording.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-neutral-850/90 border border-neutral-800">
                <span className="block text-amber-400 font-bold">30+ Years</span>
                <span className="text-[10px] text-neutral-400">Trusted Heritage</span>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-850/90 border border-neutral-800">
                <span className="block text-emerald-400 font-bold">{animals.length || 33} Cattle</span>
                <span className="text-[10px] text-neutral-400">Total Live Herd</span>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-850/90 border border-neutral-800 col-span-2 sm:col-span-1">
                <span className="block text-white font-bold">A2 Beta-Casein</span>
                <span className="text-[10px] text-neutral-400">Pure Organic Milk</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('about')}
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition-all"
              >
                <span>Read Full About Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => PhoneService.callFarm()}
                className="py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-semibold flex items-center gap-2 border border-neutral-700 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call Raja Haqnawaz</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 bg-neutral-950 shadow-2xl">
              <img
                src="/raja-haqnawaz-dairy-farm/assets/cattle/sahiwal_body.jpg"
                alt="Raja Haqnawaz Dairy Farm Sahiwal Cattle"
                className="w-full h-52 sm:h-60 object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-neutral-900/90 backdrop-blur-sm border border-neutral-800">
                <span className="text-white font-bold text-xs block">Raja Haqnawaz Dairy Farm</span>
                <span className="text-[11px] text-emerald-400">Naseem Colony near Imambargah, Jauharabad, Khushab</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Market Trends & Dairy News (Google Search Grounded) */}
      <MarketTrendsWidget onNavigate={onNavigate} />

      {/* Featured Livestock Component showcasing top-selling animals with images, breed names, and price tags */}
      <FeaturedLivestock onNavigate={onNavigate} />

      {/* Why Choose Us Section */}
      <section className="rounded-3xl bg-neutral-900/70 border border-neutral-800 p-6 sm:p-7 space-y-4 shadow-lg">
        <div className="space-y-4">
          <div className="text-left space-y-1">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Our Commitment</span>
            <h2 className="text-lg sm:text-xl font-black text-white">Why Choose Raja Haqnawaz Dairy Farm?</h2>
            <p className="text-xs sm:text-sm text-neutral-400">Setting the benchmark for livestock health and ethical dairy in Pakistan.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800/80"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-bold text-neutral-100">{item.title}</h3>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
          <span>Biosecurity certified sheds</span>
          <span className="text-emerald-400 font-semibold">100% Genuine Pedigree</span>
        </div>
      </section>

      {/* Client Testimonials Component highlighting 30+ years customer trust */}
      <ClientTestimonials onNavigate={onNavigate} />

      {/* Official Contact Us Component displaying Phone, WhatsApp, and Social Media links */}
      <ContactUs 
        onNavigate={onNavigate}
        farmContact={farmContact}
        socialLinks={socialLinks}
      />

      {/* Farm Location Section - Last Section */}
      <section className="rounded-3xl bg-neutral-900/90 border border-neutral-800 p-6 sm:p-7 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                <MapPin className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-black text-white uppercase font-['Outfit']">
                Farm Location (فارم کا اصل پتہ)
              </h2>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Physical address in Naseem Colony near Imambargah, Jauharabad, District Khushab, Punjab.
            </p>
          </div>

          <button
            onClick={() => onNavigate('location')}
            className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 self-start sm:self-auto transition-all shadow-md"
          >
            <span>Interactive Map & GPS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-neutral-850 border border-neutral-800 space-y-1">
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">Official Location</span>
            <p className="text-white font-bold text-xs sm:text-sm">
              Raja Haqnawaz Dairy Farm
            </p>
            <p className="text-neutral-300">
              Naseem Colony near Imambargah, Jauharabad, District Khushab, Punjab, Pakistan
            </p>
            <p className="text-emerald-400 text-[11px] pt-1" dir="rtl">
              نسیم کالونی نزد امام بارگاہ، جوہر آباد، ضلع خوشاب
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-850 border border-neutral-800 space-y-1">
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">Farm Visiting Hours</span>
            <p className="text-white font-bold text-xs sm:text-sm">
              Open 7 Days a Week
            </p>
            <p className="text-neutral-300">
              06:00 AM to 09:00 PM (PKT)
            </p>
            <p className="text-amber-400 text-[11px] pt-1">
              Morning & Evening milking inspection open to visitors
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-850 border border-neutral-800 flex flex-col justify-between gap-3">
            <div>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">Coordinates & Access</span>
              <p className="text-white font-bold text-xs sm:text-sm font-mono">
                32.2905° N, 72.2828° E
              </p>
              <p className="text-neutral-400 text-[11px]">
                Accessible via M-2 Motorway & Khushab Bypass
              </p>
            </div>
            <button
              onClick={() => onNavigate('location')}
              className="w-full py-2 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-emerald-400 font-bold text-xs flex items-center justify-center gap-1.5 border border-neutral-700 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
