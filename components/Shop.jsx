'use client';
import React, { useState, Suspense, useEffect } from 'react';
import items from '@/data/items.json';
import SidePanelFilter from './SidePanelFilter';
import Image from 'next/image';
import Item from './Item';
import SortingBtn from './SortingBtn';
import Search from './Search';
import { getAllProducts } from '@/config/firebase';

const Shop = () => {
  const [brand, setBrand] = useState('all');
  const [style, setStyle] = useState('all');
  const [option, setOption] = useState('default');
  const [itemsDisplay, setItemsDisplay] = useState([]);

  const getSortedItems = (items, option) => {
    switch (option) {
      case 'Price: Low to High':
        return [...items].sort((a, b) => parseInt(a.price) - parseInt(b.price));
      case 'Price: High to Low':
        return [...items].sort((a, b) => b.price - a.price);
      case 'Newest Arrivals':
        return [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'Featured':
      default:
        return [...items].sort((a, b) =>
          a.featured === b.featured ? 0 : a.featured ? -1 : 1,
        );
    }
  };
  useEffect(() => {
    const displayProducts = async () => {
      const itemsData = await getAllProducts();
      setItemsDisplay(itemsData);
      console.log('itemsData: ' + JSON.stringify(itemsData));
    };
    displayProducts();
  });
  const sortedItems = getSortedItems(itemsDisplay, option);
  return (
    <section className='flex flex-col'>
      <Suspense>
        <Search setBrand={setBrand} setStyle={setStyle} />
      </Suspense>
      <div className='flex flex-col sm:flex-row items-center justify-center gap-2 py-7'>
        <SidePanelFilter
          brand={brand}
          style={style}
          setBrand={setBrand}
          setStyle={setStyle}
        />
        <SortingBtn option={option} setOption={setOption} />
      </div>

      <div className='flex items-center justify-center gap-8 flex-wrap'>
        {sortedItems
          .filter(
            (item) =>
              (brand === 'all' || item.brand === brand) &&
              (style === 'all' || item.style === style),
          )
          .map((item) => (
            <Item item={item} />
          ))}
        {sortedItems
          .filter(
            (item) =>
              (brand === 'all' || item.brand === brand) &&
              (style === 'all' || item.style === style),
          )
          .map((item) => <Item item={item} />).length == 0 && (
          <div className='flex flex-col items-center justify-center gap-4 text-black'>
            <p>Sorry, there are no products in this collection</p>
            <Image
              src={'/assets/heartCrack.svg'}
              alt='heartCrack'
              width={32}
              height={32}
              className='w-8 h-8'
            ></Image>
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
