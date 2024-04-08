'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import CartDisplay from './CartDisplay';

const Cart = ({ onToggle }) => {
  // const { cart, itemCount } = useAppContext();

  return (
    <>
      <div
        className='relative w-10 h-10 cursor-pointer'
        onClick={() => onToggle()}
      >
        <Image
          src={'/assets/cart.svg'}
          alt='Cart'
          width={28}
          height={28}
          className='w-full h-full transform scale-x-[-1]'
        />
      </div>
    </>
  );
};

export default Cart;
