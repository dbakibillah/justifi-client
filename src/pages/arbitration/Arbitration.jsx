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
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const onSubmitPlaintiffs = () => {
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

    const generatedId = generateArbitrationId();
    setArbitrationId(generatedId);
    setCurrentStep(4);
  };

  const handlePaymentSuccess = () => {
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

  const steps = [
    {
      number: 1,
      label: "Case Information",
      mobileLabel: "Case",
    },
    {
      number: 2,
      label: "Plaintiff Details",
      mobileLabel: "Plaintiff",
    },
    {
      number: 3,
      label: "Defendant Details",
      mobileLabel: "Defendant",
    },
    {
      number: 4,
      label: "Case Overview",
      mobileLabel: "Review",
    },
    {
      number: 5,
      label: "Payment & Submit",
      mobileLabel: "Payment",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-screen p-4 md:p-6">
      <main className="max-w-7xl mx-auto">
        {/* Professional Step Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-lg border border-white/20 w-full max-w-5xl">
            {/* Desktop & Tablet Layout */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Progress Background Line */}
                <div className="absolute top-4 left-20 right-20 h-1.5 bg-gray-100 rounded-full -z-10"></div>

                {/* Animated Progress Fill */}
                <div
                  className="absolute top-4 left-20 h-1.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full -z-10 transition-all duration-700 ease-out"
                  style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                ></div>

                {/* Steps Container */}
                <div className="flex justify-between relative">
                  {steps.map((step) => {
                    const isCompleted = currentStep > step.number;
                    const isCurrent = currentStep === step.number;

                    return (
                      <div
                        key={step.number}
                        className="flex flex-col items-center relative"
                      >
                        {/* Step Circle */}
                        <div className={`relative group cursor-pointer`}>
                          <div
                            className={`
                            w-10 h-10 rounded-xl flex items-center justify-center font-semibold text-sm 
                            border-2 transition-all duration-300 ease-out
                            ${
                              isCompleted
                                ? "bg-gradient-to-br from-emerald-500 to-green-600 border-emerald-500 text-white shadow-md shadow-green-200"
                                : isCurrent
                                ? "bg-white border-emerald-500 text-emerald-600 shadow-md shadow-emerald-100 ring-2 ring-emerald-100"
                                : "bg-white border-gray-300 text-gray-400 hover:border-gray-400 hover:text-gray-600"
                            }
                          `}
                          >
                            {/* Step Number */}
                            <span className="text-sm font-bold">
                              {step.number}
                            </span>
                          </div>

                          {/* Completion Checkmark */}
                          {isCompleted && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-2.5 h-2.5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Step Label */}
                        <div className="mt-2 text-center max-w-20">
                          <span
                            className={`
                            text-xs font-medium transition-colors duration-300 leading-tight
                            ${
                              isCompleted
                                ? "text-green-600"
                                : isCurrent
                                ? "text-emerald-600 font-semibold"
                                : "text-gray-500"
                            }
                          `}
                          >
                            {step.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Professional Mobile Layout */}
            <div className="md:hidden">
              {/* Header with Current Step */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-emerald-500 rounded-lg">
                  <span className="text-white text-sm font-bold">
                    {currentStep}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Step {currentStep} of {steps.length}
                  </div>
                  <div className="text-sm font-semibold text-gray-800">
                    {steps[currentStep - 1].label}
                  </div>
                </div>
              </div>

              {/* Enhanced Step Indicators */}
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-3 left-4 right-4 h-0.5 bg-gray-200 -z-10"></div>
                <div
                  className="absolute top-3 left-4 h-0.5 bg-emerald-500 -z-10 transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                ></div>

                <div className="flex justify-between">
                  {steps.map((step) => {
                    const isCompleted = currentStep > step.number;
                    const isCurrent = currentStep === step.number;

                    return (
                      <div
                        key={step.number}
                        className="flex flex-col items-center"
                      >
                        {/* Step Indicator */}
                        <div
                          className={`
                          w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold
                          border-2 transition-all duration-300 relative
                          ${
                            isCompleted
                              ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                              : isCurrent
                              ? "bg-white border-emerald-500 text-emerald-600 shadow-md ring-2 ring-emerald-100"
                              : "bg-white border-gray-300 text-gray-400"
                          }
                        `}
                        >
                          {isCompleted ? (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            step.number
                          )}
                        </div>

                        {/* Step Label */}
                        <div className="mt-2 text-center">
                          <span
                            className={`
                            text-[10px] font-medium transition-colors duration-300
                            ${
                              isCompleted
                                ? "text-emerald-600 font-semibold"
                                : isCurrent
                                ? "text-emerald-600 font-bold"
                                : "text-gray-500"
                            }
                          `}
                          >
                            {step.mobileLabel}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Progress Status */}
              <div className="mt-4 p-2 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">Case Progress</span>
                  <span className="font-semibold text-emerald-600">
                    {currentStep === 1 && "Information Gathering"}
                    {currentStep === 2 && "Plaintiff Details"}
                    {currentStep === 3 && "Defendant Details"}
                    {currentStep === 4 && "Case Review"}
                    {currentStep === 5 && "Payment Processing"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Steps */}
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
            formData={formData}
            onBack={() => setCurrentStep(4)}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}
      </main>
    </div>
  );
};

export default Arbitration;
