'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const VerifyEmail = ({ auth, checkEmailVerification }) => {
  return (
    <div className='w-full flex flex-col gap-3 items-center justify-center my-44'>
      <h3 className='font-bold text-2xl'>Verify Your Email</h3>
      <p>check your inbox for a link to verify your account.</p>
      <Image
        src={'/assets/emailVerifyIcon.svg'}
        width={60}
        height={60}
        alt='verify email'
      />

      <button
        type='button'
        onClick={checkEmailVerification}
        className='bg-main text-black py-2 px-4 rounded text-xl font-semibold mt-2 hover:bg-black hover:text-main transition-colors duration-300'
      >
        Already Verified
      </button>
    </div>
  );
};

export default VerifyEmail;
