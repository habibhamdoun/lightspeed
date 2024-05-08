'use client';
import { auth } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';

const IsloggedIn = () => {
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
    <>
      {userData ? (
        <p className='text-sm'>
          Logged in as: {userData.email}.{' '}
          {!userData.emailVerified && 'Not Verified'}
        </p>
      ) : (
        <p>Not logged in.</p>
      )}
    </>
  );
};

export default IsloggedIn;
