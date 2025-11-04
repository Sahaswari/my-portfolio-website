import { useState } from "react";
import {
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaBrain,
  FaLaptopCode,
  FaTools,
  FaHandsHelping,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";
import { personalInfo, skills, education, experience, volunteering } from "../data/personalInfo";

export default function About() {
  const [activeTab, setActiveTab] = useState<"education" | "experience">("education");

  const skillCategories = [
    { title: "Programming Languages", icon: <FaCode />, data: skills.programming },
    { title: "AI/ML & Data Science", icon: <FaBrain />, data: skills.aiml },
    { title: "Web Development", icon: <FaLaptopCode />, data: skills.webDev },
    { title: "Tools & Technologies", icon: <FaTools />, data: skills.tools },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-sky-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-900 text-white py-20 pt-28">
        <div className="container mx-auto px-6 md:px-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">About Me</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            Passionate about building intelligent systems and creating meaningful impact through technology
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-20 py-16">
        {/* About Description */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 border-2 border-green-100 relative overflow-hidden">
            {/* Decorative Corner Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-200 to-transparent opacity-40"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-yellow-200 to-transparent opacity-40"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-12 bg-gradient-to-b from-green-600 to-green-400 rounded-full"></div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent font-serif">Who I Am</h2>
              </div>
              <p className="text-green-900 leading-relaxed text-lg mb-6">
                {personalInfo.about.description}
              </p>
              <p className="text-green-900 leading-relaxed text-lg mb-6">
                {personalInfo.about.currentFocus}
              </p>

              {/* Interests */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-green-700 mb-4 font-serif">Areas of Interest</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {personalInfo.about.interests.map((interest, index) => (
                    <div key={index} className="flex items-center gap-3 text-green-800">
                      <span className="text-yellow-500 font-bold text-xl">▸</span>
                      <span className="font-medium">{interest}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-8 text-center font-serif">Skills & Technologies</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-yellow-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl text-yellow-400">{category.icon}</span>
                  <h3 className="text-xl font-semibold text-black-700 font-serif">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.data.map((skill, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-green-900 font-semibold">{skill.name}</span>
                        <span className="text-green-600 font-bold text-lg">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-black-100 rounded-full h-2.5">
                        <div
                          className="bg-gradient-to-r from-yellow-100 to-yellow-400 h-2.5 rounded-full transition-all duration-1000"
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
          <div className="bg-white rounded-xl shadow-lg p-8 border border-green-100">
            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-green-200">
              <button
                onClick={() => setActiveTab("education")}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-300 ${
                  activeTab === "education"
                    ? "text-green-600 border-b-3 border-green-600"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                <FaGraduationCap />
                Education
              </button>
              <button
                onClick={() => setActiveTab("experience")}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-300 ${
                  activeTab === "experience"
                    ? "text-green-600 border-b-3 border-green-600"
                    : "text-gray-600 hover:text-green-600"
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
                  <div key={index} className="border-l-4 border-green-600 pl-6 pb-6 hover:border-green-400 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-green-700">{edu.degree}</h3>
                      <span className="text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">{edu.period}</span>
                    </div>
                    <p className="text-lg text-green-900 font-semibold mb-1">{edu.institution}</p>
                    <p className="text-green-600 mb-3 font-medium">{edu.location}</p>
                    {edu.gpa && <p className="text-green-600 mb-3 font-bold">GPA: {edu.gpa}</p>}
                    <p className="text-green-800 mb-3 font-medium">{edu.description}</p>
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-green-800 space-y-1">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx} className="font-medium">{achievement}</li>
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
                  <div key={index} className="border-l-4 border-green-500 pl-6 pb-6 hover:border-green-400 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-green-700">{exp.title}</h3>
                        <p className="text-lg text-gray-800">{exp.company}</p>
                      </div>
                      <span className="text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">{exp.period}</span>
                    </div>
                    <p className="text-gray-600 mb-3">{exp.location} • {exp.type}</p>
                    <ul className="list-disc list-inside text-green-800 space-y-2 mb-3">
                      {exp.description.map((desc, idx) => (
                        <li key={idx} className="font-medium">{desc}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full border border-green-200"
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

        {/* Volunteering Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-green-50 text-green-600 text-sm font-semibold rounded-full border border-green-200">
                GIVING BACK
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-4 font-serif">
              Volunteering & Leadership
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Committed to empowering women in engineering and fostering inclusive tech communities
            </p>
          </div>

          {volunteering.map((vol, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 md:p-10 border-2 border-green-100 mb-8 hover:shadow-2xl transition-shadow duration-300">
              {/* Header */}
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-3xl shadow-lg">
                  <FaHandsHelping className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-2xl font-bold text-green-700 mb-1">{vol.role}</h3>
                      <p className="text-xl text-slate-800 font-semibold">{vol.organization}</p>
                    </div>
                    <span className="px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-full border border-green-200">
                      {vol.period}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-2">{vol.location}</p>
                  <p className="text-slate-700 leading-relaxed">{vol.description}</p>
                </div>
              </div>

              {/* Events Organized */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-green-700 mb-6 flex items-center gap-2">
                  <FaCalendarAlt className="text-green-600" />
                  Events Organized
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {vol.events.map((event, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-md">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl">📅</span>
                        <div className="flex-1">
                          <h5 className="font-bold text-green-800 text-lg mb-1">{event.name}</h5>
                          <p className="text-sm text-green-600 font-semibold">{event.date}</p>
                        </div>
                      </div>
                      <p className="text-slate-700 text-sm mb-3 leading-relaxed">{event.description}</p>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold border border-green-200">
                          {event.role}
                        </span>
                        <span className="text-xs px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-semibold border border-yellow-200 flex items-center gap-1">
                          <FaUsers className="text-xs" />
                          {event.impact}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Achievements */}
              <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl p-6 border-2 border-green-100">
                <h4 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                  🏆 Key Achievements
                </h4>
                <ul className="space-y-2">
                  {vol.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-800">
                      <span className="text-green-500 font-bold text-xl flex-shrink-0">✓</span>
                      <span className="font-medium">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
