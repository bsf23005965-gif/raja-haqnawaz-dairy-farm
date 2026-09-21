// Official Contact Information for Raja Haqnawaz Dairy Farm
// Reads from environment variables where available, with official fallbacks.

const envWhatsapp = import.meta.env?.VITE_FARM_WHATSAPP || import.meta.env?.FARM_WHATSAPP || '03452923974';
const envPhone = import.meta.env?.VITE_FARM_PHONE || import.meta.env?.FARM_PHONE || '03006072070';

export const FARM_CONTACT = {
  whatsapp: envWhatsapp,
  phone: envPhone,
  internationalWhatsapp: envWhatsapp.startsWith('0') ? `+92${envWhatsapp.slice(1)}` : (envWhatsapp.startsWith('+') ? envWhatsapp : `+${envWhatsapp}`),
  internationalPhone: envPhone.startsWith('0') ? `+92${envPhone.slice(1)}` : (envPhone.startsWith('+') ? envPhone : `+${envPhone}`),
  displayWhatsapp: envWhatsapp.length === 11 ? `${envWhatsapp.slice(0, 4)} ${envWhatsapp.slice(4)}` : envWhatsapp,
  displayPhone: envPhone.length === 11 ? `${envPhone.slice(0, 4)} ${envPhone.slice(4)}` : envPhone,
  farmAddress: 'Naseem Colony near Imambargah, Jauharabad, District Khushab, Punjab, Pakistan',
  city: 'Jauharabad',
  district: 'Khushab',
  latitude: 32.2855,
  longitude: 72.3289,
  email: 'contact@rajahaqnawazdairy.com',
  workingHours: 'Open 7 Days a Week: 6:00 AM - 9:00 PM PKT',
};
