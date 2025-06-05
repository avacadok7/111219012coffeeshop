import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { FaHeart } from 'react-icons/fa';

import cafe1 from '../assets/images/cafe1.png';
import cafe2 from '../assets/images/cafe2.png';
import cafe3 from '../assets/images/cafe3.png';
import cafe4 from '../assets/images/cafe4.png';
import cafe5 from '../assets/images/cafe5.jpg';
import cafe6 from '../assets/images/cafe6.jpg';
import cafe7 from '../assets/images/cafe7.jpg';
import cafe8 from '../assets/images/cafe8.jpg';
import recommendData from '../data/recommendData.json';

const imageMap = {
  cafe1,
  cafe2,
  cafe3,
  cafe4,
  cafe5,
  cafe6,
  cafe7,
  cafe8,
};

function Recommend() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.list);
  const [activeHeart, setActiveHeart] = useState(null);

  const handleDoubleClick = (cafe) => {
    dispatch(toggleFavorite(cafe));
    setActiveHeart(cafe.id);
    setTimeout(() => setActiveHeart(null), 700);
  };

  const isFavorite = (id) => favorites.some((cafe) => cafe.id === id);

  return (
    <div className='w-full bg-[#A88A6F] px-4 py-8'>
      <div className='max-w-[1240px] mx-auto'>

        {/* Title */}
        <div className='flex justify-center w-full mb-8'>
          <div className='bg-[#714F43] text-white text-xl font-semibold px-6 py-2 rounded-full shadow-md font-[jaro]'>
            Recommend
          </div>
        </div>

        {/* Image Grid */}
        <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-2'>
          {recommendData.map((item, index) => (
            <Link to={`/coffee-shop-details/${item.id}`} key={item.id}>
              <div
                className="relative flex flex-col items-center rounded-xl p-3 cursor-pointer transition transform hover:scale-105 hover:shadow-xl"
                onDoubleClick={(e) => {
                  e.preventDefault(); // prevent navigation on double click
                  handleDoubleClick(item);
                }}
              >
                <img
                  src={imageMap[item.image]}
                  alt={item.alt}
                  className="w-[180px] h-[170px] sm:w-[230px] sm:h-[225px] object-cover rounded-lg"
                />

                <p className="mt-2 text-black font-[jaro] text-lg font-semibold flex items-center gap-2">
                  {item.name}
                  {isFavorite(item.id) && <FaHeart className="text-red-500 text-xl" />}
                </p>

                

                {/* Heart Ping Animation */}
                {activeHeart === item.id && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-red-500 text-4xl animate-ping">❤️</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recommend;
