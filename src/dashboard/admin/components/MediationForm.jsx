import { useEffect, useState } from "react";
import JustifiRepresentative from "./JustifiRepresentative";
import MedCostBreakdown from "./MedCostBreakdown";
import MedDisputeInformation from "./MedDisputeInformation";
import MediatorDetails from "./MediatorDetails";
import MedPartySection from "./MedPartySection";

const MediationForm = ({ onSubmit }) => {
    const [plaintiffs, setPlaintiffs] = useState([
        {
            id: "plaintiff-1",
            name: "Naimur Rahman",
            parents: "rahman",
            email: "rahman@gmail.com",
            phone: "+88011123454",
            address: "Dhaka Bangladesh",
            occupation: "engineer",
            signature: null,
            signatureDate: new Date().toISOString().split("T")[0],
        },
        {
            id: "plaintiff-2",
            name: "Rahim Ahmed",
            parents: "Ahmed",
            email: "rahim@gmail.com",
            phone: "+88011123455",
            address: "Dhaka Bangladesh",
            occupation: "doctor",
            signature: null,
            signatureDate: new Date().toISOString().split("T")[0],
        },
    ]);

    const [defendants, setDefendants] = useState([
        {
            id: "defendant-1",
            name: "Plash Rahman",
            parents: "rahman",
            email: "plash@gmail.com",
            phone: "+88011123454",
            address: "Dhaka Bangladesh",
            occupation: "engineer",
            signature: null,
            signatureDate: new Date().toISOString().split("T")[0],
        },
        {
            id: "defendant-2",
            name: "Palash Rahman",
            parents: "rahman",
            email: "palash@gmail.com",
            phone: "+88011123456",
            address: "Dhaka Bangladesh",
            occupation: "student",
            signature: null,
            signatureDate: new Date().toISOString().split("T")[0],
        },
    ]);

    const [disputeInfo, setDisputeInfo] = useState({
        category: "Employment",
        suitValue: "$400,000",
        nature: "I don't know",
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
                plaintiff.id === id
                    ? { ...plaintiff, [field]: value }
                    : plaintiff
            )
        );
    };

    const updateDefendant = (id, field, value) => {
        setDefendants((prev) =>
            prev.map((defendant) =>
                defendant.id === id
                    ? { ...defendant, [field]: value }
                    : defendant
            )
        );
    };

    return (
        <div
            id="form-section"
            className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
            <form id="mediation-form" onSubmit={handleSubmit}>
                {/* Party Information */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Party Information
                    </h2>

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
                />

                <MedCostBreakdown
                    totalCost={mediatorDetails.totalCost}
                    costPerParty={costPerParty}
                    //partyCount={plaintiffs.length + defendants.length}
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
