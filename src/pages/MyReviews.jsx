import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";

function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [editingIdx, setEditingIdx] = useState(null);
  const [editRatings, setEditRatings] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => setUser(u));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserReviews = async () => {
      if (!user) return;
      const q = query(
        collection(db, "reviews"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const userReviews = [];
      querySnapshot.forEach((doc) => {
        userReviews.push(doc.data());
      });
      setReviews(userReviews);
    };
    fetchUserReviews();
  }, [user]);

  const handleEdit = (idx) => {
    setEditingIdx(idx);
    setEditRatings({ ...reviews[idx].ratings });
  };

  const handleStarClick = (category, value) => {
    setEditRatings((prev) => ({ ...prev, [category]: value }));
  };

  const handleSave = async (idx) => {
    const updatedReviews = reviews.map((review, i) =>
      i === idx ? { ...review, ratings: { ...editRatings } } : review
    );
    setReviews(updatedReviews);

    // Update Firestore
    const review = updatedReviews[idx];
    const reviewDocId = `${review.cafeId}_${user.uid}`;
    await setDoc(doc(db, "reviews", reviewDocId), review);

    setEditingIdx(null);

    // 🔥 Fetch latest reviews from Firestore so UI updates
    const q = query(
      collection(db, "reviews"),
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    const userReviews = [];
    querySnapshot.forEach((doc) => {
      userReviews.push(doc.data());
    });
    setReviews(userReviews);
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
              <div
                key={idx}
                className="bg-[#F5F5F5] rounded-lg p-4 shadow-md hover:shadow-lg transition"
              >
                <h2
                  className="font-bold text-lg text-[#714F43] mb-2 underline cursor-pointer"
                  onClick={() => navigate(`/coffee-shop-details/${review.cafeId}`)}
                >
                  {review.cafeName}
                </h2>
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(idx);
                    }}
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