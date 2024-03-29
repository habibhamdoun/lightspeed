'use client';
import Featured from '@/app/components/Featured';
import '../globals.css';
import HomePage from '@/app/components/HomePage';
import React, { useEffect, useState } from 'react';

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
      <HomePage isMobile={isMobile} />
    </div>
  );
};

export default page;
