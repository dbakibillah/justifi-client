import React from "react";
import {
  FaUserShield,
  FaUser,
  FaPlus,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";

const ArbPlaintiff = ({
  register,
  errors,
  watch,
  setValue,
  plaintiffs,
  setPlaintiffs,
  onNext,
  onBack,
}) => {
  const addPlaintiff = () => {
    const newId = plaintiffs.length + 1;
    setPlaintiffs([...plaintiffs, { id: newId }]);
  };

  const removePlaintiff = (id) => {
    if (plaintiffs.length <= 1) return;

    // Remove the plaintiff data from form
    setValue(`plaintiffs.${id}`, undefined);

    const updatedPlaintiffs = plaintiffs
      .filter((plaintiff) => plaintiff.id !== id)
      .map((plaintiff, index) => ({ ...plaintiff, id: index + 1 }));
    setPlaintiffs(updatedPlaintiffs);
  };

  // Get current form values to check if all required fields are filled
  const currentValues = watch();
  const canProceed = () => {
    if (!currentValues.plaintiffs) return false;

    return plaintiffs.every((plaintiff) => {
      const plaintiffData = currentValues.plaintiffs[plaintiff.id];
      return (
        plaintiffData &&
        plaintiffData.name &&
        plaintiffData.name.trim() !== "" &&
        plaintiffData.email &&
        plaintiffData.email.trim() !== ""
      );
    });
  };

  return (
    <div className="fade-in">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100 card-hover">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Plaintiff Information
            </h2>
            <p className="text-gray-600 mt-2">
              Add all plaintiffs involved in the case
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
              <FaUserShield className="inline mr-2" />
              Step 2 of 5
            </div>
          </div>
        </div>

        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="bg-green-600 text-white p-2 rounded-lg mr-3">
                <FaUserShield />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Plaintiffs ({plaintiffs.length})
              </h3>
            </div>
          </div>

          <div className="space-y-5">
            {plaintiffs.map((plaintiff) => (
              <div
                key={plaintiff.id}
                className="bg-white rounded-xl border-2 border-green-200 p-5"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="bg-green-100 text-green-800 p-2 rounded-lg mr-3">
                      <FaUser />
                    </div>
                    <h4 className="font-semibold text-green-800 text-lg">
                      Plaintiff {plaintiff.id}
                    </h4>
                  </div>
                  {plaintiffs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePlaintiff(plaintiff.id)}
                      className="remove-plaintiff text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors duration-200"
                    >
                      <FaTimes className="text-lg" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register(`plaintiffs.${plaintiff.id}.name`, {
                        required: "Name is required",
                      })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter full name"
                    />
                    {errors.plaintiffs?.[plaintiff.id]?.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.plaintiffs[plaintiff.id].name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Parents Name
                    </label>
                    <input
                      type="text"
                      {...register(`plaintiffs.${plaintiff.id}.parentsName`)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter parents name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register(`plaintiffs.${plaintiff.id}.email`, {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="email@example.com"
                    />
                    {errors.plaintiffs?.[plaintiff.id]?.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.plaintiffs[plaintiff.id].email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      {...register(`plaintiffs.${plaintiff.id}.phone`)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="+8801712345678"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      {...register(`plaintiffs.${plaintiff.id}.address`)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Occupation
                    </label>
                    <input
                      type="text"
                      {...register(`plaintiffs.${plaintiff.id}.occupation`)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Occupation"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={addPlaintiff}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-5 py-3 rounded-xl transition-all duration-200 flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <FaPlus className="mr-2" /> Add Plaintiff
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 mt-10 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <FaArrowLeft className="mr-3" />
            Back to Case Info
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!canProceed()}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:transform-none"
          >
            Continue to Defendants
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArbPlaintiff;
