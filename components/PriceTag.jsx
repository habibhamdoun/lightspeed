import React, { useState } from 'react';
import rate from '@/data/rate.json';
import PriceDisplay from './PriceDisplay';

const PriceTag = ({ price, discount }) => {
  const [priceType, setPriceType] = useState('USD');

  return (
    <div className='flex gap-2'>
      <select
        className='p-2 border rounded-md'
        onChange={(e) => {
          setPriceType(e.target.value);
        }}
      >
        <option key={'USD'} value={'USD'}>
          🇺🇸
        </option>
        <option key={'LBP'} value={'LBP'}>
          🇱🇧
        </option>
      </select>
      <PriceDisplay price={price} priceType={priceType} discount={discount} />
    </div>
  );
};

export default PriceTag;
