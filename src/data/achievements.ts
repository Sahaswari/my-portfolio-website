// Achievements Data - Managed through Admin Panel

export interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'award' | 'certification' | 'competition' | 'publication';
  icon: string;
}

// Load achievements from localStorage or use defaults
export const getAchievements = (): Achievement[] => {
  const saved = localStorage.getItem('portfolioAchievements');
  if (saved) {
    return JSON.parse(saved);
  }
  
  // Default achievements
  const defaultAchievements: Achievement[] = [
    {
      id: 1,
      title: "Dean's List",
      description: "Achieved Dean's List honors for academic excellence in Computer Engineering",
      date: "2024-06",
      type: "award",
      icon: "FiAward"
    },
    {
      id: 2,
      title: "AWS Certified Solutions Architect",
      description: "Successfully completed AWS Solutions Architect Associate certification",
      date: "2024-05",
      type: "certification",
      icon: "FiAward"
    },
    {
      id: 3,
      title: "Hackathon Winner",
      description: "First place in National AI Hackathon for innovative ML solution",
      date: "2024-03",
      type: "competition",
      icon: "FiAward"
    },
    {
      id: 4,
      title: "Research Publication",
      description: "Published paper on 'Deep Learning for Image Recognition' in IEEE conference",
      date: "2024-02",
      type: "publication",
      icon: "FiAward"
    }
  ];
  
  // Save defaults to localStorage
  localStorage.setItem('portfolioAchievements', JSON.stringify(defaultAchievements));
  return defaultAchievements;
};
