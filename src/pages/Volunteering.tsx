import { useState, useEffect } from "react";
import { FaUsers, FaCalendarAlt } from "react-icons/fa";
import { getVolunteering, type Volunteering } from "../data/volunteering";

export default function VolunteeringPage() {
  const [volunteering, setVolunteering] = useState<Volunteering[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getVolunteering();
    setVolunteering(data);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-sky-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-900 text-white py-20 pt-28">
        <div className="container mx-auto px-6 md:px-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Volunteering & Leadership</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            Committed to empowering women in engineering and fostering inclusive tech communities
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-20 py-16">
        {volunteering.map((vol, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-8 md:p-10 border-2 border-green-100 mb-8 hover:shadow-2xl transition-shadow duration-300">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
              {vol.image && (
                <img src={vol.image} alt={vol.organization} className="w-full md:w-48 h-auto rounded-lg shadow-md" />
              )}
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-green-700 mb-1">{vol.role}</h3>
                    <p className="text-xl text-slate-800 font-semibold">{vol.organization}</p>
                  </div>
                  <span className="px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-full border border-green-200">
                    {vol.period}
                  </span>
                </div>
                <p className="text-slate-600 mb-2">{vol.location}</p>
                <p className="text-slate-700 leading-relaxed">{vol.description}</p>
              </div>
            </div>

            {/* Events Organized */}
            {vol.events && vol.events.length > 0 && (
            <div className="mb-8">
              <h4 className="text-xl font-bold text-green-700 mb-6 flex items-center gap-2">
                <FaCalendarAlt className="text-green-600" />
                Events Organized
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vol.events.map((event, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group border border-slate-200 hover:border-green-500">
                    {event.image && (
                      <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                        <img src={event.image} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    )}
                    <div className="p-6">
                      <h5 className="font-bold text-green-800 text-lg mb-1">{event.name}</h5>
                      <p className="text-sm text-green-600 font-semibold mb-3">{event.date}</p>
                      <p className="text-slate-700 text-sm mb-4 leading-relaxed">{event.description}</p>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold border border-green-200">
                          {event.role}
                        </span>
                        <span className="text-xs px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-semibold border border-yellow-200 flex items-center gap-1">
                          <FaUsers className="text-xs" />
                          {event.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            )}

            {/* Key Achievements */}
            {vol.achievements && vol.achievements.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl p-6 border-2 border-green-100">
              <h4 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                🏆 Key Achievements
              </h4>
              <ul className="space-y-2">
                {vol.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-800">
                    <span className="text-green-500 font-bold text-xl flex-shrink-0">✓</span>
                    <span className="font-medium">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
