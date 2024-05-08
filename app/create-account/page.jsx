'use client';
import '../globals.css';
import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import CreateAccountDisplay from '../../components/CreateAccountDisplay';

const page = () => {
  return (
    <div>
      <NavBar />
      <CreateAccountDisplay />
      <Footer />
    </div>
  );
};

export default page;
