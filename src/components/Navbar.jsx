import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Fuse from "fuse.js";
import recommendData from "../data/resolveCafeData.js";
import Logo from "../assets/images/logo.png";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { loadFavoritesFromFirestore, clearFavorites } from '../features/favorites/favoritesSlice';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [nickname, setNickname] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Set up Fuse.js
  const fuse = new Fuse(recommendData, {
    keys: ["name"],
    threshold: 0.4,
  });

  // Listen for Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Fetch nickname from Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setNickname(docSnap.data().nickname || user.email);
        } else {
          setNickname(user.email);
        }
      } else {
        setNickname("");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(loadFavoritesFromFirestore());
      } else {
        dispatch(clearFavorites());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  const handleLogout = async () => {
    await signOut(auth);
    setShowDropdown(false);
    setMenuOpen(false);
    navigate("/");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setLoading(true);
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
    }, 500);
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
          {/* User/Nickname or Login Button */}
          {user ? (
            <div className="relative">
              <button
                className="font-[jaro] bg-[#714F43] text-white font-semibold px-6 py-2 rounded-full hover:bg-[#5c3d33] transition"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                {nickname || user.email}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-50 flex flex-col">
                  <button
                    className="block w-full text-left px-4 py-2 text-[#714F43] hover:bg-gray-100 whitespace-nowrap"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="font-[jaro] bg-[#714F43] text-white font-semibold px-6 py-2 rounded-full hover:bg-[#5c3d33] transition"
            >
              Login
            </Link>
          )}
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
          <li className="p-4 hover:bg-gray-100 cursor-pointer">
            <Link to="/my-reviews" onClick={() => setMenuOpen(false)}>My Reviews</Link>
          </li>
        </ul>
        <div className="px-4 mt-6">
          {/* No Login or Log out button in the side menu */}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
