import React, { useState } from "react";
import { Mail, Phone, MapPin, Award, Users, Briefcase, Pencil, CheckCircle, Star } from "lucide-react";

const lawyerData = {
  _id: "68d854b4414019472298945f",
  name: "Br. Ashraf Rahman",
  email: "ashraf@gmail.com",
  phone: "+880 1234567890",
  address: "Gulshan, Dhaka, Bangladesh",
  image: "https://i.ibb.co.com/RGryxfh0/brashraf.png",
  gender: "Male",
  languages: ["English", "Bengali"],
  specialization: ["Corporate Law", "Litigation"],
  bar_id: "BAR123467",
  fee: 7500,
  description:
    "Ashraf Rahman is a seasoned corporate lawyer with over 10 years of experience in handling complex business transactions and legal compliance issues. He has represented numerous multinational corporations in Bangladesh.",
  court: "Supreme Court of Bangladesh",
  experience: 10,
  successRate: 92,
  casesHandled: 150,
  rating: 4.5,
  qualification: "LLB, LLM from University of London",
  testimonials: [
    { client: "A. Rahman", feedback: "Highly professional and reliable." },
    { client: "B. Karim", feedback: "Helped our company with corporate compliance seamlessly." },
    { client: "C. Sultana", feedback: "Excellent litigation support and guidance." },
  ],
  recentCases: [
    "MNC Tax Compliance – Won",
    "Corporate Merger Advisory – Settled",
    "Litigation in Labor Law – Won",
  ],
  awards: ["Top Corporate Lawyer 2023", "Excellence in Litigation 2022"],
  publications: ["Corporate Law Guide 2021", "Bangladesh Business Law Review 2020"],
  caseStudies: [
    {
      title: "MNC Tax Compliance Case",
      description: "Provided comprehensive legal guidance to a multinational corporation on tax compliance, resulting in full regulatory approval without penalties.",
      outcome: "Success",
      year: 2023
    },
    {
      title: "Corporate Merger Advisory",
      description: "Advised two large corporations on merger procedures, contracts, and compliance issues.",
      outcome: "Settled",
      year: 2022
    },
    {
      title: "Labor Law Litigation",
      description: "Represented a leading company in a labor law dispute, successfully defending against claims and securing favorable verdict.",
      outcome: "Success",
      year: 2021
    }
  ]
};

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const half = rating - fullStars >= 0.5;
  const arr = Array.from({ length: 5 }).map((_, i) => {
    if (i < fullStars) return "full";
    if (i === fullStars && half) return "half";
    return "empty";
  });

  return (
    <div className="flex items-center space-x-1">
      {arr.map((s, i) => (
        <Star key={i} className={`w-4 h-4 ${s === "full" ? "text-yellow-500" : "text-gray-300"}`} />
      ))}
      <span className="text-sm text-gray-700">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function LawyerProfile() {
  const [lawyer, setLawyer] = useState(lawyerData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(lawyerData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setLawyer(formData);
    setIsEditing(false);
  };

  return (
    <section className="max-w-7xl mx-auto p-8">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <h1 className="text-2xl font-bold tracking-wide">Lawyer Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-blue-700 font-medium shadow hover:bg-gray-100"
          >
            <Pencil size={16} /> {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="md:flex">
          {/* Left Column */}
          <div className="md:w-1/3 bg-gray-50 p-8 flex flex-col items-center text-center border-r border-gray-200">
            <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg ring-4 ring-white">
              <img
                src={lawyer.image}
                alt={lawyer.name}
                onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/300x300?text=Profile")}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-800">{lawyer.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{lawyer.qualification}</p>
            <div className="mt-3">
              <StarRating rating={lawyer.rating} />
            </div>

            <div className="mt-5 w-full space-y-3">
              <a
                href={`mailto:${lawyer.email}`}
                className="block w-full text-center px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
              >
                <Mail className="inline mr-2" size={16} /> Message
              </a>
              <a
                href={`tel:${lawyer.phone}`}
                className="block w-full text-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100"
              >
                <Phone className="inline mr-2" size={16} /> Call
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:w-2/3 p-8 space-y-8">
            {isEditing ? (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow"
                >
                  <CheckCircle size={18} /> Save Changes
                </button>
              </div>
            ) : (
              <>
                {/* About Section */}
                <h3 className="text-xl font-bold text-gray-800">About</h3>
                <p className="mt-3 text-gray-700 leading-relaxed">{lawyer.description}</p>

                {/* Testimonials */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6">Client Testimonials</h4>
                  <ul className="mt-3 space-y-3">
                    {lawyer.testimonials.map((t, idx) => (
                      <li key={idx} className="bg-gray-50 p-4 rounded-lg border">
                        <p className="text-sm text-gray-700">"{t.feedback}"</p>
                        <p className="text-xs text-gray-500 mt-1">- {t.client}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recent Cases */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6">Recent Cases</h4>
                  <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700">
                    {lawyer.recentCases.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Case Studies */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6">Case Studies</h4>
                  <ul className="mt-3 space-y-4">
                    {lawyer.caseStudies.map((caseItem, idx) => (
                      <li key={idx} className="bg-gray-50 p-4 rounded-lg border">
                        <h5 className="font-bold text-gray-800">{caseItem.title} ({caseItem.year})</h5>
                        <p className="text-sm text-gray-700 mt-1">{caseItem.description}</p>
                        <p className={`text-sm mt-1 font-semibold ${caseItem.outcome === 'Success' ? 'text-green-600' : 'text-yellow-600'}`}>Outcome: {caseItem.outcome}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Awards */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6">Awards & Recognitions</h4>
                  <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700">
                    {lawyer.awards.map((a, idx) => (
                      <li key={idx}>{a}</li>
                    ))}
                  </ul>
                </div>

                {/* Publications */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6">Publications</h4>
                  <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700">
                    {lawyer.publications.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
