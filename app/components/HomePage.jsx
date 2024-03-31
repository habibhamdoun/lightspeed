import React from 'react';
import NavBar from './NavBar';
import Hero from './Hero';
import Featured from './Featured';
import Footer from './Footer';
import CategorySquare from './CategorySquare';
import CategoryRow from './CategoryRow';

const HomePage = ({ isMobile }) => {
  return (
    <>
      <NavBar isMobile={isMobile} />
      <Hero isMobile={isMobile} />
      <Featured isMobile={isMobile} />
      <CategoryRow />
      <Footer />
    </>
  );
};

export default HomePage;
