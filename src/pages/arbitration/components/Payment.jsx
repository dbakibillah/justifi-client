import React, { useState } from "react";
import {
  FaCreditCard,
  FaLock,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";

const Payment = ({
  arbitrationId,
  suitValue,
  onBack,
  onPaymentSuccess,
  formData,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const calculateFees = (suitValue) => {
    const value = parseInt(suitValue) || 0;
    if (value <= 50000) return 1000;
    if (value <= 100000) return 2000;
    if (value <= 500000) return 5000;
    if (value <= 1000000) return 10000;
    return 15000;
  };

  const fees = calculateFees(suitValue);
  const totalAmount = fees + 50;

  const handlePayment = async (e) => {
    e.preventDefault();

    // Validate form
    if (paymentMethod === "card") {
      if (!cardholderName || !cardNumber || !expiryDate || !cvv) {
        alert("Please fill all card details");
        return;
      }

      if (cardNumber.replace(/\s/g, "").length !== 16) {
        alert("Please enter a valid 16-digit card number");
        return;
      }

      if (cvv.length !== 3) {
        alert("Please enter a valid 3-digit CVV");
        return;
      }
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentCompleted(true);

      // Create complete arbitration object
      const arbitrationDetails = {
        arbitrationId,
        ...formData,
        paymentDetails: {
          amount: totalAmount,
          method: paymentMethod,
          status: "completed",
          transactionId: `TXN-${Date.now()}`,
          paymentDate: new Date().toISOString(),
        },
        submissionDate: new Date().toISOString(),
        status: "Payment Confirmed - Case Active",
      };

      // Console log the complete arbitration object
      console.log(
        "Arbitration Case Details After Payment:",
        arbitrationDetails
      );

      // Call the onPaymentSuccess callback
      onPaymentSuccess();
    }, 3000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return value;
  };

  // If payment is completed, show success message
  if (paymentCompleted) {
    return (
      <div className="fade-in">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 card-hover">
          <div className="text-center py-12">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-green-600 text-4xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Payment Successful!
            </h2>
            <p className="text-gray-600 text-lg mb-2">
              Your arbitration case has been successfully submitted.
            </p>
            <p className="text-gray-600 mb-6">
              Case ID:{" "}
              <span className="font-mono font-semibold">{arbitrationId}</span>
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 max-w-md mx-auto">
              <p className="text-green-800">
                Your case details have been logged to the console and will be
                processed shortly. You will receive a confirmation email with
                further instructions.
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Check the browser console for complete case details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 card-hover">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-800">Secure Payment</h2>
            <p className="text-gray-600 mt-2">
              Complete your arbitration case submission
            </p>
          </div>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
            <FaLock className="inline mr-2" />
            Secure Payment
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border border-blue-200 p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Payment Method
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    paymentMethod === "card"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center">
                    <FaCreditCard
                      className={`mr-2 ${
                        paymentMethod === "card"
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`font-semibold ${
                        paymentMethod === "card"
                          ? "text-blue-600"
                          : "text-gray-600"
                      }`}
                    >
                      Credit Card
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank")}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    paymentMethod === "bank"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center">
                    <FaCreditCard
                      className={`mr-2 ${
                        paymentMethod === "bank"
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`font-semibold ${
                        paymentMethod === "bank"
                          ? "text-blue-600"
                          : "text-gray-600"
                      }`}
                    >
                      Bank Transfer
                    </span>
                  </div>
                </button>
              </div>

              {paymentMethod === "card" && (
                <form onSubmit={handlePayment}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(formatCardNumber(e.target.value))
                        }
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          value={expiryDate}
                          onChange={(e) =>
                            setExpiryDate(formatExpiryDate(e.target.value))
                          }
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="MM/YY"
                          maxLength="5"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          value={cvv}
                          onChange={(e) =>
                            setCvv(
                              e.target.value.replace(/\D/g, "").slice(0, 3)
                            )
                          }
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="123"
                          maxLength="3"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:transform-none disabled:hover:shadow-lg mt-6"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <FaLock className="mr-3" />
                        Pay ${totalAmount.toLocaleString()}
                      </>
                    )}
                  </button>
                </form>
              )}

              {paymentMethod === "bank" && (
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <p className="text-yellow-800 mb-4">
                      For bank transfers, please use the following details:
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-semibold">Bank Name:</span>
                        <span>Global Arbitration Bank</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Account Name:</span>
                        <span>Arbitration Services Inc.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Account Number:</span>
                        <span>1234567890</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Routing Number:</span>
                        <span>021000021</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Reference:</span>
                        <span className="font-mono">{arbitrationId}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:transform-none disabled:hover:shadow-lg"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Confirming Payment...
                      </>
                    ) : (
                      <>
                        <FaLock className="mr-3" />
                        Confirm Bank Transfer
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <FaLock className="mr-2 text-green-600" />
              Your payment information is secure and encrypted
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 p-6 sticky top-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Case ID:</span>
                  <span className="font-mono font-semibold">
                    {arbitrationId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Arbitration Fee:</span>
                  <span className="font-semibold">
                    ${fees.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Fee:</span>
                  <span className="font-semibold">$50</span>
                </div>
                <div className="border-t border-gray-300 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-800">
                      Total:
                    </span>
                    <span className="text-xl font-bold text-purple-600">
                      ${totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <FaCheckCircle className="text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">
                    What's included:
                  </span>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Case filing and registration</li>
                  <li>• Arbitrator appointment</li>
                  <li>• Case management services</li>
                  <li>• Secure document handling</li>
                  <li>• Customer support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-start mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            disabled={isProcessing}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:transform-none"
          >
            <FaArrowLeft className="mr-3" /> Back to Overview
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
