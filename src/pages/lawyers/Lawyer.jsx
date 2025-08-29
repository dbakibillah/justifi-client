import { getAllLawyers } from "../../data/lawyers";

import LawyerCard from "./components/LawyerCard";

export default function Lawyer() {
    const lawyers = getAllLawyers();
    return (
        <div className="">
            <section className="relative ">
                <div className="relative py-3 text-center px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Lawyers for Hiring
                    </h2>

                    <div className="flex flex-col md:flex-row md:justify-between md:items-center max-w-6xl mx-auto gap-3">
                        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                            <select className="border px-4 py-2 rounded-md focus:outline-none w-full sm:w-auto">
                                <option>Select Category</option>
                                <option>Family</option>
                                <option>Divorce</option>
                                <option>Business</option>
                            </select>
                            <select className="border px-4 py-2 rounded-md focus:outline-none w-full sm:w-auto">
                                <option>Select Location</option>
                                <option>Dhaka</option>
                                <option>Chittagong</option>
                                <option>Rajshahi</option>
                            </select>
                        </div>

                        <div className="flex border border-[#dfa02b] rounded-md overflow-hidden w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Search Your Lawyer"
                                className="px-4 py-2 focus:outline-none flex-grow sm:w-65"
                            />
                            <button className="bg-[#dfa02b] text-white px-6 py-2 shrink-0 hover:bg-yellow-700 transition">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-8 px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {lawyers.map((lawyer) => (
                        <LawyerCard key={lawyer.id} lawyer={lawyer} />
                    ))}
                </div>
            </section>
        </div>
    );
}
