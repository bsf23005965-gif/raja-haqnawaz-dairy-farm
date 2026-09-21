import React from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Award, 
  ShieldCheck, 
  Heart, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { FARM_CONTACT } from '../constants/farmContact.js';
import { BRANDING } from '../constants/branding.js';
import { PhoneService } from '../services/PhoneService.js';
import { WhatsAppService } from '../services/WhatsAppService.js';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 text-neutral-300 mt-12">
      {/* Top Banner / Trust Points */}
      <div className="border-b border-neutral-800 bg-neutral-925 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">30+ Years Legacy</h4>
              <p className="text-xs text-neutral-400">Trusted pedigree livestock in Punjab</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Veterinary Certified</h4>
              <p className="text-xs text-neutral-400">Vaccinated & biosecurity screened</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400 shrink-0">
              <MapPin className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Jauharabad, Khushab</h4>
              <p className="text-xs text-neutral-400">Naseem Colony near Imambargah</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400 shrink-0">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Open 7 Days a Week</h4>
              <p className="text-xs text-neutral-400">06:00 AM – 09:00 PM PKT</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-emerald-500/50 bg-neutral-950 shrink-0">
                <img
                  src="/raja-haqnawaz-dairy-farm/farm_logo.jpg"
                  alt="Raja Haqnawaz Dairy Farm"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white tracking-tight">
                  RAJA HAQNAWAZ DAIRY FARM
                </h3>
                <p className="text-xs text-emerald-400 font-semibold">
                  راجہ حق نواز ڈیری فارم • جوہرآباد، خوشاب
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-md">
              Established in 1994 by <strong>Raja Haqnawaz</strong>, our farm provides elite purebred dairy cattle, champion Sahiwal cows, Nili Ravi buffaloes, and certified high-milk genetics with complete transparency and doorstep transport across Pakistan.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => PhoneService.callFarm()}
                className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-white text-xs font-semibold flex items-center gap-2 border border-neutral-700 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call: {FARM_CONTACT.displayPhone}</span>
              </button>

              <button
                onClick={() => WhatsAppService.openGeneralInquiry()}
                className="px-3.5 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-xs font-semibold flex items-center gap-2 border border-emerald-800/60 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: {FARM_CONTACT.displayWhatsapp}</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Explore Farm
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-emerald-400 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-emerald-400 transition-colors">
                  About Farm (Legacy & Heritage)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('marketplace')} className="hover:text-emerald-400 transition-colors">
                  Livestock Marketplace (33)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai')} className="hover:text-emerald-400 transition-colors">
                  AI Cattle Consultant
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('orders')} className="hover:text-emerald-400 transition-colors">
                  Track Orders & Transport
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-emerald-400 transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('location')} className="hover:text-emerald-400 transition-colors">
                  Farm Location & Map
                </button>
              </li>
            </ul>
          </div>

          {/* Breeds & Cattle */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Livestock Breeds
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Pure Sahiwal Cows (ساہیوال)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Nili Ravi Buffaloes (نیلی راوی)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Cholistani Cattle (چولستانی)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Red Sindhi (لال سندھی)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Friesian & Jersey Crosses</span>
              </li>
            </ul>
          </div>

          {/* Farm Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Farm Address
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              <strong>Raja Haqnawaz Dairy Farm</strong><br />
              Naseem Colony near Imambargah,<br />
              Jauharabad, District Khushab,<br />
              Punjab, Pakistan
            </p>
            <button
              onClick={() => onNavigate('location')}
              className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <span>View On Interactive Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 bg-neutral-950 py-4 px-4 sm:px-6 lg:px-8 text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
        <p>
          © 1994 – {new Date().getFullYear()} Raja Haqnawaz Dairy Farm. All rights reserved.
        </p>
        <p className="text-[11px] text-neutral-400">
          Founder: <strong className="text-neutral-200">Raja Haqnawaz</strong> • Jauharabad, Khushab
        </p>
      </div>
    </footer>
  );
}
