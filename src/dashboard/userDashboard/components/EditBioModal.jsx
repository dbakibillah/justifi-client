import { useEffect, useRef } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

const EditBioModal = ({ isOpen, tempData, onInputChange, onSave, onClose }) => {
    const textareaRef = useRef(null);

    // Auto-focus textarea when modal opens
    useEffect(() => {
        if (isOpen && textareaRef.current) {
            textareaRef.current.focus();
            // Move cursor to end
            textareaRef.current.setSelectionRange(
                textareaRef.current.value.length,
                textareaRef.current.value.length
            );
        }
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const charCount = tempData?.bio?.length || 0;
    const isOverLimit = charCount > 500;
    const canSave = !isOverLimit;

    const handleSave = () => {
        if (canSave) {
            onSave();
        }
    };

    const handleKeyDown = (e) => {
        // Ctrl/Cmd + Enter to save
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            handleSave();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 border-b border-gray-200 bg-white sticky top-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">
                                Edit Bio
                            </h3>
                            <p className="text-gray-500 text-sm mt-1">
                                Tell us about yourself
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-lg"
                            aria-label="Close modal"
                        >
                            <FaTimes className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <textarea
                        ref={textareaRef}
                        value={tempData?.bio || ""}
                        onChange={(e) => onInputChange("bio", e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={`w-full h-64 px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none bg-white text-gray-700 leading-relaxed ${
                            isOverLimit
                                ? "border-red-300 bg-red-50"
                                : "border-gray-300"
                        }`}
                        placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                        maxLength={500}
                    />
                    <div className="flex items-center justify-between mt-4 text-sm">
                        <span className="text-gray-500">
                            Share your story with the community
                            <span className="hidden sm:inline">
                                {" "}
                                (Ctrl+Enter to save)
                            </span>
                        </span>
                        <span
                            className={`font-semibold ${
                                isOverLimit ? "text-red-500" : "text-gray-500"
                            }`}
                        >
                            {charCount}/500
                            {isOverLimit && " - Too long!"}
                        </span>
                    </div>

                    {/* Character limit warning */}
                    {isOverLimit && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm font-medium">
                                ⚠️ Your bio exceeds the 500 character limit.
                                Please shorten it to save.
                            </p>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={handleSave}
                        disabled={!canSave}
                        className={`flex-1 font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                            canSave
                                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white cursor-pointer"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        <FaSave className="h-5 w-5" />
                        Save Bio
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <FaTimes className="h-5 w-5" />
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditBioModal;
