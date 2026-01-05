import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import DestinationCard from '../components/DestinationCard'
import destinations from '../data/destinations'   // Only international trips

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <h1 className="text-4xl font-bold text-blue-600 mt-10">
        Travel Planner
      </h1>

      <div className="mt-6 w-full max-w-md px-4">
        <SearchBar />
      </div>

      {/* SECTION TITLE */}
      <h2 className="text-2xl font-semibold text-gray-700 mt-10">
        International Trips
      </h2>

      {/* RESPONSIVE GRID LIKE JUMIA */}
      <div
        className="
          grid
          grid-cols-1        /* 1 card on mobile */
          sm:grid-cols-2     /* 2 cards on small screens */
          md:grid-cols-3     /* 3 cards on tablets */
          lg:grid-cols-4     /* 4 cards on laptops/desktops */
          gap-8
          mt-10
          px-4
          justify-items-center
        "
      >
        {destinations.map(dest => (
          <DestinationCard key={dest.id} destination={dest} />
        ))}
      </div>
    </div>
  )
}
