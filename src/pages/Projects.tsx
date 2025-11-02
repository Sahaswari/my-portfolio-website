import { useState } from "react";
import { getProjectsByCategory } from "../data/projects";
import ProjectCard from "../components/projectCard";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "AI/ML", "Web Development", "Data Science", "Mobile", "Other"];

  const filteredProjects = getProjectsByCategory(selectedCategory);

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6 md:px-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">My Projects</h1>
          <p className="text-xl text-neutral-300 max-w-3xl">
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
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-accent text-secondary shadow-lg scale-105"
                    : "bg-primary text-neutral-300 hover:bg-neutral-800 shadow"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Project Count */}
        <div className="text-center mb-8">
          <p className="text-neutral-400">
            Showing <span className="font-semibold text-accent">{filteredProjects.length}</span>{" "}
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
            <p className="text-neutral-500 text-lg">No projects found in this category.</p>
          </div>
        )}

        {/* CTA Section */}
        <section className="mt-20 bg-primary rounded-2xl p-10 text-center text-white border border-neutral-800">
          <h2 className="text-3xl font-bold mb-4 font-serif">Interested in Working Together?</h2>
          <p className="text-lg text-neutral-300 mb-6 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-3 bg-accent text-secondary font-semibold rounded-lg hover:bg-opacity-90 transition-colors shadow-lg"
            >
              Get in Touch
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-secondary transition-colors"
            >
              View GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
