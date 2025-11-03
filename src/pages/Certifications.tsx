import { useState, useEffect } from "react";
import { FaCertificate, FaExternalLinkAlt, FaCalendar, FaBuilding } from "react-icons/fa";
import { getCertifications, type Certification } from "../data/certifications";

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load certifications from admin panel
    const loadedCertifications = getCertifications();
    setCertifications(loadedCertifications);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading certifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 pt-28">
        <div className="container mx-auto px-6 md:px-20">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/20">
              PROFESSIONAL ACHIEVEMENTS
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Certifications & Achievements</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Professional certifications and achievements that demonstrate my expertise and commitment to continuous learning
          </p>
        </div>
      </section>

      {/* Certifications Grid */}
      <div className="container mx-auto px-6 md:px-20 py-16">
        {certifications.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-lg shadow-md border border-slate-200">
            <div className="inline-block p-6 bg-blue-50 rounded-full mb-6">
              <FaCertificate className="text-6xl text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No Certifications Yet</h2>
            <p className="text-slate-600 font-medium">Check back later for updates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-blue-500 group"
              >
                {/* Certificate Badge Header */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 text-center border-b border-slate-200">
                  <FaCertificate className="text-6xl text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-slate-900">{cert.name}</h3>
                </div>

                {/* Certificate Details */}
                <div className="p-6">
                  {/* Issuer */}
                  <div className="flex items-start gap-3 mb-4 p-3 bg-slate-50 rounded-md">
                    <FaBuilding className="text-blue-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-slate-500 font-medium mb-1">Issued By</p>
                      <p className="text-slate-900 font-semibold">{cert.issuer}</p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-start gap-3 mb-4 p-3 bg-slate-50 rounded-md">
                    <FaCalendar className="text-blue-600 text-xl flex-shrink-0 mt-1" />
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
                    <div className="mb-4 p-3 bg-slate-50 rounded-md border-l-2 border-blue-600">
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
                        className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 font-semibold text-sm px-5 py-2.5 rounded-md transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
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
                <p className="text-5xl font-bold mb-2 text-blue-600">{certifications.length}</p>
                <p className="text-slate-700 font-semibold">Total Certifications</p>
              </div>
              <div className="p-6 bg-white rounded-lg border border-slate-200">
                <p className="text-5xl font-bold mb-2 text-blue-600">
                  {new Set(certifications.map(c => c.issuer)).size}
                </p>
                <p className="text-slate-700 font-semibold">Certification Providers</p>
              </div>
              <div className="p-6 bg-white rounded-lg border border-slate-200">
                <p className="text-5xl font-bold mb-2 text-blue-600">
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
