import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import recommendData from "../data/resolveCafeData.js";
import Logo from "../assets/images/logo.png";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearFavorites } from '../features/favorites/favoritesSlice';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);  
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Set up Fuse.js
  const fuse = new Fuse(recommendData, {
    keys: ["name"],
    threshold: 0.4, // adjust for more/less blurry
  });

  const handleLogout = () => {
    // Add your logout logic here
    // For example, clearing user data, redirecting to login page, etc.
    // dispatch(clearUserData());
    // history.push('/login');
    dispatch(clearFavorites());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(clearFavorites());
    setShowLogin(false); // Optionally close the modal
    // ...add your login logic here if needed
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setLoading(true);
    // Simulate async search (Fuse is synchronous, but you can use setTimeout for effect)
    setTimeout(() => {
      const results = fuse.search(searchTerm);
      setLoading(false);
      if (results.length > 0) {
        const cafeId = results[0].item.id;
        setSearchTerm("");
        navigate(`/coffee-shop-details/${cafeId}`);
      } else {
        alert("No matching cafe found!");
      }
    }, 500); // 500ms for demo, adjust as needed
  };

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
          <form onSubmit={handleSearch} className="relative">
            <input 
              type="text" 
              placeholder="search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-[#714F43]"  
            />
            {loading && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <svg className="animate-spin h-5 w-5 text-[#714F43]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              </div>
            )}
          </form>

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
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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
