import Card from '@/components/Card/Card';
import teachers from '@/data/teachers.json';
import css from '@/app/teachers/teachers.module.css';

export default function TeachersPage() {
  return (
    <div className={css.teacherPage}>
      {teachers.map((teacher, index) => (
        <Card key={index} teacher={teacher} />
      ))}
      <button type="button" className={css.loadMore}>
        Load more
      </button>
    </div>
  );
}
