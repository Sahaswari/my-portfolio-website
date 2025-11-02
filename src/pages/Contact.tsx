import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { personalInfo } from "../data/personalInfo";
import { sendContactEmail } from "../utils/emails";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      // Send email using your email service
      await sendContactEmail(formData);
      
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again or email me directly.");
      console.error("Error sending email:", error);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: "Email",
      value: personalInfo.email,
      link: `mailto:${personalInfo.email}`,
    },
    {
      icon: <FaPhone />,
      title: "Phone",
      value: personalInfo.phone,
      link: `tel:${personalInfo.phone}`,
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      value: personalInfo.location,
      link: null,
    },
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: personalInfo.social.github, name: "GitHub" },
    { icon: <FaLinkedin />, url: personalInfo.social.linkedin, name: "LinkedIn" },
    { icon: <FaTwitter />, url: personalInfo.social.twitter, name: "Twitter" },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6 md:px-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Get in Touch</h1>
          <p className="text-xl text-neutral-300 max-w-3xl">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-primary rounded-xl shadow-lg p-8 border border-neutral-800">
              <h2 className="text-2xl font-bold text-white mb-6 font-serif">Send Me a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-neutral-300 font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-secondary border border-neutral-700 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition text-white"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-neutral-300 font-medium mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-secondary border border-neutral-700 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition text-white"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-neutral-300 font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-secondary border border-neutral-700 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition text-white"
                    placeholder="Project Inquiry"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-neutral-300 font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-secondary border border-neutral-700 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition resize-none text-white"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>

                {/* Status Messages */}
                {status === "success" && (
                  <div className="p-4 bg-green-900/50 border border-green-700 text-green-300 rounded-lg">
                    ✓ Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {status === "error" && (
                  <div className="p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
                    ✗ {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`w-full py-3 px-6 bg-accent text-secondary font-semibold rounded-lg transition-colors ${
                    status === "sending"
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-opacity-90 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Details */}
            <div className="bg-primary rounded-xl shadow-lg p-6 border border-neutral-800">
              <h3 className="text-xl font-bold text-white mb-4 font-serif">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="text-2xl text-accent mt-1">{info.icon}</div>
                    <div>
                      <p className="text-sm text-neutral-400 mb-1">{info.title}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-white font-medium hover:text-accent transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-primary rounded-xl shadow-lg p-6 border border-neutral-800">
              <h3 className="text-xl font-bold text-white mb-4 font-serif">Connect with Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl text-neutral-400 hover:text-accent transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-primary rounded-xl p-6 border border-neutral-800">
              <h3 className="text-lg font-bold text-white mb-2 font-serif">Currently Available</h3>
              <p className="text-neutral-300">
                I'm actively seeking opportunities in AI/ML and Software Development. Open to internships,
                full-time positions, and freelance projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
