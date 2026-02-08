import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Teacher } from '@/types/teacher';

type FavoritesStore = {
  favorites: Teacher[];
  addFavorite: (teacher: Teacher) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (teacher) =>
        set((state) => ({
          favorites: [...state.favorites, teacher],
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((teacher) => teacher.id !== id),
        })),

      isFavorite: (id) => get().favorites.some((teacher) => teacher.id === id),
    }),
    {
      name: 'favorite-teachers',
    }
  )
);
