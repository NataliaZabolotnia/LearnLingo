'use client';

import Card from '@/components/Card/Card';
// import teachers from '@/data/teachers.json';
import css from '@/app/teachers/teachers.module.css';
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '@/firebase';
import type { Teacher, TeacherFromDB } from '@/types/teacher';
// import { getDatabase, get } from 'firebase/database';

const ITEMS_PER_PAGE = 3;

export default function TeachersPage() {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const loadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  // db
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const teachersRef = ref(database, 'teachers');
    const unsubscribe = onValue(teachersRef, (snapshot) => {
      if (!snapshot.exists()) {
        setTeachers([]);
        return;
      }

      const data = snapshot.val();

      const teachersArray = Object.entries(data).map(
        ([id, teacher]: [string, any]) => ({
          id,
          ...teacher,
        })
      );

      setTeachers(teachersArray);
    });

    return () => unsubscribe();
  }, []);

  //filter
  const allLanquages = Array.from(
    new Set(teachers.flatMap((t) => t.languages))
  );
  const allLevels = Array.from(new Set(teachers.flatMap((t) => t.levels)));
  const allPrices = Array.from(
    new Set(teachers.map((t) => t.price_per_hour))
  ).sort((a, b) => a - b);
  // filter
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [price, setPrice] = useState('');

  //  ФІЛЬТРАЦІЯ
  const filteredTeachers = teachers.filter((t) => {
    const byLanguage = language ? t.languages.includes(language) : true;

    const byLevel = level ? t.levels.includes(level) : true;

    const byPrice = price ? t.price_per_hour === Number(price) : true;

    return byLanguage && byLevel && byPrice;
  });
  const visibleTeachers = filteredTeachers.slice(0, visibleCount);
  return (
    <>
      <div className={css.teacherPage}>
        <div className={css.filters}>
          {/* Language */}
          <div className={css.box}>
            <label htmlFor="language" className={css.label}>
              {' '}
              Languages
            </label>
            <select
              value={language}
              className={css.select}
              id="language"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="">Language</option>
              {allLanquages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          {/* Level */}
          <div className={css.box}>
            <label htmlFor="level" className={css.label}>
              {' '}
              Level of knowledge
            </label>
            <select
              id="level"
              value={level}
              className={css.select}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">Level</option>
              {allLevels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className={css.box}>
            <label htmlFor="price" className={css.label}>
              {' '}
              Price
            </label>
            <select
              id="price"
              value={price}
              className={css.select}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="">Price</option>
              {allPrices.map((p) => (
                <option key={p} value={p}>
                  {p}$
                </option>
              ))}
            </select>
          </div>
        </div>
        {visibleTeachers.map((teacher) => (
          <Card key={teacher.id} teacher={teacher} />
        ))}
        {visibleCount < teachers.length && (
          <button type="button" className={css.loadMore} onClick={loadMore}>
            Load more
          </button>
        )}
      </div>
    </>
  );
}
