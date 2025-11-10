const MediatorCard = ({ mediator, onEdit, onDelete, searchTerm }) => {
    const highlightText = (text) => {
        if (!searchTerm || !text) return text;

        const regex = new RegExp(`(${searchTerm})`, "gi");
        const parts = text.toString().split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? (
                <mark key={index} className="bg-yellow-200 px-1 rounded">
                    {part}
                </mark>
            ) : (
                part
            )
        );
    };

    const getAvailabilityColor = (availability) => {
        switch (availability) {
            case "Available":
                return "bg-green-100 text-green-800";
            case "Busy":
                return "bg-yellow-100 text-yellow-800";
            case "Unavailable":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            {/* Image Section */}
            <div className="h-48 bg-gradient-to-br from-green-100 to-teal-200 relative">
                <img
                    src={mediator.image}
                    alt={mediator.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.style.display = "none";
                    }}
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${getAvailabilityColor(
                            mediator.availability
                        )}`}
                    >
                        {mediator.availability}
                    </span>
                    <span className="bg-white rounded-full px-3 py-1 shadow-md">
                        <span className="text-sm font-semibold text-blue-600 capitalize">
                            {mediator.gender}
                        </span>
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                {/* Name and Qualification */}
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {highlightText(mediator.name)}
                    </h3>
                    <p className="text-gray-600 text-sm">
                        {highlightText(mediator.qualification)}
                    </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                        <span className="mr-2">📧</span>
                        <span className="text-sm">
                            {highlightText(mediator.email)}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <span className="mr-2">📞</span>
                        <span className="text-sm">
                            {highlightText(mediator.phone)}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <span className="mr-2">📍</span>
                        <span className="text-sm">
                            {highlightText(mediator.address)}
                        </span>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center bg-gray-50 rounded-lg p-2">
                        <div className="font-bold text-gray-800">
                            {mediator.experience || 0}
                        </div>
                        <div className="text-xs text-gray-600">Years</div>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg p-2">
                        <div className="font-bold text-gray-800">
                            {mediator.casesMediated || 0}
                        </div>
                        <div className="text-xs text-gray-600">Cases</div>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg p-2">
                        <div className="font-bold text-gray-800">
                            {mediator.successRate || 0}%
                        </div>
                        <div className="text-xs text-gray-600">Success</div>
                    </div>
                </div>

                {/* Specialization */}
                <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">
                        Specialization:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {mediator.specialization.map((spec, index) => (
                            <span
                                key={index}
                                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                            >
                                {highlightText(spec)}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">
                        Languages:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {mediator.languages.map((lang, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                            >
                                {highlightText(lang)}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Hourly Rate */}
                {mediator.hourlyRate && (
                    <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-1">
                            Hourly Rate:
                        </h4>
                        <p className="text-lg font-bold text-green-600">
                            ${mediator.hourlyRate}/hr
                        </p>
                    </div>
                )}

                {/* Description */}
                <div className="mb-6">
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {highlightText(mediator.description)}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                    <button
                        onClick={() => onEdit(mediator)}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(mediator._id)}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-all transform hover:scale-105"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MediatorCard;
