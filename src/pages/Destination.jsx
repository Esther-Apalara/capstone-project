import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import destinations from "../data/destinations"; // adjust path if needed

export default function Destination() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  // Prefer state passed from Home, but fall back to local data (refresh-safe)
  const destination = useMemo(() => {
    if (location.state) return location.state;

    // Fallback: find by id from route param if you have it
    // If your route is like /destination/:id this will work.
    if (params.id) {
      return destinations.find((d) => String(d.id) === String(params.id));
    }

    return null;
  }, [location.state, params.id]);

  const [itinerary, setItinerary] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("itinerary")) || [];
    } catch {
      return [];
    }
  });

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-center text-2xl mt-20 text-red-600">
            Destination Not Found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="mt-6 mx-auto block px-4 py-2 bg-blue-600 text-white rounded"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  // Local attractions (no API). Works if you store attractions inside each destination.
  // If you don’t have attractions in your data yet, it will show a default list.
  const attractions =
    destination.attractions && destination.attractions.length > 0
      ? destination.attractions
      : [
          { id: "a1", name: "City Center Walk", kinds: "sightseeing" },
          { id: "a2", name: "Local Market", kinds: "food, culture" },
          { id: "a3", name: "Museum Visit", kinds: "history, museum" },
          { id: "a4", name: "Popular Park", kinds: "nature, relax" },
          { id: "a5", name: "Landmark Photo Spot", kinds: "landmark" },
        ];

  const addToItinerary = (item) => {
    const key = item.id || item.xid || item.name;
    if (itinerary.find((i) => (i.id || i.xid || i.name) === key)) return;

    const newItinerary = [...itinerary, item];
    setItinerary(newItinerary);
    localStorage.setItem("itinerary", JSON.stringify(newItinerary));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          {destination.city || destination.name}
        </h1>

        {destination.country && (
          <p className="text-gray-700 mb-2">Country: {destination.country}</p>
        )}

        {destination.description && (
          <p className="text-gray-700 mb-6">{destination.description}</p>
        )}

        <h2 className="text-2xl font-semibold mt-6 mb-4">Popular Attractions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {attractions.map((attr) => (
            <div
              key={attr.id || attr.xid || attr.name}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg">{attr.name}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {attr.kinds || "General"}
              </p>

              <button
                onClick={() => addToItinerary(attr)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Add to Itinerary
              </button>
            </div>
          ))}
        </div>

        {itinerary.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-2">Your Itinerary</h2>
            <ul className="list-disc pl-5">
              {itinerary.map((item) => (
                <li key={item.id || item.xid || item.name}>
                  {item.name || "Unnamed Attraction"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}