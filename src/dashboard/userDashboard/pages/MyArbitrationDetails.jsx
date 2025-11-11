import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  Briefcase,
  X,
  FileText,
  Calendar,
  DollarSign,
  Upload,
  Download,
} from "lucide-react";

const MyArbitrationDetails = () => {
  const [selectedArbitrator, setSelectedArbitrator] = useState(null);
  const [evidenceFiles, setEvidenceFiles] = useState([
    { name: "Contract_Agreement.pdf", link: "#" },
    { name: "Payment_Proof.jpg", link: "#" },
  ]);
  const [newEvidence, setNewEvidence] = useState(null);

  const handleEvidenceUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEvidenceFiles([...evidenceFiles, { name: file.name, link: "#" }]);
      setNewEvidence(null);
    }
  };

  const caseDetails = {
    id: "ARB-001",
    title: "Commercial Contract Dispute",
    status: "Ongoing",
    suitValue: "BDT 50,00,000",
    nature: "Breach of contract between ABC Corp and XYZ Ltd.",
    nextHearing: "December 10, 2025",
    totalSessions: 8,
    completed: 5,
    remaining: 3,
    description:
      "This arbitration involves a contract dispute regarding non-performance and delayed service delivery between ABC Corp and XYZ Ltd. The case is currently in the hearing phase.",
    arbitrators: [
      {
        name: "John Smith",
        role: "Chief Arbitrator",
        email: "johnsmith@example.com",
        phone: "+880 1711 223344",
        expertise: "Commercial & Civil Law",
        experience: "15 years",
        image:
          "https://images.unsplash.com/photo-1603415526960-f7e0328b3e4e?auto=format&fit=crop&w=500&q=80",
        bio: "John Smith has extensive experience in commercial arbitration and has resolved over 200 cases involving corporate contract disputes.",
      },
      {
        name: "Emily Johnson",
        role: "Co-Arbitrator",
        email: "emilyjohnson@example.com",
        phone: "+880 1911 334455",
        expertise: "Corporate Contracts",
        experience: "10 years",
        image:
          "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=500&q=80",
        bio: "Emily Johnson specializes in corporate and employment contract disputes and has served as a co-arbitrator in several international cases.",
      },
      {
        name: "Michael Brown",
        role: "Observer Arbitrator",
        email: "michaelbrown@example.com",
        phone: "+880 1811 556677",
        expertise: "International Arbitration",
        experience: "8 years",
        image:
          "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80",
        bio: "Michael Brown focuses on international commercial disputes and cross-border arbitration cases, with strong knowledge of contract law.",
      },
    ],
    hearings: [
      {
        id: 1,
        date: "2024-11-10T10:00",
        arbitrator1Notes:
          "Initial arguments presented by both parties. Need detailed contract timeline.",
        arbitrator2Notes:
          "Preliminary jurisdiction established. Parties agreed to arbitration.",
        arbitrator3Notes:
          "Evidence submitted. Require full payment record documentation.",
        result: "Adjourned for further document submission",
        documentsRequired:
          "Contract execution history, all payment proofs, and correspondence logs",
        meetLink: "https://meet.justifi.com/arb-001-session1",
        attendance: "All parties present",
      },
      {
        id: 2,
        date: "2024-12-08T11:00",
        arbitrator1Notes:
          "Financial assessment underway. Damages calculation reviewed.",
        arbitrator2Notes: "Expert witness testimony planned for next hearing.",
        arbitrator3Notes: "Settlement discussion initiated between parties.",
        result: "Rescheduled for expert review",
        documentsRequired: "Expert valuation report, financial audit data",
        meetLink: "https://meet.justifi.com/arb-001-session2",
        attendance: "All parties present",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Back Button */}
      <div className="flex items-center mb-6">
        <Link
          to="/user/arbitrations"
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Back to My Arbitrations
        </Link>
      </div>

      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-6 rounded-2xl shadow-md mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold">{caseDetails.title}</h1>
            <p className="text-sm opacity-80">Case ID: {caseDetails.id}</p>
          </div>
          <span className="px-4 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
            {caseDetails.status}
          </span>
        </div>

        {/* Quick Info */}
        <div className="grid md:grid-cols-3 gap-4 mt-6 text-sm">
          <InfoCard
            icon={<DollarSign />}
            label="Suit Value"
            value={caseDetails.suitValue}
          />
          <InfoCard
            icon={<FileText />}
            label="Nature of Dispute"
            value={caseDetails.nature}
          />
          <InfoCard
            icon={<Calendar />}
            label="Next Hearing"
            value={caseDetails.nextHearing}
          />
        </div>

        <div className="flex justify-around text-center mt-6 text-sm">
          <SessionInfo label="Total Sessions" value={caseDetails.totalSessions} />
          <SessionInfo
            label="Completed"
            value={caseDetails.completed}
            color="text-green-400"
          />
          <SessionInfo
            label="Remaining"
            value={caseDetails.remaining}
            color="text-red-400"
          />
        </div>
      </motion.div>

      {/* Case Description + Evidence Section */}
      <motion.div
        className="bg-white rounded-xl shadow-md p-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-xl font-bold mb-3 text-gray-900">
          Case Description
        </h2>
        <p className="text-gray-600 mb-6">{caseDetails.description}</p>

        {/* Evidence Section */}
        <div className="border-t pt-6 mt-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Submitted Evidence
          </h3>

          {evidenceFiles.length > 0 ? (
            <ul className="space-y-2">
              {evidenceFiles.map((file, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 text-sm font-medium">
                      {file.name}
                    </span>
                  </div>
                  <a
                    href={file.link}
                    download
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-semibold"
                  >
                    <Download className="w-4 h-4" /> Download
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm mb-3">
              No evidence submitted yet.
            </p>
          )}

          <div className="mt-4">
            <label className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800 font-medium">
              <Upload className="w-5 h-5" />
              <span>Upload New Evidence</span>
              <input
                type="file"
                onChange={handleEvidenceUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </motion.div>

      {/* Arbitrators Panel */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-blue-600 rounded-full mr-3"></div>
          <h2 className="text-2xl font-bold text-gray-900">
            Arbitrators Panel
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseDetails.arbitrators.map((arb, i) => (
            <motion.div
              key={i}
              className="border border-gray-100 rounded-xl p-4 bg-gray-50 hover:shadow-lg transition-all duration-200 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedArbitrator(arb)}
            >
              <img
                src={arb.image}
                alt={arb.name}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-center font-semibold text-gray-800 text-lg">
                {arb.name}
              </h3>
              <p className="text-center text-blue-600 text-sm">{arb.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hearing Schedule Section */}
      <motion.div
        className="bg-white rounded-xl shadow-md p-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          Hearing Schedule
        </h2>
        {(caseDetails?.hearings || []).length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Arb 1 Notes
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Arb 2 Notes
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Arb 3 Notes
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Result
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Documents
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                    Meet Link
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                    Attendance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {caseDetails.hearings.map((hearing, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {new Date(hearing.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(hearing.date).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 bg-blue-50 rounded-lg">
                      {hearing.arbitrator1Notes}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 bg-green-50 rounded-lg">
                      {hearing.arbitrator2Notes}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 bg-purple-50 rounded-lg">
                      {hearing.arbitrator3Notes}
                    </td>
                    <td className="px-6 py-4 text-sm text-yellow-800">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100">
                        {hearing.result}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {hearing.documentsRequired}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <a
                        href={hearing.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Join
                      </a>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {hearing.attendance}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-6">
            No hearings scheduled yet.
          </p>
        )}
      </motion.div>

      {/* Arbitrator Modal */}
      <AnimatePresence>
        {selectedArbitrator && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setSelectedArbitrator(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="text-center">
                <img
                  src={selectedArbitrator.image}
                  alt={selectedArbitrator.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedArbitrator.name}
                </h3>
                <p className="text-blue-600 font-medium mb-2">
                  {selectedArbitrator.role}
                </p>
                <p className="text-gray-600 mb-4">
                  {selectedArbitrator.bio}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* Helper Components */
const InfoCard = ({ icon, label, value }) => (
  <div className="bg-white/10 p-4 rounded-lg flex items-center gap-3 text-white">
    {icon}
    <div>
      <p className="text-gray-200">{label}</p>
      <p className="font-semibold text-white">{value}</p>
    </div>
  </div>
);

const SessionInfo = ({ label, value, color }) => (
  <div>
    <p className="text-gray-200">{label}</p>
    <p className={`font-semibold ${color || "text-white"}`}>{value}</p>
  </div>
);

export default MyArbitrationDetails;
