'use client';
import React, { useEffect, useState } from 'react';
import items from '@/data/items.json';
import Image from 'next/image';
import ProductTable from './ProductTable';
const DashBoardSection = ({ title }) => {
  const [itemsData, setItemsData] = useState([]);
  useEffect(() => {
    const loadItemData = async () => {
      const itemDetails = await items;
      setItemsData(itemDetails);
    };
    loadItemData;
  }, []);
  return (
    <section>
      <h3 className='text-black text-2xl font-semibold p-5'>{title}:</h3>
      <main>{title == 'Products' && <ProductTable />}</main>
    </section>
  );
};

export default DashBoardSection;
