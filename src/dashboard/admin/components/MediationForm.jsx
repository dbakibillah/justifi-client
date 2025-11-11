import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import MedPartySection from "./MedPartySection";
import MedDisputeInformation from "./MedDisputeInformation";
import MediatorDetails from "./MediatorDetails";
import MedCostBreakdown from "./MedCostBreakdown";
import JustifiRepresentative from "./JustifiRepresentative";

const MediationForm = ({ onSubmit }) => {
  const axiosPublic = useAxiosPublic();

  // Fetch mediation cases
  const { data: mediationCases } = useQuery({
    queryKey: ["all-mediation"],
    queryFn: async () => {
      const response = await axiosPublic.get("/all-mediation");
      return response.data;
    },
  });

  // Fetch mediators
  const { data: mediators } = useQuery({
    queryKey: ["mediators"],
    queryFn: async () => {
      const response = await axiosPublic.get("/mediators");
      return response.data;
    },
  });

  const [plaintiffs, setPlaintiffs] = useState([]);
  const [defendants, setDefendants] = useState([]);

  const [disputeInfo, setDisputeInfo] = useState({
    category: "",
    suitValue: "",
    nature: "",
  });

  const [mediatorDetails, setMediatorDetails] = useState({
    sessionsAgreed: "1",
    totalCost: "",
    mediatorName: "",
    mediatorQualification: "",
  });

  const [justifiRep, setJustifiRep] = useState({
    name: "",
    designation: "",
    signature: null,
  });

  const [costPerParty, setCostPerParty] = useState(0);

  // Initialize plaintiffs and defendants when mediation cases are loaded
  useEffect(() => {
    if (mediationCases && mediationCases.length > 0) {
      const firstCase = mediationCases[0];

      // Convert plaintiffs object to array
      const plaintiffsArray = Object.values(firstCase.plaintiffs || {}).map(
        (plaintiff, index) => ({
          id: `plaintiff-${index + 1}`,
          name: plaintiff.name || "",
          parents: plaintiff.parentsName || "",
          email: plaintiff.email || "",
          phone: plaintiff.phone || "",
          address: plaintiff.address || "",
          occupation: plaintiff.occupation || "",
          signature: null,
          signatureDate: new Date().toISOString().split("T")[0],
        })
      );

      // Convert defendants object to array
      const defendantsArray = Object.values(firstCase.defendants || {}).map(
        (defendant, index) => ({
          id: `defendant-${index + 1}`,
          name: defendant.name || "",
          parents: defendant.parentsName || "",
          email: defendant.email || "",
          phone: defendant.phone || "",
          address: defendant.address || "",
          occupation: defendant.occupation || "",
          signature: null,
          signatureDate: new Date().toISOString().split("T")[0],
        })
      );

      setPlaintiffs(plaintiffsArray);
      setDefendants(defendantsArray);

      // Set dispute information from the backend
      setDisputeInfo({
        category: firstCase.caseCategory || "",
        suitValue: "00.00",
        nature: firstCase.disputeNature || "",
      });
    }
  }, [mediationCases]);

  useEffect(() => {
    calculateCosts();
  }, [mediatorDetails.totalCost, plaintiffs.length, defendants.length]);

  const calculateCosts = () => {
    const totalCost = parseFloat(mediatorDetails.totalCost) || 0;
    const partyCount = plaintiffs.length + defendants.length;
    const costPerParty = totalCost / partyCount;
    setCostPerParty(costPerParty);
  };

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
      disputeCategory: disputeInfo.category,
      suitValue: disputeInfo.suitValue,
      plaintiffs: plaintiffs,
      defendants: defendants,
      disputeNature: disputeInfo.nature,
      sessionsAgreed: mediatorDetails.sessionsAgreed,
      totalCost: mediatorDetails.totalCost,
      costPerParty: costPerParty.toFixed(2),
      mediatorName: mediatorDetails.mediatorName,
      mediatorQualification: mediatorDetails.mediatorQualification,
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
      <form id="mediation-form" onSubmit={handleSubmit}>
        {/* Party Information */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Party Information</h2>

          <MedPartySection
            title="Plaintiffs/Claimants"
            type="plaintiff"
            parties={plaintiffs}
            onUpdateParty={updatePlaintiff}
            colorClass="text-blue-600"
          />

          <MedPartySection
            title="Defendants/Respondents"
            type="defendant"
            parties={defendants}
            onUpdateParty={updateDefendant}
            colorClass="text-red-600"
          />
        </div>

        <MedDisputeInformation
          disputeInfo={disputeInfo}
          onUpdateDisputeInfo={setDisputeInfo}
        />

        <MediatorDetails
          mediatorDetails={mediatorDetails}
          onUpdateMediatorDetails={setMediatorDetails}
          mediators={mediators || []}
        />

        <MedCostBreakdown
          totalCost={mediatorDetails.totalCost}
          costPerParty={costPerParty}
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
            Generate Mediation Agreement
          </button>
        </div>
      </form>
    </div>
  );
};

export default MediationForm;
