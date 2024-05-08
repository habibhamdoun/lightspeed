'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import items from '@/data/items.json';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import AddToCartBtn from './AddToCartBtn';
import PriceTag from './PriceTag';
import Cart from './Cart';

const ItemDisplay = () => {
  const pathname = usePathname();
  const startIndex = pathname.indexOf('/', pathname.indexOf('/') + 1);
  // console.log('pathname: ' + pathname);
  const id = pathname.substring(startIndex + 1);
  const item = items.filter((item) => item.id == id)[0];
  const [mainImageSrc, setMainImageSource] = useState(item.images[0]);
  const [selectedVariant, setSelectedVariant] = useState(
    item.variants ? item.variants[0].name : '',
  );
  const [selectedSize, setSelectedSize] = useState(
    item.sizes ? item.sizes[0] : '',
  );

  return (
    <div className='flex flex-col items-center justify-center p-4 w-full '>
      <div className='  flex flex-col items-center justify-center gap-5 md:flex-row md:items-start'>
        <div className='flex flex-col items-center justify-center gap-5 md:gap-16'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={mainImageSrc}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={mainImageSrc}
                alt={item.style}
                width={640}
                height={640}
                className='h-[80vw] w-[80vw] md:h-[25vw] md:w-[25vw] overflow-hidden'
              />
            </motion.div>
          </AnimatePresence>
          <div
            className='flex gap-2 mb-4 overflow-x-auto'
            style={{ maxWidth: '100vw' }}
          >
            {item.images.map((image, index) => (
              <div
                onClick={() => setMainImageSource(image)}
                key={index}
                className={`flex items-center justify-center border-2 ${
                  mainImageSrc == image && 'border-red-500'
                } p-4 w-[30vw] h-[30vw] md:w-[10vw] md:h-[10vw] overflow-hidden flex-shrink-0`}
              >
                <Image
                  src={image}
                  alt={`${item.name} ${index + 1}`}
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-4 md:w-[30vw] p-4'>
          <h1 className='text-3xl font-bold'>{item.name}</h1>
          <p>{item.description}</p>
          <div className='flex gap-2'>
            {item.variants &&
              item.variants.map((variant) => {
                return (
                  <button
                    onClick={() => {
                      setSelectedVariant(variant.name);
                      setMainImageSource(variant.src);
                    }}
                    style={{ backgroundColor: variant.color }}
                    className={`w-6 h-6 border-2  rounded-full ${
                      selectedVariant == variant.name ? 'border-blue-600' : ''
                    }`}
                  ></button>
                );
              })}
          </div>
          <div className='flex gap-2 mt-1'>
            {item.sizes &&
              item.sizes.map((size) => {
                return (
                  <button
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 text-xs font-bold uppercase border-2  rounded-full p-1 ${
                      selectedSize == size ? 'border-blue-600' : ''
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
          </div>
          <div className='flex items-center gap-5'>
            <AddToCartBtn
              full={true}
              item={item}
              variantName={selectedVariant}
              size={selectedSize}
              version={'black'}
            />
            <Cart />
          </div>
          <PriceTag price={item.price} discount={false} />
        </div>
      </div>
    </div>
  );
};

export default ItemDisplay;
