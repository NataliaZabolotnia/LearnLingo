'use client';

import Card from '@/components/Card/Card';
import css from '@/app/favorites/favorites.module.css';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase';
import { toast, Toaster } from 'react-hot-toast';
import AuthModal from '@/components/AuthModal/AuthModal';
import { useFavoritesStore } from '@/stores/FavoritesStore';
import { Teacher } from '@/types/teacher';

export default function FavoritesPage() {
  const { favorites, loadFavorites, loading } = useFavoritesStore();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        loadFavorites();
      } else {
        toast.error('Log in to see your favorites');
        setMode('login');
        setIsLoginOpen(true);
      }
    });

    return () => unsubscribe();
  }, [loadFavorites]);

  if (loading) return <p className={css.loader}>Loading...</p>;

  return (
    <main className={css.teacherPage}>
      <Toaster />
      {isLoginOpen && (
        <AuthModal mode={mode} onClose={() => setIsLoginOpen(false)} />
      )}

      {favorites.length === 0 ? (
        <p className={css.nofavorites}>No favorites yet</p>
      ) : (
        <div className={css.container}>
          {favorites.map((teacher) => (
            <Card key={teacher.id} teacher={teacher} />
          ))}
        </div>
      )}
    </main>
  );
}
