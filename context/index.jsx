'use client';
import useCart from '@/hooks/useCart';
import React, { createContext, useContext } from 'react';
const AppContext = createContext();

export function AppWrapper({ children }) {
  const { cart, setCart, itemCount, addToCart, removeFromCart, subtotal } =
    useCart();
  const contextValue = {
    cart,
    setCart,
    itemCount,
    addToCart,
    removeFromCart,
    subtotal,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
