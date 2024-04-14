'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AddToCartBtn from './AddToCartBtn';
import PriceTag from './PriceTag';

// import useCart from '@/hooks/useCart';

const Item = ({ id, badge, images, name, price, style }) => {
  const [imageSource, setImageSource] = useState(images[0]);
  const [priceType, setPriceType] = useState('USD');
  // const { cart, addToCart } = useCart();

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <motion.div
        initial={{ translateY: 200, opacity: 0 }}
        whileInView={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className='flex flex-col justify-center items-start relative'
      >
        <div
          className='relative md:w-[25vw] md:h-[25vw] w-[80vw] h-[80vw] flex flex-col justify-center items-center'
          onMouseEnter={() => setImageSource(images[1])}
          onMouseLeave={() => setImageSource(images[0])}
        >
          {badge != 'none' && (
            <div className='z-10 absolute top-0 right-0 gradient-bg-main-rtol text-black px-2 py-1 text-lg font-bold transform translate-x-1/2 -translate-y-1/2'>
              {badge}
            </div>
          )}
          <a href={`/product/${id}`}>
            {images.map((item) => {
              return (
                <Image
                  src={item}
                  alt='Product picture'
                  // width={28}
                  // height={28}
                  layout='fill'
                  objectFit='cover'
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out shadow-lg hover:shadow-2xl ${
                    imageSource === item ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              );
            })}
          </a>
        </div>
        {/* <div className='bg-[#993639] w-[100%] md:w-[25vw] text-white text-center p-1'>
            Select Options {'->'}
          </div> */}
        <div className='flex justify-between items-center w-full m-2'>
          <div>
            <h3 className='text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 border-b-2 border-main'>
              {name}
            </h3>
            <p className='text-gray-400'>{style}</p>
          </div>
          <div className=' flex items-center justify-center font-bold text-lg m-1 text-black'>
            $
            {/* <PriceTag
                priceType={priceType}
                setPriceType={setPriceType}
                price={price}
              /> */}
            {price}
            <AddToCartBtn id={id} />
          </div>
        </div>
      </motion.div>
      {/* </a> */}
    </div>
  );
};

export default Item;
