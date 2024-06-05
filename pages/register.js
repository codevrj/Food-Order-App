import Link from 'next/link';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post('/api/auth/signup',{
        name,
        email,
        password,
      });
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Create Account">
      <div className="min-h-screen flex flex-col justify-center items-center">
        {/* <div> */}
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="m-auto max-w-screen-md md:mx-2 rounded border-[1px] border-orange-100 p-8"
        >
          <h1 className="mb-4 text-xl font-semibold text-center">Create Account</h1>

          <div className="mb-4">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              {...register('name', {
                required: 'please enter name!..',
              })}
              className="w-full p-1 rounded border-2 border-orange-100 outline-orange-300 focus:bg-[#efb3440b]"
              autoFocus
            ></input>
            {errors.name && (
              <div className="ml-[5px] text-xs text-red-600">
                {errors.name.message}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              {...register('email', {
                required: 'please enter a email !..',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: 'please enter a valid email !..',
                },
              })}
              className="w-full p-1 rounded border-2 border-orange-100 outline-orange-300 focus:bg-[#efb3440b]"
              id="email"
            ></input>
            {errors.email && (
              <div className="ml-[5px] text-xs text-red-600">
                {errors.email.message}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: 'please enter password !..',
                minLength: {
                  value: 8,
                  message: 'password should be more than 7 characters !..',
                },
              })}
              className="w-full p-1 rounded-sm border-2 border-orange-100 outline-orange-300 focus:bg-[#efb3440b]"
            ></input>
            {errors.password && (
              <div className="ml-[5px] text-xs text-red-600">
                {errors.password.message}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                required: 'please enter confirm password !..',
                validate: (value) => value === getValues('password'),
                minLength: {
                  value: 8,
                  message:
                    'confirm password should be more than 7 characters !..',
                },
              })}
              className="w-full p-1 rounded-sm border-2 border-orange-100 outline-orange-300 focus:bg-[#efb3440b]"
            ></input>
            {errors.confirmPassword && (
              <div className="ml-[5px] text-xs text-red-600">
                {errors.confirmPassword.message}
              </div>
            )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === 'validate' && (
                <div className="text-orange-900">
                  password does not match..!
                </div>
              )}
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="mt-2 lg:w-[15] w-full font-bold px-4 py-1 rounded bg-orange-500 text-white hover:bg-orange-600 duration-200"
            >
              Sign up
            </button>
          </div>
          <div className="m-4 text-sm">
            Already have an account? &nbsp;
            {/* <Link href={`/register?redirect=${redirect || '/login'}`}> */}
            <Link href={'/login'}>
              <span className="text-orange-500 hover:text-orange-600">
                Log in here
              </span>
            </Link>
          </div>
        </form>
      </div>
      {/* </div> */}
    </Layout>
  );
}
