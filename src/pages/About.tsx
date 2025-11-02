import { useState } from "react";
import {
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaBrain,
  FaLaptopCode,
  FaTools,
} from "react-icons/fa";
import { personalInfo, skills, education, experience } from "../data/personalInfo";

export default function About() {
  const [activeTab, setActiveTab] = useState<"education" | "experience">("education");

  const skillCategories = [
    { title: "Programming Languages", icon: <FaCode />, data: skills.programming },
    { title: "AI/ML & Data Science", icon: <FaBrain />, data: skills.aiml },
    { title: "Web Development", icon: <FaLaptopCode />, data: skills.webDev },
    { title: "Tools & Technologies", icon: <FaTools />, data: skills.tools },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6 md:px-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">About Me</h1>
          <p className="text-xl text-neutral-300 max-w-3xl">
            Passionate about building intelligent systems and creating meaningful impact through technology
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-20 py-16">
        {/* About Description */}
        <section className="mb-16">
          <div className="bg-primary rounded-xl shadow-lg p-8 md:p-10 border border-neutral-800">
            <h2 className="text-3xl font-bold text-white mb-6 font-serif">Who I Am</h2>
            <p className="text-neutral-300 leading-relaxed text-lg mb-6">
              {personalInfo.about.description}
            </p>
            <p className="text-neutral-300 leading-relaxed text-lg mb-6">
              {personalInfo.about.currentFocus}
            </p>

            {/* Interests */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4 font-serif">Areas of Interest</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {personalInfo.about.interests.map((interest, index) => (
                  <div key={index} className="flex items-center gap-3 text-neutral-300">
                    <span className="text-accent">▸</span>
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center font-serif">Skills & Technologies</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="bg-primary rounded-xl shadow-lg p-6 border border-neutral-800">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl text-accent">{category.icon}</span>
                  <h3 className="text-xl font-semibold text-white font-serif">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.data.map((skill, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-neutral-300 font-medium">{skill.name}</span>
                        <span className="text-accent font-semibold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2.5">
                        <div
                          className="bg-accent h-2.5 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Experience Section */}
        <section className="mb-16">
          <div className="bg-primary rounded-xl shadow-lg p-8 border border-neutral-800">
            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-neutral-800">
              <button
                onClick={() => setActiveTab("education")}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors ${
                  activeTab === "education"
                    ? "text-accent border-b-2 border-accent"
                    : "text-neutral-400 hover:text-accent"
                }`}
              >
                <FaGraduationCap />
                Education
              </button>
              <button
                onClick={() => setActiveTab("experience")}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors ${
                  activeTab === "experience"
                    ? "text-accent border-b-2 border-accent"
                    : "text-neutral-400 hover:text-accent"
                }`}
              >
                <FaBriefcase />
                Experience
              </button>
            </div>

            {/* Education Tab */}
            {activeTab === "education" && (
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-accent pl-6 pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                      <span className="text-accent font-semibold">{edu.period}</span>
                    </div>
                    <p className="text-lg text-neutral-300 mb-1">{edu.institution}</p>
                    <p className="text-neutral-400 mb-3">{edu.location}</p>
                    {edu.gpa && <p className="text-neutral-300 mb-3">GPA: {edu.gpa}</p>}
                    <p className="text-neutral-300 mb-3">{edu.description}</p>
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-neutral-300 space-y-1">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === "experience" && (
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6 pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                        <p className="text-lg text-neutral-300">{exp.company}</p>
                      </div>
                      <span className="text-blue-500 font-semibold">{exp.period}</span>
                    </div>
                    <p className="text-neutral-400 mb-3">{exp.location} • {exp.type}</p>
                    <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-3">
                      {exp.description.map((desc, idx) => (
                        <li key={idx}>{desc}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-900/50 text-blue-400 text-sm font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
