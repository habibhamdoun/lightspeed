'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import Search from './Search';
import { motion } from 'framer-motion';

const SidePanelFilter = ({ setBrand, setStyle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const router = useRouter();
  const styles = [
    'T-Shirts',
    'Hoodies',
    'Footwear',
    'Shorts',
    'Sweats',
    'Leggings',
  ];
  const brands = ['LightSpeed', 'Adidas'];
  const clearFilters = () => {
    setBrand('all');
    setSelectedBrand('all');
    setStyle('all');
    setSelectedStyle('all');
    handleToggle();

    router.push(`/shop?brand=all&style=all`);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleBrandClick = (brandName) => {
    const newBrand = selectedBrand === brandName ? 'all' : brandName;
    setBrand(newBrand);
    setSelectedBrand(newBrand);
    handleToggle();
  };

  const handleStyleClick = (styleName) => {
    const newStyle = selectedStyle === styleName ? 'all' : styleName;
    setStyle(newStyle);
    setSelectedStyle(newStyle);
    handleToggle();

    router.push(`/shop?brand=${selectedBrand}&style=${selectedStyle}`);
  };

  return (
    <>
      <Suspense>
        <Search setBrand={setSelectedBrand} setStyle={setSelectedStyle} />
      </Suspense>
      {isOpen && (
        <motion.div
          onClick={handleToggle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ duration: 0.5 }}
          className='fixed top-0 left-0 w-full h-full bg-black z-20 '
        ></motion.div>
      )}
      <button
        onClick={handleToggle}
        className='p-3 bg-gray-200 w-full sm:w-1/2 text-gray-700 shadow hover:bg-gray-300'
      >
        {isOpen ? 'Close' : 'Filter'}
      </button>

      <div
        className={`fixed inset-y-0 left-0 transform flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-30 bg-white shadow-lg w-64`}
      >
        <button
          onClick={handleToggle}
          className='text-black p-4 text-4xl self-end'
        >
          X
        </button>
        <div
          onClick={() => {
            clearFilters();
          }}
          className='p-3  bg-gray-200 m-3 text-gray-700 shadow hover:bg-gray-300'
        >
          Clear Filters
        </div>
        <div className='p-4 z-[10]'>
          <h2 className='text-2xl font-bold text-black'>BRANDS</h2>
          {brands.map((brandName) => (
            <button
              key={brandName}
              onClick={() => {
                handleBrandClick(brandName);
                brandName == selectedBrand
                  ? router.push(`/shop?brand=all&style=${selectedStyle}`)
                  : router.push(
                      `/shop?brand=${brandName}&style=${selectedStyle}`,
                    );
              }}
              className={`block w-full text-left mt-2 px-4 py-2 border border-gray-300 rounded-md text-black ${
                selectedBrand === brandName && 'bg-black text-white'
              }`}
            >
              {brandName}
            </button>
          ))}
          <h2 className='text-2xl font-bold mt-6 text-black'>STYLE</h2>
          {styles.map((styleName) => (
            <button
              key={styleName}
              onClick={() => {
                handleStyleClick(styleName);

                styleName == selectedStyle
                  ? router.push(`/shop?brand=${selectedBrand}&style=all`)
                  : router.push(
                      `/shop?brand=${selectedBrand}&style=${styleName}`,
                    );
              }}
              className={`block w-full text-left mt-2 px-4 py-2 border border-gray-300 rounded-md text-black ${
                selectedStyle === styleName && 'bg-black text-white'
              }`}
            >
              {styleName}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SidePanelFilter;
