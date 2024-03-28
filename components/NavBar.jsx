'use client';
import React, { useState } from 'react';
import logoName from '../public/assets/logo.png';
import Image from 'next/image';
import Cart from './Cart';
import ToggleButton from './ToggleButton';
import SidePanel from './SidePanel';
const NavBar = () => {
  const [isPanelOpen, setPanelOpen] = useState(false);
  const togglePanel = () => {
    setPanelOpen(!isPanelOpen);
  };

  return (
    <section className='flex justify-between items-center w-[100vw] bg-white'>
      <div>
        <ToggleButton onToggle={togglePanel} />
        <SidePanel isOpen={isPanelOpen} onClose={() => setPanelOpen(false)} />
      </div>
      <a href='/'>
        <div className='p-2'>
          <Image src={logoName} alt='logo' className='w-[15vw]'></Image>
        </div>
      </a>
      <div className='p-2'>
        <Cart />
      </div>
    </section>
  );
};

export default NavBar;
