import Header from '@/components/Header/Header';
import css from '@/app/page.module.css';
import Hero from '@/components/Hero/Hero';

export default function Home() {
  return (
    <section className={css.container}>
      {/* <Header /> */}
      <Hero />
    </section>
  );
}
