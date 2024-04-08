'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AddToCartBtn from './AddToCartBtn';

// import useCart from '@/hooks/useCart';
// import PriceTag from './PriceTag';

const Item = ({ id, badge, images, name, price }) => {
  const [imageSource, setImageSource] = useState(images[0]);
  const [priceType, setPriceType] = useState('USD');
  // const { cart, addToCart } = useCart();

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <a href={`/product/${id}`}>
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
              <div className='z-50 absolute top-0 right-0 bg-main text-black px-2 py-1 text-lg font-bold transform translate-x-1/2 -translate-y-1/2'>
                {badge}
              </div>
            )}

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
          </div>
          {/* <div className='bg-[#993639] w-[100%] md:w-[25vw] text-white text-center p-1'>
            Select Options {'->'}
          </div> */}
          <div className='flex justify-between items-center w-full m-2'>
            <h3 className='text-2xl md:text-3xl font-bold tracking-tight text-gray-900 border-b-2 border-main'>
              {name}
            </h3>
            <AddToCartBtn />
          </div>
        </motion.div>
      </a>
      {/* <PriceTag
        priceType={priceType}
        setPriceType={setPriceType}
        price={price}
      /> */}
    </div>
  );
};

export default Item;
