# 🌟 Portfolio Website - Sahaswari Samoda

A modern, professional portfolio website built with React, TypeScript, and Tailwind CSS. Showcasing AI/ML projects, software development skills, and professional experience.

![Portfolio Screenshot](public/screenshot.png)

## 🚀 Features

- ✨ **Modern UI/UX** - Clean, professional design with smooth animations
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🎨 **Dark Mode Ready** - Easy to add dark mode support
- ⚡ **Fast Performance** - Optimized with Vite
- 🔍 **SEO Friendly** - Proper meta tags and structure
- 📧 **Contact Form** - Integrated email functionality
- 🎯 **Project Showcase** - Dynamic project filtering and cards
- 💼 **Professional Sections** - About, Skills, Experience, Education, Certifications

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 with TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Icons:** React Icons
- **Animations:** Framer Motion
- **Build Tool:** Vite
- **Deployment:** Vercel

## 📦 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio/my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 📝 Customization

### 1. Update Personal Information

Edit `src/data/personalInfo.ts` with your details:

```typescript
export const personalInfo = {
  name: "Your Name",
  email: "your.email@example.com",
  phone: "+94 XX XXX XXXX",
  location: "Your Location",
  
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    // ... other social links
  },
  
  about: {
    description: "Your bio...",
    interests: ["Your", "Interests"],
  },
};
```

### 2. Add Your Projects

Update `src/data/projects.ts`:

```typescript
export const projects: Project[] = [
  {
    id: 1,
    title: "Your Project Title",
    category: "AI/ML",
    description: "Project description",
    technologies: ["Python", "TensorFlow"],
    githubUrl: "https://github.com/...",
    featured: true,
    // ...
  },
];
```

### 3. Update Skills

Modify skills in `src/data/personalInfo.ts`:

```typescript
export const skills = {
  programming: [
    { name: "Python", level: 90 },
    // ...
  ],
  // ...
};
```

### 4. Add Resume

Place your resume PDF in the `public` folder as `resume.pdf`

### 5. Setup Email Service (Contact Form)

Choose one of these options:

**Option A: EmailJS (Recommended)**

1. Sign up at [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create email service and template
3. Update `src/utils/emails.ts` with your credentials
4. Uncomment the EmailJS code

**Option B: Formspree (Easiest)**

1. Sign up at [https://formspree.io/](https://formspree.io/)
2. Get your form endpoint
3. Use `sendEmailViaFormspree` in `Contact.tsx`

**Option C: Custom Backend**

1. Create Node.js backend with nodemailer
2. Deploy to Vercel/Railway
3. Update API endpoint in `emails.ts`

## 🚀 Deployment to Vercel

### Method 1: Vercel Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `my-portfolio`
   - Click "Deploy"

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd my-portfolio
   vercel
   ```

4. **For production deployment**
   ```bash
   vercel --prod
   ```

### Vercel Configuration

Create `vercel.json` in the `my-portfolio` folder:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## 📁 Project Structure

```
my-portfolio/
├── public/              # Static assets
│   ├── resume.pdf       # Your resume
│   └── projects/        # Project images
├── src/
│   ├── components/      # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   └── ProjectCard.tsx
│   ├── pages/          # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Blog.tsx
│   │   └── Contact.tsx
│   ├── data/           # Data files
│   │   ├── personalInfo.ts
│   │   └── projects.ts
│   ├── utils/          # Utility functions
│   │   └── emails.ts
│   ├── styles/         # Global styles
│   │   └── globals.css
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🎨 Adding Project Images

1. Create a `projects` folder in the `public` directory
2. Add your project images (e.g., `project1.jpg`, `project2.png`)
3. Reference them in `projects.ts`:

```typescript
image: "/projects/your-project.jpg"
```

## 📱 SEO & Meta Tags

Update `index.html` with your information:

```html
<title>Your Name - Portfolio</title>
<meta name="description" content="Your description">
<meta property="og:title" content="Your Name - Portfolio">
<!-- Add more meta tags -->
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Custom Domain (Optional)

1. **Purchase domain** from Namecheap, GoDaddy, etc.
2. **Add to Vercel:**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

## 📊 Analytics (Optional)

Add Google Analytics or Vercel Analytics:

1. **Vercel Analytics:**
   ```bash
   npm install @vercel/analytics
   ```

2. **Add to App.tsx:**
   ```typescript
   import { Analytics } from '@vercel/analytics/react';
   
   function App() {
     return (
       <>
         {/* Your app */}
         <Analytics />
       </>
     );
   }
   ```

## 🐛 Troubleshooting

### Build Errors

- Clear node_modules: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist`

### Routing Issues

- Ensure `vercel.json` has proper rewrites for SPA routing

### Images Not Loading

- Check image paths (use `/` prefix for public folder)
- Verify images exist in `public` folder

## 📄 License

MIT License - Feel free to use this template for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Contact

Have questions? Reach out:

- Email: your.email@example.com
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourusername)
- GitHub: [Your GitHub](https://github.com/yourusername)

## ⭐ Show Your Support

If you found this helpful, please give it a ⭐!

---

Made with ❤️ by [Your Name](https://yourportfolio.com)
