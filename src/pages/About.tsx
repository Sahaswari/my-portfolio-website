import { useState } from "react";
import {
  FaGraduationCap,
  FaBriefcase,
  FaCertificate,
  FaCode,
  FaBrain,
  FaLaptopCode,
  FaTools,
} from "react-icons/fa";
import { personalInfo, skills, education, experience, certifications } from "../data/personalInfo";

export default function About() {
  const [activeTab, setActiveTab] = useState<"education" | "experience">("education");

  const skillCategories = [
    { title: "Programming Languages", icon: <FaCode />, data: skills.programming },
    { title: "AI/ML & Data Science", icon: <FaBrain />, data: skills.aiml },
    { title: "Web Development", icon: <FaLaptopCode />, data: skills.webDev },
    { title: "Tools & Technologies", icon: <FaTools />, data: skills.tools },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 md:px-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Passionate about building intelligent systems and creating meaningful impact through technology
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-20 py-16">
        {/* About Description */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Who I Am</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              {personalInfo.about.description}
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              {personalInfo.about.currentFocus}
            </p>

            {/* Interests */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Areas of Interest</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {personalInfo.about.interests.map((interest, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-700">
                    <span className="text-blue-600">▸</span>
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Skills & Technologies</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl text-blue-600">{category.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.data.map((skill, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">{skill.name}</span>
                        <span className="text-blue-600 font-semibold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-1000"
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
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b">
              <button
                onClick={() => setActiveTab("education")}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors ${
                  activeTab === "education"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <FaGraduationCap />
                Education
              </button>
              <button
                onClick={() => setActiveTab("experience")}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors ${
                  activeTab === "experience"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
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
                  <div key={index} className="border-l-4 border-blue-600 pl-6 pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                      <span className="text-blue-600 font-semibold">{edu.period}</span>
                    </div>
                    <p className="text-lg text-gray-700 mb-1">{edu.institution}</p>
                    <p className="text-gray-600 mb-3">{edu.location}</p>
                    {edu.gpa && <p className="text-gray-700 mb-3">GPA: {edu.gpa}</p>}
                    <p className="text-gray-700 mb-3">{edu.description}</p>
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
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
                  <div key={index} className="border-l-4 border-purple-600 pl-6 pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                        <p className="text-lg text-gray-700">{exp.company}</p>
                      </div>
                      <span className="text-purple-600 font-semibold">{exp.period}</span>
                    </div>
                    <p className="text-gray-600 mb-3">{exp.location} • {exp.type}</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-3">
                      {exp.description.map((desc, idx) => (
                        <li key={idx}>{desc}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-50 text-purple-600 text-sm font-medium rounded-full"
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

        {/* Certifications */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Certifications & Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <FaCertificate className="text-3xl text-yellow-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{cert.name}</h3>
                    <p className="text-gray-600 mb-2">{cert.issuer}</p>
                    <p className="text-sm text-gray-500 mb-3">{cert.date}</p>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View Credential →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
