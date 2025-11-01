// Certifications Data - Managed through Admin Panel

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  description?: string;
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
      description: "Completed comprehensive course covering supervised learning, unsupervised learning, and best practices in machine learning"
    },
    {
      id: 2,
      name: "AWS Certified Solutions Architect - Associate",
      issuer: "Amazon Web Services",
      date: "2024-03",
      credentialUrl: "https://aws.amazon.com/verification",
      description: "Demonstrated expertise in designing distributed systems on AWS"
    },
    {
      id: 3,
      name: "Deep Learning Specialization",
      issuer: "Coursera (deeplearning.ai)",
      date: "2024-01",
      credentialUrl: "https://coursera.org/verify/...",
      description: "Mastered deep learning fundamentals including neural networks, CNNs, RNNs, and transformers"
    },
    {
      id: 4,
      name: "Full Stack Web Development",
      issuer: "Udemy",
      date: "2023-11",
      credentialUrl: "https://udemy.com/certificate/...",
      description: "Comprehensive training in modern web development with React, Node.js, and databases"
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
