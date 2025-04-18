import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#714F43] text-white text-center py-4 font-[jaro]">
      &copy; {new Date().getFullYear()} Coffee Review. All rights reserved.
    </footer>
  );
};

export default Footer;
