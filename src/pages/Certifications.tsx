import { useState, useEffect } from "react";
import { FaCertificate, FaExternalLinkAlt, FaCalendar, FaBuilding, FaBrain, FaDatabase, FaCloud, FaCode, FaStar, FaTrophy, FaHandsHelping, FaUsers, FaLanguage } from "react-icons/fa";
import { getCertifications, type Certification } from "../data/certifications";

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Define categories with icons
  const categories = [
    { id: 'All', label: 'All Certifications', icon: FaStar },
    { id: 'AI/ML', label: 'AI & Machine Learning', icon: FaBrain },
    { id: 'Data Science', label: 'Data Science', icon: FaDatabase },
    { id: 'Cloud', label: 'Cloud Computing', icon: FaCloud },
    { id: 'Web Development', label: 'Web Development', icon: FaCode },
    { id: 'Achievements', label: 'Achievements & Awards', icon: FaTrophy },
    { id: 'Leadership', label: 'Leadership & Management', icon: FaUsers },
    { id: 'Volunteering', label: 'Volunteering Certificates', icon: FaHandsHelping },
    { id: 'Language', label: 'Language & Communication', icon: FaLanguage },
  ];

  useEffect(() => {
    const loadCertifications = async () => {
      const data = getCertifications();
      setCertifications(data);
      setLoading(false);
    };
    loadCertifications();
  }, []);

  // Filter certifications by category
  const filteredCertifications = activeCategory === 'All' 
    ? certifications 
    : certifications.filter(cert => cert.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading certifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-900 text-white py-20 pt-28">
        <div className="container mx-auto px-6 md:px-20">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/20">
              PROFESSIONAL ACHIEVEMENTS
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Certifications & Achievements</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            Professional certifications and achievements that demonstrate my expertise and commitment to continuous learning
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="container mx-auto px-6 md:px-20 py-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-green-300'
                }`}
              >
                <Icon className="text-lg" />
                <span>{category.label}</span>
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                  activeCategory === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {category.id === 'All' 
                    ? certifications.length 
                    : certifications.filter(cert => cert.category === category.id).length
                  }
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="container mx-auto px-6 md:px-20 py-8">
        {filteredCertifications.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-lg shadow-md border border-slate-200">
            <div className="inline-block p-6 bg-green-50 rounded-full mb-6">
              <FaCertificate className="text-6xl text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {activeCategory === 'All' ? 'No Certifications Yet' : `No Certifications in ${activeCategory}`}
            </h2>
            <p className="text-slate-600 font-medium">
              {activeCategory === 'All' ? 'Check back later for updates!' : 'Try selecting a different category'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCertifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-green-500 group"
              >
                {/* Certificate Badge Header */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 text-center border-b border-slate-200">
                  <FaCertificate className="text-6xl text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-slate-900">{cert.name}</h3>
                </div>

                {/* Certificate Details */}
                <div className="p-6">
                  {/* Issuer */}
                  <div className="flex items-start gap-3 mb-4 p-3 bg-slate-50 rounded-md">
                    <FaBuilding className="text-green-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-slate-500 font-medium mb-1">Issued By</p>
                      <p className="text-slate-900 font-semibold">{cert.issuer}</p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-start gap-3 mb-4 p-3 bg-slate-50 rounded-md">
                    <FaCalendar className="text-green-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-slate-500 font-medium mb-1">Date Earned</p>
                      <p className="text-slate-900 font-semibold">
                        {cert.date.includes('-') 
                          ? new Date(cert.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long' 
                            })
                          : cert.date}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  {cert.description && (
                    <div className="mb-4 p-3 bg-slate-50 rounded-md border-l-2 border-green-600">
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {cert.description}
                      </p>
                    </div>
                  )}

                  {/* Credential Link */}
                  {cert.credentialUrl && (
                    <div className="mt-6 pt-4 border-t border-slate-200">
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 font-semibold text-sm px-5 py-2.5 rounded-md transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                      >
                        <FaExternalLinkAlt />
                        View Credential
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {certifications.length > 0 && (
          <div className="mt-16 bg-slate-50 rounded-lg p-8 shadow-md border border-slate-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Achievement Statistics</h3>
              <p className="text-slate-600">My Learning Journey in Numbers</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6 bg-white rounded-lg border border-slate-200">
                <p className="text-5xl font-bold mb-2 text-green-600">{certifications.length}</p>
                <p className="text-slate-700 font-semibold">Total Certifications</p>
              </div>
              <div className="p-6 bg-white rounded-lg border border-slate-200">
                <p className="text-5xl font-bold mb-2 text-green-600">
                  {new Set(certifications.map(c => c.issuer)).size}
                </p>
                <p className="text-slate-700 font-semibold">Certification Providers</p>
              </div>
              <div className="p-6 bg-white rounded-lg border border-slate-200">
                <p className="text-5xl font-bold mb-2 text-green-600">
                  {new Date().getFullYear() - Math.min(...certifications.map(c => {
                    const year = c.date.includes('-') 
                      ? new Date(c.date).getFullYear() 
                      : parseInt(c.date);
                    return year;
                  }))}+
                </p>
                <p className="text-slate-700 font-semibold">Years of Learning</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
