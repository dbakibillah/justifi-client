import React from "react";
import { useLocation } from "react-router";
import { MdOutlineLanguage } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

export default function ArbitratorDetails() {
  const location = useLocation();
  const arbitrator = location.state?.arbitrator;

  if (!arbitrator) {
    return <div>No arbitrator data found.</div>;
  }
  return (
    <div className="font-sans bg-white">
      {/* <!-- Main Content --> */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-5">
        {/* <!-- Left Column (Image + Contact Info) --> */}
        <div className="space-y-6">
          <img
            src={arbitrator.image}
            alt={arbitrator.name}
            className="rounded-lg shadow-md w-[400px] h-[400px] object-cover"
          />

          {/* <!-- Contact Info --> */}
          <div className="space-y-3 text-gray-700">
            <p className="flex  items-center gap-1">
              <strong>
                <FaLocationDot />
              </strong>{" "}
              {arbitrator.address}
            </p>
            <p className="flex  items-center gap-1">
              <strong>
                <MdOutlineLanguage />
              </strong>{" "}
              {arbitrator.languages.join(", ")}
            </p>
          </div>
        </div>

        {/* <!-- Right Column (Attorney Info) --> */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">{arbitrator.name}</h2>

          <p className="text-gray-600">
            {arbitrator.specialization.join(", ")}
          </p>

          {/* <!-- Biography --> */}
          <div>
            <h3 className="font-semibold text-lg mb-2 text-[#a58a51]">
              Biography
            </h3>
            <p className="text-gray-600">{arbitrator.description}</p>
          </div>

          {/* <!-- Education --> */}
          <div>
            <h3 className="font-semibold text-lg mb-2 text-[#a58a51]">
              Education
            </h3>
            <p className="text-gray-600">{arbitrator.qualification}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
