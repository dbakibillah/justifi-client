const PaymentSuccess = () => {
    // make the page bhai
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
                        <span className="font-mono font-semibold">
                            ARB-2523222
                        </span>
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 max-w-md mx-auto">
                        <p className="text-green-800">
                            Your case details have been logged to the console
                            and will be processed shortly. You will receive a
                            confirmation email with further instructions.
                        </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                        Check the browser console for complete case details.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
