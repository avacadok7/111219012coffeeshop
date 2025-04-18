import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/Navbar';
import banner from '../assets/images/category-banner.png';
import Favorites from '../components/Favorites';
import Recommend from '../components/Recommend';
import Categories from '../components/Categories';


function CategoryDetail() {
  const { id } = useParams();

  return (
   <>
   <NavBar/>    
   <div className ="relative w-full">
    <img
        src={banner}
        alt="Category Banner"
        className="w-full h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] object-cover"
        />
     <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white uppercase text-3xl sm:text-4xl font-bold font-[jaro]">
            Study
          </h1>
        </div>
   </div>
   <Favorites/>
   <Recommend/>
   <Categories/>
   </>
  );
}

export default CategoryDetail;
