import { useNavigate } from "react-router-dom";

export default function DestinationCard({ destination }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden max-w-xs w-full">
      <img
        src={destination.image || "https://via.placeholder.com/400x300?text=No+Image"}
        alt={destination.name}
        className="w-full h-40 object-cover"
      />
      
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          {destination.name}
        </h2>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {destination.description}
        </p>

        <button
          onClick={() => navigate(`/destination/${destination.id}`)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          View More
        </button>
      </div>
    </div>
  );
}