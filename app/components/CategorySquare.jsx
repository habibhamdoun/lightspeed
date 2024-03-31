import Image from 'next/image';
import React from 'react';
import shoppingBag from '../../public/assets/shoppingBag.svg';

const CategorySquare = ({ title, imageUrl, linkUrl }) => {
  return (
    <div className='flex flex-col md:gap-5 items-center justify-center md:h-48 md:w-48 bg-gray-200 w-[50vw] hover:bg-gray-300 duration-300 cursor-pointer'>
      <Image
        className='md:h-32 md:w-32 w-[50vw] object-cover'
        src={imageUrl}
        alt={title}
      />
      <div className='flex items-center justify-around flex-wrap w-full p-5 gap-3'>
        <p className='font-semibold text-black md:text-base text-3xl pl-2 border-l-4 border-main'>
          {title}
        </p>
        <a href={linkUrl} className='text-blue-500 hover:underline'>
          <Image src={shoppingBag} className=' md:w-4 md:h-4 w-8 h-8' />
        </a>
      </div>
    </div>
  );
};

export default CategorySquare;
