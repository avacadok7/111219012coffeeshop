import { Routes, Route } from 'react-router-dom';
import './index.css'
import NavBar from './components/Navbar';
import Home from './pages/Home'
import CategoryDetail from './pages/CategoryDetail';
import CoffeeShopDetails from './pages/CoffeeShopDetails';

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<CategoryDetail />} />
        <Route path="/coffee-shop-details/:id" element={<CoffeeShopDetails />} />
      </Routes>
    </>
  );
}

export default App