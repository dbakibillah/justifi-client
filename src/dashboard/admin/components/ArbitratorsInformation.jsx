// components/ArbitratorsInformation.js
import React, { useState } from "react";

const ArbitratorsInformation = ({ arbitrators, onUpdateArbitrators }) => {
  const [showDropdowns, setShowDropdowns] = useState({
    arbitrator1: false,
    arbitrator2: false,
    presidingArbitrator: false,
  });

  const [searchTerms, setSearchTerms] = useState({
    arbitrator1: "",
    arbitrator2: "",
    presidingArbitrator: "",
  });

  const arbitratorList = [
    {
      id: 1,
      name: "Dr. Mohammad Farooq",
      specialization: "Commercial Law",
      experience: "15 years",
    },
    {
      id: 2,
      name: "Advocate Ayesha Rahman",
      specialization: "Family Law",
      experience: "12 years",
    },
    {
      id: 3,
      name: "Prof. Ahmed Hossain",
      specialization: "Contract Law",
      experience: "20 years",
    },
    {
      id: 4,
      name: "Barrister Fatima Begum",
      specialization: "Corporate Law",
      experience: "18 years",
    },
    {
      id: 5,
      name: "Dr. Kamal Uddin",
      specialization: "Intellectual Property",
      experience: "14 years",
    },
    {
      id: 6,
      name: "Advocate Rahim Khan",
      specialization: "Labor Law",
      experience: "10 years",
    },
    {
      id: 7,
      name: "Prof. Nasreen Akhtar",
      specialization: "International Law",
      experience: "22 years",
    },
    {
      id: 8,
      name: "Barrister Tariq Islam",
      specialization: "Construction Law",
      experience: "16 years",
    },
    {
      id: 9,
      name: "Dr. Sabrina Chowdhury",
      specialization: "Banking Law",
      experience: "13 years",
    },
    {
      id: 10,
      name: "Advocate Zafar Iqbal",
      specialization: "Real Estate",
      experience: "11 years",
    },
  ];

  const handleChange = (field, value) => {
    onUpdateArbitrators((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearchChange = (field, value) => {
    setSearchTerms((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFocus = (field) => {
    setShowDropdowns((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleBlur = (field) => {
    setTimeout(() => {
      setShowDropdowns((prev) => ({
        ...prev,
        [field]: false,
      }));
    }, 200);
  };

  const selectArbitrator = (field, arbitratorName) => {
    handleChange(field, arbitratorName);
    setSearchTerms((prev) => ({
      ...prev,
      [field]: arbitratorName,
    }));
    setShowDropdowns((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  // Get available arbitrators for a specific field (excluding already selected ones)
  const getAvailableArbitrators = (field) => {
    const selectedArbitrators = [];

    // Collect all arbitrators selected in other fields
    if (field !== "arbitrator1" && arbitrators.arbitrator1) {
      selectedArbitrators.push(arbitrators.arbitrator1);
    }
    if (field !== "arbitrator2" && arbitrators.arbitrator2) {
      selectedArbitrators.push(arbitrators.arbitrator2);
    }
    if (field !== "presidingArbitrator" && arbitrators.presidingArbitrator) {
      selectedArbitrators.push(arbitrators.presidingArbitrator);
    }

    // Filter out selected arbitrators
    return arbitratorList.filter(
      (arbitrator) => !selectedArbitrators.includes(arbitrator.name)
    );
  };

  const filteredArbitrators = (field) => {
    const searchTerm = searchTerms[field].toLowerCase();
    const availableArbitrators = getAvailableArbitrators(field);

    return availableArbitrators.filter(
      (arbitrator) =>
        arbitrator.name.toLowerCase().includes(searchTerm) ||
        arbitrator.specialization.toLowerCase().includes(searchTerm)
    );
  };

  // Clear dependent fields when a selection changes
  const handleArbitratorSelection = (field, arbitratorName) => {
    // Clear downstream fields when an upstream field changes
    if (field === "arbitrator1") {
      if (arbitrators.arbitrator2 === arbitratorName) {
        handleChange("arbitrator2", "");
        setSearchTerms((prev) => ({ ...prev, arbitrator2: "" }));
      }
      if (arbitrators.presidingArbitrator === arbitratorName) {
        handleChange("presidingArbitrator", "");
        setSearchTerms((prev) => ({ ...prev, presidingArbitrator: "" }));
      }
    } else if (field === "arbitrator2") {
      if (arbitrators.presidingArbitrator === arbitratorName) {
        handleChange("presidingArbitrator", "");
        setSearchTerms((prev) => ({ ...prev, presidingArbitrator: "" }));
      }
    }

    selectArbitrator(field, arbitratorName);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Arbitrators Information</h2>
      <div className="space-y-4">
        <div className="searchable-dropdown relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Arbitrator 1
          </label>
          <input
            type="text"
            value={searchTerms.arbitrator1}
            onChange={(e) => handleSearchChange("arbitrator1", e.target.value)}
            onFocus={() => handleFocus("arbitrator1")}
            onBlur={() => handleBlur("arbitrator1")}
            className="dropdown-input w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Search and select arbitrator..."
            required
          />
          {showDropdowns.arbitrator1 && (
            <div className="dropdown-list absolute top-full left-0 right-0 bg-white border border-gray-300 border-t-0 rounded-b max-h-48 overflow-y-auto z-10">
              {filteredArbitrators("arbitrator1").map((arbitrator) => (
                <div
                  key={arbitrator.id}
                  className="dropdown-item p-2 cursor-pointer hover:bg-gray-100"
                  onMouseDown={() =>
                    handleArbitratorSelection("arbitrator1", arbitrator.name)
                  }
                >
                  <div className="font-medium">{arbitrator.name}</div>
                  <div className="text-sm text-gray-600">
                    {arbitrator.specialization} - {arbitrator.experience}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="searchable-dropdown relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Arbitrator 2
          </label>
          <input
            type="text"
            value={searchTerms.arbitrator2}
            onChange={(e) => handleSearchChange("arbitrator2", e.target.value)}
            onFocus={() => handleFocus("arbitrator2")}
            onBlur={() => handleBlur("arbitrator2")}
            className="dropdown-input w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Search and select arbitrator..."
            required
          />
          {showDropdowns.arbitrator2 && (
            <div className="dropdown-list absolute top-full left-0 right-0 bg-white border border-gray-300 border-t-0 rounded-b max-h-48 overflow-y-auto z-10">
              {filteredArbitrators("arbitrator2").map((arbitrator) => (
                <div
                  key={arbitrator.id}
                  className="dropdown-item p-2 cursor-pointer hover:bg-gray-100"
                  onMouseDown={() =>
                    handleArbitratorSelection("arbitrator2", arbitrator.name)
                  }
                >
                  <div className="font-medium">{arbitrator.name}</div>
                  <div className="text-sm text-gray-600">
                    {arbitrator.specialization} - {arbitrator.experience}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="searchable-dropdown relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Presiding Arbitrator
          </label>
          <input
            type="text"
            value={searchTerms.presidingArbitrator}
            onChange={(e) =>
              handleSearchChange("presidingArbitrator", e.target.value)
            }
            onFocus={() => handleFocus("presidingArbitrator")}
            onBlur={() => handleBlur("presidingArbitrator")}
            className="dropdown-input w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Search and select arbitrator..."
            required
          />
          {showDropdowns.presidingArbitrator && (
            <div className="dropdown-list absolute top-full left-0 right-0 bg-white border border-gray-300 border-t-0 rounded-b max-h-48 overflow-y-auto z-10">
              {filteredArbitrators("presidingArbitrator").map((arbitrator) => (
                <div
                  key={arbitrator.id}
                  className="dropdown-item p-2 cursor-pointer hover:bg-gray-100"
                  onMouseDown={() =>
                    handleArbitratorSelection(
                      "presidingArbitrator",
                      arbitrator.name
                    )
                  }
                >
                  <div className="font-medium">{arbitrator.name}</div>
                  <div className="text-sm text-gray-600">
                    {arbitrator.specialization} - {arbitrator.experience}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArbitratorsInformation;
