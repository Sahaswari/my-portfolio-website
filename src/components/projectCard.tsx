import { FaGithub, FaExternalLinkAlt, FaVideo } from "react-icons/fa";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group border border-slate-200 hover:border-green-500">
      {/* Project Image */}
      <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        {project.images && project.images[0] ? (
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback if image doesn't exist
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600 text-4xl font-bold">
            {project.title.charAt(0)}
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white text-green-600 text-xs font-semibold rounded-md shadow-md border border-green-200">
            {project.category}
          </span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-md shadow-md">
              FEATURED
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">
          {project.title}
        </h3>

        {/* Date */}
        <p className="text-sm text-slate-500 mb-3 font-medium">
          {new Date(project.date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </p>

        {/* Description */}
        <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-md hover:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-200"
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
              className="flex items-center gap-2 px-4 py-2 border-2 border-slate-300 text-slate-700 text-sm font-semibold rounded-md hover:border-green-600 hover:text-green-600 transition-all duration-200"
            >
              <FaExternalLinkAlt className="text-sm" />
              Live
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border-2 border-slate-300 text-slate-700 text-sm font-semibold rounded-md hover:border-green-600 hover:text-green-600 transition-all duration-200"
            >
              <FaVideo className="text-sm" />
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
