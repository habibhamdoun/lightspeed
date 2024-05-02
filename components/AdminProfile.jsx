import Image from 'next/image';
import React from 'react';

const AdminProfile = () => {
  return (
    <>
      <div className='bg-[#F6F7F9] rounded-md flex items-center gap-4 p-2 '>
        <div>
          <Image
            src={'/assets/profile.webp'}
            width={40}
            height={40}
            className='rounded-full aspect-square h-full w-full'
          />
        </div>
        <div>
          <h3 className='lg:text-xl text-sm font-semibold'>Name Here</h3>
          <p className='text-xs text-gray-500'>Admin</p>
        </div>
      </div>
      ;
    </>
  );
};

export default AdminProfile;
