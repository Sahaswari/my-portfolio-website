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

      {/* What I Do Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-20">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-green-50 text-green-600 text-sm font-semibold rounded-full border border-green-200">
                EXPERTISE
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What I Do</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Passionate about creating innovative solutions at the intersection of AI and software engineering
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-50 p-8 rounded-xl hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-green-400 relative group"
              >
                {/* Clean Top Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${
                  index === 0 ? 'bg-green-600' :
                  index === 1 ? 'bg-indigo-600' :
                  'bg-cyan-600'
                }`}></div>
                
                {/* Icon */}
                <div className={`inline-block p-4 rounded-lg mb-4 ${
                  index === 0 ? 'bg-green-100 text-green-600' :
                  index === 1 ? 'bg-indigo-100 text-indigo-600' :
                  'bg-cyan-100 text-cyan-600'
                }`}>
                  <div className="text-3xl">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-white text-green-600 text-sm font-semibold rounded-full border border-green-200 shadow-sm">
                FEATURED WORK
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Featured Projects</h2>
            <p className="text-slate-600 text-lg">
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
              className="group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-green-400 relative overflow-hidden"
            >
              <span className="relative z-10">View All Projects</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Overview Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
                Building the Future with Technology
              </h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                {personalInfo.about.description}
              </p>
              <p className="text-slate-700 text-lg mb-8 font-medium">
                Currently seeking opportunities to contribute to innovative AI/ML and software development projects.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Learn More About Me
                <FaArrowRight />
              </Link>
            </div>

            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-slate-900 flex items-center gap-2">
                <span className="w-1 h-8 bg-green-600"></span>
                Core Competencies
              </h3>
              <div className="space-y-4">
                {personalInfo.about.interests.map((interest, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <span className="flex-shrink-0 w-2 h-2 bg-green-600 rounded-full group-hover:scale-150 transition-transform"></span>
                    <span className="text-lg text-slate-700">{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-indigo-700 relative overflow-hidden">
        {/* Subtle Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#086608FC_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        
        <div className="container mx-auto px-6 md:px-20 text-center relative z-10">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-white/10 backdrop-green-sm text-white text-sm font-semibold rounded-full border border-white/20">
              LET'S CONNECT
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            I'm currently available for internships, full-time positions, and freelance projects.
            Let's discuss how we can collaborate!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="group px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            >
              Get in Touch
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <a
              href={personalInfo.resumeUrl}
              download
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
