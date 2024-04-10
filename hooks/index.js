'use client';
import { useEffect, useState } from 'react';

export const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth]);

  return { isMobile, screenSize };
};
