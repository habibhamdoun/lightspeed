'use client';
import { useState, useEffect } from 'react';
import items from '@/data/items.json';

const useCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (itemId) => {
    const updatedCart = [...cart, itemId];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (itemId) => {
    let removed = false;
    const updatedCart = cart.filter((item) => {
      if (item !== itemId || removed) {
        return true;
      } else {
        removed = true;
        return false;
      }
    });

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  const subtotal = cart.reduce((total, itemId) => {
    const item = items.find((item) => item.id === itemId);
    return total + (item ? parseFloat(item.price) : 0);
  }, 0);

  const itemCount = cart.length;

  return { cart, addToCart, removeFromCart, itemCount, subtotal };
};

export default useCart;
