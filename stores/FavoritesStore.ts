'use client';

import { create } from 'zustand';
import { ref, get as firebaseGet, set as firebaseSet } from 'firebase/database';
import { database } from '@/firebase';
import { auth } from '@/firebase';
import { Teacher } from '@/types/teacher';

type FavoritesState = {
  favorites: Teacher[];
  loading: boolean;
  loadFavorites: () => Promise<void>;
  addFavorite: (teacher: Teacher) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  loading: false,

  loadFavorites: async () => {
    const user = auth.currentUser;
    if (!user) return;

    set({ loading: true });

    const snapshot = await firebaseGet(
      ref(database, `users/${user.uid}/favorites`)
    );

    if (snapshot.exists()) {
      const data = snapshot.val();
      const favoritesArray = Object.values(data);
      set({ favorites: favoritesArray as Teacher[], loading: false });
    } else {
      set({ favorites: [], loading: false });
    }
  },

  addFavorite: async (teacher) => {
    const user = auth.currentUser;
    if (!user) return;

    await firebaseSet(
      ref(database, `users/${user.uid}/favorites/${teacher.id}`),
      teacher
    );

    set({ favorites: [...get().favorites, teacher] });
  },

  removeFavorite: async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    await firebaseSet(ref(database, `users/${user.uid}/favorites/${id}`), null);

    set({
      favorites: get().favorites.filter((t) => t.id !== id),
    });
  },

  isFavorite: (id) => {
    return get().favorites.some((t) => t.id === id);
  },
}));
