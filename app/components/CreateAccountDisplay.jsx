'use client';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';

const CreateAccountDisplay = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleCreateAccount = async (e) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };
  const signUpWithGoogle = async (e) => {
    // TODO: Masrshoud put ur function here
  };

  return (
    <section className='container mx-auto px-4 my-36'>
      <h1 className='text-2xl font-bold mb-4 text-black text-center'>
        Create Account
      </h1>
      <form onSubmit={handleCreateAccount} className='mb-4'>
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
              className='mt-1 block w-[50vw] md:w-[30vw] text-black  p-2 border border-gray-300 rounded-md shadow-sm'
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
              className='mt-1 text-black block w-[50vw] md:w-[30vw] p-2 border border-gray-300 rounded-md shadow-sm'
              required
            />
          </div>
          <div className='text-black'>
            already have an account?{' '}
            <a href='/login' className='text-[#0000EE] underline'>
              login
            </a>
          </div>
          <button
            type='submit'
            className=' bg-main text-black py-2 px-4 rounded text-xl font-semibold mt-2'
          >
            Submit
          </button>
          <p className='text-black font-bold text-center my-5'>Or</p>
          <div class='px-6 sm:px-0 max-w-sm'>
            <button
              type='button'
              onClick={signUpWithGoogle}
              class='text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2'
            >
              <svg
                class='mr-2 -ml-1 w-4 h-4'
                aria-hidden='true'
                focusable='false'
                data-prefix='fab'
                data-icon='google'
                role='img'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 488 512'
              >
                <path
                  fill='currentColor'
                  d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'
                ></path>
              </svg>
              Sign Up with Google
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreateAccountDisplay;
