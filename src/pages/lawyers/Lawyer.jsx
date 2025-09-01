import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaSadTear, FaSearch } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LawyerCard from "./components/LawyerCard";

const Lawyers = () => {
  const axiosPublic = useAxiosPublic();
  const { data: lawyers = [] } = useQuery({
    queryKey: ["lawyers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/lawyers");
      return res.data;
    },
  });

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");
  const [selectedCourt, setSelectedCourt] = useState("All");
  const [sortOption, setSortOption] = useState("rating");

  // Get unique specializations and courts for filter options
  const specializations = [
    "All",
    ...new Set(lawyers.flatMap((lawyer) => lawyer.specialization)),
  ];
  const courts = ["All", ...new Set(lawyers.map((lawyer) => lawyer.court))];

  // Filter and sort lawyers
  const filteredLawyers = lawyers
    .filter((lawyer) => {
      const matchesSearch =
        lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.specialization.some((s) =>
          s.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesSpecialization =
        selectedSpecialization === "All" ||
        lawyer.specialization.includes(selectedSpecialization);
      const matchesCourt =
        selectedCourt === "All" || lawyer.court === selectedCourt;

      return matchesSearch && matchesSpecialization && matchesCourt;
    })
    .sort((a, b) => {
      if (sortOption === "rating") {
        return b.rating - a.rating;
      } else if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Lawyer
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Browse our directory of experienced legal professionals ready to
            assist with your legal needs.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Lawyers
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name or specialization..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Specialization Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialization
              </label>
              <select
                className="block w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
              >
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Court Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Court
              </label>
              <select
                className="block w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={selectedCourt}
                onChange={(e) => setSelectedCourt(e.target.value)}
              >
                {courts.map((court) => (
                  <option key={court} value={court}>
                    {court}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="mt-4 flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">
              Sort by:
            </span>
            <div className="flex space-x-4">
              <button
                className={`px-3 py-1 rounded-full text-sm ${
                  sortOption === "rating"
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-600"
                }`}
                onClick={() => setSortOption("rating")}
              >
                Highest Rating
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm ${
                  sortOption === "name"
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-600"
                }`}
                onClick={() => setSortOption("name")}
              >
                Name A-Z
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold">{filteredLawyers.length}</span> of{" "}
            <span className="font-semibold">{lawyers.length}</span> lawyers
          </p>
        </div>

        {/* Lawyers Grid */}
        {filteredLawyers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLawyers.map((lawyer) => (
              <LawyerCard key={lawyer._id} lawyer={lawyer} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaSadTear className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No lawyers found
            </h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Lawyers;
