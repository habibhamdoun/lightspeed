import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import PriceTag from './PriceTag';

const OrderModal = ({
  toggleOpen,
  name,
  address,
  phone,
  email,
  comments,
  cartDetails,
  subtotal,
  date,
}) => {
  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center'>
      <AnimatePresence>
        <motion.div
          key='modal'
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.75 }}
          transition={{ duration: 0.3 }}
          className='bg-white p-6 w-full max-w-md rounded-lg shadow-md'
        >
          <button onClick={toggleOpen} className='text-2xl'>
            &times;
          </button>
          <div className='flex flex-col mb-4'>
            <h2 className='text-2xl font-bold text-center'>Order Summary</h2>
            <div className='overflow-y-scroll max-h-[300px]'>
              <div className=''>
                <h3>Name:</h3>
                <p>{name}</p>
              </div>
              <div className=''>
                <h3>Email:</h3>
                <p className='break-words'>{email}</p>
              </div>
              <div className=''>
                <h3>phone:</h3>
                <p className='break-words'>{phone}</p>
              </div>
              <div className=''>
                <h3>address:</h3>
                <p className='break-words'>{address}</p>
              </div>
              <div className=''>
                <h3>comments:</h3>
                <p className='break-words'>{comments}</p>
              </div>
              <h2>Order:</h2>
              <div>
                {cartDetails?.map((item) => (
                  <div key={item.id} className='flex  items-center mb-4'>
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      width={64}
                      height={64}
                      className='mb-2'
                    />
                    <div className='flex justify-between w-full mx-5'>
                      <div className='flex flex-col gap-2'>
                        <span className='text-lg font-semibold'>
                          {item.name}
                        </span>
                        <span className='text-lg font-light text-gray-400'>
                          {item.style}
                        </span>
                        {item.variant && (
                          <div className='flex items-center gap-2'>
                            <p>Variant:</p>
                            <span
                              style={{
                                backgroundColor: item.selectedVariant?.color,
                              }}
                              className='w-4 h-4 border-2 rounded-full flex items-center justify-center '
                            ></span>
                          </div>
                        )}{' '}
                        {item.size && (
                          <div className='font-bold h-8 w-8 text-xs uppercase border-2 p-1 rounded-full aspect-square'>
                            {item.size}
                          </div>
                        )}
                        <span className='font-bold'>${item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h2>date:</h2> {date}
          </div>
          <div>
            <h2>Subtotal:</h2>
            <PriceTag price={subtotal} />
          </div>
          <div className='w-full flex justify-center items-center'>
            <button
              onClick={toggleOpen}
              className='text-3xl  bg-main text-white py-2 px-4  hover:bg-[#652123] transition-colors duration-300'
            >
              <h3>Done</h3>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OrderModal;
