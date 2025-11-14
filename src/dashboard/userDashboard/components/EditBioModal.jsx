import React from "react";
import { FaTimes, FaSave } from "react-icons/fa";

const EditBioModal = ({ isOpen, tempData, onInputChange, onSave, onClose }) => {
  if (!isOpen) return null;

  const charCount = tempData.bio?.length || 0;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Edit Bio</h3>
              <p className="text-gray-500 text-sm mt-1">
                Tell us about yourself
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

        <div className="p-6">
          <textarea
            value={tempData.bio || ""}
            onChange={(e) => onInputChange("bio", e.target.value)}
            className="w-full h-64 px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none bg-white text-gray-700 leading-relaxed"
            placeholder="Tell us about yourself, your experience, and what you're passionate about..."
          />
          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
            <span>Share your story with the community</span>
            <span
              className={charCount > 500 ? "text-red-500 font-semibold" : ""}
            >
              {charCount}/500
            </span>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onSave}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <FaSave className="h-5 w-5" />
            Save Bio
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
  );
};

export default EditBioModal;
