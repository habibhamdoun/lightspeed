import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

const CompleteModal = ({ text, toggleOpen }) => {
  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center '>
      <AnimatePresence>
        <motion.div
          key='modal'
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.75 }}
          transition={{ duration: 0.3 }}
          className='bg-white p-6 w-[95vw] max-w-md rounded-lg shadow-md'
        >
          <h2 className='text-center text-5xl'>{text}</h2>
          <div className='flex flex-col items-center justify-end h-full mt-[30px]'>
            <button
              onClick={toggleOpen}
              className='text-3xl  bg-main text-white py-2 px-4  hover:bg-black  hover:text-main transition-colors duration-300'
            >
              <h3>Done</h3>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CompleteModal;
