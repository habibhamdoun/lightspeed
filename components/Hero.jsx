'use client';
import Image from 'next/image';
import React from 'react';
import heroBg from '../public/assets/heroBg.jpg';
import mobileHeroBg from '../public/assets/mobilehero.jpg';
import { motion } from 'framer-motion';

const Hero = ({ isMobile }) => {
  return (
    <section>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className='relative flex flex-col items-start justify-end'
      >
        <Image
          className='w-[100vw] h-[80vh] grayscale object-cover object-center'
          src={!isMobile ? heroBg : mobileHeroBg}
          srcSet={`${heroBg} 1920w, ${mobileHeroBg} 480w`}
        ></Image>
        <div className='absolute text-center flex flex-col md:items-start items-center ml-16'>
          <div className='md:text-[3vw] text-[7vw]'>
            <h3>
              Where velocity meets <span className='text-main'>Victory</span>{' '}
              <br></br>
              Every <span className='text-main'>Stitch</span> a Leap Beyond
            </h3>
          </div>

          <a href='/shop'>
            <button className='inline-flex font-bold rounded-md items-center px-7 py-6 my-2 text-5xl tracking-tighter bg-white text-black'>
              Shop Now
            </button>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
