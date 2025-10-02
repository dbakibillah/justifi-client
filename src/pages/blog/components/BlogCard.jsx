import { Link } from "react-router";

export default function BlogCard({ blog }) {
  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  return (
    <Link to={`/blog/${blog.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300 cursor-pointer">
        <div className="relative">
          <img
            src={blog.img}
            alt={blog.title}
            className="w-full h-40 object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>

          <p className="text-gray-600 text-sm mb-3">
            {truncateString(blog.description, 85)}
          </p>
          <p className="text-[#c7a86d] font-semibold text-sm hover:underline">
            Read More &gt;
          </p>
        </div>
      </div>
    </Link>
  );
}
