import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getBlogById } from '../data/blogs';
import type { BlogPost as BlogPostType } from '../data/blogs';
import { FiCalendar, FiClock } from 'react-icons/fi';

export default function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPostType | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      const blogId = id ? parseInt(id, 10) : NaN;
      if (!isNaN(blogId)) {
        const blogData = await getBlogById(blogId);
        setBlog(blogData);
      }
      setLoading(false);
    };
    loadBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-sky-50 flex items-center justify-center">
        <div className="text-xl text-slate-600">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-sky-50 flex items-center justify-center">
        <div className="p-8 bg-white rounded-lg shadow-md border border-slate-200 text-center">
          <h2 className="text-2xl font-bold mb-4">Article not found</h2>
          <p className="text-slate-600 mb-6">The requested article could not be found.</p>
          <Link to="/blog" className="px-6 py-2 bg-green-600 text-white rounded-md">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-sky-50">
      <section className="bg-gradient-to-r from-green-800 to-green-900 text-white py-20 pt-28">
        <div className="container mx-auto px-6 md:px-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
          <p className="text-green-100 max-w-3xl">{blog.excerpt}</p>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-20 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 border border-slate-200">
          {blog.image && (
            <img src={blog.image} alt={blog.title} className="w-full h-72 object-cover rounded-md mb-6" />
          )}

          <div className="flex items-center gap-4 text-slate-600 mb-6">
            <span className="flex items-center gap-2"><FiCalendar /> {new Date(blog.date).toLocaleDateString()}</span>
            <span className="flex items-center gap-2"><FiClock /> {blog.readTime}</span>
          </div>

          <div className="prose max-w-none text-slate-800 whitespace-pre-line">
            {blog.content}
          </div>

          <div className="mt-8">
            <Link to="/blog" className="text-green-600 font-semibold">← Back to Articles</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
