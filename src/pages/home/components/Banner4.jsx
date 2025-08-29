import { motion } from "framer-motion";

const Banner4 = () => {
  return (
    <section className="bg-[#f8f8f8] py-20 px-6 md:px-16 text-center overflow-hidden">
      <div className="max-w-2xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-800"
        >
          Subscribe to Our Newsletter
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 mt-3"
        >
          Stay updated with the latest case studies, legal insights, and expert
          advice from our attorneys. Enter your email below to join our mailing
          list.
        </motion.p>

        {/* Newsletter Form */}
        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <motion.input
            whileFocus={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            type="email"
            placeholder="Enter your email"
            className="w-full sm:flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5a5a2e]"
            required
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-[#5a5a2e] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-[#444422] transition w-full sm:w-auto"
          >
            Subscribe
          </motion.button>
        </motion.form>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xs text-gray-500 mt-4"
        >
          We respect your privacy. Unsubscribe anytime.
        </motion.p>
      </div>
    </section>
  );
};

export default Banner4;
