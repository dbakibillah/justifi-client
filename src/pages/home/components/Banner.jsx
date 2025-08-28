const Banner = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-[#1a1a1a] text-white py-20 px-8 grid md:grid-cols-2 items-center gap-10">
        {/* Left Side - Text */}
        <div className="container mx-auto text-center md:text-left">
          <h2 className="text-4xl font-bold leading-snug">
            Our Attorneys Always Provide <br /> The Excellent Service
          </h2>
          <p className="mt-5 text-gray-300 max-w-lg">
            Teams of Intelligent & Professional Attorneys of Justifi are always prepared 
            to make you triumph. We always try our best to make our clients happy.
          </p>
          <button className="mt-6 bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl">
            Free Consultation
          </button>
        </div>

        {/* Right Side - Image */}
        <div className="flex justify-center">
          <img
            src="https://i.ibb.co.com/fzC4pYdY/Lawyer-Png-Images-Free-Download-on-Freepik-removebg-preview.png"
            alt="Attorney"
            className="w-full max-w-md lg:max-w-lg h-auto object-contain"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-10 grid grid-cols-2 md:grid-cols-4 text-center shadow-md">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">18</h3>
          <p className="text-gray-600">Attorneys</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">99%</h3>
          <p className="text-gray-600">Cases Won</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">100%</h3>
          <p className="text-gray-600">Legal Way</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">10K</h3>
          <p className="text-gray-600">Happy Clients</p>
        </div>
      </section>

     
    </div>
  );
};

export default Banner;
