import { FaGithub, FaLinkedin,  FaEnvelope, FaHeart, FaMedium, FaFacebook, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { personalInfo } from "../data/personalInfo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      url: personalInfo.social.github,
      icon: <FaGithub />,
    },
    {
      name: "LinkedIn",
      url: personalInfo.social.linkedin,
      icon: <FaLinkedin />,
    },
    {
      name: "Email",
      url: `mailto:${personalInfo.email}`,
      icon: <FaEnvelope />,
    },
    {
      name: "Medium",
      url: personalInfo.social.medium,
      icon: <FaMedium />,
    },
       {
      name: "YouTube",
      url: personalInfo.social.youtube,
      icon: <FaYoutube />,
    },
       {
      name: "Facebook",
      url: personalInfo.social.facebook,
      icon: <FaFacebook />,
    },
 
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Certifications", path: "/certifications" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-6 md:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {personalInfo.name}
            </h3>
            <p className="text-gray-300 mb-4">
              Former Associate Software Engineer | Former AI/ML & Software Development Intern | B.Sc. Eng. in Computer Engineering Undergraduate
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-300 hover:text-blue-400 transform hover:scale-110 transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 font-serif">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 font-serif">Get in Touch</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  {personalInfo.email}
                </a>
              </li>
              <li>{personalInfo.phone}</li>
              <li>{personalInfo.title}{personalInfo.location}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © {currentYear} {personalInfo.name}. Made with{" "}
            <FaHeart className="inline text-yellow-400" /> using React & TypeScript.
          </p>
        </div>
      </div>
    </footer>
  );
}
