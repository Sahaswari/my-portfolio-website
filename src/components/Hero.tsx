import profileImage from '../assets/profile.jpg';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center px-6 md:px-20 bg-gradient-to-br from-slate-50 via-white to-green-50 pt-20 relative overflow-hidden"
    >
      {/* Subtle Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Minimal Accent Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-green-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="animate-fadeIn space-y-6">
            <div className="inline-block">
              {/* <p className="text-sm md:text-base text-green-600 font-semibold tracking-wide uppercase">
                Associate Software Engineer
              </p> */}
              {/* <div className="h-1 w-20 bg-green-600 mt-2"></div> */}
            </div>
            
            <h1 className="text-4xl md:text-4xl lg:text-7xl font-bold text-slate-800 leading-tight">
              Sahaswari<br />Senanayaka
            </h1>
            
            <h2 className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed">
             Former Associate Software Engineer | Former AI/ML & Software Development Intern | B.Sc. Eng. in Computer Engineering Undergraduate
            </h2>
            
            <p className="max-w-2xl text-slate-600 text-lg leading-relaxed">
              I'm passionate about solving real-world problems through intelligent
              systems and software solutions. I love exploring how AI and machine
              learning can create meaningful impact, from data analysis to
              applications that make life easier.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="/resume.pdf"
                className="group px-8 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-green-700 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
              <Link
                to="/projects#projects"
                className="group px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-green-600 hover:text-green-600 transition-all duration-200 flex items-center gap-2"
              >
                View Projects
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center lg:justify-end animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Professional Border Accent */}
              <div className="absolute -inset-4 bg-gradient-to-r from-green-600 to-indigo-600 rounded-full opacity-10 blur-lg"></div>
              
              {/* Main Image Container */}
              <div className="relative w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 rounded-full p-2 shadow-2xl border border-slate-200 transform hover:scale-[1.02] transition-transform duration-300">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <img
                    src={profileImage}
                    alt="Sahaswari Senanayaka"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              
              {/* Subtle Corner Accent */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-4 border-green-600 opacity-20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-slate-500 uppercase tracking-wider">Scroll</span>
        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
