'use client';
import Image from 'next/image';
// import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import items from '@/data/items.json';
// import rate from '@/data/rate.json';
import { useAppContext } from '@/context';
// import PriceTag from './PriceTag';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// TODO: add circle around + and - and add a trash icon to instantly remove element.
const CartDisplay = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, addToCart, subtotal } = useAppContext();
  const router = useRouter();
  const [cartDetails, setCartDetails] = useState([]);
  const [priceType, setPriceType] = useState('USD');
  useEffect(() => {
    // const emptyCart = () => {
    //   for (let i = 0; i < cart.length; i++) {
    //     removeFromCart(cart[i]);
    //   }
    // };
    // emptyCart();
    const loadCartDetails = () => {
      const itemCounts = cart.reduce((acc, itemId) => {
        acc[itemId] = (acc[itemId] || 0) + 1;
        return acc;
      }, {});

      const detailedItems = Object.keys(itemCounts).map((itemId) => {
        const item = items.find((itemData) => itemData.id === itemId);
        return {
          ...item,
          quantity: itemCounts[itemId],
        };
      });

      setCartDetails(detailedItems);
      console.log('cartDetails');
      console.log(cartDetails);
    };

    loadCartDetails();
  }, [cart]);

  const handleCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  return (
    <div className={`${isOpen ? 'overscroll-none' : ''} `}>
      {isOpen && (
        <motion.div
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ duration: 0.5 }}
          className='fixed top-0 left-0 w-full h-full bg-black z-20 '
        ></motion.div>
      )}
      <div
        className={`fixed top-0 right-0 w-full md:w-[30vw] md:min-w-[500px] h-full bg-white shadow-md z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex items-center justify-center'>
          <h3 className='text-center p-5 font-semibold text-3xl '>
            Shopp<span className='gradient-main-rtol'>ing Ca</span>rt
          </h3>
          <button className='ml-auto p-5' onClick={onClose}>
            <Image
              src={'/assets/sidePanelClose.svg'}
              alt='toggle side panel'
              width={20}
              height={20}
            />
          </button>
        </div>
        <main className='h-[90vh] flex flex-col gap-4 justify-between px-5'>
          <div className='mt-[5vh] overflow-y-scroll'>
            {cartDetails.length > 0 ? (
              cartDetails.map((item) => (
                <div key={item.id} className='flex'>
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    width={100}
                    height={100}
                    className='rounded-sm mr-2'
                  />
                  {/* <span className='text-sm'>{item.options}</span> */}
                  <div className='flex flex-col w-full justify-between'>
                    <span className='text-lg font-semibold'>{item.name}</span>
                    <span className='text-md font-light text-gray-400'>
                      {item.style}
                    </span>
                    <div className='flex w-full justify-between items-center'>
                      <div className='flex border-[1px] border-gray-500 rounded-2xl px-2'>
                        <button
                          onClick={() => {
                            removeFromCart(item.id);
                          }}
                          className='text-lg px-1 w-5 h-full rounded-full hover:bg-gray-200 transition-colors duration-300'
                        >
                          -
                        </button>
                        <span className='text-lg mx-2'>{item.quantity}</span>{' '}
                        <button
                          onClick={() => {
                            addToCart(item.id);
                          }}
                          className='text-lg px-1 w-5 h-full rounded-full hover:bg-gray-200 transition-colors duration-300'
                        >
                          +
                        </button>{' '}
                      </div>
                      <span className='text-lg font-semibold mt-2'>
                        <p className='font-bold text-lg m-1'>
                          {item.price.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                          $
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center'>Your cart is empty.</div>
            )}
          </div>
          <div className='border-t mt-4 py-4'>
            <div className='flex justify-between items-center'>
              <span className='text-lg font-semibold py-2'>SUBTOTAL: </span>
              <span className='text-lg font-semibold'>
                <div className=' flex items-center justify-center font-bold text-lg text-black'>
                  {/* <PriceTag
                    priceType={priceType}
                    setPriceType={setPriceType}
                    price={price}
                  /> */}
                  {subtotal.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </span>{' '}
            </div>
            <div className='flex flex-col '>
              <button
                onClick={handleCheckout}
                className='gradient-bg-main-rtol text-black w-full py-2 rounded-lg shadow transition duration-500'
              >
                <h2 className='text-xl'>CHECK OUT</h2>
              </button>
              <button
                onClick={() => isOpen(!isOpen)}
                className='mt-4 bg-gray-300 text-black w-full py-2 rounded-lg shadow hover:bg-gray-400 transition duration-500'
              >
                <h3 className='text-xl'>CONTINUE SHOPPING</h3>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CartDisplay;
