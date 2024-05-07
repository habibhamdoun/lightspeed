import React from 'react';

const ProductTableCell = ({ isMobile, item }) => {
  return (
    <span className='flex flex-col'>
      <span className='text-gray-900 whitespace-nowrap font-medium'>
        {item.name}
      </span>
      <span className='text-gray-500'>{item.style}</span>
      {isMobile && <span className=' font-bold'>${item.price}</span>}
    </span>
  );
};

export default ProductTableCell;
