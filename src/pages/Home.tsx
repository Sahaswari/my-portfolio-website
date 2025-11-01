import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCode, FaBrain, FaRocket } from "react-icons/fa";
import { personalInfo } from "../data/personalInfo";
import { getFeaturedProjects } from "../data/projects";
import ProjectCard from "../components/projectCard";

export default function Home() {
  const featuredProjects = getFeaturedProjects().slice(0, 3);

  const features = [
    {
      icon: <FaBrain />,
      title: "AI/ML Expertise",
      description: "Building intelligent systems using deep learning, computer vision, and NLP.",
    },
    {
      icon: <FaCode />,
      title: "Full-Stack Development",
      description: "Creating scalable web applications with modern frameworks and technologies.",
    },
    {
      icon: <FaRocket />,
      title: "Problem Solver",
      description: "Turning complex challenges into elegant, efficient solutions.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What I Do</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Passionate about creating innovative solutions at the intersection of AI and software engineering
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="text-5xl text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-gray-600 text-lg">
              Check out some of my recent work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              View All Projects
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Overview Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Building the Future with Technology
              </h2>
              <p className="text-blue-100 text-lg mb-6">
                {personalInfo.about.description}
              </p>
              <p className="text-blue-100 text-lg mb-8">
                Currently seeking opportunities to contribute to innovative AI/ML and software development projects.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Learn More About Me
                <FaArrowRight />
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Core Competencies</h3>
              <div className="space-y-4">
                {personalInfo.about.interests.map((interest, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-yellow-400 text-xl">✓</span>
                    <span className="text-lg">{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Let's Work Together
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            I'm currently available for internships, full-time positions, and freelance projects.
            Let's discuss how we can collaborate!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Get in Touch
            </Link>
            <a
              href={personalInfo.resumeUrl}
              download
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Download Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
