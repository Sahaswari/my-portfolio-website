# 🚀 How to Deploy Admin Panel Changes to Your Live Site

## 📌 Understanding the Problem

When you add content (projects, blogs, certifications, etc.) in the Admin panel:
- ✅ It's saved in your browser's **localStorage**
- ✅ You can see it on your **local website** (localhost:5173)
- ❌ But it's **NOT visible on the deployed site** (Vercel)

**Why?** Because localStorage is stored in YOUR browser only, not in the code or server.

## 🎯 Solution: Export → Update Code → Deploy

Follow these 3 simple steps to make your changes live:

---

## Step 1: Export Your Data (1 minute)

### In Admin Panel:

1. Go to `/admin` and login
2. Click **"Export Data"** button (green button in header)
3. A JSON file will download: `portfolio-data-2024-11-11.json`

This file contains ALL your content:
- Projects
- Blogs
- Certifications
- Achievements
- Volunteering

---

## Step 2: Update Your Code Files (3 minutes)

You have **2 options**:

### Option A: Manual Update (Recommended for understanding)

Open the downloaded JSON file and copy data to your code files:

#### Update Projects:
```typescript
// In src/data/projects.ts
export const projects: Project[] = [
  // Copy your projects array from JSON file here
  {
    id: 1,
    title: "Your Project Title",
    // ... rest of project data
  },
  // ... more projects
];
```

#### Update Blogs:
```typescript
// In src/data/blogs.ts
export const blogs: BlogPost[] = [
  // Copy your blogs array from JSON file here
];
```

#### Update Certifications:
```typescript
// In src/data/certifications.ts
export const certifications: Certification[] = [
  // Copy your certifications array from JSON file here
];
```

#### Update Achievements:
```typescript
// In src/data/achievements.ts
export const achievements: Achievement[] = [
  // Copy your achievements array from JSON file here
];
```

#### Update Volunteering:
```typescript
// In src/data/volunteering.ts
export const volunteeringRoles: Volunteering[] = [
  // Copy your volunteering array from JSON file here
];
```

### Option B: Use Import Feature (Coming Soon)

For now, manual update is the most reliable method.

---

## Step 3: Deploy to Vercel (5 minutes)

### A. Commit Changes to Git

```bash
cd f:\University of Ruhuna\Uni_Project\profile_website\my-portfolio

# Add all changes
git add .

# Commit with descriptive message
git commit -m "chore: update portfolio content from admin panel"

# Push to GitHub
git push origin dev
```

### B. Merge to Master (if needed)

If you're on `dev` branch:

```bash
# Switch to master
git checkout master

# Merge dev into master
git merge dev

# Push to GitHub
git push origin master
```

### C. Automatic Deployment

Once pushed to `master`/`main`:
- ✅ GitHub Actions automatically triggers
- ✅ Vercel builds and deploys
- ✅ Your changes go live in 2-3 minutes!

---

## 🔄 Complete Workflow Diagram

```
Admin Panel (localhost)
    ↓
Add Content (Projects, Blogs, etc.)
    ↓
Saved to localStorage (browser only)
    ↓
Click "Export Data" → Download JSON
    ↓
Copy data to src/data/*.ts files
    ↓
git add . && git commit -m "update content"
    ↓
git push origin master
    ↓
GitHub Actions triggered
    ↓
Vercel deploys automatically
    ↓
Live site updated! 🎉
```

---

## 📝 Detailed Example

### Scenario: You added 3 new projects in Admin panel

#### 1. Export Data
- Click "Export Data" in Admin panel
- File downloads: `portfolio-data-2024-11-11.json`

#### 2. Update projects.ts

Open the JSON file, find the `projects` array, copy it:

```json
{
  "projects": [
    {
      "id": 1,
      "title": "AI Image Classifier",
      "category": "AI/ML",
      "description": "...",
      ...
    },
    {
      "id": 2,
      "title": "E-commerce Website",
      ...
    }
  ]
}
```

Open `src/data/projects.ts` and replace the projects array:

```typescript
export const projects: Project[] = [
  {
    id: 1,
    title: "AI Image Classifier",
    category: "AI/ML",
    description: "...",
    // ... paste all your project data
  },
  // ... more projects
];
```

#### 3. Save and Deploy

```bash
git add src/data/projects.ts
git commit -m "feat: add 3 new AI/ML projects"
git push origin master
```

Wait 2-3 minutes → Check your live site! ✨

---

## 🖼️ Important: Handling Images

