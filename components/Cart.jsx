import React from 'react';
import Image from 'next/image';
import { useAppContext } from '@/context';

const Cart = ({ onToggle }) => {
  const { itemCount } = useAppContext();

  return (
    <>
      <div
        className='relative w-10 h-10 cursor-pointer'
        onClick={() => onToggle()}
      >
        <div className='absolute bg-main text-black z-10 rounded-full top-[-10px] left-[-13px] p-[2px] w-6 h-6 text-center font-bold'>
          {itemCount}
        </div>
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
