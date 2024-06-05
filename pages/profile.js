import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
// import { getError } from '../utils/error';

export default function ProfileScreen() {
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue('name', session.user.name);
    setValue('email', session.user.email);
  }, [session.user, setValue]);

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.put('/api/auth/update', {
        name,
        email,
        password,
      });

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      toast.success('Profile updated successfully..');

      if (result.error) {
        // toast.error(result.error);
      }
    } catch (err) {
    //   toast.error(getError(err));
    }
  };

  return (
    <Layout title="Profile">
    <div className='min-h-screen'>
    
    <form
        onSubmit={handleSubmit(submitHandler)}
        className="mx-auto my-16 p-5 h-full max-w-sm border-[1px] border-orange-100"
      >
        <h2 className="mb-8 text-xl font-semibold text-center">Update Profile</h2>
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            autoFocus
            className="w-full p-1 rounded border-2 border-orange-100 outline-orange-300 focus:bg-[#efb3440b]"
            {...register('name', {
              required: 'Please enter name',
            })}
          />
          {errors.name && (
            <div className="text-orange-800">{errors.name.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className="w-full p-1 rounded border-2 border-orange-100 outline-orange-300 focus:bg-[#efb3440b]"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$/i,
                message: 'please enter a valid email',
              },
            })}
          />
          {errors.email && (
            <div className="text-orange-800">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="w-full p-1 rounded border-2 border-orange-100 outline-orange-300 focus:bg-[#efb3440b]"
            {...register('password', {
              minLength: {
                value: 8,
                message: 'password is more than 7 characters',
              },
            })}
          />
          {errors.password && (
            <div className="text-orange-800">{errors.password.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full p-1 rounded border-2 border-orange-100 outline-orange-300 focus:bg-[#efb3440b]"
            {...register('confirmPassword', {
              validate: (value) => value === getValues('password'),
              minLength: {
                value: 8,
                message: 'password is more than 7 characters',
              },
            })}
          />
          {errors.confirmPassword && (
            <div className="text-orange-800">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-orange-800">password does not match!.</div>
            )}
        </div>

        <div className="mt-8">
          <button className="w-full bg-orange-400 text-white px-2 py-1 rounded hover:bg-orange-500 outline-none">
            Update
          </button>
        </div>
      </form>
    </div>
    </Layout>
  );
}

ProfileScreen.auth = true;
