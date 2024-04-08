import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../config/firebase';

const LogoutBtn = () => {
  const logout = async (e) => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button onClick={logout} className='mt-5 text-red-500 underline'>
      Log out
    </button>
  );
};

export default LogoutBtn;
