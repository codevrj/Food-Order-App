import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { Store } from '../utils/Store';

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); //12.25787 => 12.26

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(()=>{
    if(!paymentMethod) {
      router.push('/payment');
    }
  },[paymentMethod, router]);

  const [loading, setLoading] = useState(false);
  const placeOrderHandler = async () => {
    try{
      setLoading(true);
      const {data} = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({type: 'CART_CLEAR_ITEMS'});
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);

    }catch(err){
      setLoading(false);
      toast.error(getError(err));
    }
  }

  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">Place Order</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is Empty.. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="border-2 border-orange-100 p-5">
              <h2 className="mb-2 text-lg">Delivery Address</h2>
              <div>
                {shippingAddress.fullName}, {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.phoneNumber}
              </div>
              <div>
                <Link href="/shipping">
                  <span className="text-orange-400">Edit</span>
                </Link>
              </div>
              <div className="p-5">
                <h1 className="mb-2 text-lg">Payment Method</h1>
                <div>{paymentMethod}</div>
                <div>
                  <Link href="/payment">
                    <span className="text-orange-400">Edit</span>
                  </Link>
                </div>
              </div>
              <div className="overflow-x-auto p-5">
                <h2 className="mb-2 text-lg text-center">Order Items</h2>
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="px-5 text-left">Item</th>
                      <th className="p-5 text-right">Quantity</th>
                      <th className="p-5 text-right">Price</th>
                      <th className="p-5">Sub Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id} className="border-b">
                        <td>
                          <Link href={`/product/${item.slug}`}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                            &nbsp;
                            {item.name}
                          </Link>
                        </td>
                        <td className="p-5 text-right">{item.quantity}</td>
                        <td className="p-5 text-right">Rs:{item.price}</td>
                        <td className="p-5 text-right">
                          Rs:{item.quantity * item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className='text-orange-500'>
                  <Link href="/cart">Edit</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="p-5 border-2 border-orange-200">
              <h2 className="mb-2 text-lg text-center">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>Rs:{itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Tax</div>
                    <div>Rs:{taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Delivery</div>
                    <div>Rs:{shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div>Rs:{totalPrice}</div>
                  </div>
                </li>
                <li>
                  <button
                    disabled={loading}
                    onClick={placeOrderHandler}
                    className='w-full text-white bg-orange-500 py-1 rounded hover:bg-orange-600'
                  >
                    {loading ? 'Loading...' : 'place order'}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

PlaceOrderScreen.auth = true;
