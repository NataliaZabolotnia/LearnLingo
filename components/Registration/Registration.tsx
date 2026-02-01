// 'use client';

// import css from '@/components/Registration/Registration.module.css';
// import Modal from '../Modal/Modal';
// import * as Yup from 'yup';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { registerUser, loginUser } from '@/auth';

// const schema = Yup.object({
//   username: Yup.string().required('Required'),
//   email: Yup.string().email('Invalid email').required('Required'),
//   password: Yup.string().min(6, 'Min 6 characters').required('Required'),
// }).required();

// type FormValues = {
//   username: string;
//   email: string;
//   password: string;
// };

// export default function Registration({ onClose }: { onClose: () => void }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       username: '',
//       email: '',
//       password: '',
//     },
//   });

//   const onSubmit = async (data: FormValues) => {
//     try {
//       await registerUser(data.username, data.email, data.password);
//       console.log('Користувач зареєстрований!');
//       onClose();
//     } catch (error: any) {
//       console.error('Помилка!', error.message);
//     }
//   };

//   return (
//     <Modal onClose={onClose}>
//       <svg className={css.icon} width="32" height="32" onClick={onClose}>
//         <use href="/icon.svg#icon-close"></use>
//       </svg>
//       <h1 className={css.title}>Registration</h1>
//       <p className={css.descr}>
//         Thank you for your interest in our platform! In order to register, we
//         need some information. Please provide us with the following information
//       </p>

//       <form
//         className={css.form}
//         autoComplete="off"
//         noValidate
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <input
//           className={css.input}
//           placeholder="username"
//           {...register('username')}
//         />
//         {errors.username && (
//           <p className={css.error}>{errors.username.message}</p>
//         )}
//         <input
//           className={css.input}
//           type="email"
//           placeholder="email"
//           {...register('email')}
//         />
//         {errors.email && <p className={css.error}>{errors.email.message}</p>}
//         <div className={css.passworField}>
//           <input
//             className={css.input}
//             type="password"
//             placeholder="password"
//             {...register('password')}
//           />
//           <svg className={css.eye} height="20" width="20">
//             <use href="/icon.svg#icon-eye"></use>
//           </svg>
//         </div>
//         {errors.password && (
//           <p className={css.error}>{errors.password.message}</p>
//         )}
//         <button type="submit" className={css.btn}>
//           Sign Up
//         </button>
//       </form>
//     </Modal>
//     // </section>
//   );
// }
