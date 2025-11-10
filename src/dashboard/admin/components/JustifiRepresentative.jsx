import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const JustifiRepresentative = ({ justifiRep, onUpdateJustifiRep }) => {
  const [showJustifiDropdown, setShowJustifiDropdown] = useState(false);
  const [justifiSearch, setJustifiSearch] = useState("");

  const representatives = [
    {
      name: "Jennifer Martinez",
      designation: "Senior Legal Counsel",
    },
    {
      name: "David Kim",
      designation: "Head of Mediation Services",
    },
    {
      name: "Amanda Wilson",
      designation: "Legal Operations Manager",
    },
    {
      name: "James Thompson",
      designation: "Director of Dispute Resolution",
    },
  ];

  const handleChange = (field, value) => {
    onUpdateJustifiRep((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const selectRepresentative = (rep) => {
    handleChange("name", rep.name);
    handleChange("designation", rep.designation);
    setJustifiSearch(rep.name);
    setShowJustifiDropdown(false);
  };

  const handleSignatureUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleChange("signature", event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearSignature = () => {
    handleChange("signature", null);
  };

  const filteredRepresentatives = representatives.filter(
    (rep) =>
      rep.name.toLowerCase().includes(justifiSearch.toLowerCase()) ||
      rep.designation.toLowerCase().includes(justifiSearch.toLowerCase())
  );

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">JustiFi Representative</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={justifiSearch}
                onChange={(e) => setJustifiSearch(e.target.value)}
                onFocus={() => setShowJustifiDropdown(true)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Type to search representatives..."
              />
              {showJustifiDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredRepresentatives.map((rep, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => selectRepresentative(rep)}
                    >
                      <div className="font-medium">{rep.name}</div>
                      <div className="text-sm text-gray-600">
                        {rep.designation}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Designation
            </label>
            <input
              type="text"
              value={justifiRep.designation}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          JustiFi Representative Signature
        </h2>
        <div className="border border-gray-200 rounded-md p-4">
          <div
            className="border border-gray-300 rounded-md bg-white min-h-[150px] flex items-center justify-center cursor-pointer mb-3"
            onClick={() =>
              document.getElementById("justifi-signature-upload").click()
            }
          >
            <input
              type="file"
              id="justifi-signature-upload"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleSignatureUpload(e.target.files[0])}
            />
            <div className="w-full h-full flex items-center justify-center">
              {justifiRep.signature ? (
                <img
                  src={justifiRep.signature}
                  className="max-w-full max-h-[150px]"
                  alt="JustiFi Signature"
                />
              ) : (
                <span className="text-gray-500">Click to upload signature</span>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-red-500 text-white px-3 py-1 rounded text-sm flex items-center gap-2"
              onClick={clearSignature}
            >
              <FaTrash className="text-xs" />
              Clear
            </button>
            <div className="text-sm text-gray-500">
              Upload signature image (PNG, JPG)
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JustifiRepresentative;
