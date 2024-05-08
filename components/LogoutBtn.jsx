import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '@/config/firebase';
import { useRouter } from 'next/navigation';

const LogoutBtn = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const logout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      // console.log("Logged out successfully");
      setError('');
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to log out. Please try again.');
    }
    router.push('/home');
  };

  return (
    <div>
      <button
        onClick={logout}
        className='mt-5 text-red-500 underline hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
      >
        Log out
      </button>
      {error && <p className='text-red-500 text-xs italic'>{error}</p>}
    </div>
  );
};

export default LogoutBtn;
