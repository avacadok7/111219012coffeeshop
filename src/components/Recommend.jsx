import React from 'react';
import cafe1 from '../assets/images/cafe1.png';
import cafe2 from '../assets/images/cafe2.png';
import cafe3 from '../assets/images/cafe3.png';
import cafe4 from '../assets/images/cafe4.png';
import cafe5 from '../assets/images/cafe5.jpg';
import cafe6 from '../assets/images/cafe6.jpg';
import cafe7 from '../assets/images/cafe7.jpg';
import cafe8 from '../assets/images/cafe8.jpg';
import recommendData from '../data/recommendData.json';

function Recommend() {
  // This links all "cafe1" entries in JSON to the actual imported image
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

  return (
    <div className=' w-full  bg-[#A88A6F] px-4'>
      <div className='max-w-[1240px] mx-auto'>
  
        {/* Recommend Title */}
        <div className=' flex justify-center w-full mb-8'>
          <div className='bg-[#714F43] text-white text-xl font-semibold px-6 py-2 rounded-full shadow-md font-[jaro]'>
            Recommend
          </div>
        </div>
  
        {/* Image Grid */}
        <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-2'>
          {recommendData.map((item, index) => (
            <div
            key={index}
            className="flex flex-col cursor-pointer items-center rounded-xl p-3 transition transform hover:scale-105 hover:shadow-xl :"
          >
            <img 
              src={imageMap[item.image]} 
              alt={item.alt} 
              className="w-[180px] h-[170px] sm:w-[230px] sm:h-[225px] object-cover rounded-lg"
            />
            <p className="mt-2 text-black font-[jaro] text-lg font-semibold">{item.name}</p>
          </div>
          
          ))}
        </div>
  
      </div>
    </div>
  );
  
}

export default Recommend;
