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
import OrderSummary from './OrderSummary';

const CartDisplay = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, addToCart, subtotal, itemCount, emptyCart } =
    useAppContext();
  const router = useRouter();
  const [cartDetails, setCartDetails] = useState([]);
  const [priceType, setPriceType] = useState('USD');
  const [dicsount, setDiscount] = useState(false);

  useEffect(() => {
    cart.map((item) => console.log('Cart item: ' + JSON.stringify(item)));
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
    console.log('itemCount: ' + itemCount);

    if (itemCount >= 3) {
      setDiscount(true);
    } else {
      setDiscount(false);
    }
  }, [cart, itemCount]);

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
        <main className='h-[90vh] flex flex-col justify-between px-5'>
          <div className='mt-[5vh] overflow-y-scroll h-full flex flex-col gap-3'>
            {cartDetails.length > 0 ? (
              <OrderSummary cartDetails={cartDetails} />
            ) : (
              <div className='text-center'>Your cart is empty.</div>
            )}
          </div>
          {cartDetails?.length > 0 && (
            <div className='w-full flex justify-end'>
              <button className='text-red-500 underline' onClick={emptyCart}>
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
          <div className='border-t mt-4 py-4'>
            <div className='flex justify-between items-center'>
              <span className='text-lg font-semibold py-2'>SUBTOTAL: </span>
              <span className='text-lg font-semibold'>
                <div className=' flex items-center justify-center font-bold text-lg text-black'>
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
