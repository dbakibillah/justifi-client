import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Banner3 = () => {
  return (
    <div className="bg-gray-100">
      {/* Case Studies Section */}
      <section className="py-16 px-8 text-center">
        <h4 className="text-sm tracking-wide text-gray-500 uppercase">
          Portfolio
        </h4>
        <h2 className="text-2xl md:text-3xl font-bold mt-2">
          Check Out Our Popular Case Studies.
        </h2>

        {/* Case Studies Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              img: "https://i.ibb.co.com/5x441y86/crime.jpg",
              category: "Crime",
              title: "Critical Murder Case",
              date: "15 Feb 2024",
            },
            {
              img: "https://images.pexels.com/photos/123123/pexels-photo-123123.jpeg",
              category: "Rights",
              title: "Children Rights",
              date: "16 Feb 2024",
            },
            {
              img: "https://images.pexels.com/photos/210990/pexels-photo-210990.jpeg",
              category: "Finance",
              title: "Money Loundering",
              date: "17 Feb 2024",
            },
          ].map((caseItem, idx) => (
            <div
              key={idx}
              className="relative rounded-xl overflow-hidden shadow-lg group"
            >
              <img
                src={caseItem.img}
                alt={caseItem.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end text-left p-4 text-white">
                <p className="text-sm">{caseItem.category}</p>
                <h3 className="text-lg font-semibold">{caseItem.title}</h3>
                <p className="text-sm mt-1">{caseItem.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <button className="mt-10 bg-[#5a5a2e] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#444422] transition">
          See More
        </button>
      </section>

      {/* Attorneys Section */}
      <section className="py-16 px-8 bg-white">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-12">
          Meet Our Expert Attorneys
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            {
              img: "https://randomuser.me/api/portraits/men/11.jpg",
              name: "Attor. Mehedi Hasan",
              role: "Family Consultant",
            },
            {
              img: "https://randomuser.me/api/portraits/men/12.jpg",
              name: "Attor. Kazi Hasimm",
              role: "Business Consultant",
            },
            {
              img: "https://randomuser.me/api/portraits/men/13.jpg",
              name: "Attor. Abdul Karim",
              role: "Criminal Consultant",
            },
            {
              img: "https://randomuser.me/api/portraits/women/14.jpg",
              name: "Attor. Anikur Rahman",
              role: "Divorce Consultant",
            },
          ].map((attorney, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <img
                src={attorney.img}
                alt={attorney.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <div className="flex justify-center space-x-3 mb-4 text-gray-600">
                <FaFacebookF className="cursor-pointer hover:text-blue-600" />
                <FaTwitter className="cursor-pointer hover:text-blue-400" />
                <FaLinkedinIn className="cursor-pointer hover:text-blue-700" />
              </div>
              <h3 className="font-semibold text-lg">{attorney.name}</h3>
              <p className="text-sm text-gray-500">{attorney.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Banner3;
