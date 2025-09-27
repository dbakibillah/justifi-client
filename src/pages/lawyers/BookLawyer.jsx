import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

const BookLawyer = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    // Lawyer passed from previous page (via state)
    const lawyer = location.state?.lawyer;

    const [formData, setFormData] = useState({
        problemDescription: "",
        preferredDate: "",
        preferredTime: "",
        meetingType: "online", // Set to online only
    });

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit booking
    const handleSubmit = (e) => {
        e.preventDefault();

        const bookingData = {
            user: {
                name: user?.displayName || "Anonymous",
                email: user?.email,
                phone: user?.phone || "N/A",
            },
            booking: {
                problemDescription: formData.problemDescription,
                preferredDate: formData.preferredDate,
                preferredTime: formData.preferredTime,
                meetingType: formData.meetingType,
            },
            lawyer: {
                name: lawyer?.name,
                email: lawyer?.email,
            },
            status: "pending",
            createdAt: new Date().toISOString(),
        };

        console.log("Booking Data:", bookingData);

        navigate("/dashboard"); // redirect after booking
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Schedule Legal Consultation
                    </h1>
                    <p className="text-lg text-gray-600">
                        Book an online session with your selected lawyer
                    </p>
                </div>

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    <div className="bg-blue-800 px-6 py-4">
                        <h2 className="text-xl font-semibold text-white">
                            Legal Consultation Request
                        </h2>
                    </div>

                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Lawyer Information
                                </h3>
                                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Name
                                        </p>
                                        <p className="text-gray-900 font-medium">
                                            {lawyer?.name}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Email
                                        </p>
                                        <p className="text-gray-900 font-medium">
                                            {lawyer?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Problem Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Case Details / Problem Description
                            </label>
                            <textarea
                                name="problemDescription"
                                value={formData.problemDescription}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder="Please describe your legal issue in detail..."
                                rows={5}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Preferred Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Consultation Date
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="date"
                                        name="preferredDate"
                                        value={formData.preferredDate}
                                        onChange={handleChange}
                                        className="pl-10 w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Preferred Time */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Consultation Time
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="time"
                                        name="preferredTime"
                                        value={formData.preferredTime}
                                        onChange={handleChange}
                                        className="pl-10 w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Meeting Type - Online Only */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-blue-800">
                                        Online Consultation
                                    </h3>
                                    <p className="text-sm text-blue-600 mt-1">
                                        Your consultation will be conducted via
                                        secure video conference. Meeting details
                                        will be sent to your email.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition shadow-md hover:shadow-lg"
                            >
                                Schedule Online Consultation
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        By scheduling this consultation, you agree to our terms
                        of service and privacy policy.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookLawyer;
