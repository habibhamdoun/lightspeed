import React from 'react';
import Image from 'next/image';
import AdminProfile from './AdminProfile';
import DashBoardIItem from './DashBoardIItem';
const DashBoardSidePanel = ({ setSelectedSection, management }) => {
  const handleSelectSection = (section) => {
    setSelectedSection(section);
  };
  return (
    <article className='w-fit bg-black rounded-r-lg shadow-sm p-4 flex flex-col gap-4'>
      <div>
        <Image
          src={'/assets/logowithTextWhiteCropped.png'}
          width={100}
          height={100}
          className='w-[60%]'
        />
      </div>
      <div>
        <AdminProfile />
      </div>
      <div className='flex flex-col gap-3'>
        <h3 className='text-white font-bold'>Management</h3>
        <div className='flex  flex-col gap-2 p-2'>
          {management.map((item) => {
            return (
              <div key={item.name}>
                <DashBoardIItem
                  name={item.name}
                  src={item.iconUrl}
                  handleSelectSection={() => handleSelectSection(item.name)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
};

export default DashBoardSidePanel;
