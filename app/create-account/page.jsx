'use client';
import '../globals.css';
import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import CreateAccountDisplay from '../../components/CreateAccountDisplay';

const page = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div>
      <NavBar isMobile={isMobile} />
      <CreateAccountDisplay />
      <Footer />
    </div>
  );
};

export default page;
