import React from 'react'
import NavBar from '../components/Navbar'
import Recommend from '../components/Recommend'
import Favorites from '../components/Favorites'
import Categories from '../components/Categories'
import Footer from '../components/Footer';

function Home() {
  
    return (
      <>
       <div className="pt-[80px] sm:pt-[80px]"> {/* Add this wrapper */}
          <Recommend/>
          <Favorites/>
          <Categories/>
          <Footer/>
       </div>
      </>
    )
  }

export default Home