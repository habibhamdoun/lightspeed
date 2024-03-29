'use client';
import Image from 'next/image';
import React from 'react';
import fb from '../../public/assets/facebookIcon.svg';
import insta from '../../public/assets/insatgramIcon.svg';
import tiktok from '../../public/assets/tiktokIcon.svg';

const Footer = () => {
  return (
    <footer className='flex flex-col gap-5 p-3 bg-gray-950 mt-4'>
      <div>
        <h3 className='text-white text-2xl'>ABOUT THIS SHOP</h3>
        <p className='text-white'>
          "Welcome to Lightspeed - Your Ultimate Destination for Premium
          Sportswear. Dive into our world of high-performance apparel designed
          for the modern athlete. Every piece in our collection is crafted to
          empower your fitness journey, blending cutting-edge technology with
          unmatched style. Lightspeed is more than just a brand; it's a
          commitment to excellence, speed, and pushing the boundaries of what's
          possible. Gear up with us, and experience the difference in every run,
          every game, and every challenge. Join the Lightspeed movement today
          and redefine your limits."
        </p>
      </div>
      <div className='flex flex-col gap-2 text-white '>
        <h3 className='text-white text-2xl'>MENU</h3>
        <a href='/contact'>Contact Us</a>
        <a href=''>Refund Policy</a>
        <a href=''>Terms of Service</a>
        <a href=''>Shipping Policy</a>
        <a href=''>Privacy Policy</a>
      </div>
      <div>
        <h3 className='pb-2 text-white text-2xl'>CONTACT</h3>
        <div className='flex gap-2'>
          <div className='border-2 border-white rounded-full p-2 flex justify-center items-center'>
            <a href='/facebooklink'>
              <Image src={fb} className='w-5 h-5' alt='facebook icon'></Image>
            </a>
          </div>
          <div className='border-2  border-white rounded-full p-2 flex justify-center items-center'>
            <a href='/instalink'>
              <Image
                src={insta}
                className='w-5 h-5'
                alt='instagram icon'
              ></Image>
            </a>
          </div>
          <div className='border-2 border-white rounded-full p-2 flex justify-center items-center'>
            <a href='/tiktoklink'>
              <Image src={tiktok} className='w-5 h-5' alt='tiktok icon'></Image>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
