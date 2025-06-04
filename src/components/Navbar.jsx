import React, { useState } from "react";
import Logo from "../assets/images/logo.png";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);  

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#714F43]/90 py-3 sm:py-2">
      <div className="mx-auto px-4 sm:px-12 max-w-screen-xl flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="font-[jaro] font-bold text-2xl sm:text-3xl flex items-center gap-2">
          <img src={Logo} alt="Logo" className="w-10 py-1 sm:py-1" />
          DARAN
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4 relative">
          
          {/* Search Bar */}
          <div className="group">
            <input 
              type="text" 
              placeholder="search"
              className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-[#714F43]"  
            />
          </div>

          {/* Menu Icon */}
          <div
            onClick={() => setMenuOpen(true)}
            className="text-white text-2xl cursor-pointer"
          >
            <AiOutlineMenu size={24} />
          </div>
        </div>
      </div>

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 w-[250px] h-full bg-white text-black border-l border-gray-200 shadow-md transition-transform duration-300 z-50 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button inside menu */}
        <div className="flex justify-end p-4">
          <AiOutlineClose 
            onClick={() => setMenuOpen(false)} 
            size={24} 
            className="cursor-pointer hover:text-[#714F43]" 
          />
        </div>

        <ul className="pt-4 uppercase font-[jaro]">
          <li className="p-4 hover:bg-gray-100 cursor-pointer">Categories</li>
          <li className="p-4 hover:bg-gray-100 cursor-pointer">Scroll</li>
          <li className="p-4 hover:bg-gray-100 cursor-pointer">Location</li>
          <li className="p-4 hover:bg-gray-100 cursor-pointer">My Reviews</li>
        </ul>
         {/* Login Button inside menu */}
         <div className="px-4 mt-6">
          <button onClick={() => setShowLogin(true)} className="font-[jaro] w-0.8 bg-[#714F43] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#5c3d33] transition">
            Login
          </button>
          </div>
      </div>
        {/* Login Modal */}
      {showLogin && (
        <div className="font-[jaro] fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[90%] max-w-sm rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              <AiOutlineClose size={20} />
            </button>
            <h2 className="text-xl font-bold text-[#714F43] mb-4">Login</h2>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="border rounded-md px-4 py-2 focus:outline-none focus:border-[#714F43]"
              />
              <input
                type="password"
                placeholder="Password"
                className="border rounded-md px-4 py-2 focus:outline-none focus:border-[#714F43]"
              />
              <button
                type="submit"
                className="bg-[#714F43] text-white py-2 rounded-md hover:bg-[#5c3d33] transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default NavBar;
