import React from 'react';
import { useAdminStore } from '../../stores/adminStore.js';
import { BRANDING } from '../../constants/branding.js';
import { FARM_CONTACT } from '../../constants/farmContact.js';
import { WhatsAppService } from '../../services/WhatsAppService.js';
import { PhoneService } from '../../services/PhoneService.js';
import { 
  Award, 
  ShieldCheck, 
  Milk, 
  HeartHandshake, 
  Clock, 
  Globe, 
  PhoneCall, 
  MessageCircle,
  CheckCircle2,
  Users,
  MapPin,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function AboutFarmScreen({ onNavigate }) {
  const { branding, aboutContent, farmContact } = useAdminStore();

  const coreCards = [
    {
      title: 'Healthy Livestock',
      desc: 'Regular veterinary screening, pure green fodder, and preventive vaccination.',
      icon: ShieldCheck,
      color: 'emerald'
    },
    {
      title: 'Quality Dairy',
      desc: 'Natural unadulterated sweet milk and champion butterfat breeding lines.',
      icon: Milk,
      color: 'amber'
    },
    {
      title: 'Responsible Farming',
      desc: 'Ethical animal welfare, spacious sheds, and climate adaptation.',
      icon: CheckCircle2,
      color: 'green'
    },
    {
      title: 'Customer Trust',
      desc: '30+ years of verified milk records and honest, transparent pricing.',
      icon: HeartHandshake,
      color: 'blue'
    },
    {
      title: '30+ Years Experience',
      desc: 'Three decades of pedigree selection and livestock breeding in Punjab.',
      icon: Clock,
      color: 'purple'
    },
    {
      title: 'Modern Online Service',
      desc: 'Explore available animals, view real metrics, and order online with doorstep transport.',
      icon: Globe,
      color: 'teal'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* SECTION 1: PROMINENT RAJA HAQNAWAZ FOUNDER SHOWCASE (COMPLETE PICTURE) */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 shadow-2xl p-6 sm:p-10">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* COMPLETE PICTURE SHOWCASE (Large, Complete, Uncropped) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm sm:max-w-md rounded-3xl overflow-hidden bg-neutral-950 border-4 border-amber-500/60 shadow-2xl shadow-emerald-950/70 group">
              {/* Full Complete Photo Display */}
              <div className="w-full bg-neutral-950 flex items-center justify-center p-2 sm:p-3">
                <img
                  src="/raja_haqnawaz.jpg"
                  alt="Raja Haqnawaz - Founder & Patron of Raja Haqnawaz Dairy Farm"
                  className="w-full h-auto max-h-[520px] object-contain rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  onError={(e) => {
                    e.target.src = '/farm_logo.jpg';
                  }}
                />
              </div>

              {/* Verified Ribbon / Name Banner */}
              <div className="p-4 bg-gradient-to-t from-neutral-950 via-neutral-900 to-neutral-900/90 border-t border-neutral-800 text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>بانی و سرپرست (Founder & Patron)</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Raja Haqnawaz (راجہ حق نواز)
                </h2>
                <p className="text-xs text-emerald-400 font-medium">
                  Raja Haqnawaz Dairy Farm, Jauharabad, Khushab • Est. 1994
                </p>
              </div>
            </div>

            {/* Sub-Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-semibold border border-emerald-800/40">
                ✓ 30+ Years Livestock Pioneer
              </span>
              <span className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-700">
                📍 Naseem Colony, Jauharabad
              </span>
            </div>
          </div>

          {/* FOUNDER STORY & FARM CREDENTIALS */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>30+ Years of Livestock Breeding Excellence</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase font-['Outfit']">
                About Raja Haqnawaz Dairy Farm
              </h1>
              <p className="text-sm font-semibold text-emerald-400">
                نسیم کالونی نزد امام بارگاہ، جوہر آباد، ضلع خوشاب
              </p>
            </div>

            {/* Urdu Official Message */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950/80 border border-emerald-800/40 text-emerald-300 text-xs sm:text-sm font-medium leading-relaxed italic text-right" dir="rtl">
              "خوشاب کی زرخیز دھرتی پر 30 سال سے زائد عرصے سے خالص نسل کی گائے اور بھینسوں کی افزائش ہمارا اعزاز ہے۔ ہم ہر ڈیری فارمر کو شفاف دودھ کی پیداوار، تصدیق شدہ نسل اور مکمل ایمانداری کی ضمانت دیتے ہیں۔ فارم پر آپ کو خود تشریف لانے، معائنہ کرنے اور موقع پر چوائی دیکھنے کی کھلی دعوت ہے۔"
              <div className="text-left font-bold text-amber-300 not-italic text-xs mt-2" dir="ltr">
                — Raja Haqnawaz (راجہ حق نواز)
              </div>
            </div>

            {/* English Narrative */}
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Established in 1994 by <strong>Raja Haqnawaz</strong>, our dairy farm in <strong>Naseem Colony near Imambargah, Jauharabad, District Khushab</strong> is one of Punjab’s most trusted hubs for pure-breed A2 Sahiwal cows, championship Nili-Ravi buffaloes, Cholistani cattle, and high-pedigree breeding bulls. Every animal on our farm undergoes rigorous veterinary health testing, milk lactation verification, and genetic certification.
            </p>

            {/* ACTION BUTTONS (Direct Call & WhatsApp to Raja Haqnawaz) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              {/* Direct Call to Raja Haqnawaz */}
              <button
                onClick={() => PhoneService.callFarm()}
                className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xl shadow-emerald-950/70 border border-emerald-500/40 transition-all transform hover:-translate-y-0.5"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Raja Haqnawaz: {farmContact.displayPhone || FARM_CONTACT.displayPhone}</span>
              </button>

              {/* WhatsApp Raja Haqnawaz */}
              <button
                onClick={() => WhatsAppService.openGeneralInquiry()}
                className="py-3 px-5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 hover:text-white border border-neutral-700 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: {farmContact.displayWhatsapp || FARM_CONTACT.displayWhatsapp}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FARM CREDENTIALS & PHYSICAL ADDRESS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
          <div className="flex items-center gap-2 text-amber-400">
            <MapPin className="w-5 h-5" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Physical Location</h3>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Naseem Colony near Imambargah, Jauharabad, District Khushab, Punjab, Pakistan. Open for visits 7 days a week.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Veterinary Certified</h3>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            All animals are fully vaccinated against FMD & HS, routinely dewormed, and tested for mastitis and brucellosis.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
          <div className="flex items-center gap-2 text-blue-400">
            <Globe className="w-5 h-5" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Nationwide Delivery</h3>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Live transit support with climate-padded trucks delivering across Punjab, Sindh, KPK, and Balochistan.
          </p>
        </div>
      </div>

      {/* SECTION 3: MISSION & VISION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Our Mission */}
        <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
          <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <span>Our Mission (ہمارا مشن)</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {aboutContent.mission || 'To produce and supply superior dairy genetics and healthy milch animals across Pakistan with uncompromised honesty, biosecurity, and verified milk yield records.'}
          </p>
        </div>

        {/* Our Vision */}
        <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
          <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <span>Our Vision (ہمارا وژن)</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {aboutContent.vision || 'To preserve pure indigenous cattle breeds like Sahiwal and Nili Ravi while enabling dairy farmers across Pakistan to prosper through modern technology and transparent livestock sales.'}
          </p>
        </div>
      </div>

      {/* SECTION 4: 6 CORE PILLARS */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Why Choose Raja Haqnawaz Dairy Farm?
          </h2>
          <p className="text-xs text-neutral-400">
            30 years of unwavering commitment to livestock health, genetics, and customer satisfaction
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {coreCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-neutral-900 border border-neutral-800/90 flex flex-col justify-between space-y-2.5 hover:border-emerald-700/50 hover:bg-neutral-850 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 shrink-0 group-hover:bg-emerald-900/60 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {card.title}
                  </h3>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
