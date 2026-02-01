import css from '@/components/BookModal/BookModal.module.css';
import Modal from '../Modal/Modal';
import type { Teacher } from '@/types/teacher';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

type BookProps = {
  teacher: Teacher;
  onClose: () => void;
};

const schema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email().required('Email is required'),
  phoneNumber: Yup.string().required('Phone is required').min(10, 'Too short'),
  reason: Yup.string().min(1, 'Select at least one option'),
});

export default function BookModal({ teacher, onClose }: BookProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  type FormValues = {
    name: string;
    email: string;
    phoneNumber: string;
    reason?: string;
  };

  const onSubmit = (data: FormValues) => {
    console.log('Booking data:', data);
    onClose();
  };
  const reasons = [
    'Career and business',
    'Lesson for kids',
    'Living abroad',
    'Exams and coursework',
    'Culture, travel or hobby',
  ];

  return (
    <Modal onClose={onClose}>
      <svg className={css.icon} width="32" height="32" onClick={onClose}>
        <use href="/icon.svg#icon-close"></use>
      </svg>
      <h1 className={css.title}>Book trial lesson</h1>
      <p className={css.descr}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>
      <div className={css.box}>
        <img
          src={teacher.avatar_url}
          alt="teacher"
          height="44"
          width="44"
          className={css.img}
        ></img>
        <div>
          <p className={css.yourTeacher}>Your teacher</p>
          <h3 className={css.name}>{teacher.name}</h3>
        </div>
      </div>
      <h2 className={css.subTitle}>
        What is your main reason for learning English?
      </h2>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.checkbox}>
          {reasons.map((reason) => (
            <label key={reason} className={css.checkboxLabel}>
              <input
                type="radio"
                value={reason}
                {...register('reason')}
                className={css.hiddenCheckbox}
              />
              <span className={css.radioIcon}>
                <svg className={css.radioOff} width="24" height="24">
                  <use href="/radioOff.svg"></use>
                </svg>
                <svg className={css.radioOn} width="24" height="24">
                  <use href="/radioButton.svg"></use>
                </svg>
              </span>
              <span className={css.labelText}> {reason}</span>
            </label>
          ))}
          <p className={css.error}>{errors.reason?.message || '\u00A0'} </p>
        </div>
        <input
          type="text"
          className={css.input}
          placeholder="Full name"
          {...register('name')}
        />
        <p className={css.error}>{errors.name?.message || '\u00A0'}</p>
        <input
          type="email"
          className={css.input}
          placeholder="Email"
          {...register('email')}
        />
        <p className={css.error}>{errors.email?.message || '\u00A0'}</p>
        <input
          type="tel"
          className={css.input}
          placeholder="Phone number"
          {...register('phoneNumber')}
        />
        <p className={css.error}>{errors.phoneNumber?.message || '\u00A0'}</p>
        <button type="submit" className={css.btn}>
          Book
        </button>
      </form>
    </Modal>
  );
}
