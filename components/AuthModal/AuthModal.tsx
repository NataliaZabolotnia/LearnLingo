'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { registerUser, loginUser } from '@/auth';
import Modal from '../Modal/Modal';
import css from '@/components/AuthModal/AuthModal.module.css';
import { useState } from 'react';

type AuthModalProps = {
  mode: 'login' | 'register';
  onClose: () => void;
};

const schema = Yup.object({
  name: Yup.string().when('$mode', {
    is: 'register',
    then: (s) => s.required('Required'),
    otherwise: (s) => s.notRequired(),
  }),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'At least 6 characters').required('Required'),
});

type FormValues = Yup.InferType<typeof schema>;

export default function AuthModal({ mode, onClose }: AuthModalProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema, { context: { mode } }),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setServerError(null);
      if (mode === 'register') {
        await registerUser(data.name!, data.email, data.password);
        console.log('Користувач зареєстрований!');
      } else {
        await loginUser(data.email, data.password);
        console.log('Користувач увійшов!');
      }
      onClose();
    } catch (error: any) {
      console.error('Помилка:', error.message);
      if (error.response?.data?.message) {
        setServerError(error.response.data.message);
      } else {
        setServerError(error.message || 'Error!');
      }
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);
  return (
    <Modal onClose={onClose}>
      <svg className={css.icon} width="32" height="32" onClick={onClose}>
        <use href="/icon.svg#icon-close"></use>
      </svg>
      <h1 className={css.title}>
        {mode === 'register' ? 'Registration' : 'Log In'}
      </h1>
      <p className={css.descr}>
        {mode === 'register'
          ? 'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information'
          : 'Welcome back! Please enter your credentials to access your account and continue your search for an teacher.'}
      </p>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        {mode === 'register' && (
          <>
            <input
              className={css.input}
              type="text"
              placeholder="name"
              {...register('name')}
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </>
        )}
        <input
          className={css.input}
          type="email"
          placeholder="Email"
          {...register('email')}
        />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
        <div className={css.passworField}>
          <input
            className={css.input}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            {...register('password')}
          />
          <button type="button" onClick={togglePassword}>
            <svg className={css.eye} height="20" width="20">
              <use href="/icon.svg#icon-eye"></use>
            </svg>
          </button>
        </div>
        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}
        {serverError && <p className={css.error}>{serverError}</p>}
        <button className={css.btn} type="submit">
          {mode === 'register' ? 'Register' : 'Login'}
        </button>
      </form>
    </Modal>
  );
}
