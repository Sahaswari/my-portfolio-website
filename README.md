# 🌟 Professional Portfolio Website

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/yourusername/portfolio)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Showcasing projects in AI/ML and Software Development.

**Live Demo:** [https://your-portfolio.vercel.app](https://your-portfolio.vercel.app)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:5173`

---

## ✨ Features

- 📱 Fully responsive design
- ⚡ Fast performance with Vite
- 🎨 Tailwind CSS styling
- 📊 Project showcase with filtering
- 💼 Skills visualization
- 📧 Working contact form
- 🔄 GitHub Actions CI/CD
- 🌐 Vercel deployment ready

---

## 🛠️ Tech Stack

**Frontend:** React 19, TypeScript, Tailwind CSS, React Router v6  
**Build:** Vite, ESLint  
**Deployment:** Vercel, GitHub Actions  

---

## 📝 Customization Guide

### 1. Update Your Information

Edit `src/data/personalInfo.ts`:
```typescript
export const personalInfo = {
  name: "Your Name",
  email: "your.email@example.com",
  // ... your details
};
```

### 2. Add Your Projects

Edit `src/data/projects.ts`:
```typescript
export const projects: Project[] = [
  {
    id: 1,
    title: "Your Project",
    // ... project details
  },
];
```

### 3. Add Resume & Images

- Place resume: `public/resume.pdf`
- Add project images: `public/projects/`

---

## 🚀 Deployment

### Deploy to Vercel (Easiest)

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy! 🎉

**Automatic deployments** on every push to `main`.

### Using GitHub Actions

See detailed setup in [`GITHUB_VERCEL_GUIDE.md`](GITHUB_VERCEL_GUIDE.md)

---

## 📚 Documentation

- **[GITHUB_VERCEL_GUIDE.md](GITHUB_VERCEL_GUIDE.md)** - GitHub & Vercel deployment
- **[STEP_BY_STEP_GUIDE.md](STEP_BY_STEP_GUIDE.md)** - Beginner walkthrough
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Deployment details
- **[PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)** - Full documentation
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick commands

---

## 📧 Contact Form Setup

Choose an email service:

- **Formspree** (easiest) - [formspree.io](https://formspree.io)
- **EmailJS** - [emailjs.com](https://www.emailjs.com)

Instructions in [`STEP_BY_STEP_GUIDE.md`](STEP_BY_STEP_GUIDE.md)

---

## 🎨 Customization

### Colors
Edit `tailwind.config.js`

### Components
All components in `src/components/`

### Pages
All pages in `src/pages/`

---

## 📄 License

MIT License - Feel free to use for your own portfolio!

---

## 📫 Contact

**Your Name**  
Portfolio: [https://your-portfolio.vercel.app](https://your-portfolio.vercel.app)  
GitHub: [@yourusername](https://github.com/yourusername)  
LinkedIn: [Your Profile](https://linkedin.com/in/yourusername)  

---

**Built with ❤️ using React + TypeScript + Vite**

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
