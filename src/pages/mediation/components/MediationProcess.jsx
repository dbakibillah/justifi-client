// MediationProcess.jsx
// Fixed: FaGavel imported | No errors | Full Terms instead of steps

import React from "react";
import {
  FaFileImport,
  FaBan,
  FaHandPaper,
  FaMoneyBillWave,
  FaUserClock,
  FaVideo,
  FaComments,
  FaUserTie,
  FaBalanceScale,
  FaHandshake,
  FaShieldAlt,
  FaLock,
  FaExclamationCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaExclamationTriangle,
  FaPlay,
  FaLightbulb,
  FaGavel, // FIXED: Added FaGavel
} from "react-icons/fa";
import { Link } from "react-router-dom";

function MediationProcess() {
  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Resolve Your Dispute Using Mediation?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Start your online mediation process today and experience efficient,
            professional dispute resolution.
          </p>
          <div className="flex justify-center">
            <Link to="/mediation">
              <button className="bg-white text-blue-800 px-8 py-3 rounded-lg font-medium hover:bg-blue-100 transition transform hover:scale-105 shadow-lg">
                Begin Mediation Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Full Terms & Conditions (Replaces 4 Steps) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Mediation Agreement</h2>
            <p className="text-gray-600 mb-6">
              By initiating a Mediation process on the JustiFi platform, you ("the User" or "the Party") 
              agree to be legally bound by the following terms, rules, and procedures.
            </p>
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-5 rounded-xl border-l-4 border-emerald-500">
              <div className="flex items-start">
                <FaExclamationCircle className="text-emerald-500 text-xl mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Important Notice</h3>
                  <p className="text-gray-700 mt-1">
                    These terms constitute a legally binding agreement. Please read them carefully before proceeding with mediation services.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Article 1 */}
          <div className="mb-12">
            <h2 className="relative text-xl font-bold text-gray-800 mb-6 pl-4">
              Article 1: Mediation Request Process
              <span className="absolute left-0 top-2 w-1 h-6 bg-emerald-500 rounded-full"></span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-emerald-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <FaFileImport className="text-emerald-500 text-xl" />
                  </div>
                  <h3 className="ml-4 text-lg font-semibold text-gray-800">Request Submission</h3>
                </div>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Submit mediation request through JustiFi platform</li>
                  <li>Provide complete information of all involved parties</li>
                  <li>Submit comprehensive dispute description</li>
                  <li>Pay non-refundable request fee</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-red-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <FaBan className="text-red-500 text-xl" />
                  </div>
                  <h3 className="ml-4 text-lg font-semibold text-gray-800">Request Fee Policy</h3>
                </div>
                <div className="flex items-center mb-3">
                  <span className="bg-gradient-to-r from-emerald-500 to-green-400 px-4 py-2 rounded-full font-bold text-lg text-white">
                    BDT 1,000
                  </span>
                  <span className="ml-3 text-red-600 font-semibold">Non-refundable</span>
                </div>
                <p className="text-gray-600">
                  Covers initial administrative costs and case assessment. Non-refundable under any circumstances once paid.
                </p>
              </div>
            </div>
          </div>

          {/* Article 3 */}
          <div className="mb-12">
            <h2 className="relative text-xl font-bold text-gray-800 mb-6 pl-4">
              Article 3: Process Termination Policy
              <span className="absolute left-0 top-2 w-1 h-6 bg-emerald-500 rounded-full"></span>
            </h2>
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 md:p-8 border-2 border-amber-400">
              <div className="flex items-center mb-4">
                <FaHandPaper className="text-amber-600 text-2xl mr-3" />
                <h3 className="text-xl font-bold text-amber-800">Voluntary Termination Rights</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-5 border border-amber-300">
                  <div className="flex items-center mb-3">
                    <FaTimesCircle className="text-red-500 mr-3" />
                    <h4 className="font-semibold text-gray-800">Immediate Termination</h4>
                  </div>
                  <p className="text-gray-700">
                    Any party can terminate the mediation process immediately after any completed session by providing written notice to JustiFi and all other parties.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-amber-300">
                  <div className="flex items-center mb-3">
                    <FaMoneyBillWave className="text-green-500 mr-3" />
                    <h4 className="font-semibold text-gray-800">Financial Responsibility</h4>
                  </div>
                  <p className="text-gray-700">
                    Parties will only bear costs for sessions completed plus a <span className="font-bold">BDT 1,000 administrative fee</span> for process termination.
                  </p>
                </div>
              </div>
              <div className="mt-6 bg-amber-100 border border-amber-400 rounded-xl p-4">
                <div className="flex items-start">
                  <FaInfoCircle className="text-amber-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800">Termination Example</h4>
                    <p className="text-amber-700 text-sm mt-1">
                      If parties complete 2 sessions and decide to terminate, they will pay for 2 completed sessions + BDT 1,000 termination fee. No charges for future sessions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Article 5 */}
          <div className="mb-12">
            <h2 className="relative text-xl font-bold text-gray-800 mb-6 pl-4">
              Article 5: Mediation Session Procedure
              <span className="absolute left-0 top-2 w-1 h-6 bg-emerald-500 rounded-full"></span>
            </h2>
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-bold mr-3">
                      5.1
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Session Requirements</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <FaUserClock className="text-blue-500 text-xl mr-4 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Punctual Attendance</h4>
                        <p className="text-gray-600 text-sm mt-1">All parties must attend sessions on time as scheduled</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <FaVideo className="text-blue-500 text-xl mr-4 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Online Platform</h4>
                        <p className="text-gray-600 text-sm mt-1">Sessions conducted via secure online platform</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <FaComments className="text-blue-500 text-xl mr-4 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Active Participation</h4>
                        <p className="text-gray-600 text-sm mt-1">Parties must actively engage in good faith discussions</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-6">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-bold mr-3">
                      5.2
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Mediator's Role</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                      <FaUserTie className="text-emerald-500 text-xl mr-4 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Process Facilitation</h4>
                        <p className="text-gray-600 text-sm mt-1">Mediator guides the discussion and maintains process structure</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                      <FaBalanceScale className="text-emerald-500 text-xl mr-4 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Conflict Resolution</h4>
                        <p className="text-gray-600 text-sm mt-1">Mediator works to identify issues and explore resolution options</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                      <FaHandshake className="text-emerald-500 text-xl mr-4 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Settlement Assistance</h4>
                        <p className="text-gray-600 text-sm mt-1">Mediator helps parties reach mutually acceptable settlement</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 border border-emerald-200">
                <h4 className="font-bold text-gray-800 text-lg mb-4 text-center">Mediation Process Flow</h4>
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <FaPlay className="text-white" />
                    </div>
                    <p className="text-sm font-semibold">Session Start</p>
                  </div>
                  <div className="hidden md:block flex-1 mx-2"><div className="h-0.5 bg-gray-300 w-full"></div></div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <FaComments className="text-white" />
                    </div>
                    <p className="text-sm font-semibold">Discussion</p>
                  </div>
                  <div className="hidden md:block flex-1 mx-2"><div className="h-0.5 bg-gray-300 w-full"></div></div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <FaLightbulb className="text-white" />
                    </div>
                    <p className="text-sm font-semibold">Solution Exploration</p>
                  </div>
                  <div className="hidden md:block flex-1 mx-2"><div className="h-0.5 bg-gray-300 w-full"></div></div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <FaHandshake className="text-white" />
                    </div>
                    <p className="text-sm font-semibold">Settlement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Article 4 */}
          <div className="mb-12">
            <h2 className="relative text-xl font-bold text-gray-800 mb-6 pl-4">
              Article 4: Cost Distribution
              <span className="absolute left-0 top-2 w-1 h-6 bg-emerald-500 rounded-full"></span>
            </h2>
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-2/5 mb-6 lg:mb-0 flex justify-center">
                  <div className="relative w-64 h-64">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-emerald-600">Equal</div>
                        <div className="text-lg font-semibold text-gray-700">Sharing</div>
                        <div className="text-sm text-gray-500 mt-2">Among All Parties</div>
                      </div>
                    </div>
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#d1fae5" strokeWidth="8" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#10b981" strokeWidth="8" strokeDasharray="70.6858 70.6858" strokeDashoffset="0" transform="rotate(-90 50 50)" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#34d399" strokeWidth="8" strokeDasharray="70.6858 70.6858" strokeDashoffset="-70.6858" transform="rotate(-90 50 50)" />
                    </svg>
                  </div>
                </div>
                <div className="lg:w-3/5 lg:pl-8">
                  <div className="flex items-center mb-6">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-bold mr-3">
                      4.1
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Equal Cost Sharing</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    All mediation costs shall be divided <span className="font-bold text-emerald-600">equally among all parties</span>. 
                    Each party bears an equal share of total mediation fees including mediator fees, administrative charges, and platform usage fees.
                  </p>
                  <div className="flex items-center mb-6">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-bold mr-3">
                      4.2
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Payment Responsibility</h3>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-start">
                      <FaExclamationTriangle className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-red-700 font-semibold">Joint and Several Responsibility</p>
                        <p className="text-red-600 text-sm mt-1">
                          Failure of one party to pay does not relieve other parties of their payment obligations. Services may be withheld until full payment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Article 7 */}
          <div className="mb-12">
            <h2 className="relative text-xl font-bold text-gray-800 mb-6 pl-4">
              Article 7: Confidentiality
              <span className="absolute left-0 top-2 w-1 h-6 bg-emerald-500 rounded-full"></span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-purple-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FaShieldAlt className="text-purple-500 text-xl" />
                  </div>
                  <h3 className="ml-4 text-lg font-semibold text-gray-800">Strict Confidentiality</h3>
                </div>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>All mediation proceedings are confidential</li>
                  <li>Documents, discussions, and offers remain private</li>
                  <li>No disclosure to third parties without written consent</li>
                  <li>All parties sign confidentiality agreement</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-blue-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FaGavel className="text-blue-500 text-xl" /> {/* Now works! */}
                  </div>
                  <h3 className="ml-4 text-lg font-semibold text-gray-800">Legal Protection</h3>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-xl text-white text-center mb-3">
                  <FaLock className="text-2xl mb-2 mx-auto" />
                  <p className="font-semibold">Privileged Communications</p>
                </div>
                <p className="text-gray-600">
                  Mediation communications cannot be used as evidence in legal proceedings and are legally protected.
                </p>
              </div>
            </div>
          </div>

          {/* Acknowledgment (No Button) */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Acknowledgment</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              By clicking "Begin Mediation Now", you acknowledge and agree to all terms and conditions outlined in this document.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <FaMoneyBillWave className="text-emerald-500 text-xl mb-2 mx-auto" />
                <p className="text-sm text-gray-700">Pay BDT 1,000 request fee</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <svg className="w-6 h-6 text-emerald-500 mb-2 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <p className="text-sm text-gray-700">Bear equal share of costs</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <FaHandshake className="text-emerald-500 text-xl mb-2 mx-auto" />
                <p className="text-sm text-gray-700">Participate in good faith</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <FaLock className="text-emerald-500 text-xl mb-2 mx-auto" />
                <p className="text-sm text-gray-700">Maintain confidentiality</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Proceeding constitutes your legal electronic agreement
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MediationProcess;