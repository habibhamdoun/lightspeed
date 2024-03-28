'use client';
import Image from 'next/image';
import React from 'react';
import heroBg from '../public/assets/heroBg.jpg';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className='relative flex flex-col items-start justify-end bg-black'
      >
        <Image className='w-[100vw] h-[80vh] object-cover' src={heroBg}></Image>
        {/* <div className='absolute top-0 left-0 w-[100vw] z-10'> </div> */}
        <div className='absolute text-center flex flex-col items-start m-2'>
          <button className='inline-flex rounded-md items-center px-4 py-2 my-2 font-semibold text-lg tracking-tighter bg-white text-black'>
            Shop Now
          </button>
          <p className='text-[2vw] italic'>
            Where velocity meets <span className='text-[#FFDD5E]'>Victory</span>{' '}
            Every Stitch a Leap Beyond
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
