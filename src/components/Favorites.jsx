import React, { useState } from 'react';
import cafe1 from '../assets/images/cafe1.png';
import cafe2 from '../assets/images/cafe2.png';
import cafe3 from '../assets/images/cafe3.png';
import cafe4 from '../assets/images/cafe4.png';
import favoriteData from '../data/favoriteData.json';
import { Link } from 'react-router-dom';

function Favorites() {
  const imageMap = { cafe1, cafe2, cafe3, cafe4 };
  const [sortedData, setSortedData] = useState(favoriteData);

  const handleNearMe = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      const distance = (lat1, lon1, lat2, lon2) => {
        const toRad = (val) => (val * Math.PI) / 180;
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      };

      const sorted = [...favoriteData].sort((a, b) => {
        const distA = distance(userLat, userLng, a.lat, a.lng);
        const distB = distance(userLat, userLng, b.lat, b.lng);
        return distA - distB;
      });

      setSortedData(sorted);
    });
  };

  return (
    <div className='w-full bg-[#A88A6F] py-8 px-4'>
      <div className='max-w-[1240px] mx-auto'>

        {/* Title + Filter Button */}
        <div className='flex justify-center gap-4 items-center mb-8 px-2 flex-wrap'>
          <div className='bg-[#714F43] text-white text-xl font-semibold px-6 py-2 rounded-full shadow-md font-[jaro]'>
            Favorites
          </div>
          <button
            onClick={handleNearMe}
            className='bg-white text-[#714F43] border border-[#714F43] px-4 py-2 rounded-full shadow-sm font-[jaro] hover:bg-[#f7f1ed] transition'
          >
            Near Me
          </button>
        </div>

        {/* Grid */}
        <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-2'>
          {sortedData.map((item, index) => {
            const content = (
              <div
                key={index}
                className="flex flex-col cursor-pointer items-center rounded-xl p-3 transition transform hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={imageMap[item.image]}
                  alt={item.alt}
                  className="w-[180px] h-[170px] sm:w-[230px] sm:h-[225px] object-cover rounded-lg"
                />
                <p className="mt-2 text-black font-[jaro] text-lg font-semibold">{item.name}</p>
              </div>
            );

            return index === 0 ? (
              <Link to={`/coffee-shop-details/${index}`} key={index}>
                {content}
              </Link>
            ) : (
              <React.Fragment key={index}>{content}</React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
