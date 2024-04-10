'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const Search = ({ setBrand, setStyle }) => {
  const searchParams = useSearchParams();
  const searchBrand = searchParams.get('brand');
  const searchStyle = searchParams.get('style');
  console.log('search brand: ' + searchBrand);
  console.log('search style: ' + searchStyle);
  useEffect(() => {
    if (searchBrand) {
      setBrand(searchBrand);
    } else setBrand('all');
    if (searchStyle) {
      setStyle(searchStyle);
    } else setStyle('all');
  }, []);
  return;
};

export default Search;
