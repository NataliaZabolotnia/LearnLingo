import css from '@/components/Hero/Hero.module.css';
import Image from 'next/image';
export default function Hero() {
  return (
    <div className={css.wrapper}>
      <div className={css.hero}>
        <div className={css.box}>
          <h1 className={css.title}>
            Unlock your potential with the best{' '}
            <span className={css.span}>language</span> tutors
          </h1>
          <p className={css.text}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <button type="button" className={css.button}>
            Get started
          </button>
        </div>
        <div className={css.picture}>
          <div className={css.faceWrapper}>
            <Image
              src="/face.png"
              alt="face"
              // width={339}
              // height={339}
              fill
              sizes="339px"
              className={css.face}
            ></Image>
          </div>
          <Image
            src="/iMac.jpg"
            alt="macbook"
            width={360}
            height={176}
            className={css.macbook}
          ></Image>
        </div>
      </div>
      <div className={css.info}>
        <div className={css.boxInfo}>
          <ul className={css.ul}>
            <li className={css.item}>
              32000+<span className={css.descr}>Experienced tutors</span>
            </li>
            <li className={css.item}>
              300000+<span className={css.descr}>5-star tutor reviews</span>
            </li>
            <li className={css.item}>
              120+<span className={css.descr}>Subjects taught</span>
            </li>
            <li className={css.item}>
              200+<span className={css.descr}>Tutor nationalities</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
