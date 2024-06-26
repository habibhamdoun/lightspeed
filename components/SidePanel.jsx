'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import LogoutBtn from './LogoutBtn';
import { useEffect, useState } from 'react';
import { auth } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import IsloggedIn from './IsloggedIn';

const SidePanel = ({ isOpen, onClose }) => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user
          .reload()
          .then(() => {
            // console.log('User data after reload:', user);
            setUserData(user);
          })
          .catch((error) => {
            console.error('Error reloading user data:', error);
          });
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <section>
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
        className={`fixed text-black top-0 left-0 w-64 h-full bg-white shadow-md z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button className='absolute top-0 right-0 p-4' onClick={onClose}>
          <Image
            src={'/assets/sidePanelClose.svg'}
            alt='toggle side panel'
            width={20}
            height={20}
          />
        </button>
        <div className='p-4 flex flex-col gap-8 mt-8'>
          <motion.a
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            href='/home'
            className='block border-b-2 p-2'
          >
            <h3 className='tracking-wider text-2xl'>Home</h3>
          </motion.a>
          <motion.a
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            href='/shop'
            className='block border-b-2 p-2'
          >
            <h3 className='tracking-wider text-2xl'>Shop</h3>
          </motion.a>
          <motion.a
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            href='/checkout'
            className='block border-b-2 p-2'
          >
            <h3 className='tracking-wider text-2xl'>Checkout</h3>
          </motion.a>
          <motion.a
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            href='/login'
            className='block border-b-2 p-2'
          >
            <h3 className='tracking-wider text-2xl'>Log in</h3>
          </motion.a>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className='mt-5 text-red-500 underline'
          >
            <LogoutBtn />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <IsloggedIn />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SidePanel;
