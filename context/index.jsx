'use client';
import useCart from '@/hooks/useCart';
import React, { createContext, useContext } from 'react';
const AppContext = createContext();

export function AppWrapper({ children }) {
  const {
    cart,
    addToCart,
    removeFromCart,
    itemCount,
    subtotal,
    removeAll,
    emptyCart,
  } = useCart();
  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    itemCount,
    subtotal,
    removeAll,
    emptyCart,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
