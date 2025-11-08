import { FaBriefcase, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const ArbitratorCard = ({ arbitrator }) => {
    const rating = arbitrator.rating || 4;
    const experience = arbitrator.experience || "5+ Years";

    return (
        <div className="group bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 overflow-hidden">
            {/* Arbitrator Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={arbitrator.image}
                    alt={arbitrator.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            <div className="p-5">
                {/* Name and Specialization */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {arbitrator.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-1">
                        {arbitrator.specialization?.join(", ")}
                    </p>
                </div>

                {/* Key Details */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <FaBriefcase className="mr-2 text-gray-400" />
                        <span>{experience} experience</span>
                    </div>
                    {arbitrator.address && (
                        <div className="flex items-center text-sm text-gray-600">
                            <FaMapMarkerAlt className="mr-2 text-gray-400" />
                            <span className="line-clamp-1">
                                {arbitrator.address}
                            </span>
                        </div>
                    )}
                </div>

                {/* Rating and Fee */}
                <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center space-x-1">
                        <FaStar className="text-amber-500" />
                        <span className="font-medium text-gray-900">
                            {rating}
                        </span>
                        <span className="text-gray-500">/5</span>
                    </div>
                    <div className="text-gray-900 font-semibold">
                        {arbitrator.fee}
                    </div>
                </div>

                {/* View Profile Button */}
                <Link
                    to={`/arbitrators/${arbitrator._id}`}
                    state={{ arbitrator }}
                    className="w-full bg-gray-900 hover:bg-black text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                    View Profile
                </Link>
            </div>
        </div>
    );
};

export default ArbitratorCard;
