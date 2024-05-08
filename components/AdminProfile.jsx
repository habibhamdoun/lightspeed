'use client';
import { auth } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const AdminProfile = () => {
  const [userData, setUserData] = useState();
  const [name, setName] = useState();
  useEffect(() => {
    const getName = () => {
      let idx = userData?.email.indexOf('@');
      let name = userData?.email.substring(0, idx);
      setName(name);
    };
    getName(), [userData];
  });
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user
          .reload()
          .then(() => {
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
    <>
      <div className='bg-[#F6F7F9] w-fit rounded-md flex items-center gap-4 p-2 '>
        <div>
          <Image
            src={'/assets/profile.webp'}
            width={40}
            height={40}
            className='rounded-full aspect-square h-full w-full'
          />
        </div>
        <div>
          <h3 className='lg:text-xl text-sm font-semibold'>{name}</h3>
          <p className='text-xs text-gray-500'>Admin</p>
        </div>
      </div>
      ;
    </>
  );
};

export default AdminProfile;
