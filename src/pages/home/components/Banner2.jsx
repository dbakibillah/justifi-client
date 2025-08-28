import React from 'react';

const Banner2 = () => {
    return (
        <div>
            {/* Practice Areas */}
      <section className="py-20 px-8">
        <div className="text-center mb-12">
          <h4 className="text-sm tracking-wider text-gray-500">
            HOW CAN WE HELP YOU
          </h4>
          <h2 className="text-3xl font-bold mt-2 text-gray-800">
            Our Legal Practice Areas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            "Civil Law",
            "Family Law",
            "Business Law",
            "Education Law",
            "Criminal Law",
            "Cyber Law",
          ].map((area, idx) => (
            <div
              key={idx}
              className="bg-[#1a1a1a] text-white p-6 rounded-2xl text-center shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-4">{area}</h3>
              <p className="text-gray-300 mb-6">
                Attorneys of our squad are tremendously skillful to acquire a
                positive outcome and honest.
              </p>
              <button className="bg-yellow-500 text-black font-semibold rounded-lg px-5 py-2">
                Read More
              </button>
            </div>
          ))}
        </div>
      </section> 
        </div>
    );
};

export default Banner2;