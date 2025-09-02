import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { FaSadTear, FaSearch } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import MediatorCard from "./components/MediatorCard";

export default function Mediator() {
  const axiosPublic = useAxiosPublic();
  const { data: mediators = [] } = useQuery({
    queryKey: ["nediators"],
    queryFn: async () => {
      const res = await axiosPublic.get("/mediators");
      return res.data;
    },
  });

  // State for search
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Filter mediators based on search term and location
  const filteredMediators = useMemo(() => {
    return mediators.filter((mediator) => {
      // Check if matches search term (name)
      const matchesSearch = mediator.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Check if matches location filter (partial match)
      let matchesLocation = true;
      if (locationFilter) {
        // Check if the location string contains the selected city
        matchesLocation = mediator.address
          ?.toLowerCase()
          .includes(locationFilter.toLowerCase());
      }

      return matchesSearch && matchesLocation;
    });
  }, [mediators, searchTerm, locationFilter]);
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    // The filtering is already handled by the useEffect/useMemo
  };
  return (
    <div className="">
      <section className="relative ">
        <div className="relative py-3 text-center px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Our Mediators
          </h2>

          <div className="flex flex-col md:flex-row md:justify-between md:items-center max-w-6xl mx-auto gap-3">
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <select
                className="border px-4 py-2 rounded-md focus:outline-none w-full sm:w-auto"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option>Select Location</option>
                <option>Dhaka</option>
                <option>Chittagong</option>
                <option>Rajshahi</option>
              </select>
            </div>

            <form
              onSubmit={handleSearch}
              className="flex border border-[#dfa02b] rounded-md overflow-hidden w-full sm:w-auto"
            >
              <input
                type="text"
                placeholder="Search by name"
                className="px-4 py-2 focus:outline-none flex-grow sm:w-65"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#dfa02b] text-white px-6 py-2 shrink-0 hover:bg-yellow-700 transition flex items-center justify-center"
              >
                <FaSearch className="mr-1" />
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-8 px-6">
        {filteredMediators.length > 0 ? (
          <>
            <div className="max-w-7xl mx-auto mb-6">
              <p className="text-gray-600">
                {locationFilter
                  ? `Showing ${filteredMediators.length} mediators in ${locationFilter}`
                  : `Showing all ${filteredMediators.length} mediators`}
                {/* {searchTerm && ` matching "${searchTerm}"`} */}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {filteredMediators.map((mediator) => (
                <MediatorCard key={mediator._id} mediator={mediator} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <FaSadTear className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No Mediators found
            </h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
