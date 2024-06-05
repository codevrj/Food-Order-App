import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  FaFacebook,
  FaInstagram,
  FaSearch,
  FaShoppingCart,
  FaUserEdit,
  FaYoutube,
} from 'react-icons/fa';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { Store } from '../utils/Store';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import { signOut, useSession } from 'next-auth/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { AiOutlineDashboard, AiOutlineUnorderedList } from 'react-icons/ai';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setcartItemsCount] = useState(0);

  useEffect(() => {
    setcartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  const [query, setQuery] = useState('');

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <>
      <Head>
        <title>{title ? title + '- Restaurant' : 'Cafe|07'}</title>
        <meta name="description" content="Restaurant app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-[150vh] flex-col justify-between">
        <header className="flex justify-between items-center h-16 p-2 bg-orange-500 font-semibold shadow-md">
          <Link href="/">
            <div className="text-2xl font-bold">
              Cafe<span className="text-orange-50">|</span>07
            </div>
          </Link>

          <nav>
              <Link href="/">
                <div className="nav_item">Menu</div>
              </Link>

              <Link href="/about">
                <div className="nav_item">About</div>
              </Link>

              <Link href="/contact">
                <div className="nav_item">Contact</div>
              </Link>

            {/* ----------------------------------------- */}
            <form
              onSubmit={submitHandler}
              className="mx-auto  hidden w-full justify-center md:flex"
            >
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="rounded-lg rounded-tr-none rounded-br-none bg-[#fffffff6] p-2 text-sm focus:outline-none"
                placeholder="Search favourite"
              />
              <button
                className="rounded-lg rounded-tl-none rounded-bl-none bg-amber-200 p-2 text-sm dark:text-black"
                type="submit"
                id="button-addon2"
              >
                <FaSearch className="h-5 w-5"></FaSearch>
              </button>
            </form>
            {/* ------------------------------------ */}
            <div className="flex items-center pr-2 gap-5 text-xl text-white">
              <Link href="/cart">
                <FaShoppingCart />
                {cartItemsCount > 0 && (
                  <div className="absolute z-50 top-[0px]">
                    <span className="text-white ml-[6px] rounded-full border-[1px] border-orange-800 bg-orange-900 px-[5px] py-[1px] text-xs font-bold">
                      {cartItemsCount}
                    </span>
                  </div>
                )}
              </Link>
              {status === 'loading' ? (
                'Loading..'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="flex flex-col">
                    <div className=" text-orange-100 text-lg px-2 py-1 border-[1px] rounded-md">
                    {session.user.name}▾
                    </div>
                  </Menu.Button>
                  <Menu.Items className="absolute z-40 right-0 w-56 origin-top-right text-lg text-orange-700 bg-orange-50 shadow-lg">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        <FaUserEdit className="my-auto" />
                        &nbsp; Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        <AiOutlineUnorderedList className="my-auto" />
                        &nbsp; Order-history
                      </DropdownLink>
                    </Menu.Item>
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink
                          href="/admin/dashboard"
                          className="dropdown-link"
                        >
                          <AiOutlineDashboard className="my-auto" />
                          &nbsp; Admin Dashboard
                        </DropdownLink>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        <RiLogoutBoxLine className="my-auto" />
                        &nbsp; Log out
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login">
                  <div className="text-lg text-orange-500 bg-white rounded-md px-2 py-1 hover:bg-[#ffe2ca] duration-300">
                    Login
                  </div>
                </Link>
              )}
            </div>
          </nav>
        </header>

        <main className="container m-auto mt-4 px-4">{children}</main>

        <footer className="rounded flex flex-wrap justify-center mt-20 bg-orange-200 text-orange-700 opacity-60">
          <div className="flex flex-wrap justify-between w-full py-8 px-16 mt-5">
            <div className="flex flex-col mb-5">
              <h2 className="text-lg font-semibold mb-3">Go to Know Us</h2>
              <Link href={'/'}>
                <span className="hover:underline">View History</span>
              </Link>
              <Link href={'/about'}>
                <span className="hover:underline">About Us</span>
              </Link>
              <Link href={'/contact'}>
                <span className="hover:underline">Contact Us</span>
              </Link>
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-lg font-semibold mb-4">Follow us on</h2>
              <div className="flex justify-center gap-5 text-xl">
                <div>
                  <Link href={'https://www.facebook.com/'} target={'_blank'}>
                    <FaFacebook className="text-blue-600" />
                  </Link>
                </div>
                <div>
                  <Link href={'https://www.instagram.com/'} target={'_blank'}>
                    <FaInstagram className="text-red-400" />
                  </Link>
                </div>
                <div>
                  <Link href={'https://www.youtube.com/'} target={'_blank'}>
                    <FaYoutube className="text-red-600" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[1px] w-screen bg-white"></div>
          <div>All Rights Reserved 2023©</div>
        </footer>
      </div>
    </>
  );
}
