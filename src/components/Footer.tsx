import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from "react-icons/fa";
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
      name: "Twitter",
      url: personalInfo.social.twitter,
      icon: <FaTwitter />,
    },
    {
      name: "Email",
      url: `mailto:${personalInfo.email}`,
      icon: <FaEnvelope />,
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
    <footer className="bg-primary text-neutral-300">
      <div className="container mx-auto px-6 md:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 font-serif">
              <span className="text-accent">{"<"}</span>
              {personalInfo.name.split(" ")[0]}
              <span className="text-accent">{" />"}</span>
            </h3>
            <p className="text-neutral-400 mb-4">
              Computer Engineering student passionate about AI/ML and Software
              Development. Building innovative solutions for real-world problems.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-neutral-400 hover:text-accent transition-colors"
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
                    className="text-neutral-400 hover:text-accent transition-colors"
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
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-accent transition-colors"
                >
                  {personalInfo.email}
                </a>
              </li>
              <li>{personalInfo.phone}</li>
              <li>{personalInfo.location}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-8 pt-8 text-center">
          <p className="text-neutral-400 text-sm">
            © {currentYear} {personalInfo.name}. Made with{" "}
            <FaHeart className="inline text-accent" /> using React & TypeScript.
          </p>
        </div>
      </div>
    </footer>
  );
}
