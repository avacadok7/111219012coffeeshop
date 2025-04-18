import React from 'react';
import cafe1 from '../assets/images/cafe1.png';
import cafe2 from '../assets/images/cafe2.png';
import cafe3 from '../assets/images/cafe3.png';
import cafe4 from '../assets/images/cafe4.png';
import favoriteData from '../data/favoriteData.json';
import { Link } from 'react-router-dom'; // Capital L!

function Favorites() {
  const imageMap = {
    cafe1: cafe1, 
    cafe2: cafe2,
    cafe3: cafe3,
    cafe4: cafe4,
  };

  return (
    <div className='w-full bg-[#A88A6F] py-8 px-4'>
      <div className='max-w-[1240px] mx-auto'>

        {/* Title */}
        <div className='flex justify-center w-full mb-8'>
          <div className='bg-[#714F43] text-white text-xl font-semibold px-6 py-2 rounded-full shadow-md font-[jaro]'>
            Favorites
          </div>
        </div>

        {/* Grid */}
        <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-2'>
          {favoriteData.map((item, index) => {
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

            // Wrap only the first item in <Link>
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
