'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import cartIcon from '../public/assets/cart.svg';
import CartDisplay from './CartDisplay';

const Cart = () => {
  // const { cart, itemCount } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className='relative w-10 h-10 cursor-pointer'
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={cartIcon}
          alt='Cart'
          className='w-full h-full transform scale-x-[-1]'
        />
        {/* {itemCount > 0 && (
          <span className='absolute bottom-3 right-5 inline-flex items-center justify-center p-1 text-xs font-bold text-red-100 bg-red-600 rounded-full'>
            {itemCount}
          </span>
        )} */}
      </div>

      <CartDisplay
      // key={itemCount}
      // isOpen={isModalOpen}
      // setIsOpen={setIsModalOpen}
      />
    </>
  );
};

export default Cart;
