// Personal Information - Update this with your actual information
export const personalInfo = {
  name: "Sahaswari Samoda",
  title: "Computer Engineering Student",
  subtitle: "AI/ML & Software Developer",
  location: "University of Ruhuna, Sri Lanka",
  email: "your.email@example.com", // Update with your email
  phone: "+94 XX XXX XXXX", // Update with your phone
  
  // Social Links - Update with your actual profiles
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername", // Optional
    medium: "https://medium.com/@yourusername", // Optional for blog
    portfolio: "https://yourportfolio.vercel.app",
  },

  // About Me
  about: {
    description: `I'm a passionate Computer Engineering student at the University of Ruhuna, specializing in AI/ML and Software Development. I love building intelligent systems that solve real-world problems and create meaningful impact. With a strong foundation in both theoretical concepts and practical implementation, I'm constantly exploring cutting-edge technologies and their applications.`,
    
    interests: [
      "Machine Learning & Deep Learning",
      "Computer Vision",
      "Natural Language Processing",
      "Full-Stack Development",
      "Cloud Computing",
      "Data Science & Analytics"
    ],
    
    currentFocus: "Currently seeking opportunities in AI/ML Engineering and Software Development roles where I can contribute to innovative projects and continue growing as a developer."
  },

  // Resume
  resumeUrl: "/resume.pdf", // Place your resume in public folder
};

// Skills Data
export const skills = {
  programming: [
    { name: "Python", level: 90, icon: "SiPython" },
    { name: "JavaScript/TypeScript", level: 85, icon: "SiTypescript" },
    { name: "Java", level: 80, icon: "SiJava" },
    { name: "C/C++", level: 75, icon: "SiCplusplus" },
    { name: "SQL", level: 80, icon: "SiMysql" },
  ],
  
  aiml: [
    { name: "TensorFlow", level: 85, icon: "SiTensorflow" },
    { name: "PyTorch", level: 80, icon: "SiPytorch" },
    { name: "Scikit-learn", level: 85, icon: "SiScikitlearn" },
    { name: "Keras", level: 80, icon: "SiKeras" },
    { name: "OpenCV", level: 75, icon: "SiOpencv" },
    { name: "Pandas/NumPy", level: 90, icon: "SiPandas" },
  ],
  
  webDev: [
    { name: "React.js", level: 85, icon: "SiReact" },
    { name: "Node.js", level: 80, icon: "SiNodedotjs" },
    { name: "Express.js", level: 80, icon: "SiExpress" },
    { name: "MongoDB", level: 75, icon: "SiMongodb" },
    { name: "PostgreSQL", level: 75, icon: "SiPostgresql" },
    { name: "Tailwind CSS", level: 90, icon: "SiTailwindcss" },
  ],
  
  tools: [
    { name: "Git & GitHub", level: 85, icon: "SiGit" },
    { name: "Docker", level: 70, icon: "SiDocker" },
    { name: "VS Code", level: 90, icon: "SiVisualstudiocode" },
    { name: "Jupyter", level: 85, icon: "SiJupyter" },
    { name: "Postman", level: 80, icon: "SiPostman" },
    { name: "AWS/Azure", level: 65, icon: "SiAmazonaws" },
  ],
};

// Education
export const education = [
  {
    degree: "B.Sc. in Computer Engineering",
    institution: "University of Ruhuna",
    location: "Matara, Sri Lanka",
    period: "2021 - Present", // Update with your actual years
    description: "Specialized in AI/ML, Software Engineering, and Computer Systems. Relevant coursework includes Machine Learning, Deep Learning, Data Structures, Algorithms, Database Systems, and Software Engineering.",
    gpa: "3.X/4.0", // Update with your GPA
    achievements: [
      "Dean's List (if applicable)",
      "Relevant project or achievement",
    ]
  },
  // Add more education if needed (e.g., A-levels, certifications)
];

// Experience (Include internships, projects, volunteer work)
export const experience = [
  {
    title: "AI/ML Intern", // Update with actual experience
    company: "Company Name",
    location: "Location",
    period: "Month Year - Month Year",
    type: "Internship",
    description: [
      "Developed machine learning models for [specific task]",
      "Implemented data preprocessing pipelines",
      "Collaborated with team on [specific project]",
    ],
    technologies: ["Python", "TensorFlow", "Pandas", "Scikit-learn"]
  },
  // Add more experiences
  {
    title: "Freelance Developer",
    company: "Self-Employed",
    location: "Remote",
    period: "2023 - Present",
    type: "Freelance",
    description: [
      "Built web applications for clients using React and Node.js",
      "Developed machine learning solutions for data analysis",
      "Provided technical consulting services",
    ],
    technologies: ["React", "Node.js", "Python", "MongoDB"]
  }
];

// Certifications
export const certifications = [
  {
    name: "Machine Learning Specialization",
    issuer: "Coursera (Stanford University)",
    date: "2023",
    credentialUrl: "https://coursera.org/verify/...",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialUrl: "https://aws.amazon.com/...",
  },
  // Add your actual certifications
];
