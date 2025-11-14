import { FaUserFriends, FaUserTie, FaCrown, FaGraduationCap, FaBriefcase, FaEnvelope } from "react-icons/fa";

const ArbitratorsPanel = ({ arbitration }) => {
    const shouldShowArbitrators = () => {
        const status = arbitration?.arbitration_status?.toLowerCase();
        return status === 'ongoing' || status === 'completed';
    };

    const getArbitratorData = () => {
        if (!arbitration) return null;

        const arbitrators = arbitration.arbitrators || {};
        
        return {
            presiding: arbitrators.presiding || arbitrators.presidingArbitrator,
            plaintiff: arbitrators.plaintiff || arbitrators.plaintiffArbitrator,
            defendant: arbitrators.defendant || arbitrators.defendantArbitrator
        };
    };

    const getStatusText = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'Pending Review';
            case 'ongoing': return 'Proceedings Ongoing';
            case 'completed': return 'Case Concluded';
            case 'cancelled': return 'Case Cancelled';
            default: return status || 'Unknown';
        }
    };

    const showArbitrators = shouldShowArbitrators();
    const arbitratorData = getArbitratorData();

    if (!showArbitrators) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
                <div className="flex items-center mb-6">
                    <div className="w-1 h-8 bg-gray-400 rounded-full mr-3"></div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        <FaUserFriends className="inline mr-3 text-gray-400" />
                        Arbitrators Panel
                    </h2>
                </div>
                <div className="text-center py-12 bg-gray-50 rounded-2xl">
                    <FaUserFriends className="mx-auto text-6xl text-gray-300 mb-6" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Arbitrators Not Available</h3>
                    <p className="text-gray-500 mb-6">
                        Arbitrators will be assigned when the case status changes to "Ongoing" or "Completed".
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
                        <p className="text-blue-700 text-sm">
                            <strong>Current Status:</strong> {getStatusText(arbitration.arbitration_status)}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex items-center mb-8">
                <div className="w-1 h-8 bg-amber-600 rounded-full mr-3"></div>
                <h2 className="text-2xl font-bold text-gray-900">
                    <FaUserFriends className="inline mr-3 text-amber-600" />
                    Arbitrators Panel
                </h2>
            </div>

            {arbitratorData && (arbitratorData.presiding || arbitratorData.plaintiff || arbitratorData.defendant) ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Plaintiff Arbitrator */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
                        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <FaUserTie className="text-3xl text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {arbitratorData.plaintiff?.name || 'Dr. Ahmed Rahman'}
                        </h3>
                        <p className="text-blue-600 font-semibold mb-2">Plaintiff Arbitrator</p>
                        <p className="text-gray-600 mb-2">
                            <FaGraduationCap className="inline mr-2 text-blue-500" />
                            {arbitratorData.plaintiff?.specialization || 'Commercial Law'}
                        </p>
                        <p className="text-gray-600 mb-3">
                            <FaBriefcase className="inline mr-2 text-blue-500" />
                            {arbitratorData.plaintiff?.experience || '15+ years Experience'}
                        </p>
                        <p className="text-blue-600 font-medium">
                            <FaEnvelope className="inline mr-2" />
                            {arbitratorData.plaintiff?.email || 'ahmed.rahman@example.com'}
                        </p>
                    </div>

                    {/* Presiding Arbitrator */}
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300 relative">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <div className="bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                                <FaCrown className="mr-2" />
                                Presiding
                            </div>
                        </div>
                        <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg mt-2">
                            <FaUserTie className="text-3xl text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {arbitratorData.presiding?.name || 'Prof. Fatima Begum'}
                        </h3>
                        <p className="text-amber-600 font-semibold mb-2">Presiding Arbitrator</p>
                        <p className="text-gray-600 mb-2">
                            <FaGraduationCap className="inline mr-2 text-amber-500" />
                            {arbitratorData.presiding?.specialization || 'Contract Law'}
                        </p>
                        <p className="text-gray-600 mb-3">
                            <FaBriefcase className="inline mr-2 text-amber-500" />
                            {arbitratorData.presiding?.experience || '12+ years Experience'}
                        </p>
                        <p className="text-amber-600 font-medium">
                            <FaEnvelope className="inline mr-2" />
                            {arbitratorData.presiding?.email || 'fatima.begum@example.com'}
                        </p>
                    </div>

                    {/* Defendant Arbitrator */}
                    <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <FaUserTie className="text-3xl text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {arbitratorData.defendant?.name || 'Adv. Rahim Khan'}
                        </h3>
                        <p className="text-green-600 font-semibold mb-2">Defendant Arbitrator</p>
                        <p className="text-gray-600 mb-2">
                            <FaGraduationCap className="inline mr-2 text-green-500" />
                            {arbitratorData.defendant?.specialization || 'Business Law'}
                        </p>
                        <p className="text-gray-600 mb-3">
                            <FaBriefcase className="inline mr-2 text-green-500" />
                            {arbitratorData.defendant?.experience || '10+ years Experience'}
                        </p>
                        <p className="text-green-600 font-medium">
                            <FaEnvelope className="inline mr-2" />
                            {arbitratorData.defendant?.email || 'rahim.khan@example.com'}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-2xl">
                    <FaUserFriends className="mx-auto text-6xl text-gray-300 mb-6" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Arbitrators Not Assigned Yet</h3>
                    <p className="text-gray-500 mb-6">
                        Arbitrators will be assigned once the agreement process is completed successfully.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
                        <p className="text-yellow-700 text-sm">
                            <strong>Note:</strong> Arbitrators are typically assigned within 2-3 business days after successful agreement.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArbitratorsPanel;