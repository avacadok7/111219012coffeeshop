import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import coffeeShopImg from '../assets/images/cafe1.png'; // Adjust path if needed
import { FaStar } from 'react-icons/fa';
import Footer from '../components/Footer';

const reviewCategories = ['Study', 'Talk', 'Meals', 'Coffee', 'Dessert', 'Animals'];

const CoffeeShopDetails = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [ratings, setRatings] = useState({
    Study: 0, Talk: 0, Meals: 0, Coffee: 0, Dessert: 0, Animals: 0,
  });

  const handleRating = (category, value) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };

  const [submittedReviews, setSubmittedReviews] = useState([]);
  const handleSubmitReview = () => {
    setSubmittedReviews(prev => [...prev, { ...ratings }]);
    setRatings({ Study: 0, Talk: 0, Meals: 0, Coffee: 0, Dessert: 0, Animals: 0 });
    setShowModal(false);
  };
  

  return (
    <>
      <NavBar />

      <div className="flex w-full min-h-screen bg-white px-4 py-6 items-center">
        {/* Left Side - Image */}
        <div className="w-1/3 h-1/2 p-6 py-10 ">
          <img 
            src={coffeeShopImg} 
            alt="Coffee Shop" 
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Right Side - Placeholder for Details */}
        <div className="w-2/3 p-4">
          <h1 className="text-3xl font-bold text-[#714F43] font-[jaro] mb-4">
          窄门咖啡        台南 ｜中西 
          </h1>
          <p className="text-gray-700 text-lg font-[jaro]">
          LOCATION: 台北市中山區雙城街47-1號<br />
          OPENING HOURS: 10:00 - 18:00 (Closed on Mondays)

          </p>
        </div>
        {/* Button */}
        <div className="absolute bottom-4 right-4">
                        {/* Add Review Button - Responsive Position */}
            <div className="mt-6 md:mt-4 md:relative md:block hidden">
              <button 
                onClick={() => setShowModal(true)} 
                className="bg-[#714F43] text-white px-6 py-2 rounded-full hover:bg-[#5c3d33] transition font-[jaro]"
              >
                Add Review
              </button>
            </div>

            {/* Button for Small Screens - Bottom Right */}
            <div className="fixed bottom-4 right-4 md:hidden z-50">
              <button 
                onClick={() => setShowModal(true)} 
                className="bg-[#714F43] text-white px-6 py-2 rounded-full hover:bg-[#5c3d33] transition font-[jaro]"
              >
                Add Review
              </button>
            </div>
          </div>
      </div>
      {/* Review Modal */}
{showModal && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4 sm:px-0">
    <div className="bg-white w-full max-w-md sm:max-w-lg rounded-xl shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
      {/* Close Button */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
      >
        ✕
      </button>

      {/* Modal Title */}
      <h2 className="text-2xl font-bold text-[#714F43] mb-4 font-[jaro] text-center">
        Rate This Coffee Shop
      </h2>

      {/* Star Rating per Category */}
      <div className="space-y-4">
        {reviewCategories.map((category) => (
          <div key={category} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="text-lg text-gray-800 font-[jaro]">{category}</span>
            <div className="flex mt-1 sm:mt-0">
              {[1, 2, 3, 4, 5].map((value) => (
                <FaStar
                  key={value}
                  size={24}
                  className={`cursor-pointer transition ${
                    ratings[category] >= value ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  onClick={() => handleRating(category, value)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => {
            setShowModal(false);
            console.log('Submitted Ratings:', ratings);
          }}
          className="bg-[#714F43] text-white px-6 py-2 rounded-full hover:bg-[#5c3d33] transition font-[jaro]"
        >
          Submit Review
        </button>
      </div>
    </div>
  </div>
)}

{submittedReviews.length > 0 && (
  <div className="w-full px-6 mt-10">
    <h2 className="text-xl font-bold font-[jaro] text-[#714F43] mb-4">User Reviews</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {submittedReviews.map((review, index) => (
        <div key={index} className="bg-[#F5F5F5] rounded-lg p-4 shadow-md">
          {reviewCategories.map(category => (
            <div key={category} className="flex items-center justify-between mb-2">
              <span className="font-[jaro] text-[#714F43]">{category}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < review[category] ? '#714F43' : '#ccc'}
                    size={16}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
)}

      <Footer />
    </>
  );
};

export default CoffeeShopDetails;
