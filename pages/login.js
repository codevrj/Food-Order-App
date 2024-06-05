import Link from 'next/link';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Image from 'next/image';

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
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
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
    <Layout title="Login">
      <div className="bg_login min-h-screen flex flex-col justify-center items-center">
        {/* <div> */}
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="bg-black bg-opacity-30 m-auto max-w-screen-md md:mx-2 rounded border-[1px] border-orange-100 p-8"
        >
          <h1 className="mb-4 text-xl text-center font-semibold">LOGIN</h1>

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
              autoFocus
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
              {...register('password', {
                required: 'please enter password !..',
                minLength: {
                  value: 8,
                  message: 'password should be more than 7 characters !..',
                },
              })}
              className="w-full p-1 rounded-sm border-2 border-orange-100 outline-orange-300 focus:bg-[#efb3440b]"
              id="password"
            ></input>
            {errors.password && (
              <div className="ml-[5px] text-xs text-red-600">
                {errors.password.message}
              </div>
            )}
          </div>
          <div className="mmb-4">
            <button
              type="submit"
              className="mt-2 w-full font-bold px-4 py-1 rounded bg-orange-500 text-white hover:bg-orange-600 duration-200"
            >
              Log in
            </button>
          </div>
          <div className="m-4 text-sm">
            Don&apos;t have an account? &nbsp;
            <Link href={`/register?redirect=${redirect || '/'}`}>
              <span className="text-white hover:text-orange-600">
                Register here
              </span>
            </Link>
          </div>
        </form>
      </div>
      {/* </div> */}
    </Layout>
  );
}
