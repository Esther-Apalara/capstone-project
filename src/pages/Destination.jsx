import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import destinations from "../data/destinations";

const ITINERARY_KEY = "itinerary";
const FAV_KEY = "favorites";

export default function Destination() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // Get destination from Link state OR fallback to local data (refresh-safe)
  const destination = useMemo(() => {
    if (location.state) return location.state;
    return destinations.find((d) => String(d.id) === String(id));
  }, [location.state, id]);

  const [itinerary, setItinerary] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(ITINERARY_KEY)) || [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    } catch {
      return [];
    }
  });

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-4xl mx-auto p-6 text-center">
          <h1 className="text-2xl text-red-600 font-semibold mt-20">
            Destination Not Found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const attractions =
    destination.attractions && destination.attractions.length > 0
      ? destination.attractions
      : [
          { id: "a1", name: "City Center Walk", kinds: "Sightseeing" },
          { id: "a2", name: "Local Market", kinds: "Culture & Food" },
          { id: "a3", name: "Popular Museum", kinds: "History" },
        ];

  // ---- Itinerary helpers ----
  const addToItinerary = (item) => {
    if (itinerary.find((i) => i.id === item.id)) return;
    const updated = [...itinerary, item];
    setItinerary(updated);
    localStorage.setItem(ITINERARY_KEY, JSON.stringify(updated));
  };

  const removeFromItinerary = (itemId) => {
    const updated = itinerary.filter((i) => i.id !== itemId);
    setItinerary(updated);
    localStorage.setItem(ITINERARY_KEY, JSON.stringify(updated));
  };

  // ---- Favorites helpers (destination-level) ----
  const isFavorite = favorites.includes(destination.id);

  const toggleFavorite = () => {
    const updated = isFavorite
      ? favorites.filter((fid) => fid !== destination.id)
      : [...favorites, destination.id];

    setFavorites(updated);
    localStorage.setItem(FAV_KEY, JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Image */}
        {destination.image && (
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-64 object-cover rounded-lg shadow"
          />
        )}

        {/* Title + Favorite */}
        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-blue-600">
              {destination.name}
            </h1>

            {destination.country && (
              <p className="text-gray-600 mt-1">Country: {destination.country}</p>
            )}
          </div>

          <button
            onClick={toggleFavorite}
            className={`px-4 py-2 rounded font-medium transition ${
              isFavorite
                ? "bg-yellow-400 text-black hover:bg-yellow-500"
                : "bg-white border hover:bg-gray-50"
            }`}
          >
            {isFavorite ? "★ Favorited" : "☆ Add Favorite"}
          </button>
        </div>

        {destination.description && (
          <p className="text-gray-700 mt-4">{destination.description}</p>
        )}

        {/* Attractions */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">Popular Attractions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {attractions.map((attr) => (
            <div
              key={attr.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold">{attr.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{attr.kinds}</p>

              <button
                onClick={() => addToItinerary(attr)}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Add to Itinerary
              </button>
            </div>
          ))}
        </div>

        {/* Itinerary with REMOVE */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-2">Your Itinerary</h2>

          {itinerary.length === 0 ? (
            <p className="text-gray-600">No items yet. Add attractions above.</p>
          ) : (
            <ul className="space-y-2">
              {itinerary.map((item) => (
                <li
                  key={item.id}
                  className="bg-white rounded-lg shadow p-3 flex items-center justify-between gap-3"
                >
                  <span className="text-gray-800">{item.name}</span>

                  <button
                    onClick={() => removeFromItinerary(item.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-10 inline-block px-5 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}