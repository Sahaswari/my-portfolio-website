import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaRocket } from "react-icons/fa";
import { FiCalendar, FiClock, FiTag } from "react-icons/fi";
import { getBlogs, type BlogPost } from "../data/blogs";

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("All");

  useEffect(() => {
    setBlogs(getBlogs());
  }, []);

  // Get all unique tags
  const allTags = ["All", ...new Set(blogs.flatMap(blog => blog.tags))];

  // Filter blogs by tag
  const filteredBlogs = selectedTag === "All" 
    ? blogs 
    : blogs.filter(blog => blog.tags.includes(selectedTag));

  if (blogs.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-800 to-green-900 text-white py-20 pt-28">
          <div className="container mx-auto px-6 md:px-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Articles</h1>
            <p className="text-xl text-green-100 max-w-3xl">
              Sharing insights about AI/ML, software development, and technology
            </p>
          </div>
        </section>

        {/* Coming Soon Content */}
        <div className="container mx-auto px-6 md:px-20 py-20">
          <div className="bg-slate-50 rounded-lg shadow-lg p-12 text-center max-w-2xl mx-auto border border-slate-200">
            <div className="text-6xl mb-6 text-green-600">
              <FaRocket className="inline-block" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Coming Soon!</h2>
            <p className="text-slate-600 text-lg mb-8">
              I'm currently working on creating valuable content. Check the admin panel to add your first blog post!
            </p>
            
            <a
              href="/admin"
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2"
            >
              <span>Go to Admin Panel</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-900 text-white py-20 pt-28">
        <div className="container mx-auto px-6 md:px-20">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/20">
              LATEST ARTICLES
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Articles</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            Sharing insights about AI/ML, software development, and technology
          </p>
        </div>
        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-20 py-16 relative z-10">
        {/* Tag Filter */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Filter by Topic</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-5 py-2 rounded-md font-medium transition-all duration-200 ${
                  selectedTag === tag
                    ? "bg-green-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Count */}
        <div className="mb-8">
          <p className="text-slate-600 text-sm font-medium">
            Showing <span className="font-bold text-slate-900">{filteredBlogs.length}</span>{" "}
            {filteredBlogs.length === 1 ? "article" : "articles"}
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-green-500 group"
            >
              {blog.image && (
                <div className="relative overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Blog+Image';
                    }}
                  />
                </div>
              )}
              
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {blog.tags.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-md"
                    >
                      <FiTag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                
                <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-200">
                  <span className="flex items-center gap-1">
                    <FiCalendar size={14} />
                    {new Date(blog.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock size={14} />
                    {blog.readTime}
                  </span>
                </div>

                <div className="mt-4">
                    <Link
                      to={`/blog/${blog.id}`}
                      className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
                    >
                      <span>Read More</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
