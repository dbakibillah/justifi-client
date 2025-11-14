import { useState } from "react";
import { FaUserTie, FaUserPlus, FaUserMinus, FaEnvelope, FaBriefcase, FaPhone } from "react-icons/fa";

const Arb_RepresentativeSection = () => {
    const [showAddRepresentative, setShowAddRepresentative] = useState(false);
    const hasRepresentative = true; // This should come from your API data

    // Sample representative data
    const representativeData = {
        name: "Adv. Mohammad Ali",
        email: "mohammad.ali@lawfirm.com",
        designation: "Senior Legal Counsel",
        phone: "+880 1712 345678"
    };

    const handleAddRepresentative = (e) => {
        e.preventDefault();
        // Handle add representative logic here
        alert('Representative added successfully!');
        setShowAddRepresentative(false);
        e.target.reset();
    };

    const handleRemoveRepresentative = () => {
        // Handle remove representative logic here
        alert('Representative removed successfully!');
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex items-center mb-4 md:mb-0">
                    <div className="w-1 h-8 bg-purple-600 rounded-full mr-3"></div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        <FaUserTie className="inline mr-3 text-purple-600" />
                        My Representative
                    </h2>
                </div>
                <div className="flex space-x-3">
                    <button 
                        onClick={() => setShowAddRepresentative(true)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <FaUserPlus className="inline mr-2" />
                        Add Representative
                    </button>
                    {hasRepresentative && (
                        <button 
                            onClick={handleRemoveRepresentative}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            <FaUserMinus className="inline mr-2" />
                            Remove Representative
                        </button>
                    )}
                </div>
            </div>

            {/* Add Representative Form */}
            {showAddRepresentative && (
                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-8">
                    <div className="flex items-center mb-4">
                        <FaUserPlus className="text-purple-600 text-xl mr-3" />
                        <h3 className="text-xl font-semibold text-gray-900">Add New Representative</h3>
                    </div>
                    <form onSubmit={handleAddRepresentative} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                <input 
                                    type="text" 
                                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors" 
                                    placeholder="Enter representative's full name" 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                <input 
                                    type="email" 
                                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors" 
                                    placeholder="Enter representative's email" 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Designation</label>
                                <input 
                                    type="text" 
                                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors" 
                                    placeholder="Enter designation" 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                <input 
                                    type="tel" 
                                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors" 
                                    placeholder="Enter phone number" 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4 pt-4 border-t border-purple-200">
                            <button 
                                type="button" 
                                onClick={() => setShowAddRepresentative(false)}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
                            >
                                <FaUserPlus className="inline mr-2" />
                                Add Representative
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Representative Details */}
            {hasRepresentative ? (
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <FaUserTie className="text-purple-600 mr-3 text-xl" />
                                <div>
                                    <p className="font-semibold text-gray-900">Name</p>
                                    <p className="text-gray-600">{representativeData.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaEnvelope className="text-purple-600 mr-3 text-xl" />
                                <div>
                                    <p className="font-semibold text-gray-900">Email</p>
                                    <p className="text-gray-600">{representativeData.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <FaBriefcase className="text-purple-600 mr-3 text-xl" />
                                <div>
                                    <p className="font-semibold text-gray-900">Designation</p>
                                    <p className="text-gray-600">{representativeData.designation}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaPhone className="text-purple-600 mr-3 text-xl" />
                                <div>
                                    <p className="font-semibold text-gray-900">Phone</p>
                                    <p className="text-gray-600">{representativeData.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
                        <FaUserTie className="mx-auto text-6xl text-gray-300 mb-6" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Representative Assigned</h3>
                        <p className="text-gray-500 mb-6">
                            You haven't assigned a representative for this arbitration case yet.
                        </p>
                        <button 
                            onClick={() => setShowAddRepresentative(true)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            <FaUserPlus className="inline mr-2" />
                            Add Representative
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Arb_RepresentativeSection;