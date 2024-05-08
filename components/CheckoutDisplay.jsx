'use client';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/context';
import PriceTag from './PriceTag';
import Image from 'next/image';
import items from '@/data/items.json';
import OrderSummary from './OrderSummary';
import OrderModal from './OrderModal';
import CompleteModal from './CompleteModal';
import { useRouter } from 'next/navigation';
import { useScreenSize } from '@/hooks';

const CheckoutDisplay = () => {
  const currentDate = new Date();
  const day = currentDate.getDay();
  const month = currentDate.getMonth();
  const fulldate = month + '/' + day;
  const [date, setDate] = useState(fulldate);
  const { cart, subtotal, emptyCart, itemCount } = useAppContext();
  const [cartDetails, setCartDetails] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState();
  const [complete, setComplete] = useState(false);
  const { screenSize } = useScreenSize();
  const [discount, setDiscount] = useState(false);
  const route = useRouter();
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    emptyCart();
    resetInputs();
    route.push('/home');
  };
  const toggleComplete = () => {
    setComplete((prev) => !prev);
  };
  const completeDone = () => {
    setComplete(true);
    setTimeout(() => {
      setComplete(false), setIsOpen(true);
    }, 3000);
  };
  useEffect(() => {
    // cart.map((item) => console.log('Cart item: ' + JSON.stringify(item)));
    const loadCartDetails = async () => {
      const itemCounts = cart.reduce((acc, item) => {
        const key = `${item.itemId}-${item.variantName}-${item.size}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      const detailedItemsPromises = Object.keys(itemCounts).map(async (key) => {
        const [itemId, variantName, size] = key.split('-');
        const itemData = await items.find((itemData) => itemData.id === itemId);

        if (!itemData) {
          return null;
        }
        const variants = Array.isArray(itemData.variants)
          ? itemData.variants
          : [];
        const variant = variants.find((v) => v.name === variantName);
        return {
          ...itemData,
          selectedVariant: variant,
          size,
          quantity: itemCounts[key],
        };
      });

      const detailedItems = await Promise.all(detailedItemsPromises);
      setCartDetails(detailedItems.filter(Boolean));
    };

    loadCartDetails();
    // console.log('itemCount: ' + itemCount);

    if (itemCount >= 3) {
      setDiscount(true);
    } else {
      setDiscount(false);
    }
  }, [cart, itemCount]);
  const resetInputs = () => {
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setComment('');
  };
  const generateDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDay();
    const month = currentDate.getMonth();
    const fulldate = month + '/' + day;

    setDate(fulldate);
  };
  const handleCheckout = async (e) => {
    e.preventDefault();
    if (subtotal == 0) return setError('Cart is empty!');
    setError('');
    setLoading(true);
    generateDate();
    setLoading(false);
    completeDone();
  };
  return (
    <section>
      {isOpen && (
        <OrderModal
          name={name}
          address={address}
          phone={phone}
          comments={comment}
          email={email}
          toggleOpen={toggleOpen}
          cartDetails={cartDetails}
          subtotal={subtotal}
          date={date.toString()}
        />
      )}
      {complete && <CompleteModal toggleOpen={toggleComplete} />}
      <div className='flex items-end justify-center pt-2 pl-4'>
        <div className='container mx-auto pl-4'>
          <h1 className='text-2xl font-bold mb-4'>Checkout</h1>
          <form onSubmit={handleCheckout} className='mb-4'>
            <div className='mb-4'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Name:
              </label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm'
                required
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email:
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm'
                required
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='phone'
                className='block text-sm font-medium text-gray-700'
              >
                Phone Number:
              </label>
              <input
                type='text'
                pattern='\d*'
                id='phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, '');
                }}
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm'
                required
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='address'
                className='block text-sm font-medium text-gray-700'
              >
                Address:
              </label>
              <textarea
                id='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm'
                rows='4'
                required
              ></textarea>
            </div>
            <div className='mb-4'>
              <label
                htmlFor='address'
                className='block text-sm font-medium text-gray-700'
              >
                Comments:
              </label>
              <textarea
                id='comment'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm'
                rows='1'
                required
              ></textarea>
            </div>
            <div className='mb-4'>
              <h2 className='text-2xl mb-2 font-semibold'>Order Summary</h2>
              {error && <p className='text-red-600 text-lg'>{error}</p>}
              <div className='max-h-[300px] overflow-y-scroll'>
                <OrderSummary isCart={true} cartDetails={cartDetails} />
              </div>
              {cartDetails?.length > 0 && (
                <div className='w-full flex justify-end'>
                  <button
                    className='text-red-500 underline'
                    onClick={emptyCart}
                  >
                    <Image
                      src={'/assets/emptyCart.svg'}
                      width={40}
                      height={40}
                      className='m-4'
                      alt='empty cart'
                    />
                  </button>
                </div>
              )}
              <span>
                <h2 className='font-bold mb-2'>Subtotal:</h2>
                <PriceTag price={subtotal} discount={discount} />
              </span>
            </div>
            <button
              type='submit'
              onClick={() => {
                generateDate;
              }}
              className='w-full bg-main text-white py-2 px-4  hover:bg-[#652123] transition-colors duration-300'
            >
              {isLoading ? (
                <h2 className='text-xl text-black font-semibold'>Sending...</h2>
              ) : (
                <h2 className='text-xl text-black font-semibold'>
                  Complete Checkout
                </h2>
              )}
            </button>
          </form>
        </div>
        <Image
          alt='side picture'
          src={'/assets/sideImageMobile.png'}
          width={1000}
          height={1000}
          className='bg-cover w-[75vw] md:w-[40vw]'
        ></Image>
      </div>
    </section>
  );
};

export default CheckoutDisplay;
