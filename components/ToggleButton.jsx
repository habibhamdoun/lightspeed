'use client';
import Image from 'next/image';

const ToggleButton = ({ onToggle }) => {
  return (
    <button
      className='p-2 text-white bg-transparent  rounded z-40'
      onClick={onToggle}
    >
      <Image
        src={'/assets/sidePanelBtn.svg'}
        alt='toggle side panel'
        width={30}
        height={30}
      />
    </button>
  );
};

export default ToggleButton;
