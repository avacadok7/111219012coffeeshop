import { Routes, Route } from 'react-router-dom';
import './index.css'
import NavBar from './components/Navbar';
import Home from './pages/Home'
import CategoryDetail from './pages/CategoryDetail';
import CoffeeShopDetails from './pages/CoffeeShopDetails';
import ScrollToTop from './components/ScrollToTop';
import MyReviews from './pages/MyReviews';
import Register from './pages/Register';
import Login from './pages/Login'; // Add this import

function App() {
  return (
    <>
      <NavBar/>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<CategoryDetail />} />
        <Route path="/coffee-shop-details/:id" element={<CoffeeShopDetails />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> {/* <-- Add this line */}
      </Routes>
    </>
  );
}

export default App