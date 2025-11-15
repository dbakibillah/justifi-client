import React from "react";
import {
  FaBalanceScale,
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFolderOpen,
  FaFilePdf,
  FaDownload,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const LawyerArbClientInformation = ({ plaintiffs }) => {
  const axiosPublic = useAxiosPublic();

  // Fetch all users data to get real photos
  const { data: usersData = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosPublic.get("/users");
      return response.data;
    },
  });

  // Helper function to get user photo by email
  const getUserPhoto = (email) => {
    const user = usersData.find((user) => user.email === email);
    return (
      user?.photo ||
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop&crop=center"
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-blue-600 rounded-full mr-3"></div>
          <h2 className="text-2xl font-bold text-gray-900">
            <FaBalanceScale className="inline mr-3 text-blue-600" />
            Client Information
          </h2>
        </div>
        <div className="space-y-6">
          {[1].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500 animate-pulse"
            >
              <div className="flex items-start mb-4">
                <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                <div className="ml-4 flex-1">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="w-1 h-8 bg-blue-600 rounded-full mr-3"></div>
        <h2 className="text-2xl font-bold text-gray-900">
          <FaBalanceScale className="inline mr-3 text-blue-600" />
          Client Information
        </h2>
      </div>
      <div className="space-y-6">
        {plaintiffs.map((party) => {
          const partyPhoto = getUserPhoto(party.email);

          return (
            <div
              key={party.id}
              className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start mb-4">
                <div className="relative">
                  <img
                    src={partyPhoto}
                    alt={party.name}
                    className="w-16 h-16 rounded-lg object-cover border-2 border-blue-200 shadow-sm"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop&crop=center";
                    }}
                  />
                  <div className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-sm">
                    <FaUserTie />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {party.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1 flex items-center">
                    <FaUserTie className="inline mr-2 text-blue-500 text-xs" />
                    {party.representative}
                  </p>
                  <p className="text-gray-600 text-sm mb-1 flex items-center">
                    <FaEnvelope className="inline mr-2 text-blue-500 text-xs" />
                    {party.email}
                  </p>
                  <p className="text-gray-600 text-sm flex items-center">
                    <FaPhone className="inline mr-2 text-blue-500 text-xs" />
                    {party.contact}
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-gray-700 text-sm flex items-start">
                  <FaMapMarkerAlt className="inline mr-2 text-blue-500 text-xs mt-1 flex-shrink-0" />
                  <span>{party.address}</span>
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FaFolderOpen className="mr-2 text-blue-600" />
                  Evidence Submitted ({party.evidence?.length || 0} documents)
                </h4>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {party.evidence && party.evidence.length > 0 ? (
                    party.evidence.map((evidence) => (
                      <div
                        key={evidence.id}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center justify-between hover:translate-x-1 hover:bg-gray-100 transition-all duration-300"
                      >
                        <div className="flex items-center">
                          <FaFilePdf className="text-red-500 text-lg mr-3" />
                          <div>
                            <p className="font-medium text-gray-800 text-sm">
                              {evidence.name}
                            </p>
                            <p className="text-gray-500 text-xs">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2">
                                {evidence.type}
                              </span>
                              Submitted:{" "}
                              {new Date(evidence.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors">
                          <FaDownload />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 bg-gray-50 rounded-lg border border-gray-200">
                      <FaFolderOpen className="text-gray-400 text-2xl mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">
                        No evidence submitted yet
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {plaintiffs.length === 0 && (
        <div className="text-center py-8">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
            <FaUserTie className="text-6xl text-gray-300 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Client Information
            </h3>
            <p className="text-gray-500">
              Client information is not available for this case.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerArbClientInformation;
