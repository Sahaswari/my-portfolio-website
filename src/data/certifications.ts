// Certifications Data - Managed through Admin Panel

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  description?: string;
  category?: string; // Category for filtering: AI/ML, Data Science, Cloud, Web Development, etc.
}

// Load certifications from localStorage or use defaults
export const getCertifications = (): Certification[] => {
  const saved = localStorage.getItem('portfolioCertifications');
  if (saved) {
    return JSON.parse(saved);
  }
  
  // Default certifications
  const defaultCertifications: Certification[] = [
    {
      id: 1,
      name: "Machine Learning Specialization",
      issuer: "Coursera (Stanford University)",
      date: "2024-05",
      credentialUrl: "https://coursera.org/verify/...",
      description: "Completed comprehensive course covering supervised learning, unsupervised learning, and best practices in machine learning",
      category: "AI/ML"
    },
    {
      id: 2,
      name: "AWS Certified Solutions Architect - Associate",
      issuer: "Amazon Web Services",
      date: "2024-03",
      credentialUrl: "https://aws.amazon.com/verification",
      description: "Demonstrated expertise in designing distributed systems on AWS",
      category: "Cloud"
    },
    {
      id: 3,
      name: "Deep Learning Specialization",
      issuer: "Coursera (deeplearning.ai)",
      date: "2024-01",
      credentialUrl: "https://coursera.org/verify/...",
      description: "Mastered deep learning fundamentals including neural networks, CNNs, RNNs, and transformers",
      category: "AI/ML"
    },
    {
      id: 4,
      name: "Full Stack Web Development",
      issuer: "Udemy",
      date: "2023-11",
      credentialUrl: "https://udemy.com/certificate/...",
      description: "Comprehensive training in modern web development with React, Node.js, and databases",
      category: "Web Development"
    },
    {
      id: 5,
      name: "Best Leadership Award",
      issuer: "IEEE Student Branch - University of Ruhuna",
      date: "2024-08",
      credentialUrl: "",
      description: "Recognized for outstanding leadership in organizing technical events and managing team activities",
      category: "Achievements"
    },
    {
      id: 6,
      name: "Leadership and Team Management Certificate",
      issuer: "Coursera (University of Michigan)",
      date: "2024-06",
      credentialUrl: "https://coursera.org/verify/...",
      description: "Completed comprehensive course on team leadership, conflict resolution, and project management",
      category: "Leadership"
    },
    {
      id: 7,
      name: "IEEE WIE Volunteering Certificate",
      issuer: "IEEE Women in Engineering",
      date: "2024-02",
      credentialUrl: "",
      description: "Certificate of appreciation for volunteering and organizing 5+ technical events for women in engineering",
      category: "Volunteering"
    },
    {
      id: 8,
      name: "English Communication Skills Certificate",
      issuer: "British Council",
      date: "2023-09",
      credentialUrl: "",
      description: "Advanced level certificate in business English communication and presentation skills",
      category: "Language"
    },
    {
      id: 9,
      name: "Hackathon Winner - AI Innovation Challenge",
      issuer: "TechFest 2024",
      date: "2024-04",
      credentialUrl: "",
      description: "First place in AI/ML category for developing an innovative computer vision solution",
      category: "Achievements"
    },
    {
      id: 10,
      name: "Event Coordinator Certificate",
      issuer: "University of Ruhuna - Engineering Faculty",
      date: "2023-12",
      credentialUrl: "",
      description: "Successfully coordinated and managed 3+ large-scale technical workshops with 100+ participants",
      category: "Leadership"
    }
  ];
  
  // Save defaults to localStorage
  localStorage.setItem('portfolioCertifications', JSON.stringify(defaultCertifications));
  return defaultCertifications;
};

export const getCertificationById = (id: number): Certification | undefined => {
  const certifications = getCertifications();
  return certifications.find(cert => cert.id === id);
};
