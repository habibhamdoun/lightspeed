'use client';
import React from 'react';
import items from '../data/items.json';
import Item from './Item';
import { motion } from 'framer-motion';

const Featured = ({ isMobile }) => {
  return (
    <section className='m-5 flex flex-col items-center'>
      <motion.h2
        initial={{ translateY: 200, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className='text-center text-3xl mb-5 text-black'
      >
        Featur<span className='text-main'>ed It</span>ems
      </motion.h2>
      <div className='flex sm:flex-row flex-col justify-center items-center flex-wrap gap-10 '>
        {items.map((item) => {
          if (item.featured)
            return (
              <Item
                id={item.id}
                images={item.images}
                name={item.name}
                price={item.price}
                badge={item.badge != '' ? item.badge : 'none'}
              />
            );
        })}
      </div>
    </section>
  );
};

export default Featured;
