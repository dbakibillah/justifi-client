import React from "react";
import { useLocation } from "react-router";
import { MdOutlineWork } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineLanguage } from "react-icons/md";

export default function MediatorDetails() {
  const location = useLocation();
  const mediator = location.state?.mediator;

  if (!mediator) {
    return <div>No mediator data found.</div>;
  }
  return (
    <div className="font-sans bg-white">
      {/* <!-- Main Content --> */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-5">
        {/* <!-- Left Column (Image + Contact Info) --> */}
        <div className="space-y-6">
          <img
            src={mediator.image}
            alt={mediator.name}
            className="rounded-lg shadow-md w-[400px] h-[400px] object-cover"
          />

          {/* <!-- Contact Info --> */}
          <div className="space-y-3 text-gray-700">
            <p className="flex  items-center gap-1">
              <strong>
                <FaLocationDot />
              </strong>{" "}
              {mediator.address}
            </p>
            <p className="flex  items-center gap-1">
              <strong>
                <MdOutlineLanguage />
              </strong>{" "}
              {mediator.languages.join(", ")}
            </p>
          </div>
        </div>

        {/* <!-- Right Column (Attorney Info) --> */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">{mediator.name}</h2>
          <p className="text-gray-600 flex items-center gap-1">
            <MdOutlineWork />
            {mediator.profession}
          </p>
          <p className="text-gray-600">{mediator.specialization.join(", ")}</p>

          {/* <!-- Biography --> */}
          <div>
            <h3 className="font-semibold text-lg mb-2 text-[#a58a51]">
              Biography
            </h3>
            <p className="text-gray-600">{mediator.description}</p>
          </div>

          {/* <!-- Education --> */}
          <div>
            <h3 className="font-semibold text-lg mb-2 text-[#a58a51]">
              Education
            </h3>
            <p className="text-gray-600">{mediator.qualification}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
