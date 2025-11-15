import { useState, useEffect } from "react";
import { FaCertificate, FaExternalLinkAlt, FaCalendar, FaBuilding, FaBrain, FaDatabase, FaCloud, FaCode, FaStar, FaTrophy, FaHandsHelping, FaUsers, FaLanguage } from "react-icons/fa";
import { getCertifications, type Certification } from "../data/certifications";
import { getAchievements, type Achievement } from "../data/achievements";

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'certifications' | 'achievements'>('certifications');
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
    const loadData = async () => {
      const [certsData, achievementsData] = await Promise.all([
        getCertifications(),
        getAchievements()
      ]);
      setCertifications(certsData);
      setAchievements(achievementsData);
      setLoading(false);
    };
    loadData();
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-sky-50">
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

      {/* Main Tabs - Certifications vs Achievements */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-10 shadow-sm">
        <div className="container mx-auto px-6 md:px-20">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('certifications')}
              className={`px-8 py-4 font-semibold text-lg transition-all duration-300 border-b-4 ${
                activeTab === 'certifications'
                  ? 'border-green-600 text-green-700 bg-green-50'
                  : 'border-transparent text-slate-600 hover:text-green-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <FaCertificate />
                <span>Certifications</span>
                <span className="ml-2 px-2.5 py-0.5 bg-green-100 text-green-700 text-sm rounded-full font-bold">
                  {certifications.length}
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-8 py-4 font-semibold text-lg transition-all duration-300 border-b-4 ${
                activeTab === 'achievements'
                  ? 'border-yellow-600 text-yellow-700 bg-yellow-50'
                  : 'border-transparent text-slate-600 hover:text-yellow-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <FaTrophy />
                <span>Achievements</span>
                <span className="ml-2 px-2.5 py-0.5 bg-yellow-100 text-yellow-700 text-sm rounded-full font-bold">
                  {achievements.length}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs - Only show for certifications */}
      {activeTab === 'certifications' && (
        <div className="bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-6 md:px-20 py-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Filter by Category</h2>
            <p className="text-slate-600 text-sm">Browse certifications by area of expertise</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const count = category.id === 'All' 
                ? certifications.length 
                : certifications.filter(cert => cert.category === category.id).length;
              
              // Hide category if count is 0 (except "All")
              if (count === 0 && category.id !== 'All') {
                return null;
              }
              
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transform scale-105 ring-2 ring-green-400 ring-offset-2'
                      : 'bg-white text-slate-700 hover:bg-green-50 border-2 border-slate-200 hover:border-green-300 hover:shadow-md'
                  }`}
                >
                  <Icon className={`text-lg ${activeCategory === category.id ? 'animate-pulse' : ''}`} />
                  <span className="text-sm">{category.label}</span>
                  <span className={`ml-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    activeCategory === category.id
                      ? 'bg-white/25 text-white'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      )}

      {/* Certifications List */}
      {activeTab === 'certifications' && (
        <div className="container mx-auto px-6 md:px-20 py-12">
          {filteredCertifications.length === 0 ? (
          <div className="text-center py-24 bg-gradient-to-br from-slate-50 to-green-50 rounded-2xl shadow-xl border border-green-100">
            <div className="inline-block p-8 bg-gradient-to-br from-green-100 to-green-50 rounded-full mb-6 shadow-inner">
              <FaCertificate className="text-7xl text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              {activeCategory === 'All' ? 'No Certifications Yet' : `No Certifications in ${activeCategory}`}
            </h2>
            <p className="text-slate-600 text-lg font-medium mb-6">
              {activeCategory === 'All' ? 'Check back later for updates!' : 'Try selecting a different category'}
            </p>
            {activeCategory !== 'All' && (
              <button
                onClick={() => setActiveCategory('All')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <FaStar />
                View All Certifications
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {filteredCertifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-xl shadow-lg p-8 md:p-10 border-2 border-green-100 hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                  {/* Certificate Image */}
                  {cert.image && (
                    <div className="w-full md:w-64 flex-shrink-0">
                      <img 
                        src={cert.image} 
                        alt={cert.name} 
                        className="w-full h-auto rounded-lg shadow-md" 
                      />
                    </div>
                  )}
                  
                  {/* Certificate Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-green-700 mb-1">{cert.name}</h3>
                        <p className="text-lg text-slate-800 font-semibold flex items-center gap-2">
                          <FaBuilding className="text-green-600" />
                          {cert.issuer}
                        </p>
                      </div>
                      <span className="px-3 py-1.5 bg-green-100 text-green-700 text-sm font-semibold rounded-full border border-green-200">
                        {cert.category}
                      </span>
                    </div>
                    
                    {/* Date */}
                    <p className="text-slate-600 text-sm mb-3 flex items-center gap-2">
                      <FaCalendar className="text-green-600" />
                      <span className="font-medium">
                        {cert.date.includes('-') 
                          ? new Date(cert.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long',
                              day: 'numeric'
                            })
                          : cert.date}
                      </span>
                    </p>
                    
                    {/* Description */}
                    {cert.description && (
                      <p className="text-slate-700 text-sm leading-relaxed">{cert.description}</p>
                    )}
                    
                    {/* Credential Info */}
                    {cert.credentialUrl && cert.credentialUrl.trim() !== '' && (
                      <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <FaCertificate className="text-green-600" />
                          <span className="text-sm font-semibold text-green-900">Credential Information</span>
                        </div>
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={cert.credentialUrl}
                          aria-label={`Open credential link: ${cert.credentialUrl}`}
                          className="text-sm text-green-700 hover:text-green-800 font-medium inline-flex items-center gap-2"
                        >
                          <span className="underline">Credentials</span>
                          <FaExternalLinkAlt className="text-xs" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Credential Action Button */}
                {cert.credentialUrl && cert.credentialUrl.trim() !== '' && (
                  <div className="flex justify-end pt-4 border-t border-slate-200">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                      <span>Verify Credential</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {certifications.length > 0 && (
          <div className="mt-20 bg-gradient-to-br from-slate-50 to-green-50 rounded-2xl p-10 shadow-xl border border-green-100">
            <div className="text-center mb-10">
              <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
                <FaTrophy className="text-3xl text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Achievement Statistics</h3>
              <p className="text-slate-600">My Learning Journey in Numbers</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 group">
                <div className="inline-block p-3 bg-green-50 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <FaCertificate className="text-2xl text-green-600" />
                </div>
                <p className="text-4xl font-bold mb-3 text-green-600 group-hover:scale-110 transition-transform">
                  {certifications.length}
                </p>
                <p className="text-slate-700 font-semibold">Total Certifications</p>
                <p className="text-slate-500 text-xs mt-2">Verified achievements</p>
              </div>
              
              <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 group">
                <div className="inline-block p-3 bg-green-50 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <FaBuilding className="text-2xl text-green-600" />
                </div>
                <p className="text-4xl font-bold mb-3 text-green-600 group-hover:scale-110 transition-transform">
                  {new Set(certifications.map(c => c.issuer)).size}
                </p>
                <p className="text-slate-700 font-semibold">Certification Providers</p>
                <p className="text-slate-500 text-xs mt-2">Trusted institutions</p>
              </div>
              
              <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 group">
                <div className="inline-block p-3 bg-green-50 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <FaCalendar className="text-2xl text-green-600" />
                </div>
                <p className="text-4xl font-bold mb-3 text-green-600 group-hover:scale-110 transition-transform">
                  {new Date().getFullYear() - Math.min(...certifications.map(c => {
                    const year = c.date.includes('-') 
                      ? new Date(c.date).getFullYear() 
                      : parseInt(c.date);
                    return year;
                  }))}+
                </p>
                <p className="text-slate-700 font-semibold">Years of Learning</p>
                <p className="text-slate-500 text-xs mt-2">Continuous growth</p>
              </div>
            </div>
          </div>
        )}
        </div>
      )}

      {/* Achievements List */}
      {activeTab === 'achievements' && (
        <div className="container mx-auto px-6 md:px-20 py-12">
          {achievements.length === 0 ? (
            <div className="text-center py-24 bg-gradient-to-br from-slate-50 to-yellow-50 rounded-2xl shadow-xl border border-yellow-100">
              <div className="inline-block p-8 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-full mb-6 shadow-inner">
                <FaTrophy className="text-7xl text-yellow-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">No Achievements Yet</h2>
              <p className="text-slate-600 text-lg font-medium">Check back later for updates!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="bg-white rounded-xl shadow-lg p-8 md:p-10 border-2 border-yellow-100 hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    {/* Achievement Image */}
                    {achievement.image && (
                      <div className="w-full md:w-64 flex-shrink-0">
                        <img 
                          src={achievement.image} 
                          alt={achievement.title} 
                          className="w-full h-auto rounded-lg shadow-md" 
                        />
                      </div>
                    )}
                    
                    {!achievement.image && achievement.icon && (
                      <div className="w-24 h-24 flex-shrink-0 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <span className="text-5xl">{achievement.icon}</span>
                      </div>
                    )}
                    
                    {/* Achievement Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-yellow-700 mb-1">{achievement.title}</h3>
                          {achievement.type && (
                            <span className="px-3 py-1.5 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-full border border-yellow-200 inline-block">
                              {achievement.type.charAt(0).toUpperCase() + achievement.type.slice(1)}
                            </span>
                          )}
                        </div>
                        <FaTrophy className="text-yellow-500 text-3xl flex-shrink-0" />
                      </div>
                      
                      {/* Date */}
                      <p className="text-slate-600 text-sm mb-3 flex items-center gap-2">
                        <FaCalendar className="text-yellow-600" />
                        <span className="font-medium">
                          {achievement.date.includes('-') 
                            ? new Date(achievement.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long',
                                day: 'numeric'
                              })
                            : achievement.date}
                        </span>
                      </p>
                      
                      {/* Description */}
                      {achievement.description && (
                        <p className="text-slate-700 text-sm leading-relaxed">{achievement.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
