'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AddToCartBtn from './AddToCartBtn';
import PriceTag from './PriceTag';

const Item = ({ item }) => {
  const [imageSource, setImageSource] = useState(item.images[0]);
  const [priceType, setPriceType] = useState('USD');
  const [selectedVariant, setSelectedVariant] = useState(item.variants[0].name);
  const [selectedSize, setSelectedSize] = useState(item.sizes[0]);

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
          className='relative lg:w-[25vw] lg:h-[25vw] w-[80vw] h-[80vw] flex flex-col justify-center items-center'
          onMouseEnter={() => setImageSource(item.images[1])}
          onMouseLeave={() => setImageSource(item.images[0])}
        >
          {item.badge != 'none' && (
            <div className='z-10 absolute top-0 right-0 gradient-bg-main-rtol text-black px-2 py-1 text-lg font-bold transform translate-x-1/2 -translate-y-1/2'>
              {item.badge}
            </div>
          )}
          <a href={`/product/${item.id}`}>
            {item.images.map((item) => {
              return (
                <Image
                  src={item}
                  alt='Product picture'
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

        <div className='flex justify-between items-center w-full m-2'>
          <div>
            <h3 className='text-2xl lg:text-3xl font-semibold tracking-tight text-gray-900 border-b-2 border-main'>
              {item.name}
            </h3>
            <p className='text-gray-400'>{item.style}</p>
            <div className='flex gap-2 mt-1'>
              {item.sizes &&
                item.sizes.map((size) => {
                  return (
                    <button
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 text-xs font-bold uppercase border-2  text-black rounded-full p-2 ${
                        selectedSize == size
                          ? 'border-blue-600'
                          : 'border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
            </div>
            <div className='flex gap-2 p-2'>
              {item.variants &&
                item.variants.map((variant) => {
                  return (
                    <button
                      onClick={() => setSelectedVariant(variant.name)}
                      style={{ backgroundColor: variant.color }}
                      className={`w-6 h-6 border-2  rounded-full  ${
                        selectedVariant == variant.name
                          ? 'border-blue-600'
                          : 'border-gray-400'
                      }`}
                    ></button>
                  );
                })}
            </div>
          </div>
          <div className=' flex items-center justify-center font-bold text-lg m-1 text-black'>
            ${item.price}
            <AddToCartBtn
              id={item.id}
              variantName={selectedVariant}
              size={selectedSize}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Item;
