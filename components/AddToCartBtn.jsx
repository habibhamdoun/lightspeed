'use client';
import React, { useState } from 'react';
import useCart from '@/hooks/useCart';
import Image from 'next/image';
import { useAppContext } from '@/context';

const AddToCartBtn = ({ id }) => {
  const { cart, addToCart } = useAppContext();
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    addToCart(id);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    console.log('cart');
    console.log(cart);
  };
  return (
    <button
      // className={`relative
      // ${version == 'black' ? 'bg-black' : 'bg-[#993639]'}
      //  overflow-hidden  text-white p-3 rounded w-48 h-12 flex justify-center items-center`}
      onClick={handleClick}
      aria-label='Add to Cart'
      className='inline-flex items-center justify-center p-3 hover:bg-gray-100 rounded-full transition-colors duration-150'
      // onClick={() => {
      // TODO: Add your on-click logic here
      // }}
    >
      <Image src={'/assets/addToCart.svg'} width={28} height={28} />
    </button>
  );
};

export default AddToCartBtn;
