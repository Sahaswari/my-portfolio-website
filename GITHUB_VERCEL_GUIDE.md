# 🚀 GitHub & Vercel Deployment Guide

Complete guide for setting up your portfolio with GitHub and deploying to Vercel using GitHub Actions.

---

## 📋 Table of Contents

1. [Setup GitHub Repository](#setup-github-repository)
2. [Configure Vercel](#configure-vercel)
3. [Setup GitHub Actions](#setup-github-actions)
4. [Manual Deployment](#manual-deployment)
5. [Automatic Deployment](#automatic-deployment)
6. [Environment Variables](#environment-variables)
7. [Custom Domain](#custom-domain)
8. [Troubleshooting](#troubleshooting)

---

## 🔧 Setup GitHub Repository

### Step 1: Initialize Git Repository

```bash
cd "f:\University of Ruhuna\Uni_Project\profile_website\my-portfolio"
git init
git add .
git commit -m "Initial commit: Portfolio website"
```

### Step 2: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `portfolio` (or any name you prefer)
3. Description: "My professional portfolio website"
4. Set to **Public** (so recruiters can see your code)
5. **Don't** add README, .gitignore, or license (already have them)
6. Click **Create repository**

### Step 3: Connect Local to GitHub

```bash
# Replace 'yourusername' with your GitHub username
git remote add origin https://github.com/yourusername/portfolio.git
git branch -M main
git push -u origin main
```

### Step 4: Verify

- Visit your repository on GitHub
- You should see all your files
- Check that `.gitignore` is working (no `node_modules/` or `dist/` folder)

---

## ☁️ Configure Vercel

### Method 1: Automatic Deployment (Easiest)

#### Step 1: Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** → Choose **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub

#### Step 2: Import Your Repository

1. Click **"Add New..."** → **"Project"**
2. Find your `portfolio` repository
3. Click **"Import"**

#### Step 3: Configure Project

```
Framework Preset: Vite
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

4. Click **"Deploy"**
5. Wait 2-3 minutes ⏳
6. **Done!** 🎉 Your site is live!

#### Step 4: Get Your URLs

You'll get:
- **Production URL:** `https://your-portfolio.vercel.app`
- **Preview URLs:** Automatic for each commit

---

### Method 2: Using Vercel CLI

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login

```bash
vercel login
```

#### Step 3: Deploy

```bash
cd "f:\University of Ruhuna\Uni_Project\profile_website\my-portfolio"
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? **Your account**
- Link to existing project? **N**
- What's your project's name? **portfolio**
- In which directory is your code located? **.**

#### Step 4: Deploy to Production

```bash
vercel --prod
```

---

## 🤖 Setup GitHub Actions (Automatic Deployment)

### Option A: Let Vercel Handle It (Recommended)

**This is the easiest option!** Vercel automatically deploys when you push to GitHub.

✅ **What happens:**
- Push code to GitHub
- Vercel detects changes
- Automatically builds and deploys
- Get deployment URL in GitHub commits

✅ **No configuration needed!** It just works.

---

### Option B: GitHub Actions with Vercel

**Use this if you want more control over the deployment process.**

#### Step 1: Get Vercel Credentials

1. **Get Vercel Token:**
   - Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - Click **"Create"**
   - Name: `GitHub Actions`
   - Scope: **Full Account**
   - Click **"Create Token"**
   - **Copy the token** (you'll only see it once!)

2. **Get Project IDs:**
   ```bash
   cd "f:\University of Ruhuna\Uni_Project\profile_website\my-portfolio"
   vercel link
   ```
   
   Then get the IDs:
   ```bash
   # Windows PowerShell
   Get-Content .vercel/project.json
   
   # OR use Git Bash / WSL
   cat .vercel/project.json
   ```
   
   Copy the values for:
   - `orgId` (this is your VERCEL_ORG_ID)
   - `projectId` (this is your VERCEL_PROJECT_ID)

#### Step 2: Add Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**

Add these three secrets:

| Name | Value |
|------|-------|
| `VERCEL_TOKEN` | Your Vercel token from Step 1 |
| `VERCEL_ORG_ID` | Your orgId from project.json |
| `VERCEL_PROJECT_ID` | Your projectId from project.json |

#### Step 3: GitHub Actions Workflows

**You already have 2 workflows:**

1. **`.github/workflows/ci.yml`** - Builds and tests on every push
2. **`.github/workflows/deploy.yml`** - Deploys to Vercel

These will automatically run when you push to GitHub!

#### Step 4: Test the Workflow

```bash
git add .
git commit -m "Setup GitHub Actions for Vercel deployment"
git push
```

Then:
1. Go to your repository
2. Click **"Actions"** tab
3. You'll see the workflows running
4. Wait for ✅ green checkmark
5. Your site is deployed!

---

## 🔄 Workflow Behavior

### What Happens on Push:

```
1. You push code to GitHub
   ↓
2. CI workflow runs (builds & tests)
   ↓
3. Deploy workflow runs (deploys to Vercel)
   ↓
4. Vercel builds your site
   ↓
5. Site goes live automatically
   ↓
6. You get a deployment URL
```

### Branch Strategy:

- **`main` branch** → Production deployment
- **`develop` branch** → Development/preview deployment
- **Pull requests** → Preview deployments

---

## 📦 Deployment Commands

### Quick Reference:

```bash
# Push changes (triggers auto-deployment)
git add .
git commit -m "Your message"
git push

# Manual Vercel deployment
vercel --prod

# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Rollback to previous deployment
vercel rollback [deployment-url]
```

---

## 🌍 Environment Variables

### If You Need Environment Variables:

#### In Vercel Dashboard:

1. Go to your project in Vercel
2. **Settings** → **Environment Variables**
3. Add variables:
   - Name: `VITE_API_URL`
   - Value: `https://api.example.com`
   - Environment: **Production**, **Preview**, **Development**
4. Click **Save**

#### In GitHub Actions:

Add to `.github/workflows/deploy.yml`:

```yaml
env:
  VITE_API_URL: ${{ secrets.API_URL }}
```

Then add `API_URL` to GitHub secrets.

---

## 🔗 Custom Domain

### Add Your Own Domain:

#### Step 1: Purchase Domain

Buy from:
- [Namecheap](https://www.namecheap.com)
- [GoDaddy](https://www.godaddy.com)
- [Google Domains](https://domains.google)

#### Step 2: Add to Vercel

1. Go to your Vercel project
2. **Settings** → **Domains**
3. Click **"Add"**
4. Enter your domain: `yourdomain.com`
5. Click **"Add"**

#### Step 3: Configure DNS

Vercel will show you the DNS records to add:

**Option A: Using Nameservers (Easiest)**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Option B: Using A Record**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### Step 4: Wait for DNS Propagation

- Usually takes 5-60 minutes
- Can take up to 48 hours
- Check status in Vercel dashboard

---

## 🐛 Troubleshooting

### Issue: GitHub Actions Failing

**Error: `secrets.VERCEL_TOKEN not found`**

**Solution:**
- Check you added secrets in repository Settings → Secrets and variables → Actions
- Secret names must match exactly (case-sensitive)
- Re-add the secrets if needed

**Error: `vercel: command not found`**

**Solution:**
The workflow installs Vercel CLI automatically. If issue persists:
- Check the `deploy.yml` file has `npm install --global vercel@latest`

### Issue: Build Failing on Vercel

**Error: `Cannot find module`**

**Solution:**
```bash
# Make sure all dependencies are in package.json
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

**Error: `Build exceeded maximum time`**

**Solution:**
- Check for infinite loops in code
- Optimize large dependencies
- Contact Vercel support for time limit increase

### Issue: Site Not Updating

**Problem:** Pushed changes but site still shows old version

**Solution:**
1. Check Vercel deployment status
2. Clear browser cache (Ctrl+Shift+R)
3. Check if deployment succeeded in Vercel dashboard
4. Try `vercel --prod --force` for manual deploy

### Issue: 404 on Page Refresh

**Problem:** Routes work when clicking links, but 404 on refresh

**Solution:**
Already fixed! Your `vercel.json` has the correct rewrites:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Issue: Images Not Loading

**Problem:** Images work locally but not on Vercel

**Solution:**
- Check images are in `public/` folder
- Use absolute paths: `/image.jpg` not `./image.jpg`
- Verify files were committed to git
- Image names are case-sensitive on Vercel

---

## ✅ Post-Deployment Checklist

After successful deployment:

- [ ] Test all pages work
- [ ] Test on mobile device
- [ ] Test contact form
- [ ] Check all links work
- [ ] Verify images load
- [ ] Test navigation
- [ ] Check console for errors
- [ ] Test in different browsers (Chrome, Firefox, Safari)
- [ ] Share URL with friends for feedback
- [ ] Add URL to resume
- [ ] Update LinkedIn profile
- [ ] Share on social media

---

## 🎯 Best Practices

### Git Workflow:

```bash
# 1. Create feature branch
git checkout -b feature/new-project

# 2. Make changes and commit
git add .
git commit -m "Add new project to portfolio"

# 3. Push to GitHub
git push origin feature/new-project

# 4. Create Pull Request on GitHub

# 5. After review, merge to main

# 6. Automatic deployment to production!
```

### Commit Message Guidelines:

```bash
# Good commit messages:
git commit -m "Add machine learning project to portfolio"
git commit -m "Update skills section with Python and TensorFlow"
git commit -m "Fix responsive design on mobile devices"

# Bad commit messages:
git commit -m "update"
git commit -m "fix"
git commit -m "changes"
```

### Branching Strategy:

```
main        → Production (always deployable)
develop     → Development (testing new features)
feature/*   → New features
bugfix/*    → Bug fixes
hotfix/*    → Urgent production fixes
```

---

## 📊 Monitoring

### Check Deployment Status:

1. **Vercel Dashboard:**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - See all deployments
   - View logs and errors

2. **GitHub Actions:**
   - Go to your repository
   - Click "Actions" tab
   - See workflow runs

3. **Command Line:**
   ```bash
   vercel ls
   vercel inspect [deployment-url]
   ```

### View Logs:

```bash
# Recent deployments
vercel ls

# Deployment logs
vercel logs [deployment-url]

# Real-time logs
vercel logs --follow
```

---

## 🔐 Security Best Practices

### What to Keep Private:

- ❌ Never commit `.env` files
- ❌ Never commit API keys
- ❌ Never commit passwords
- ❌ Never commit personal sensitive data

### What's Safe to Share:

- ✅ Source code (it's your portfolio!)
- ✅ Public information (name, public email)
- ✅ Project descriptions
- ✅ Technical skills

### Use Environment Variables For:

- API keys
- Database credentials
- Third-party service tokens
- Private configuration

---

## 🚀 Quick Start Commands

```bash
# Setup Git
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main

# Deploy to Vercel (if using CLI)
vercel --prod

# Update and deploy
git add .
git commit -m "Update portfolio"
git push  # Auto-deploys if Vercel is connected!
```

---

## 📈 Analytics (Optional)

### Add Vercel Analytics:

1. Go to your Vercel project
2. Click **Analytics** tab
3. Enable analytics
4. No code changes needed!

### Or Add Google Analytics:

```bash
npm install @types/gtag.js
```

Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🎉 You're All Set!

Your portfolio now has:

✅ **Version Control** with Git
✅ **Code Hosting** on GitHub  
✅ **Automatic Deployment** to Vercel
✅ **CI/CD Pipeline** with GitHub Actions
✅ **Production URL** for your portfolio
✅ **Preview Deployments** for testing

### What Happens Now:

1. You make changes locally
2. Commit and push to GitHub
3. GitHub Actions runs
4. Vercel automatically deploys
5. Your site updates in 2-3 minutes!

---

## 📚 Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

## 💡 Pro Tips

1. **Commit Often** - Small, frequent commits are better than large ones
2. **Write Good Messages** - Describe what and why, not how
3. **Test Before Push** - Run `npm run build` locally first
4. **Use Branches** - Keep main branch clean
5. **Review Deployments** - Check Vercel logs after each deploy
6. **Monitor Performance** - Use Vercel Analytics
7. **Keep Updated** - Pull latest changes before starting work

---

**Need Help?** Check the Actions tab in your repository for deployment status and logs!

🚀 **Happy Deploying!**
