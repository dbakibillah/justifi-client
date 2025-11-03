import React from "react";
import { FaUserTag, FaUser, FaPlus, FaTimes } from "react-icons/fa";

const ArbDefendant = ({
  register,
  errors,
  watch,
  setValue,
  defendants,
  setDefendants,
  onNext,
  onBack,
}) => {
  const addDefendant = () => {
    const newId = defendants.length + 1;
    setDefendants([...defendants, { id: newId }]);
  };

  const removeDefendant = (id) => {
    if (defendants.length <= 1) return;

    // Remove the defendant data from form
    setValue(`defendants.${id}`, undefined);

    const updatedDefendants = defendants
      .filter((defendant) => defendant.id !== id)
      .map((defendant, index) => ({ ...defendant, id: index + 1 }));
    setDefendants(updatedDefendants);
  };

  // Get current form values to check if all required fields are filled
  const currentValues = watch();
  const canProceed = () => {
    if (!currentValues.defendants) return false;

    return defendants.every((defendant) => {
      const defendantData = currentValues.defendants[defendant.id];
      return (
        defendantData &&
        defendantData.name &&
        defendantData.name.trim() !== "" &&
        defendantData.email &&
        defendantData.email.trim() !== ""
      );
    });
  };

  return (
    <div className="fade-in">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100 card-hover">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Defendant Information
            </h2>
            <p className="text-gray-600 mt-2">
              Add all defendants involved in the case
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full font-semibold">
              <FaUserTag className="inline mr-2" />
              Step 3 of 5
            </div>
          </div>
        </div>

        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="bg-red-600 text-white p-2 rounded-lg mr-3">
                <FaUserTag />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Defendants ({defendants.length})
              </h3>
            </div>
          </div>

          <div className="space-y-5">
            {defendants.map((defendant) => (
              <div
                key={defendant.id}
                className="bg-white rounded-xl border-2 border-red-200 p-5"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="bg-red-100 text-red-800 p-2 rounded-lg mr-3">
                      <FaUser />
                    </div>
                    <h4 className="font-semibold text-red-800 text-lg">
                      Defendant {defendant.id}
                    </h4>
                  </div>
                  {defendants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDefendant(defendant.id)}
                      className="remove-defendant text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors duration-200"
                    >
                      <FaTimes className="text-lg" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name / Company *
                    </label>
                    <input
                      type="text"
                      {...register(`defendants.${defendant.id}.name`, {
                        required: "Name is required",
                      })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Full Name or Company Name"
                    />
                    {errors.defendants?.[defendant.id]?.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.defendants[defendant.id].name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Parents Name
                    </label>
                    <input
                      type="text"
                      {...register(`defendants.${defendant.id}.parentsName`)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter parents name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register(`defendants.${defendant.id}.email`, {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="email@example.com"
                    />
                    {errors.defendants?.[defendant.id]?.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.defendants[defendant.id].email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      {...register(`defendants.${defendant.id}.phone`)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="+8801812345678"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      {...register(`defendants.${defendant.id}.address`)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Occupation / Business
                    </label>
                    <input
                      type="text"
                      {...register(`defendants.${defendant.id}.occupation`)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Occupation or Business Type"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={addDefendant}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-5 py-3 rounded-xl transition-all duration-200 flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <FaPlus className="mr-2" /> Add Defendant
            </button>
          </div>
        </div>

        <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Back to Plaintiffs
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!canProceed()}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:transform-none"
          >
            Review Case Overview
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArbDefendant;
