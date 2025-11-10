// components/ArbPartySection.js
import React from "react";
import { FaTrash } from "react-icons/fa";

const ArbPartySection = ({ title, parties, onUpdateParty, colorClass }) => {
  //, type
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
            className="party-card border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50"
          >
            <div className="party-info bg-gray-100 p-2 rounded mb-3">
              <p>
                <strong>Name:</strong> {party.name}
              </p>
              <p>
                <strong>Email:</strong> {party.email}
              </p>
              <p>
                <strong>Phone:</strong> {party.phone}
              </p>
              <p>
                <strong>Address:</strong> {party.address}
              </p>
              <p>
                <strong>Occupation:</strong> {party.occupation}
              </p>
            </div>
            <div className="signature-field mt-4 pt-4 border-t border-dashed border-gray-300">
              <h5 className="font-medium mb-2">Signature</h5>
              <div
                className="signature-container border border-gray-300 rounded bg-white min-h-[150px] flex items-center justify-center mb-3 cursor-pointer"
                onClick={() =>
                  document.getElementById(`${party.id}-file`).click()
                }
              >
                <input
                  type="file"
                  id={`${party.id}-file`}
                  className="signature-upload hidden"
                  accept="image/*"
                  onChange={(e) =>
                    handleSignatureUpload(party.id, e.target.files[0])
                  }
                />
                <div className="signature-preview w-full h-full flex items-center justify-center">
                  {party.signature ? (
                    <img
                      src={party.signature}
                      className="signature-preview max-w-full max-h-[150px]"
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
                  className="clear-signature bg-red-500 text-white px-3 py-1 rounded text-sm flex items-center gap-2"
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

export default ArbPartySection;
