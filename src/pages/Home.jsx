import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import DestinationCard from "../components/DestinationCard";
import destinations from "../data/destinations";

const FAV_KEY = "favorites";

export default function Home() {
  const [query, setQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const favorites = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    } catch {
      return [];
    }
  }, []);

  const filteredDestinations = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = destinations;

    if (showFavoritesOnly) {
      list = list.filter((d) => favorites.includes(d.id));
    }

    if (!q) return list;

    return list.filter((d) => {
      const name = (d.name || "").toLowerCase();
      const city = (d.city || "").toLowerCase();
      const country = (d.country || "").toLowerCase();
      return name.includes(q) || city.includes(q) || country.includes(q);
    });
  }, [query, showFavoritesOnly, favorites]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mt-10 text-blue-600">
          Travel Planner
        </h1>

        {/* Search + Favorites Toggle */}
        <div className="mt-6 max-w-2xl mx-auto px-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Search a city or country..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={() => {}}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={showFavoritesOnly}
                onChange={(e) => setShowFavoritesOnly(e.target.checked)}
              />
              Show favorites only
            </label>

            <span className="text-sm text-gray-600">
              Favorites: {favorites.length}
            </span>
          </div>
        </div>

        {/* Results */}
        <div className="py-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full mt-6">
              No destinations found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}