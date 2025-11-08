import React, { useState, useRef, useEffect } from "react";
import {
    FaCheck,
    FaCamera,
    FaMapMarkerAlt,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaEdit,
} from "react-icons/fa";
import EditProfileModal from "../components/EditProfileModal";
import EditBioModal from "../components/EditBioModal";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserData from "../../../hooks/useUserData";

const UserProfile = () => {
    // State management
    const axiosSecure = useAxiosSecure();
    const currentUser = useUserData();
    const {
        data: profileData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["userProfile"],
        queryFn: async () => {
            const response = await axiosSecure.get(
                `/userProfile?email=${currentUser?.email}`
            );
            return response.data;
        },
        enabled: !!currentUser?.email,
    });

    const [modals, setModals] = useState({
        editProfile: false,
        editBio: false,
    });

    const [tempData, setTempData] = useState({});
    const [currentPhotoFile, setCurrentPhotoFile] = useState(null);
    const [notification, setNotification] = useState({
        show: false,
        message: "",
        type: "",
    });
    const fileInputRef = useRef(null);

    // Open modals
    const openEditModal = () => {
        setTempData({
            fullName: profileData.fullName,
            phone: profileData.phone,
            address: profileData.address,
        });
        setModals({ ...modals, editProfile: true });
    };

    const openBioModal = () => {
        setTempData({ bio: profileData.bio });
        setModals({ ...modals, editBio: true });
    };

    // Close modals
    const closeModals = () => {
        setModals({ editProfile: false, editBio: false });
        setCurrentPhotoFile(null);
    };

    // Handle photo upload
    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                showNotification("File size must be less than 5MB", "error");
                return;
            }

            if (!file.type.startsWith("image/")) {
                showNotification("Please select an image file", "error");
                return;
            }

            setCurrentPhotoFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                // In a real app, you would update the image preview here
            };
            reader.readAsDataURL(file);
        }
    };

    // Save profile changes
    const saveProfileChanges = () => {
        const { fullName, phone, address } = tempData;

        if (!fullName?.trim()) {
            showNotification("Please enter your full name", "error");
            return;
        }

        if (!phone?.trim()) {
            showNotification("Please enter your phone number", "error");
            return;
        }

        if (!address?.trim()) {
            showNotification("Please enter your address", "error");
            return;
        }

        const updatedProfileData = {
            fullName: fullName.trim(),
            phone: phone.trim(),
            address: address.trim(),
            profileImage: profileData.profileImage, 
        };

        const response = axiosSecure.put("/userProfile", updatedProfileData);

        closeModals();
        showNotification("Profile updated successfully!", "success");
    };

    // Save bio changes
    const saveBioChanges = () => {
        const bio = tempData.bio?.trim() || "";

        if (bio.length > 500) {
            showNotification("Bio must be 500 characters or less", "error");
            return;
        }
        closeModals();
        showNotification("Bio updated successfully!", "success");
    };

    // Show notification
    const showNotification = (message, type = "success") => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: "", type: "" });
        }, 4000);
    };

    // Handle input changes
    const handleInputChange = (field, value) => {
        setTempData((prev) => ({ ...prev, [field]: value }));
    };

    // Close modals on escape key
    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === "Escape") {
                closeModals();
            }
        };

        document.addEventListener("keydown", handleEscapeKey);
        return () => document.removeEventListener("keydown", handleEscapeKey);
    }, []);

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 md:p-8">
            {/* Notification */}
            {notification.show && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                />
            )}

            <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-6">
                        <div className="relative group">
                            <img
                                src={profileData.profileImage}
                                alt="Profile"
                                className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow-lg transition-all duration-300 group-hover:brightness-75"
                            />
                            <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-green-500 rounded-full p-1.5 md:p-2 border-4 border-white shadow-lg">
                                <FaCheck className="h-3 w-3 md:h-4 md:w-4 text-white" />
                            </div>
                            {/* Edit Photo Overlay */}
                            <div
                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                                onClick={openEditModal}
                            >
                                <FaCamera className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                                {profileData.fullName}
                            </h2>
                            <div className="flex flex-col items-center md:items-start gap-2 mt-2">
                                <span className="text-gray-500 flex items-center gap-1 text-sm md:text-base">
                                    <FaMapMarkerAlt className="h-4 w-4" />
                                    {profileData.address}
                                </span>
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                                    {profileData.role}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Personal Information */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8 gap-4">
                            <div className="text-center md:text-left">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                                    Personal Information
                                </h3>
                                <p className="text-gray-500 text-xs md:text-sm mt-1">
                                    Manage your personal details and contact
                                    information
                                </p>
                            </div>
                            <button
                                onClick={openEditModal}
                                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl w-full md:w-auto"
                            >
                                <FaEdit className="h-5 w-5" />
                                Edit Profile
                            </button>
                        </div>

                        {/* Information Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {/* Full Name */}
                            <InfoCard
                                icon={
                                    <FaUser className="h-5 w-5 text-blue-600" />
                                }
                                title="Full Name"
                                value={profileData.fullName}
                                bgColor="bg-blue-100"
                            />

                            {/* Email */}
                            <InfoCard
                                icon={
                                    <FaEnvelope className="h-5 w-5 text-green-600" />
                                }
                                title="Email Address"
                                value={profileData.email}
                                bgColor="bg-green-100"
                            />

                            {/* Phone */}
                            <InfoCard
                                icon={
                                    <FaPhone className="h-5 w-5 text-purple-600" />
                                }
                                title="Phone Number"
                                value={profileData.phone}
                                bgColor="bg-purple-100"
                            />

                            {/* Address */}
                            <InfoCard
                                icon={
                                    <FaMapMarkerAlt className="h-5 w-5 text-orange-600" />
                                }
                                title="Address"
                                value={profileData.address}
                                bgColor="bg-orange-100"
                            />
                        </div>

                        {/* Profile Picture Section */}
                        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="text-center sm:text-left">
                                    <p className="text-gray-500 text-xs md:text-sm font-medium uppercase tracking-wide mb-1">
                                        Profile Picture
                                    </p>
                                    <p className="text-gray-600 text-xs md:text-sm">
                                        JPG, GIF or PNG. Max size of 5MB
                                    </p>
                                </div>
                                <div className="flex justify-center sm:justify-end">
                                    <img
                                        src={profileData.profileImage}
                                        alt="Profile"
                                        className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-gray-200 shadow-md cursor-pointer"
                                        onClick={openEditModal}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-4 md:space-y-6">
                        {/* Bio Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                                <div className="text-center md:text-left">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                                        Bio
                                    </h3>
                                    <p className="text-gray-500 text-xs md:text-sm mt-1">
                                        Tell us about yourself
                                    </p>
                                </div>
                                <button
                                    onClick={openBioModal}
                                    className="border-2 border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all duration-200 w-full md:w-auto"
                                >
                                    <FaEdit className="h-5 w-5" />
                                    Edit Bio
                                </button>
                            </div>
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 md:p-6 border border-gray-100">
                                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                                    {profileData.bio}
                                </p>
                            </div>
                        </div>

                        {/* Overview Section */}
                        <OverviewSection />
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <EditProfileModal
                isOpen={modals.editProfile}
                profileData={profileData}
                tempData={tempData}
                currentPhotoFile={currentPhotoFile}
                onInputChange={handleInputChange}
                onPhotoUpload={handlePhotoUpload}
                onSave={saveProfileChanges}
                onClose={closeModals}
                fileInputRef={fileInputRef}
            />

            {/* Edit Bio Modal */}
            <EditBioModal
                isOpen={modals.editBio}
                tempData={tempData}
                onInputChange={handleInputChange}
                onSave={saveBioChanges}
                onClose={closeModals}
            />
        </div>
    );
};

