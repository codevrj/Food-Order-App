import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    // getValues,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('phoneNumber', shippingAddress.phoneNumber);
  }, [setValue, shippingAddress]);

  const submitHandler = ({
    fullName,
    address,
    city,
    postalCode,
    phoneNumber,
  }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, phoneNumber },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          phoneNumber,
          // location,
        },
      })
    );
    router.push('/payment');
  };

  return (
    <Layout title="Delivery Address">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Delivery Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            autoFocus
            {...register('fullName', {
              required: 'please enter full name',
            })}
            className="w-full border-[2px] rounded p-1 outline-none focus:border-orange-500 border-orange-200"
          />
          {errors.fullName && (
            <div className="text-red-800 text-sm">
              {errors.fullName.message}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            {...register('address', {
              required: 'please enter address',
              minLength: {
                value: 5,
                message: 'Address is more than 4 letters',
              },
            })}
            className="w-full border-[2px] rounded p-1 outline-none focus:border-orange-500 border-orange-200"
          />
          {errors.address && (
            <div className="text-red-800 text-sm">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            {...register('city', {
              required: 'please enter a city',
            })}
            className="w-full border-[2px] rounded p-1 outline-none focus:border-orange-500 border-orange-200"
          />
          {errors.city && (
            <div className="text-red-800 text-sm">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            id="postalCode"
            type="text"
            {...register('postalCode', {
              required: 'please enter postal code',
            })}
            className="w-full border-[2px] rounded p-1 outline-none focus:border-orange-500 border-orange-200"
          />
          {errors.postalCode && (
            <div className="text-red-800 text-sm">
              {errors.postalCode.message}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            type="tel"
            {...register('phoneNumber', {
              required: 'please enter a phone number',
            })}
            pattern="[0-9]{3}[0-9]{7}"
            className="w-full border-[2px] rounded p-1 outline-none focus:border-orange-500 border-orange-200"
          />
          {errors.phoneNumber && (
            <div className="text-red-800 text-sm">
              {errors.phoneNumber.message}
            </div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="text-white bg-orange-400 py-1 px-3 rounded">
            Next
          </button>
        </div>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;
