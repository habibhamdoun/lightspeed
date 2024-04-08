'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const CartDisplay = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-64 h-full bg-white shadow-md z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <button className='absolute top-0 left-0 p-4' onClick={onClose}>
        <Image
          src={'/assets/sidePanelClose.svg'}
          alt='toggle side panel'
          width={20}
          height={20}
        />
      </button>
      <div className='p-4 flex flex-col gap-8 mt-8'>cart content</div>
    </div>
  );
};

export default CartDisplay;
