import { create } from 'zustand';
import { SEED_ANIMALS } from '../data/seedAnimals.js';
import { 
  getSanitizedCattlePhoto, 
  getAnimalInspectionGallery, 
  isInvalidCattleImage 
} from '../constants/cattleImageAngles.js';

export const useAnimalStore = create((set, get) => {
  let rawAnimals = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('rh_animals_db') || 'null')
    : null;

  if (!rawAnimals || !Array.isArray(rawAnimals) || rawAnimals.length < SEED_ANIMALS.length || !rawAnimals.some(a => a.id === 'RH-AN-133')) {
    rawAnimals = SEED_ANIMALS;
  }

  // Cleanse any legacy or cached animals containing cycling or land images, and attach 5-angle galleries
  const initialAnimals = rawAnimals.map((animal) => {
    const sanitizedUrl = getSanitizedCattlePhoto(animal);
    const gallery = getAnimalInspectionGallery({ ...animal, imageUrl: sanitizedUrl });
    const angles = animal.angles && !isInvalidCattleImage(animal.angles.body)
      ? animal.angles
      : {
          face: gallery.find(g => g.key === 'face')?.url || '/raja-haqnawaz-dairy-farm/assets/cattle/cow_face.jpg',
          body: sanitizedUrl,
          udder: gallery.find(g => g.key === 'udder')?.url || '/raja-haqnawaz-dairy-farm/assets/cattle/cow_udder.jpg',
          rear: gallery.find(g => g.key === 'rear')?.url || '/raja-haqnawaz-dairy-farm/assets/cattle/cow_rear.jpg',
          legs: gallery.find(g => g.key === 'legs')?.url || '/raja-haqnawaz-dairy-farm/assets/cattle/cow_legs.jpg',
        };

    return {
      ...animal,
      imageUrl: sanitizedUrl,
      angles,
      images: gallery
    };
  });

  // Sync cleansed animals back to localStorage if in browser
  if (typeof window !== 'undefined') {
    localStorage.setItem('rh_animals_db', JSON.stringify(initialAnimals));
  }

  return {
    animals: initialAnimals,
    selectedAnimal: null,
    searchQuery: '',
    selectedType: 'All', // 'All' | 'Cow' | 'Buffalo' | 'Bull' | 'Calf'
    selectedBreed: 'All', // 'All' | 'Sahiwal' | 'Nili Ravi' | 'Cholistani' | 'Red Sindhi' | etc.
    selectedAvailability: 'All', // 'All' | 'Available' | 'Reserved' | 'Sold'
    selectedGender: 'All',
    maxPrice: 800000,
    minPrice: 0,
    minAge: 0,
    maxAge: 15,
    ageRange: 'All', // 'All' | 'young' (0-2) | 'prime' (2.5-5) | 'mature' (5.5+)
    minMilkProduction: 0,
    sortBy: 'default', // 'price_asc' | 'price_desc' | 'age_asc' | 'age_desc' | 'milk_desc' | 'newest'
    isLoading: false,

    // Select an animal for details view
    selectAnimal: (animalOrId) => {
      if (typeof animalOrId === 'string') {
        const found = get().animals.find(a => a.id === animalOrId);
        set({ selectedAnimal: found || null });
      } else {
        set({ selectedAnimal: animalOrId });
      }
    },

    // Search and filter actions
    setSearchQuery: (query) => set({ searchQuery: query }),
    setSelectedType: (type) => set({ selectedType: type }),
    setSelectedBreed: (breed) => set({ selectedBreed: breed }),
    setSelectedAvailability: (availability) => set({ selectedAvailability: availability }),
    setSelectedGender: (gender) => set({ selectedGender: gender }),
    setMaxPrice: (price) => set({ maxPrice: price }),
    setMinPrice: (price) => set({ minPrice: price }),
    setMinAge: (age) => set({ minAge: age }),
    setMaxAge: (age) => set({ maxAge: age }),
    setAgeRange: (range) => {
      if (range === 'young') {
        set({ ageRange: range, minAge: 0, maxAge: 2.5 });
      } else if (range === 'prime') {
        set({ ageRange: range, minAge: 2.5, maxAge: 5.5 });
      } else if (range === 'mature') {
        set({ ageRange: range, minAge: 5.5, maxAge: 15 });
      } else {
        set({ ageRange: 'All', minAge: 0, maxAge: 15 });
      }
    },
    setMinMilkProduction: (milk) => set({ minMilkProduction: milk }),
    setSortBy: (sort) => set({ sortBy: sort }),

    resetFilters: () => set({
      searchQuery: '',
      selectedType: 'All',
      selectedBreed: 'All',
      selectedAvailability: 'All',
      selectedGender: 'All',
      maxPrice: 800000,
      minPrice: 0,
      minAge: 0,
      maxAge: 15,
      ageRange: 'All',
      minMilkProduction: 0,
      sortBy: 'default'
    }),

    // Computed filtered animals list
    getFilteredAnimals: () => {
      const {
        animals,
        searchQuery,
        selectedType,
        selectedBreed,
        selectedAvailability,
        selectedGender,
        maxPrice,
        minPrice,
        minAge,
        maxAge,
        minMilkProduction,
        sortBy
      } = get();

      let result = animals.filter(animal => {
        // Text search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = animal.name.toLowerCase().includes(q);
          const matchBreed = animal.breed.toLowerCase().includes(q);
          const matchType = animal.type.toLowerCase().includes(q);
          const matchLocation = animal.location.toLowerCase().includes(q);
          const matchId = animal.id.toLowerCase().includes(q);
          if (!matchName && !matchBreed && !matchType && !matchLocation && !matchId) {
            return false;
          }
        }

        // Type filter
        if (selectedType !== 'All' && animal.type !== selectedType) {
          return false;
        }

        // Breed filter
        if (selectedBreed !== 'All' && animal.breed !== selectedBreed) {
          return false;
        }

        // Availability filter
        if (selectedAvailability !== 'All' && animal.availability !== selectedAvailability) {
          return false;
        }

        // Gender filter
        if (selectedGender !== 'All' && animal.gender !== selectedGender) {
          return false;
        }

        // Price point filter
        if (animal.price < minPrice || animal.price > maxPrice) {
          return false;
        }

        // Age range filter
        const animalAge = Number(animal.age) || 0;
        if (animalAge < minAge || animalAge > maxAge) {
          return false;
        }

        // Milk production filter
        if (animal.milkProductionPerDay < minMilkProduction) {
          return false;
        }

        return true;
      });

      // Sorting
      if (sortBy === 'price_asc') {
        result.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price_desc') {
        result.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'age_asc') {
        result.sort((a, b) => (Number(a.age) || 0) - (Number(b.age) || 0));
      } else if (sortBy === 'age_desc') {
        result.sort((a, b) => (Number(b.age) || 0) - (Number(a.age) || 0));
      } else if (sortBy === 'milk_desc') {
        result.sort((a, b) => b.milkProductionPerDay - a.milkProductionPerDay);
      } else if (sortBy === 'newest') {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      return result;
    },

    // Admin CRUD Operations
    addAnimal: (newAnimal) => {
      const current = get().animals;
      const id = newAnimal.id || `RH-AN-${100 + current.length + 1}`;
      const mainPhoto = newAnimal.angles?.body || newAnimal.angles?.face || newAnimal.imageUrl || getSanitizedCattlePhoto(newAnimal);
      const gallery = newAnimal.images && newAnimal.images.length > 0
        ? newAnimal.images
        : getAnimalInspectionGallery({ ...newAnimal, imageUrl: mainPhoto });

      const fullAnimal = {
        ...newAnimal,
        id,
        imageUrl: mainPhoto,
        angles: newAnimal.angles || {
          face: gallery.find(g => g.key === 'face')?.url || '/raja-haqnawaz-dairy-farm/assets/cattle/cow_face.jpg',
          body: mainPhoto,
          udder: gallery.find(g => g.key === 'udder')?.url || '/raja-haqnawaz-dairy-farm/assets/cattle/cow_udder.jpg',
          rear: gallery.find(g => g.key === 'rear')?.url || '/raja-haqnawaz-dairy-farm/assets/cattle/cow_rear.jpg',
          legs: gallery.find(g => g.key === 'legs')?.url || '/raja-haqnawaz-dairy-farm/assets/cattle/cow_legs.jpg'
        },
        images: gallery,
        availability: newAnimal.availability || 'Available',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const updated = [fullAnimal, ...current];
      if (typeof window !== 'undefined') {
        localStorage.setItem('rh_animals_db', JSON.stringify(updated));
      }
      set({ animals: updated });
      return fullAnimal;
    },

    updateAnimal: (id, updates) => {
      const current = get().animals;
      const updated = current.map(animal => {
        if (animal.id === id) {
          const merged = { ...animal, ...updates };
          const mainPhoto = merged.angles?.body || merged.angles?.face || merged.imageUrl || getSanitizedCattlePhoto(merged);
          const gallery = merged.images && merged.images.length > 0 
            ? merged.images 
            : getAnimalInspectionGallery({ ...merged, imageUrl: mainPhoto });

          return {
            ...merged,
            imageUrl: mainPhoto,
            images: gallery,
            updatedAt: new Date().toISOString()
          };
        }
        return animal;
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('rh_animals_db', JSON.stringify(updated));
      }
      set({
        animals: updated,
        selectedAnimal: get().selectedAnimal?.id === id ? { ...get().selectedAnimal, ...updates } : get().selectedAnimal
      });
    },

    deleteAnimal: (id) => {
      const current = get().animals;
      const updated = current.filter(a => a.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('rh_animals_db', JSON.stringify(updated));
      }
      set({ animals: updated });
    },

    // Transactional status update (e.g., Sold on checkout)
    markAsSold: (id) => {
      get().updateAnimal(id, { availability: 'Sold' });
    },

    resetToSeedData: () => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('rh_animals_db', JSON.stringify(SEED_ANIMALS));
      }
      set({ animals: SEED_ANIMALS });
    }
  };
});
