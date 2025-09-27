const Banner = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section with stats positioned absolutely */}
            <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-[#1a2e4a] text-white pt-16 md:pt-36 pb-32 md:pb-40 grid md:grid-cols-2 items-center px-4 md:px-36">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 opacity-10 rounded-full -translate-y-20 translate-x-20"></div>
                    <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-400 opacity-5 rounded-full"></div>
                    <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-white opacity-5 rounded-full"></div>
                </div>

                {/* Left Side - Text */}
                <div className="flex justify-center relative z-10">
                    <div className="relative animate-[float_6s_ease-in-out_infinite]">
                        <img
                            src="https://i.ibb.co.com/fzC4pYdY/Lawyer-Png-Images-Free-Download-on-Freepik-removebg-preview.png"
                            alt="Professional Attorney"
                            loading="lazy"
                            className="w-full max-w-md lg:max-w-lg h-auto object-contain drop-shadow-2xl relative z-10"
                        />
                        {/* Decorative elements around image */}
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 border-4 border-yellow-400 opacity-30 rounded-lg animate-pulse"></div>
                        <div className="absolute -top-4 -right-4 w-16 h-16 border-4 border-yellow-400 opacity-30 rounded-lg animate-pulse delay-1000"></div>
                    </div>
                </div>

                {/* Right Side - Content */}
                <div className="container mx-auto text-center md:text-left relative z-10">
                    <div className="mb-6 inline-block bg-yellow-400/10 px-4 py-2 rounded-full backdrop-blur-sm">
                        <span className="text-yellow-400 text-sm font-semibold tracking-wider">
                            TRUSTED LEGAL EXPERTS
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-snug bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-100">
                        Our Attorneys Always <br className="hidden md:block" />
                        Provide{" "}
                        <span className="text-yellow-400 relative">
                            Excellent Service
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-400 scale-x-75"></span>
                        </span>
                    </h2>
                    <p className="mt-5 text-gray-300 max-w-lg text-lg leading-relaxed backdrop-blur-sm bg-black/10 p-4 rounded-lg">
                        Teams of Intelligent & Professional Attorneys of Justifi
                        are always prepared to make you triumph. We always try
                        our best to make our clients happy.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button className="relative overflow-hidden group bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                            <span className="relative z-10">
                                Free Consultation
                            </span>
                            <div className="absolute inset-0 bg-yellow-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                        </button>
                        <button className="relative overflow-hidden group border-2 border-white hover:border-yellow-400 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300">
                            <span className="relative z-10">Learn More</span>
                            <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                        </button>
                    </div>
                </div>

                {/* Floating Stats Section - Enhanced design */}
                <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-11/12 md:w-3/4 z-20">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl grid grid-cols-2 md:grid-cols-4 text-center overflow-hidden border border-gray-200/50">
                        {[
                            {
                                value: "18",
                                label: "Attorneys",
                                icon: "⚖️",
                                color: "blue",
                            },
                            {
                                value: "99%",
                                label: "Cases Won",
                                icon: "🏆",
                                color: "green",
                            },
                            {
                                value: "100%",
                                label: "Legal Way",
                                icon: "📝",
                                color: "purple",
                            },
                            {
                                value: "10K",
                                label: "Happy Clients",
                                icon: "😊",
                                color: "yellow",
                            },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="p-5 md:p-6 border-r border-gray-100 last:border-r-0 group hover:bg-gray-50/80 transition-all duration-500 relative overflow-hidden"
                            >
                                {/* Icon with subtle animation */}
                                <div className="text-3xl mb-2 opacity-90 transform group-hover:scale-110 transition-transform duration-300">
                                    {stat.icon}
                                </div>

                                {/* Value with gradient text */}
                                <h3 className="text-2xl md:text-4xl font-bold text-gray-800 mb-1 group-hover:text-yellow-600 transition-colors duration-300">
                                    {stat.value}
                                </h3>

                                {/* Label with subtle animation */}
                                <p className="text-sm text-gray-600 font-medium transform group-hover:translate-y-1 transition-transform duration-300">
                                    {stat.label}
                                </p>

                                {/* Animated underline */}
                                <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto mt-4 group-hover:w-16 transition-all duration-500 rounded-full"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Banner;
