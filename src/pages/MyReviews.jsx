import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import Footer from '../components/Footer';

function MyReviews() {
  const [reviews, setReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('myReviews')) || [];
    } catch {
      return [];
    }
  });
  const [editingIdx, setEditingIdx] = useState(null);
  const [editRatings, setEditRatings] = useState({});

  useEffect(() => {
    const handleStorage = () => {
      setReviews(JSON.parse(localStorage.getItem('myReviews')) || []);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleEdit = (idx) => {
    setEditingIdx(idx);
    setEditRatings({ ...reviews[idx].ratings });
  };

  const handleStarClick = (category, value) => {
    setEditRatings((prev) => ({ ...prev, [category]: value }));
  };

  const handleSave = (idx) => {
    const updatedReviews = reviews.map((review, i) =>
      i === idx ? { ...review, ratings: { ...editRatings } } : review
    );
    setReviews(updatedReviews);
    localStorage.setItem('myReviews', JSON.stringify(updatedReviews));
    setEditingIdx(null);
  };

  const handleCancel = () => {
    setEditingIdx(null);
    setEditRatings({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-white pt-[80px] px-4">
        <h1 className="text-3xl font-bold text-[#714F43] font-[jaro] mb-8 text-center">My Reviews</h1>
        {reviews.length === 0 ? (
          <div className="text-center text-gray-500 text-xl font-[jaro] mt-12">
            You haven't submitted any reviews yet!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-[#F5F5F5] rounded-lg p-4 shadow-md">
                <h2 className="font-bold text-lg text-[#714F43] mb-2">{review.cafeName}</h2>
                {Object.entries(review.ratings).map(([category, value]) => (
                  <div key={category} className="flex items-center justify-between mb-1">
                    <span className="font-[jaro] text-[#714F43]">{category}</span>
                    <div className="flex">
                      {editingIdx === idx ? (
                        [...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            color={i < (editRatings[category] || 0) ? '#714F43' : '#ccc'}
                            size={16}
                            className="cursor-pointer"
                            onClick={() => handleStarClick(category, i + 1)}
                          />
                        ))
                      ) : (
                        [...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            color={i < value ? '#714F43' : '#ccc'}
                            size={16}
                          />
                        ))
                      )}
                    </div>
                  </div>
                ))}
                {editingIdx === idx ? (
                  <div className="flex gap-2 mt-3">
                    <button
                      className="bg-[#714F43] text-white px-4 py-1 rounded-full font-[jaro] hover:bg-[#5c3d33] transition"
                      onClick={() => handleSave(idx)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-300 text-[#714F43] px-4 py-1 rounded-full font-[jaro] hover:bg-gray-400 transition"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="mt-3 bg-[#714F43] text-white px-4 py-1 rounded-full font-[jaro] hover:bg-[#5c3d33] transition"
                    onClick={() => handleEdit(idx)}
                  >
                    Edit
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MyReviews;