'use client';
import React, { useState } from 'react';
import Cart from './Cart';
import ToggleButton from './ToggleButton';
import SidePanel from './SidePanel';
import CartDisplay from './CartDisplay';

import { useScreenSize } from '@/hooks';
import Logo from './Logo';
import NavList from './NavList';

const NavBar = () => {
  const { isMobile, screenSize } = useScreenSize();
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  const togglePanel = () => setPanelOpen(!isPanelOpen);
  const toggleCart = () => setCartOpen(!isCartOpen);

  return (
    <section className='flex justify-around items-center h-[12vh] w-[100vw] bg-white z-10'>
      {screenSize < 900 ? (
        <div className='flex items-center justify-between w-full '>
          <div>
            <ToggleButton onToggle={togglePanel} />
            <SidePanel
              isOpen={isPanelOpen}
              onClose={() => setPanelOpen(false)}
            />
          </div>
          <Logo />
          <div className='p-2 text-black'>
            <CartDisplay
              isOpen={isCartOpen}
              onClose={() => setCartOpen(false)}
            />
            <Cart onToggle={toggleCart} />
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-between w-full'>
          <Logo />
          <NavList />
          <div className='p-2 text-black'>
            <CartDisplay
              isOpen={isCartOpen}
              onClose={() => setCartOpen(false)}
            />
            <Cart onToggle={toggleCart} />
          </div>
        </div>
      )}
    </section>
  );
};

export default NavBar;
