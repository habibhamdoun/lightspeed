import React from 'react';
import NavBar from './NavBar';
import Hero from './Hero';
import Featured from './Featured';
import Footer from './Footer';
import CategorySquare from './CategorySquare';
import CategoryRow from './CategoryRow';
import { useScreenSize } from '@/hooks';

const HomePage = () => {
  const { isMobile } = useScreenSize();
  return (
    <>
      <NavBar />
      <Hero />
      <Featured />
      <CategoryRow />
      <Footer />
    </>
  );
};

export default HomePage;
