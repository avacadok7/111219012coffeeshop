import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import CoffeeCard from '../components/CoffeeCard';
import recommendData from '../data/resolveCafeData.js';

const reviewCategories = ['Study', 'Talk', 'Meals', 'Coffee', 'Dessert', 'Animals'];

const CoffeeShopDetails = () => {
  const { id } = useParams();
  const cafe = recommendData.find(c => String(c.id) === id); // Make sure to match as strings

  const [showModal, setShowModal] = useState(false);
  const [ratings, setRatings] = useState({
    Study: 0, Talk: 0, Meals: 0, Coffee: 0, Dessert: 0, Animals: 0,
  });
  const [submittedReviews, setSubmittedReviews] = useState([]);

  const favorites = useSelector((state) => state.favorites.list);
  const isFavorite = favorites.some((item) => item.id === cafe.id);

  const handleRating = (category, value) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmitReview = () => {
    setSubmittedReviews(prev => [...prev, { ...ratings }]);
    setRatings({ Study: 0, Talk: 0, Meals: 0, Coffee: 0, Dessert: 0, Animals: 0 });
    setShowModal(false);
  };

  if (!cafe) {
    return <p className="text-center text-gray-500 mt-10">Coffee shop not found.</p>;
  }

  return (
    <>
      <div className="flex w-full min-h-screen bg-white px-4 py-6 items-center">
        {/* Left Side - Image & Favorite */}
        <div className="w-1/3 p-6 py-10">
          <CoffeeCard cafe={cafe} />
        </div>

        {/* Right Side - Details */}
        <div className="w-2/3 p-4">
          <h1 className="text-3xl font-bold text-[#714F43] font-[jaro] mb-4 flex items-center gap-2">
            {cafe.name}
            {isFavorite && <FaHeart className="text-red-500 text-xl" />}
          </h1>
          <p className="text-gray-700 text-lg font-[jaro] mb-1">LOCATION: {cafe.location}</p>
          <p className="text-gray-700 text-lg font-[jaro]">OPENING HOURS: {cafe.hours}</p>

          {/* ✅ Review Button now sits under the text */}
          <div className="mt-6">
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
            <button
              onClick={() => setShowModal(false)}
              >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-[#714F43] mb-4 font-[jaro] text-center">
              Rate This Coffee Shop
            </h2>
            <div className="space-y-4">
              {reviewCategories.map((category) => (
                <div key={category} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-lg text-gray-800 font-[jaro]">{category}</span>
                  <div className="flex mt-1 sm:mt-0">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <FaStar
                        key={value}
                        size={24}
                        className={`cursor-pointer transition ${ratings[category] >= value ? 'text-yellow-400' : 'text-gray-300'}`}
                        onClick={() => handleRating(category, value)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={handleSubmitReview}
                className="bg-[#714F43] text-white px-6 py-2 rounded-full hover:bg-[#5c3d33] transition font-[jaro]"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submitted Reviews Section */}
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
