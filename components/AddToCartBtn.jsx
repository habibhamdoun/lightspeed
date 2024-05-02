'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useAppContext } from '@/context';
import { AnimatePresence, motion } from 'framer-motion';

const AddToCartBtn = ({ id, variantName, size, full }) => {
  const { cart, addToCart } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);

  const textVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  const checkmarkVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  };

  const handleClick = () => {
    addToCart(
      id,
      variantName ? variantName : 'Default',
      size ? size : 'Default',
    );
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1500);
  };
  return (
    <div>
      {full ? (
        <button
          className={`relative bg-black 
           overflow-hidden text-white p-3 rounded w-48 h-12 flex justify-center items-center`}
          onClick={handleClick}
        >
          <motion.div
            variants={textVariants}
            initial='visible'
            animate={isAdding ? 'hidden' : 'visible'}
          >
            <h3>
              Add To <span className='text-main'>Cart</span>
            </h3>
          </motion.div>

          {isAdding && (
            <motion.div
              className='flex items-center justify-center p-0'
              variants={checkmarkVariants}
              initial='hidden'
              animate='visible'
            >
              <Image
                src={'/assets/checkmark.svg'}
                width={20}
                height={20}
                alt='checkmark'
              />
            </motion.div>
          )}
        </button>
      ) : (
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
      )}
    </div>
  );
};

export default AddToCartBtn;
