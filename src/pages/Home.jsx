import React from 'react'
import NavBar from '../components/Navbar'
import Recommend from '../components/Recommend'
import Favorites from '../components/Favorites'
import Categories from '../components/Categories'
import Footer from '../components/Footer';

function Home() {
  
    return (
      <>
        
          <NavBar/>
          <Recommend/>
          <Favorites/>
          <Categories/>
          <Footer/>
  
      </>
    )
  }

export default Home