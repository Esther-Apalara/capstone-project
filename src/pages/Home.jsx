import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import DestinationCard from "../components/DestinationCard";
import destinations from "../data/destinations"; // adjust path if needed

export default function Home() {
  const [query, setQuery] = useState("");

  // Filter local destinations (NO API)
  const filteredDestinations = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return destinations;

    return destinations.filter((d) => {
      const city = (d.city || d.name || "").toLowerCase();
      const country = (d.country || "").toLowerCase();
      return city.includes(q) || country.includes(q);
    });
  }, [query]);

  const handleSearch = () => {
    // No API call needed
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <h1 className="text-4xl font-bold text-center mt-10 text-blue-600">
        Travel Planner
      </h1>

      {/* Search Bar */}
      <div className="mt-6 max-w-md mx-auto flex px-4">
        <input
          type="text"
          placeholder="Search a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-l-lg"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg"
        >
          Search
        </button>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 px-6">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
            />
          ))
        ) : (
          query && (
            <p className="text-center mt-6 text-gray-500 col-span-full">
              No results found
            </p>
          )
        )}
      </div>
    </div>
  );
}