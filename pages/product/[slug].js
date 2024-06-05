import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import Image from 'next/image';
import { Store } from '../../utils/Store';
import Product from '../../models/Product';
import db from '../../utils/db';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  if (!product) {
    return (
      <Layout>
        <div className="flex h-screen justify-center items-center">
          <div className="text-2xl font-semibold text-orange-600">
            Product Not Found !!..
          </div>
        </div>
      </Layout>
    );
  }
  const addToCartHandler = async() => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const {data} = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.success('product updated in the cart');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout title={product.name}>
      <div className="p-1 mb-4 border-l-2 border-l-black text-xl text-orange-900 font-semibold bg-orange-100">
        <Link href={'/'}>
          <IoArrowBackCircleSharp className="text-xl" />
        </Link>
      </div>

      <div className="grid md:grid-cols-4 md:gap-2">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={350}
          ></Image>
        </div>

        <div className="">
          <ul>
            <li>
              <h1 className="text-xl text-orange-600">{product.name}</h1>
            </li>
            <li>{product.category}</li>
            <li>{product.type}</li>
            <li>{product.rating}</li>
            <li>{product.numReviews} num of Reviews</li>
            <li>Description:{product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-6">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>Rs:{product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>
                {product.countInStock > 0 ? 'In Stock' : 'Not Available'}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="pbutton"
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
