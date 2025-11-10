import { useEffect, useRef, useState } from "react";
import {
    FaBuilding,
    FaGraduationCap,
    FaTimes,
    FaTrash,
    FaUpload,
    FaUser,
} from "react-icons/fa";

const LawyerModal = ({
    show,
    onClose,
    onSubmit,
    formData,
    onInputChange,
    onArrayInput,
    isEditing,
    resetForm, // Add this prop to reset form from parent
}) => {
    const [imagePreview, setImagePreview] = useState(formData.image || "");
    const [localFormData, setLocalFormData] = useState(formData);
    const fileInputRef = useRef(null);

    // Update local form data when formData prop changes
    useEffect(() => {
        setLocalFormData(formData);
        setImagePreview(formData.image || "");
    }, [formData]);

    // Reset file input when modal closes
    useEffect(() => {
        if (!show) {
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    }, [show]);

    if (!show) return null;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/webp",
            ];
            if (!validTypes.includes(file.type)) {
                alert("Please select a valid image file (JPEG, PNG, WEBP)");
                return;
            }

            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert("Image size must be less than 5MB");
                return;
            }

            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            onInputChange({
                target: {
                    name: "imageFile",
                    value: file,
                },
            });

            onInputChange({
                target: {
                    name: "image",
                    value: previewUrl,
                },
            });
        }
    };

    const handleRemoveImage = () => {
        setImagePreview("");
        onInputChange({
            target: {
                name: "image",
                value: "",
            },
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleImageUrlChange = (e) => {
        setImagePreview(e.target.value);
        onInputChange(e);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleImageChange({ target: { files } });
        }
    };

    const handleCancel = () => {
        // Reset image preview
        setImagePreview("");

        // Clear file input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        // Call parent's reset function if provided
        if (resetForm) {
            resetForm();
        }

        // Close modal
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-gray-200">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-xl">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">
                                {isEditing
                                    ? "Edit Lawyer Profile"
                                    : "Add New Lawyer"}
                            </h2>
                            <p className="text-gray-600 text-sm">
                                {isEditing
                                    ? "Update professional information"
                                    : "Create new lawyer profile"}
                            </p>
                        </div>
                        <button
                            onClick={handleCancel}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8">
                    <div className="space-y-8">
                        {/* Profile Image Section */}
                        <Section title="Profile Image">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Image Upload Area */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Upload Image
                                    </label>
                                    <div
                                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                                            imagePreview
                                                ? "border-green-500 bg-green-50"
                                                : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                                        }`}
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop}
                                    >
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            accept="image/jpeg, image/jpg, image/png, image/webp"
                                            className="hidden"
                                        />

                                        {imagePreview ? (
                                            <div className="relative inline-block">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="w-32 h-32 rounded-lg object-cover shadow-md"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemoveImage();
                                                    }}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors shadow-md"
                                                >
                                                    <FaTrash className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="py-4">
                                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                                    <FaUpload className="text-gray-400 text-lg" />
                                                </div>
                                                <p className="text-gray-600 font-medium mb-1">
                                                    Click to upload image
                                                </p>
                                                <p className="text-gray-400 text-sm">
                                                    JPEG, PNG, WEBP (Max 5MB)
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Image URL Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Or provide image URL
                                    </label>
                                    <div className="space-y-2">
                                        <input
                                            type="url"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleImageUrlChange}
                                            placeholder="https://example.com/profile-image.jpg"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                        <p className="text-gray-500 text-xs">
                                            Enter direct link to profile image
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        {/* Personal Information Section */}
                        <Section
                            title="Personal Information"
                            icon={<FaUser className="text-blue-600" />}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Full Name *"
                                    name="name"
                                    value={formData.name}
                                    onChange={onInputChange}
                                    required
                                    placeholder="John Doe"
                                />
                                <InputField
                                    label="Email Address *"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={onInputChange}
                                    required
                                    placeholder="john.doe@lawfirm.com"
                                />
                                <InputField
                                    label="Phone Number *"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={onInputChange}
                                    required
                                    placeholder="+1 (555) 123-4567"
                                />
                                <SelectField
                                    label="Gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={onInputChange}
                                    options={["Male", "Female", "Other"]}
                                />
                                <InputField
                                    label="Office Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={onInputChange}
                                    className="md:col-span-2"
                                    placeholder="123 Business Ave, Suite 100, New York, NY"
                                />
                            </div>
                        </Section>

                        {/* Professional Information Section */}
                        <Section
                            title="Professional Information"
                            icon={<FaBuilding className="text-blue-600" />}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField
                                    label="Bar ID *"
                                    name="bar_id"
                                    value={formData.bar_id}
                                    onChange={onInputChange}
                                    required
                                    placeholder="BAR-123456"
                                />
                                <InputField
                                    label="Consultation Fee ($)"
                                    type="number"
                                    name="fee"
                                    value={formData.fee}
                                    onChange={onInputChange}
                                    placeholder="250"
                                    min="0"
                                />
                                <InputField
                                    label="Experience (Years)"
                                    type="number"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={onInputChange}
                                    placeholder="8"
                                    min="0"
                                />
                                <InputField
                                    label="Success Rate (%)"
                                    type="number"
                                    name="successRate"
                                    value={formData.successRate}
                                    onChange={onInputChange}
                                    placeholder="85"
                                    min="0"
                                    max="100"
                                />
                                <InputField
                                    label="Cases Handled"
                                    type="number"
                                    name="casesHandled"
                                    value={formData.casesHandled}
                                    onChange={onInputChange}
                                    placeholder="150"
                                    min="0"
                                />
                                <InputField
                                    label="Rating"
                                    type="number"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={onInputChange}
                                    placeholder="4.5"
                                    step="0.1"
                                    min="0"
                                    max="5"
                                />
                                <InputField
                                    label="Court / Jurisdiction"
                                    name="court"
                                    value={formData.court}
                                    onChange={onInputChange}
                                    className="md:col-span-2"
                                    placeholder="Supreme Court of New York"
                                />
                                <InputField
                                    label="Qualification"
                                    name="qualification"
                                    value={formData.qualification}
                                    onChange={onInputChange}
                                    className="md:col-span-2"
                                    placeholder="Juris Doctor, Harvard Law School"
                                />
                            </div>
                        </Section>

                        {/* Skills & Description Section */}
                        <Section
                            title="Professional Details"
                            icon={<FaGraduationCap className="text-blue-600" />}
                        >
                            <div className="space-y-6">
                                <ArrayInputField
                                    label="Languages"
                                    placeholder="English, Spanish, French, Mandarin"
                                    defaultValue={formData.languages.join(", ")}
                                    onChange={(e) =>
                                        onArrayInput(e, "languages")
                                    }
                                />
                                <ArrayInputField
                                    label="Areas of Specialization"
                                    placeholder="Corporate Law, Intellectual Property, Mergers & Acquisitions"
                                    defaultValue={formData.specialization.join(
                                        ", "
                                    )}
                                    onChange={(e) =>
                                        onArrayInput(e, "specialization")
                                    }
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Professional Biography
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={onInputChange}
                                        rows="4"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                                        placeholder="Describe professional background, expertise, and notable achievements..."
                                    />
                                </div>
                            </div>
                        </Section>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-4 pt-8 mt-8 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                        >
                            {isEditing ? "Update Profile" : "Create Profile"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Professional Reusable Form Components
const Section = ({ title, children, icon }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            {icon}
            {title}
        </h3>
        {children}
    </div>
);

const InputField = ({
    label,
    type = "text",
    name,
    value,
    onChange,
    required,
    className = "",
    placeholder,
    ...props
}) => (
    <div className={className}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            {...props}
        />
    </div>
);

const SelectField = ({
    label,
    name,
    value,
    onChange,
    options,
    className = "",
}) => (
    <div className={className}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
        </label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
        >
            <option value="">Select {label}</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
);

const ArrayInputField = ({ label, placeholder, defaultValue, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
        </label>
        <input
            type="text"
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        <p className="text-gray-500 text-xs mt-2">Separate items with commas</p>
    </div>
);

export default LawyerModal;
