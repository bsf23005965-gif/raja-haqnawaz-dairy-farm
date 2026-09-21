import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Share2, 
  MapPin, 
  Clock, 
  Mail, 
  ExternalLink, 
  Copy, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Facebook,
  Youtube,
  Instagram
} from 'lucide-react';
import { FARM_CONTACT } from '../constants/farmContact.js';
import { SOCIAL_LINKS } from '../constants/socialLinks.js';
import { WhatsAppService } from '../services/WhatsAppService.js';
import { PhoneService } from '../services/PhoneService.js';

/**
 * ContactUs Component for the Home View
 * Displays the official phone, WhatsApp, and social media channels 
 * sourced from environment variables with one-click direct communication.
 */
export default function ContactUs({ onNavigate, farmContact, socialLinks }) {
  const [copiedField, setCopiedField] = useState(null);

  const contact = {
    phone: farmContact?.phone || FARM_CONTACT.phone,
    displayPhone: farmContact?.displayPhone || FARM_CONTACT.displayPhone,
    whatsapp: farmContact?.whatsapp || FARM_CONTACT.whatsapp,
    displayWhatsapp: farmContact?.displayWhatsapp || FARM_CONTACT.displayWhatsapp,
    email: farmContact?.email || FARM_CONTACT.email,
    farmAddress: farmContact?.farmAddress || FARM_CONTACT.farmAddress,
    workingHours: farmContact?.workingHours || FARM_CONTACT.workingHours,
  };

  const socials = {
    facebook: socialLinks?.facebook || SOCIAL_LINKS.facebook,
    tiktok: socialLinks?.tiktok || SOCIAL_LINKS.tiktok,
    youtube: socialLinks?.youtube || SOCIAL_LINKS.youtube,
    instagram: socialLinks?.instagram || SOCIAL_LINKS.instagram,
  };

  const copyToClipboard = (text, fieldName) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  return (
    <section 
      id="home-contact-us-section"
      aria-label="Official Farm Contact & Social Media"
      className="relative overflow-hidden rounded-3xl bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 md:p-10 shadow-2xl space-y-8"
    >
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Official Channels
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-400">
              <Clock className="w-3 h-3 text-amber-400" />
              {contact.workingHours}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Outfit']">
            Contact Farm Management
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300">
            Reach out directly for livestock bookings, lactation verification, veterinary records, or to schedule an in-person farm inspection in Jauharabad.
          </p>
        </div>

        <button
          id="contact-full-portal-btn"
          type="button"
          onClick={() => onNavigate?.('contact')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 hover:text-white text-xs sm:text-sm font-semibold border border-neutral-700/80 transition-all self-start md:self-auto cursor-pointer"
        >
          <span>Complete Contact Center</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
        </button>
      </div>

      {/* Main Communication Channels Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* WhatsApp Direct Card */}
        <div 
          id="contact-whatsapp-channel"
          className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-neutral-900 to-neutral-900 border border-emerald-800/40 flex flex-col justify-between space-y-4 hover:border-emerald-500/60 transition-all shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase tracking-wider">
              Instant Chat
            </span>
          </div>

          <div>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
              Official WhatsApp
            </span>
            <div className="flex items-center justify-between gap-2 mt-1">
              <span className="text-lg sm:text-xl font-black text-white font-mono">
                {contact.displayWhatsapp}
              </span>
              <button
                type="button"
                aria-label="Copy WhatsApp number"
                onClick={() => copyToClipboard(contact.whatsapp, 'whatsapp')}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                title="Copy number"
              >
                {copiedField === 'whatsapp' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              Live inquiries, HD animal videos, pedigree certificates & price negotiation.
            </p>
          </div>

          <button
            id="btn-direct-whatsapp-cta"
            type="button"
            onClick={() => WhatsAppService.openGeneralInquiry()}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>

        {/* Direct Phone Call Card */}
        <div 
          id="contact-phone-channel"
          className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-950/30 via-neutral-900 to-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-4 hover:border-amber-500/50 transition-all shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
              <Phone className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-black uppercase tracking-wider">
              Direct Helpline
            </span>
          </div>

          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
              Direct Phone Line
            </span>
            <div className="flex items-center justify-between gap-2 mt-1">
              <span className="text-lg sm:text-xl font-black text-white font-mono">
                {contact.displayPhone}
              </span>
              <button
                type="button"
                aria-label="Copy Phone number"
                onClick={() => copyToClipboard(contact.phone, 'phone')}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                title="Copy number"
              >
                {copiedField === 'phone' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              Speak directly with farm supervisors regarding transportation and on-site visits.
            </p>
          </div>

          <button
            id="btn-direct-call-cta"
            type="button"
            onClick={() => PhoneService.callFarm()}
            className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-100 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-neutral-700 hover:border-amber-500/60 transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Call Farm Office</span>
          </button>
        </div>

        {/* Physical Address & Navigation Card */}
        <div 
          id="contact-location-channel"
          className="p-5 sm:p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-4 hover:border-emerald-800/60 transition-all shadow-lg md:col-span-2 lg:col-span-1"
        >
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-2xl bg-teal-500/20 border border-teal-500/30 text-teal-400">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 text-[10px] font-bold">
              GPS Verified
            </span>
          </div>

          <div>
            <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block">
              Farm Address
            </span>
            <p className="text-xs sm:text-sm font-semibold text-white mt-1 leading-snug">
              {contact.farmAddress}
            </p>
            <p className="text-[11px] text-neutral-400 mt-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-neutral-500" />
              <span>{contact.email}</span>
            </p>
          </div>

          <button
            id="btn-directions-cta"
            type="button"
            onClick={() => onNavigate?.('location')}
            className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-neutral-700 transition-all cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-teal-400" />
            <span>Get Directions & Map</span>
          </button>
        </div>
      </div>

      {/* Social Media Channels Row */}
      <div className="relative z-10 p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800/90 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-amber-400 shrink-0">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">
              Official Social Media Pages
            </span>
            <span className="text-[11px] text-neutral-400">
              Watch daily milking sessions, feeding routines, and cattle arrivals
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Facebook Link */}
          {socials.facebook && (
            <a
              id="social-facebook-link"
              href={socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1877F2]/15 hover:bg-[#1877F2]/25 text-[#1877F2] hover:text-blue-300 border border-[#1877F2]/30 text-xs font-bold transition-colors"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}

          {/* TikTok Link */}
          {socials.tiktok && (
            <a
              id="social-tiktok-link"
              href={socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white hover:text-pink-400 border border-neutral-700 text-xs font-bold transition-colors"
            >
              <span className="font-mono text-sm leading-none">♪</span>
              <span>TikTok</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}

          {/* YouTube Link */}
          {socials.youtube && (
            <a
              id="social-youtube-link"
              href={socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FF0000]/15 hover:bg-[#FF0000]/25 text-[#FF0000] hover:text-red-300 border border-[#FF0000]/30 text-xs font-bold transition-colors"
            >
              <Youtube className="w-4 h-4" />
              <span>YouTube</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}

          {/* Instagram Link */}
          {socials.instagram && (
            <a
              id="social-instagram-link"
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 text-pink-400 hover:text-pink-300 border border-pink-500/30 text-xs font-bold transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
