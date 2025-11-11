import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaLaptopCode } from "react-icons/fa";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Certifications", path: "/certifications" },
    { name: "Volunteering", path: "/volunteering" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`site-header w-full backdrop-blur-sm ${isScrolled ? "scrolled" : ""}`}
      role="banner"
    >
      <nav className="container mx-auto px-6 md:px-25">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 text-lg font-semibold text-slate-900 hover:text-green-600 transition-colors duration-200 group"
            aria-label="Home"
          >
            <div className="flex items-center" aria-hidden="true">
              {/* Accent box with centered icon inside */}
              <span className="site-logo-accent flex items-center justify-center">
                <FaLaptopCode className="text-green-600 w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              </span>
            </div>
            <span className="text-slate-900 group-hover:text-green-600 transition-colors duration-200">Sahaswari Senanayaka</span>
          </Link>

          {/* Right side container */}
          <div className="hidden md:flex items-center">
            {/* Desktop Navigation */}
            <ul className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(link.path)
                        ? "text-white bg-gradient-to-r from-green-500 to-green-600 shadow-md shadow-green-500/30"
                        : "text-slate-700 hover:text-green-600 hover:bg-green-50/80"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="ml-4">
            <a
              href="/Sahaswari_Senanayaka_Resume _AI_ML Engineering.pdf"
              download="Sahaswari_Senanayaka_Resume_AI_ML_Engineering.pdf"
              className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold rounded-lg shadow-md shadow-green-500/30 hover:from-green-600 hover:to-green-700 hover:shadow-lg hover:shadow-green-600/40 transform hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
            >
              Download CV
            </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-2xl text-slate-700 hover:text-green-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-2xl py-6 px-6 border-t border-green-100 animate-slideIn">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`block text-base font-semibold transition-all duration-300 py-2 px-4 rounded-lg ${
                      isActive(link.path)
                        ? "text-white bg-gradient-to-r from-green-500 to-green-600 shadow-md shadow-green-500/30"
                        : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/Sahaswari_Senanayaka_Resume _AI_ML Engineering.pdf"
                  download="Sahaswari_Senanayaka_Resume_AI_ML_Engineering.pdf"
                  className="block px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-center text-sm font-semibold rounded-lg shadow-md shadow-green-500/30 hover:shadow-lg hover:shadow-green-600/40 hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
                >
                  Download CV
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
