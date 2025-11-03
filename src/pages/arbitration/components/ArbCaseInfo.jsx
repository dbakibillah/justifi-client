import React from "react";
import { FaInfoCircle, FaGavel } from "react-icons/fa";

const ArbCaseInfo = ({ register, errors, onNext }) => {
  return (
    <div className="fade-in">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100 card-hover">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Case Information
            </h2>
            <p className="text-gray-600 mt-2">
              Provide basic details about your arbitration case
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
              <FaInfoCircle className="inline mr-2" />
              Step 1 of 4
            </div>
          </div>
        </div>

        <form onSubmit={onNext}>
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                <FaInfoCircle />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Case Details
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Case Title *
                </label>
                <input
                  type="text"
                  {...register("caseTitle", {
                    required: "Case title is required",
                  })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., TechCorp vs SoftSolutions"
                />
                {errors.caseTitle && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.caseTitle.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Category *
                </label>
                <select
                  {...register("caseCategory", {
                    required: "Category is required",
                  })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Category</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Construction">Construction</option>
                  <option value="Employment">Employment</option>
                  <option value="Intellectual Property">
                    Intellectual Property
                  </option>
                  <option value="International Trade">
                    International Trade
                  </option>
                  <option value="Other">Other</option>
                </select>
                {errors.caseCategory && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.caseCategory.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Nature of Dispute *
                </label>
                <textarea
                  rows="4"
                  {...register("disputeNature", {
                    required: "Nature of dispute is required",
                  })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Please describe the nature of the dispute in detail..."
                />
                {errors.disputeNature && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.disputeNature.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Suit Value ($) *
                </label>
                <input
                  type="number"
                  {...register("suitValue", {
                    required: "Suit value is required",
                    min: {
                      value: 1,
                      message: "Suit value must be greater than 0",
                    },
                  })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="500000"
                />
                {errors.suitValue && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.suitValue.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-10 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Continue to Plaintiffs <FaGavel className="ml-3" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArbCaseInfo;
