import React from "react";
import { getImageUrl } from "../../utils/blog-utility";

export default function LawyerCard({ lawyer }) {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl group">
      <img
        src={getImageUrl(`${lawyer.image}`)}
        alt="Attorney"
        className="w-full h-60 object-cover"
      />
      <div className="bg-white group-hover:bg-[#c7a86d] text-center py-5 relative transition duration-500">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white group-hover:bg-white rounded-full px-6 py-2 transition duration-500">
          <p className="text-white group-hover:text-gray-700 font-semibold text-sm">
            View Details
          </p>
        </div>
        <h3 className="mt-6 font-bold text-lg text-gray-900 group-hover:text-white">
          {lawyer.name}
        </h3>
        <p className="text-sm text-gray-600 group-hover:text-white">
          {lawyer.catagory}
        </p>
        <p className="text-sm text-gray-600 group-hover:text-white">
          {lawyer.court}
        </p>
        <p className="text-sm text-gray-600 group-hover:text-white">
          Fee : {lawyer.fee} BDT
        </p>
      </div>
    </div>
  );
}
