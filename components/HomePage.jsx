import React from 'react';
import NavBar from './NavBar';
import Hero from './Hero';
import Featured from './Featured';

const HomePage = ({ isMobile }) => {
  return (
    <>
      <NavBar isMobile={isMobile} />
      <Hero isMobile={isMobile} />
      <Featured isMobile={isMobile} />
    </>
  );
};

export default HomePage;
