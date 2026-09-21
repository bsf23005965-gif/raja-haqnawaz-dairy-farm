// Configurable Social Media Links for Raja Haqnawaz Dairy Farm
// Reads from environment variables where available, with official fallbacks.

export const SOCIAL_LINKS = {
  facebook: import.meta.env?.VITE_FARM_FACEBOOK_URL || import.meta.env?.FARM_FACEBOOK_URL || 'https://facebook.com/RajaHaqnawazDairyFarm',
  tiktok: import.meta.env?.VITE_FARM_TIKTOK_URL || import.meta.env?.FARM_TIKTOK_URL || 'https://tiktok.com/@rajahaqnawazdairyfarm',
  youtube: import.meta.env?.VITE_FARM_YOUTUBE_URL || 'https://youtube.com/@RajaHaqnawazDairyFarm',
  instagram: import.meta.env?.VITE_FARM_INSTAGRAM_URL || 'https://instagram.com/rajahaqnawazdairyfarm',
};
