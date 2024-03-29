'use client';
import React, { useState } from 'react';

const LoginDisplay = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleCheckout = async (e) => {
    // TODO: Masrshoud put ur function here
  };

  return (
    <section className='container mx-auto px-4 my-36'>
      <h1 className='text-2xl font-bold mb-4 text-black text-center'>Login</h1>
      <form onSubmit={handleCheckout} className='mb-4'>
        <div className='flex flex-col w-full items-center justify-center'>
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
              className='mt-1 block w-[50vw] md:w-[30vw]  p-2 border border-gray-300 rounded-md shadow-sm'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Password:
            </label>
            <input
              type='text'
              id='name'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mt-1 block w-[50vw] md:w-[30vw] p-2 border border-gray-300 rounded-md shadow-sm'
              required
            />
          </div>
          <div className='text-black'>
            don't have an account?{' '}
            <a href='/createAccount' className='text-[#0000EE] underline'>
              create account
            </a>
          </div>
          <button
            type='submit'
            className=' bg-main text-black py-2 px-4 rounded text-xl font-semibold mt-2'
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginDisplay;
