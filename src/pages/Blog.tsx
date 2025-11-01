import { FaRocket } from "react-icons/fa";

export default function Blog() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 md:px-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Articles</h1>
          <p className="text-xl text-indigo-100 max-w-3xl">
            Sharing insights about AI/ML, software development, and technology
          </p>
        </div>
      </section>

      {/* Coming Soon Content */}
      <div className="container mx-auto px-6 md:px-20 py-20">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto">
          <div className="text-6xl text-indigo-600 mb-6">
            <FaRocket className="inline" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon!</h2>
          <p className="text-gray-600 text-lg mb-8">
            I'm currently working on creating valuable content about AI/ML, software development best practices,
            and my learning journey. Stay tuned for:
          </p>
          
          <div className="text-left max-w-md mx-auto space-y-3 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-indigo-600 text-xl">•</span>
              <span className="text-gray-700">Deep dives into machine learning algorithms</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-600 text-xl">•</span>
              <span className="text-gray-700">Project walkthroughs and tutorials</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-600 text-xl">•</span>
              <span className="text-gray-700">Tech stack reviews and comparisons</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-indigo-600 text-xl">•</span>
              <span className="text-gray-700">Career tips for CS students</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`mailto:your.email@example.com?subject=Blog Subscription`}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Notify Me When Live
            </a>
            <a
              href="https://medium.com/@yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Follow on Medium
            </a>
          </div>
        </div>

        {/* Optional: Show placeholder blog cards */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            What to Expect
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Getting Started with TensorFlow",
                category: "Machine Learning",
                readTime: "5 min read",
              },
              {
                title: "Building Scalable React Applications",
                category: "Web Development",
                readTime: "8 min read",
              },
              {
                title: "My Journey in Computer Engineering",
                category: "Career",
                readTime: "6 min read",
              },
            ].map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 opacity-60 cursor-not-allowed"
              >
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 text-sm font-semibold rounded-full mb-3">
                  {article.category}
                </span>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h4>
                <p className="text-gray-600 text-sm">{article.readTime}</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">Coming Soon...</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
