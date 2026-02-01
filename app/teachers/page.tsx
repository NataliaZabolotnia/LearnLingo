'use client';

import Card from '@/components/Card/Card';
import teachers from '@/data/teachers.json';
import css from '@/app/teachers/teachers.module.css';
import { useState } from 'react';

const ITEMS_PER_PAGE = 3;
export default function TeachersPage() {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const visibleTeachers = teachers.slice(0, visibleCount);
  const loadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <>
      <div className={css.option}>
        <p>Languages</p>
      </div>
      <div className={css.teacherPage}>
        {visibleTeachers.map((teacher, index) => (
          <Card key={index} teacher={teacher} />
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
