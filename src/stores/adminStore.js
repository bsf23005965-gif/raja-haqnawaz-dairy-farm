import { create } from 'zustand';
import { FARM_CONTACT } from '../constants/farmContact.js';
import { SOCIAL_LINKS } from '../constants/socialLinks.js';
import { BRANDING } from '../constants/branding.js';

export const useAdminStore = create((set, get) => {
  const savedSettings = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('rh_admin_settings') || 'null')
    : null;

  let initialContact = savedSettings?.farmContact ? { ...FARM_CONTACT, ...savedSettings.farmContact } : { ...FARM_CONTACT };
  // Migrate legacy placeholder address to official Khushab location
  if (!initialContact.farmAddress || initialContact.farmAddress.includes('Multan')) {
    initialContact.farmAddress = FARM_CONTACT.farmAddress;
    initialContact.latitude = FARM_CONTACT.latitude;
    initialContact.longitude = FARM_CONTACT.longitude;
    initialContact.city = FARM_CONTACT.city;
    initialContact.district = FARM_CONTACT.district;
  }

  let initialBranding = savedSettings?.branding ? { ...BRANDING, ...savedSettings.branding } : { ...BRANDING };
  initialBranding.founderPhoto = BRANDING.founderPhoto;
  initialBranding.officialPhotoSource = BRANDING.officialPhotoSource;
  if (!initialBranding.fallbackPhoto || initialBranding.fallbackPhoto.includes('unsplash') || initialBranding.fallbackPhoto === '/raja-haqnawaz-dairy-farm/farm_logo.jpg') {
    initialBranding.fallbackPhoto = BRANDING.fallbackPhoto;
  }
  if (!initialBranding.logo) {
    initialBranding.logo = BRANDING.logo;
  }
  if (!initialBranding.location || initialBranding.location.includes('Punjab, Pakistan')) {
    initialBranding.location = BRANDING.location;
  }

  return {
    activeAdminTab: 'dashboard', // 'dashboard' | 'animals' | 'add_animal' | 'orders' | 'payments' | 'customers' | 'analytics' | 'profile' | 'about' | 'contact' | 'social' | 'settings'

    farmContact: initialContact,
    socialLinks: savedSettings?.socialLinks || { ...SOCIAL_LINKS },
    branding: initialBranding,
    aboutContent: savedSettings?.aboutContent || {
      heading: 'About Raja Haqnawaz Dairy Farm',
      highlight: '30+ Years of Experience',
      mainStory: BRANDING.aboutExcerpt,
      mission: 'To produce and supply superior dairy genetics and healthy milch animals across Pakistan with uncompromised honesty and biosecurity.',
      vision: 'To lead modern sustainable dairy farming and online livestock transparency in South Asia.',
      values: [
        { title: 'Healthy Livestock', description: 'Regular veterinary screening, pure green fodder, and preventive vaccination.' },
        { title: 'Quality Dairy', description: 'Natural unadulterated sweet milk and champion butterfat breeding lines.' },
        { title: 'Responsible Farming', description: 'Ethical animal welfare, spacious sheds, and climate adaptation.' },
        { title: 'Customer Trust', description: '30+ years of verified milk records and honest, transparent pricing.' }
      ]
    },

    setActiveAdminTab: (tab) => set({ activeAdminTab: tab }),

    updateContactInfo: (updates) => {
      const updated = { ...get().farmContact, ...updates };
      set({ farmContact: updated });
      get().persist();
    },

    updateSocialLinks: (updates) => {
      const updated = { ...get().socialLinks, ...updates };
      set({ socialLinks: updated });
      get().persist();
    },

    updateBranding: (updates) => {
      const updated = { ...get().branding, ...updates };
      set({ branding: updated });
      get().persist();
    },

    updateAboutContent: (updates) => {
      const updated = { ...get().aboutContent, ...updates };
      set({ aboutContent: updated });
      get().persist();
    },

    persist: () => {
      if (typeof window !== 'undefined') {
        const { farmContact, socialLinks, branding, aboutContent } = get();
        localStorage.setItem('rh_admin_settings', JSON.stringify({
          farmContact,
          socialLinks,
          branding,
          aboutContent
        }));
      }
    },

    resetToDefaults: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('rh_admin_settings');
      }
      set({
        farmContact: { ...FARM_CONTACT },
        socialLinks: { ...SOCIAL_LINKS },
        branding: { ...BRANDING },
        aboutContent: {
          heading: 'About Raja Haqnawaz Dairy Farm',
          highlight: '30+ Years of Experience',
          mainStory: BRANDING.aboutExcerpt,
          mission: 'To produce and supply superior dairy genetics and healthy milch animals across Pakistan with uncompromised honesty and biosecurity.',
          vision: 'To lead modern sustainable dairy farming and online livestock transparency in South Asia.',
          values: [
            { title: 'Healthy Livestock', description: 'Regular veterinary screening, pure green fodder, and preventive vaccination.' },
            { title: 'Quality Dairy', description: 'Natural unadulterated sweet milk and champion butterfat breeding lines.' },
            { title: 'Responsible Farming', description: 'Ethical animal welfare, spacious sheds, and climate adaptation.' },
            { title: 'Customer Trust', description: '30+ years of verified milk records and honest, transparent pricing.' }
          ]
        }
      });
    }
  };
});
