'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { registerUser, loginUser } from '@/auth';
import Modal from '../Modal/Modal';
import css from '@/components/AuthModal/AuthModal.module.css';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

type AuthModalProps = {
  mode: 'login' | 'register';
  onClose: () => void;
};

type LoginFormValues = {
  email: string;
  password: string;
};

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'At least 6 characters').required('Required'),
});

export const registerSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'At least 6 characters').required('Required'),
});

export default function AuthModal({ mode, onClose }: AuthModalProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(mode === 'register' ? registerSchema : loginSchema),
    shouldUnregister: true,
  });

  const onSubmit = async (data: any) => {
    try {
      setServerError(null);
      if (mode === 'register') {
        await registerUser(data.name, data.email, data.password);
        console.log('Користувач зареєстрований!');
        toast.success(`${data.email},registration successful 🎉`);
      } else {
        await loginUser(data.email, data.password);
        console.log('Користувач увійшов!');
        toast.success(`${data.email},welcome back 👋 `);
      }
      onClose();
    } catch (error: any) {
      console.error('Помилка:', error.message);
      toast.error(error.message || 'Something went wrong');
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
      <form
        className={css.form}
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        {mode === 'register' && (
          <div className={css.field}>
            <input
              className={css.input}
              type="text"
              placeholder="Name"
              autoComplete="username"
              {...register('name')}
            />
            {errors.name && (
              <p className={css.error}>
                {String(errors.name.message) || '\u00A0'}
              </p>
            )}
          </div>
        )}
        <div className={css.field}>
          <input
            className={css.input}
            type="email"
            placeholder="Email"
            {...register('email')}
          />
          {errors.email && (
            <p className={css.error}>
              {String(errors.email.message) || '\u00A0'}
            </p>
          )}
        </div>
        <div className={css.passworField}>
          <input
            className={css.input}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            autoComplete="current-password"
            {...register('password')}
          />
          <button type="button" onClick={togglePassword}>
            <svg className={css.eye} height="20" width="20">
              <use href="/icon.svg#icon-eye"></use>
            </svg>
          </button>

          {errors.password && (
            <p className={css.error}>
              {String(errors.password.message) || '\u00A0'}
            </p>
          )}
        </div>

        <button className={css.btn} type="submit">
          {mode === 'register' ? 'Register' : 'Login'}
        </button>
      </form>
    </Modal>
  );
}
