import React from 'react';
import NavBar from '../components/Navbar';
import Recommend from '../components/Recommend';
import Favorites from '../components/Favorites';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import CoffeeCard from '../components/CoffeeCard';

// 🟡 Import your data
import favoriteData from '../data/favoriteData';

function Home() {
  return (
    <>
      <div className="pt-[80px] sm:pt-[80px] px-4">
        <Recommend />
        <Favorites />
        <Categories />

        {/* ✅ Render CoffeeCard for each cafe */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-6">
          {favoriteData.map((cafe) => (
            <CoffeeCard key={cafe.id} cafe={cafe} />
          ))}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Home;
