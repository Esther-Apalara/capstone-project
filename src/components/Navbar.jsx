export default function Navbar() {
  return (
    <nav className="w-full bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Travel Planner</h1>
      <div className="space-x-4">
        <a href="#" className="hover:text-gray-200">Home</a>
        <a href="#" className="hover:text-gray-200">Destinations</a>
        <a href="#" className="hover:text-gray-200">Itinerary</a>
      </div>
    </nav>
  )
}