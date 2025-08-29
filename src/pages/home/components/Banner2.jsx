const Banner2 = () => {
    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Practice Areas */}
            <section className="py-20 px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center mb-4">
                        <div className="w-12 h-0.5 bg-yellow-500 mr-3"></div>
                        <h4 className="text-sm tracking-widest text-yellow-600 font-semibold">
                            HOW CAN WE HELP YOU
                        </h4>
                        <div className="w-12 h-0.5 bg-yellow-500 ml-3"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mt-2 text-gray-800">
                        Our Legal{" "}
                        <span className="text-yellow-600">Practice Areas</span>
                    </h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Our team of specialized attorneys is dedicated to
                        providing exceptional legal services across various
                        practice areas.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            name: "Civil Law",
                            icon: "⚖️",
                            description:
                                "Attorneys of our squad are tremendously skillful to acquire a positive outcome and honest justice for civil matters.",
                        },
                        {
                            name: "Family Law",
                            icon: "👨‍👩‍👧‍👦",
                            description:
                                "Expert guidance through divorce, child custody, and other sensitive family legal matters with compassion.",
                        },
                        {
                            name: "Business Law",
                            icon: "🏢",
                            description:
                                "Comprehensive legal support for businesses of all sizes, from startups to established corporations.",
                        },
                        {
                            name: "Education Law",
                            icon: "🎓",
                            description:
                                "Protecting rights and interests in educational institutions for students, teachers, and administrators.",
                        },
                        {
                            name: "Criminal Law",
                            icon: "🔒",
                            description:
                                "Aggressive defense representation to protect your rights and freedom in criminal proceedings.",
                        },
                        {
                            name: "Cyber Law",
                            icon: "💻",
                            description:
                                "Specialized legal expertise for digital issues, data protection, and internet-related cases.",
                        },
                    ].map((area, idx) => (
                        <div
                            key={idx}
                            className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 group rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden border border-stone-700/50"
                        >
                            {/* Stone texture overlay */}
                            <div className="absolute inset-0"></div>

                            {/* Background decorative element */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full -translate-y-8 translate-x-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Icon container */}
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-stone-800/70 rounded-2xl mb-6 group-hover:bg-yellow-500 group-hover:text-white transition-colors duration-300 text-2xl backdrop-blur-sm">
                                {area.icon}
                            </div>

                            <h3 className="text-xl font-bold mb-4 text-white group-hover:text-yellow-300 transition-colors duration-300">
                                {area.name}
                            </h3>

                            <p className="text-stone-200 mb-6 leading-relaxed">
                                {area.description}
                            </p>

                            <button className="bg-yellow-500 text-stone-900 font-semibold rounded-lg px-6 py-3 hover:bg-yellow-400 transition-colors duration-300 flex items-center justify-center mx-auto group-hover:shadow-lg shadow-md">
                                Read More
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16 bg-gradient-to-r from-stone-900 to-stone-800 rounded-2xl p-12 text-white shadow-xl border border-stone-700/50">
                    <h3 className="text-3xl font-bold mb-4">
                        Need Legal Assistance?
                    </h3>
                    <p className="text-stone-200 mb-8 max-w-2xl mx-auto">
                        Contact us today for a free consultation and let our
                        experienced attorneys help you with your legal needs.
                    </p>
                    <button className="bg-yellow-500 hover:bg-yellow-400 text-stone-900 font-semibold rounded-lg px-8 py-4 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                        Schedule a Consultation
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Banner2;
