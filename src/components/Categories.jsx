import React from 'react';
import img1 from '../assets/images/cat1.png';
import img2 from '../assets/images/cat2.png';
import img3 from '../assets/images/cat3.png';
import img4 from '../assets/images/cat4.png';
import img5 from '../assets/images/cat5.png';
import img6 from '../assets/images/cat6.png';
import logo from '../assets/images/logo2.png';
import categoriesData from '../data/categoriesData.json';
import { Link } from 'react-router-dom';


function Categories() {
  const imageMap = {
    cat1: img1,
    cat2: img2,
    cat3: img3,
    cat4: img4,
    cat5: img5,
    cat6: img6,
  };

  console.log(categoriesData);

  return (

    
    <div className="w-full bg-[#A88A6F] py-8 px-4">
      <div className="max-w-[1240px] mx-auto">
      <div className='flex justify-center w-full mb-8'>
            <div className='bg-[#714F43] text-white text-xl font-semibold px-6 py-2 rounded-full shadow-md font-[jaro]'>
              Categories
            </div>
          </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {categoriesData.slice(0, 4).map((item, index) => (
        <div
            key={index}
            className="relative w-full h-48 sm:h-52 md:h-60 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
        >
            {index === 0 ? (
            <Link to={`/category/${item.name.toLowerCase()}`} onClick={() => window.scrollTo(0, 0)}>
                <img
                src={imageMap[item.image]}
                alt={item.alt}
                className="w-full h-full object-cover"
                />
                <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
                <p className="text-white text-xl font-bold font-[jaro]">{item.name}</p>
                </div>
            </Link>
            ) : (
            <>
                <img
                src={imageMap[item.image]}
                alt={item.alt}
                className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
                <p className="text-white text-xl font-bold font-[jaro]">{item.name}</p>
                </div>
            </>
            )}
        </div>
        ))}

         </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4 items-center">
          {categoriesData.slice(4, 6).map((item, index) => (
            <div
              key={index}
              className="relative w-full h-48 sm:h-52 md:h-60 rounded-lg overflow-hidden shadow-lg col-span-1"
            >
              <img
                src={imageMap[item.image]}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
                <p className="text-white text-xl font-bold font-[jaro]">{item.name}</p>
              </div>
            </div>
          ))}

          {/* Logo for large screen */}
          <div className="hidden md:flex justify-center col-span-3">
            <img src={logo} alt="Logo" className="w-40 h-auto" />
          </div>
        </div>

        {/* Logo for small screens */}
        <div className="flex md:hidden justify-center mt-6">
          <img src={logo} alt="Logo" className="w-32 h-auto" />
        </div>
      </div>
    </div>
  );
}

export default Categories;
