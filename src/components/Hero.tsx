export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-start px-6 md:px-20 bg-gradient-to-b from-white to-gray-50"
    >
      {/* Intro text */}
      <p className="text-sm md:text-base text-gray-600 mb-2">
        👋 Hi, I’m
      </p>

      {/* Name */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
        Sahaswari Samoda
      </h1>

      {/* Tagline */}
      <h2 className="text-xl md:text-2xl text-blue-600 font-semibold mb-6">
        Computer Engineering Student | AI/ML & Software Developer
      </h2>

      {/* Short bio */}
      <p className="max-w-2xl text-gray-700 mb-8 leading-relaxed">
        I’m passionate about solving real-world problems through intelligent
        systems and software solutions. I love exploring how AI and machine
        learning can create meaningful impact, from data analysis to
        applications that make life easier.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4">
        <a
          href="/resume.pdf"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >
          Download Resume
        </a>

        <a
          href="#projects"
          className="px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition"
        >
          View Projects
        </a>
      </div>
    </section>
  );
}
