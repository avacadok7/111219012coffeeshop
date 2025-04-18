// src/pages/CoffeeShopDetails.jsx
import React from 'react';
import NavBar from '../components/Navbar';
import { useParams } from 'react-router-dom';

const CoffeeShopDetails = () => {
  const { id } = useParams();
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#A88A6F] flex items-center justify-center">
        <h1 className="text-3xl font-[jaro] text-white">Welcome to the Coffee Shop!</h1>
      </div>
    </>
  );
};

export default CoffeeShopDetails;
