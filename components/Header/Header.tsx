'use client';

import Link from 'next/link';
import css from '@/components/Header/Header.module.css';
import { useState } from 'react';
// import Registration from '@/components/Registration/Registration';
import AuthModal from '@/components/AuthModal/AuthModal';
import { logoutUser } from '@/auth';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('register');

  return (
    <>
      {isOpen && <AuthModal mode={mode} onClose={() => setIsOpen(false)} />}
      <section className={css.container}>
        <div className={css.header}>
          <div className={css.ukraine}>
            <svg className={css.svg} width="28" height="28">
              <use href="/icon.svg#icon-ukraine"></use>
            </svg>
            <Link className={css.logo} href="/" aria-label="Home">
              LearnLingo
            </Link>
          </div>
          <div className={css.nav}>
            <Link className={css.navlink} href="/" aria-label="Home">
              Home
            </Link>
            <Link
              className={css.navlink}
              href="/teachers"
              aria-label="teachers"
            >
              Teachers
            </Link>
          </div>
          <div className={css.enter}>
            <div className={css.login}>
              <button
                type="button"
                onClick={() => {
                  logoutUser();
                  console.log('Користувач вийшов');
                }}
              >
                <svg className={css.svg} width="20" height="20">
                  <use href="/icon.svg#icon-login"></use>
                </svg>
              </button>
              <button
                className={css.loginLink}
                type="button"
                onClick={() => {
                  setIsOpen(true);
                  setMode('login');
                }}
              >
                Log in
              </button>
            </div>
            <button
              className={css.button}
              type="button"
              onClick={() => {
                setIsOpen(true);
                setMode('register');
              }}
            >
              Registration
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
