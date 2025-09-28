import { Link } from "react-router";
import { FaStar, FaRegStar } from "react-icons/fa";

const LawyerCard = ({ lawyer }) => {
    const rating = lawyer.rating || 4;
    const experience = lawyer.experience || "5+ Years";

    return (
        <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden group">
            {/* Left: Image */}
            <div className="relative md:w-1/3 h-56 md:h-auto">
                <img
                    src={lawyer.image}
                    alt={lawyer.name}
                    className="w-full h-full object-cover md:rounded-l-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
            </div>

            {/* Right: Content */}
            <div className="flex flex-col justify-between p-6 md:w-2/3 text-left">
                {/* Name + Specialization */}
                <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition duration-300">
                        {lawyer.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                        {lawyer.specialization?.join(", ")}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{lawyer.court}</p>
                </div>

                {/* Experience + Rating + Fee */}
                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700">
                        Experience:{" "}
                        <span className="text-blue-700 font-semibold">{experience}</span>
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) =>
                            i < rating ? (
                                <FaStar key={i} className="text-yellow-500 text-sm" />
                            ) : (
                                <FaRegStar key={i} className="text-gray-400 text-sm" />
                            )
                        )}
                        <span className="ml-2 text-sm text-gray-600">{rating}.0</span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mt-2">
                        Consultation Fee:{" "}
                        <span className="text-blue-700 font-semibold">{lawyer.fee}</span>
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-5">
                    <Link
                        to={`/lawyers/${lawyer._id}`}
                        state={{ lawyer }}
                        className="bg-blue-700 hover:bg-blue-800 text-white font-medium text-sm px-5 py-2 rounded-full shadow-md transition duration-300"
                    >
                        View Profile
                    </Link>
                    <Link
                        to={`/lawyers/${lawyer._id}/appointment`}
                        state={{ lawyer }}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium text-sm px-5 py-2 rounded-full shadow-md transition duration-300"
                    >
                        Book Appointment
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LawyerCard;
