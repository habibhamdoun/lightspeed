'use client';
import '../globals.css';
import React from 'react';
import NavBar from '../../components/NavBar';
import LoginDisplay from '../../components/LoginDisplay.jsx';
import Footer from '../../components/Footer';

const page = () => {
  return (
    <div>
      <NavBar />
      <LoginDisplay />
      <Footer />
    </div>
  );
};

export default page;
