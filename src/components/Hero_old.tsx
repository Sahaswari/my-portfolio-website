import profileImage from '../assets/profile.jpg';

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center px-6 md:px-20 bg-gradient-to-br from-blue-50 via-white to-sky-50 pt-20 relative overflow-hidden"
    >
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-blue-400 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-green-400 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-yellow-300 opacity-30 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-blue-300 opacity-30 rotate-12 animate-spin-slow" style={{ animationDelay: '3s' }}></div>
        
        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="animate-fadeIn">
            <p className="text-sm md:text-base text-blue-600 font-semibold mb-2 animate-slideIn" style={{ animationDelay: '0.2s' }}>
              👋 Hi, I'm
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent mb-4 font-serif animate-slideIn" style={{ animationDelay: '0.4s' }}>
              Sahaswari Senanayaka
            </h1>
            <h2 className="text-xl md:text-2xl text-blue-700 font-bold mb-6 animate-slideIn" style={{ animationDelay: '0.6s' }}>
              Computer Engineering Undergraduate | Former Associate Software Developer
            </h2>
            <p className="max-w-2xl text-blue-900 text-lg mb-8 leading-relaxed animate-slideIn" style={{ animationDelay: '0.8s' }}>
              I’m passionate about solving real-world problems through intelligent
              systems and software solutions. I love exploring how AI and machine
              learning can create meaningful impact, from data analysis to
              applications that make life easier.
            </p>
            <div className="flex flex-wrap gap-4 animate-slideIn" style={{ animationDelay: '1s' }}>
              <a
                href="/resume.pdf"
                className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 border-2 border-blue-400 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  📄 Download Resume
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </a>
              <a
                href="#projects"
                className="group px-8 py-3 border-3 border-blue-600 text-blue-700 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white hover:border-transparent transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  🚀 View Projects
                </span>
              </a>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center lg:justify-end animate-fadeIn relative" style={{ animationDelay: '0.5s' }}>
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Animated Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-28 h-28 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-gradient-to-br from-green-400 to-green-500 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              
              {/* Rotating Ring */}
              <div className="absolute inset-0 border-4 border-dashed border-blue-400 rounded-full animate-spin-slow opacity-40"></div>
              
              {/* Main Image Container */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full p-2 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <img
                  src={profileImage}
                  alt="Sahaswari Samoda"
                  className="w-full h-full object-cover rounded-full shadow-xl ring-4 ring-white"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 rounded-full">
                          <div class="text-center text-white">
                            <p class="text-4xl font-semibold">SS</p>
                          </div>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
