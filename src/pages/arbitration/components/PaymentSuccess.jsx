import { FaCheckCircle, FaFileAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

const PaymentSuccess = () => {
    const { id } = useParams();

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-emerald-200 transition-all duration-300 hover:shadow-xl">
                    <div className="text-center py-8">
                        {/* Animated Success Icon */}
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-75 mx-auto w-24 h-24"></div>
                            <div className="bg-gradient-to-br from-green-400 to-emerald-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto relative">
                                <FaCheckCircle className="text-white text-5xl" />
                            </div>
                        </div>

                        {/* Success Text */}
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-4">
                            Payment Successful!
                        </h2>

                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            Your payment has been processed successfully.
                        </p>

                        {/* Case ID Card */}
                        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6 mb-6 transition-all duration-200 hover:scale-[1.02]">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <FaFileAlt className="text-emerald-600" />
                                <span className="text-sm font-semibold text-emerald-800">
                                    CASE ID
                                </span>
                            </div>
                            <p className="font-mono text-xl font-bold text-gray-800 bg-white/80 py-2 px-4 rounded-lg border border-emerald-100">
                                {id || "ARB-2523222"}
                            </p>
                        </div>

                        {/* Next Steps */}
                        <div className="text-left bg-gray-50 rounded-xl p-5 border border-gray-200">
                            <h4 className="font-semibold text-gray-800 mb-3">
                                What's Next?
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    Check your email for confirmation
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    Case review within 24-48 hours
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    Legal team assignment
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
