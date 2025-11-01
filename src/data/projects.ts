// Projects Data - Update with your actual projects

export interface Project {
  id: number;
  title: string;
  category: "AI/ML" | "Web Development" | "Mobile" | "Data Science" | "Other";
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  featured: boolean;
  date: string;
}

// Load projects from localStorage or use defaults
export const getProjects = (): Project[] => {
  const saved = localStorage.getItem('portfolioProjects');
  if (saved) {
    return JSON.parse(saved);
  }
  return projects;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "AI-Powered Image Classification System",
    category: "AI/ML",
    description: "Deep learning model for multi-class image classification using CNN architecture with 95% accuracy.",
    longDescription: "Built a convolutional neural network using TensorFlow and Keras to classify images across 10 different categories. Implemented data augmentation techniques, transfer learning with ResNet50, and achieved 95% validation accuracy. The model was deployed as a REST API using Flask and Docker.",
    image: "/projects/image-classification.jpg", // Add actual images to public/projects folder
    technologies: ["Python", "TensorFlow", "Keras", "Flask", "Docker", "OpenCV"],
    githubUrl: "https://github.com/yourusername/image-classification",
    demoUrl: "https://demo-link.com",
    featured: true,
    date: "2024-09"
  },
  {
    id: 2,
    title: "Sentiment Analysis Dashboard",
    category: "AI/ML",
    description: "Real-time sentiment analysis tool for social media posts using NLP and machine learning.",
    longDescription: "Developed a full-stack application that analyzes sentiment from Twitter posts in real-time. Used BERT for text classification, React for the frontend, and Node.js for the backend. Implemented data visualization using Chart.js to display sentiment trends over time.",
    image: "/projects/sentiment-analysis.jpg",
    technologies: ["Python", "BERT", "React", "Node.js", "MongoDB", "Chart.js"],
    githubUrl: "https://github.com/yourusername/sentiment-analysis",
    liveUrl: "https://sentiment-app.vercel.app",
    featured: true,
    date: "2024-07"
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "Full-stack e-commerce platform with payment integration and admin dashboard.",
    longDescription: "Built a complete e-commerce solution with user authentication, product management, shopping cart, order tracking, and payment gateway integration. Implemented responsive design with Tailwind CSS and state management with Redux.",
    image: "/projects/ecommerce.jpg",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Redux", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://ecommerce-demo.vercel.app",
    featured: true,
    date: "2024-05"
  },
  {
    id: 4,
    title: "Predictive Maintenance System",
    category: "Data Science",
    description: "Machine learning model to predict equipment failures using IoT sensor data.",
    longDescription: "Developed a predictive maintenance solution for industrial equipment using Random Forest and LSTM models. Processed time-series data from IoT sensors, performed feature engineering, and achieved 88% accuracy in predicting failures 24 hours in advance.",
    image: "/projects/predictive-maintenance.jpg",
    technologies: ["Python", "Scikit-learn", "Pandas", "LSTM", "PostgreSQL", "Matplotlib"],
    githubUrl: "https://github.com/yourusername/predictive-maintenance",
    featured: false,
    date: "2024-03"
  },
  {
    id: 5,
    title: "Task Management Application",
    category: "Web Development",
    description: "Collaborative task management tool with real-time updates and team features.",
    longDescription: "Created a Trello-like application with drag-and-drop functionality, real-time collaboration using Socket.io, user authentication, and project management features. Implemented RESTful API with comprehensive testing.",
    image: "/projects/task-management.jpg",
    technologies: ["React", "Node.js", "Socket.io", "PostgreSQL", "JWT", "Material-UI"],
    githubUrl: "https://github.com/yourusername/task-management",
    liveUrl: "https://task-app.vercel.app",
    featured: false,
    date: "2024-01"
  },
  {
    id: 6,
    title: "Chatbot with NLP",
    category: "AI/ML",
    description: "Intelligent chatbot using natural language processing for customer support.",
    longDescription: "Built an AI-powered chatbot capable of understanding user intent and providing relevant responses. Implemented using transformer models, integrated with a knowledge base, and deployed as a web widget that can be embedded in any website.",
    image: "/projects/chatbot.jpg",
    technologies: ["Python", "Transformers", "FastAPI", "React", "Redis", "Docker"],
    githubUrl: "https://github.com/yourusername/chatbot",
    demoUrl: "https://chatbot-demo.vercel.app",
    featured: true,
    date: "2023-11"
  },
  {
    id: 7,
    title: "Stock Price Prediction",
    category: "Data Science",
    description: "LSTM-based model for predicting stock prices using historical data and technical indicators.",
    longDescription: "Developed a deep learning model using LSTM networks to predict stock prices. Collected historical data from financial APIs, performed feature engineering with technical indicators (RSI, MACD, etc.), and built an interactive dashboard for visualizing predictions.",
    image: "/projects/stock-prediction.jpg",
    technologies: ["Python", "TensorFlow", "Keras", "Pandas", "Plotly", "Streamlit"],
    githubUrl: "https://github.com/yourusername/stock-prediction",
    featured: false,
    date: "2023-09"
  },
  {
    id: 8,
    title: "Weather Forecast App",
    category: "Web Development",
    description: "Mobile-responsive weather application with location-based forecasts and historical data.",
    longDescription: "Created a weather forecast application that provides current weather, 7-day forecasts, and weather maps. Integrated with OpenWeather API, implemented geolocation, and added features like favorite locations and weather alerts.",
    image: "/projects/weather-app.jpg",
    technologies: ["React", "TypeScript", "OpenWeather API", "Tailwind CSS", "Chart.js"],
    githubUrl: "https://github.com/yourusername/weather-app",
    liveUrl: "https://weather-app.vercel.app",
    featured: false,
    date: "2023-07"
  }
];

// Filter functions for project categories
export const getProjectsByCategory = (category: string) => {
  const allProjects = getProjects();
  if (category === "All") return allProjects;
  return allProjects.filter(project => project.category === category);
};

export const getFeaturedProjects = () => {
  const allProjects = getProjects();
  return allProjects.filter(project => project.featured);
};

export const getProjectById = (id: number) => {
  const allProjects = getProjects();
  return allProjects.find(project => project.id === id);
};
