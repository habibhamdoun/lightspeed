import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';

const NavList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const handleCheckout = () => {
    if (!userData || !userData.emailVerified) {
      router.push('/login');
    } else {
      router.push('/checkout');
    }
  };
  const [userData, setUserData] = useState();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user
          .reload()
          .then(() => {
            console.log('User data after reload:', user);
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
    <div className='p-4 flex gap-8 justify-center items-center'>
      <a href='/home' className='p-2 text-black group'>
        <h3
          className={`tracking-wider text-2xl ${
            pathname != '/home'
              ? 'hover-underline-animation'
              : 'border-main border-b-2'
          }`}
        >
          Home
        </h3>
      </a>
      <a href='/shop' className='p-2 text-black group'>
        <h3
          className={`tracking-wider text-2xl ${
            pathname != '/shop'
              ? 'hover-underline-animation'
              : 'border-main border-b-2'
          }`}
        >
          Shop
        </h3>
      </a>
      <button onClick={handleCheckout} className='p-2 text-black group'>
        <h3
          className={`tracking-wider text-2xl ${
            pathname != '/checkout'
              ? 'hover-underline-animation'
              : 'border-main border-b-2'
          }`}
        >
          Checkout
        </h3>
      </button>
      <a href='/login' className='p-2 text-black group'>
        <h3
          className={`tracking-wider text-2xl ${
            pathname != '/universe'
              ? 'hover-underline-animation'
              : 'border-main border-b-2'
          }`}
        >
          Log in
        </h3>
      </a>
    </div>
  );
};

export default NavList;
