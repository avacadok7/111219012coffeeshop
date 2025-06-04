import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { useState } from 'react';

const CoffeeCard = ({ cafe }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.list);
  const isFavorite = favorites.some(item => item.id === cafe.id);

  const [showHeart, setShowHeart] = useState(false);

  const handleDoubleClick = () => {
    dispatch(toggleFavorite(cafe));
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 800); // ❤️ animation timeout
  };

  return (
    <div
      className="relative group cursor-pointer w-full"
      onDoubleClick={handleDoubleClick}
    >
      <img
        src={cafe.image}
        alt={cafe.name}
        className="w-full rounded-lg transition-transform duration-300 group-hover:scale-105"
      />

      {/* Persistent heart icon */}
      {isFavorite && (
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
          <span className="text-red-500 text-xl">❤️</span>
        </div>
      )}

      {/* Heart pop animation */}
      {showHeart && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-red-500 text-4xl animate-ping">❤️</span>
        </div>
      )}

      <p className="mt-2 text-center font-semibold">{cafe.name}</p>
    </div>
  );
};

export default CoffeeCard;
