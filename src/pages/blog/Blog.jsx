import { getAllBlogs } from "../../data/blogs"; // Function fetching/returning blogs

import BlogCard from "./components/BlogCard";

export default function Blog() {
  const blogs = getAllBlogs();

  return (
    <div className="bg-gray-100">
      {/* Blog Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-10">Blogs</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  );
}
