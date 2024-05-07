'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import DashBoardSection from './DashBoardSection';
import DashBoardSidePanel from './DashBoardSidePanel';

const DashBoard = () => {
  const management = [
    { name: 'Products', iconUrl: '/assets/productsIcon.svg' },
    { name: 'Users', iconUrl: '/assets/usersIcon.svg' },
  ];
  const [selectedSection, setSelectedSection] = useState(management[0].name);

  return (
    <section className='flex gap-2'>
      <DashBoardSidePanel
        management={management}
        setSelectedSection={setSelectedSection}
      />
      <section>
        {management.map((item) => {
          return (
            selectedSection == item.name && (
              <DashBoardSection title={selectedSection} />
            )
          );
        })}
      </section>
    </section>
  );
};

export default DashBoard;