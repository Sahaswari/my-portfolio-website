import { useState, useEffect } from "react";
import {
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaBrain,
  FaLaptopCode,
  FaTools,
  FaUsers,
} from "react-icons/fa";
import { personalInfo, skills, education, experience } from "../data/personalInfo";

export default function About() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"education" | "experience">("education");
  const [activeSection, setActiveSection] = useState<string>("who-i-am");

  const sections = [
    { id: "who-i-am", label: "Who I Am", icon: "👤" },
    { id: "education-experience", label: "Education & Experience", icon: "🎓" },
    { id: "skills", label: "Skills & Technologies", icon: "💻" },
  ];

  // Track scroll position to highlight active section
  useEffect(() => {
    setLoading(false);
    const sectionIds = ["who-i-am", "education-experience", "skills"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for header
      
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const skillCategories = [
    { title: "Programming Languages", icon: <FaCode />, data: skills.programming },
    { title: "AI/ML & Data Science", icon: <FaBrain />, data: skills.aiml },
    { title: "Web Development", icon: <FaLaptopCode />, data: skills.webDev },
    { title: "Tools & Technologies", icon: <FaTools />, data: skills.tools },
    { title: "Soft Skills & Leadership", icon: <FaUsers />, data: skills.softSkills },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

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

      {/* Quick Navigation Menu */}
      <div className="sticky top-16 z-30 bg-white border-b-2 border-green-100 shadow-md">
        <div className="container mx-auto px-6 md:px-20">
          <nav className="flex overflow-x-auto py-4 gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md shadow-green-500/30"
                    : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                }`}
              >
                <span className="text-lg">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-20 py-16">
        {/* About Description */}
        <section id="who-i-am" className="mb-16 scroll-mt-32">
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

        {/* Education & Experience Section */}
        <section id="education-experience" className="mb-16 scroll-mt-32">
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

        {/* Skills Section */}
        <section id="skills" className="mb-16 scroll-mt-32">
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
      </div>
    </div>
  );
}
