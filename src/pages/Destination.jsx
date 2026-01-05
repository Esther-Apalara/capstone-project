import { useParams } from "react-router-dom";
import destinations from "../data/destinations";
import Navbar from "../components/Navbar";

export default function Destination() {
  const { id } = useParams();

  // Find destination by ID
  const destination = destinations.find(dest => dest.id.toString() === id);

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <h1 className="text-center text-2xl mt-20 text-red-600">
          Destination Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        {/* Destination Name */}
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          {destination.name}
        </h1>

        {/* Destination Image */}
        <img
          src={destination.image || "https://via.placeholder.com/600x400?text=No+Image"}
          alt={destination.name}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />

        {/* Destination Description */}
        <p className="text-gray-700 text-lg">{destination.description}</p>
      </div>
    </div>
  );
}