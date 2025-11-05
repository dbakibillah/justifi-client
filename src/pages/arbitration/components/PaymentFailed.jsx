import {
    FaCopy,
    FaExclamationTriangle,
    FaTimesCircle
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentFailed = () => {
    const { id } = useParams();

    const copyCaseId = () => {
        navigator.clipboard.writeText(id || "");
        toast.success("Case ID copied to clipboard!");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-100 flex items-center justify-center p-4 animate-fade-in">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-rose-200 transition-all duration-300 hover:shadow-xl">
                    <div className="text-center py-8">
                        {/* Animated Error Icon */}
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-red-200 rounded-full animate-ping opacity-75 mx-auto w-24 h-24"></div>
                            <div className="bg-gradient-to-br from-red-500 to-rose-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto relative">
                                <FaTimesCircle className="text-white text-5xl" />
                            </div>
                        </div>

                        {/* Error Text */}
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-700 bg-clip-text text-transparent mb-4">
                            Payment Failed
                        </h2>

                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            We encountered an issue processing your payment.
                            Please try again or contact support.
                        </p>

                        {/* Case ID Display */}
                        <div className="bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 rounded-2xl p-4 mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-rose-800 flex items-center gap-2">
                                    <FaExclamationTriangle className="text-rose-600" />
                                    CASE ID
                                </span>
                                <button
                                    onClick={copyCaseId}
                                    className="text-rose-600 hover:text-rose-700 transition-colors duration-200"
                                    title="Copy Case ID"
                                >
                                    <FaCopy className="text-sm" />
                                </button>
                            </div>
                            <p className="font-mono text-lg font-bold text-gray-800 bg-white/80 py-2 px-4 rounded-lg border border-rose-100 break-all">
                                {id || "MED-690BB-32437211"}
                            </p>
                        </div>

                        {/* Help Section */}
                        <div className="text-left bg-gray-50 rounded-xl p-5 border border-gray-200 mb-6">
                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <FaExclamationTriangle className="text-rose-500" />
                                Quick Solutions
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 flex-shrink-0"></div>
                                    Verify your card number, expiry date, and
                                    CVV
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 flex-shrink-0"></div>
                                    Ensure your card has sufficient funds
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 flex-shrink-0"></div>
                                    Contact your bank to authorize online
                                    payments
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 flex-shrink-0"></div>
                                    Try using a different payment method or card
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailed;
