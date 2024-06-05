import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-toastify';

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const remmoveItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error('sorry product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    toast.success('product updated in the cart');
  };

  return (
    <Layout title="shopping cart">
      <div className="min-h-screen flex">
        <h1 className="mb-4 text-xl">Cart</h1>
        {cartItems.length === 0 ? (
          <div className="flex w-full justify-center items-center">
            <div>
              Cart is empty{' '}
              <Link href="/">
                <span className=" p-1 text-orange-700 border-[1px] border-orange-500">
                  Go Back
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.slug} className="border-b">
                      <td>
                        <Link href={`/product/${item.slug}`}>
                          <div className="flex items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={200}
                              height={50}
                            ></Image>
                            &nbsp;
                            {item.name}
                          </div>
                        </Link>
                      </td>
                      <td className="p-5 text-right opacity-70">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                          className="text-orange-700 bg-orange-50 p-[2px] font-semibold focus:outline-orange-300"
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-5 text-right opacity-70">
                        Rs:{item.price}
                      </td>
                      <td className="p-5 text-center">
                        <button
                          className="text-orange-600 text-lg hover:text-red-900"
                          onClick={() => remmoveItemHandler(item)}
                        >
                          <AiOutlineCloseCircle />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-[1px] border-orange-100 p-5 flex flex-col items-center">
              <ul className="flex flex-col items-center">
                <li>
                  <div className="pb-3 text-lg">
                    Sub Total:({cartItems.reduce((a, c) => a + c.quantity, 0)}){' '}
                    :Rs{cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => router.push('login?redirect=/shipping')}
                    type="button"
                    className="rounded bg-orange-400 text-white px-2 py-1 w-full"
                  >
                    CheckOut
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