### Images Added via Admin Panel:

When you upload images in the Admin panel, they're converted to **base64** strings and stored in localStorage. This works locally but has limitations:

**Problems:**
- ❌ Very large file sizes in your JSON
- ❌ Slow loading on deployed site
- ❌ Not optimal for SEO

**Solution: Use Proper Image Hosting**

#### Option 1: Use Public Folder (Small Images)

1. Save your images to `/public/projects/` folder
2. Update the image paths in your data files:

```typescript
{
  id: 1,
  title: "My Project",
  images: ["/projects/project1-img1.jpg", "/projects/project1-img2.jpg"],
  // Instead of base64: "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

#### Option 2: Use Image Hosting Service (Recommended)

Upload images to:
- **Cloudinary** (free tier: 25GB)
- **ImgBB** (free)
- **GitHub** (in your repo)
- **Imgur** (free)

Then use the URLs:

```typescript
{
  id: 1,
  title: "My Project",
  images: [
    "https://res.cloudinary.com/yourname/image/upload/v1/project1.jpg",
    "https://i.imgur.com/abc123.jpg"
  ]
}
```

---

## 🔧 Troubleshooting

### Issue 1: Changes not showing on live site

**Check:**
1. Did you push to the correct branch? (master/main)
2. Did GitHub Actions run successfully?
3. Did Vercel deployment complete?
4. Clear browser cache: Ctrl + Shift + R

### Issue 2: Export button doesn't work

**Solution:**
- Check browser console (F12) for errors
- Try in different browser
- Manually copy from localStorage:
  ```javascript
  // In browser console (F12)
  console.log(localStorage.getItem('portfolioProjects'));
  ```

### Issue 3: Images not loading on deployed site

**Solution:**
- Base64 images are too large
- Use image hosting (see section above)
- Or place images in `/public` folder

### Issue 4: Git push fails

**Solution:**
```bash
# Pull latest changes first
git pull origin master

# Then push again
git push origin master
```

---

## 💡 Best Practices

### 1. Regular Exports
- Export data weekly as backup
- Keep JSON files organized by date
- Store in safe location (Google Drive, Dropbox)

### 2. Test Locally First
```bash
npm run build
npm run preview
```
Test the production build before deploying.

### 3. Use Descriptive Commit Messages
```bash
✅ git commit -m "feat: add 5 new AI/ML projects"
✅ git commit -m "chore: update certifications and achievements"
❌ git commit -m "update"
❌ git commit -m "changes"
```

### 4. Version Control
Create tags for major updates:
```bash
git tag -a v1.1.0 -m "Added 10 new projects and updated CV"
git push origin v1.1.0
```

### 5. Optimize Images
Before uploading:
- Resize to appropriate dimensions (max 1920px width)
- Compress using TinyPNG, Squoosh, or ImageOptim
- Use WebP format when possible
- Aim for <200KB per image

---

## 📊 Checklist: Before Deploying

- [ ] Exported data from Admin panel
- [ ] Updated all relevant data files in `src/data/`
- [ ] Tested locally with `npm run dev`
- [ ] Built successfully with `npm run build`
- [ ] Previewed with `npm run preview`
- [ ] Committed changes with clear message
- [ ] Pushed to correct branch (master/main)
- [ ] Checked GitHub Actions workflow
- [ ] Verified Vercel deployment status
- [ ] Tested live site
- [ ] Cleared browser cache and re-tested

---

## 🎓 Quick Reference Commands

```bash
# Check current branch
git branch

# Switch to master
git checkout master

# Export from dev branch
git checkout dev
# (Use Admin panel to export data)

# Switch back and merge
git checkout master
git merge dev

# Add all changes
git add .

# Commit
git commit -m "chore: update portfolio content"

# Push
git push origin master

# Check status
git status

# View recent commits
git log --oneline -5
```

---

## 🆘 Need Help?

If you encounter issues:

1. Check browser console for errors (F12)
2. Check GitHub Actions logs
3. Check Vercel deployment logs
4. Verify all files are committed: `git status`
5. Try deploying from a clean state

---

## ✅ Success Indicators

You'll know everything worked when:

✅ Git push successful
✅ GitHub Actions shows green checkmark
✅ Vercel deployment shows "Ready"
✅ Live site shows your new content
✅ No 404 errors for images
✅ All pages load correctly

---

**Remember:** Admin panel = Local changes only. To go live, you must export → update code → deploy!

🚀 **Now go update your live portfolio!**
