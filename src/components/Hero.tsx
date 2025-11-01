import profileImage from '../assets/profile.jpg';

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center px-6 md:px-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div>
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
    </div>

    {/* Right Side - Image */}
    <div className="flex justify-center lg:justify-end">
      <div className="relative">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        
        {/* Image container */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full opacity-10"></div>
          <img
            src={profileImage}
            alt="Sahaswari Samoda"
            className="w-full h-full object-cover rounded-full border-8 border-white shadow-2xl"
            onError={(e) => {
              // Fallback if image not found
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-full border-8 border-white shadow-2xl">
                    <div class="text-center text-white">
                      <svg class="w-32 h-32 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                      </svg>
                      <p class="text-xl font-semibold">SS</p>
                    </div>
                  </div>
                `;
              }
            }}
          />
        </div>

        {/* Floating decoration elements */}
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  </div>
</div>
    </section>
  );
}
