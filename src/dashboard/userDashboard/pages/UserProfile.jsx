import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
    FaCamera,
    FaEdit,
    FaEnvelope,
    FaMapMarkerAlt,
    FaPhone,
    FaSave,
    FaTimes,
    FaUser,
    FaUserTie,
} from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import { toast } from "react-toastify";
import Loading from "../../../common/loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserData from "../../../hooks/useUserData";
import OverviewSection from "../components/OverviewSection";

const UserProfile = () => {
    const { currentUser } = useUserData();
    const axiosSecure = useAxiosSecure();
    const [isEditing, setIsEditing] = useState(false);
    const [editSection, setEditSection] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm();

    const {
        data: user = {},
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["userProfile", currentUser?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(
                `/userProfile?email=${currentUser?.email}`
            );
            return response.data;
        },
        enabled: !!currentUser?.email,
    });

    const startEditing = useCallback(
        (section) => {
            setEditSection(section);
            setIsEditing(true);
            if (user) {
                reset(user);
            }
        },
        [user, reset]
    );

    const cancelEditing = useCallback(() => {
        setIsEditing(false);
        setEditSection(null);
        reset();
    }, [reset]);

    const onUpdateProfile = async (data) => {
        try {
            // Remove _id from data to prevent immutable field error
            const { _id, ...updateData } = data;

            console.log(updateData);
            const response = await axiosSecure.patch(
                `/userProfile/${user._id}`,
                updateData
            );

            if (response.data.success) {
                toast.success("Profile updated successfully");
                await refetch();
                cancelEditing();
            } else {
                toast.error(response.data.error || "Failed to update profile");
            }
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error(
                error.response?.data?.error || "Failed to update profile"
            );
        }
    };

    // Stat Card Component
    const StatCard = useCallback(
        ({ icon: Icon, label, value, color = "blue" }) => (
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">
                            {label}
                        </p>
                        <p className={`text-2xl font-bold text-gray-900`}>
                            {value}
                        </p>
                    </div>
                    <div
                        className={`p-3 rounded-lg ${
                            color === "blue"
                                ? "bg-blue-50 border-blue-100"
                                : color === "green"
                                ? "bg-green-50 border-green-100"
                                : "bg-purple-50 border-purple-100"
                        } border`}
                    >
                        <Icon
                            className={`text-lg ${
                                color === "blue"
                                    ? "text-blue-600"
                                    : color === "green"
                                    ? "text-green-600"
                                    : "text-purple-600"
                            }`}
                        />
                    </div>
                </div>
            </div>
        ),
        []
    );

    // Profile Section Component
    const ProfileSection = useCallback(
        ({ title, icon: Icon, children, editable = false, section = null }) => (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gray-50 border border-gray-200">
                            <Icon className="text-lg text-gray-700" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            {title}
                        </h3>
                    </div>
                    {editable && !isEditing && (
                        <button
                            onClick={() => startEditing(section)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                        >
                            <FaEdit className="text-sm" />
                            Edit
                        </button>
                    )}
                </div>
                <div className="p-6">{children}</div>
            </div>
        ),
        [isEditing, startEditing]
    );

    // Form Field Component
    const FormField = useCallback(
        ({
            label,
            icon: Icon,
            name,
            type = "text",
            required = false,
            placeholder,
            validation = {},
            children,
            ...props
        }) => (
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {children || (
                    <div className="relative">
                        {Icon && (
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Icon className="h-5 w-5 text-gray-400" />
                            </div>
                        )}
                        <input
                            type={type}
                            {...register(name, {
                                required: required
                                    ? `${label} is required`
                                    : false,
                                ...validation,
                            })}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                                Icon ? "pl-10" : ""
                            } ${
                                errors[name]
                                    ? "border-red-300"
                                    : "border-gray-300"
                            }`}
                            placeholder={placeholder}
                            {...props}
                        />
                    </div>
                )}
                {errors[name] && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors[name].message}
                    </p>
                )}
            </div>
        ),
        [register, errors]
    );

    if (isLoading) {
        return <Loading />;
    }

    if (error || !user || !user._id) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaUser className="text-2xl text-red-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Profile Not Found
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Unable to load user profile information.
                    </p>
                    <button
                        onClick={() => refetch()}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Personal Profile
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Manage your personal information and preferences
                            </p>
                        </div>
                        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                            <MdVerified className="text-green-600 text-lg" />
                            <span className="text-sm font-medium text-green-800">
                                Verified User
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-6">
                    {/* Left Column - Profile Overview */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                            <div className="p-6 text-center border-b border-gray-200">
                                <div className="relative inline-block mb-4">
                                    <img
                                        src={
                                            user.photo || "/default-avatar.png"
                                        }
                                        alt={user.name}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 mx-auto"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full">
                                        <MdVerified className="text-sm" />
                                    </div>
                                    <button
                                        onClick={() =>
                                            document
                                                .getElementById("photo-upload")
                                                .click()
                                        }
                                        className="absolute bottom-0 left-0 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition-colors duration-200"
                                    >
                                        <FaCamera className="text-xs" />
                                    </button>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                    {user.name}
                                </h2>
                                <p className="text-gray-600 text-sm mb-3">
                                    {user.role || "User"}
                                </p>
                            </div>

                            <div className="p-4 space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">
                                        Member Since
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        {new Date(
                                            user.createdAt
                                        ).getFullYear() || "2024"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">
                                        Profile Complete
                                    </span>
                                    <span className="font-medium text-blue-600">
                                        {user.phone && user.address
                                            ? "100%"
                                            : "50%"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Overview Section */}
                        <OverviewSection />

                        {/* Hidden file input for photo upload */}
                        <input
                            type="file"
                            id="photo-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const formData = new FormData();
                                    formData.append("photo", file);
                                    try {
                                        const response =
                                            await axiosSecure.patch(
                                                `/userProfile/${user._id}`,
                                                formData,
                                                {
                                                    headers: {
                                                        "Content-Type":
                                                            "multipart/form-data",
                                                    },
                                                }
                                            );
                                        if (response.data.success) {
                                            toast.success(
                                                "Profile photo updated successfully"
                                            );
                                            await refetch();
                                        }
                                    } catch (error) {
                                        toast.error(
                                            "Failed to update profile photo"
                                        );
                                    }
                                }
                            }}
                        />
                    </div>

                    {/* Right Column - Detailed Information */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Personal Information */}
                        <ProfileSection
                            title="Personal Information"
                            icon={FaUserTie}
                            editable
                            section="personal"
                        >
                            {editSection === "personal" && isEditing ? (
                                <form
                                    onSubmit={handleSubmit(onUpdateProfile)}
                                    className="space-y-6"
                                >
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <FormField
                                            label="Full Name"
                                            icon={FaUser}
                                            name="name"
                                            required
                                            placeholder="Enter full name"
                                        />
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                <input
                                                    type="email"
                                                    value={user.email}
                                                    disabled
                                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                        <FormField
                                            label="Phone Number"
                                            icon={FaPhone}
                                            name="phone"
                                            required
                                            placeholder="Enter phone number"
                                        />
                                        <FormField
                                            label="Role"
                                            icon={FaUser}
                                            name="role"
                                        >
                                            <select
                                                {...register("role")}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                disabled
                                            >
                                                <option value="user">
                                                    User
                                                </option>
                                                <option value="admin">
                                                    Admin
                                                </option>
                                            </select>
                                        </FormField>
                                    </div>
                                    <FormField
                                        label="Address"
                                        icon={FaMapMarkerAlt}
                                        name="address"
                                        placeholder="Enter your address"
                                    />
                                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            <FaSave className="text-sm" />
                                            {isSubmitting
                                                ? "Saving..."
                                                : "Save Changes"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={cancelEditing}
                                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center gap-2"
                                        >
                                            <FaTimes className="text-sm" />
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-600">
                                            Full Name
                                        </label>
                                        <p className="text-gray-900 font-medium">
                                            {user.name}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-600">
                                            Email
                                        </label>
                                        <p className="text-gray-900 font-medium">
                                            {user.email}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-600">
                                            Phone
                                        </label>
                                        <p className="text-gray-900 font-medium">
                                            {user.phone || "Not provided"}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-600">
                                            Role
                                        </label>
                                        <p className="text-gray-900 font-medium capitalize">
                                            {user.role || "user"}
                                        </p>
                                    </div>
                                    <div className="md:col-span-2 space-y-1">
                                        <label className="text-sm font-medium text-gray-600">
                                            Address
                                        </label>
                                        <p className="text-gray-900 font-medium">
                                            {user.address || "Not provided"}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </ProfileSection>

                        {/* Bio Section */}
                        <ProfileSection
                            title="Personal Bio"
                            icon={HiOutlineDocumentText}
                            editable
                            section="bio"
                        >
                            {editSection === "bio" && isEditing ? (
                                <form
                                    onSubmit={handleSubmit(onUpdateProfile)}
                                    className="space-y-4"
                                >
                                    <textarea
                                        {...register("bio")}
                                        rows={6}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                        placeholder="Tell us about yourself, your background, and what you're looking for..."
                                    />
                                    <div className="flex gap-3 pt-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            <FaSave className="text-sm" />
                                            {isSubmitting
                                                ? "Saving..."
                                                : "Save Bio"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={cancelEditing}
                                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center gap-2"
                                        >
                                            <FaTimes className="text-sm" />
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="prose prose-sm max-w-none">
                                    <p className="text-gray-700 leading-relaxed">
                                        {user.bio ||
                                            "No personal bio provided. Click 'Edit' to add a bio about yourself."}
                                    </p>
                                </div>
                            )}
                        </ProfileSection>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
