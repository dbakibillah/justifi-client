import {
  FaArrowRight,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Banner3 = () => {
    return (
        <div className="bg-gray-50">
            {/* Case Studies Section */}
            <section className="py-20 px-8 text-center max-w-7xl mx-auto">
                <div className="mb-4">
                    <span className="inline-block h-1 w-20 bg-[#8a7b4d] mb-2"></span>
                    <h4 className="text-sm tracking-widest text-gray-500 uppercase font-medium">
                        Portfolio
                    </h4>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mt-2 mb-4">
                    Check Out Our Popular Case Studies
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                    Explore our successful legal cases and see how we've helped
                    clients achieve justice and favorable outcomes.
                </p>

                {/* Case Studies Grid */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            img: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
                            category: "Crime",
                            title: "Critical Murder Case",
                            date: "15 Feb 2024",
                        },
                        {
                            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
                            category: "Rights",
                            title: "Children Rights",
                            date: "16 Feb 2024",
                        },
                        {
                            img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
                            category: "Finance",
                            title: "Money Laundering",
                            date: "17 Feb 2024",
                        },
                    ].map((caseItem, idx) => (
                        <div
                            key={idx}
                            className="relative rounded-xl overflow-hidden shadow-lg group transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={caseItem.img}
                                    alt={caseItem.title}
                                    className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end text-left p-6 text-white">
                                <span className="text-xs font-medium text-[#d4c8a3] uppercase tracking-wider">
                                    {caseItem.category}
                                </span>
                                <h3 className="text-xl font-semibold mt-1 mb-2">
                                    {caseItem.title}
                                </h3>
                                <div className="flex items-center justify-between border-t border-gray-500/30 pt-3">
                                    <p className="text-sm text-gray-300">
                                        {caseItem.date}
                                    </p>
                                    <button className="text-xs font-medium flex items-center gap-1 hover:text-[#d4c8a3] transition-colors">
                                        Read More{" "}
                                        <FaArrowRight className="text-xs" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* See More Button */}
                <button className="mt-16 bg-[#8a7b4d] hover:bg-[#726741] text-white px-8 py-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-2 mx-auto group">
                    View All Case Studies
                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
            </section>

            {/* Attorneys Section */}
            <section className="py-20 px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block h-1 w-20 bg-[#8a7b4d] mb-2"></span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">
                            Meet Our Expert Attorneys
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                            Our team of dedicated legal professionals brings
                            years of experience and expertise to every case.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
                                name: "Mehedi Hasan",
                                role: "Family Consultant",
                            },
                            {
                                img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=798&q=80",
                                name: "Kazi Hasimm",
                                role: "Business Consultant",
                            },
                            {
                                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
                                name: "Abdul Karim",
                                role: "Criminal Consultant",
                            },
                            {
                                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
                                name: "Anika Rahman",
                                role: "Divorce Consultant",
                            },
                        ].map((attorney, idx) => (
                            <div
                                key={idx}
                                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-[#d4c8a3]/30"
                            >
                                <div className="relative overflow-hidden rounded-full w-40 h-40 mx-auto mb-6">
                                    <img
                                        src={attorney.img}
                                        alt={attorney.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="flex justify-center space-x-4 mb-4 text-gray-500">
                                    <div className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:bg-[#f8f5ea] hover:text-[#8a7b4d]">
                                        <FaFacebookF size={14} />
                                    </div>
                                    <div className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:bg-[#f8f5ea] hover:text-[#8a7b4d]">
                                        <FaTwitter size={14} />
                                    </div>
                                    <div className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:bg-[#f8f5ea] hover:text-[#8a7b4d]">
                                        <FaLinkedinIn size={14} />
                                    </div>
                                </div>
                                <h3 className="font-semibold text-lg text-gray-800 mb-1">
                                    Attor. {attorney.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {attorney.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Banner3;
