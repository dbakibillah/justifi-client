const ArbitratorCard = ({ arbitrator, onEdit, onDelete, searchTerm }) => {
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

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            {/* Image Section */}
            <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-200 relative">
                <img
                    src={arbitrator.image}
                    alt={arbitrator.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.style.display = "none";
                    }}
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-md">
                    <span className="text-sm font-semibold text-blue-600 capitalize">
                        {arbitrator.gender}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                {/* Name and Qualification */}
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {highlightText(arbitrator.name)}
                    </h3>
                    <p className="text-gray-600 text-sm">
                        {highlightText(arbitrator.qualification)}
                    </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                        <span className="mr-2">📧</span>
                        <span className="text-sm">
                            {highlightText(arbitrator.email)}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <span className="mr-2">📞</span>
                        <span className="text-sm">
                            {highlightText(arbitrator.phone)}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <span className="mr-2">📍</span>
                        <span className="text-sm">
                            {highlightText(arbitrator.address)}
                        </span>
                    </div>
                </div>

                {/* Specialization */}
                <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">
                        Specialization:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {arbitrator.specialization.map((spec, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
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
                        {arbitrator.languages.map((lang, index) => (
                            <span
                                key={index}
                                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                            >
                                {highlightText(lang)}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {highlightText(arbitrator.description)}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                    <button
                        onClick={() => onEdit(arbitrator)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(arbitrator._id)}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-all transform hover:scale-105"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArbitratorCard;
