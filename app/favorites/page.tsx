'use client';

import Card from '@/components/Card/Card';
import { useFavoritesStore } from '@/stores/FavoritesStore';
import css from '@/app/favorites/favorites.module.css';
// import { useAuth } from '@/stores/FavoritesStore';
import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase';
import { toast, Toaster } from 'react-hot-toast';
import AuthModal from '@/components/AuthModal/AuthModal';

export default function FavoritesPage() {
  const [user, setUser] = useState<User | null>(null);
  const favorites = useFavoritesStore((state) => state.favorites);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  // Редірект якщо не авторизований
  useEffect(() => {
    if (!loading && !user) {
      toast.error('Log in to see your favorites');
      setMode('login');
      setIsLoginOpen(true);
    } else {
      setIsLoginOpen(false);
    }
  }, [user, loading]);

  if (loading) return <p className={css.loader}>Loading...</p>;

  return (
    <main className={css.teacherPage}>
      <Toaster />
      {isLoginOpen && (
        <AuthModal mode={mode} onClose={() => setIsLoginOpen(false)} />
      )}

      {user && (
        <>
          {favorites.length === 0 ? (
            <p className={css.nofavorites}>No favorites yet</p>
          ) : (
            <div className={css.container}>
              {favorites.map((teacher) => (
                <Card key={teacher.id} teacher={teacher} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
