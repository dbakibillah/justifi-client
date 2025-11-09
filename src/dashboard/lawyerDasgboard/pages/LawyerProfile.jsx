import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
    FaAward,
    FaBriefcase,
    FaChartLine,
    FaEdit,
    FaEnvelope,
    FaGavel,
    FaLanguage,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaPhone,
    FaSave,
    FaStar,
    FaTimes,
    FaTrash,
    FaUniversity,
    FaUser,
    FaUserTie,
} from "react-icons/fa";
import { HiOutlineAcademicCap, HiOutlineDocumentText } from "react-icons/hi";
import { MdVerified, MdWork } from "react-icons/md";
import { toast } from "react-toastify";
import Loading from "../../../common/loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserData from "../../../hooks/useUserData";

const LawyerProfile = () => {
    const { currentUser } = useUserData();
    const axiosSecure = useAxiosSecure();
    const [isEditing, setIsEditing] = useState(false);
    const [editSection, setEditSection] = useState(null);
    const [newLanguage, setNewLanguage] = useState("");
    const [newSpecialization, setNewSpecialization] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm();

    const {
        data: lawyer = {},
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["lawyerProfile", currentUser?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(
                `/lawyerProfile?email=${currentUser?.email}`
            );
            return response.data;
        },
        enabled: !!currentUser?.email,
    });

    const startEditing = useCallback(
        (section) => {
            setEditSection(section);
            setIsEditing(true);
            if (lawyer) {
                reset(lawyer);
            }
        },
        [lawyer, reset]
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

            const response = await axiosSecure.patch(
                `/lawyerProfile/${lawyer.email}`,
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

    const updateField = useCallback(
        async (field, value) => {
            try {
                const response = await axiosSecure.patch(
                    `/lawyerProfile/${lawyer.email}`,
                    { [field]: value }
                );

                if (response.data.success) {
                    toast.success("Update successful");
                    await refetch();
                } else {
                    toast.error(response.data.error || "Update failed");
                }
            } catch (error) {
                console.error(`Field update error:`, error);
                toast.error(error.response?.data?.error || "Update failed");
            }
        },
        [lawyer, axiosSecure, refetch]
    );

    const addLanguage = useCallback(() => {
        if (newLanguage && !lawyer.languages?.includes(newLanguage)) {
            const updatedLanguages = [...(lawyer.languages || []), newLanguage];
            updateField("languages", updatedLanguages);
            setNewLanguage("");
        }
        // Collapse the edit field after adding
        setIsEditing(false);
        setEditSection(null);
    }, [newLanguage, lawyer, updateField]);

    const removeLanguage = useCallback(
        (languageToRemove) => {
            const updatedLanguages = (lawyer.languages || []).filter(
                (lang) => lang !== languageToRemove
            );
            updateField("languages", updatedLanguages);
            // Collapse the edit field after deleting
            setIsEditing(false);
            setEditSection(null);
        },
        [lawyer, updateField]
    );

    const addSpecialization = useCallback(() => {
        if (
            newSpecialization &&
            !lawyer.specialization?.includes(newSpecialization)
        ) {
            const updatedSpecializations = [
                ...(lawyer.specialization || []),
                newSpecialization,
            ];
            updateField("specialization", updatedSpecializations);
            setNewSpecialization("");
        }
        // Collapse the edit field after adding
        setIsEditing(false);
        setEditSection(null);
    }, [newSpecialization, lawyer, updateField]);

    const removeSpecialization = useCallback(
        (specToRemove) => {
            const updatedSpecializations = (lawyer.specialization || []).filter(
                (spec) => spec !== specToRemove
            );
            updateField("specialization", updatedSpecializations);
            // Collapse the edit field after deleting
            setIsEditing(false);
            setEditSection(null);
        },
        [lawyer, updateField]
    );

    // Professional Stat Card Component
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

    // Professional Section Component
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

    if (error || !lawyer || !lawyer._id) {
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
                        Unable to load lawyer profile information.
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
                                Professional Profile
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Manage your professional information and
                                credentials
                            </p>
                        </div>
                        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                            <MdVerified className="text-blue-600 text-lg" />
                            <span className="text-sm font-medium text-blue-800">
                                Verified Attorney
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
                                            lawyer.image ||
                                            "/default-avatar.png"
                                        }
                                        alt={lawyer.name}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 mx-auto"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full">
                                        <MdVerified className="text-sm" />
                                    </div>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                    {lawyer.name}
                                </h2>
                                <p className="text-gray-600 text-sm mb-3">
                                    {lawyer.specialization?.[0] ||
                                        "Legal Professional"}
                                </p>

                                <div className="flex items-center justify-center gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            className={`text-sm ${
                                                star <=
                                                Math.floor(lawyer.rating || 0)
                                                    ? "text-yellow-400"
                                                    : "text-gray-300"
                                            }`}
                                        />
                                    ))}
                                    <span className="text-sm text-gray-600 ml-2">
                                        ({lawyer.rating || 0})
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">
                                        Bar ID
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        {lawyer.bar_id || "N/A"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">
                                        Status
                                    </span>
                                    <span className="font-medium text-green-600">
                                        Active
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">
                                        Member Since
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        2023
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Stats Overview */}
                        <div className="space-y-4">
                            <StatCard
                                icon={MdWork}
                                label="Experience"
                                value={`${lawyer.experience || 0} years`}
                                color="blue"
                            />
                            <StatCard
                                icon={FaChartLine}
                                label="Success Rate"
                                value={`${lawyer.successRate || 0}%`}
                                color="green"
                            />
                            <StatCard
                                icon={FaGavel}
                                label="Cases Handled"
                                value={lawyer.casesHandled || 0}
                                color="purple"
                            />
                        </div>
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
                                                    value={lawyer.email}
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
                                            label="Gender"
                                            icon={FaUser}
                                            name="gender"
                                        >
                                            <select
                                                {...register("gender")}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">
                                                    Select Gender
                                                </option>
                                                <option value="Male">
                                                    Male
                                                </option>
                                                <option value="Female">
                                                    Female
                                                </option>
                                                <option value="Other">
                                                    Other
                                                </option>
                                            </select>
                                        </FormField>
                                    </div>
                                    <FormField
                                        label="Office Address"
                                        icon={FaMapMarkerAlt}
                                        name="address"
                                        placeholder="Enter office address"
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
                                            {lawyer.name}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-600">
                                            Email
                                        </label>
                                        <p className="text-gray-900 font-medium">
                                            {lawyer.email}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-600">
                                            Phone
                                        </label>
                                        <p className="text-gray-900 font-medium">
                                            {lawyer.phone || "Not provided"}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-600">
                                            Gender
                                        </label>
                                        <p className="text-gray-900 font-medium">
                                            {lawyer.gender || "Not provided"}
                                        </p>
                                    </div>
                                    <div className="md:col-span-2 space-y-1">
                                        <label className="text-sm font-medium text-gray-600">
                                            Office Address
                                        </label>
                                        <p className="text-gray-900 font-medium">
                                            {lawyer.address || "Not provided"}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </ProfileSection>

                        {/* Professional Details */}
                        <ProfileSection
                            title="Professional Details"
                            icon={FaAward}
                            editable
                            section="professional"
                        >
                            {editSection === "professional" && isEditing ? (
                                <form
                                    onSubmit={handleSubmit(onUpdateProfile)}
                                    className="space-y-6"
                                >
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <FormField
                                            label="Consultation Fee (BDT)"
                                            icon={FaMoneyBillWave}
                                            name="fee"
                                            type="number"
                                            required
                                        />
                                        <FormField
                                            label="Practicing Court"
                                            icon={FaUniversity}
                                            name="court"
                                            placeholder="Enter practicing court"
                                        />
                                        <FormField
                                            label="Experience (Years)"
                                            icon={MdWork}
                                            name="experience"
                                            type="number"
                                        />
                                        {/* Success Rate removed from editable form but kept in display view */}
                                    </div>
                                    <FormField
                                        label="Qualifications"
                                        icon={HiOutlineAcademicCap}
                                        name="qualification"
                                        placeholder="Enter qualifications"
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
                                            Consultation Fee
                                        </label>
                                        <p className="text-gray-900 font-medium">
                                            ৳{lawyer.fee || 0}/hour
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-600">
                                            Practicing Court
                                        </label>
                                        <p className="text-gray-900 font-medium">
                                            {lawyer.court || "Not provided"}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-600">
                                            Experience
                                        </label>
                                        <p className="text-gray-900 font-medium">
                                            {lawyer.experience || 0} years
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-600">
                                            Success Rate
                                        </label>
                                        <p className="text-gray-900 font-medium">
                                            {lawyer.successRate || 0}%
                                        </p>
                                    </div>
                                    <div className="md:col-span-2 space-y-1">
                                        <label className="text-sm font-medium text-gray-600">
                                            Qualifications
                                        </label>
                                        <p className="text-gray-900 font-medium">
                                            {lawyer.qualification ||
                                                "Not provided"}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </ProfileSection>

                        {/* Two Column Layout */}
                        <div className="grid lg:grid-cols-2 gap-6">
                            {/* Specializations */}
                            <ProfileSection
                                title="Areas of Specialization"
                                icon={FaBriefcase}
                                editable
                                section="specialization"
                            >
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {lawyer.specialization?.map((spec) => (
                                            <span
                                                key={spec}
                                                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-200"
                                            >
                                                {spec}
                                                {editSection ===
                                                    "specialization" && (
                                                    <button
                                                        onClick={() =>
                                                            removeSpecialization(
                                                                spec
                                                            )
                                                        }
                                                        className="text-blue-500 hover:text-blue-700 transition-colors"
                                                    >
                                                        <FaTrash className="text-xs" />
                                                    </button>
                                                )}
                                            </span>
                                        ))}
                                        {(!lawyer.specialization ||
                                            lawyer.specialization.length ===
                                                0) && (
                                            <span className="text-gray-500 text-sm">
                                                No specializations added
                                            </span>
                                        )}
                                    </div>
                                    {editSection === "specialization" && (
                                        <div className="flex gap-2 pt-2">
                                            <input
                                                type="text"
                                                value={newSpecialization}
                                                onChange={(e) =>
                                                    setNewSpecialization(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Add specialization..."
                                                className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <button
                                                onClick={addSpecialization}
                                                disabled={
                                                    !newSpecialization.trim()
                                                }
                                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </ProfileSection>

                            {/* Languages */}
                            <ProfileSection
                                title="Languages Spoken"
                                icon={FaLanguage}
                                editable
                                section="languages"
                            >
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {lawyer.languages?.map((language) => (
                                            <span
                                                key={language}
                                                className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full border border-green-200"
                                            >
                                                {language}
                                                {editSection ===
                                                    "languages" && (
                                                    <button
                                                        onClick={() =>
                                                            removeLanguage(
                                                                language
                                                            )
                                                        }
                                                        className="text-green-500 hover:text-green-700 transition-colors"
                                                    >
                                                        <FaTrash className="text-xs" />
                                                    </button>
                                                )}
                                            </span>
                                        ))}
                                        {(!lawyer.languages ||
                                            lawyer.languages.length === 0) && (
                                            <span className="text-gray-500 text-sm">
                                                No languages added
                                            </span>
                                        )}
                                    </div>
                                    {editSection === "languages" && (
                                        <div className="flex gap-2 pt-2">
                                            <input
                                                type="text"
                                                value={newLanguage}
                                                onChange={(e) =>
                                                    setNewLanguage(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Add language..."
                                                className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <button
                                                onClick={addLanguage}
                                                disabled={!newLanguage.trim()}
                                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </ProfileSection>
                        </div>

                        {/* Professional Bio */}
                        <ProfileSection
                            title="Professional Biography"
                            icon={HiOutlineDocumentText}
                            editable
                            section="description"
                        >
                            {editSection === "description" && isEditing ? (
                                <form
                                    onSubmit={handleSubmit(onUpdateProfile)}
                                    className="space-y-4"
                                >
                                    <textarea
                                        {...register("description")}
                                        rows={6}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                        placeholder="Describe your professional background, expertise, and achievements..."
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
                                                : "Save Biography"}
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
                                        {lawyer.description ||
                                            "No professional biography provided."}
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

export default LawyerProfile;
