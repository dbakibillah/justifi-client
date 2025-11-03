import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ArbCaseInfo from "./components/ArbCaseInfo";
import ArbPlaintiff from "./components/ArbPlaintiff";
import ArbDefendant from "./components/ArbDefendant";
import ArbOverview from "./components/ArbOverview";
import Payment from "./components/Payment";

const Arbitration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [arbitrationId, setArbitrationId] = useState("");
  const [plaintiffs, setPlaintiffs] = useState([{ id: 1 }]);
  const [defendants, setDefendants] = useState([{ id: 1 }]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const generateArbitrationId = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(100 + Math.random() * 900);
    return `ARB-${year}-${randomNum}`;
  };

  const onSubmitCaseInfo = (data) => {
    // Store case info and move to plaintiffs step
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const onSubmitPlaintiffs = () => {
    // Get current form values for plaintiffs
    const currentValues = getValues();
    const plaintiffsData = {};

    plaintiffs.forEach((plaintiff) => {
      if (currentValues.plaintiffs && currentValues.plaintiffs[plaintiff.id]) {
        plaintiffsData[plaintiff.id] = currentValues.plaintiffs[plaintiff.id];
      }
    });

    setFormData((prev) => ({
      ...prev,
      plaintiffs: plaintiffsData,
    }));
    setCurrentStep(3);
  };

  const onSubmitDefendants = () => {
    // Get current form values for defendants
    const currentValues = getValues();
    const defendantsData = {};

    defendants.forEach((defendant) => {
      if (currentValues.defendants && currentValues.defendants[defendant.id]) {
        defendantsData[defendant.id] = currentValues.defendants[defendant.id];
      }
    });

    setFormData((prev) => ({
      ...prev,
      defendants: defendantsData,
    }));

    // Generate arbitration ID when moving to overview
    const generatedId = generateArbitrationId();
    setArbitrationId(generatedId);
    setCurrentStep(4);
  };

  const handlePaymentSuccess = () => {
    // Log all arbitration details after successful payment
    const completeData = {
      arbitrationId,
      ...formData,
      submissionDate: new Date().toISOString(),
      status: "Payment Confirmed - Case Active",
    };

    console.log("Arbitration Case Details:", completeData);
    alert("Payment successful! Case submitted.");
  };

  const prevStep = () => setCurrentStep(currentStep - 1);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen p-4 md:p-6">
      <main className="max-w-6xl mx-auto">
        {/* Step Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-2 shadow-lg">
            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                      currentStep >= step
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 5 && (
                    <div
                      className={`w-6 h-1 mx-2 ${
                        currentStep > step ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span>Case Info</span>
              <span>Plaintiffs</span>
              <span>Defendants</span>
              <span>Overview</span>
              <span>Payment</span>
            </div>
          </div>
        </div>

        {currentStep === 1 && (
          <ArbCaseInfo
            register={register}
            errors={errors}
            watch={watch}
            onNext={handleSubmit(onSubmitCaseInfo)}
          />
        )}

        {currentStep === 2 && (
          <ArbPlaintiff
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            plaintiffs={plaintiffs}
            setPlaintiffs={setPlaintiffs}
            onNext={onSubmitPlaintiffs}
            onBack={prevStep}
          />
        )}

        {currentStep === 3 && (
          <ArbDefendant
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            defendants={defendants}
            setDefendants={setDefendants}
            onNext={onSubmitDefendants}
            onBack={prevStep}
          />
        )}

        {currentStep === 4 && (
          <ArbOverview
            formData={formData}
            plaintiffs={plaintiffs}
            defendants={defendants}
            arbitrationId={arbitrationId}
            onBack={prevStep}
            onPayment={() => setCurrentStep(5)}
          />
        )}

        {currentStep === 5 && (
          <Payment
            arbitrationId={arbitrationId}
            suitValue={formData.suitValue}
            formData={formData} // Add this line to pass formData
            onBack={() => setCurrentStep(4)}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}
      </main>
    </div>
  );
};

export default Arbitration;
