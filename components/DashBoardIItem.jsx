import Image from 'next/image';
import React from 'react';

const DashBoardIItem = ({ name, src, handleSelectSection }) => {
  return (
    <button
      className='flex items-center gap-2'
      onClick={() => handleSelectSection(name)}
    >
      <Image src={src} width={30} height={30} className='w-4 h-4' />
      <p className='text-white'>{name}</p>
      <Image
        src={'/assets/rightArrow.svg'}
        width={30}
        height={30}
        className='w-3 h-3 ml-auto'
      />
    </button>
  );
};

export default DashBoardIItem;
