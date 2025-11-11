import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import ArbPartySection from "./ArbPartySection";
import ArbDisputeInformation from "./ArbDisputeInformation";
import ArbitratorsInformation from "./ArbitratorsInformation";
import ArbFinancialInformation from "./ArbFinancialInformation";
import JustifiRepresentative from "./JustifiRepresentative";

const ArbitrationForm = ({ onSubmit }) => {
  const axiosPublic = useAxiosPublic();

  // Fetch arbitration cases data
  const { data: arbitrationCases, isLoading: casesLoading } = useQuery({
    queryKey: ["arbitrationCases"],
    queryFn: async () => {
      const response = await axiosPublic.get("/all-arbitrations");
      return response.data;
    },
  });

  // Fetch arbitrators data
  const { data: arbitrators, isLoading: arbitratorsLoading } = useQuery({
    queryKey: ["arbitrators"],
    queryFn: async () => {
      const response = await axiosPublic.get("/arbitrators");
      return response.data;
    },
  });

  // Transform plaintiffs data from backend format to component format
  const transformPlaintiffs = () => {
    if (!arbitrationCases || arbitrationCases.length === 0) return [];

    const caseData = arbitrationCases[0]; // Assuming we're using the first case
    const plaintiffs = caseData.plaintiffs;

    return Object.keys(plaintiffs).map((key, index) => ({
      id: `plaintiff-${index + 1}`,
      name: plaintiffs[key].name,
      email: plaintiffs[key].email,
      phone: plaintiffs[key].phone,
      address: plaintiffs[key].address,
      occupation: plaintiffs[key].occupation,
      parentsName: plaintiffs[key].parentsName,
      signature: null,
      signatureDate: new Date().toISOString().split("T")[0],
    }));
  };

  // Transform defendants data from backend format to component format
  const transformDefendants = () => {
    if (!arbitrationCases || arbitrationCases.length === 0) return [];

    const caseData = arbitrationCases[0]; // Assuming we're using the first case
    const defendants = caseData.defendants;

    return Object.keys(defendants).map((key, index) => ({
      id: `defendant-${index + 1}`,
      name: defendants[key].name,
      email: defendants[key].email,
      phone: defendants[key].phone,
      address: defendants[key].address,
      occupation: defendants[key].occupation,
      parentsName: defendants[key].parentsName,
      signature: null,
      signatureDate: new Date().toISOString().split("T")[0],
    }));
  };

  const [plaintiffs, setPlaintiffs] = useState([]);
  const [defendants, setDefendants] = useState([]);
  const [disputeInfo, setDisputeInfo] = useState({
    nature: "",
  });
  const [arbitratorsInfo, setArbitratorsInfo] = useState({
    arbitrator1: "",
    arbitrator2: "",
    presidingArbitrator: "",
  });
  const [financialInfo, setFinancialInfo] = useState({
    suitValue: "",
    sittings: "",
    totalCost: "",
    complianceDays: "",
  });
  const [justifiRep, setJustifiRep] = useState({
    name: "",
    designation: "",
    signature: null,
  });

  // Initialize data when API data is loaded
  React.useEffect(() => {
    if (arbitrationCases && arbitrationCases.length > 0) {
      const caseData = arbitrationCases[0];
      setPlaintiffs(transformPlaintiffs());
      setDefendants(transformDefendants());
      setDisputeInfo((prev) => ({
        ...prev,
        nature: caseData.disputeNature || "",
      }));
      setFinancialInfo((prev) => ({
        ...prev,
        suitValue: caseData.suitValue || "",
      }));
    }
  }, [arbitrationCases]);

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
      arbitrator1: arbitratorsInfo.arbitrator1,
      arbitrator2: arbitratorsInfo.arbitrator2,
      presidingArbitrator: arbitratorsInfo.presidingArbitrator,
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

  if (casesLoading || arbitratorsLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex justify-center items-center h-64">
        <div className="text-lg">Loading arbitration data...</div>
      </div>
    );
  }

  return (
    <div id="form-section" className="bg-white rounded-lg shadow-md p-6 mb-8">
      <form id="arbitration-form" onSubmit={handleSubmit}>
        {/* Party Information */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Party Information</h2>

          <ArbPartySection
            title="Plaintiffs/Claimants"
            parties={plaintiffs}
            onUpdateParty={updatePlaintiff}
            colorClass="text-blue-600"
          />

          <ArbPartySection
            title="Defendants/Respondents"
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
          arbitrators={arbitratorsInfo}
          onUpdateArbitrators={setArbitratorsInfo}
          arbitratorsList={arbitrators || []}
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
