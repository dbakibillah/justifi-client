// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { FiCheckCircle, FiLock } from "react-icons/fi";

const Banner4 = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
        }
    };

    return (
        <section className="relative py-24 px-6 md:px-16 text-center overflow-hidden">
            <div className="max-w-2xl mx-auto relative">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold text-gray-800 font-serif"
                >
                    Stay Informed with Our Newsletter
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-gray-600 mt-4 max-w-md mx-auto leading-relaxed"
                >
                    Join our community of legal professionals and receive the
                    latest case studies, legal insights, and expert advice
                    directly to your inbox.
                </motion.p>

                {submitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-8 p-6 bg-white rounded-xl shadow-lg border border-green-100"
                    >
                        <FiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800">
                            Thank You for Subscribing!
                        </h3>
                        <p className="text-gray-600 mt-2">
                            We've sent a confirmation email to{" "}
                            <strong>{email}</strong>
                        </p>
                    </motion.div>
                ) : (
                    <>
                        <motion.form
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            onSubmit={handleSubmit}
                            className="mt-8 flex flex-col sm:flex-row items-center gap-4 bg-white p-1 rounded-xl shadow-lg"
                        >
                            <motion.input
                                transition={{ type: "spring", stiffness: 200 }}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="w-full sm:flex-1 px-6 py-4 rounded-lg border-0 focus:outline-none focus:ring-0"
                                required
                            />
                            <motion.button
                                whileHover={{
                                    scale: 1.02,
                                }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="bg-gradient-to-r from-[#5a5a2e] to-[#444422] text-white px-8 py-4 rounded-xl font-semibold shadow-md transition-all w-full sm:w-auto cursor-pointer"
                            >
                                Subscribe Now
                            </motion.button>
                        </motion.form>

                        {/* Disclaimer */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="text-xs text-gray-500 mt-6 flex items-center justify-center gap-2"
                        >
                            <FiLock className="w-4 h-4" />
                            We respect your privacy. Unsubscribe anytime.
                        </motion.p>
                    </>
                )}
            </div>
        </section>
    );
};

export default Banner4;
