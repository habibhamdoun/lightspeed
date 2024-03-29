'use client';
import Featured from '@/components/Featured';
import '../app/globals.css';
import HomePage from '@/components/HomePage';
import React, { useEffect, useState } from 'react';

const index = () => {
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
      <HomePage isMobile={isMobile} />
    </div>
  );
};

export default index;
