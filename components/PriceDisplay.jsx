import React from 'react';

const PriceDisplay = ({ priceType, price, discount }) => {
  return (
    <>
      {priceType == 'USD' ? (
        <div className={`font-bold text-lg m-1 `}>
          {' '}
          <span className={`${discount && 'line-through'} mx-2`}>
            ${parseFloat(price).toFixed(2)}
          </span>
          {discount && '$' + parseFloat((price * 90) / 100).toFixed(2)}
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
    </>
  );
};

export default PriceDisplay;
