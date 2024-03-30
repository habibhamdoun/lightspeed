import React from 'react';

const LogoutBtn = () => {
  const logout = async (e) => {
    // TODO: Masrshoud put ur function here
  };
  return (
    <button onClick={logout} className='mt-5 text-red-500 underline'>
      Log out
    </button>
  );
};

export default LogoutBtn;
