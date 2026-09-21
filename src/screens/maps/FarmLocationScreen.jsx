import React, { useState } from 'react';
import { useAdminStore } from '../../stores/adminStore.js';
import { FARM_CONTACT } from '../../constants/farmContact.js';
import { WhatsAppService } from '../../services/WhatsAppService.js';
import { PhoneService } from '../../services/PhoneService.js';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  PhoneCall, 
  MessageCircle, 
  Compass, 
  Building,
  CheckCircle2
} from 'lucide-react';

export default function FarmLocationScreen({ onNavigate }) {
  const { farmContact } = useAdminStore();
  const [mapType, setMapType] = useState('standard'); // 'standard' | 'satellite'

  const latitude = farmContact.latitude || FARM_CONTACT.latitude;
  const longitude = farmContact.longitude || FARM_CONTACT.longitude;
  const address = farmContact.farmAddress || FARM_CONTACT.farmAddress;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase font-['Outfit']">
          Raja Haqnawaz Dairy Farm Location
        </h1>
        <p className="text-xs text-neutral-400">
          Visit our sprawling dairy facility to view cattle in person and meet Raja Haqnawaz.
        </p>
      </div>

      {/* Interactive Map Embed / Frame */}
      <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl">
        {/* Map Header Bar */}
        <div className="p-3.5 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-white">Live Farm Coordinates: {latitude}, {longitude}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setMapType(mapType === 'standard' ? 'satellite' : 'standard')}
              className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] font-medium border border-neutral-700"
            >
              {mapType === 'standard' ? 'View Satellite' : 'View Standard'}
            </button>
          </div>
        </div>

        {/* Embedded OpenStreetMap / Google Static Tile Fallback */}
        <div className="relative w-full h-80 sm:h-96 bg-neutral-950 flex items-center justify-center overflow-hidden">
          <iframe
            title="Raja Haqnawaz Dairy Farm Location"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.04}%2C${latitude - 0.03}%2C${longitude + 0.04}%2C${latitude + 0.03}&layer=mapnik&marker=${latitude}%2C${longitude}`}
            className="w-full h-full filter invert-[88%] hue-rotate-180 contrast-[85%]"
          />

          {/* Floating Marker Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none z-10 flex flex-col items-center">
            <div className="px-3 py-1.5 rounded-xl bg-emerald-950/95 border-2 border-emerald-500 text-white shadow-2xl backdrop-blur-md text-xs font-bold flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Raja Haqnawaz Dairy Farm</span>
            </div>
            <div className="w-4 h-4 bg-emerald-500 rotate-45 -mt-2 shadow-lg" />
          </div>
        </div>

        {/* Address Banner */}
        <div className="p-4 bg-neutral-900/90 border-t border-neutral-800 space-y-1">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs text-neutral-200 font-medium">
              {address}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Get Directions */}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex flex-col items-center justify-center text-center gap-2 shadow-lg shadow-emerald-950/40 transition-all group"
        >
          <Navigation className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold">Get Directions</span>
        </a>

        {/* Open Google Maps */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-2xl bg-neutral-850 hover:bg-neutral-800 text-neutral-100 border border-neutral-700 flex flex-col items-center justify-center text-center gap-2 transition-all group"
        >
          <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform text-blue-400" />
          <span className="text-xs font-bold">Open Google Maps</span>
        </a>

        {/* Call Farm */}
        <button
          onClick={() => PhoneService.callFarm()}
          className="p-3.5 rounded-2xl bg-neutral-850 hover:bg-neutral-800 text-neutral-100 border border-neutral-700 flex flex-col items-center justify-center text-center gap-2 transition-all group"
        >
          <PhoneCall className="w-5 h-5 group-hover:scale-110 transition-transform text-emerald-400" />
          <span className="text-xs font-bold">Call Farm</span>
        </button>

        {/* WhatsApp */}
        <button
          onClick={() => WhatsAppService.openGeneralInquiry()}
          className="p-3.5 rounded-2xl bg-neutral-850 hover:bg-neutral-800 text-neutral-100 border border-neutral-700 flex flex-col items-center justify-center text-center gap-2 transition-all group"
        >
          <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform text-emerald-400" />
          <span className="text-xs font-bold">WhatsApp</span>
        </button>
      </div>

      {/* Visiting Guidelines */}
      <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
        <h2 className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
          Farm Visitor Protocol
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px] text-neutral-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Visiting hours: 7:00 AM - 6:00 PM (Prior notification recommended)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Live milking trials available during morning (6:00 AM) and evening (5:00 PM)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Biosecurity footbath required prior to cattle shed entry</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>On-site veterinary inspection documents provided with every animal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
