import React from 'react'
import NavBar from '../components/Navbar'
import Recommend from '../components/Recommend'
import Favorites from '../components/Favorites'
import Categories from '../components/Categories'

function Home() {
  
    return (
      <>
        
          <NavBar/>
          <Recommend/>
          <Favorites/>
          <Categories/>
  
      </>
    )
  }

export default Home