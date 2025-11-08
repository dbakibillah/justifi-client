import React, { useEffect } from "react";
import { FaMoneyBillWave, FaBan, FaExclamationCircle, FaHandshake, FaHeadset, FaClock, FaCommentAlt, FaUserShield, FaInfoCircle, FaExclamationTriangle, FaGavel, FaFileSignature, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ArbitrationRules = () => {
  useEffect(() => {
    const stepNumbers = document.querySelectorAll(".step-number");
    stepNumbers.forEach((step, index) => {
      setTimeout(() => {
        step.classList.add("scale-100");
        step.classList.remove("scale-0");
      }, 300 * index);
    });
  }, []);

  const handleAccept = () => {
    alert(
      "Thank you for accepting the Arbitration Terms and Conditions. You may now proceed with your request."
    );
  };

  return (
    <div className="font-inter bg-gray-50 text-gray-800 min-h-screen p-6 space-y-12">
      {/* Intro */}
      <section>
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Arbitration Agreement
          </h2>
          <p className="text-gray-600 mb-6">
            By initiating an Arbitration process on the JustiFi platform, you
            ("the User" or "the Party") agree to be legally bound by the
            following terms, rules, and procedures.
          </p>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500 p-5 rounded-lg">
            <div className="flex items-start">
              <FaExclamationCircle className="text-blue-500 text-xl mt-1 mr-3" />
              <div>
                <h3 className="font-semibold text-gray-800">Important Notice</h3>
                <p className="text-gray-700 mt-1">
                  These terms constitute a legally binding agreement. Please
                  read them carefully before proceeding with arbitration
                  services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section>
        <h2 className="relative pl-4 text-xl font-bold text-gray-800 mb-6">
          Article 1: Arbitration Request and Fees
          <span className="absolute left-0 top-2 w-1 h-6 bg-blue-500 rounded"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500 hover:shadow-lg transition-all">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaMoneyBillWave className="text-blue-500 text-xl" />
              </div>
              <h3 className="ml-4 text-lg font-semibold text-gray-800">
                Request Fee
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              A non-refundable Arbitration Request Fee of{" "}
              <span className="font-bold text-blue-600">BDT 5,000</span> must be
              paid at the time of submitting the arbitration request.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-red-500 hover:shadow-lg transition-all">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FaBan className="text-red-500 text-xl" />
              </div>
              <h3 className="ml-4 text-lg font-semibold text-gray-800">
                Non-Refundable Policy
              </h3>
            </div>
            <p className="text-gray-600">
              This fee is for administrative costs and is{" "}
              <span className="font-bold text-red-600">non-refundable</span>{" "}
              under any circumstances, including if arbitration does not proceed
              or if a settlement is reached early.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section>
        <h2 className="relative pl-4 text-xl font-bold text-gray-800 mb-6">
          Arbitration Process
          <span className="absolute left-0 top-2 w-1 h-6 bg-blue-500 rounded"></span>
        </h2>

        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <div className="space-y-8">
            {[
              {
                title: "Payment & Submission",
                desc: "Pay the BDT 5,000 request fee while submitting your arbitration request through our platform.",
              },
              {
                title: "Agreement Session",
                desc: "We will contact all parties to schedule an online meeting where we'll discuss and confirm:",
                list: [
                  "Total arbitration cost (negotiable)",
                  "Number of prospective sessions",
                  "Selection of arbitrators from our panel",
                  "Session duration and timelines",
                  "Award compliance period",
                ],
                extra: "Parties will provide digital signatures during this session.",
              },
              {
                title: "Formal Agreement",
                desc: "After the session, we'll create a formal arbitration agreement and send it to all parties via email.",
              },
              {
                title: "Arbitration Sessions",
                desc: "Sessions will proceed according to the agreed procedure and timeline.",
              },
              {
                title: "Final Verdict & Award",
                desc: "After the final session, the arbitrator will issue a binding award that is enforceable by law.",
              },
            ].map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row">
                <div className="step-number flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full font-semibold mr-3 transition-transform duration-500 scale-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{step.desc}</p>
                  {step.list && (
                    <ul className="list-disc pl-5 text-gray-600 space-y-1 mb-2">
                      {step.list.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {step.extra && (
                    <p className="text-gray-600 mt-1">{step.extra}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Termination */}
      <section>
        <h2 className="relative pl-4 text-xl font-bold text-gray-800 mb-6">
          Article 3: Process Termination
          <span className="absolute left-0 top-2 w-1 h-6 bg-blue-500 rounded"></span>
        </h2>

        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start">
            <div className="md:w-1/4 mb-6 flex justify-center">
              <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center">
                <FaHandshake className="text-purple-500 text-4xl" />
              </div>
            </div>
            <div className="md:w-3/4 md:pl-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Mutual Termination Option
              </h3>
              <p className="text-gray-600 mb-4">
                If after some sessions, parties mutually decide not to continue,
                they can terminate further sessions by informing JustiFi.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-700 mb-2">
                    <FaCheckCircle className="inline mr-2" />
                    Cost Responsibility
                  </h4>
                  <p className="text-purple-600 text-sm">
                    Parties will pay only for the sessions completed up to the
                    termination point.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-700 mb-2">
                    <FaFileSignature className="inline mr-2" />
                    Termination Processing Cost
                  </h4>
                  <p className="text-purple-600 text-sm">
                    A lump-sum amount will be added to cover administrative
                    costs associated with process termination.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Distribution */}
      <section>
        <h2 className="relative pl-4 text-xl font-bold text-gray-800 mb-6">
          Article 4: Cost Distribution
          <span className="absolute left-0 top-2 w-1 h-6 bg-blue-500 rounded"></span>
        </h2>
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Equal Sharing Principle
          </h3>
          <p className="text-gray-600 mb-4">
            The total cost of arbitration, as finalized during the Agreement
            Session, shall be distributed{" "}
            <span className="font-bold text-blue-600">equally among all parties</span>.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-blue-700">
              <FaInfoCircle className="inline mr-2" />
              Unless otherwise unanimously agreed upon in writing by all
              parties and recorded in the Arbitration Agreement.
            </p>
          </div>
        </div>
      </section>

      {/* Issue Resolution */}
      <section>
        <h2 className="relative pl-4 text-xl font-bold text-gray-800 mb-6">
          Article 5: Issue Resolution
          <span className="absolute left-0 top-2 w-1 h-6 bg-blue-500 rounded"></span>
        </h2>
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Our Commitment to You
          </h3>
          <p className="text-gray-600 mb-4">
            JustiFi always aims to ensure your legal journey is fair and smooth.
            If you face any issue during the process, we're here to help.
          </p>

          <div className="bg-green-50 p-5 rounded-lg border border-green-200 mb-6">
            <div className="flex items-start">
              <FaClock className="text-green-500 text-xl mt-1 mr-3" />
              <div>
                <h4 className="font-semibold text-green-700 mb-2">
                  3-Day Issue Resolution Window
                </h4>
                <p className="text-green-600">
                  If you inform us about any issues within 3 days, JustiFi will
                  evaluate and resolve the concern promptly.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-700 mb-2">
                <FaCommentAlt className="inline mr-2" /> Prompt Communication
              </h4>
              <p className="text-blue-600 text-sm">
                We encourage you to communicate concerns immediately so we can
                address them quickly.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-700 mb-2">
                <FaUserShield className="inline mr-2" /> Fair Assessment
              </h4>
              <p className="text-blue-600 text-sm">
                JustiFi will fairly assess all reported issues to ensure a
                smooth arbitration process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Conduct */}
      <section>
        <h2 className="relative pl-4 text-xl font-bold text-gray-800 mb-6">
          Article 6: User Conduct and Prohibited Activities
          <span className="absolute left-0 top-2 w-1 h-6 bg-blue-500 rounded"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-500 hover:shadow-lg transition-all">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FaHandshake className="text-green-500 text-xl" />
              </div>
              <h3 className="ml-4 text-lg font-semibold text-gray-800">
                Professional Demeanor
              </h3>
            </div>
            <p className="text-gray-600">
              All parties must act respectfully and professionally toward the
              Arbitrator, JustiFi staff, and other parties throughout the
              process.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-red-500 hover:shadow-lg transition-all">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FaExclamationTriangle className="text-red-500 text-xl" />
              </div>
              <h3 className="ml-4 text-lg font-semibold text-gray-800">
                Prohibited Activities
              </h3>
            </div>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Breaching confidentiality of the proceedings</li>
              <li>Recording sessions without permission</li>
              <li>Engaging in harassment, intimidation, or deceit</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-start">
            <FaGavel className="text-yellow-500 text-xl mt-1 mr-3" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Consequences of Violations
              </h3>
              <p className="text-gray-700">
                Any breach of these conduct rules may lead to immediate
                termination of the process by JustiFi and may result in legal
                action for damages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Acceptance */}
      <section>
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 text-center">
          <FaFileSignature className="text-4xl text-blue-500 mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Acknowledgment & Acceptance
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            By paying the Arbitration Request Fee, I acknowledge that I have
            read, understood, and voluntarily agree to be bound by all the terms
            and conditions outlined in this document.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button
              onClick={handleAccept}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center"
            >
              <FaCheckCircle className="mr-2" /> I Accept the Terms
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center">
              <FaTimesCircle className="mr-2" /> Decline
            </button>
          </div>

          <p className="text-gray-500 text-sm mt-4">
            By clicking "I Accept", you are electronically signing this
            agreement.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ArbitrationRules;
