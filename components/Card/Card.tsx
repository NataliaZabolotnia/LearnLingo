'use client';

import css from '@/components/Card/Card.module.css';
import type { Teacher } from '@/types/teacher';
import { useState, useEffect } from 'react';
import BookModal from '../BookModal/BookModal';
import { useFavoritesStore } from '@/stores/FavoritesStore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase';
import toast from 'react-hot-toast';

type CardProps = {
  teacher: Teacher;
};

export default function Card({ teacher }: CardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  // const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const isAuth = !!user;

  // favorite
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite);
  // const [favorite, setFavorite] = useState(isFavorite(teacher.id));

  const favorite = useFavoritesStore((state) => state.isFavorite(teacher.id));

  const toggleFavorite = () => {
    if (!isAuth) {
      toast.error('This feature is available only for authorized users');
      return;
    }
    if (favorite) {
      removeFavorite(teacher.id);
    } else {
      addFavorite(teacher);
    }
  };

  return (
    <section className={css.container}>
      <div className={css.box}>
        <div className={css.circle}>
          <div className={css.photo}>
            <img
              src={teacher.avatar_url}
              width="96"
              height="96"
              alt="photo"
              className={css.avatarImg}
            ></img>
            <svg className={css.green} width="12" height="12">
              <use href="/icon.svg#icon-Group"></use>
            </svg>
          </div>
        </div>
        <div className={css.right}>
          <div className={css.information}>
            <div className={css.wrapper}>
              <p className={css.specialty}>Languages</p>
              <h1 className={css.title}>
                {teacher.name} {teacher.surname}
              </h1>
            </div>
            <div className={css.wrap}>
              <ul className={css.list}>
                <li className={css.item}>
                  <svg className={css.icon} width="16" height="16">
                    <use href="/icon.svg#icon-book"></use>
                  </svg>
                  Lessons online
                </li>
                <svg className="line" width="1" height="16">
                  <use href="/Vector.svg"></use>
                </svg>
                <li className={css.item}>
                  Lessons done: {teacher.lessons_done}
                </li>
                <svg className="line" width="1" height="16">
                  <use href="/Vector.svg"></use>
                </svg>
                <li className={css.item}>
                  <svg className={css.icon} width="16" height="16">
                    <use href="/star.svg"></use>
                  </svg>
                  Rating: {teacher.rating}
                </li>
                <svg className="line" width="1" height="16">
                  <use href="/Vector.svg"></use>
                </svg>
                <li className={css.item}>
                  Price / 1 hour:
                  <span className={css.price}> {teacher.price_per_hour}$</span>
                </li>
              </ul>
              {/* favorite */}
              <button onClick={toggleFavorite}>
                <svg
                  className={favorite ? css.heartActive : css.heart}
                  width="26"
                  height="26"
                >
                  <use href="/icon.svg#icon-heart"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className={css.about}>
            <li className={css.item}>
              <span className={css.span}> Speaks:</span>
              <span className={css.lanquages}>
                {teacher.languages.join(',')}
              </span>
            </li>
            <li className={css.item}>
              <span className={css.span}> Lesson Info:</span>{' '}
              {teacher.lesson_info}
            </li>
            <li className={css.item}>
              <span className={css.span}> Conditions:</span>{' '}
              {teacher.conditions.join(',')}
            </li>
          </ul>
          <button type="button" className={css.read} onClick={toggle}>
            {isOpen ? 'Read less' : 'Read more'}
          </button>

          {isOpen && (
            <div className={css.reviews}>
              <ul className={css.reviewsList}>
                {teacher.reviews.map((review, index) => (
                  <li key={index} className={css.reviewItem}>
                    <div className={css.reviewHeader}>
                      <img
                        src="/image.png"
                        alt={review.reviewer_name}
                        width="44"
                        height="44"
                        className={css.reviewPhoto}
                      />
                      <div className={css.name}>
                        <p className={css.reviewer}>{review.reviewer_name}</p>
                        <p className={css.rating}>
                          ⭐ {review.reviewer_rating.toFixed(1)}
                        </p>
                      </div>
                    </div>

                    <p className={css.comment}>{review.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ul className={css.buttonList}>
            {teacher.levels.map((level, index) => (
              <li key={index}>
                <button type="button" className={css.level}>
                  {level}
                </button>
              </li>
            ))}
          </ul>
          {isOpen && (
            <button
              type="button"
              className={css.book}
              onClick={() => {
                setIsBookOpen(true);
              }}
            >
              Book trial lesson
            </button>
          )}
          {isBookOpen && (
            <BookModal
              teacher={teacher}
              onClose={() => {
                setIsBookOpen(false);
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
