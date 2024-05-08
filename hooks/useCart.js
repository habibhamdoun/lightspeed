'use client';
import { useState, useEffect } from 'react';
import items from '@/data/items.json';
// import { logEvent } from 'firebase/analytics';
// import { analytics } from '@/lib/firebase';

// TODO: Add analytics

const useCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (itemId, variantName, size) => {
    const updatedCart = [...cart, { itemId, variantName, size }];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (itemId, variantName, size) => {
    let removed = false;
    const updatedCart = cart.filter((item) => {
      if (
        item.itemId === itemId &&
        item.variantName === variantName &&
        item.size === size &&
        !removed
      ) {
        removed = true;
        return false;
      } else {
        return true;
      }
    });

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const subtotal = cart.reduce((total, cartItem) => {
    const item = items.find((item) => item.id === cartItem.itemId);

    if (item) {
      const price = parseFloat(item.price);
      const quantity = cartItem.quantity || 1;
      total += price * quantity;
    }

    return total;
  }, 0);

  const removeAll = (itemId, variantName) => {
    const updatedCart = cart.filter(
      (item) => !(item.itemId === itemId && item.variantName === variantName),
    );

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  const itemCount = cart.length;

  const emptyCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    itemCount,
    subtotal,
    removeAll,
    emptyCart,
  };
};

export default useCart;
