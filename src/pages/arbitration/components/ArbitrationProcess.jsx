import React from "react";
import {
  FaFileAlt,
  FaUserTie,
  FaCalendarAlt,
  FaFolderOpen,
  FaVideo,
  FaGavel,
} from "react-icons/fa";
import { Link } from "react-router";

function ArbitrationProcess() {
  const steps = [
    {
      number: 1,
      icon: FaFileAlt,
      title: "Case Initiation",
      description:
        "Submit your case details and documents through our secure portal.",
      details: {
        title: "Case Submission & Agreement",
        description:
          "Complete the online submission form with details of your dispute. Both parties sign the arbitration agreement electronically.",
        tags: ["Online Forms", "E-Signature", "Document Upload"],
      },
    },
    {
      number: 2,
      icon: FaUserTie,
      title: "Arbitrator Selection",
      description:
        "Choose from our panel of qualified, experienced arbitrators.",
      details: {
        title: "Panel Selection & Appointment",
        description:
          "Review arbitrator profiles and select your preferred neutral. Our system facilitates the appointment process.",
        tags: ["Arbitrator Profiles", "Selection Tool", "Conflict Check"],
      },
    },
    {
      number: 3,
      icon: FaCalendarAlt,
      title: "Preliminary Hearing",
      description: "Establish procedures and timelines for your case.",
      details: {
        title: "Scheduling & Procedure Setting",
        description:
          "Participate in a virtual preliminary hearing to establish timelines, evidence submission procedures, and hearing dates.",
        tags: ["Video Conference", "Procedural Order", "Calendar Integration"],
      },
    },
    {
      number: 4,
      icon: FaFolderOpen,
      title: "Evidence Exchange",
      description: "Securely submit and review all case evidence online.",
      details: {
        title: "Document & Evidence Management",
        description:
          "Use our secure evidence portal to upload, organize, and exchange documents. All materials are timestamped and encrypted.",
        tags: ["Secure Upload", "Version Control", "Access Controls"],
      },
    },
    {
      number: 5,
      icon: FaVideo,
      title: "Virtual Hearing",
      description:
        "Participate in hearings from anywhere with our video platform.",
      details: {
        title: "Online Hearing Proceedings",
        description:
          "Conduct hearings through our secure video conferencing platform with features for presenting evidence, witness testimony, and legal arguments.",
        tags: ["Video Conferencing", "Screen Sharing", "Recording"],
      },
    },
    {
      number: 6,
      icon: FaGavel,
      title: "Award & Resolution",
      description: "Receive the arbitrator's binding decision electronically.",
      details: {
        title: "Final Decision & Enforcement",
        description:
          "The arbitrator issues a binding award through our platform. The award is electronically signed and enforceable in court.",
        tags: ["Digital Award", "E-Signature", "Enforcement Support"],
      },
    },
  ];

  return (
    <div className="bg-gray-50 font-sans">
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Resolve Your Dispute?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Start your online arbitration process today and experience
            efficient, professional dispute resolution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to={`/arbitration`}>
              <button className="bg-white text-blue-800 px-8 py-3 rounded-lg font-medium hover:bg-blue-100 transition">
                Begin Your Case
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              The Arbitration Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our streamlined 6-step process ensures your dispute is resolved
              efficiently and fairly.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.number}
                  className="flex flex-col md:flex-row items-center mb-16"
                >
                  <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                    <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-xs transition-transform duration-300 hover:-translate-y-1">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <IconComponent className="text-blue-700 text-xl" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-center">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="md:w-2/3 md:pl-12">
                    <h4 className="text-lg font-medium text-gray-800 mb-2">
                      {step.details.title}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {step.details.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step.details.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArbitrationProcess;
