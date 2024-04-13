'use client';
import { useScreenSize } from '@/hooks';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';

const CategorySquare = ({ id, title, imageUrl, linkUrl }) => {
  const { isMobile, screenSize } = useScreenSize();
  const [delay, setDelay] = useState((id * 1) / 10);
  return (
    <div className='flex flex-col md:gap-5 rounded-sm items-center justify-center md:h-48 md:w-48 bg-gray-200 w-[50vw] hover:bg-gray-300 duration-300 cursor-pointer'>
      <Image
        className='md:h-32 md:w-32 w-[50vw] rounded-sm object-cover'
        width={600}
        height={600}
        src={imageUrl}
        alt={title}
      />
      <motion.div
        initial={{ translateY: 100, opacity: 0 }}
        whileInView={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 0.1, delay: isMobile ? 0 : delay }}
        viewport={{ once: true }}
        className='flex items-center justify-around w-full p-5 gap-3'
      >
        <div className='flex'>
          <motion.div
            initial={{ maxHeight: 0 }}
            whileInView={{ maxHeight: 100 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: isMobile ? 0 : delay + 0.3 }}
            className='border-l-4 border-main '
          ></motion.div>
          <p className='font-semibold text-black md:text-sm text-3xl pl-2 '>
            {/* border-l-4 border-main */}
            {title}
          </p>
        </div>
        {/* {screenSize < 768 && screenSize > 990 && (
          <a href={linkUrl} className='text-blue-500 hover:underline'>
            <Image
              width={28}
              height={28}
              src={'/assets/shoppingBag.svg'}
              className=' md:w-4 md:h-4 w-8 h-8'
            />
          </a>
        )} */}
      </motion.div>
    </div>
  );
};

export default CategorySquare;