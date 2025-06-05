import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#714F43] text-white py-4 text-center font-[jaro] mt-auto">
      © {new Date().getFullYear()} Coffee Review. All rights reserved.
    </footer>
  );
};

export default Footer;
