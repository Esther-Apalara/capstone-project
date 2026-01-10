import { Link } from "react-router-dom";

const FAV_KEY = "favorites";

export default function DestinationCard({ destination }) {
  let favorites = [];
  try {
    favorites = JSON.parse(localStorage.getItem(FAV_KEY)) || [];
  } catch {
    favorites = [];
  }

  const isFavorite = favorites.includes(destination.id);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      {destination.image && (
        <div className="relative">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-44 sm:h-48 object-cover"
            loading="lazy"
          />

          {isFavorite && (
            <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
              ★ Favorite
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold">
          {destination.city || destination.name}
        </h2>

        {destination.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">
            {destination.description}
          </p>
        )}

        <Link
          to={`/destination/${destination.id}`}
          state={destination}
          className="inline-block mt-4 text-blue-600 font-medium hover:underline"
        >
          View More →
        </Link>
      </div>
    </div>
  );
}