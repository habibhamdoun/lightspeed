import React from 'react';
import NavBar from './NavBar';
import Hero from './Hero';
import Featured from './Featured';
import Footer from './Footer';
import CategoryRow from './CategoryRow';
import IsloggedIn from './IsloggedIn';

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <IsloggedIn />
      <Featured />
      <CategoryRow />
      <Footer />
    </>
  );
};

export default HomePage;
