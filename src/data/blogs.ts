// Blogs Data - Managed through Admin Panel

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  image: string;
  readTime: string;
}

// Load blogs from localStorage or use defaults
export const getBlogs = (): BlogPost[] => {
  const saved = localStorage.getItem('portfolioBlogs');
  if (saved) {
    return JSON.parse(saved);
  }
  
  // Default blogs
  const defaultBlogs: BlogPost[] = [
    {
      id: 1,
      title: "Getting Started with Machine Learning",
      excerpt: "A comprehensive guide to starting your journey in machine learning and AI",
      content: `# Getting Started with Machine Learning

Machine learning is transforming the way we solve problems and build intelligent systems. In this post, I'll share my journey and tips for beginners.

## What is Machine Learning?

Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.

## Key Concepts

1. **Supervised Learning**: Learning from labeled data
2. **Unsupervised Learning**: Finding patterns in unlabeled data
3. **Reinforcement Learning**: Learning through trial and error

## Getting Started

Start with Python and libraries like scikit-learn, TensorFlow, and PyTorch. Practice with datasets from Kaggle and work on small projects.

Remember, consistency is key! Happy learning!`,
      author: "Sahaswari Samoda",
      date: "2024-10-15",
      tags: ["Machine Learning", "AI", "Tutorial", "Beginners"],
      image: "/blog/ml-intro.jpg",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Building Scalable Web Applications",
      excerpt: "Best practices for developing modern, scalable web applications",
      content: `# Building Scalable Web Applications

Learn the essential principles and practices for building web applications that can scale to millions of users.

## Architecture Patterns

- Microservices
- Serverless
- Event-driven architecture

## Key Technologies

- React/Vue for frontend
- Node.js/Python for backend
- MongoDB/PostgreSQL for databases
- Redis for caching
- Docker & Kubernetes for deployment

## Performance Optimization

Focus on code splitting, lazy loading, CDN usage, and efficient database queries.`,
      author: "Sahaswari Samoda",
      date: "2024-10-01",
      tags: ["Web Development", "Scalability", "Architecture"],
      image: "/blog/web-scalability.jpg",
      readTime: "10 min read"
    },
    {
      id: 3,
      title: "Deep Dive into Neural Networks",
      excerpt: "Understanding the fundamentals of neural networks and deep learning",
      content: `# Deep Dive into Neural Networks

Neural networks are the backbone of modern AI. Let's explore how they work and how to build them.

## What are Neural Networks?

Inspired by the human brain, neural networks consist of interconnected nodes that process and learn from data.

## Types of Neural Networks

1. **Feedforward Neural Networks**: Basic architecture
2. **Convolutional Neural Networks (CNNs)**: For image processing
3. **Recurrent Neural Networks (RNNs)**: For sequence data
4. **Transformers**: State-of-the-art for NLP

## Practical Implementation

We'll use TensorFlow and Keras to build a simple image classifier. Code examples included!`,
      author: "Sahaswari Samoda",
      date: "2024-09-20",
      tags: ["Deep Learning", "Neural Networks", "AI"],
      image: "/blog/neural-networks.jpg",
      readTime: "12 min read"
    }
  ];
  
  // Save defaults to localStorage
  localStorage.setItem('portfolioBlogs', JSON.stringify(defaultBlogs));
  return defaultBlogs;
};

export const getBlogById = (id: number): BlogPost | undefined => {
  const blogs = getBlogs();
  return blogs.find(blog => blog.id === id);
};

export const getBlogsByTag = (tag: string): BlogPost[] => {
  const blogs = getBlogs();
  return blogs.filter(blog => blog.tags.includes(tag));
};
