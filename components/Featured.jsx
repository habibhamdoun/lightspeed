'use client';
import React from 'react';
import items from '@/data/items.json';
import Item from './Item';
import { motion } from 'framer-motion';

const Featured = () => {
  return (
    <section className='m-5 flex flex-col items-center'>
      <motion.h2
        initial={{ translateY: 200, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className='text-center text-3xl mb-5 text-black font-semibold'
      >
        Featur<span className='gradient-main-rtol'>ed It</span>ems
      </motion.h2>
      <div className='flex sm:flex-row flex-col flex-wrap justify-center items-center gap-10 '>
        {items.map((item) => {
          if (item.featured) return <Item item={item} />;
        })}
      </div>
    </section>
  );
};

export default Featured;