// Reusable Info Card Component
const InfoCard = ({ icon, title, value, bgColor }) => (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 md:p-6 border border-gray-100 hover:border-blue-200 transition-all duration-200">
        <div className="flex items-center gap-3 mb-3">
            <div className={`${bgColor} p-2 rounded-lg`}>{icon}</div>
            <p className="text-gray-500 text-xs md:text-sm font-medium uppercase tracking-wide">
                {title}
            </p>
        </div>
        <p className="font-semibold text-gray-800 text-base md:text-lg">
            {value}
        </p>
    </div>
);

// Overview Section Component
const OverviewSection = () => {
    const overviewItems = [
        { label: "Arbitration", value: "0" },
        { label: "Mediation", value: "0" },
        { label: "Appointment", value: "0" },
    ];

    return (
        <div>
            <h1>User Profile</h1>
        </div>
    );
};

// Notification Component
const Notification = ({ message, type }) => (
    <div
        className={`fixed top-4 right-4 z-50 transform transition-transform duration-300 translate-x-0`}
    >
        <div
            className={`${
                type === "success"
                    ? "bg-green-500 border-green-400"
                    : "bg-red-500 border-red-400"
            } border text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3`}
        >
            {type === "success" ? (
                <FaCheck className="h-5 w-5" />
            ) : (
                <FaCheck className="h-5 w-5" />
            )}
            <span>{message}</span>
        </div>
    </div>
);

export default UserProfile;
