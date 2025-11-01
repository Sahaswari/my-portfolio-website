# 📋 Step-by-Step Guide: Building & Deploying Your Portfolio

## 🎯 Overview

This guide will walk you through every step to customize and deploy your professional portfolio website to Vercel.

---

## ✅ Phase 1: Customize Your Content (30 minutes)

### Step 1: Update Personal Information

1. Open `src/data/personalInfo.ts`
2. Replace all placeholder data with your actual information:
   - Name, email, phone, location
   - Social media links (GitHub, LinkedIn, Twitter, etc.)
   - About me description
   - Interests and skills

**Example:**
```typescript
export const personalInfo = {
  name: "Sahaswari Samoda",
  email: "sahaswari@example.com",
  phone: "+94 77 123 4567",
  location: "University of Ruhuna, Sri Lanka",
  // ... continue with your actual data
};
```

### Step 2: Add Your Projects

1. Open `src/data/projects.ts`
2. Replace the example projects with your actual projects
3. For each project, include:
   - Title, description, category
   - Technologies used
   - GitHub URL, live demo URL (if available)
   - Mark featured projects with `featured: true`

**Tips:**
- Add at least 3-6 projects
- Include both AI/ML and software development projects
- Use descriptive titles and detailed descriptions

### Step 3: Update Skills

1. In `src/data/personalInfo.ts`, find the `skills` section
2. Update each skill category with YOUR actual skills
3. Rate your proficiency level (0-100) honestly

### Step 4: Add Education & Experience

1. In `src/data/personalInfo.ts`, update:
   - `education` array with your academic background
   - `experience` array with internships, projects, or work
   - `certifications` array with any certifications

### Step 5: Add Your Resume

1. Export your resume as PDF
2. Rename it to `resume.pdf`
3. Place it in the `my-portfolio/public/` folder

---

## 🎨 Phase 2: Add Project Images (15 minutes)

### Step 1: Prepare Images

1. Create screenshots of your projects
2. Resize images to approximately 800x600px (recommended)
3. Use formats: JPG or PNG
4. Optimize images using tools like TinyPNG

### Step 2: Add Images to Project

1. Create a `projects` folder inside `my-portfolio/public/`
2. Name your images descriptively: `image-classification.jpg`, `chatbot.png`, etc.
3. Update image paths in `projects.ts`:

```typescript
image: "/projects/your-project-image.jpg"
```

**Note:** If you don't have images yet, the cards will display a gradient placeholder with the first letter of your project name.

---

## 📧 Phase 3: Setup Contact Form (20 minutes)

Choose ONE of these methods:

### Method A: Formspree (Easiest - Recommended for Beginners)

