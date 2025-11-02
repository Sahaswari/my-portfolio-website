import { useState, useEffect } from "react";
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
      <div className="min-h-screen bg-secondary">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-6 md:px-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Blog & Articles</h1>
            <p className="text-xl text-neutral-300 max-w-3xl">
              Sharing insights about AI/ML, software development, and technology
            </p>
          </div>
        </section>

        {/* Coming Soon Content */}
        <div className="container mx-auto px-6 md:px-20 py-20">
          <div className="bg-primary rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto border border-neutral-800">
            <div className="text-6xl text-accent mb-6">
              <FaRocket className="inline" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4 font-serif">Coming Soon!</h2>
            <p className="text-neutral-400 text-lg mb-8">
              I'm currently working on creating valuable content. Check the admin panel to add your first blog post!
            </p>
            
            <a
              href="/admin"
              className="px-6 py-3 bg-accent text-secondary font-semibold rounded-lg hover:bg-opacity-90 transition-colors inline-block"
            >
              Go to Admin Panel
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6 md:px-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Blog & Articles</h1>
          <p className="text-xl text-neutral-300 max-w-3xl">
            Sharing insights about AI/ML, software development, and technology
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-20 py-16">
        {/* Tag Filter */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-4">Filter by Tag:</h3>
          <div className="flex flex-wrap gap-3">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedTag === tag
                    ? "bg-accent text-secondary shadow-lg"
                    : "bg-primary text-neutral-300 hover:bg-neutral-800 shadow"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Count */}
        <div className="mb-8">
          <p className="text-neutral-400">
            Showing <span className="font-semibold text-accent">{filteredBlogs.length}</span>{" "}
            {filteredBlogs.length === 1 ? "article" : "articles"}
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-primary rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-neutral-800"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Blog+Image';
                  }}
                />
              )}
              
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {blog.tags.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-accent text-xs font-semibold rounded-full"
                    >
                      <FiTag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 font-serif">
                  {blog.title}
                </h3>
                
                <p className="text-neutral-400 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-neutral-500 pt-4 border-t border-neutral-800">
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
                  <button className="text-accent font-semibold hover:text-opacity-90 transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
