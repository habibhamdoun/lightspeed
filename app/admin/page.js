'use client';
import DashBoard from '@/components/DashBoard';
import { auth } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';

const page = () => {
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
      {userData && userData.email == 'habibhamdoun@gmail.com' ? (
        <DashBoard />
      ) : (
        <div>Only Admins can access this page</div>
      )}
    </>
  );
};

export default page;