1. Go to [https://formspree.io](https://formspree.io)
2. Sign up for a free account
3. Click "New Form"
4. Copy your form endpoint URL (looks like: `https://formspree.io/f/xyzabc123`)
5. Open `src/pages/Contact.tsx`
6. Find line 4 and change it to:
   ```typescript
   import { sendEmailViaFormspree } from "../utils/emails";
   ```
7. Find line 25 and change it to:
   ```typescript
   await sendEmailViaFormspree(formData);
   ```
8. Open `src/utils/emails.ts`
9. Find `FORMSPREE_ENDPOINT` and replace with your endpoint
10. Test it locally!

### Method B: EmailJS (More Features)

1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Sign up and add an email service (Gmail recommended)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Open `src/utils/emails.ts`
6. Uncomment the EmailJS code (remove `/*` and `*/`)
7. Replace the placeholder credentials with yours
8. Test it!

---

## 🚀 Phase 4: Test Locally (10 minutes)

### Step 1: Install Dependencies

```bash
cd "f:\University of Ruhuna\Uni_Project\profile_website\my-portfolio"
npm install
```

### Step 2: Run Development Server

```bash
npm run dev
```

### Step 3: Test Everything

1. Open http://localhost:5173
2. Navigate through all pages
3. Test responsive design (use browser dev tools)
4. Test contact form
5. Check all links work
6. Verify project cards display correctly

### Step 4: Fix Any Issues

- Check browser console for errors
- Verify all images load
- Test navigation on mobile view

---

## 🌐 Phase 5: Deploy to Vercel (15 minutes)

### Step 1: Create GitHub Repository

1. Go to [https://github.com](https://github.com)
2. Click "New repository"
3. Name it: `portfolio` or `portfolio-website`
4. Keep it Public
5. DON'T initialize with README (we have one)
6. Click "Create repository"

### Step 2: Push Your Code

Open terminal in your project:

```bash
cd "f:\University of Ruhuna\Uni_Project\profile_website"
git init
git add .
git commit -m "Initial commit: Professional portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username!

### Step 3: Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click "Sign Up" and use your GitHub account
3. After login, click "Add New..." → "Project"
4. You'll see your repositories - select your `portfolio` repo
5. **Important:** Set "Root Directory" to `my-portfolio`
6. Framework Preset: Vite (should auto-detect)
7. Click "Deploy"
8. Wait 2-3 minutes for deployment
9. 🎉 Your site is live!

### Step 4: Get Your URL

1. Vercel will give you a URL like: `your-portfolio-xyz.vercel.app`
2. Visit it and test everything
3. Share this URL on your resume, LinkedIn, GitHub!

---

## 🎨 Phase 6: Optional Customizations

### Add Custom Domain

1. Purchase domain from Namecheap or GoDaddy
2. In Vercel: Project Settings → Domains
3. Add your custom domain
4. Update DNS records as instructed

### Add Analytics

```bash
cd my-portfolio
npm install @vercel/analytics
```

Add to `src/App.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

// Inside your App component return:
<>
  {/* existing code */}
  <Analytics />
</>
```

### Customize Colors

Edit `tailwind.config.js` to change the color scheme.

---

## 🐛 Troubleshooting

### "Module not found" errors

```bash
cd my-portfolio
rm -rf node_modules
rm package-lock.json
npm install
```

### Images not showing

- Check image paths start with `/`
- Verify images are in `public/projects/` folder
- Check file names match exactly (case-sensitive)

### Contact form not working

- Check you've updated the email service credentials
- Test locally first before deploying
- Check browser console for errors

### Build fails on Vercel

- Check all imports are correct
- Verify `vercel.json` root directory is set to `my-portfolio`
- Check build logs in Vercel dashboard

### TypeScript errors

- Run `npm run build` locally to see errors
- Most common: unused imports or wrong types
- Fix errors shown in terminal

---

## 📝 Maintenance & Updates

### Updating Your Site

1. Make changes locally
2. Test with `npm run dev`
3. Commit and push:
   ```bash
   git add .
   git commit -m "Update: Added new project"
   git push
   ```
4. Vercel automatically redeploys!

### Adding New Projects

1. Add project data in `src/data/projects.ts`
2. Add project image in `public/projects/`
3. Test locally, then push to GitHub

### Updating Resume

1. Replace `public/resume.pdf` with new version
2. Keep filename as `resume.pdf`
3. Push to GitHub

---

## 🎯 Next Steps After Deployment

### 1. Update Your Profiles

Add your portfolio URL to:
- ✅ GitHub profile README
- ✅ LinkedIn "Website" field
- ✅ Resume/CV
- ✅ Email signature
- ✅ Twitter/X bio
- ✅ University student portal (if applicable)

### 2. SEO Optimization

- Update `index.html` meta tags
- Add Google Analytics
- Submit to Google Search Console

### 3. Content Updates

- Keep projects updated
- Add blog posts regularly
- Update skills as you learn

### 4. Networking

- Share on LinkedIn
- Tweet about your journey
- Show to professors and mentors
- Include in job applications

---

## 📞 Need Help?

If you encounter issues:

1. Check the error message carefully
2. Search the error on Google/Stack Overflow
3. Check GitHub issues in similar projects
4. Ask in developer communities (Reddit r/webdev, Dev.to)

---

## 🎉 Congratulations!

You've successfully built and deployed your professional portfolio! This is a huge achievement and will significantly help in your job search.

### Remember:

- Keep your portfolio updated
- Add new projects regularly
- Maintain clean, bug-free code
- Test on multiple devices
- Share it proudly!

**Good luck with your job search in AI/ML and Software Development!** 🚀

---

Made with ❤️ by GitHub Copilot
