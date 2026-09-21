import React from 'react';
import { useAdminStore } from '../../stores/adminStore.js';
import { FARM_CONTACT } from '../../constants/farmContact.js';
import { SOCIAL_LINKS } from '../../constants/socialLinks.js';
import { WhatsAppService } from '../../services/WhatsAppService.js';
import { PhoneService } from '../../services/PhoneService.js';
import { 
  MessageCircle, 
  PhoneCall, 
  MapPin, 
  Share2, 
  Clock, 
  Mail, 
  ArrowRight,
  ExternalLink 
} from 'lucide-react';

export default function ContactScreen({ onNavigate }) {
  const { farmContact, socialLinks } = useAdminStore();

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase font-['Outfit']">
          Contact Raja Haqnawaz Dairy Farm
        </h1>
        <p className="text-xs text-neutral-400">
          Official communication channels, location details, and social media links.
        </p>
      </div>

      {/* Primary Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* WhatsApp Card */}
        <div className="p-5 rounded-2xl bg-neutral-900 border border-emerald-800/40 space-y-4 flex flex-col justify-between shadow-lg shadow-emerald-950/20">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-700/50">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">Official WhatsApp</span>
              <span className="text-lg font-extrabold text-white">
                {farmContact.displayWhatsapp || FARM_CONTACT.displayWhatsapp}
              </span>
            </div>
          </div>

          <p className="text-xs text-neutral-400">
            Instant livestock inquiries, high-resolution cow/buffalo video requests, and order tracking.
          </p>

          <button
            onClick={() => WhatsAppService.openGeneralInquiry()}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <span>CHAT NOW</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Phone Call Card */}
        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4 flex flex-col justify-between shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-neutral-800 text-emerald-400 border border-neutral-700">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">Direct Phone Call</span>
              <span className="text-lg font-extrabold text-white">
                {farmContact.displayPhone || FARM_CONTACT.displayPhone}
              </span>
            </div>
          </div>

          <p className="text-xs text-neutral-400">
            Speak directly with Raja Haqnawaz or farm managers for bulk cattle orders and scheduled visits.
          </p>

          <button
            onClick={() => PhoneService.callFarm()}
            className="w-full py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 border border-neutral-700 transition-all"
          >
            <span>CALL NOW</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Facebook Card */}
        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-blue-950/70 text-blue-400 border border-blue-800/50">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">Facebook Page</span>
              <span className="text-sm font-bold text-white">
                Follow our farm
              </span>
            </div>
          </div>

          <p className="text-xs text-neutral-400">
            Daily photos of milk yields, livestock feeding routines, and live customer reviews.
          </p>

          <a
            href={socialLinks.facebook || SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl bg-blue-900/60 hover:bg-blue-800/80 text-blue-200 font-bold text-xs flex items-center justify-center gap-2 border border-blue-700/50 transition-all"
          >
            <span>OPEN FACEBOOK</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* TikTok Card */}
        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-neutral-800 text-pink-400 border border-neutral-700">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">TikTok Channel</span>
              <span className="text-sm font-bold text-white">
                Follow our farm
              </span>
            </div>
          </div>

          <p className="text-xs text-neutral-400">
            Watch short video tours of new Sahiwal cows, Nili-Ravi champion bulls, and calf nurseries.
          </p>

          <a
            href={socialLinks.tiktok || SOCIAL_LINKS.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs flex items-center justify-center gap-2 border border-neutral-700 transition-all"
          >
            <span>OPEN TIKTOK</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Farm Location Button Banner */}
      <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="p-3 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800/50 shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Physical Farm Premises</h2>
            <p className="text-xs text-neutral-400 max-w-md">
              {farmContact.farmAddress || FARM_CONTACT.farmAddress}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('location')}
          className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shrink-0 transition-all shadow-lg"
        >
          <span>View Farm Location</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Operating Hours Note */}
      <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex items-center gap-3 text-xs text-neutral-400">
        <Clock className="w-4 h-4 text-amber-400 shrink-0" />
        <span>{FARM_CONTACT.workingHours}</span>
      </div>
    </div>
  );
}
