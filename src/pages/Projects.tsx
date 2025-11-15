import { useState, useEffect } from "react";
import { getProjectsByCategory, type Project } from "../data/projects";
import { FaGithub, FaExternalLinkAlt, FaVideo, FaCalendarAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  const categories = ["All", "AI/ML", "Web Development", "Data Science", "Mobile", "Other"];

  const toggleProjectDetails = (projectId: number) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      const projects = await getProjectsByCategory(selectedCategory);
      setFilteredProjects(projects);
      setLoading(false);
    };
    loadProjects();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-sky-50">
  {/* Hero Section */}
  <section id="projects" className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20 pt-28">
        <div className="container mx-auto px-6 md:px-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">My Projects</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            A collection of projects showcasing my expertise in AI/ML, Software Development, and Data Science
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-20 py-16">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 shadow-md border border-green-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Project Count */}
        <div className="text-center mb-8">
          <p className="text-green-800 text-lg font-semibold">
            Showing <span className="font-bold text-green-600 text-xl">{filteredProjects.length}</span>{" "}
            {filteredProjects.length === 1 ? "project" : "projects"}
          </p>
        </div>

        {/* Projects List */}
        {filteredProjects.length > 0 ? (
          <div className="space-y-8">
            {filteredProjects.map((project) => {
              const isExpanded = expandedProjects.has(project.id);
              
              return (
                <div
                  key={project.id}
                  className="bg-white rounded-xl shadow-lg p-8 md:p-10 border-2 border-green-100 hover:shadow-2xl transition-shadow duration-300"
                >
                  {/* Header Section */}
                  <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                    {/* Project Image */}
                    {project.images && project.images[0] && (
                      <div className="w-full md:w-64 flex-shrink-0">
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="w-full h-auto rounded-lg shadow-md object-cover"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    {/* Project Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-2xl font-bold text-green-700 mb-1">{project.title}</h3>
                          {project.featured && (
                            <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-md shadow-sm mb-2">
                              FEATURED
                            </span>
                          )}
                        </div>
                        <span className="px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-full border border-green-200">
                          {project.category}
                        </span>
                      </div>

                      {/* Date */}
                      <p className="text-slate-600 text-sm mb-3 flex items-center gap-2">
                        <FaCalendarAlt className="text-green-600" />
                        <span className="font-medium">
                          {new Date(project.date).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </p>

                      {/* Short Description */}
                      <p className="text-slate-700 text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 6).map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 6 && (
                          <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
                            +{project.technologies.length - 6} more
                          </span>
                        )}
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-wrap gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-md hover:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            <FaGithub className="text-lg" />
                            Code
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700 shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            <FaExternalLinkAlt className="text-sm" />
                            Live Demo
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            <FaVideo className="text-sm" />
                            Video Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Long Description */}
                  {project.longDescription && (
                    <>
                      {isExpanded && (
                        <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-slate-50 rounded-lg border-2 border-green-100">
                          <h4 className="text-lg font-bold text-green-700 mb-3">Project Details</h4>
                          <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                            {project.longDescription}
                          </p>
                        </div>
                      )}

                      {/* More/Less Button */}
                      <div className="flex justify-center mt-6 pt-4 border-t border-slate-200">
                        <button
                          onClick={() => toggleProjectDetails(project.id)}
                          className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          {isExpanded ? (
                            <>
                              <FaChevronUp className="text-sm" />
                              <span>Show Less</span>
                            </>
                          ) : (
                            <>
                              <FaChevronDown className="text-sm" />
                              <span>More Details</span>
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No projects found in this category.</p>
          </div>
        )}

        {/* CTA Section */}
        <section className="mt-20 bg-white rounded-2xl p-10 text-center border border-green-200 shadow-lg">
          <h2 className="text-3xl font-bold mb-4 font-serif bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Interested in Working Together?</h2>
          <p className="text-lg text-green-800 mb-6 max-w-2xl mx-auto font-medium">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Get in Touch
            </a>
            <a
              href="https://github.com/Sahaswari"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-green-600 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-all duration-300"
            >
              View GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
