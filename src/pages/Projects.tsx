import { useState, useEffect } from "react";
import { getProjectsByCategory, type Project } from "../data/projects";
import ProjectCard from "../components/projectCard";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  const categories = ["All", "AI/ML", "Web Development", "Data Science", "Mobile", "Other"];

  useEffect(() => {
    const loadProjects = async () => {
      const projects = await getProjectsByCategory(selectedCategory);
      setFilteredProjects(projects);
    };
    loadProjects();
  }, [selectedCategory]);

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

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
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
