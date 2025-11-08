import React from "react";
import { useLocation } from "react-router";
import {
  FaLandmark,
  FaGavel,
  FaExclamationTriangle,
  FaLightbulb,
  FaQuoteLeft,
} from "react-icons/fa";

export default function BlogDetails() {
  const location = useLocation();
  const blog = location.state?.blog;

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            No blog data found
          </h2>
          <p className="text-gray-500">
            Please go back and select a blog to read.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-inter bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto px-6 py-10 max-w-6xl">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#123154] to-[#2d5a8c] text-white rounded-2xl shadow-elegant p-10 mb-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {blog.title}
              </h1>
              <p className="text-xl max-w-2xl">{blog.subtitle}</p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/20 rounded-2xl blur-lg"></div>
                <div className="relative bg-white p-3 rounded-xl shadow-elegant">
                  <img
                    src={blog.img}
                    alt={blog.title}
                    className="rounded-lg w-full h-72 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-card p-10 mb-10 transition-all duration-300 hover:shadow-elegant">
          <div className="flex items-center mb-6">
            <FaLandmark className="text-[#1A365D] text-2xl mr-4" />
            <h2 className="text-3xl font-bold text-[#1A365D]">
              Understanding {blog.title}
            </h2>
          </div>
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            {blog.description}
          </p>
        </div>

        {/* Legal Information */}
        <div className="bg-white rounded-2xl shadow-card p-10 mb-10 transition-all duration-300 hover:shadow-elegant">
          <div className="flex items-center mb-8">
            <FaGavel className="text-[#1A365D] text-2xl mr-4" />
            <h2 className="text-3xl font-bold text-[#1A365D]">
              Legal Framework & Acts
            </h2>
          </div>

          <div className="space-y-8">
            {blog.legalinfo && blog.legalinfo.length > 0 ? (
              blog.legalinfo.map((act) => {
                return (
                  <div
                    key={blog._id}
                    className={`border-l-4 border-[#2D5A8C] bg-gradient-to-r from-blue-50 to-white py-6 px-2 rounded-xl transition-all duration-300 hover:translate-x-1`}
                  >
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-opacity-20 rounded-lg flex items-center justify-center mr-4 mt-1"></div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-[#2D5A8C] mb-2">
                          {act.actname}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {act.explain}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">
                  No legal information available.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Misunderstandings Section */}
        <div className="bg-white rounded-2xl shadow-card p-10 mb-10 transition-all duration-300 hover:shadow-elegant">
          <div className="flex items-center mb-8">
            <FaExclamationTriangle className="text-[#1A365D] text-2xl mr-4" />
            <h2 className="text-3xl font-bold text-[#1A365D]">
              Common Misunderstandings
            </h2>
          </div>
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            {blog.misunderstandings}
          </p>
        </div>

        {/* Awareness Section */}
        <div className="bg-white rounded-2xl shadow-card p-10 mb-10 transition-all duration-300 hover:shadow-elegant">
          <div className="flex items-center mb-8">
            <FaLightbulb className="text-[#1A365D] text-2xl mr-4" />
            <h2 className="text-3xl font-bold text-[#1A365D]">
              Importance of Legal Awareness
            </h2>
          </div>
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            {blog.awarness}
          </p>

          <div className="bg-gradient-to-r from-[#123154] to-[#2d5a8c] text-white p-8 rounded-2xl shadow-elegant mt-6">
            <div className="flex items-start">
              <FaQuoteLeft className="text-white/30 text-4xl mr-4 mt-1" />
              <div>
                <div className="flex items-center mb-4">
                  <FaGavel className="text-white text-xl mr-3" />
                  <h3 className="text-2xl font-bold">Key Takeaway</h3>
                </div>
                <p className="text-lg leading-relaxed">{blog.finalthoughts}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
