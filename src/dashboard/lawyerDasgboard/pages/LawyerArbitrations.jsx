import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  User,
  Scale,
  Gavel,
  CalendarDays,
  Activity,
} from "lucide-react";

const MyArbitrations = () => {
  const arbitrations = [
    {
      id: "ARB-001",
      title: "Commercial Contract Dispute",
      status: "ongoing",
      progress: 60,
      nextHearing: "2025-12-15",
      suitValue: "BDT 50,00,000",
      nature: "Breach of Contract",
      lawyer: "Adv. Mahmud Hasan",
      defended: "ABC Trading Ltd.",
      complainant: "Xpress Logistics Co.",
      createdAt: "2025-11-01",
      lastUpdate: "2025-11-08",
    },
    {
      id: "ARB-002",
      title: "Property Ownership Conflict",
      status: "pending",
      progress: 20,
      nextHearing: "2025-12-20",
      suitValue: "BDT 1,20,00,000",
      nature: "Property Dispute",
      lawyer: "Adv. Sarah Rahman",
      defended: "Mr. Rafiq Uddin",
      complainant: "Mr. Hasan Kabir",
      createdAt: "2025-11-05",
      lastUpdate: "2025-11-07",
    },
    {
      id: "ARB-003",
      title: "Business Partnership Dissolution",
      status: "completed",
      progress: 100,
      nextHearing: null,
      suitValue: "BDT 75,00,000",
      nature: "Partnership Dispute",
      lawyer: "Adv. Tanvir Alam",
      defended: "BlueTech Solutions",
      complainant: "NextEra IT Firm",
      createdAt: "2025-10-15",
      lastUpdate: "2025-10-25",
    },
    {
      id: "ARB-004",
      title: "Employment Termination Dispute",
      status: "cancelled",
      progress: 0,
      nextHearing: null,
      suitValue: "BDT 25,00,000",
      nature: "Employment Contract",
      lawyer: "Adv. Rafiq Chowdhury",
      defended: "Mr. Rahim Karim",
      complainant: "Global Textiles Ltd.",
      createdAt: "2025-11-10",
      lastUpdate: "2025-11-12",
    },
  ];

  const [filter, setFilter] = useState("all");

  const filteredArbitrations = useMemo(() => {
    if (filter === "all") return arbitrations;
    return arbitrations.filter((a) => a.status === filter);
  }, [filter]);

  const getStatusStyles = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "ongoing":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "completed":
        return "bg-green-50 border-green-200 text-green-800";
      case "cancelled":
        return "bg-red-50 border-red-200 text-red-800";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock size={14} />;
      case "ongoing":
        return <FileText size={14} />;
      case "completed":
        return <CheckCircle size={14} />;
      case "cancelled":
        return <XCircle size={14} />;
      default:
        return null;
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 30) return "bg-yellow-500";
    return "bg-red-400";
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          My Arbitrations
        </h1>
        <p className="text-gray-600 mt-2">
          Review your ongoing, completed, and pending arbitration cases with progress insights.
        </p>
      </div>

      {/* Filter */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-5 max-w-7xl mx-auto mb-8 flex flex-wrap gap-3">
        {["all", "pending", "ongoing", "completed", "cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === f
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArbitrations.map((arb, index) => (
          <motion.div
            key={arb.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link to={`/dashboard/my-arbitrations/${arb.id}`} state={{ arbitration: arb }}>
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all p-6 relative overflow-hidden group">
                {/* Accent bar */}
                <div
                  className={`absolute top-0 left-0 w-1 h-full ${
                    arb.status === "completed"
                      ? "bg-green-500"
                      : arb.status === "ongoing"
                      ? "bg-blue-500"
                      : arb.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                ></div>

                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${getStatusStyles(
                      arb.status
                    )}`}
                  >
                    {getStatusIcon(arb.status)}
                    <span className="capitalize text-sm">{arb.status}</span>
                  </div>
                  <span className="text-sm text-gray-400">{arb.id}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition">
                  {arb.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {arb.nature}
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Gavel size={15} className="text-gray-500" /> Lawyer:
                    </span>
                    <span className="font-medium text-gray-900">{arb.lawyer}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <User size={15} className="text-gray-500" /> Complainant:
                    </span>
                    <span>{arb.complainant}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Scale size={15} className="text-gray-500" /> Defended:
                    </span>
                    <span>{arb.defended}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Activity size={15} className="text-blue-500" /> Progress
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {arb.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${arb.progress}%` }}
                      transition={{ duration: 1 }}
                      className={`h-2 rounded-full ${getProgressColor(
                        arb.progress
                      )}`}
                    />
                  </div>
                </div>

                {/* Hearing / Timeline */}
                <div className="mt-5 border-t border-gray-100 pt-3 text-sm">
                  {arb.nextHearing ? (
                    <p className="text-gray-700 flex justify-between">
                      <span>Next Hearing:</span>
                      <span className="font-medium text-blue-600">
                        {new Date(arb.nextHearing).toLocaleDateString()}
                      </span>
                    </p>
                  ) : arb.status === "completed" ? (
                    <p className="text-green-600 font-medium">Case Closed ✅</p>
                  ) : arb.status === "cancelled" ? (
                    <p className="text-red-600 font-medium">Case Cancelled ❌</p>
                  ) : (
                    <p className="text-gray-500">No upcoming hearing scheduled</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    Last updated: {new Date(arb.lastUpdate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredArbitrations.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <div className="text-6xl mb-3">📂</div>
          <p className="text-lg font-semibold mb-1">No arbitration records</p>
          <p className="text-sm">Try adjusting your filter or check again later.</p>
        </div>
      )}
    </div>
  );
};

export default MyArbitrations;
