// Volunteering Data - Managed through Admin Panel

export interface VolunteeringEvent {
  name: string;
  date: string;
  description: string;
  role: string;
  impact: string;
  image?: string;
}

export interface Volunteering {
  id: number;
  role: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  logo?: string;
  image?: string;
  events: VolunteeringEvent[];
  achievements: string[];
}

// Load volunteering data from database API or localStorage fallback
export const getVolunteering = async (): Promise<Volunteering[]> => {
  try {
    const response = await fetch('/api/volunteering');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching volunteering from API:', error);
  }
  
  // Fallback to localStorage
  const saved = localStorage.getItem('portfolioVolunteering');
  if (saved) {
    return JSON.parse(saved);
  }
  
  // Default volunteering data
  const defaultVolunteering: Volunteering[] = [
    {
      id: 1,
      role: "Secretary",
      organization: "IEEE Women in Engineering (WIE)",
      location: "University of Ruhuna",
      period: "2023 - Present",
      description: "Serving as Secretary of WIE, coordinating events, managing communications, and empowering women in engineering through various technical and professional development programs.",
      logo: "🎯",
      events: [
        {
          name: "WIE Technical Workshop Series",
          date: "2024",
          description: "Organized a series of technical workshops on AI/ML and software development, attracting 100+ participants.",
          role: "Lead Organizer",
          impact: "100+ participants"
        },
        {
          name: "Women in Tech Conference",
          date: "2024",
          description: "Coordinated annual conference featuring industry speakers and networking sessions for women engineers.",
          role: "Event Coordinator",
          impact: "150+ attendees"
        }
      ],
      achievements: [
        "Successfully organized 5 major events with 500+ total participants",
        "Increased WIE membership by 40% during tenure",
        "Established partnerships with 3 tech companies for sponsorships"
      ]
    }
  ];
  
  // Save defaults to localStorage
  localStorage.setItem('portfolioVolunteering', JSON.stringify(defaultVolunteering));
  return defaultVolunteering;
};
