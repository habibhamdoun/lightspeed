import React from 'react';
import { usePathname } from 'next/navigation';

const NavList = () => {
  const pathname = usePathname();
  return (
    <div className='p-4 flex gap-8 justify-center items-center'>
      <a href='/home' className='p-2 text-black group'>
        <h3
          className={`tracking-wider text-2xl ${
            pathname != '/home'
              ? 'hover-underline-animation'
              : 'border-main border-b-2'
          }`}
        >
          Home
        </h3>
      </a>
      <a href='/shop' className='p-2 text-black group'>
        <h3
          className={`tracking-wider text-2xl ${
            pathname != '/shop'
              ? 'hover-underline-animation'
              : 'border-main border-b-2'
          }`}
        >
          Shop
        </h3>
      </a>
      <a href='/checkout' className='p-2 text-black group'>
        <h3
          className={`tracking-wider text-2xl ${
            pathname != '/checkout'
              ? 'hover-underline-animation'
              : 'border-main border-b-2'
          }`}
        >
          Checkout
        </h3>
      </a>
      <a href='/login' className='p-2 text-black group'>
        <h3
          className={`tracking-wider text-2xl ${
            pathname != '/universe'
              ? 'hover-underline-animation'
              : 'border-main border-b-2'
          }`}
        >
          Log in
        </h3>
      </a>
    </div>
  );
};

export default NavList;
