import React, { useState, useRef } from "react";
import MediationForm from "./components/MediationForm";
import MedAgreementPreview from "./components/MedAgreementPreview";

function Mediation_Agreement() {
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState(null);
  const pdfContainerRef = useRef(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setShowPreview(true);
  };

  const handleBackToForm = () => {
    setShowPreview(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          JustiFi - Mediation Agreement
        </h1>

        {!showPreview ? (
          <MediationForm onSubmit={handleFormSubmit} />
        ) : (
          <MedAgreementPreview
            formData={formData}
            onBack={handleBackToForm}
            pdfContainerRef={pdfContainerRef}
          />
        )}
      </div>

      {/* Hidden PDF Container */}
      <div
        ref={pdfContainerRef}
        className="absolute left-[-9999px] top-[-9999px] w-[210mm] min-h-[297mm] p-[20mm] bg-white font-['Times_New_Roman',Times,serif] leading-relaxed text-sm"
      >
        {/* PDF content will be inserted here */}
      </div>
    </div>
  );
}

export default Mediation_Agreement;
