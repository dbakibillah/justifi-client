// components/ArbitrationForm.js
import React, { useState } from "react";
import ArbPartySection from "./ArbPartySection";
import ArbDisputeInformation from "./ArbDisputeInformation";
import ArbitratorsInformation from "./ArbitratorsInformation";
import ArbFinancialInformation from "./ArbFinancialInformation";
import JustifiRepresentative from "./JustifiRepresentative";

const ArbitrationForm = ({ onSubmit }) => {
  const [plaintiffs, setPlaintiffs] = useState([
    {
      id: "plaintiff-1",
      name: "palash rahman",
      email: "palash@gmail.com",
      phone: "09876543211",
      address: "Dhaka",
      occupation: "job",
      signature: null,
      signatureDate: new Date().toISOString().split("T")[0],
    },
    {
      id: "plaintiff-2",
      name: "john doe",
      email: "john@example.com",
      phone: "09876543212",
      address: "Chittagong",
      occupation: "engineer",
      signature: null,
      signatureDate: new Date().toISOString().split("T")[0],
    },
  ]);

  const [defendants, setDefendants] = useState([
    {
      id: "defendant-1",
      name: "plash",
      email: "plash@gmail.com",
      phone: "12345678900",
      address: "Dhaka",
      occupation: "business",
      signature: null,
      signatureDate: new Date().toISOString().split("T")[0],
    },
    {
      id: "defendant-2",
      name: "nahidur rahman",
      email: "nahidur@gmail.com",
      phone: "34567890123",
      address: "Dhaka",
      occupation: "Job",
      signature: null,
      signatureDate: new Date().toISOString().split("T")[0],
    },
    {
      id: "defendant-3",
      name: "mehedi",
      email: "itor@gmail.com",
      phone: "56789043211",
      address: "Dhaka",
      occupation: "Dalal",
      signature: null,
      signatureDate: new Date().toISOString().split("T")[0],
    },
  ]);

  const [disputeInfo, setDisputeInfo] = useState({
    nature: "fraud case",
  });

  const [arbitrators, setArbitrators] = useState({
    arbitrator1: "",
    arbitrator2: "",
    presidingArbitrator: "",
  });

  const [financialInfo, setFinancialInfo] = useState({
    suitValue: "50000",
    sittings: "",
    totalCost: "",
    complianceDays: "",
  });

  const [justifiRep, setJustifiRep] = useState({
    name: "",
    designation: "",
    signature: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all signatures are provided
    let allSignaturesProvided = true;
    let missingSignatures = [];

    plaintiffs.forEach((plaintiff) => {
      if (!plaintiff.signature) {
        allSignaturesProvided = false;
        missingSignatures.push(`Plaintiff: ${plaintiff.name}`);
      }
    });

    defendants.forEach((defendant) => {
      if (!defendant.signature) {
        allSignaturesProvided = false;
        missingSignatures.push(`Defendant: ${defendant.name}`);
      }
    });

    if (!justifiRep.signature) {
      allSignaturesProvided = false;
      missingSignatures.push("JustiFi Representative");
    }

    if (!allSignaturesProvided) {
      alert(
        "Please provide signatures for all parties:\n" +
          missingSignatures.join("\n")
      );
      return;
    }

    const formData = {
      agreementDate: new Date().toISOString().split("T")[0],
      plaintiffs: plaintiffs,
      defendants: defendants,
      disputeNature: disputeInfo.nature,
      arbitrator1: arbitrators.arbitrator1,
      arbitrator2: arbitrators.arbitrator2,
      presidingArbitrator: arbitrators.presidingArbitrator,
      suitValue: financialInfo.suitValue,
      sittings: financialInfo.sittings,
      totalCost: financialInfo.totalCost,
      complianceDays: financialInfo.complianceDays,
      justifiName: justifiRep.name,
      justifiDesignation: justifiRep.designation,
      justifiSignature: justifiRep.signature,
    };

    onSubmit(formData);
  };

  const updatePlaintiff = (id, field, value) => {
    setPlaintiffs((prev) =>
      prev.map((plaintiff) =>
        plaintiff.id === id ? { ...plaintiff, [field]: value } : plaintiff
      )
    );
  };

  const updateDefendant = (id, field, value) => {
    setDefendants((prev) =>
      prev.map((defendant) =>
        defendant.id === id ? { ...defendant, [field]: value } : defendant
      )
    );
  };

  return (
    <div id="form-section" className="bg-white rounded-lg shadow-md p-6 mb-8">
      <form id="arbitration-form" onSubmit={handleSubmit}>
        {/* Party Information */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Party Information</h2>

          <ArbPartySection
            title="Plaintiffs/Claimants"
            // type="plaintiff"
            parties={plaintiffs}
            onUpdateParty={updatePlaintiff}
            colorClass="text-blue-600"
          />

          <ArbPartySection
            title="Defendants/Respondents"
            // type="defendant"
            parties={defendants}
            onUpdateParty={updateDefendant}
            colorClass="text-red-600"
          />
        </div>

        <ArbDisputeInformation
          disputeInfo={disputeInfo}
          onUpdateDisputeInfo={setDisputeInfo}
        />

        <ArbitratorsInformation
          arbitrators={arbitrators}
          onUpdateArbitrators={setArbitrators}
        />

        <ArbFinancialInformation
          financialInfo={financialInfo}
          onUpdateFinancialInfo={setFinancialInfo}
        />

        <JustifiRepresentative
          justifiRep={justifiRep}
          onUpdateJustifiRep={setJustifiRep}
        />

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Generate Arbitration Agreement
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArbitrationForm;
