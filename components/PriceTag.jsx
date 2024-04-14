'use client';
import React from 'react';
import rate from '@/data/rate.json';

const PriceTag = ({ priceType, setPriceType, price }) => {
  return (
    <div className='flex gap-2'>
      <select
        className='p-2 border rounded-md text-black'
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
      {priceType == 'USD' ? (
        <div className='font-bold text-lg m-1 text-black'>
          {price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </div>
      ) : (
        <div className='font-bold text-lg m-1'>
          {(price * parseInt(rate.rate)).toLocaleString('en-LB', {
            style: 'currency',
            currency: 'LBP',
            minimumFractionDigits: 0,
          })}
        </div>
      )}
    </div>
  );
};

export default PriceTag;
