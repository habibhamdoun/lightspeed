import React from 'react';
import NavBar from './NavBar';
import Hero from './Hero';
import Featured from './Featured';
import Footer from './Footer';

const HomePage = ({ isMobile }) => {
  return (
    <>
      <NavBar isMobile={isMobile} />
      <Hero isMobile={isMobile} />
      <Featured isMobile={isMobile} />
      <Footer />
    </>
  );
};

export default HomePage;
