import React from "react";
import { FaTrash } from "react-icons/fa";

const MedPartySection = ({
  title,
  //type,
  parties,
  onUpdateParty,
  colorClass,
}) => {
  const handleSignatureUpload = (partyId, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpdateParty(partyId, "signature", event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearSignature = (partyId) => {
    onUpdateParty(partyId, "signature", null);
  };

  return (
    <div className="mb-6">
      <h3 className={`text-lg font-medium mb-3 ${colorClass}`}>{title}</h3>
      <div>
        {parties.map((party) => (
          <div
            key={party.id}
            className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50"
          >
            <div className="mb-4">
              <p className="font-medium">Name: {party.name}</p>
              <p className="text-sm text-gray-600">Parents: {party.parents}</p>
              <p className="text-sm text-gray-600">Email: {party.email}</p>
              <p className="text-sm text-gray-600">Phone: {party.phone}</p>
              <p className="text-sm text-gray-600">Address: {party.address}</p>
              <p className="text-sm text-gray-600">
                Occupation: {party.occupation}
              </p>
            </div>
            <div className="border-t border-dashed border-gray-300 pt-4">
              <h5 className="font-medium mb-2">Signature</h5>
              <div
                className="border border-gray-300 rounded-md bg-white min-h-[150px] flex items-center justify-center cursor-pointer mb-3"
                onClick={() =>
                  document.getElementById(`${party.id}-file`).click()
                }
              >
                <input
                  type="file"
                  id={`${party.id}-file`}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    handleSignatureUpload(party.id, e.target.files[0])
                  }
                />
                <div className="w-full h-full flex items-center justify-center">
                  {party.signature ? (
                    <img
                      src={party.signature}
                      className="max-w-full max-h-[150px]"
                      alt="Signature"
                    />
                  ) : (
                    <span className="text-gray-500">
                      Click to upload signature
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm flex items-center gap-2"
                  onClick={() => clearSignature(party.id)}
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
        ))}
      </div>
    </div>
  );
};

export default MedPartySection;
