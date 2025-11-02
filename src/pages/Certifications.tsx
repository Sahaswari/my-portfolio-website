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
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-neutral-400">Loading certifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6 md:px-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Certifications & Achievements</h1>
          <p className="text-xl text-neutral-300 max-w-3xl">
            Professional certifications and achievements that demonstrate my expertise and commitment to continuous learning
          </p>
        </div>
      </section>

      {/* Certifications Grid */}
      <div className="container mx-auto px-6 md:px-20 py-16">
        {certifications.length === 0 ? (
          <div className="text-center py-20">
            <FaCertificate className="text-6xl text-neutral-700 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-neutral-300 mb-2">No Certifications Yet</h2>
            <p className="text-neutral-500">Check back later for updates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-primary rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-neutral-800"
              >
                {/* Certificate Badge Header */}
                <div className="bg-accent p-6 text-center">
                  <FaCertificate className="text-6xl text-secondary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-secondary">{cert.name}</h3>
                </div>

                {/* Certificate Details */}
                <div className="p-6">
                  {/* Issuer */}
                  <div className="flex items-start gap-3 mb-4">
                    <FaBuilding className="text-accent text-xl flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-neutral-400 mb-1">Issued By</p>
                      <p className="text-white font-semibold">{cert.issuer}</p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-start gap-3 mb-4">
                    <FaCalendar className="text-accent text-xl flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-neutral-400 mb-1">Date Earned</p>
                      <p className="text-white font-semibold">
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
                    <div className="mb-4">
                      <p className="text-neutral-300 text-sm leading-relaxed">
                        {cert.description}
                      </p>
                    </div>
                  )}

                  {/* Credential Link */}
                  {cert.credentialUrl && (
                    <div className="mt-6 pt-4 border-t border-neutral-800">
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-accent hover:text-opacity-90 font-semibold text-sm transition-colors duration-200"
                      >
                        <FaExternalLinkAlt />
                        View Credential
                      </a>
                    </div>
                  )}
                </div>

                {/* Hover Effect Border */}
                <div className="h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {certifications.length > 0 && (
          <div className="mt-16 bg-primary rounded-xl p-8 text-white border border-neutral-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold mb-2 text-accent">{certifications.length}</p>
                <p className="text-neutral-300">Total Certifications</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2 text-accent">
                  {new Set(certifications.map(c => c.issuer)).size}
                </p>
                <p className="text-neutral-300">Certification Providers</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2 text-accent">
                  {new Date().getFullYear() - Math.min(...certifications.map(c => {
                    const year = c.date.includes('-') 
                      ? new Date(c.date).getFullYear() 
                      : parseInt(c.date);
                    return year;
                  }))}+
                </p>
                <p className="text-neutral-300">Years of Learning</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
