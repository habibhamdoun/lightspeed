'use client';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/context';
import Image from 'next/image';
import items from '@/data/items.json';

const OrderSummary = ({ isCart, cartDetails }) => {
  const { cart, removeFromCart, addToCart, removeAll, itemCount } =
    useAppContext();

  return (
    <section>
      {cartDetails?.map((item) => (
        <div
          key={item.id}
          className={`flex ${
            !isCart ? 'flex-row' : 'flex-col md:flex-row'
          } justify-center items-center mb-4 p-3`}
        >
          <Image
            src={item.images[0]}
            alt={item.name}
            width={64}
            height={64}
            className='mb-2'
          />
          <div className='flex justify-between w-full mx-5'>
            <div className='flex flex-col w-full'>
              <span className='text-lg font-semibold'>{item.name}</span>
              <span className='text-lg font-light text-gray-400'>
                {item.style}
              </span>
              <div className='flex items-center mt-2'>
                <div
                  className={`flex w-full ${
                    !isCart
                      ? 'flex-row justify-start'
                      : 'flex-col md:flex-row justify-center'
                  }   items-center gap-4 md:justify-start`}
                >
                  <div className='border-[1px] border-gray-500 rounded-2xl px-2 flex'>
                    <button
                      onClick={() => {
                        removeFromCart(
                          item.id,
                          item.selectedVariant
                            ? item.selectedVariant.name
                            : 'Default',
                          item.size ? item.size : 'Default',
                        );
                      }}
                      className='text-lg px-1 w-5 h-full rounded-full hover:bg-gray-200 transition-colors duration-300'
                    >
                      -
                    </button>
                    <span className='text-lg mx-2'>{item.quantity}</span>{' '}
                    <button
                      onClick={() => {
                        addToCart(
                          item.id,
                          item.selectedVariant.name,
                          item.size,
                        );
                      }}
                      className='text-lg px-1 w-5 h-full rounded-full hover:bg-gray-200 transition-colors duration-300'
                    >
                      +
                    </button>
                  </div>
                  <div className='flex items-center gap-5'>
                    <button
                      onClick={() => {
                        removeAll(item.id);
                      }}
                      className='text-lg px-2'
                    >
                      <Image
                        src={'/assets/trash.svg'}
                        width={15}
                        height={15}
                        className='w-4 h-4'
                      ></Image>
                    </button>
                    <div
                      style={{ backgroundColor: item.selectedVariant?.color }}
                      className='w-4 h-4 border-2 rounded-full flex items-center justify-center '
                    ></div>
                    <div className='font-bold text-xs uppercase border-2 p-1 rounded-full aspect-square'>
                      {item.size}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span className='font-bold'>${item.price}</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default OrderSummary;
