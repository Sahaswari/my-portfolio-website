// Personal Information - Update this with your actual information
export const personalInfo = {
  name: "Sahaswari Senanayaka",
  title: "B.Sc.Eng. in Computer Engineering Undergraduate",
  subtitle: "Former Software Engineer and Former AI/ML & Software Engineer Intern",
  location: "Faculty of Engineering, University of Ruhuna, Sri Lanka",
  email: "sahaswari.samoda.com", 
  phone: "+94 76 344 6348/ +94 75 344 6348",
  
  // Social Links - Update with your actual profiles
  social: {
    github: "https://github.com/Sahaswari",
    linkedin: "https://linkedin.com/in/sahaswari-senanayaka-3b3bb8211",
    medium: "https://medium.com/@smsahaswari", 
    portfolio: "https://yourportfolio.vercel.app",
    facebook: "https://facebook.com/sahaswari.senanayaka/",
    youtube: "https://twitter.com/yourusername",
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
    { name: "Php", level: 80, icon: "Php" },
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
  
  softSkills: [
    { name: "Leadership & Team Management", level: 90, icon: "FaUsers" },
    { name: "Communication & Presentation", level: 85, icon: "FaComments" },
    { name: "Problem Solving & Critical Thinking", level: 90, icon: "FaBrain" },
    { name: "Project Management", level: 80, icon: "FaTasks" },
    { name: "Time Management & Organization", level: 85, icon: "FaClock" },
    { name: "Adaptability & Flexibility", level: 88, icon: "FaSyncAlt" },
    { name: "Mentoring & Coaching", level: 82, icon: "FaChalkboardTeacher" },
    { name: "Event Planning & Coordination", level: 85, icon: "FaCalendarCheck" },
  ],
};

// Education
export const education = [
  {
    degree: "B.Sc.Eng. in Computer Engineering",
    institution: "Faculty of Engineering-University of Ruhuna",
    location: "Galle, Sri Lanka",
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
    title: "AI/ML/Software Engineering Intern", // Update with actual experience
    company: "Apps Technologies Pvt Ltd",
    location: "Nugegoda",
    period: "May 2024 - November 2024",
    type: "Internship",
    description: [
      "Developed machine learning models for [specific task]",
      "Implemented data preprocessing pipelines",
      "Collaborated with team on [specific project]",
    ],
    technologies: ["Php-Laravel","Python", "TensorFlow", "Pandas", "Scikit-learn"]
  },
  // Add more experiences
  {
    title: "Associate Software Engineer",
    company: "Apps Technologies Pvt Ltd",
    location: "Remote",
    period: "November 2024 - February 2025",
    description: [
      "Built web applications for clients using React and Node.js",
      "Developed machine learning solutions for data analysis",
      "Provided technical consulting services",
    ],
    technologies: ["Php-Laravel", "React", "Node.js", "Python", "MySQL"]
  }
];

// Volunteering Experience
export const volunteering = [
  {
    role: "Secretary",
    organization: "IEEE Women in Engineering (WIE)",
    location: "University of Ruhuna",
    period: "2023 - Present", // Update with your actual period
    description: "Serving as Secretary of WIE, coordinating events, managing communications, and empowering women in engineering through various technical and professional development programs.",
    logo: "🎯", // You can replace with actual logo path
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
      },
      {
        name: "Career Development Seminar",
        date: "2024",
        description: "Facilitated career guidance sessions with industry professionals for engineering students.",
        role: "Program Manager",
        impact: "80+ students"
      },
      {
        name: "Mentorship Program Launch",
        date: "2023",
        description: "Established mentorship program connecting senior women engineers with undergraduate students.",
        role: "Co-founder",
        impact: "50+ mentor-mentee pairs"
      },
      {
        name: "Engineering Outreach Initiative",
        date: "2023",
        description: "Conducted STEM outreach programs in local schools to inspire young women to pursue engineering.",
        role: "Outreach Coordinator",
        impact: "200+ school students"
      }
    ],
    achievements: [
      "Successfully organized 5 major events with 500+ total participants",
      "Increased WIE membership by 40% during tenure",
      "Established partnerships with 3 tech companies for sponsorships"
    ]
  },
  {
    role: "Editor",
    organization: "IEEE Student Branch",
    location: "University of Ruhuna",
    period: "2023 - Present", // Update with your actual period
    description: "Managing editorial content for IEEE publications, coordinating with writers, and ensuring high-quality technical articles and newsletters for the student community.",
    logo: "📝", // You can replace with actual logo path
    events: [
      {
        name: "Monthly Technical Newsletter",
        date: "2023 - Present",
        description: "Created and published monthly newsletters featuring technical articles, event highlights, and member achievements.",
        role: "Chief Editor",
        impact: "500+ readers monthly"
      },
      {
        name: "IEEE Blog Series Launch",
        date: "2024",
        description: "Launched a technical blog series featuring student research and project showcases.",
        role: "Content Manager",
        impact: "20+ published articles"
      },
      {
        name: "Annual Magazine Publication",
        date: "2024",
        description: "Coordinated the production of the annual IEEE student magazine with contributions from faculty and students.",
        role: "Lead Editor",
        impact: "200+ copies distributed"
      }
    ],
    achievements: [
      "Published 12+ monthly newsletters with consistent quality",
      "Increased newsletter readership by 60%",
      "Established editorial guidelines and style standards"
    ]
  },
  {
    role: "Webmaster",
    organization: "IEEE Student Branch",
    location: "University of Ruhuna",
    period: "2022 - Present", // Update with your actual period
    description: "Responsible for maintaining and updating the IEEE Student Branch website, implementing new features, and ensuring optimal user experience for the student community.",
    logo: "🌐", // You can replace with actual logo path
    events: [
      {
        name: "Website Redesign Project",
        date: "2023",
        description: "Led complete redesign of the IEEE Student Branch website with modern UI/UX and improved functionality.",
        role: "Lead Developer",
        impact: "3x increase in site visits"
      },
      {
        name: "Event Registration System",
        date: "2024",
        description: "Developed online event registration system streamlining the registration process for IEEE events.",
        role: "Full-Stack Developer",
        impact: "500+ registrations processed"
      },
      {
        name: "Member Portal Development",
        date: "2023",
        description: "Created member portal with authentication, profile management, and event tracking features.",
        role: "Backend Developer",
        impact: "300+ active users"
      }
    ],
    achievements: [
      "Improved website performance by 70% through optimization",
      "Implemented responsive design reaching 90% mobile users",
      "Reduced event registration time by 50% with automated system"
    ]
  },
  // Add more volunteering roles if you have any
];

// Certifications
export const certifications = [
  {
    id: 1,
    name: "Machine Learning Specialization",
    issuer: "Coursera (Stanford University)",
    date: "2023",
    credentialUrl: "https://coursera.org/verify/...",
    description: "Completed comprehensive course covering supervised and unsupervised learning"
  },
  {
    id: 2,
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialUrl: "https://aws.amazon.com/...",
    description: "Demonstrated cloud computing knowledge and skills"
  },
  // Add your actual certifications
];
