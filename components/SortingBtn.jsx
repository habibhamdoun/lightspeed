'use client';
import React from 'react';
import Image from 'next/image';

const SortingBtn = ({ option, setOption }) => {
  const options = [
    'Featured',
    'Price: Low to High',
    'Price: High to Low',
    'Newest Arrivals',
  ];
  return (
    <div className='relative w-full sm:w-1/2 text-black'>
      <select
        onChange={(e) => setOption(e.target.value)}
        className='block appearance-none w-full  p-3 bg-white border border-gray-400 hover:border-gray-500  shadow leading-tight focus:outline-none focus:shadow-outline'
      >
        {options.map((optionItem) => (
          <option
            key={optionItem}
            value={optionItem}
          >{`Sort by - ${optionItem}`}</option>
        ))}
      </select>
      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center p-2 text-gray-700'>
        <Image
          src={'/assets/chevron.svg'}
          alt='arrow'
          width={20}
          height={20}
          className='w-5 h-5 transform rotate-180'
        ></Image>
      </div>
    </div>
  );
};

export default SortingBtn;
