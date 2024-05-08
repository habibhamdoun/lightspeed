'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import items from '@/data/items.json';
import ItemDisplay from '@/components/ItemDisplay';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const page = () => {
  return (
    <>
      <NavBar />
      <ItemDisplay />
      <Footer />
    </>
  );
};

export default page;
