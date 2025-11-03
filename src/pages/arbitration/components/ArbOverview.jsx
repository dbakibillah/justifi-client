import React from "react";
import {
  FaFileAlt,
  FaTag,
  FaDollarSign,
  FaCalendarAlt,
  FaHourglassHalf,
  FaFileContract,
  FaBalanceScale,
  FaUserShield,
  FaUserTag,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaArrowLeft,
  FaCreditCard,
} from "react-icons/fa";

const ArbOverview = ({
  formData,
  plaintiffs,
  defendants,
  arbitrationId,
  onBack,
  onPayment,
}) => {
  const calculateFees = (suitValue) => {
    const value = parseInt(suitValue) || 0;
    if (value <= 50000) return 1000;
    if (value <= 100000) return 2000;
    if (value <= 500000) return 5000;
    if (value <= 1000000) return 10000;
    return 15000;
  };

  const fees = calculateFees(formData.suitValue);

  // Helper function to extract parties data
  const getPartiesData = (type) => {
    if (!formData[type]) return [];

    const partiesData = [];
    for (
      let i = 1;
      i <= (type === "plaintiffs" ? plaintiffs.length : defendants.length);
      i++
    ) {
      if (formData[type] && formData[type][i]) {
        partiesData.push(formData[type][i]);
      }
    }
    return partiesData;
  };

  const plaintiffsData = getPartiesData("plaintiffs");
  const defendantsData = getPartiesData("defendants");

  return (
    <div className="fade-in">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 card-hover">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-800">
              Case Overview & Payment
            </h2>
            <p className="text-gray-600 mt-2">
              Review all details before proceeding to payment
            </p>
          </div>
          <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
            Step 4 of 5
          </div>
        </div>

        {/* Case Information */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 rounded-xl mr-4 shadow-md">
              <FaFileAlt className="text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                Case Information
              </h3>
              <p className="text-gray-600">
                Complete case details and specifications
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border border-blue-200 p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                      <FaFileAlt />
                    </div>
                    <h4 className="font-semibold text-gray-700">Case Title</h4>
                  </div>
                  <p className="text-lg font-medium text-gray-800 pl-11">
                    {formData.caseTitle || "Not provided"}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                      <FaTag />
                    </div>
                    <h4 className="font-semibold text-gray-700">Category</h4>
                  </div>
                  <div className="flex items-center pl-11">
                    <span className="text-lg font-medium text-gray-800">
                      {formData.caseCategory || "Not provided"}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                      <FaDollarSign />
                    </div>
                    <h4 className="font-semibold text-gray-700">Suit Value</h4>
                  </div>
                  <p className="text-xl font-bold text-blue-600 pl-11">
                    ${parseInt(formData.suitValue || 0).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                      <FaCalendarAlt />
                    </div>
                    <h4 className="font-semibold text-gray-700">
                      Submission Date
                    </h4>
                  </div>
                  <div className="flex items-center justify-between pl-11">
                    <span className="text-lg font-medium text-gray-800">
                      {new Date().toISOString().split("T")[0]}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                      <FaHourglassHalf />
                    </div>
                    <h4 className="font-semibold text-gray-700">Case Status</h4>
                  </div>
                  <div className="flex items-center pl-11">
                    <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                      Pending Payment
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                      <FaFileContract />
                    </div>
                    <h4 className="font-semibold text-gray-700">Case ID</h4>
                  </div>
                  <div className="flex items-center justify-between pl-11">
                    <span className="text-lg font-mono font-bold text-gray-800">
                      {arbitrationId}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nature of Dispute */}
            <div className="mt-6 bg-white rounded-xl p-5 shadow-sm border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                  <FaBalanceScale />
                </div>
                <h4 className="font-semibold text-gray-700">
                  Nature of Dispute
                </h4>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-700 leading-relaxed">
                  {formData.disputeNature || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Parties Involved */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Plaintiffs */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
            <div className="flex items-center mb-6">
              <div className="bg-green-600 text-white p-2 rounded-lg mr-3">
                <FaUserShield />
              </div>
              <h3 className="text-xl font-semibold text-green-800">
                Plaintiffs ({plaintiffsData.length})
              </h3>
            </div>
            <div className="space-y-4">
              {plaintiffsData.length > 0 ? (
                plaintiffsData.map((plaintiff, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-green-200 p-4"
                  >
                    <h4 className="font-semibold text-green-800 text-lg mb-3">
                      {plaintiff.name}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <FaUser className="text-green-600 mr-2 w-5" />
                        <span className="font-medium text-gray-600 w-24">
                          Parents:
                        </span>
                        <span className="text-gray-800">
                          {plaintiff.parentsName || "Not provided"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaEnvelope className="text-green-600 mr-2 w-5" />
                        <span className="font-medium text-gray-600 w-24">
                          Email:
                        </span>
                        <span className="text-gray-800">{plaintiff.email}</span>
                      </div>
                      <div className="flex items-center">
                        <FaPhone className="text-green-600 mr-2 w-5" />
                        <span className="font-medium text-gray-600 w-24">
                          Phone:
                        </span>
                        <span className="text-gray-800">
                          {plaintiff.phone || "Not provided"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-green-600 mr-2 w-5" />
                        <span className="font-medium text-gray-600 w-24">
                          Address:
                        </span>
                        <span className="text-gray-800">
                          {plaintiff.address || "Not provided"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaBriefcase className="text-green-600 mr-2 w-5" />
                        <span className="font-medium text-gray-600 w-24">
                          Occupation:
                        </span>
                        <span className="text-gray-800">
                          {plaintiff.occupation || "Not provided"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl border border-green-200 p-4 text-center">
                  <p className="text-gray-500">No plaintiffs added</p>
                </div>
              )}
            </div>
          </div>

          {/* Defendants */}
          <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border border-red-200 p-6">
            <div className="flex items-center mb-6">
              <div className="bg-red-600 text-white p-2 rounded-lg mr-3">
                <FaUserTag />
              </div>
              <h3 className="text-xl font-semibold text-red-800">
                Defendants ({defendantsData.length})
              </h3>
            </div>
            <div className="space-y-4">
              {defendantsData.length > 0 ? (
                defendantsData.map((defendant, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-red-200 p-4"
                  >
                    <h4 className="font-semibold text-red-800 text-lg mb-3">
                      {defendant.name}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <FaUser className="text-red-600 mr-2 w-5" />
                        <span className="font-medium text-gray-600 w-24">
                          Parents:
                        </span>
                        <span className="text-gray-800">
                          {defendant.parentsName || "Not provided"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaEnvelope className="text-red-600 mr-2 w-5" />
                        <span className="font-medium text-gray-600 w-24">
                          Email:
                        </span>
                        <span className="text-gray-800">{defendant.email}</span>
                      </div>
                      <div className="flex items-center">
                        <FaPhone className="text-red-600 mr-2 w-5" />
                        <span className="font-medium text-gray-600 w-24">
                          Phone:
                        </span>
                        <span className="text-gray-800">
                          {defendant.phone || "Not provided"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-red-600 mr-2 w-5" />
                        <span className="font-medium text-gray-600 w-24">
                          Address:
                        </span>
                        <span className="text-gray-800">
                          {defendant.address || "Not provided"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaBriefcase className="text-red-600 mr-2 w-5" />
                        <span className="font-medium text-gray-600 w-24">
                          Occupation:
                        </span>
                        <span className="text-gray-800">
                          {defendant.occupation || "Not provided"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl border border-red-200 p-4 text-center">
                  <p className="text-gray-500">No defendants added</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 p-6 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-purple-600 text-white p-2 rounded-lg mr-3">
              <FaCreditCard />
            </div>
            <h3 className="text-xl font-semibold text-purple-800">
              Payment Summary
            </h3>
          </div>
          <div className="bg-white rounded-xl p-6 border border-purple-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700">Arbitration Fee:</span>
              <span className="font-semibold">${fees.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700">Processing Fee:</span>
              <span className="font-semibold">$50</span>
            </div>
            <div className="border-t border-gray-300 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">
                  Total Amount:
                </span>
                <span className="text-xl font-bold text-purple-600">
                  ${(fees + 50).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mt-10 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 order-2 md:order-1"
          >
            <FaArrowLeft className="mr-3" /> Back to Defendants
          </button>
          <button
            type="button"
            onClick={onPayment}
            className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 order-1 md:order-2"
          >
            Proceed to Payment <FaCreditCard className="ml-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArbOverview;
