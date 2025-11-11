import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaMoneyBillWave,
  FaBan,
  FaExclamationCircle,
  FaHandshake,
  FaClock,
  FaCommentAlt,
  FaUserShield,
  FaInfoCircle,
  FaExclamationTriangle,
  FaGavel,
  FaFileSignature,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ArbitrationRules = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleAccept = () => {
    alert(
      "✅ You have accepted the Arbitration Terms and Conditions. You may proceed."
    );
  };

  return (
    <div className="font-inter bg-gradient-to-br from-gray-100 via-white to-gray-100 text-gray-800 min-h-screen py-12 px-6">
      <motion.div
        className="max-w-7xl mx-auto space-y-14"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        {/* Header */}
        <motion.header
          variants={fadeUp}
          className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-3xl p-10 shadow-lg"
        >
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Arbitration Agreement
              </h1>
              <p className="text-gray-700 mt-4 text-lg leading-relaxed">
                By initiating an Arbitration process on the <b>JustiFi</b>{" "}
                platform, you ("the User" or "the Party") agree to be legally
                bound by the following terms, rules, and procedures.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-blue-200 to-blue-50 border-l-6 border-blue-600 p-6 rounded-2xl flex items-start gap-4"
            >
              <FaExclamationCircle className="text-blue-600 text-4xl mt-1" />
              <div>
                <p className="font-semibold text-gray-900 text-lg">
                  Important Notice
                </p>
                <p className="text-gray-700 text-sm mt-1 leading-snug">
                  These terms are legally binding. Please read them carefully
                  before proceeding.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.header>

        {/* Article 1 */}
        <ArticleSection title="Article 1: Arbitration Request and Fees">
          <div className="grid sm:grid-cols-2 gap-8">
            <InfoCard
              Icon={FaMoneyBillWave}
              title="Request Fee"
              desc="A non-refundable Arbitration Request Fee of BDT 5,000 must be paid at the time of submitting the arbitration request."
              borderColor="blue"
              gradient="from-blue-50 to-blue-100"
            />
            <InfoCard
              Icon={FaBan}
              title="Non-Refundable Policy"
              desc="This fee is administrative and non-refundable under any circumstances, even if arbitration does not proceed."
              borderColor="red"
              gradient="from-red-50 to-red-100"
            />
          </div>
        </ArticleSection>

        {/* Process Timeline */}
        <ArticleSection title="Arbitration Process">
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-8 grid gap-10 md:grid-cols-2">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border-l-6 border-blue-500 shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="text-blue-600 font-bold text-2xl mt-1">
                    {idx + 1}.
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-xl">
                      {step.title}
                    </h4>
                    <p className="text-gray-700 mt-1 text-base leading-relaxed">
                      {step.desc}
                    </p>
                    {step.list && (
                      <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-1 text-sm">
                        {step.list.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ArticleSection>

        {/* Termination */}
        <ArticleSection title="Article 3: Process Termination">
          <div className="grid md:grid-cols-2 gap-8">
            <InfoCard
              Icon={FaHandshake}
              title="Mutual Termination"
              desc="Parties may mutually decide to end arbitration early by notifying JustiFi. Only completed sessions will be charged."
              borderColor="purple"
              gradient="from-purple-50 to-purple-100"
            />
            <InfoCard
              Icon={FaFileSignature}
              title="Administrative Cost"
              desc="A fixed administrative cost applies to process termination for logistical handling."
              borderColor="purple"
              gradient="from-purple-50 to-purple-100"
            />
          </div>
        </ArticleSection>

        {/* Issue Resolution */}
        <ArticleSection title="Article 5: Issue Resolution">
          <div className="grid md:grid-cols-2 gap-8">
            <InfoCard
              Icon={FaClock}
              title="3-Day Resolution Window"
              desc="Report an issue within 3 days and JustiFi will resolve it promptly."
              borderColor="green"
              gradient="from-green-50 to-green-100"
            />
            <InfoCard
              Icon={FaUserShield}
              title="Fair & Prompt Assessment"
              desc="All issues are fairly assessed and handled promptly to ensure smooth arbitration."
              borderColor="green"
              gradient="from-green-50 to-green-100"
            />
          </div>
        </ArticleSection>

        {/* Conduct */}
        <ArticleSection title="Article 6: User Conduct & Prohibited Activities">
          <div className="grid md:grid-cols-3 gap-8">
            <InfoCard
              Icon={FaHandshake}
              title="Professional Demeanor"
              desc="All parties must act respectfully toward arbitrators, staff, and other parties."
              borderColor="green"
              gradient="from-green-50 to-green-100"
            />
            <InfoCard
              Icon={FaExclamationTriangle}
              title="Prohibited Activities"
              desc="No recording sessions without consent, no harassment, and no breach of confidentiality."
              borderColor="red"
              gradient="from-red-50 to-red-100"
            />
            <InfoCard
              Icon={FaGavel}
              title="Consequences"
              desc="Violations may lead to process termination or legal action by JustiFi."
              borderColor="yellow"
              gradient="from-yellow-50 to-yellow-100"
            />
          </div>
        </ArticleSection>

        {/* Acceptance */}
        <motion.section
          variants={fadeUp}
          className="bg-gradient-to-br from-blue-50 to-white border border-gray-200 rounded-3xl shadow-lg p-12 text-center"
        >
          <FaFileSignature className="text-5xl text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Acknowledgment & Acceptance
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-8 text-lg leading-relaxed">
            By paying the Arbitration Request Fee, I acknowledge that I have read, understood, and voluntarily agree to the terms and conditions of this agreement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAccept}
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg text-lg"
            >
              <FaCheckCircle /> I Accept the Terms
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#DC2626" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gray-100 hover:text-white text-gray-800 px-8 py-4 rounded-xl font-semibold shadow-lg text-lg"
            >
              <FaTimesCircle /> Decline
            </motion.button>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Clicking “Accept” constitutes an electronic signature.
          </p>
        </motion.section>
      </motion.div>
    </div>
  );
};

/* ====== REUSABLE COMPONENTS ====== */
function ArticleSection({ title, children }) {
  return (
    <section className="space-y-6">
      <h3 className="text-3xl font-semibold text-gray-900 border-l-6 border-blue-600 pl-6 py-1">
        {title}
      </h3>
      {children}
    </section>
  );
}

function InfoCard({ Icon, title, desc, borderColor = "blue", gradient }) {
  const borderMap = {
    blue: "border-blue-500",
    red: "border-red-500",
    purple: "border-purple-500",
    green: "border-green-500",
    yellow: "border-yellow-500",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`bg-gradient-to-br ${gradient} border-t-6 ${borderMap[borderColor]} p-6 rounded-3xl shadow-lg flex items-start gap-5`}
    >
      <div className="text-3xl text-gray-700 mt-1">
        <Icon />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 text-xl">{title}</h4>
        <p className="text-gray-700 text-base mt-2 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ====== PROCESS STEPS ====== */
const processSteps = [
  {
    title: "Payment & Submission",
    desc: "Pay the BDT 5,000 request fee while submitting your arbitration request.",
  },
  {
    title: "Agreement Session",
    desc: "We schedule a meeting to discuss:",
    list: [
      "Total arbitration cost",
      "Number of sessions",
      "Arbitrator selection",
      "Session timeline",
      "Award compliance period",
    ],
  },
  {
    title: "Formal Agreement",
    desc: "A formal agreement will be sent via email for confirmation.",
  },
  {
    title: "Arbitration Sessions",
    desc: "Sessions proceed as per the agreed timeline and procedure.",
  },
  {
    title: "Final Verdict & Award",
    desc: "The arbitrator issues a binding legal award after final session.",
  },
];

export default ArbitrationRules;
