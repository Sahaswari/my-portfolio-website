# 🚀 Vercel Deployment Guide with GitHub Actions CI/CD

Complete guide to deploy your portfolio website to Vercel with automated CI/CD using GitHub Actions.

## � Overview

This guide covers:
- ✅ Vercel account setup and project configuration
- ✅ GitHub Actions CI/CD pipeline
- ✅ Environment variables configuration
- ✅ Automatic deployments on push
- ✅ Preview deployments for pull requests
- ✅ Custom domain setup (optional)

## 🛠️ Tech Stack

- **Frontend:** React 19 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **Email Service:** EmailJS
- **Deployment:** Vercel
- **CI/CD:** GitHub Actions

## 📦 Prerequisites

Before deployment, ensure you have:

- ✅ Node.js v18 or v20 installed
- ✅ GitHub account with repository
- ✅ Vercel account (free tier works)
- ✅ Code pushed to GitHub repository

## 🔧 Part 1: Vercel Account Setup

### Step 1.1: Create Vercel Account

1. Go to [https://vercel.com/signup](https://vercel.com/signup)
2. Sign up with your **GitHub account** (recommended)
3. Authorize Vercel to access your GitHub repositories

### Step 1.2: Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Select your repository from the list
3. Configure project settings:

```
Framework Preset: Vite
Root Directory: my-portfolio
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node.js Version: 20.x
```

### Step 1.3: Add Environment Variables in Vercel

In Vercel project dashboard → **Settings** → **Environment Variables**, add:

```env
VITE_ADMIN_USERNAME=your_admin_username
VITE_ADMIN_PASSWORD=your_secure_password
VITE_EMAILJS_SERVICE_ID=service_40tvlnl
VITE_EMAILJS_TEMPLATE_ID=template_vmja6g7
VITE_EMAILJS_PUBLIC_KEY=b2VhN1W3eMN3BIsmi
```

**⚠️ Important Security Notes:**
- Use strong passwords for production
- Never commit `.env` files to GitHub
- Keep your EmailJS credentials secure
- Rotate secrets periodically

## � Part 2: Get Vercel Credentials for GitHub Actions

### Step 2.1: Get Vercel Authentication Token

1. Go to [Vercel Account Settings → Tokens](https://vercel.com/account/tokens)
2. Click **"Create Token"**
3. Name it: `GitHub Actions Deploy`
4. Select scope: **Full Account**
5. Click **"Create"**
6. **⚠️ Copy the token immediately** (you won't see it again!)

Example token format: `vercel_abc123def456...`

### Step 2.2: Get Vercel Project IDs

#### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Navigate to your project folder
cd my-portfolio

# Link your project
vercel link

# This creates .vercel folder with project.json
```

#### Option B: From Vercel Dashboard

1. Go to your project in Vercel dashboard
2. Navigate to **Settings** → **General**
3. Find **Project ID** (e.g., `prj_xxxxxxxxxxxx`)
4. Find **Team ID** / **Org ID** in your account settings

Check `.vercel/project.json` for your IDs:

```json
{
  "orgId": "team_xxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxx"
}
```

**⚠️ Note:** The `.vercel` folder is in `.gitignore` - do not commit it!

## 🔐 Part 3: Configure GitHub Secrets

### Step 3.1: Add Secrets to GitHub

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add these **three secrets**:

| Secret Name | Value | Example Format |
|------------|-------|----------------|
| `VERCEL_TOKEN` | Token from Step 2.1 | `vercel_abc123...` |
| `VERCEL_ORG_ID` | orgId from `.vercel/project.json` | `team_xxxx` |
| `VERCEL_PROJECT_ID` | projectId from `.vercel/project.json` | `prj_xxxx` |

### Step 3.2: Verify Secrets

After adding, you should see three secrets listed:
- ✅ VERCEL_TOKEN
- ✅ VERCEL_ORG_ID  
- ✅ VERCEL_PROJECT_ID

**🔒 Security:** Secrets are encrypted and cannot be viewed after creation.

## ✅ Part 4: Verify CI/CD Setup

### Step 4.1: Check Workflow Files

Verify these files exist in your repository:

```
my-portfolio/
├── .github/
│   └── workflows/
│       ├── ci.yml        # ✅ Build and test
│       └── deploy.yml    # ✅ Deploy to Vercel
├── vercel.json           # ✅ Vercel config
├── .gitignore            # ✅ .env excluded
└── .env                  # ⚠️ LOCAL ONLY (not committed)
```

### Step 4.2: Test Deployment

1. Make a small change (e.g., update README)
2. Commit and push to `master` or `main`:

```bash
git add .
git commit -m "test: trigger CI/CD deployment"
git push origin master
```

3. Go to **GitHub Actions** tab in your repository
4. Watch two workflows run:
   - ✅ **CI - Build and Test** (runs on all branches)
   - ✅ **Deploy to Vercel** (runs on master/main)

5. Check deployment status in Vercel dashboard

## 🎯 How CI/CD Works

### Workflow Triggers

**Production Deployments:**
```
Push to master/main → GitHub Actions → Build → Deploy → Production URL
```

**Preview Deployments:**
```
Create Pull Request → GitHub Actions → Build → Deploy → Preview URL + PR Comment
```

### CI Workflow (ci.yml)

Runs on: `push` to any branch, `pull_request`

Steps:
1. ✅ Checkout code
2. ✅ Setup Node.js (18.x, 20.x matrix)
3. ✅ Install dependencies
4. ✅ Run linter
5. ✅ Build project
6. ✅ Upload dist/ artifacts

### CD Workflow (deploy.yml)

Runs on: `push` to `master`/`main`, `pull_request`

Steps:
1. ✅ Checkout code
2. ✅ Setup Node.js 20.x
3. ✅ Install Vercel CLI
4. ✅ Pull Vercel environment
5. ✅ Build with Vercel
6. ✅ Deploy to production/preview
7. ✅ Comment on PR with preview URL
8. ✅ Generate deployment summary

## � Monitoring Deployments

### In GitHub Actions

1. Go to **Actions** tab in your repository
2. Click on a workflow run
3. View detailed logs for each step
4. Check deployment summary at the bottom

**Success indicators:**
- ✅ Green checkmarks on all steps
- ✅ "Production: <URL>" in deploy step
- ✅ No red errors in logs

### In Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. View all deployments (production + previews)
4. Click on a deployment to see:
   - Build logs
   - Deployment URL
   - Performance metrics
   - Environment variables

## 🌐 Accessing Your Deployed Site

### Production URL

After successful deployment, your site will be live at:

```
https://your-project-name.vercel.app
```

### Preview URLs

Each pull request gets a unique preview URL:

```
https://your-project-name-git-feature-branch.vercel.app
```

Preview URLs are automatically commented on PRs by GitHub Actions!

## � Advanced Configuration

### Custom Domain Setup (Optional)

1. **Purchase a domain** from Namecheap, GoDaddy, etc.
2. **Add domain in Vercel:**
   - Go to Project → **Settings** → **Domains**
   - Click **"Add Domain"**
   - Enter your domain (e.g., `yourname.com`)
   - Follow DNS configuration instructions

3. **Configure DNS Records:**

For Namecheap/GoDaddy:
```
Type: A Record
Host: @
Value: 76.76.21.21

Type: CNAME
Host: www
Value: cname.vercel-dns.com
```

4. **Wait for propagation** (5-48 hours)
5. **SSL certificate** is automatically provisioned by Vercel

### Branch-Specific Deployments

Edit `.github/workflows/deploy.yml` to deploy specific branches:

```yaml
on:
  push:
    branches:
      - master
      - main
      - production   # Add more branches
      - staging      # Staging environment
```

### Deploy Only on Tags

For version-based deployments:

```yaml
on:
  push:
    tags:
      - 'v*'  # Deploy on version tags (v1.0.0, v2.0.0, etc.)
```

### Skip CI for Documentation Changes

Add `[skip ci]` to commit message:

```bash
git commit -m "docs: update README [skip ci]"
```

### Environment-Specific Variables

In Vercel, set variables for specific environments:

- **Production:** `VITE_API_URL=https://api.prod.com`
- **Preview:** `VITE_API_URL=https://api.staging.com`
- **Development:** `VITE_API_URL=http://localhost:3000`

## 🔍 Monitoring & Analytics

### Vercel Analytics (Recommended)

Install Vercel Analytics for visitor insights:

```bash
npm install @vercel/analytics
```

Add to `src/main.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <Analytics />
  </>
);
```

### Vercel Speed Insights

Track performance metrics:

```bash
npm install @vercel/speed-insights
```

Add to `src/main.tsx`:

```typescript
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <Analytics />
    <SpeedInsights />
  </>
);
```

### View Deployment Logs

**In Vercel Dashboard:**
1. Click on deployment
2. View **Build Logs** tab
3. Check **Functions** tab (if using serverless)
4. Monitor **Analytics** for traffic

**In GitHub Actions:**
1. Go to **Actions** tab
2. Click workflow run
3. Expand steps to see detailed logs
4. Download logs if needed

## � Available Scripts

Local development commands:

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint

# Run type checking
npm run type-check
```

Vercel CLI commands:

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List all deployments
vercel ls

# Pull environment variables
vercel env pull
```

## 🐛 Troubleshooting Common Issues

### Issue 1: Build Fails in GitHub Actions

**Error:** `npm ERR! peer dependency`

**Solution:**

```bash
# Use legacy peer deps
npm install --legacy-peer-deps

# Or update package.json
"scripts": {
  "install-ci": "npm ci --legacy-peer-deps"
}
```

**Error:** `Environment variable not found`

**Solution:**
1. Check environment variables in Vercel dashboard
2. Ensure variable names start with `VITE_`
3. Re-deploy after adding variables

### Issue 2: Deployment Fails

**Error:** `Error: Invalid token`

**Solution:**
1. Regenerate Vercel token: [Account Settings → Tokens](https://vercel.com/account/tokens)
2. Update `VERCEL_TOKEN` secret in GitHub
3. Re-run workflow

**Error:** `Project not found`

**Solution:**
1. Run `vercel link` in your local project
2. Update `VERCEL_PROJECT_ID` and `VERCEL_ORG_ID` in GitHub secrets
3. Verify IDs match `.vercel/project.json`

### Issue 3: GitHub Actions Workflow Not Running

**Problem:** No workflow triggered on push

**Solution:**
1. Check branch name matches trigger (`master` or `main`)
2. Verify workflow files are in `.github/workflows/`
3. Check GitHub Actions is enabled in repository settings
4. Look for YAML syntax errors in workflow files

### Issue 4: Secrets Not Working

**Error:** `Secret VERCEL_TOKEN not found`

**Solution:**
1. Go to GitHub repository → **Settings** → **Secrets and variables** → **Actions**
2. Verify all three secrets exist:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
3. Secret names must match exactly (case-sensitive)

### Issue 5: SPA Routing Issues

**Problem:** 404 errors on page refresh

**Solution:**

Verify `vercel.json` has SPA rewrites:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Issue 6: EmailJS Not Working

**Problem:** Contact form not sending emails

**Solution:**
1. Verify EmailJS credentials in Vercel environment variables
2. Check EmailJS service is active
3. Verify template ID matches
4. Test with EmailJS dashboard first

### Issue 7: Slow Build Times

**Problem:** Build takes too long

**Solution:**
1. Enable caching in GitHub Actions (already configured in ci.yml)
2. Use Vercel's build cache (automatic)
3. Optimize dependencies:

```bash
npm prune
npm dedupe
```

### Issue 8: Preview Deployments Not Created

**Problem:** Pull requests don't get preview URLs

**Solution:**
1. Check `deploy.yml` triggers include `pull_request`
2. Verify GitHub Actions permissions for PRs
3. Check Vercel project settings allow preview deployments

## � Rollback Deployments

If a deployment causes issues, rollback quickly:

### Method 1: Vercel Dashboard

1. Go to your project → **Deployments**
2. Find the last working deployment
3. Click **"..."** → **"Promote to Production"**

### Method 2: Git Revert

```bash
# Revert last commit
git revert HEAD

# Push to trigger new deployment
git push origin master
```

### Method 3: Deploy Specific Commit

```bash
# Checkout specific commit
git checkout <commit-hash>

# Deploy manually
vercel --prod
```

## ✅ Deployment Checklist

Before going live, verify:

- [ ] All environment variables added in Vercel
- [ ] All three GitHub secrets configured
- [ ] EmailJS credentials working
- [ ] Contact form tested
- [ ] All pages load correctly
- [ ] Responsive design checked
- [ ] Images loading properly
- [ ] Links working (internal and external)
- [ ] Admin panel secured
- [ ] SSL certificate active (automatic with Vercel)
- [ ] Custom domain configured (if applicable)
- [ ] Analytics installed (optional)
- [ ] Performance tested with Lighthouse

## 🎉 Success Indicators

Your deployment is successful when you see:

✅ **GitHub Actions:**
- Green checkmarks on both CI and Deploy workflows
- No red errors in logs
- "Production: <URL>" in deployment step
- PR comments with preview URLs

✅ **Vercel Dashboard:**
- "Ready" status on latest deployment
- Production URL accessible
- Build logs show no errors
- Environment variables configured

✅ **Live Site:**
- All pages load without 404 errors
- Navigation works smoothly
- Contact form sends emails
- Images display correctly
- Responsive on mobile/tablet/desktop

## 📚 Additional Resources

### Documentation

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router Documentation](https://reactrouter.com/)

### Useful Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- [Vercel Status Page](https://www.vercel-status.com/)
- [EmailJS Documentation](https://www.emailjs.com/docs/)

## 🚀 Quick Reference

### Your Production URLs

After deployment:

```
Production: https://your-portfolio-name.vercel.app
Custom Domain: https://yourname.com (if configured)
Preview: https://your-portfolio-name-git-branch.vercel.app
```

### Essential Commands

```bash
# Local development
npm run dev

# Build locally
npm run build

# Preview build
npm run preview

# Deploy to Vercel (manual)
vercel --prod

# View logs
vercel logs

# Pull environment variables
vercel env pull
```

### Environment Variables Checklist

Vercel Dashboard → Settings → Environment Variables:

- [ ] `VITE_ADMIN_USERNAME`
- [ ] `VITE_ADMIN_PASSWORD`
- [ ] `VITE_EMAILJS_SERVICE_ID`
- [ ] `VITE_EMAILJS_TEMPLATE_ID`
- [ ] `VITE_EMAILJS_PUBLIC_KEY`

GitHub Repository → Settings → Secrets:

- [ ] `VERCEL_TOKEN`
- [ ] `VERCEL_ORG_ID`
- [ ] `VERCEL_PROJECT_ID`

## 💡 Pro Tips

1. **Use Git Tags for Releases**
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

2. **Monitor Performance**
   - Install Vercel Analytics
   - Use Lighthouse in Chrome DevTools
   - Check Core Web Vitals

3. **Security Best Practices**
   - Rotate secrets periodically
   - Use strong admin passwords
   - Keep dependencies updated
   - Monitor Vercel access logs

4. **Optimize Loading Speed**
   - Use lazy loading for images
   - Minimize bundle size
   - Enable Vercel's Edge Network (automatic)
   - Compress images before uploading

5. **Test Before Merge**
   - Create PR to test preview deployments
   - Verify changes in preview URL
   - Merge only after approval

---

## 🎊 Congratulations!

Your portfolio is now deployed with automated CI/CD! 

Every push to `master`/`main` will automatically:
- ✅ Build your project
- ✅ Run tests and linting
- ✅ Deploy to production
- ✅ Update your live site

**Next Steps:**
1. Share your portfolio URL
2. Add custom domain (optional)
3. Monitor analytics
4. Keep building amazing projects!

---

**Need Help?** Check the troubleshooting section or visit [Vercel Support](https://vercel.com/support)

**Found this guide helpful?** Give your repository a ⭐ and share it with others!
