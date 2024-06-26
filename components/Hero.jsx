'use client';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { useScreenSize } from '@/hooks';

const Hero = () => {
  const { isMobile, screenSize } = useScreenSize();
  return (
    <section>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className='relative flex flex-col items-start justify-end w-[100vw] h-[80vh] '
      >
        <Image
          className='absolute grayscale h-full object-cover object-center z-[-1]'
          width={screenSize > 2000 ? 4000 : 1920}
          height={screenSize > 2000 ? 4000 : 1920}
          src={!isMobile ? '/assets/heroBg.jpg' : '/assets/mobilehero.jpg'}
          srcSet={`/assets/heroBg.jpg 1920w, /assets/mobilehero.jpg 480w`}
        ></Image>
        <div className=' text-center flex flex-col md:items-start items-center justify md:ml-16'>
          <div className='md:text-[3vw] text-[7vw] font-semibold text-white '>
            Where velocity meets{' '}
            <span className='gradient-main-rtol'>Victory</span>{' '}
            {!isMobile && <br></br>}
            Every <span className='gradient-main-ltor'>Stitch</span> a Leap
            Beyond
          </div>

          <a href='/shop'>
            <button className='inline-flex font-bold rounded-md items-center px-7 py-6 my-2 text-5xl tracking-tighter gradient-bg-main-rtol text-black hover:text-white duration-300'>
              Shop Now
            </button>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
