'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import items from '@/data/items.json';
import ItemDisplay from '@/components/ItemDisplay';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const page = () => {
  const pathname = usePathname();
  console.log(pathname);
  const id = pathname.charAt(pathname.length - 1);
  const item = items.filter((item) => item.id == id)[0];
  return (
    <>
      <NavBar />
      <ItemDisplay />
      <Footer />
    </>
  );
};

export default page;
