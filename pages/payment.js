import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';


export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Payment method is required!.');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );
    router.push('/placeorder');
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping');
    }
    setSelectedPaymentMethod(paymentMethod || '');
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title="Payment method">
      <CheckoutWizard activeStep={2} />
      <form onSubmit={submitHandler} className="mx-auto max-w-screen-md">
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {['PayPal', 'Card payment'].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              id={payment}
              type="radio"
              className="p-2 outline-none focus:ring-0"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />
            <label className="p-2 hover:cursor-pointer" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push('/shipping')}
            type="button"
            className="rounded text-orange-500 bg-orange-50 px-2 py-1"
          >
            Back
          </button>
          <button className="rounded text-white bg-orange-400 px-2 py-1">
            Next
          </button>
        </div>
      </form>
    </Layout>
  );
}

PaymentScreen.auth = true;
