'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Cart from './Cart';
import ToggleButton from './ToggleButton';
import SidePanel from './SidePanel';
import CartDisplay from './CartDisplay';
import { usePathname } from 'next/navigation';
import { useScreenSize } from '@/hooks';

const NavBar = () => {
  const { isMobile } = useScreenSize();
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();
  console.log(pathname);
  const togglePanel = () => setPanelOpen(!isPanelOpen);
  const toggleCart = () => setCartOpen(!isCartOpen);

  return (
    <section className='flex justify-around items-center h-[12vh] w-[100vw] bg-white z-10'>
      {isMobile ? (
        <div>
          <ToggleButton onToggle={togglePanel} />
          <SidePanel isOpen={isPanelOpen} onClose={() => setPanelOpen(false)} />
        </div>
      ) : (
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
      )}
      <a href='/'>
        <div className=' text-black'>
          <Image
            src={'/assets/logo.png'}
            alt='logo'
            width={600}
            height={600}
            className='w-[30vw] md:w-[15vw]'
          ></Image>
        </div>
      </a>
      <div className='p-2 text-black'>
        <CartDisplay isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
        <Cart onToggle={toggleCart} />
      </div>
    </section>
  );
};

export default NavBar;