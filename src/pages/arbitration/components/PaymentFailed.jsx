import React from "react";
import { FaTimes } from "react-icons/fa";

const PaymentFailed = () => {
  const handleBackToOverview = () => {
    console.log("Payment failed. Transaction details logged.");
    // overview back korar logic
  };

  const handleTryAgain = () => {
    console.log("Payment failed. Transaction details logged.");
    //  payment retry logic
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <main className="container mx-auto px-4 pb-12">
        <div className="fade-in">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 card-hover">
            <div className="text-center py-12">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaTimes className="h-10 w-10 text-red-600" />
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Payment Failed!
              </h2>

              <p className="text-gray-600 text-lg mb-2">
                Unfortunately, your payment could not be processed.
              </p>

              <p className="text-gray-600 mb-6">
                Please verify your payment details and try again.
              </p>

              <div className="bg-red-50 border border-red-200 rounded-xl p-4 max-w-md mx-auto">
                <p className="text-red-800">
                  Your transaction has been declined or interrupted. No charges
                  were made. Please attempt payment again or contact support if
                  the issue persists.
                </p>
              </div>

              <div className="flex flex-col-reverse md:flex-row gap-4 justify-center mt-6">
                <button
                  onClick={handleTryAgain}
                  className="bg-red-600 text-white px-6 py-3 rounded-xl shadow hover:bg-red-700 transition duration-200 md:order-2"
                >
                  Try Payment Again
                </button>
                <button
                  onClick={handleBackToOverview}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-xl shadow transition duration-200 md:order-1"
                >
                  Back to Overview
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentFailed;
