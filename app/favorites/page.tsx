'use client';

import Card from '@/components/Card/Card';
import { useFavoritesStore } from '@/stores/FavoritesStore';
import css from '@/app/favorites/favorites.module.css';
export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);
  return (
    <main>
      {favorites.length === 0 ? (
        <p className={css.nofavorites}>No favorites yet</p>
      ) : (
        <div>
          {favorites.map((teacher) => (
            <Card key={teacher.id} teacher={teacher} />
          ))}
        </div>
      )}
    </main>
  );
}
