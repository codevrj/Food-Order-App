/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { BsCartPlusFill } from 'react-icons/bs';


export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card">
      <div>
        <Link href={`/product/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="flex flex-wrap h-[140px] w-full object-cover rounded-t-md"
          />
        </Link>
      </div>

      <div className="card-des">
        <Link href={`/product/${product.slug}`}>
          <h2>{product.name}</h2>
        </Link>
        <p className='text-sm'>{product.description}</p>
        <p>Rs:{product.price}</p>
      </div>

      <div className="b-section">
        <p>{product.numReviews} Reviews</p>
        <button
          type="button"
          className="pbutton"
          onClick={() => addToCartHandler(product)}
        >
          <BsCartPlusFill />
          Add
        </button>
      </div>
    </div>
  );
}
