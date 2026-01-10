import { Link } from "react-router-dom";

export default function DestinationCard({ destination }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold">
        {destination.city || destination.name}
      </h2>

      {destination.description && (
        <p className="text-sm text-gray-600 mt-2">
          {destination.description}
        </p>
      )}

      <Link
        to={`/destination/${destination.id}`}
        state={destination}
        className="inline-block mt-4 text-blue-600 font-medium"
      >
        View More →
      </Link>
    </div>
  );
}