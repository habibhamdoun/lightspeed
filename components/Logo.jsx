import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <a href='/'>
      <div className=' text-black'>
        <Image
          src={'/assets/logowithText.png'}
          alt='logo'
          width={600}
          height={600}
          className='w-[70vw] sm:w-[40vw] max-h-[300px] max-w-[300px]'
        ></Image>
      </div>
    </a>
  );
};

export default Logo;
