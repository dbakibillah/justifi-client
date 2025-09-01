import { Link } from "react-router";
import { getImageUrl } from "../../../utils/blog-utility"; // Utility to get image URL

export default function BlogCard({ blog }) {
    const truncateString = (str, num) => {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    };
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
            <div className="relative">
                <img
                    src={getImageUrl(`${blog.image}`)}
                    alt="Blog photo"
                    className="w-full h-40 object-cover"
                />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-[-16px] bg-[#c7a86d] text-white text-sm px-4 py-1 rounded-full shadow-md">
                    {" "}
                    {blog.case}{" "}
                </span>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
                <p className="text-sm text-gray-500 mb-2 flex items-center">
                    <span className="mr-2">📅 {blog.date}</span> |{" "}
                    <span className="ml-2">👤 {blog.author}</span>
                </p>
                <p className="text-gray-600 text-sm mb-3">
                    {truncateString(blog.description, 75)}
                </p>
                <Link
                    to={`/blog/${blog.id}`}
                    href="#"
                    className="text-[#c7a86d] font-semibold text-sm hover:underline"
                >
                    Read More &gt;
                </Link>
            </div>
        </div>
    );
}
