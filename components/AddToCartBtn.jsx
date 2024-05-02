'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useAppContext } from '@/context';
import { AnimatePresence, motion } from 'framer-motion';

const AddToCartBtn = ({ id, variantName, size }) => {
  const { addToCart } = useAppContext();

  const handleClick = () => {
    addToCart(id, variantName, size);
  };
  return (
    <div>
      <motion.div className='items-center justify-center p-3  rounded-full transition-colors duration-150'>
        <AnimatePresence>
          <motion.button
            key={'button'}
            initial={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClick}
            aria-label='Add to Cart'
            className='inline-flex items-center justify-center p-3 hover:bg-gray-100 rounded-full transition-colors duration-150'
          >
            <Image src={'/assets/addToCart.svg'} width={28} height={28} />
          </motion.button>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AddToCartBtn;
