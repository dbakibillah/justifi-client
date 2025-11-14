// dashboard/userDashboard/components/AgreementDetails.jsx
import { FaHandshake, FaCalendarAlt, FaClock, FaVideo, FaCalendarCheck, FaFilePdf, FaDownload, FaEye, FaCheckCircle, FaTimes, FaInfoCircle } from "react-icons/fa";

const Arb_AgreementDetails = ({ arbitration }) => {
    const isCaseCancelled = arbitration.arbitration_status?.toLowerCase() === 'cancelled';
    const isCasePending = arbitration.arbitration_status?.toLowerCase() === 'pending';
    const isCaseOngoing = arbitration.arbitration_status?.toLowerCase() === 'ongoing';
    const isCaseCompleted = arbitration.arbitration_status?.toLowerCase() === 'completed';

    // Sample agreement data - replace with actual data from API
    const agreementData = {
        sessionDate: "2024-10-05T10:00:00",
        meetingLink: "https://meet.justifi.com/agreement123",
        agreementDate: "2024-10-05T12:30:00",
        pdfUrl: "/documents/arbitration-agreement.pdf"
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex items-center mb-8">
                <div className="w-1 h-8 bg-teal-600 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold text-gray-900">
                    <FaHandshake className="inline mr-3 text-teal-600" />
                    Agreement Details
                </h2>
            </div>

            {isCaseCancelled ? (
                <div className="text-center py-8">
                    <div className="bg-red-50 rounded-2xl p-6 max-w-md mx-auto">
                        <FaTimes className="mx-auto text-5xl text-red-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Arbitration Cancelled</h3>
                        <p className="text-gray-500 mb-4">
                            Your arbitration has been cancelled. No agreement was created for this case.
                        </p>
                        <div className="bg-red-100 border border-red-200 rounded-lg p-3">
                            <p className="text-red-700 text-sm">
                                <strong>Status:</strong> Case Cancelled
                            </p>
                        </div>
                    </div>
                </div>
            ) : isCasePending ? (
                <div className="space-y-6">
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Agreement Session</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <FaCalendarAlt className="text-yellow-600 mr-3 text-xl" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Session Date</p>
                                        <p className="text-gray-600">
                                            {new Date(agreementData.sessionDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaClock className="text-yellow-600 mr-3 text-xl" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Session Time</p>
                                        <p className="text-gray-600">
                                            {new Date(agreementData.sessionDate).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <FaVideo className="text-yellow-600 mr-3 text-xl" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Meeting Link</p>
                                        <a 
                                            href={agreementData.meetingLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 underline"
                                        >
                                            Join Agreement Session
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start">
                            <FaInfoCircle className="text-blue-600 mr-3 text-xl mt-0.5" />
                            <div>
                                <p className="text-blue-700 font-medium mb-1">Important Notice</p>
                                <p className="text-blue-600 text-sm">
                                    Please join the agreement session at the scheduled time to complete the arbitration agreement process. 
                                    Once the agreement is signed, your case status will change to "Ongoing".
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (isCaseOngoing || isCaseCompleted) ? (
                <div className="space-y-6">
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Agreement Completed</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <FaCalendarCheck className="text-green-600 mr-3 text-xl" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Agreement Date</p>
                                        <p className="text-gray-600">
                                            {new Date(agreementData.agreementDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaClock className="text-green-600 mr-3 text-xl" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Agreement Time</p>
                                        <p className="text-gray-600">
                                            {new Date(agreementData.agreementDate).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-green-200">
                                    <div className="flex items-center">
                                        <FaFilePdf className="text-red-500 text-2xl mr-3" />
                                        <div>
                                            <p className="font-semibold text-gray-900">Arbitration_Agreement.pdf</p>
                                            <p className="text-sm text-gray-600">Signed agreement document</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                                            <FaEye className="mr-2" />
                                            View
                                        </button>
                                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                                            <FaDownload className="mr-2" />
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center">
                            <FaCheckCircle className="text-green-600 mr-3 text-xl" />
                            <div>
                                <p className="font-semibold text-green-800">Agreement Successfully Executed</p>
                                <p className="text-green-700 text-sm mt-1">
                                    The arbitration agreement has been successfully signed and executed by all parties.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Arb_AgreementDetails;