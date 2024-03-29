import Image from 'next/image';
import React from 'react';
import addToCart from '../public/assets/addToCart.svg';

const AddToCartBtn = () => {
  return (
    <>
      <button
        aria-label='Add to Cart'
        className='inline-flex items-center justify-center p-3 hover:bg-gray-100 rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        onClick={() => {
          // TODO: Add your on-click logic here
        }}
      >
        <Image src={addToCart} width={28} height={28} />
      </button>
    </>
  );
};

export default AddToCartBtn;
