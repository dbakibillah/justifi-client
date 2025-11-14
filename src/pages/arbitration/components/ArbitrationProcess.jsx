import { Link } from "react-router";
import ArbitrationRules from "../ArbitrationRules";

function ArbitrationProcess() {
  

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

    <ArbitrationRules />
      
    </div>
  );
}

export default ArbitrationProcess;
