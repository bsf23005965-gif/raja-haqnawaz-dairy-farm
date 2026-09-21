import { create } from 'zustand';

export const useFavoriteStore = create((set, get) => {
  const initialFavorites = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('rh_favorites') || '[]')
    : ['RH-AN-101', 'RH-AN-102', 'RH-AN-108'];

  return {
    favoriteIds: initialFavorites,

    toggleFavorite: (animalId) => {
      const current = get().favoriteIds;
      let updated;
      if (current.includes(animalId)) {
        updated = current.filter(id => id !== animalId);
      } else {
        updated = [...current, animalId];
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('rh_favorites', JSON.stringify(updated));
      }
      set({ favoriteIds: updated });
    },

    isFavorite: (animalId) => {
      return get().favoriteIds.includes(animalId);
    },

    clearFavorites: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('rh_favorites');
      }
      set({ favoriteIds: [] });
    }
  };
});
