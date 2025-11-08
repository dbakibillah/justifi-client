import React from "react";
import { FaCheck, FaTimes, FaSave, FaImage, FaLock } from "react-icons/fa";

const EditProfileModal = ({
  isOpen,
  profileData,
  tempData,
  //currentPhotoFile,
  onInputChange,
  onPhotoUpload,
  onSave,
  onClose,
  fileInputRef,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row min-h-0">
          {/* Left Side - Profile Picture */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 md:w-2/5 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
            <div className="relative mb-6">
              <img
                src={profileData.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 border-4 border-white shadow-lg">
                <FaCheck className="h-4 w-4 text-white" />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {tempData.fullName || profileData.fullName}
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                {tempData.address || profileData.address}
              </p>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-medium px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <FaImage className="h-5 w-5" />
                Change Photo
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={onPhotoUpload}
              />

              <p className="text-gray-500 text-xs mt-3">
                JPG, GIF or PNG. Max 5MB
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex-1 flex flex-col">
            <div className="p-6 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Edit Profile
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Update your personal information
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={tempData.fullName || ""}
                  onChange={(e) => onInputChange("fullName", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email (Disabled) */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed pr-10"
                    value={profileData.email}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <p className="text-xs text-blue-500 font-medium">
                  Email address cannot be changed for security reasons
                </p>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={tempData.phone || ""}
                  onChange={(e) => onInputChange("phone", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  value={tempData.address || ""}
                  onChange={(e) => onInputChange("address", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  placeholder="Enter your address"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onSave}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <FaSave className="h-5 w-5" />
                Save Changes
              </button>
              <button
                onClick={onClose}
                className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <FaTimes className="h-5 w-5" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
