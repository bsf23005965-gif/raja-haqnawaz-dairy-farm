import React from 'react';
import { useAnimalStore } from '../../stores/animalStore.js';
import { useFavoriteStore } from '../../stores/favoriteStore.js';
import { Heart, Trash2, ArrowRight, ShoppingBag, Milk } from 'lucide-react';

export default function FavoritesScreen({ onNavigate }) {
  const { animals, selectAnimal } = useAnimalStore();
  const { favoriteIds, toggleFavorite, clearFavorites } = useFavoriteStore();

  const favoriteAnimals = animals.filter(a => favoriteIds.includes(a.id));

  return (
    <div className="space-y-5 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase font-['Outfit']">
            Saved Livestock
          </h1>
          <p className="text-xs text-neutral-400">
            {favoriteAnimals.length} cattle bookmarked for consideration
          </p>
        </div>

        {favoriteAnimals.length > 0 && (
          <button
            onClick={clearFavorites}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-rose-400 text-xs font-semibold"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {favoriteAnimals.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-3">
          <div className="w-12 h-12 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto text-xl">
            ❤️
          </div>
          <h2 className="text-sm font-bold text-white">No Favorite Animals Yet</h2>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Browse our marketplace and tap the heart icon on any cow, buffalo, or bull to save them here for quick comparison.
          </p>
          <button
            onClick={() => onNavigate('marketplace')}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
          >
            Browse Marketplace
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {favoriteAnimals.map((animal) => {
            const isSold = animal.availability === 'Sold';

            return (
              <div
                key={animal.id}
                className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex gap-4 items-center justify-between hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-800 shrink-0">
                    <img
                      src={animal.imageUrl}
                      alt={animal.name}
                      className="w-full h-full object-cover"
                    />
                    {isSold && (
                      <div className="absolute inset-0 bg-rose-950/80 flex items-center justify-center">
                        <span className="text-[10px] font-black text-white px-1.5 py-0.5 rounded bg-rose-600">
                          SOLD
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white line-clamp-1">
                      {animal.name}
                    </h3>
                    <p className="text-xs text-emerald-400 font-medium">
                      {animal.breed} • {animal.age} Yrs
                    </p>
                    <p className="text-xs font-black text-amber-400">
                      Rs. {animal.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => {
                      selectAnimal(animal);
                      onNavigate('animal_details');
                    }}
                    className="py-1.5 px-3 rounded-xl bg-neutral-800 hover:bg-emerald-600 hover:text-white text-neutral-200 text-xs font-semibold transition-colors"
                  >
                    View
                  </button>

                  <button
                    onClick={() => toggleFavorite(animal.id)}
                    className="p-1.5 rounded-xl bg-neutral-800 hover:bg-rose-950/50 text-neutral-400 hover:text-rose-400 transition-colors text-center flex items-center justify-center"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
