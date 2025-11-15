// Achievements Data - Managed through Admin Panel

export interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'award' | 'certification' | 'competition' | 'publication';
  icon?: string;
  image?: string;
}

// Load achievements from database API or localStorage fallback
export const getAchievements = async (): Promise<Achievement[]> => {
  try {
    const response = await fetch('/api/achievements');
    if (response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Achievements loaded from API:', data);
        return data;
      } else {
        console.warn('API returned non-JSON response (likely running on localhost)');
      }
    } else {
      console.warn('API response not OK:', response.status, response.statusText);
    }
  } catch {
    console.log('Using localStorage fallback (API not available on localhost)');
  }
  
  // Fallback to localStorage
  const saved = localStorage.getItem('portfolioAchievements');
  if (saved) {
    console.log('Loading achievements from localStorage');
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
      icon: "🏆"
    },
    {
      id: 2,
      title: "AWS Certified Solutions Architect",
      description: "Successfully completed AWS Solutions Architect Associate certification",
      date: "2024-05",
      type: "certification",
      icon: "🎓"
    },
    {
      id: 3,
      title: "Hackathon Winner",
      description: "First place in National AI Hackathon for innovative ML solution",
      date: "2024-03",
      type: "competition",
      icon: "🥇"
    },
    {
      id: 4,
      title: "Research Publication",
      description: "Published paper on 'Deep Learning for Image Recognition' in IEEE conference",
      date: "2024-02",
      type: "publication",
      icon: "📄"
    }
  ];
  
  // Save defaults to localStorage
  localStorage.setItem('portfolioAchievements', JSON.stringify(defaultAchievements));
  return defaultAchievements;
};
