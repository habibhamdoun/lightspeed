import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <a href='/'>
      <div className=' text-black'>
        <Image
          src={'/assets/logoOnly.svg'}
          alt='logo'
          width={600}
          height={600}
          className='w-[25vw] md:w-[17vw] lg:w-[10vw] p-8 max-h-[150px] max-w-[200px]'
        ></Image>
      </div>
    </a>
  );
};

export default Logo;
